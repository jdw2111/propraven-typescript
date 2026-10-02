#!/usr/bin/env node
// Live smoke test against the real API. NOT run in CI.
//
//   npm run build && PROPRAVEN_API_KEY=pz_... node scripts/live-smoke.mjs
//
// Safety rails (enforced by the fetch wrapper below):
//   - at most SMOKE_MAX_CALLS HTTP requests (default 12), at most 2 requests/second;
//   - read-only operations only: no purchases, no `payment`/X-PAYMENT header ever, no paid
//     operation (all of which would need preview=true), no webhook/watch/cohort creation;
//   - retries disabled so the call budget is exact;
//   - the API key is never printed.
// Optional: PROPRAVEN_BASE_URL (default https://propraven.com).

import { BadRequestError, NotFoundError, PropRaven } from '../dist/esm/index.js';

const MAX_CALLS = Number(process.env.SMOKE_MAX_CALLS ?? 12);
const MIN_INTERVAL_MS = 500; // 2 requests / second
const FORBIDDEN_HEADERS = ['x-payment'];
const FORBIDDEN_PATHS = [/\/report$/, /\/comp-pack$/, /\/risk-score$/, /\/leads\//, /\/verify/, /\/credits\//, /\/watch/, /\/cohorts/, /\/webhooks/];

if (!process.env.PROPRAVEN_API_KEY) {
  console.error('PROPRAVEN_API_KEY is not set.');
  process.exit(2);
}

let calls = 0;
let last = 0;
class BudgetExhausted extends Error {}

async function guardedFetch(url, init = {}) {
  const u = new URL(url);
  const headers = Object.fromEntries(Object.entries(init.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]));
  if (FORBIDDEN_HEADERS.some((h) => h in headers)) throw new Error(`refusing to send a payment header to ${u.pathname}`);
  if (FORBIDDEN_PATHS.some((re) => re.test(u.pathname))) throw new Error(`refusing to call ${u.pathname} from the smoke test`);
  if ((init.method ?? 'GET') !== 'GET' && u.pathname !== '/api/v1/search') throw new Error(`refusing ${init.method} ${u.pathname}`);
  if (calls >= MAX_CALLS) throw new BudgetExhausted(`call budget (${MAX_CALLS}) exhausted`);
  const wait = last + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  last = Date.now();
  calls++;
  return fetch(url, init);
}

const client = new PropRaven({ fetch: guardedFetch, maxRetries: 0, timeout: 30_000 });
console.log(`PropRaven TypeScript SDK live smoke — ${new Date().toISOString()}`);
console.log(`base URL: ${client.baseURL}; key: ${client.apiKey ? 'present (redacted)' : 'absent'}; budget: ${MAX_CALLS} calls, <=2 req/s, retries off`);

