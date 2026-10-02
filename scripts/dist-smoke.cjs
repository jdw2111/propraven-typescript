// Runtime check of the built CommonJS package (runs on Node >= 18, no test runner needed).
const assert = require('node:assert');
const { createHmac } = require('node:crypto');
const sdk = require('../dist/cjs/index.js');
const webhooks = require('../dist/cjs/webhooks.js');

(async () => {
  const seen = [];
  const fetch = async (url, init) => {
    seen.push({ url, init });
    if (url.includes('/missing')) {
      return new Response(JSON.stringify({ status: 404, code: 'not_found', detail: 'nope' }), {
        status: 404,
        headers: { 'content-type': 'application/problem+json' },
      });
    }
    return new Response(JSON.stringify({ data: [{ id: 1 }], limit: 2 }), { headers: { 'content-type': 'application/json' } });
  };
  const client = new sdk.PropRaven({ apiKey: 'pz_x', baseURL: 'https://api.test', fetch });
  assert.strictEqual(sdk.default, sdk.PropRaven);
  const res = await client.deals.absentee({ county_fips: '37119' });
  assert.deepStrictEqual(res.data, [{ id: 1 }]);
  assert.strictEqual(seen[0].init.headers.Authorization, 'Bearer pz_x');
  const all = await client.deals.absenteeAll({}, { pageSize: 2 }).toArray();
  assert.strictEqual(all.length, 1);
  await assert.rejects(client.owners.get('missing'), (e) => e instanceof sdk.NotFoundError && e.code === 'not_found');
  const body = '{"type":"parcel.sold","id":"evt_1"}';
  const sig = createHmac('sha256', 'whsec_test').update(`1700000000000.${body}`).digest('hex');
  assert.deepStrictEqual(webhooks.verifyWebhook({ payload: body, signature: `t=1700000000000,v1=${sig}`, secret: 'whsec_test', now: 1700000000000 }), {
    type: 'parcel.sold',
    id: 'evt_1',
  });
  assert.strictEqual(sdk.verifyWebhook, webhooks.verifyWebhook);
  console.log(`dist-smoke (cjs) ok on node ${process.version}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
