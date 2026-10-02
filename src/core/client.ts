// Hand-written. Transport, retries, rate-limit tracking and pagination for the generated layer.

import { VERSION } from '../version.js';
import { APIPromise } from './api-promise.js';
import { appendQuery, encodePathSegment } from './encoding.js';
import {
  APIConnectionError,
  APIError,
  APITimeoutError,
  APIUserAbortError,
  PropRavenError,
} from './errors.js';
import type {
  OperationDescriptor,
  PaginationOptions,
  RateLimitInfo,
  RequestOptions,
  WithResponse,
} from './types.js';

export const DEFAULT_BASE_URL = 'https://propraven.com';
export const DEFAULT_TIMEOUT_MS = 60_000;
export const DEFAULT_MAX_RETRIES = 2;
/** Longest single wait between retries. A server that asks for longer is not retried. */
export const MAX_RETRY_WAIT_MS = 60_000;

export type Fetch = (input: string, init?: RequestInit) => Promise<Response>;

export interface ClientOptions {
  /**
   * API key (`pz_...`). Defaults to `process.env.PROPRAVEN_API_KEY`. May be omitted: several
   * endpoints are key-optional, and the server answers 401 where a key is required.
   */
  apiKey?: string | null | undefined;
  /** Defaults to `process.env.PROPRAVEN_BASE_URL`, else `https://propraven.com`. */
  baseURL?: string | null | undefined;
  /** Request timeout in milliseconds. Default 60000. */
  timeout?: number | undefined;
  /** Retries for retryable failures. Default 2. */
  maxRetries?: number | undefined;
  /** Headers sent with every request. */
  defaultHeaders?: Record<string, string | null | undefined> | undefined;
  /** Custom `fetch` implementation (defaults to the global `fetch`). */
  fetch?: Fetch | undefined;
  /**
   * The REST API sends no CORS headers and API keys are secret, so the client refuses to run in
   * a browser. Set this only if you really know what you are doing.
   */
  dangerouslyAllowBrowser?: boolean | undefined;
}

function readEnv(name: string): string | undefined {
  try {
    const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
    const value = proc?.env?.[name];
    return value === undefined || value.trim() === '' ? undefined : value.trim();
  } catch {
    return undefined;
  }
}

function isBrowser(): boolean {
  const g = globalThis as { window?: unknown; document?: unknown };
  return typeof g.window !== 'undefined' && typeof g.document !== 'undefined';
}

function isNode(): boolean {
  const proc = (globalThis as { process?: { versions?: { node?: string } } }).process;
  return !!proc?.versions?.node && !isBrowser();
}

