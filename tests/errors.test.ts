import { describe, expect, it } from 'vitest';
import {
  APIConnectionError,
  APIError,
  AuthenticationError,
  BadRequestError,
  ConflictError,
  GatewayTimeoutError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PermissionDeniedError,
  PropRavenError,
  RateLimitError,
  ServiceUnavailableError,
  UnprocessableEntityError,
} from '../src/index.js';
import { makeClient, problem } from './helpers.js';

const cases: Array<[number, new (...args: never[]) => APIError]> = [
  [400, BadRequestError],
  [401, AuthenticationError],
  [402, PaymentRequiredError],
  [403, PermissionDeniedError],
  [404, NotFoundError],
  [405, MethodNotAllowedError],
  [409, ConflictError],
  [413, PayloadTooLargeError],
  [422, UnprocessableEntityError],
  [429, RateLimitError],
  [500, InternalServerError],
  [502, InternalServerError],
  [503, ServiceUnavailableError],
  [504, GatewayTimeoutError],
];

describe('error classes from a Problem body', () => {
  for (const [status, Cls] of cases) {
    it(`${status} -> ${Cls.name}`, async () => {
      const { client } = makeClient([{ status, json: problem(status, 'some_code', `detail ${status}`, { request_id: 'req_9' }) }], {
        maxRetries: 0,
      });
      const err = await client.parcels.get('1').catch((e: unknown) => e);
      expect(err).toBeInstanceOf(Cls);
      expect(err).toBeInstanceOf(APIError);
      expect(err).toBeInstanceOf(PropRavenError);
      const e = err as APIError;
      expect(e.status).toBe(status);
      expect(e.code).toBe('some_code');
      expect(e.detail).toBe(`detail ${status}`);
      expect(e.title).toBe('Problem');
      expect(e.type).toBe('https://api.propraven.com/errors/some-code');
      expect(e.requestId).toBe('req_9');
      expect(e.message).toBe(`${status} some_code: detail ${status}`);
      expect(e.name).toBe(Cls.name);
      expect(e.headers.get('content-type')).toContain('problem+json');
    });
  }

  it('carries per-parameter errors', async () => {
    const body = problem(400, 'invalid_parameter', 'limit: must be >= 1', { errors: [{ param: 'limit', message: 'must be >= 1' }] });
    const { client } = makeClient([{ status: 400, json: body }]);
    const err = (await client.deals.absentee({ limit: 0 }).catch((e: unknown) => e)) as BadRequestError;
    expect(err).toBeInstanceOf(BadRequestError);
    expect(err.errors).toEqual([{ param: 'limit', message: 'must be >= 1' }]);
    expect(err.body).toEqual(body);
  });

  it('falls back to the x-request-id header', async () => {
    const { client } = makeClient([{ status: 404, json: problem(404, 'not_found', 'nope'), headers: { 'x-request-id': 'hdr_1' } }]);
    const err = (await client.parcels.get('x').catch((e: unknown) => e)) as NotFoundError;
    expect(err.requestId).toBe('hdr_1');
  });
});

describe('legacy and x402 bodies', () => {
  it('parses a legacy {error} body', async () => {
    const { client } = makeClient([{ status: 404, json: { error: 'Parcel not found' }, headers: { 'content-type': 'application/json' } }]);
    const err = (await client.parcels.get('x').catch((e: unknown) => e)) as NotFoundError;
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.detail).toBe('Parcel not found');
    expect(err.code).toBeUndefined();
    expect(err.message).toBe('404: Parcel not found');
  });

  it('parses a legacy {error: {message, code}} body', async () => {
    const { client } = makeClient([{ status: 401, json: { error: { message: 'bad key', code: 'invalid_key' } } }]);
    const err = (await client.parcels.get('x').catch((e: unknown) => e)) as AuthenticationError;
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(err.message).toBe('401 invalid_key: bad key');
  });

  it('parses an x402 envelope on 402 and exposes accepts', async () => {
    const accepts = [{ scheme: 'exact', network: 'base', maxAmountRequired: '5000000', payTo: '0xabc', asset: '0xusdc' }];
    const { client } = makeClient([{ status: 402, json: { x402Version: 1, error: 'X-PAYMENT header is required', accepts } }]);
    const err = (await client.parcels.report('37:119:1').catch((e: unknown) => e)) as PaymentRequiredError;
    expect(err).toBeInstanceOf(PaymentRequiredError);
    expect(err.accepts).toEqual(accepts);
    expect(err.x402Version).toBe(1);
    expect(err.code).toBe('payment_required');
    expect(err.detail).toBe('X-PAYMENT header is required');
  });

  it('a Problem 402 has an empty accepts list', async () => {
    const { client } = makeClient([{ status: 402, json: problem(402, 'monthly_cap_reached', 'cap'), headers: { 'retry-after': '864000' } }]);
    const err = (await client.deals.absentee().catch((e: unknown) => e)) as PaymentRequiredError;
    expect(err.accepts).toEqual([]);
    expect(err.retryAfter).toBe(864000);
  });

  it('handles a non-JSON error body', async () => {
    const { client } = makeClient([{ status: 502, text: '<html>Bad gateway</html>', headers: { 'content-type': 'text/html' } }], { maxRetries: 0 });
    const err = (await client.parcels.get('x').catch((e: unknown) => e)) as InternalServerError;
    expect(err).toBeInstanceOf(InternalServerError);
    expect(err.body).toBe('<html>Bad gateway</html>');
    expect(err.message).toBe('502: <html>Bad gateway</html>');
  });

  it('handles an empty error body', async () => {
    const { client } = makeClient([{ status: 404 }]);
    const err = (await client.parcels.get('x').catch((e: unknown) => e)) as NotFoundError;
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.body).toBeUndefined();
    expect(err.message).toContain('404');
  });
});

describe('connection errors', () => {
  it('wraps network failures in APIConnectionError', async () => {
    const { client } = makeClient([new TypeError('fetch failed')], { maxRetries: 0 });
    const err = await client.parcels.get('1').catch((e: unknown) => e);
    expect(err).toBeInstanceOf(APIConnectionError);
    expect((err as Error).message).toContain('fetch failed');
  });
});
