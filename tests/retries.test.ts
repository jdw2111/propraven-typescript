import { describe, expect, it } from 'vitest';
import {
  APIConnectionError,
  BadRequestError,
  computeRetryDelay,
  InternalServerError,
  PaymentRequiredError,
  RateLimitError,
  ServiceUnavailableError,
} from '../src/index.js';
import { isRetryableStatus } from '../src/core/client.js';
import { makeClient, problem } from './helpers.js';

const ok = { json: { parcel_id: 'p1' } };

describe('retries', () => {
  it('retries a 429 after Retry-After seconds', async () => {
    const { client, calls, sleeps } = makeClient([
      { status: 429, json: problem(429, 'rate_limit_exceeded', 'slow down'), headers: { 'retry-after': '2' } },
      ok,
    ]);
    expect(await client.parcels.get('1')).toEqual({ parcel_id: 'p1' });
    expect(calls).toHaveLength(2);
    expect(sleeps).toEqual([2000]);
  });

  it('exposes retryAfter on RateLimitError', async () => {
    const { client } = makeClient([{ status: 429, json: problem(429, 'rate_limit_exceeded', 'x'), headers: { 'retry-after': '7' } }], {
      maxRetries: 0,
    });
    const err = (await client.parcels.get('1').catch((e: unknown) => e)) as RateLimitError;
    expect(err).toBeInstanceOf(RateLimitError);
    expect(err.retryAfter).toBe(7);
  });

  it('retryAfter is null when the server says nothing', async () => {
    const { client } = makeClient([{ status: 429, json: problem(429, 'rate_limit_exceeded', 'x') }], { maxRetries: 0 });
    const err = (await client.parcels.get('1').catch((e: unknown) => e)) as RateLimitError;
    expect(err.retryAfter).toBeNull();
  });

  it('retries a 503 with exponential backoff', async () => {
    const { client, calls, sleeps } = makeClient([{ status: 503, json: problem(503, 'unavailable', 'x') }, ok]);
    await client.parcels.get('1');
    expect(calls).toHaveLength(2);
    expect(sleeps[0]).toBeGreaterThanOrEqual(375);
    expect(sleeps[0]).toBeLessThanOrEqual(625);
  });

  it('retries a 503 on POST and a 504', async () => {
    const { client, calls } = makeClient([
      { status: 503, json: problem(503, 'unavailable', 'x') },
      { status: 504, json: problem(504, 'query_timeout', 'x') },
      { json: { data: [] } },
    ]);
    await client.search.parcels({ limit: 1 });
    expect(calls).toHaveLength(3);
    expect(calls.every((c) => c.method === 'POST')).toBe(true);
  });

  it('does not retry a 400', async () => {
    const { client, calls } = makeClient([{ status: 400, json: problem(400, 'invalid_parameter', 'x') }, ok]);
    await expect(client.parcels.get('1')).rejects.toBeInstanceOf(BadRequestError);
    expect(calls).toHaveLength(1);
  });

  it('does not retry a 402 even with Retry-After', async () => {
    const { client, calls } = makeClient([{ status: 402, json: problem(402, 'monthly_cap_reached', 'x'), headers: { 'retry-after': '1' } }, ok]);
    await expect(client.parcels.get('1')).rejects.toBeInstanceOf(PaymentRequiredError);
    expect(calls).toHaveLength(1);
  });

  it('does not retry a POST 500', async () => {
    const { client, calls } = makeClient([{ status: 500, json: problem(500, 'internal_error', 'x') }, { json: {} }]);
    await expect(client.search.parcels({ limit: 1 })).rejects.toBeInstanceOf(InternalServerError);
    expect(calls).toHaveLength(1);
  });

  it('retries a GET 500 and a GET 502', async () => {
    const { client, calls } = makeClient([
      { status: 500, json: problem(500, 'internal_error', 'x') },
      { status: 502, text: 'bad gateway' },
      ok,
    ]);
    await client.parcels.get('1');
    expect(calls).toHaveLength(3);
  });

  it('gives up after maxRetries and throws the last error', async () => {
    const { client, calls, sleeps } = makeClient([{ status: 503, json: problem(503, 'unavailable', 'x') }]);
    await expect(client.parcels.get('1')).rejects.toBeInstanceOf(ServiceUnavailableError);
    expect(calls).toHaveLength(3); // 1 + maxRetries (2)
    expect(sleeps).toHaveLength(2);
  });

  it('honours per-request maxRetries', async () => {
    const { client, calls } = makeClient([{ status: 503, json: problem(503, 'unavailable', 'x') }]);
    await expect(client.parcels.get('1', {}, { maxRetries: 4 })).rejects.toBeInstanceOf(ServiceUnavailableError);
    expect(calls).toHaveLength(5);
  });

  it('does not retry when the server asks for more than 60 s', async () => {
    const { client, calls, sleeps } = makeClient([
      { status: 429, json: problem(429, 'rate_limit_exceeded', 'x'), headers: { 'retry-after': '120' } },
      ok,
    ]);
    const err = (await client.parcels.get('1').catch((e: unknown) => e)) as RateLimitError;
    expect(err).toBeInstanceOf(RateLimitError);
    expect(err.retryAfter).toBe(120);
    expect(calls).toHaveLength(1);
    expect(sleeps).toEqual([]);
  });

  it('uses X-RateLimit-Reset when the window is exhausted', async () => {
    const reset = Math.floor(Date.now() / 1000) + 3;
    const { client, sleeps } = makeClient([
      { status: 429, json: problem(429, 'rate_limit_exceeded', 'x'), headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(reset) } },
      ok,
    ]);
    await client.parcels.get('1');
    expect(sleeps).toHaveLength(1);
    expect(sleeps[0]).toBeGreaterThan(1000);
    expect(sleeps[0]).toBeLessThanOrEqual(3000);
  });

  it('retries network errors', async () => {
    const { client, calls } = makeClient([new TypeError('socket hang up'), ok]);
    expect(await client.parcels.get('1')).toEqual({ parcel_id: 'p1' });
    expect(calls).toHaveLength(2);
  });

  it('throws APIConnectionError after exhausting network retries', async () => {
    const { client, calls } = makeClient([new TypeError('ECONNRESET')]);
    await expect(client.parcels.get('1')).rejects.toBeInstanceOf(APIConnectionError);
    expect(calls).toHaveLength(3);
  });
});

