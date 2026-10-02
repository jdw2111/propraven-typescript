// Hand-written. Error hierarchy shared by every operation.
//
// The API answers errors with RFC 7807 `application/problem+json`:
//   {type, title, status, detail, code, errors?: [{param, message}], request_id?, ...extras}
// A 402 may instead carry an x402 envelope `{x402Version, error, accepts: [...]}`, and older
// endpoints may still answer `{error: "..."}`. All three are parsed here.

/** One invalid parameter reported by a 400 `invalid_parameter` problem. */
export interface ProblemFieldError {
  param: string;
  message: string;
}

/** Base class of every error thrown by this SDK. */
export class PropRavenError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = 'PropRavenError';
    if (options && 'cause' in options) {
      Object.defineProperty(this, 'cause', { value: options.cause, configurable: true, writable: true });
    }
  }
}

/** The server answered with a non-2xx status. */
export class APIError extends PropRavenError {
  /** HTTP status code. */
  readonly status: number;
  /** Problem `type` URI, e.g. `https://api.propraven.com/errors/not-found`. */
  readonly type: string | undefined;
  /** Problem `title`, e.g. `Not Found`. */
  readonly title: string | undefined;
  /** Human-readable explanation. */
  readonly detail: string | undefined;
  /** Stable machine-readable code, e.g. `invalid_parameter`, `not_found`, `query_timeout`. */
  readonly code: string | undefined;
  /** Per-parameter problems (400 `invalid_parameter`). Empty when the server sent none. */
  readonly errors: ProblemFieldError[];
  /** Request id (problem `request_id`, or the `x-request-id` header). */
  readonly requestId: string | undefined;
  /** Response headers. */
  readonly headers: Headers;
  /** Parsed JSON body, or the raw text when the body was not JSON. */
  readonly body: unknown;
  /**
   * Seconds the server asked us to wait (`Retry-After`, or `X-RateLimit-Reset` when the
   * window is exhausted). `null` when the response said nothing.
   */
  readonly retryAfter: number | null;

  constructor(status: number, headers: Headers, body: unknown, message?: string) {
    const parsed = parseErrorBody(status, headers, body);
    super(message ?? formatMessage(status, parsed.code, parsed.detail));
    this.name = 'APIError';
    this.status = status;
    this.type = parsed.type;
    this.title = parsed.title;
    this.detail = parsed.detail;
    this.code = parsed.code;
    this.errors = parsed.errors;
    this.requestId = parsed.requestId;
    this.headers = headers;
    this.body = body;
    this.retryAfter = retryAfterSeconds(headers);
  }

  /** Build the subclass that matches `status`. */
  static from(status: number, headers: Headers, body: unknown): APIError {
    switch (status) {
      case 400:
        return new BadRequestError(status, headers, body);
      case 401:
        return new AuthenticationError(status, headers, body);
      case 402:
        return new PaymentRequiredError(status, headers, body);
      case 403:
        return new PermissionDeniedError(status, headers, body);
      case 404:
        return new NotFoundError(status, headers, body);
      case 405:
        return new MethodNotAllowedError(status, headers, body);
      case 409:
        return new ConflictError(status, headers, body);
      case 413:
        return new PayloadTooLargeError(status, headers, body);
      case 422:
        return new UnprocessableEntityError(status, headers, body);
      case 429:
        return new RateLimitError(status, headers, body);
      case 503:
        return new ServiceUnavailableError(status, headers, body);
      case 504:
        return new GatewayTimeoutError(status, headers, body);
      default:
        return status >= 500 ? new InternalServerError(status, headers, body) : new APIError(status, headers, body);
    }
  }
}

export class BadRequestError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'BadRequestError';
  }
}

export class AuthenticationError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'AuthenticationError';
  }
}

/**
 * 402: the monthly call cap was reached, or a paid operation needs payment. The SDK never signs
 * x402 payments; `accepts` carries the x402 payment requirements when the server sent them.
 */
export class PaymentRequiredError extends APIError {
  /** x402 `accepts` entries (empty when the body was a plain problem). */
  readonly accepts: unknown[];
  /** x402 protocol version, when the body was an x402 envelope. */
  readonly x402Version: number | undefined;
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'PaymentRequiredError';
    const obj = isRecord(body) ? body : {};
    this.accepts = Array.isArray(obj['accepts']) ? (obj['accepts'] as unknown[]) : [];
    this.x402Version = typeof obj['x402Version'] === 'number' ? (obj['x402Version'] as number) : undefined;
  }
}

