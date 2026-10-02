# Changelog

## 0.3.0 (2026-10-02)

A rewrite. The Stainless-generated client is replaced by a small hand-written core (transport, retries, errors,
pagination, webhooks) plus a typed layer generated in this repo from the API's `openapi.json`
(`npm run generate`). The SDK now covers all 69 operations of API 1.2.0 (0.2.0 had 37).

### Breaking changes

* **Client name.** The class is `PropRaven` (named and default export). `Propraven` remains as a deprecated alias.
* **Namespaces.** The `client.v1.*` tree is gone. Methods live on flat namespaces named by the spec's `x-sdk-group`
  with camelCase names from `x-sdk-method`, e.g. `client.v1.parcels.retrieve(id)` is now `client.parcels.get(id)`,
  and `client.v1.deals.findHighLandRatio(...)` is now `client.deals.highLandRatio(...)`. See the
  method table in the README.
* **Call signature.** Path parameters are positional (in path order), followed by ONE params object holding query
  parameters, header parameters (`creditToken` for `X-CREDIT-TOKEN`, `payment` for `X-PAYMENT`) and JSON body fields,
  then per-request options (`timeout`, `maxRetries`, `headers`, `query`, `signal`).
* **Numbers are numbers.** Numeric fields are typed `number` (the API now emits JSON numbers); identifiers
  (`parcel_id`, `apn`, `county_fips`, `state_fips`, `zip`) stay strings. Nullable fields are `T | null`.
* **Problem errors.** Errors are parsed from RFC 7807 `application/problem+json` bodies (legacy `{error}` and x402
  envelopes too). `APIError` now exposes `status`, `type`, `title`, `detail`, `code`, `errors`, `requestId`,
  `headers`, `body`, `retryAfter`; the message is `"<status> <code>: <detail>"`. New classes:
  `PaymentRequiredError` (402, with x402 `accepts`), `MethodNotAllowedError` (405), `PayloadTooLargeError` (413),
  `ServiceUnavailableError` (503), `GatewayTimeoutError` (504), `APIUserAbortError`.
* **Retries.** `402` and other `4xx` (except `429`) are never retried; non-idempotent requests are retried only on
  network errors, `429`, `503` and `504`; a server-requested wait over 60 s raises instead of sleeping.
* **Timeout** is in milliseconds (default 60000).
* **Browser use** now throws unless `dangerouslyAllowBrowser: true` (the API sends no CORS headers).
* **Packaging.** Zero runtime dependencies; Node.js >= 18; dual ESM/CommonJS build under `dist/esm` and `dist/cjs`
  with an `exports` map (`.`, `./webhooks`). Deep imports of internal files are no longer supported.

### Features

* 32 operations that 0.2.0 lacked (storefront catalog/availability, leads, credits, watch, verify, cohorts, lookup,
  parcels batch/comps/occupants/violations/POIs, market snapshot, CMBS exposure, freshness, coverage map, crime,
  traffic, webhook delivery retry, ...).
* Auto-pagination: every paginated method `m` has `mAll(params, { pageSize, maxItems })` returning an
  `AsyncIterable` (offset style, including `POST /search` body offsets, and cursor style for `search.full`).
* `verifyWebhook()` (also `@propraven/sdk/webhooks`): `X-PropRaven-Signature` HMAC-SHA256 verification with
  tolerance and multi-`v1` rotation support; synchronous and dependency-free.
* `client.lastRateLimit` and `.withResponse()` for `X-RateLimit-*` headers and the raw `Response`.
* `User-Agent: propraven-typescript/<version>` on Node; a warning when an API key does not start with `pz_`.
* CSV endpoints (`search.export`, `cohorts.export` without preview) return strings.

## 0.2.0 (2026-05-16)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/jdw2111/propraven-typescript/compare/v0.1.0...v0.2.0)

### Features

* **api:** api update ([fde94f5](https://github.com/jdw2111/propraven-typescript/commit/fde94f56e8399a49b95a082749dcd7a8367e903d))

## 0.1.0 (2026-05-16)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/jdw2111/propraven-typescript/compare/v0.0.1...v0.1.0)

### Features

* **api:** api update ([a6ab53e](https://github.com/jdw2111/propraven-typescript/commit/a6ab53e679674662a7bb3f63086da081e1bd18b9))
* **api:** api update ([f9d75a1](https://github.com/jdw2111/propraven-typescript/commit/f9d75a1745d6587f48fa6ab531b77387040417b6))
