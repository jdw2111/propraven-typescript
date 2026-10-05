import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { run } from '../examples/run.js';
import { makeClient, recordings, replay } from '../examples/runtime.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const spec = JSON.parse(readFileSync(join(ROOT, 'openapi.json'), 'utf8'));
afterEach(() => vi.unstubAllEnvs());

function pointer(root: any, path: string): any {
  for (const part of path.replace(/^\//, '').split('/')) root = root[part.replace(/~1/g, '/').replace(/~0/g, '~')];
  return root;
}
function resolved(value: any): any {
  if (Array.isArray(value)) return value.map(resolved);
  if (value === null || typeof value !== 'object') return value;
  if (value.$ref) return resolved(pointer(spec, value.$ref.slice(1)));
  return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, resolved(v)]));
}
function canonical(value: any): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

describe('offline public examples', () => {
  for (const row of recordings()) {
    it(`${row.name}: follows pinned upstream schema and rejects a missing required field`, () => {
      const schema = resolved(pointer(spec, row.schema_pointer));
      const recorded = JSON.parse(readFileSync(join(ROOT, 'examples/fixtures/responses.json'), 'utf8'))
        .records.find((r: { name: string }) => r.name === row.name);
      expect(createHash('sha256').update(canonical(schema)).digest('hex')).toBe(recorded.schema_sha256);
      const validate = new Ajv2020({ strict: false, validateFormats: false }).compile(schema);
      expect(validate(row.response), JSON.stringify(validate.errors)).toBe(true);
      const broken = structuredClone(row.response) as Record<string, unknown>;
      delete broken[schema.required[0]];
      expect(validate(broken)).toBe(false);
    });
  }

  it('runs all four examples without using ambient credentials or the network', async () => {
    vi.stubEnv('PROPRAVEN_API_KEY', 'DO_NOT_USE_THIS_TEST_SENTINEL');
    vi.stubEnv('PROPRAVEN_BASE_URL', 'https://must-not-contact.invalid');
    const result = await run(makeClient());
    expect(Object.keys(result)).toEqual(['search', 'parcel', 'coverage', 'storefront']);
    expect(result.parcel.address).toBe(spec.components.schemas.Parcel.properties.address.example);
    expect(result.search.bounds_total).toBe(1);
    expect(result.coverage[0]?.state_fips).toBe('37');
  });

  it('refuses unrecorded endpoints and wrong parameters, with no network fallback', async () => {
    const mock = replay();
    for (const path of ['/api/v1/owners/anything', '/api/v1/storefront/buy_dossier', '/api/v1/coverage?state=06']) {
      await expect(mock.fetch(`https://example.invalid${path}`)).rejects.toThrow('Unrecorded');
    }
    expect((await mock.fetch('https://example.invalid/api/v1/coverage?state=37')).status).toBe(200);
    expect(mock.seen).toEqual(['coverage']);
  });

  it('contains no person values in recorded responses', () => {
    function visit(value: unknown): void {
      if (Array.isArray(value)) { value.forEach(visit); return; }
      if (value !== null && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
          if ((key.startsWith('owner_') && key !== 'owner_pct') || ['email', 'phone', 'contact_name'].includes(key)) expect(item).toBeNull();
          visit(item);
        }
      }
    }
    recordings().forEach((r) => visit(r.response));
  });
});

function snapshot(root: string, relative = ''): Record<string, string> {
  return Object.assign({}, ...readdirSync(join(root, relative), { withFileTypes: true }).map((entry) => {
    const path = join(relative, entry.name);
    return entry.isDirectory() ? snapshot(root, path) : { [path]: readFileSync(join(root, path)).toString('base64') };
  }));
}

it('real regeneration preserves examples, and the guard catches a changed example', () => {
  const temp = mkdtempSync(join(tmpdir(), 'sdk-examples-'));
  try {
    for (const name of ['scripts', 'src', 'examples']) cpSync(join(ROOT, name), join(temp, name), { recursive: true });
    cpSync(join(ROOT, 'README.md'), join(temp, 'README.md'));
    const changed = structuredClone(spec);
    changed.paths['/api/v1/coverage'].get.summary = 'Synthetic regeneration preservation probe';
    writeFileSync(join(temp, 'openapi.json'), JSON.stringify(changed));
    const before = snapshot(join(temp, 'examples'));
    const originalSrc = snapshot(join(temp, 'src'));
    execFileSync(process.execPath, ['scripts/generate.mjs'], { cwd: temp, stdio: 'pipe' });
    expect(snapshot(join(temp, 'src'))).not.toEqual(originalSrc);
    const assertPreserved = () => expect(snapshot(join(temp, 'examples'))).toEqual(before);
    assertPreserved();
    writeFileSync(join(temp, 'examples/search.ts'), 'changed');
    expect(assertPreserved).toThrow();
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
