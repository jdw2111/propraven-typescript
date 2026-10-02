// Hand-written. Webhook signature verification, matching the server signer
// (`X-PropRaven-Signature: t=<unix_ms>,v1=<hex hmac_sha256(secret, `${t}.${rawBody}`)>`).

import { PropRavenError } from './core/errors.js';
import { constantTimeEqual, hmacSha256, toHex } from './core/sha256.js';

/** The header PropRaven signs webhook deliveries with. */
export const WEBHOOK_SIGNATURE_HEADER = 'X-PropRaven-Signature';
export const DEFAULT_WEBHOOK_TOLERANCE_SECONDS = 300;

/** The signature is missing, malformed, wrong, or outside the tolerance window. */
export class WebhookVerificationError extends PropRavenError {
  constructor(message: string) {
    super(message);
    this.name = 'WebhookVerificationError';
  }
}

export interface VerifyWebhookParams {
  /** The RAW request body exactly as received (string or bytes) — not re-serialized JSON. */
  payload: string | Uint8Array;
  /** The `X-PropRaven-Signature` header value. */
  signature: string | null | undefined;
  /** The webhook secret exactly as issued (`whsec_...`); it is used as-is, not decoded. */
  secret: string;
  /** Maximum allowed clock difference in seconds. Default 300. */
  toleranceSeconds?: number;
  /** Current time as Unix milliseconds or a Date (defaults to `Date.now()`). */
  now?: number | Date;
}

const encoder = new TextEncoder();

/** Compute the `v1` hex signature for a timestamp (ms) and raw body. */
export function computeWebhookSignature(secret: string, timestampMs: number | string, payload: string | Uint8Array): string {
  const prefix = encoder.encode(`${timestampMs}.`);
  const body = typeof payload === 'string' ? encoder.encode(payload) : payload;
  const message = new Uint8Array(prefix.length + body.length);
  message.set(prefix);
  message.set(body, prefix.length);
  return toHex(hmacSha256(encoder.encode(secret), message));
}

/**
 * Verify a webhook delivery and return the parsed JSON event.
 * Throws `WebhookVerificationError` when the header is missing or malformed, no `v1` signature
 * matches, or the timestamp is more than `toleranceSeconds` away from `now`.
 */
export function verifyWebhook<T = unknown>(params: VerifyWebhookParams): T {
  const { payload, signature, secret } = params;
  const tolerance = params.toleranceSeconds ?? DEFAULT_WEBHOOK_TOLERANCE_SECONDS;
  if (!secret) throw new WebhookVerificationError('Webhook secret is required.');
  if (!signature || typeof signature !== 'string') {
    throw new WebhookVerificationError(`Missing ${WEBHOOK_SIGNATURE_HEADER} header.`);
  }

  let timestamp: string | undefined;
  const candidates: string[] = [];
  for (const part of signature.split(',')) {
    const eq = part.indexOf('=');
    if (eq <= 0) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === 't') timestamp = value;
    else if (key === 'v1' && value) candidates.push(value.toLowerCase());
  }
  if (timestamp === undefined || !/^\d+$/.test(timestamp)) {
    throw new WebhookVerificationError(`Malformed ${WEBHOOK_SIGNATURE_HEADER} header: missing or invalid t=.`);
  }
  if (candidates.length === 0) {
    throw new WebhookVerificationError(`Malformed ${WEBHOOK_SIGNATURE_HEADER} header: no v1= signature.`);
  }

  const now = params.now instanceof Date ? params.now.getTime() : (params.now ?? Date.now());
  const t = Number(timestamp);
  if (Math.abs(now - t) > tolerance * 1000) {
    throw new WebhookVerificationError('Webhook timestamp is outside the tolerance window.');
  }

  const expected = computeWebhookSignature(secret, timestamp, payload);
  let matched = false;
  for (const candidate of candidates) {
    if (constantTimeEqual(candidate, expected)) matched = true;
  }
  if (!matched) throw new WebhookVerificationError('No webhook signature matched the payload.');

  const text = typeof payload === 'string' ? payload : new TextDecoder().decode(payload);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new WebhookVerificationError('Webhook payload is not valid JSON.');
  }
}
