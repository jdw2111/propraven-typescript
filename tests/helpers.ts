import { vi } from 'vitest';
import { PropRaven, type ClientOptions } from '../src/index.js';

export interface RecordedCall {
  url: URL;
  method: string;
  headers: Record<string, string>;
  body: unknown;
}

export type Reply =
  | { status?: number; json?: unknown; text?: string; headers?: Record<string, string> }
  | Error;

/** A fetch mock that replays `replies` in order (the last one repeats) and records each call. */
export function mockFetch(...replies: Reply[]) {
  const calls: RecordedCall[] = [];
  let i = 0;
  const fn = vi.fn(async (input: string, init?: RequestInit) => {
    const headers: Record<string, string> = {};
    for (const [k, v] of Object.entries((init?.headers ?? {}) as Record<string, string>)) headers[k.toLowerCase()] = v;
    calls.push({
      url: new URL(input),
      method: init?.method ?? 'GET',
      headers,
      body: typeof init?.body === 'string' ? JSON.parse(init.body) : undefined,
    });
    const reply = replies[Math.min(i++, replies.length - 1)];
    if (reply === undefined) throw new Error('no reply configured');
    if (reply instanceof Error) throw reply;
    const status = reply.status ?? 200;
    const h = new Headers(reply.headers ?? {});
    let body: string | null = null;
    if (reply.json !== undefined) {
      body = JSON.stringify(reply.json);
      if (!h.has('content-type')) h.set('content-type', status >= 400 ? 'application/problem+json' : 'application/json');
    } else if (reply.text !== undefined) {
      body = reply.text;
    }
    return new Response(status === 204 ? null : body, { status, headers: h });
  });
  return { fetch: fn, calls };
}

/** A client wired to a fetch mock, with sleeping recorded instead of performed. */
export function makeClient(replies: Reply[], options: ClientOptions = {}) {
  const { fetch, calls } = mockFetch(...replies);
  const client = new PropRaven({ apiKey: 'pz_test_key', baseURL: 'https://api.test', fetch, ...options });
  const sleeps: number[] = [];
  (client as unknown as { _sleep: (ms: number) => Promise<void> })._sleep = async (ms: number) => {
    sleeps.push(ms);
  };
  return { client, calls, fetch, sleeps };
}

export function problem(status: number, code: string, detail: string, extra: Record<string, unknown> = {}) {
  return { type: `https://api.propraven.com/errors/${code.replace(/_/g, '-')}`, title: 'Problem', status, detail, code, ...extra };
}