export class PermissionDeniedError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'PermissionDeniedError';
  }
}

export class NotFoundError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'NotFoundError';
  }
}

export class MethodNotAllowedError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'MethodNotAllowedError';
  }
}

export class ConflictError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'ConflictError';
  }
}

export class PayloadTooLargeError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'PayloadTooLargeError';
  }
}

export class UnprocessableEntityError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'UnprocessableEntityError';
  }
}

/** 429. `retryAfter` holds the seconds the server asked us to wait (or `null`). */
export class RateLimitError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'RateLimitError';
  }
}

export class ServiceUnavailableError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'ServiceUnavailableError';
  }
}

export class GatewayTimeoutError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'GatewayTimeoutError';
  }
}

/** Any other 5xx. */
export class InternalServerError extends APIError {
  constructor(status: number, headers: Headers, body: unknown) {
    super(status, headers, body);
    this.name = 'InternalServerError';
  }
}

/** The request never produced an HTTP response (DNS, TCP, TLS, reset...). */
export class APIConnectionError extends PropRavenError {
  constructor(message = 'Connection error.', options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'APIConnectionError';
  }
}

/** The request exceeded its timeout. */
export class APITimeoutError extends APIConnectionError {
  constructor(message = 'Request timed out.', options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'APITimeoutError';
  }
}

/** The caller aborted the request through `signal`. Never retried. */
export class APIUserAbortError extends PropRavenError {
  constructor(message = 'Request was aborted.', options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'APIUserAbortError';
  }
}

// ---------------------------------------------------------------------------------------------

interface ParsedErrorBody {
  type: string | undefined;
  title: string | undefined;
  detail: string | undefined;
  code: string | undefined;
  errors: ProblemFieldError[];
  requestId: string | undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value !== '' ? value : undefined;
}

/** Parse a Problem, x402 or legacy `{error}` body. Never throws. */
export function parseErrorBody(status: number, headers: Headers, body: unknown): ParsedErrorBody {
  const obj = isRecord(body) ? body : {};
  const legacyError = obj['error'];
  const isX402 = 'x402Version' in obj || Array.isArray(obj['accepts']);

  let detail =
    str(obj['detail']) ??
    str(legacyError) ??
    (isRecord(legacyError) ? str(legacyError['message']) : undefined) ??
    str(obj['message']);
  if (detail === undefined && typeof body === 'string') {
    const text = body.trim();
    if (text) detail = text.length > 500 ? `${text.slice(0, 500)}...` : text;
  }

  let code = str(obj['code']) ?? (isRecord(legacyError) ? str(legacyError['code']) : undefined);
  if (code === undefined && isX402) code = 'payment_required';

  const errors: ProblemFieldError[] = Array.isArray(obj['errors'])
    ? (obj['errors'] as unknown[]).filter(isRecord).map((e) => ({
        param: typeof e['param'] === 'string' ? e['param'] : String(e['param'] ?? ''),
        message: typeof e['message'] === 'string' ? e['message'] : String(e['message'] ?? ''),
      }))
    : [];

  const title = str(obj['title']);
  return {
    type: str(obj['type']),
    title,
    detail: detail ?? title,
    code,
    errors,
    requestId: str(obj['request_id']) ?? str(obj['requestId']) ?? headers.get('x-request-id') ?? undefined,
  };
}

function formatMessage(status: number, code: string | undefined, detail: string | undefined): string {
  const head = code ? `${status} ${code}` : `${status}`;
  return detail ? `${head}: ${detail}` : `${head}: status code ${status} (no body)`;
}

/** Seconds to wait according to `Retry-After` (seconds or HTTP date) or an exhausted rate-limit window. */
export function retryAfterSeconds(headers: Headers, now: number = Date.now()): number | null {
  const ra = headers.get('retry-after');
  if (ra !== null && ra.trim() !== '') {
    const secs = Number(ra);
    if (Number.isFinite(secs)) return Math.max(0, secs);
    const date = Date.parse(ra);
    if (!Number.isNaN(date)) return Math.max(0, Math.ceil((date - now) / 1000));
  }
  const remaining = headers.get('x-ratelimit-remaining');
  const reset = headers.get('x-ratelimit-reset');
  if (remaining !== null && Number(remaining) === 0 && reset !== null && Number.isFinite(Number(reset))) {
    return Math.max(0, Math.ceil(Number(reset) - now / 1000));
  }
  return null;
}
