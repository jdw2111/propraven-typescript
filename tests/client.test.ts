import { afterEach, describe, expect, it, vi } from 'vitest';
import PropRavenDefault, { PropRaven, Propraven, PropRavenError, VERSION } from '../src/index.js';
import { makeClient, mockFetch } from './helpers.js';
import pkg from '../package.json' with { type: 'json' };

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('client construction', () => {
  it('exports PropRaven as named, default and deprecated alias', () => {
    expect(PropRavenDefault).toBe(PropRaven);
    expect(Propraven).toBe(PropRaven);
  });

  it('VERSION matches package.json', () => {
    expect(VERSION).toBe(pkg.version);
  });

  it('sends the API key as a Bearer token', async () => {
    const { client, calls } = makeClient([{ json: { parcel_id: '1' } }]);
    await client.parcels.get('37:119:1');
    expect(calls[0]!.headers['authorization']).toBe('Bearer pz_test_key');
  });

  it('reads PROPRAVEN_API_KEY and PROPRAVEN_BASE_URL from the environment', async () => {
    vi.stubEnv('PROPRAVEN_API_KEY', 'pz_from_env');
    vi.stubEnv('PROPRAVEN_BASE_URL', 'https://staging.example/');
    const { fetch, calls } = mockFetch({ json: {} });
    const client = new PropRaven({ fetch });
    expect(client.apiKey).toBe('pz_from_env');
    expect(client.baseURL).toBe('https://staging.example');
    await client.account.usage();
    expect(calls[0]!.url.origin).toBe('https://staging.example');
    expect(calls[0]!.headers['authorization']).toBe('Bearer pz_from_env');
  });

  it('defaults the base URL to https://propraven.com', () => {
    vi.stubEnv('PROPRAVEN_BASE_URL', '');
    const client = new PropRaven({ apiKey: 'pz_x', fetch: mockFetch({ json: {} }).fetch });
    expect(client.baseURL).toBe('https://propraven.com');
  });

  it('allows a missing key and sends no Authorization header', async () => {
    vi.stubEnv('PROPRAVEN_API_KEY', '');
    const { fetch, calls } = mockFetch({ json: { ok: true } });
    const client = new PropRaven({ fetch, baseURL: 'https://api.test' });
    expect(client.apiKey).toBeNull();
    await client.freshness.get();
    expect(calls[0]!.headers['authorization']).toBeUndefined();
  });

  it('warns (but does not fail) when the key does not start with pz_', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const client = new PropRaven({ apiKey: 'sk_wrong', fetch: mockFetch({ json: {} }).fetch });
    expect(client.apiKey).toBe('sk_wrong');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]![0])).toContain('pz_');
    expect(String(warn.mock.calls[0]![0])).not.toContain('sk_wrong');
  });

  it('does not warn for pz_ keys', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    new PropRaven({ apiKey: 'pz_ok', fetch: mockFetch({ json: {} }).fetch });
    expect(warn).not.toHaveBeenCalled();
  });

  it('sends User-Agent, Accept and no Content-Type on GET', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.parcels.get('1');
    expect(calls[0]!.headers['user-agent']).toBe(`propraven-typescript/${VERSION}`);
    expect(calls[0]!.headers['accept']).toBe('application/json');
    expect(calls[0]!.headers['content-type']).toBeUndefined();
  });

  it('refuses to run in a browser unless dangerouslyAllowBrowser', () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {});
    expect(() => new PropRaven({ apiKey: 'pz_x', fetch: mockFetch({ json: {} }).fetch })).toThrow(PropRavenError);
    expect(() => new PropRaven({ apiKey: 'pz_x', fetch: mockFetch({ json: {} }).fetch, dangerouslyAllowBrowser: true })).not.toThrow();
  });

  it('applies defaultHeaders and per-request headers (null removes)', async () => {
    const { client, calls } = makeClient([{ json: {} }], { defaultHeaders: { 'X-Team': 'a' } });
    await client.parcels.get('1', {}, { headers: { 'X-Extra': 'b', 'User-Agent': null } });
    expect(calls[0]!.headers['x-team']).toBe('a');
    expect(calls[0]!.headers['x-extra']).toBe('b');
    expect(calls[0]!.headers['user-agent']).toBeUndefined();
  });

  it('tracks lastRateLimit and exposes withResponse()', async () => {
    const { client } = makeClient([
      {
        json: { parcel_id: 'p1' },
        headers: { 'X-RateLimit-Limit': '1000', 'X-RateLimit-Remaining': '997', 'X-RateLimit-Reset': '1711670400', 'x-request-id': 'req_1' },
      },
    ]);
    expect(client.lastRateLimit).toBeNull();
    const { data, response, rateLimit, requestId } = await client.parcels.get('1').withResponse();
    expect(data).toEqual({ parcel_id: 'p1' });
    expect(response.status).toBe(200);
    expect(rateLimit).toEqual({ limit: 1000, remaining: 997, reset: 1711670400 });
    expect(requestId).toBe('req_1');
    expect(client.lastRateLimit).toEqual({ limit: 1000, remaining: 997, reset: 1711670400 });
  });

  it('returns an APIPromise that behaves like a Promise', async () => {
    const { client } = makeClient([{ json: { a: 1 } }]);
    const p = client.parcels.get('1');
    expect(p).toBeInstanceOf(Promise);
    expect(await p.then((d) => (d as unknown as { a: number }).a)).toBe(1);
  });

  it('honours a per-request timeout with APITimeoutError', async () => {
    const fetch = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
        }),
    );
    const client = new PropRaven({ apiKey: 'pz_x', baseURL: 'https://api.test', fetch, maxRetries: 0 });
    await expect(client.parcels.get('1', {}, { timeout: 10 })).rejects.toMatchObject({ name: 'APITimeoutError' });
  });

  it('a user abort is not retried', async () => {
    const controller = new AbortController();
    controller.abort();
    const { client, fetch } = makeClient([{ json: {} }]);
    await expect(client.parcels.get('1', {}, { signal: controller.signal })).rejects.toMatchObject({ name: 'APIUserAbortError' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('exposes error classes as statics', () => {
    expect(PropRaven.NotFoundError.name).toBe('NotFoundError');
    expect(new PropRaven.APIConnectionError()).toBeInstanceOf(PropRavenError);
  });
});
