#!/usr/bin/env node
// Replace openapi.json with a new spec (local path or URL), normalized to 2-space JSON.
//
//   npm run spec:update -- /path/to/openapi.json
//   npm run spec:update -- https://propraven.com/openapi.json   (the default)
//
// Then: npm run generate && npm run typecheck && npm test
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2] ?? 'https://propraven.com/openapi.json';

let text;
if (/^https?:\/\//.test(source)) {
  const res = await fetch(source, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`GET ${source} -> ${res.status}`);
  text = await res.text();
} else {
  text = readFileSync(source, 'utf8');
}
const spec = JSON.parse(text);
if (!spec.openapi || !spec.paths) throw new Error(`${source} is not an OpenAPI document`);
writeFileSync(join(ROOT, 'openapi.json'), JSON.stringify(spec, null, 2) + '\n');
const ops = Object.values(spec.paths).reduce(
  (n, item) => n + ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].filter((m) => item[m]).length,
  0,
);
console.log(`openapi.json <- ${source} (OpenAPI ${spec.openapi}, API ${spec.info?.version ?? '?'}, ${ops} operations)`);