describe('computeRetryDelay', () => {
  const h = (o: Record<string, string>) => new Headers(o);
  it('parses Retry-After seconds and HTTP dates', () => {
    expect(computeRetryDelay(h({ 'retry-after': '1.5' }), 0)).toEqual({ ms: 1500, fromServer: true });
    const now = Date.parse('2026-10-02T00:00:00Z');
    expect(computeRetryDelay(h({ 'retry-after': 'Fri, 02 Oct 2026 00:00:10 GMT' }), 0, now)).toEqual({ ms: 10000, fromServer: true });
  });
  it('uses exponential backoff with +/-25% jitter', () => {
    expect(computeRetryDelay(null, 0, 0, () => 0).ms).toBe(375);
    expect(computeRetryDelay(null, 0, 0, () => 1).ms).toBe(625);
    expect(computeRetryDelay(null, 1, 0, () => 0.5).ms).toBe(1000);
    expect(computeRetryDelay(null, 2, 0, () => 0.5).ms).toBe(2000);
    expect(computeRetryDelay(null, 20, 0, () => 0.5).ms).toBe(60000);
  });
  it('classifies retryable statuses', () => {
    expect(isRetryableStatus(429, 'POST')).toBe(true);
    expect(isRetryableStatus(503, 'POST')).toBe(true);
    expect(isRetryableStatus(504, 'PATCH')).toBe(true);
    expect(isRetryableStatus(500, 'GET')).toBe(true);
    expect(isRetryableStatus(502, 'DELETE')).toBe(true);
    expect(isRetryableStatus(500, 'POST')).toBe(false);
    expect(isRetryableStatus(402, 'GET')).toBe(false);
    expect(isRetryableStatus(400, 'GET')).toBe(false);
    expect(isRetryableStatus(404, 'GET')).toBe(false);
  });
});
