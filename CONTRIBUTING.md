# Contributing

## Setup

```sh
npm ci
npm run generate:check   # generated code matches openapi.json
npm run typecheck
npm test                 # vitest, mocked fetch, no network (Node >= 22 for the test runner)
npm run build            # dist/esm + dist/cjs
npm run smoke:dist       # plain-Node checks of the built package (works on Node 18+)
```

## Layout

- `openapi.json` — the vendored API spec (source of truth for the generated layer).
- `scripts/generate.mjs` — the generator. It writes `src/generated/*` and the method table in `README.md`.
  Never edit generated files by hand; change the spec or the generator and run `npm run generate`.
- `src/core/`, `src/client.ts`, `src/webhooks.ts`, `src/index.ts` — the hand-written core.
- `scripts/live-smoke.mjs` — a read-only smoke test against the real API (not run in CI):
  `npm run build && PROPRAVEN_API_KEY=pz_... node scripts/live-smoke.mjs`.

## Updating the spec

```sh
npm run spec:update -- /path/to/openapi.json   # or a URL (default https://propraven.com/openapi.json)
npm run generate && npm run typecheck && npm test
```

Every operation needs `x-sdk-group` and `x-sdk-method` (and `x-sdk-pagination` when it pages); the generator
refuses specs without them.

## Releasing

1. Bump `version` in `package.json` and `src/version.ts`, and add a `CHANGELOG.md` entry.
2. Merge to `main`, then publish a GitHub release `vX.Y.Z`. `.github/workflows/publish-npm.yml` builds, tests and
   publishes with npm trusted publishing (it skips if the version is already on npm).