const results = [];
function record(name, status, detail, ok) {
  results.push({ name, status, detail, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(34)} ${String(status).padEnd(24)} ${detail}`);
}

async function step(name, fn) {
  const before = calls;
  const t0 = Date.now();
  try {
    const detail = await fn();
    record(name, `ok (${calls - before} call${calls - before === 1 ? '' : 's'})`, `${detail} [${Date.now() - t0} ms]`, true);
  } catch (err) {
    if (err instanceof BudgetExhausted || err?.cause instanceof BudgetExhausted || /call budget/.test(String(err?.message))) {
      record(name, 'skipped', 'call budget exhausted', true);
      return;
    }
    const status = err?.status ? `${err.status} ${err.name}` : err?.name ?? 'Error';
    record(name, status, `${err?.code ?? ''} ${String(err?.detail ?? err?.message ?? err).slice(0, 160)}`, false);
  }
}

async function expectError(name, Cls, fn) {
  const before = calls;
  try {
    await fn();
    record(name, 'unexpected 2xx', `expected ${Cls.name}`, false);
  } catch (err) {
    if (/call budget/.test(String(err?.message))) {
      record(name, 'skipped', 'call budget exhausted', true);
      return;
    }
    const ok = err instanceof Cls;
    record(name, `${err?.status ?? '-'} ${err?.name} (${calls - before} call)`, `${ok ? 'expected' : `expected ${Cls.name}`}; code=${err?.code ?? '-'}`, ok);
  }
}

const count = (v) => (Array.isArray(v) ? v.length : Array.isArray(v?.data) ? v.data.length : '?');
let parcelId = '37:119:12104406'; // the spec's example id; replaced by a search hit below
let ownerName;

await step('search.fullAll (2 cursor pages)', async () => {
  const rows = await client.search.fullAll({ q: 'main st', state: 'NC' }, { pageSize: 2, maxItems: 4 }).toArray();
  const hit = rows.find((r) => r.parcel_id && r.county_fips);
  if (hit) {
    const cf = String(hit.county_fips);
    parcelId = cf.length === 5 ? `${cf.slice(0, 2)}:${cf.slice(2)}:${hit.parcel_id}` : `${cf}:${hit.parcel_id}`;
    ownerName = rows.find((r) => r.owner_name)?.owner_name ?? undefined;
  }
  return `${rows.length} results`;
});

await step('search.parcels (bounds)', async () => {
  const r = await client.search.parcels({ bounds: { north: 35.79, south: 35.77, east: -78.63, west: -78.65 }, limit: 2 });
  // Prefer the serving row's own composite id for the parcels.* calls below.
  const row = r.data.find((p) => typeof p.id === 'string' && p.id);
  if (row) parcelId = row.id;
  return `${count(r)} rows, total=${r.total}, has_more=${r.has_more}`;
});

await step('parcels.get', async () => {
  const p = await client.parcels.get(parcelId);
  ownerName ??= p.owner_name ?? undefined;
  return `parcel ${parcelId}; total_assessed_value is ${typeof p.total_assessed_value}`;
});

await step('parcels.permits (envelope)', async () => {
  const r = await client.parcels.permits(parcelId, { shape: 'envelope' });
  return Array.isArray(r) ? `${r.length} permits (bare array)` : `${r.data.length} permits, permit_count=${r.permit_count} (${r.permit_count_basis})`;
});

await step('deals.absenteeAll (2 offset pages)', async () => {
  const rows = await client.deals.absenteeAll({ county_fips: '37183' }, { pageSize: 2, maxItems: 4 }).toArray();
  return `${rows.length} rows`;
});

await step('market.counties', async () => {
  const r = await client.market.counties({ state_fips: '37', limit: 2 });
  return `${count(r)} counties`;
});

await step('owners.get', async () => {
  if (!ownerName) throw new Error('no owner name found in earlier results');
  const o = await client.owners.get(ownerName);
  return `owner record with ${Object.keys(o ?? {}).length} fields (name redacted)`;
});

await step('account.usage', async () => {
  const u = await client.account.usage();
  return `tier=${u.tier ?? '?'}; calls_remaining is ${typeof u.calls_remaining}`;
});

await expectError('parcels.get (non-existent id)', NotFoundError, () => client.parcels.get('99:999:sdk-smoke-does-not-exist'));
await expectError('deals.absentee (limit=0)', BadRequestError, () => client.deals.absentee({ county_fips: '37183', limit: 0 }));

await step('coverage.get', async () => {
  const c = await client.coverage.get({ state: 'NC' });
  return `${Object.keys(c ?? {}).length} top-level fields`;
});

await step('freshness.get', async () => {
  const f = await client.freshness.get();
  return `${Object.keys(f ?? {}).length} top-level fields`;
});

const rl = client.lastRateLimit;
console.log(`\nHTTP calls made: ${calls}/${MAX_CALLS}`);
console.log(`last rate limit: ${rl ? `limit=${rl.limit} remaining=${rl.remaining} reset=${rl.reset}` : 'none reported'}`);
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `${failed.length} FAILED` : 'ALL PASSED');
process.exit(failed.length ? 1 : 0);
