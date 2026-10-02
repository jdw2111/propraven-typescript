import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = mkdtempSync(join(tmpdir(), 'propraven-gen-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

function generate(spec: unknown): { types: string; operations: string; resources: string } {
  const specPath = join(dir, `spec-${Math.random().toString(36).slice(2)}.json`);
  const out = join(dir, `out-${Math.random().toString(36).slice(2)}`);
  writeFileSync(specPath, JSON.stringify(spec));
  execFileSync(process.execPath, [join(ROOT, 'scripts/generate.mjs'), '--spec', specPath, '--out', out], { stdio: 'pipe' });
  return {
    types: readFileSync(join(out, 'types.ts'), 'utf8'),
    operations: readFileSync(join(out, 'operations.ts'), 'utf8'),
    resources: readFileSync(join(out, 'resources.ts'), 'utf8'),
  };
}

const synthetic = {
  openapi: '3.1.0',
  info: { title: 't', version: '1' },
  paths: {
    '/api/v1/things/{id}': {
      get: {
        'x-sdk-group': 'things',
        'x-sdk-method': 'get',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'tags', in: 'query', explode: true, schema: { type: 'array', items: { type: 'string' } } },
          { name: 'X-CREDIT-TOKEN', in: 'header', schema: { type: 'string' } },
        ],
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Thing' } } } } },
      },
    },
    '/api/v1/things': {
      post: {
        'x-sdk-group': 'things',
        'x-sdk-method': 'create',
        requestBody: { required: true, content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Base' }, { type: 'object', required: ['name'], properties: { name: { type: 'string' } } }] } } } },
        responses: { '201': { content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' } } } } } } },
      },
      get: {
        'x-sdk-group': 'things',
        'x-sdk-method': 'list',
        'x-sdk-pagination': { style: 'offset', items: 'data' },
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'offset', in: 'query', schema: { type: 'integer' } },
        ],
        responses: { '200': { content: { 'application/json': { schema: {} } } } },
      },
    },
    '/api/v1/raw': {
      put: {
        'x-sdk-group': 'raw',
        'x-sdk-method': 'put',
        requestBody: { content: { 'application/json': { schema: { type: 'array', items: { type: 'integer' } } } } },
        responses: { '204': { description: 'no content' } },
      },
    },
  },
  components: {
    schemas: {
      Error: { type: 'object', properties: { message: { type: 'string' } } },
      Base: { type: 'object', properties: { note: { type: ['string', 'null'] } } },
      Thing: {
        type: 'object',
        required: ['id'],
        additionalProperties: false,
        properties: {
          id: { type: 'string', description: 'Has a */ in it' },
          kind: { enum: ['a', 'b', null] },
          score: { type: ['number', 'null'] },
          any: {},
          nested: { anyOf: [{ type: 'array', items: { $ref: '#/components/schemas/Base' } }, { type: 'object', properties: { data: { type: 'array', items: { type: 'string' } } } }] },
          one: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
          both: { allOf: [{ $ref: '#/components/schemas/Base' }, { type: 'object', properties: { extra: { const: 1 } } }] },
          bag: { type: 'object', additionalProperties: { type: 'integer' } },
          open: { type: 'object', additionalProperties: true, properties: { x: { type: 'boolean' } } },
          closed: { type: 'object', additionalProperties: false },
          free: { type: 'object' },
          'weird-key': { type: 'string' },
          tuple: { type: 'array', prefixItems: [{ type: 'string' }, { type: 'number' }] },
          nullableObj: { type: ['object', 'null'], properties: { a: { type: 'string' } } },
        },
      },
    },
  },
};

describe('generator on arbitrary schemas', () => {
  const out = generate(synthetic);

  it('renders schema keywords to TypeScript', () => {
    const t = out.types;
    expect(t).toContain('// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.');
    expect(t).toContain('export interface Thing {');
    expect(t).toContain('  id: string;');
    expect(t).toContain('  kind?: "a" | "b" | null;');
    expect(t).toContain('  score?: number | null;');
    expect(t).toContain('  any?: unknown;');
    expect(t).toMatch(/nested\?: Array<Base> \| \{\n\s+data\?: Array<string>;\n\s+\};/);
    expect(t).toContain('  one?: string | number;');
    expect(t).toMatch(/both\?: Base & \{\n\s+extra\?: 1;\n\s+\};/);
    expect(t).toContain('  bag?: { [key: string]: number };');
    expect(t).toMatch(/open\?: \{\n\s+x\?: boolean;\n\s+\[key: string\]: unknown;\n\s+\};/);
    expect(t).toContain('  closed?: Record<string, never>;');
    expect(t).toContain('  free?: { [key: string]: unknown };');
    expect(t).toContain('  "weird-key"?: string;');
    expect(t).toContain('  tuple?: [string, number];');
    expect(t).toMatch(/nullableObj\?: \{\n\s+a\?: string;\n\s+\} \| null;/);
    expect(t).toContain('Has a *\\/ in it');
  });

  it('renames schemas that would shadow globals', () => {
    expect(out.types).toContain('export interface ErrorSchema {');
    expect(out.types).not.toMatch(/export (interface|type) Error\b/);
  });

  it('names params and responses per operation', () => {
    const t = out.types;
    expect(t).toContain('export type ThingsGetResponse = Thing;');
    expect(t).toMatch(/export interface ThingsGetParams \{[\s\S]*tags\?: Array<string>;[\s\S]*creditToken\?: string;[\s\S]*\}/);
    expect(t).toMatch(/export interface ThingsCreateParams \{[\s\S]*note\?: string \| null;[\s\S]*name: string;[\s\S]*\}/);
    expect(t).toContain('export type ThingsListResponse = unknown;');
    expect(t).toContain('export type ThingsListItem = PageItem<ThingsListResponse, "data">;');
    expect(t).toMatch(/export interface RawPutParams \{[\s\S]*body\?: Array<number>;[\s\S]*\}/);
    expect(t).toContain('export type RawPutResponse = void;');
  });

  it('describes the wire format of each operation', () => {
    const o = out.operations;
    expect(o).toContain('"tags": {\n      "name": "tags",\n      "explode": true\n    }');
    expect(o).toContain('"creditToken": "X-CREDIT-TOKEN"');
    expect(o).toMatch(/"kind": "fields",\s+"fields": \{\s+"note": "note",\s+"name": "name"\s+\},\s+"required": true/);
    expect(o).toMatch(/"kind": "value",\s+"param": "body",\s+"required": false/);
    expect(o).toContain('"response": "none"');
  });

  it('emits methods with positional path params and an All sibling for paginated ops', () => {
    const r = out.resources;
    expect(r).toContain('get(id: string, params: ThingsGetParams = {}, options?: RequestOptions): APIPromise<ThingsGetResponse>');
    expect(r).toContain('create(params: ThingsCreateParams, options?: RequestOptions): APIPromise<ThingsCreateResponse>');
    expect(r).toContain('listAll(params: ThingsListParams = {}, options?: PaginationOptions): PageIterable<ThingsListItem>');
  });

  it('fails loudly when x-sdk-group / x-sdk-method are missing', () => {
    const bad = structuredClone(synthetic) as typeof synthetic;
    delete (bad.paths['/api/v1/raw'].put as Record<string, unknown>)['x-sdk-group'];
    expect(() => generate(bad)).toThrow(/missing x-sdk-group/);
  });

  it('is deterministic', () => {
    const again = generate(synthetic);
    expect(again).toEqual(out);
  });
});