function parseIntHeader(headers: Headers, name: string): number | null {
  const raw = headers.get(name);
  if (raw === null || raw.trim() === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/** Read the `X-RateLimit-*` headers; `null` when none is present. */
export function rateLimitFromHeaders(headers: Headers): RateLimitInfo | null {
  const limit = parseIntHeader(headers, 'x-ratelimit-limit');
  const remaining = parseIntHeader(headers, 'x-ratelimit-remaining');
  const reset = parseIntHeader(headers, 'x-ratelimit-reset');
  if (limit === null && remaining === null && reset === null) return null;
  return { limit, remaining, reset };
}

/**
 * How long to wait before retry number `attempt + 1`, in milliseconds.
 * `Retry-After` (seconds or HTTP date) wins; then an exhausted window's `X-RateLimit-Reset`
 * (epoch seconds); else exponential `0.5 * 2^attempt` s with +/-25% jitter (capped at 60 s).
 * Returns `{ ms, fromServer }`; a server-requested wait over 60 s means "do not retry".
 */
export function computeRetryDelay(
  headers: Headers | null,
  attempt: number,
  now: number = Date.now(),
  random: () => number = Math.random,
): { ms: number; fromServer: boolean } {
  if (headers) {
    const ra = headers.get('retry-after');
    if (ra !== null && ra.trim() !== '') {
      const secs = Number(ra);
      if (Number.isFinite(secs)) return { ms: Math.max(0, secs * 1000), fromServer: true };
      const date = Date.parse(ra);
      if (!Number.isNaN(date)) return { ms: Math.max(0, date - now), fromServer: true };
    }
    const remaining = parseIntHeader(headers, 'x-ratelimit-remaining');
    const reset = parseIntHeader(headers, 'x-ratelimit-reset');
    if (remaining === 0 && reset !== null) {
      return { ms: Math.max(0, reset * 1000 - now), fromServer: true };
    }
  }
  const base = 500 * 2 ** attempt;
  const jitter = 1 + (random() * 0.5 - 0.25);
  return { ms: Math.min(MAX_RETRY_WAIT_MS, base * jitter), fromServer: false };
}

const RETRY_ANY_METHOD = new Set([429, 503, 504]);
const IDEMPOTENT_METHODS = new Set(['GET', 'HEAD', 'DELETE', 'OPTIONS']);

/** 429/503/504 for any method; other 5xx only for idempotent methods; never other 4xx. */
export function isRetryableStatus(status: number, method: string): boolean {
  if (RETRY_ANY_METHOD.has(status)) return true;
  if (status >= 500 && IDEMPOTENT_METHODS.has(method.toUpperCase())) return true;
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isJSONContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  const ct = contentType.toLowerCase();
  return ct.includes('application/json') || ct.includes('+json');
}

/** Base class for generated resource namespaces. */
export abstract class APIResource {
  /** @internal */
  protected readonly _client: BaseClient;
  constructor(client: BaseClient) {
    this._client = client;
  }
}

/** An `AsyncIterable` over every item of a paginated operation. Each iteration starts afresh. */
export class PageIterable<T> implements AsyncIterable<T> {
  private readonly factory: () => AsyncGenerator<T, void, undefined>;
  constructor(factory: () => AsyncGenerator<T, void, undefined>) {
    this.factory = factory;
  }
  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.factory();
  }
  /** Collect every item into an array (bounded by `maxItems` when given). */
  async toArray(): Promise<T[]> {
    const out: T[] = [];
    for await (const item of this) out.push(item);
    return out;
  }
}

export abstract class BaseClient {
  /** The API key in use (`null` when none). */
  readonly apiKey: string | null;
  /** Base URL without a trailing slash. */
  readonly baseURL: string;
  /** Default timeout in milliseconds. */
  readonly timeout: number;
  /** Default retry count. */
  readonly maxRetries: number;
  /** Rate-limit window from the most recent response that carried `X-RateLimit-*` headers. */
  lastRateLimit: RateLimitInfo | null = null;

  private readonly _fetch: Fetch;
  private readonly _defaultHeaders: Record<string, string | null | undefined>;

  constructor(options: ClientOptions = {}) {
    if (isBrowser() && !options.dangerouslyAllowBrowser) {
      throw new PropRavenError(
        'The PropRaven SDK is server-side only: the REST API sends no CORS headers and API keys are secret. ' +
          'Call it from your server, or pass `dangerouslyAllowBrowser: true` if you understand the risk.',
      );
    }
    const key = options.apiKey !== undefined ? options.apiKey : readEnv('PROPRAVEN_API_KEY');
    this.apiKey = key ? key : null;
    if (this.apiKey !== null && !this.apiKey.startsWith('pz_')) {
      console.warn('[propraven] The API key does not start with "pz_"; PropRaven keys normally do. Sending it anyway.');
    }
    const base = options.baseURL ?? readEnv('PROPRAVEN_BASE_URL') ?? DEFAULT_BASE_URL;
    this.baseURL = base.replace(/\/+$/, '');
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT_MS;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this._defaultHeaders = { ...(options.defaultHeaders ?? {}) };
    const f = options.fetch ?? (globalThis as { fetch?: Fetch }).fetch;
    if (!f) {
      throw new PropRavenError('No global `fetch` found. Use Node.js >= 18 or pass `fetch` in the client options.');
    }
    this._fetch = f;
  }

  /** @internal Wait `ms` milliseconds (overridable in tests). */
  protected _sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /** @internal Called by generated methods. */
  _call<T>(
    op: OperationDescriptor,
    pathArgs: readonly unknown[],
    params: object | null | undefined,
    options?: RequestOptions,
  ): APIPromise<T> {
    return new APIPromise<T>(this._execute<T>(op, pathArgs, params, options));
  }

  /** @internal Called by generated `*All` methods. */
  _paginate<T>(
    op: OperationDescriptor,
    pathArgs: readonly unknown[],
    params: object | null | undefined,
    options: PaginationOptions = {},
  ): PageIterable<T> {
    const pagination = op.pagination;
    if (!pagination) throw new PropRavenError(`${op.group}.${op.method} is not paginated`);
    const { pageSize, maxItems, ...requestOptions } = options;
    const limitCap = maxItems ?? Infinity;
    const base: Record<string, unknown> = { ...((params ?? {}) as Record<string, unknown>) };
    const self = this;

    if (pagination.style === 'offset') {
      return new PageIterable<T>(async function* () {
        let offset = typeof base['offset'] === 'number' ? (base['offset'] as number) : 0;
        const size = pageSize ?? (typeof base['limit'] === 'number' ? (base['limit'] as number) : undefined);
        let yielded = 0;
        while (yielded < limitCap) {
          const page: Record<string, unknown> = { ...base, offset };
          let requested: number | undefined;
          if (size !== undefined) {
            requested = Math.max(1, Math.min(size, limitCap - yielded));
            page['limit'] = requested;
          }
          const { data } = await self._execute<unknown>(op, pathArgs, page, requestOptions);
          const items = extractItems(data, pagination.items);
          for (const item of items) {
            yield item as T;
            yielded++;
            if (yielded >= limitCap) return;
          }
          if (items.length === 0) return;
          const env = isRecord(data) ? data : {};
          const hasMore = env['has_more'] ?? env['hasMore'];
          offset += items.length;
          if (typeof hasMore === 'boolean') {
            if (!hasMore) return;
            continue;
          }
          const effLimit = typeof env['limit'] === 'number' ? (env['limit'] as number) : requested;
          if (effLimit !== undefined && items.length < effLimit) return;
          if (typeof env['total'] === 'number' && offset >= (env['total'] as number)) return;
          if (effLimit === undefined && typeof env['total'] !== 'number') return; // nothing tells us there is more
        }
      });
    }

    return new PageIterable<T>(async function* () {
      const page: Record<string, unknown> = { ...base };
      let yielded = 0;
      while (yielded < limitCap) {
        if (pageSize !== undefined) page['limit'] = Math.max(1, Math.min(pageSize, limitCap - yielded));
        const { data } = await self._execute<unknown>(op, pathArgs, page, requestOptions);
        const items = extractItems(data, pagination.items);
        for (const item of items) {
          yield item as T;
          yielded++;
          if (yielded >= limitCap) return;
        }
        if (items.length === 0) return;
        const env = isRecord(data) ? data : {};
        const next = env[pagination.next];
        if (next === undefined || next === null || next === '') return;
        if (env['hasMore'] === false || env['has_more'] === false) return;
        page[pagination.cursorParam] = next;
        delete page['page'];
      }
    });
  }

  private async _execute<T>(
    op: OperationDescriptor,
    pathArgs: readonly unknown[],
    params: object | null | undefined,
    options: RequestOptions = {},
  ): Promise<WithResponse<T>> {
    // ---- path
    let path = op.path;
    op.pathParams.forEach((name, i) => {
      const value = pathArgs[i];
      if (value === undefined || value === null || value === '') {
        throw new PropRavenError(`${op.group}.${op.method}: missing required path parameter "${name}"`);
      }
      path = path.replace(`{${name}}`, encodePathSegment(value));
    });

    // ---- route params into query / headers / body
    const search = new URLSearchParams();
    const headerParams: Record<string, string> = {};
    let body: unknown = undefined;
    let bodyObj: Record<string, unknown> | undefined;
    if (op.body?.kind === 'fields' && op.body.required) bodyObj = {};

    for (const [key, value] of Object.entries((params ?? {}) as Record<string, unknown>)) {
      if (value === undefined) continue;
      const header = op.headers[key];
      if (header !== undefined) {
        if (value !== null) headerParams[header] = String(value);
        continue;
      }
      const q = op.query[key];
      if (q !== undefined) {
        appendQuery(search, q.name, value, q.explode);
        continue;
      }
      if (op.body?.kind === 'fields') {
        const wire = op.body.fields[key] ?? key; // unknown keys go to the body
        (bodyObj ??= {})[wire] = value;
        continue;
      }
      if (op.body?.kind === 'value' && key === op.body.param) {
        body = value;
        continue;
      }
      appendQuery(search, key, value); // unknown keys go to the query string
    }
    if (bodyObj !== undefined) body = bodyObj;
    for (const [k, v] of Object.entries(options.query ?? {})) appendQuery(search, k, v);

    const qs = search.toString();
    const url = `${this.baseURL}${path}${qs ? `?${qs}` : ''}`;

    // ---- headers
    const headers: Record<string, string> = {};
    const set = (name: string, value: string | null | undefined) => {
      for (const existing of Object.keys(headers)) {
        if (existing.toLowerCase() === name.toLowerCase()) delete headers[existing];
      }
      if (value !== null && value !== undefined) headers[name] = value;
    };
    set('Accept', op.accept);
    if (isNode()) set('User-Agent', `propraven-typescript/${VERSION}`);
    if (this.apiKey) set('Authorization', `Bearer ${this.apiKey}`);
    if (body !== undefined) set('Content-Type', 'application/json');
    for (const [k, v] of Object.entries(this._defaultHeaders)) set(k, v);
    for (const [k, v] of Object.entries(headerParams)) set(k, v);
    for (const [k, v] of Object.entries(options.headers ?? {})) set(k, v);

    const init: RequestInit = { method: op.httpMethod, headers };
    if (body !== undefined) init.body = JSON.stringify(body);

    return this._send<T>(op, url, init, options);
  }

  private async _send<T>(op: OperationDescriptor, url: string, init: RequestInit, options: RequestOptions): Promise<WithResponse<T>> {
    const maxRetries = Math.max(0, options.maxRetries ?? this.maxRetries);
    const timeout = options.timeout ?? this.timeout;

    for (let attempt = 0; ; attempt++) {
      const controller = new AbortController();
      let timedOut = false;
      const timer = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, timeout);
      const onUserAbort = () => controller.abort();
      if (options.signal) {
        if (options.signal.aborted) {
          clearTimeout(timer);
          throw new APIUserAbortError();
        }
        options.signal.addEventListener('abort', onUserAbort, { once: true });
      }
      const cleanup = () => {
        clearTimeout(timer);
        options.signal?.removeEventListener('abort', onUserAbort);
      };

      let response: Response;
      let text: string;
      try {
        response = await this._fetch(url, { ...init, signal: controller.signal });
        text = op.response === 'none' && response.ok ? '' : await response.text();
      } catch (err) {
        cleanup();
        if (options.signal?.aborted) throw new APIUserAbortError(undefined, { cause: err });
        const failure = timedOut
          ? new APITimeoutError(`Request timed out after ${timeout} ms.`, { cause: err })
          : new APIConnectionError(`Connection error: ${(err as Error)?.message ?? String(err)}`, { cause: err });
        if (attempt < maxRetries) {
          await this._sleep(computeRetryDelay(null, attempt).ms);
          continue;
        }
        throw failure;
      }
      cleanup();

      const rateLimit = rateLimitFromHeaders(response.headers);
      if (rateLimit) this.lastRateLimit = rateLimit;
      const requestId = response.headers.get('x-request-id');
      const contentType = response.headers.get('content-type');

      if (response.ok) {
        const data = parseSuccess(op, contentType, text) as T;
        return { data, response, rateLimit, requestId };
      }

      let errBody: unknown = text;
      if (text) {
        try {
          errBody = JSON.parse(text);
        } catch {
          errBody = text;
        }
      } else {
        errBody = undefined;
      }
      const error = APIError.from(response.status, response.headers, errBody);

      if (attempt < maxRetries && isRetryableStatus(response.status, init.method ?? 'GET')) {
        const delay = computeRetryDelay(response.headers, attempt);
        if (delay.fromServer && delay.ms > MAX_RETRY_WAIT_MS) throw error;
        await this._sleep(delay.ms);
        continue;
      }
      throw error;
    }
  }
}

function parseSuccess(op: OperationDescriptor, contentType: string | null, text: string): unknown {
  if (op.response === 'none') return undefined;
  if (op.response === 'text') return text;
  if (text === '') return null;
  if (isJSONContentType(contentType)) {
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new PropRavenError(`${op.group}.${op.method}: the response claimed JSON but did not parse`, { cause: err });
    }
  }
  if (op.response === 'json') {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  return text; // 'auto' with a non-JSON content type (e.g. text/csv)
}

function extractItems(data: unknown, key: string): unknown[] {
  if (Array.isArray(data)) return data;
  if (isRecord(data) && Array.isArray(data[key])) return data[key] as unknown[];
  return [];
}
