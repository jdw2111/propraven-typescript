import { createHash, createHmac, randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { computeWebhookSignature, verifyWebhook, WebhookVerificationError } from '../src/index.js';
import * as webhooksEntry from '../src/webhooks.js';
import { hmacSha256, sha256, toHex } from '../src/core/sha256.js';

const SECRET = 'whsec_test';
const BODY = '{"type":"parcel.sold","id":"evt_1"}';
const T = 1700000000000;
// Reference value from: python3 -c 'import hmac,hashlib;print(hmac.new(b"whsec_test",
//   b"1700000000000.{\"type\":\"parcel.sold\",\"id\":\"evt_1\"}", hashlib.sha256).hexdigest())'
const VECTOR_HEX = '5b5571cbfa4a4d4a2671f01bba9d4e2e60a3738433375ff005f2377d1f26a874';

describe('webhook test vector', () => {
  it('matches the shared design-doc vector', () => {
    const computed = createHmac('sha256', SECRET).update(`${T}.${BODY}`).digest('hex');
    expect(computed).toBe(VECTOR_HEX);
    expect(computeWebhookSignature(SECRET, T, BODY)).toBe(VECTOR_HEX);
  });

  it('verifies the vector and returns the parsed event', () => {
    const event = verifyWebhook<{ type: string; id: string }>({ payload: BODY, signature: `t=${T},v1=${VECTOR_HEX}`, secret: SECRET, now: T });
    expect(event).toEqual({ type: 'parcel.sold', id: 'evt_1' });
  });

  it('accepts the payload as bytes', () => {
    const event = verifyWebhook({ payload: new TextEncoder().encode(BODY), signature: `t=${T},v1=${VECTOR_HEX}`, secret: SECRET, now: T });
    expect(event).toEqual({ type: 'parcel.sold', id: 'evt_1' });
  });

  it('is exported from the ./webhooks entry too', () => {
    expect(webhooksEntry.verifyWebhook).toBe(verifyWebhook);
    expect(webhooksEntry.WebhookVerificationError).toBe(WebhookVerificationError);
  });
});

describe('webhook rejection', () => {
  const sig = `t=${T},v1=${VECTOR_HEX}`;

  it('rejects a bad signature', () => {
    const bad = VECTOR_HEX.replace(/^5/, '6');
    expect(() => verifyWebhook({ payload: BODY, signature: `t=${T},v1=${bad}`, secret: SECRET, now: T })).toThrow(WebhookVerificationError);
  });

  it('rejects a tampered body and a wrong secret', () => {
    expect(() => verifyWebhook({ payload: BODY.replace('evt_1', 'evt_2'), signature: sig, secret: SECRET, now: T })).toThrow(
      /No webhook signature matched/,
    );
    expect(() => verifyWebhook({ payload: BODY, signature: sig, secret: 'whsec_other', now: T })).toThrow(WebhookVerificationError);
  });

  it('rejects an expired timestamp (default 300 s tolerance, in ms)', () => {
    expect(() => verifyWebhook({ payload: BODY, signature: sig, secret: SECRET, now: T + 300_001 })).toThrow(/tolerance/);
    expect(() => verifyWebhook({ payload: BODY, signature: sig, secret: SECRET, now: T - 300_001 })).toThrow(/tolerance/);
    expect(verifyWebhook({ payload: BODY, signature: sig, secret: SECRET, now: T + 300_000 })).toBeTruthy();
    expect(verifyWebhook({ payload: BODY, signature: sig, secret: SECRET, now: new Date(T + 10_000) })).toBeTruthy();
  });

  it('honours a custom tolerance', () => {
    expect(() => verifyWebhook({ payload: BODY, signature: sig, secret: SECRET, now: T + 11_000, toleranceSeconds: 10 })).toThrow(
      WebhookVerificationError,
    );
  });

  it('rejects malformed headers', () => {
    for (const header of ['', 'garbage', `v1=${VECTOR_HEX}`, `t=abc,v1=${VECTOR_HEX}`, `t=${T}`, `t=${T},v1=`, null, undefined]) {
      expect(() => verifyWebhook({ payload: BODY, signature: header, secret: SECRET, now: T })).toThrow(WebhookVerificationError);
    }
  });

  it('accepts any of multiple v1 entries (secret rotation)', () => {
    const other = createHmac('sha256', 'whsec_old').update(`${T}.${BODY}`).digest('hex');
    expect(verifyWebhook({ payload: BODY, signature: `t=${T},v1=${other},v1=${VECTOR_HEX}`, secret: SECRET, now: T })).toEqual({
      type: 'parcel.sold',
      id: 'evt_1',
    });
    expect(verifyWebhook({ payload: BODY, signature: `t=${T}, v1=${VECTOR_HEX.toUpperCase()}, v1=${other}`, secret: SECRET, now: T })).toBeTruthy();
  });

  it('rejects a non-JSON payload even when the signature is valid', () => {
    const s = computeWebhookSignature(SECRET, T, 'not json');
    expect(() => verifyWebhook({ payload: 'not json', signature: `t=${T},v1=${s}`, secret: SECRET, now: T })).toThrow(/not valid JSON/);
  });
});

describe('pure-JS SHA-256 / HMAC', () => {
  it('matches node:crypto on random inputs of many lengths', () => {
    for (const len of [0, 1, 55, 56, 63, 64, 65, 119, 120, 127, 128, 1000, 4097]) {
      const data = randomBytes(len);
      expect(toHex(sha256(data))).toBe(createHash('sha256').update(data).digest('hex'));
      for (const keyLen of [0, 10, 64, 65, 200]) {
        const key = randomBytes(keyLen);
        expect(toHex(hmacSha256(key, data))).toBe(createHmac('sha256', key).update(data).digest('hex'));
      }
    }
  });
});
