// Runtime check of the built ES module package (runs on Node >= 18, no test runner needed).
import assert from 'node:assert';
import PropRaven, { NotFoundError, operations, verifyWebhook as v1 } from '../dist/esm/index.js';
import { verifyWebhook as v2, WebhookVerificationError } from '../dist/esm/webhooks.js';

const fetch = async (url) =>
  url.includes('/missing')
    ? new Response(JSON.stringify({ status: 404, code: 'not_found', detail: 'nope' }), { status: 404, headers: { 'content-type': 'application/problem+json' } })
    : new Response('a,b\n1,2\n', { headers: { 'content-type': 'text/csv' } });
const client = new PropRaven({ apiKey: 'pz_x', baseURL: 'https://api.test', fetch });
assert.strictEqual(await client.search.export({ north: 1, south: 0, east: 1, west: 0 }), 'a,b\n1,2\n');
await assert.rejects(client.parcels.get('missing'), NotFoundError);
assert.ok(operations.length > 0);
assert.strictEqual(v1, v2);
assert.throws(() => v2({ payload: '{}', signature: 'bad', secret: 'whsec_x' }), WebhookVerificationError);
console.log(`dist-smoke (esm) ok on node ${process.version}`);
