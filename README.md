# PropRaven TypeScript SDK

[![npm](https://img.shields.io/npm/v/@propraven/sdk.svg)](https://www.npmjs.com/package/@propraven/sdk)

The official TypeScript / JavaScript client for the [PropRaven](https://propraven.com) property intelligence API:
US parcels, owners, permits, deeds, deal screens, market data and webhooks.

- Typed methods for every operation in the API's OpenAPI spec, generated from [`openapi.json`](openapi.json).
- Zero runtime dependencies (uses the global `fetch`), Node.js 18+, ESM and CommonJS, with type definitions.
- Retries with backoff, RFC 7807 errors as typed exceptions, auto-pagination, webhook verification and rate-limit info.

Docs: [propraven.com/docs/typescript](https://propraven.com/docs/typescript) · REST reference: [propraven.com/docs/v1](https://propraven.com/docs/v1) · Developer hub: [propraven.com/developers](https://propraven.com/developers) · Hosted MCP server: [propraven.com/docs/mcp](https://propraven.com/docs/mcp)

> **Server-side only.** The REST API sends no CORS headers and API keys are secret, so the client refuses to run in a
> browser (it throws if `window` and `document` exist) unless you pass `dangerouslyAllowBrowser: true`. Call PropRaven
> from your server, a serverless function or a script.

## Install

```sh
npm install @propraven/sdk
```

## Quick start

```ts
import PropRaven from '@propraven/sdk';

const client = new PropRaven(); // reads PROPRAVEN_API_KEY from the environment

const parcel = await client.parcels.get('37:119:12104406');
console.log(parcel.address, parcel.total_assessed_value);

const permits = await client.parcels.permits('37:119:12104406', { shape: 'envelope' });

const page = await client.search.parcels({
  bounds: { north: 35.85, south: 35.75, east: -78.55, west: -78.7 },
  filters: { absenteeOnly: true },
  limit: 25,
});
```

CommonJS works too: `const { PropRaven } = require('@propraven/sdk');`.

### Calling convention

Every method takes its **path parameters positionally** (in path order), then **one params object** that holds the
query parameters, header parameters and JSON body fields, then optional per-request options:

```ts
client.parcels.permits(id, { shape: 'envelope' }, { timeout: 10_000 });
client.search.parcels({ bounds, filters, limit });         // body fields
client.verify.get({ parcel_id: '37:119:12104406', fields: 'year_built', preview: 'true' });
```

Parameter names are the wire names (`county_fips`, `state_fips`, `min_value`). Header parameters get friendly names:
`X-CREDIT-TOKEN` is `creditToken` and `X-PAYMENT` is `payment`. The SDK never signs x402 payments; a payment
requirement surfaces as `PaymentRequiredError`.

Responses are typed: `ParcelsGetResponse`, `DealsAbsenteeResponse`, ... (every component schema is exported as well,
e.g. `Parcel`, `Owner`, `Permit`). Numbers are JSON numbers; identifiers (`parcel_id`, `apn`, `county_fips`,
`state_fips`, `zip`) are strings. CSV endpoints (`search.export`) return a `string`.

## Authentication

Pass `apiKey`, or set `PROPRAVEN_API_KEY`. The key is sent as `Authorization: Bearer <key>`.

```ts
const client = new PropRaven({ apiKey: process.env.MY_PROPRAVEN_KEY });
```

PropRaven keys start with `pz_`; the client logs a warning (and still sends it) when a key does not. A missing key
is allowed — several endpoints are key-optional (anonymous calls are limited to 100 a day and 60 a minute per IP) —
and the server answers `401` where a key is required.

## Errors

Non-2xx responses throw a subclass of `APIError`, parsed from the API's RFC 7807 problem body (older `{error}` bodies
and x402 `402` envelopes are understood too):

```ts
import PropRaven, { NotFoundError, RateLimitError, APIError } from '@propraven/sdk';

try {
  await client.parcels.get('37:119:0000');
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log('no such parcel');
  } else if (err instanceof RateLimitError) {
    console.log(`retry in ${err.retryAfter}s`);
  } else if (err instanceof APIError) {
    console.log(err.status, err.code, err.detail, err.errors, err.requestId);
  } else {
    throw err;
  }
}
```

| Status | Class |
| --- | --- |
| 400 | `BadRequestError` (`errors` lists each bad `{param, message}`) |
| 401 | `AuthenticationError` |
| 402 | `PaymentRequiredError` (`accepts` holds the x402 requirements, empty otherwise) |
| 403 | `PermissionDeniedError` |
| 404 | `NotFoundError` |
| 405 | `MethodNotAllowedError` |
| 409 | `ConflictError` |
| 413 | `PayloadTooLargeError` |
| 422 | `UnprocessableEntityError` |
| 429 | `RateLimitError` (`retryAfter` in seconds, or `null`) |
| 503 | `ServiceUnavailableError` |
| 504 | `GatewayTimeoutError` |
| other 5xx | `InternalServerError` |
| no response | `APIConnectionError`, `APITimeoutError` (a subclass) |
| aborted via `signal` | `APIUserAbortError` |

Every `APIError` has `status`, `type`, `title`, `detail`, `code`, `errors`, `requestId`, `headers`, `body` and
`retryAfter`; its message is `"<status> <code>: <detail>"`. All errors extend `PropRavenError`. The classes are also
available as statics (`PropRaven.NotFoundError`).

## Retries and timeouts

Failed requests are retried up to **2** times (`maxRetries`) on network errors, timeouts, `429`, `503` and `504` for
any method, and on other `5xx` only for `GET`/`HEAD`/`DELETE`/`OPTIONS`. Other `4xx` — `402` in particular, whose
`Retry-After` is in days — are never retried. The wait is the server's `Retry-After` (seconds or HTTP date), else the
`X-RateLimit-Reset` of an exhausted window, else exponential backoff (0.5 s, 1 s, ... ±25% jitter). If the server asks
for more than 60 s the error is raised instead of waiting.

The default timeout is **60 s** (`timeout`, in milliseconds). Both can be set per client and per request:

```ts
const client = new PropRaven({ maxRetries: 4, timeout: 20_000 });
await client.deals.absentee({ county_fips: '37119' }, { maxRetries: 0, timeout: 5_000 });
```

## Pagination

Every paginated method `m` has an auto-paginating sibling `mAll` that returns an `AsyncIterable` of items. Offset
endpoints advance `offset` (in the query string, or in the JSON body for `POST /search`) until a short page, `total`,
or `has_more: false`; `search.full` follows `nextCursor` via `after`.

```ts
for await (const parcel of client.deals.absenteeAll({ county_fips: '37119' }, { pageSize: 100, maxItems: 1000 })) {
  console.log(parcel.parcel_id);
}

const hits = await client.search.fullAll({ q: 'main st', state: 'NC' }, { maxItems: 200 }).toArray();
```

`pageSize` is sent as `limit`; `maxItems` bounds the total. The second argument also accepts the per-request options.

## Webhooks

Deliveries carry `X-PropRaven-Signature: t=<unix_ms>,v1=<hex>`, an HMAC-SHA256 of `` `${t}.${rawBody}` `` keyed with
your webhook secret (`whsec_...`, used exactly as issued). Verify against the **raw** body:

```ts
import { verifyWebhook, WebhookVerificationError } from '@propraven/sdk/webhooks'; // or from '@propraven/sdk'

app.post('/webhooks/propraven', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const event = verifyWebhook({
      payload: req.body, // Buffer or string, exactly as received
      signature: req.header('X-PropRaven-Signature'),
      secret: process.env.PROPRAVEN_WEBHOOK_SECRET!,
    });
    console.log(event);
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof WebhookVerificationError) return res.sendStatus(400);
    throw err;
  }
});
```

Timestamps more than `toleranceSeconds` (default 300) from now are rejected; several `v1=` entries are accepted
(secret rotation); comparison is constant-time. The verifier is synchronous and dependency-free.

## Rate-limit info

`client.lastRateLimit` holds `{ limit, remaining, reset }` from the most recent response that carried
`X-RateLimit-*` headers (`reset` is Unix epoch seconds), or `null`. For one call, use `.withResponse()`:

```ts
const { data, response, rateLimit, requestId } = await client.account.usage().withResponse();
console.log(rateLimit?.remaining, response.status);
```

## Configuration

| Option | Default | |
| --- | --- | --- |
| `apiKey` | `process.env.PROPRAVEN_API_KEY` | `pz_...` key; may be omitted |
| `baseURL` | `process.env.PROPRAVEN_BASE_URL` or `https://propraven.com` | paths include `/api/v1` |
| `timeout` | `60000` | milliseconds |
| `maxRetries` | `2` | |
| `defaultHeaders` | `{}` | sent on every request |
| `fetch` | global `fetch` | custom fetch implementation |
| `dangerouslyAllowBrowser` | `false` | see the server-side note above |

Per-request options: `timeout`, `maxRetries`, `headers` (a `null` value removes a header), `query`, `signal`.

## Methods

<!-- generated:methods:start (scripts/generate.mjs) -->
70 operations in 19 namespaces.

| Method | HTTP | Summary |
| --- | --- | --- |
| `client.account.usage(params?)` | `GET /api/v1/account/usage` | Current-period usage and quota |
| `client.cmbs.exposure(params?)` | `GET /api/v1/cmbs/exposure` | CMBS loan exposure for a parcel or an owner |
| `client.cohorts.export(id, params?)` | `GET /api/v1/cohorts/{id}/export` | Mail-merge export of one of your lists (account required; included for subscribers, per row otherwise) |
| `client.cohorts.list(params?)` | `GET /api/v1/cohorts` | List your saved parcel lists (cohorts) |
| `client.coverage.get(params?)` | `GET /api/v1/coverage` | Get coverage statistics |
| `client.coverage.map(params?)` | `GET /api/v1/coverage/map` | County coverage map data |
| `client.credits.balance(params)` | `GET /api/v1/storefront/credits/balance` | Read a prepaid credit balance + ledger |
| `client.credits.topup(params)` | `GET /api/v1/storefront/credits/topup` | Fund a prepaid credit balance over x402 |
| `client.crime.lookup(params)` | `GET /api/v1/crime/lookup` | Crime score near a point |
| `client.deals.absentee(params?)`<br>+ `absenteeAll()` iterator | `GET /api/v1/deals/absentee` | Find absentee owners |
| `client.deals.contractors(params?)`<br>+ `contractorsAll()` iterator | `GET /api/v1/deals/contractors` | Search contractors by permit activity |
| `client.deals.entities(params?)`<br>+ `entitiesAll()` iterator | `GET /api/v1/deals/entities` | Find entity-owned parcels (LLC, Corp, Trust, LP) |
| `client.deals.flips(params?)`<br>+ `flipsAll()` iterator | `GET /api/v1/deals/flips` | Find property flips |
| `client.deals.highLandRatio(params?)`<br>+ `highLandRatioAll()` iterator | `GET /api/v1/deals/high-land-ratio` | Find parcels with high land-to-improvement ratio |
| `client.deals.lenders(params?)`<br>+ `lendersAll()` iterator | `GET /api/v1/deals/lenders` | Search lender profiles |
| `client.deals.longHold(params?)`<br>+ `longHoldAll()` iterator | `GET /api/v1/deals/long-hold` | Find long-held parcels (10+ years) |
| `client.deals.market(params?)`<br>+ `marketAll()` iterator | `GET /api/v1/deals/market` | County-quarter transaction summary or affordability index |
| `client.deals.portfolioOwners(params?)`<br>+ `portfolioOwnersAll()` iterator | `GET /api/v1/deals/portfolio-owners` | Find portfolio investors (owners of 2+ properties) |
| `client.freshness.datasets(params?)` | `GET /api/v1/freshness/datasets` | Per-dataset availability and freshness |
| `client.freshness.get(params?)` | `GET /api/v1/freshness` | How fresh the served parcel snapshot is |
| `client.leads.find(params)` | `GET /api/v1/leads/find` | Lead feed (paid, priced per lead) — with a FREE preview |
| `client.lookup.batch(params)` | `POST /api/v1/lookup/batch` | Resolve up to 500 parcel queries in one call |
| `client.lookup.get(params)` | `GET /api/v1/lookup` | Exact parcel lookup (UUID or APN) |
| `client.market.counties(params?)`<br>+ `countiesAll()` iterator | `GET /api/v1/market/counties` | Get county market statistics |
| `client.market.county(fips, params?)` | `GET /api/v1/market/counties/{fips}` | Detailed view for a single county |
| `client.market.flips(params?)`<br>+ `flipsAll()` iterator | `GET /api/v1/market/flips` | Flip-activity summary grouped by county |
| `client.market.snapshot(params?)` | `GET /api/v1/market/snapshot` | Market snapshot for a geography |
| `client.market.trends(params?)` | `GET /api/v1/market/trends` | Get market trends |
| `client.owners.card(params?)` | `GET /api/v1/owners/card` | Owner card -- the owner of record and their mailing contact (account required) |
| `client.owners.get(name, params?)` | `GET /api/v1/owners/{name}` | Get owner profile |
| `client.owners.portfolio(name, params?)` | `GET /api/v1/owners/{name}/portfolio` | Get owner portfolio summary |
| `client.owners.properties(name, params?)`<br>+ `propertiesAll()` iterator | `GET /api/v1/owners/{name}/properties` | Get owner's properties |
| `client.owners.report(name, params?)` | `GET /api/v1/owners/{name}/report` | Owner intelligence report (paid, priced per resolution; account required) — with a free preview |
| `client.owners.search(params)` | `GET /api/v1/owners/search` | Search property owners |
| `client.owners.transactions(name, params?)` | `GET /api/v1/owners/{name}/transactions` | Recorded deed transactions for an owner |
| `client.parcels.assessmentHistory(id, params?)` | `GET /api/v1/parcels/{id}/assessment-history` | Get recorded annual assessment history |
| `client.parcels.batch(params)` | `POST /api/v1/parcels/batch` | Fetch up to 100 parcels by (state, county, parcel) tuple |
| `client.parcels.compPack(id, params?)` | `GET /api/v1/parcels/{id}/comp-pack` | Comp pack (paid, priced per pack) — with a FREE preview |
| `client.parcels.comps(id, params?)` | `GET /api/v1/parcels/{id}/comps` | Comparable sales for a parcel |
| `client.parcels.deeds(id, params?)` | `GET /api/v1/parcels/{id}/deeds` | Get parcel deed history |
| `client.parcels.geojson(params)` | `GET /api/v1/parcels/geojson` | Parcel polygons as GeoJSON for a bounding box |
| `client.parcels.get(id, params?)` | `GET /api/v1/parcels/{id}` | Get parcel by ID |
| `client.parcels.occupants(id, params?)` | `GET /api/v1/parcels/{id}/occupants` | Business occupants of a parcel |
| `client.parcels.owner(id, params?)` | `GET /api/v1/parcels/{id}/owner` | Get parcel owner details and portfolio |
| `client.parcels.permits(id, params?)` | `GET /api/v1/parcels/{id}/permits` | Get parcel permits |
| `client.parcels.pois(params)` | `GET /api/v1/parcels/poi` | Business parcels in a small bounding box |
| `client.parcels.report(id, params?)` | `GET /api/v1/parcels/{id}/report` | Parcel dossier (paid, provenance-first) |
| `client.parcels.risks(id, params?)` | `GET /api/v1/parcels/{id}/risks` | Get parcel risk assessment |
| `client.parcels.riskScore(id, params?)` | `GET /api/v1/parcels/{id}/risk-score` | Risk score (paid, priced per assessment) — with a FREE preview |
| `client.parcels.trafficHistory(id, params)` | `GET /api/v1/parcels/{id}/traffic-history` | Nearest traffic station + AADT history |
| `client.parcels.violations(id, params?)` | `GET /api/v1/parcels/{id}/violations` | Code violations on a parcel |
| `client.search.autocomplete(params)` | `GET /api/v1/search/autocomplete` | Address / place / parcel autocomplete |
| `client.search.export(params?)` | `GET /api/v1/search/export` | Export search results as CSV |
| `client.search.full(params)`<br>+ `fullAll()` iterator | `GET /api/v1/search/full` | Full paginated text + attribute search |
| `client.search.parcels(params?)`<br>+ `parcelsAll()` iterator | `POST /api/v1/search` | Search parcels |
| `client.storefront.availability(params?)` | `GET /api/v1/storefront/availability` | Machine Storefront -- try-before-buy (jurisdiction coverage or per-parcel quote) |
| `client.storefront.catalog(params?)` | `GET /api/v1/storefront/catalog` | Machine Storefront — sealed field catalog |
| `client.traffic.stations(params)` | `GET /api/v1/traffic/stations` | Traffic count stations in a bounding box |
| `client.verify.batch(params)` | `POST /api/v1/verify` | Verify facts (batch, paid per lookup) - FREE preview |
| `client.verify.get(params)` | `GET /api/v1/verify` | Verify facts for one parcel |
| `client.watch.create(params)` | `POST /api/v1/watch` | Create a watch (free) |
| `client.watch.delete(id, params)` | `DELETE /api/v1/watch/{id}` | Delete a watch |
| `client.watch.list(params)` | `GET /api/v1/watch` | List your watches |
| `client.watch.poll(id, params)` | `GET /api/v1/watch/{id}` | Poll a watch for new changes (priced per delta) |
| `client.webhooks.create(params)` | `POST /api/v1/webhooks` | Create a webhook endpoint |
| `client.webhooks.delete(id, params?)` | `DELETE /api/v1/webhooks/{id}` | Soft-disable a webhook endpoint |
| `client.webhooks.deliveries(id, params?)` | `GET /api/v1/webhooks/{id}/deliveries` | Recent delivery attempts for a webhook |
| `client.webhooks.get(id, params?)` | `GET /api/v1/webhooks/{id}` | Get a single webhook endpoint |
| `client.webhooks.list(params?)` | `GET /api/v1/webhooks` | List webhook endpoints |
| `client.webhooks.retryDelivery(id, deliveryId, params?)` | `POST /api/v1/webhooks/{id}/deliveries/{deliveryId}/retry` | Re-queue a failed webhook delivery |
<!-- generated:methods:end -->

## Regenerating from the spec

The typed layer (`src/generated/`) is generated from `openapi.json` by `scripts/generate.mjs`; the core
(`src/core/`, `src/webhooks.ts`, `src/client.ts`) is hand-written.

```sh
npm run spec:update -- /path/to/openapi.json   # or a URL; default https://propraven.com/openapi.json
npm run generate
npm run typecheck && npm test
```

`.github/workflows/regenerate.yml` does this daily and opens a `spec-sync` PR when the live spec changes.

## Requirements

Node.js 18 or later (or any runtime with a WHATWG `fetch`: Deno, Bun, Cloudflare Workers, Vercel Edge).
TypeScript users need the DOM or `@types/node` typings for `fetch`/`Response`.

## License

Apache-2.0. API data is licensed separately under the [PropRaven terms](https://propraven.com/terms#data-license).
