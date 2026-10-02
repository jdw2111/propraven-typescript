import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { operations, PropRaven } from '../src/index.js';
import { OPERATION_COUNT } from '../src/generated/client.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const spec = JSON.parse(readFileSync(join(ROOT, 'openapi.json'), 'utf8'));
const HTTP = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
const specOps: Array<{ method: string; path: string; op: Record<string, unknown> }> = [];
for (const [path, item] of Object.entries<Record<string, Record<string, unknown>>>(spec.paths)) {
  for (const method of HTTP) if (item[method]) specOps.push({ method: method.toUpperCase(), path, op: item[method]! });
}

describe('generated surface', () => {
  const client = new PropRaven({ apiKey: 'pz_x', fetch: async () => new Response('{}') });

  it('has one method per spec operation', () => {
    expect(specOps.length).toBeGreaterThan(0);
    expect(OPERATION_COUNT).toBe(specOps.length);
    expect(operations).toHaveLength(specOps.length);
    for (const { method, path, op } of specOps) {
      const group = op['x-sdk-group'] as string;
      const name = op['x-sdk-method'] as string;
      const ns = (client as unknown as Record<string, Record<string, unknown>>)[group];
      expect(ns, `client.${group}`).toBeTruthy();
      expect(typeof ns![name], `client.${group}.${name} (${method} ${path})`).toBe('function');
      const desc = operations.find((d) => d.group === group && d.method === name);
      expect(desc, `${group}.${name}`).toBeTruthy();
      expect(desc!.httpMethod).toBe(method);
      expect(desc!.path).toBe(path);
      if (op['x-sdk-pagination']) {
        expect(typeof ns![`${name}All`], `client.${group}.${name}All`).toBe('function');
        expect(desc!.pagination?.style).toBe((op['x-sdk-pagination'] as { style: string }).style);
      } else {
        expect(ns![`${name}All`]).toBeUndefined();
      }
    }
  });

  it('the generated files match openapi.json (npm run generate is a no-op)', () => {
    expect(() => execFileSync(process.execPath, [join(ROOT, 'scripts/generate.mjs'), '--check'], { cwd: ROOT, stdio: 'pipe' })).not.toThrow();
  });

  it('every method fires exactly one request to its path', async () => {
    const seen: string[] = [];
    const c = new PropRaven({
      apiKey: 'pz_x',
      baseURL: 'https://api.test',
      fetch: async (url, init) => {
        seen.push(`${init?.method} ${new URL(url).pathname}`);
        return new Response('{}', { headers: { 'content-type': 'application/json' } });
      },
    });
    for (const d of operations) {
      const fn = (c as unknown as Record<string, Record<string, (...a: unknown[]) => Promise<unknown>>>)[d.group]![d.method]!;
      const args = d.pathParams.map((p) => `v_${p}`);
      await fn.call((c as unknown as Record<string, unknown>)[d.group], ...args, {});
    }
    expect(seen).toHaveLength(operations.length);
    for (const [i, d] of operations.entries()) {
      const expected = d.path.replace(/\{([^}]+)\}/g, (_, p) => `v_${p}`);
      expect(seen[i]).toBe(`${d.httpMethod} ${expected}`);
    }
  });
});
