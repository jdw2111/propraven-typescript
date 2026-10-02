#!/usr/bin/env node
// Generates the typed layer of @propraven/sdk from openapi.json (repo root).
//
//   node scripts/generate.mjs           write src/generated/* and the README method table
//   node scripts/generate.mjs --check   exit 1 if anything on disk differs from what would be written
//   node scripts/generate.mjs --spec path/to/openapi.json [--out dir]
//
// Output is deterministic (sorted groups/methods/schemas, spec order for properties), has no
// dependencies, and handles arbitrary JSON Schema: objects, arrays, oneOf/anyOf/allOf, enums,
// const, `type: [T, "null"]`, $ref, additionalProperties true/false/schema, and `{}` -> unknown.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEADER = '// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.\n';
const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

// Names the generated layer must not use for namespaces (client members) or types (runtime exports).
const RESERVED_GROUPS = new Set([
  'apiKey', 'baseURL', 'timeout', 'maxRetries', 'lastRateLimit', 'constructor', 'prototype',
  'withResponse', 'paginate', 'request',
]);
const RESERVED_TYPE_NAMES = new Set([
  // global / lib names that would be shadowed
  'Error', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'Function', 'Promise', 'Map', 'Set',
  'Record', 'Partial', 'Required', 'Readonly', 'Pick', 'Omit', 'Response', 'Request', 'Headers', 'URL',
  'Symbol', 'JSON', 'Math', 'RegExp', 'BigInt', 'Uint8Array', 'AbortSignal', 'Blob', 'File',
  // runtime exports of this package
  'PropRaven', 'Propraven', 'APIError', 'PropRavenError', 'BadRequestError', 'AuthenticationError',
  'PaymentRequiredError', 'PermissionDeniedError', 'NotFoundError', 'MethodNotAllowedError', 'ConflictError',
  'PayloadTooLargeError', 'UnprocessableEntityError', 'RateLimitError', 'ServiceUnavailableError',
  'GatewayTimeoutError', 'InternalServerError', 'APIConnectionError', 'APITimeoutError', 'APIUserAbortError',
  'WebhookVerificationError', 'APIPromise', 'PageIterable', 'APIResource', 'BaseClient', 'GeneratedClient',
  'RequestOptions', 'PaginationOptions', 'RateLimitInfo', 'WithResponse', 'PageItem', 'ClientOptions',
  'OperationDescriptor', 'ProblemFieldError', 'VerifyWebhookParams', 'Fetch', 'HTTPMethod', 'VERSION',
]);

// ------------------------------------------------------------------------------------------------
// args

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const specIdx = args.indexOf('--spec');
const SPEC_PATH = specIdx >= 0 ? args[specIdx + 1] : join(ROOT, 'openapi.json');
const outIdx = args.indexOf('--out'); // write the generated files to another directory (tests)
const OUT_DIR = outIdx >= 0 ? args[outIdx + 1] : null;

const spec = JSON.parse(readFileSync(SPEC_PATH, 'utf8'));
const schemas = spec.components?.schemas ?? {};

// ------------------------------------------------------------------------------------------------
// naming helpers

const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function pascal(s) {
  const words = String(s).split(/[^A-Za-z0-9]+/).filter(Boolean);
  const out = words.map((w) => w[0].toUpperCase() + w.slice(1)).join('');
  return /^[0-9]/.test(out) ? `_${out}` : out || '_';
}

function camel(s) {
  const p = pascal(s);
  return p[0].toLowerCase() + p.slice(1);
}

function propKey(name) {
  return IDENT.test(name) ? name : JSON.stringify(name);
}

/** `X-CREDIT-TOKEN` -> `creditToken`, `X-PAYMENT` -> `payment`. */
function headerParamName(header) {
  const stripped = header.replace(/^x-/i, '');
  return camel(stripped.toLowerCase());
}

const schemaTypeNames = new Map(); // component name -> TS name
const usedTypeNames = new Set();
function claimTypeName(wanted) {
  let name = wanted;
  if (RESERVED_TYPE_NAMES.has(name)) name = `${wanted}Schema`;
  let i = 2;
  while (usedTypeNames.has(name)) name = `${wanted}${i++}`;
  usedTypeNames.add(name);
  return name;
}
for (const key of Object.keys(schemas).sort()) {
  const base = IDENT.test(key) ? key : pascal(key);
  schemaTypeNames.set(key, claimTypeName(base));
}

// ------------------------------------------------------------------------------------------------
// $ref resolution

function resolvePointer(ref) {
  if (!ref.startsWith('#/')) throw new Error(`Only local $refs are supported: ${ref}`);
  let node = spec;
  for (const raw of ref.slice(2).split('/')) {
    const part = raw.replace(/~1/g, '/').replace(/~0/g, '~');
    node = node?.[part];
    if (node === undefined) throw new Error(`Unresolvable $ref: ${ref}`);
  }
  return node;
}

function deref(obj, seen = new Set()) {
  while (obj && typeof obj === 'object' && typeof obj.$ref === 'string') {
    if (seen.has(obj.$ref)) throw new Error(`Circular $ref: ${obj.$ref}`);
    seen.add(obj.$ref);
    obj = resolvePointer(obj.$ref);
  }
  return obj;
}

const SCHEMA_REF = /^#\/components\/schemas\/([^/]+)$/;

// ------------------------------------------------------------------------------------------------
// JSON Schema -> TypeScript

function lit(v) {
  return JSON.stringify(v);
}

function docComment(text, indent, extra = []) {
  const lines = [];
  if (text && String(text).trim()) lines.push(...String(text).trim().split('\n'));
  if (extra.length) {
    if (lines.length) lines.push('');
    lines.push(...extra);
  }
  if (!lines.length) return '';
  const safe = lines.map((l) => l.replace(/\*\//g, '*\\/').replace(/\s+$/, ''));
  if (safe.length === 1) return `${indent}/** ${safe[0]} */\n`;
  return `${indent}/**\n${safe.map((l) => (l ? `${indent} * ${l}` : `${indent} *`)).join('\n')}\n${indent} */\n`;
}

/**
 * Split a type expression on a top-level operator character, skipping brackets, string literals
 * and comments (JSDoc inside inline object types may contain any character).
 */
function splitTopLevel(t, op) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (ch === '/' && t[i + 1] === '*') {
      const end = t.indexOf('*/', i + 2);
      i = end < 0 ? t.length : end + 1;
      continue;
    }
    if (ch === '"') {
      for (i++; i < t.length && t[i] !== '"'; i++) if (t[i] === '\\') i++;
      continue;
    }
    if ('({[<'.includes(ch)) depth++;
    else if (')}]>'.includes(ch)) depth--;
    else if (depth === 0 && op.includes(ch)) {
      out.push(t.slice(start, i).trim());
      start = i + 1;
    }
  }
  out.push(t.slice(start).trim());
  return out;
}

function hasTopLevelOperator(t) {
  return splitTopLevel(t, '|&').length > 1;
}

function paren(t) {
  return hasTopLevelOperator(t) ? `(${t})` : t;
}

function unionOf(types) {
  const uniq = [...new Set(types)];
  if (uniq.includes('unknown')) return 'unknown';
  if (uniq.length === 0) return 'never';
  return uniq.join(' | ');
}

function includesNull(schema) {
  return (Array.isArray(schema.type) && schema.type.includes('null')) || schema.type === 'null' || schema.nullable === true;
}

/**
 * Render a schema as a TypeScript type expression.
 * `ind` is the indentation of the line the type starts on (for multi-line object literals).
 */
function tsType(schema, ind = '', depth = 0) {
  if (depth > 40) return 'unknown';
  if (schema === true || schema === undefined || schema === null) return 'unknown';
  if (schema === false) return 'never';
  if (typeof schema !== 'object') return 'unknown';

  if (typeof schema.$ref === 'string') {
    const m = SCHEMA_REF.exec(schema.$ref);
    let t;
    if (m) {
      const name = decodeURIComponent(m[1]).replace(/~1/g, '/').replace(/~0/g, '~');
      t = schemaTypeNames.get(name);
      if (!t) throw new Error(`Unknown schema ${schema.$ref}`);
    } else {
      t = tsType(resolvePointer(schema.$ref), ind, depth + 1);
    }
    return includesNull(schema) ? unionOf([t, 'null']) : t;
  }

  const parts = [];
  if (Array.isArray(schema.allOf) && schema.allOf.length) {
    for (const member of schema.allOf) parts.push(tsType(member, ind, depth + 1));
  }
  const alts = schema.oneOf ?? schema.anyOf;
  if (Array.isArray(alts) && alts.length) {
    parts.push(unionOf(alts.map((s) => tsType(s, ind, depth + 1))));
  }
  if (schema.const !== undefined) {
    parts.push(lit(schema.const));
  } else if (Array.isArray(schema.enum)) {
    parts.push(unionOf(schema.enum.map(lit)));
  } else {
    const typed = typeBased(schema, ind, depth);
    if (typed !== undefined) parts.push(typed);
  }

  const uniqParts = [...new Set(parts)].filter((p) => p !== 'unknown' || parts.length === 1);
  let out = uniqParts.length === 0 ? 'unknown' : uniqParts.length === 1 ? uniqParts[0] : uniqParts.map(paren).join(' & ');
  if (includesNull(schema) && out !== 'unknown' && !unionMembers(out).includes('null')) out = unionOf([out, 'null']);
  return out;
}

/** Top-level `|` members of a type expression. */
function unionMembers(t) {
  return splitTopLevel(t, '|');
}

function typeBased(schema, ind, depth) {
  let types = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (!types.length) {
    if (schema.properties || schema.additionalProperties !== undefined || schema.patternProperties) types = ['object'];
    else if (schema.items || schema.prefixItems) types = ['array'];
    else return undefined;
  }
  const rendered = types
    .filter((t) => t !== 'null')
    .map((t) => {
      switch (t) {
        case 'string':
          return 'string';
        case 'integer':
        case 'number':
          return 'number';
        case 'boolean':
          return 'boolean';
        case 'array':
          if (Array.isArray(schema.prefixItems)) {
            return `[${schema.prefixItems.map((s) => tsType(s, ind, depth + 1)).join(', ')}]`;
          }
          return `Array<${tsType(schema.items, ind, depth + 1)}>`;
        case 'object':
          return objectType(schema, ind, depth);
        default:
          return 'unknown';
      }
    });
  if (!rendered.length) return types.includes('null') ? 'null' : undefined;
  return unionOf(rendered);
}

function objectType(schema, ind, depth) {
  const props = schema.properties ?? {};
  const names = Object.keys(props);
  const required = new Set(schema.required ?? []);
  const ap = schema.additionalProperties;
  const inner = `${ind}  `;
  const lines = [];
  for (const name of names) {
    const p = props[name];
    const doc = docComment(p?.description, inner, p?.deprecated ? ['@deprecated'] : []);
    lines.push(`${doc}${inner}${propKey(name)}${required.has(name) ? '' : '?'}: ${tsType(p, inner, depth + 1)};`);
  }
  const hasSchemaAp = ap && typeof ap === 'object' && Object.keys(ap).length > 0;
  if (names.length === 0) {
    if (ap === false) return 'Record<string, never>';
    if (hasSchemaAp) return `{ [key: string]: ${tsType(ap, ind, depth + 1)} }`;
    return '{ [key: string]: unknown }';
  }
  // Declared properties plus extra keys: the index signature must admit every property type.
  if (ap === true || hasSchemaAp || schema.patternProperties) lines.push(`${inner}[key: string]: unknown;`);
  return `{\n${lines.join('\n')}\n${ind}}`;
}

/** Emit a named declaration: `export interface X {...}` for plain objects, else `export type X = ...`. */
function declare(name, schema, description) {
  const s = schema && typeof schema === 'object' ? schema : {};
  const doc = docComment(description ?? s.description, '', s.deprecated ? ['@deprecated'] : []);
  const isPlainObject =
    !s.$ref && !s.oneOf && !s.anyOf && !s.allOf && s.enum === undefined && s.const === undefined &&
    (s.type === 'object' || (s.type === undefined && s.properties)) && s.properties && Object.keys(s.properties).length > 0 &&
    !includesNull(s);
  if (isPlainObject) {
    return `${doc}export interface ${name} ${objectType(s, '', 0)}\n`;
  }
  return `${doc}export type ${name} = ${tsType(schema, '', 0)};\n`;
}

// ------------------------------------------------------------------------------------------------
// operations

function isJSONMedia(ct) {
  const c = ct.toLowerCase();
  return c.includes('application/json') || c.includes('+json');
}

const operations = [];
const seenMethods = new Map();
const problems = [];

for (const path of Object.keys(spec.paths ?? {})) {
  const item = deref(spec.paths[path]);
  for (const httpMethod of HTTP_METHODS) {
    const op = item[httpMethod];
    if (!op) continue;
    const group = op['x-sdk-group'];
    const method = op['x-sdk-method'];
    const label = `${httpMethod.toUpperCase()} ${path}`;
    if (!group || !method) {
      problems.push(`${label}: missing x-sdk-group / x-sdk-method`);
      continue;
    }
    if (!IDENT.test(group) || !IDENT.test(method)) {
      problems.push(`${label}: x-sdk-group/x-sdk-method must be identifiers (got ${group}.${method})`);
      continue;
    }
    if (RESERVED_GROUPS.has(group) || group.startsWith('_')) {
      problems.push(`${label}: x-sdk-group "${group}" collides with a client member`);
      continue;
    }
    if (method.startsWith('_') || method === 'constructor') {
      problems.push(`${label}: x-sdk-method "${method}" is reserved`);
      continue;
    }
    const key = `${group}.${method}`;
    if (seenMethods.has(key)) {
      problems.push(`${label}: duplicate ${key} (also ${seenMethods.get(key)})`);
      continue;
    }
    seenMethods.set(key, label);

    const params = [...(item.parameters ?? []), ...(op.parameters ?? [])].map((p) => deref(p));
    // operation-level parameters override path-item ones with the same (name, in)
    const byKey = new Map();
    for (const p of params) byKey.set(`${p.in}:${p.name}`, p);
    const allParams = [...byKey.values()];

    const pathParamNames = [...path.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
    const pathParams = pathParamNames.map((name) => {
      const p = allParams.find((x) => x.in === 'path' && x.name === name) ?? { name, in: 'path', required: true, schema: { type: 'string' } };
      return p;
    });
    const queryParams = allParams.filter((p) => p.in === 'query');
    const headerParams = allParams.filter((p) => p.in === 'header');

    // params object members: name -> {tsName, wire, kind, schema, required, description}
    const members = [];
    const taken = new Set();
    for (const p of queryParams) {
      members.push({ sdkName: p.name, wire: p.name, kind: 'query', schema: p.schema ?? {}, required: !!p.required, description: p.description, deprecated: p.deprecated, explode: p.explode === true });
      taken.add(p.name);
    }
    for (const p of headerParams) {
      if (['accept', 'content-type', 'authorization', 'user-agent'].includes(p.name.toLowerCase())) continue;
      let sdkName = headerParamName(p.name);
      if (taken.has(sdkName)) sdkName = `${sdkName}Header`;
      members.push({ sdkName, wire: p.name, kind: 'header', schema: p.schema ?? {}, required: !!p.required, description: p.description ?? `Sent as the \`${p.name}\` header.`, deprecated: p.deprecated });
      taken.add(sdkName);
    }

    let body = null;
    const rb = op.requestBody ? deref(op.requestBody) : null;
    if (rb && rb.content) {
      const cts = Object.keys(rb.content);
      const jsonCt = cts.find(isJSONMedia);
      if (!jsonCt) problems.push(`${label}: only JSON request bodies are supported (got ${cts.join(', ')})`);
      const bodySchemaRaw = rb.content[jsonCt ?? cts[0]]?.schema ?? {};
      const bodySchema = deref(bodySchemaRaw);
      const bodyRequired = !!rb.required;
      const props = collectObjectProps(bodySchema);
      if (props) {
        const fields = {};
        for (const [name, schema] of Object.entries(props.properties)) {
          let sdkName = name;
          if (taken.has(sdkName)) sdkName = `body_${name}`;
          taken.add(sdkName);
          fields[sdkName] = name;
          members.push({ sdkName, wire: name, kind: 'body', schema, required: bodyRequired && props.required.has(name), description: schema?.description, deprecated: schema?.deprecated });
        }
        body = { kind: 'fields', fields, required: bodyRequired };
      } else {
        let sdkName = 'body';
        if (taken.has(sdkName)) sdkName = 'requestBody';
        members.push({ sdkName, wire: null, kind: 'body-value', schema: bodySchemaRaw, required: bodyRequired, description: rb.description });
        body = { kind: 'value', param: sdkName, required: bodyRequired };
      }
    }

    // success responses
    const codes = Object.keys(op.responses ?? {})
      .filter((c) => /^2(\d\d|XX)$/i.test(c))
      .sort();
    const contents = [];
    for (const code of codes) {
      const r = deref(op.responses[code]);
      for (const [ct, media] of Object.entries(r?.content ?? {})) contents.push({ code, ct, schema: media?.schema });
    }
    const jsonContents = contents.filter((c) => isJSONMedia(c.ct));
    const textContents = contents.filter((c) => !isJSONMedia(c.ct));
    const responseKind = contents.length === 0 ? 'none' : textContents.length === 0 ? 'json' : jsonContents.length === 0 ? 'text' : 'auto';
    const accept = (() => {
      if (responseKind === 'json' || responseKind === 'none') return 'application/json';
      const types = [...new Set(textContents.map((c) => c.ct))];
      return [...types, 'application/json'].join(', ');
    })();

    let pagination;
    const pg = op['x-sdk-pagination'];
    if (pg) {
      if (pg.style === 'offset') {
        pagination = { style: 'offset', items: pg.items ?? 'data' };
        if (!members.some((m) => m.wire === 'offset')) problems.push(`${label}: offset pagination but no "offset" parameter`);
      } else if (pg.style === 'cursor') {
        pagination = { style: 'cursor', items: pg.items ?? 'results', cursorParam: pg.cursor_param ?? 'after', next: pg.next ?? 'nextCursor' };
        if (!members.some((m) => m.sdkName === pagination.cursorParam)) problems.push(`${label}: cursor pagination but no "${pagination.cursorParam}" parameter`);
      } else {
        problems.push(`${label}: unknown x-sdk-pagination style ${pg.style}`);
      }
    }

    operations.push({
      key, group, method, httpMethod: httpMethod.toUpperCase(), path, label, op,
      operationId: op.operationId ?? `${group}.${method}`,
      pathParams, members, body, responseKind, accept, jsonContents, textContents, pagination,
    });
  }
}

/** Object properties of a body schema (following $ref and merging allOf); null when not an object. */
function collectObjectProps(schema, depth = 0) {
  if (depth > 10 || !schema || typeof schema !== 'object') return null;
  const s = deref(schema);
  const out = { properties: {}, required: new Set() };
  let isObject = false;
  if (Array.isArray(s.allOf)) {
    for (const part of s.allOf) {
      const sub = collectObjectProps(part, depth + 1);
      if (!sub) return null;
      Object.assign(out.properties, sub.properties);
      for (const r of sub.required) out.required.add(r);
      isObject = true;
    }
  }
  if (s.oneOf || s.anyOf) return null;
  const types = Array.isArray(s.type) ? s.type : s.type ? [s.type] : [];
  if (types.length && !(types.length === 1 && types[0] === 'object')) return null;
  if (s.properties) {
    Object.assign(out.properties, s.properties);
    for (const r of s.required ?? []) out.required.add(r);
    isObject = true;
  }
  if (types[0] === 'object') isObject = true;
  return isObject && Object.keys(out.properties).length > 0 ? out : null;
}

if (problems.length) {
  console.error(`openapi.json cannot be generated:\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}

operations.sort((a, b) => (a.group === b.group ? a.method.localeCompare(b.method) : a.group.localeCompare(b.group)));
const groups = [...new Set(operations.map((o) => o.group))].sort();

for (const o of operations) {
  const base = `${pascal(o.group)}${pascal(o.method)}`;
  o.responseType = claimTypeName(`${base}Response`);
  o.paramsType = claimTypeName(`${base}Params`);
  o.constName = `${o.group}_${o.method}`;
  if (o.pagination) {
    o.allMethod = `${o.method}All`;
    if (seenMethods.has(`${o.group}.${o.allMethod}`)) {
      console.error(`${o.label}: ${o.group}.${o.allMethod} already exists; cannot add the paginating sibling`);
      process.exit(1);
    }
    o.itemType = claimTypeName(`${base}Item`);
  }
}

// ------------------------------------------------------------------------------------------------
// emit: types.ts

function emitTypes() {
  let out = HEADER;
  out += `// Types for every components/schemas entry and every operation's params and success response.\n`;
  out += `\nimport type { PageItem } from '../core/types.js';\n`;
  out += `\n// ---- components/schemas ----\n\n`;
  for (const key of [...schemaTypeNames.keys()]) {
    out += declare(schemaTypeNames.get(key), schemas[key]) + '\n';
  }
  out += `// ---- operation params and responses ----\n`;
  for (const o of operations) {
    out += `\n// ${o.label} (${o.group}.${o.method})\n\n`;
    // params
    const visible = o.members;
    if (visible.length === 0) {
      out += `${docComment(`Parameters for \`${o.group}.${o.method}\` (the operation takes none).`, '')}export type ${o.paramsType} = Record<string, never>;\n\n`;
    } else {
      const lines = visible.map((m) => {
        const where = m.kind === 'query' ? `Query parameter \`${m.wire}\`.` : m.kind === 'header' ? `Header \`${m.wire}\`.` : m.kind === 'body' ? `Body field \`${m.wire}\`.` : 'The JSON request body.';
        const doc = docComment(m.description ? `${m.description}` : '', '  ', [where, ...(m.deprecated ? ['@deprecated'] : [])]);
        return `${doc}  ${propKey(m.sdkName)}${m.required ? '' : '?'}: ${tsType(m.schema, '  ', 1)};`;
      });
      out += `${docComment(`Parameters for \`${o.group}.${o.method}\`.`, '')}export interface ${o.paramsType} {\n${lines.join('\n')}\n}\n\n`;
    }
    // response
    const desc = `Success response of \`${o.group}.${o.method}\` (${o.label}).`;
    if (o.responseKind === 'none') {
      out += `${docComment(desc, '')}export type ${o.responseType} = void;\n`;
    } else {
      const variants = [];
      if (o.textContents.length) variants.push('string');
      const jsonSchemas = o.jsonContents.map((c) => c.schema ?? {});
      if (jsonSchemas.length === 1 && !o.textContents.length) {
        out += declare(o.responseType, jsonSchemas[0], desc);
      } else {
        for (const s of jsonSchemas) variants.push(tsType(s, '', 0));
        out += `${docComment(desc, '')}export type ${o.responseType} = ${unionOf(variants)};\n`;
      }
    }
    if (o.pagination) {
      out += `\n/** One item yielded by \`${o.group}.${o.allMethod}\`. */\nexport type ${o.itemType} = PageItem<${o.responseType}, ${lit(o.pagination.items)}>;\n`;
    }
  }
  return out;
}

// ------------------------------------------------------------------------------------------------
// emit: operations.ts

function emitOperations() {
  let out = HEADER;
  out += `// Wire-level description of every operation, consumed by the hand-written core.\n\n`;
  out += `import type { OperationDescriptor } from '../core/types.js';\n\n`;
  for (const o of operations) {
    const query = {};
    const headers = {};
    for (const m of o.members) {
      if (m.kind === 'query') query[m.sdkName] = m.explode ? { name: m.wire, explode: true } : { name: m.wire };
      if (m.kind === 'header') headers[m.sdkName] = m.wire;
    }
    const d = {
      operationId: o.operationId,
      group: o.group,
      method: o.method,
      httpMethod: o.httpMethod,
      path: o.path,
      pathParams: o.pathParams.map((p) => p.name),
      query,
      headers,
      body: o.body,
      response: o.responseKind,
      accept: o.accept,
      ...(o.pagination ? { pagination: o.pagination } : {}),
    };
    out += `export const ${o.constName}: OperationDescriptor = ${JSON.stringify(d, null, 2)};\n\n`;
  }
  out += `/** Every operation in openapi.json. */\nexport const operations: readonly OperationDescriptor[] = [\n${operations.map((o) => `  ${o.constName},`).join('\n')}\n];\n`;
  return out;
}

// ------------------------------------------------------------------------------------------------
// emit: resources.ts + client.ts

function methodDoc(o, extra = []) {
  const lines = [];
  if (o.op.summary) lines.push(o.op.summary.trim());
  if (o.op.description && o.op.description.trim() !== (o.op.summary ?? '').trim()) {
    if (lines.length) lines.push('');
    lines.push(o.op.description.trim());
  }
  const tail = [`\`${o.label}\``, ...extra];
  if (o.op.deprecated) tail.push('@deprecated');
  return docComment(lines.join('\n'), '  ', tail);
}

function pathArgList(o) {
  return o.pathParams.map((p) => {
    const t = p.schema && (p.schema.type === 'integer' || p.schema.type === 'number') ? 'number | string' : 'string';
    return { name: camelSafe(p.name), type: t };
  });
}

const JS_RESERVED = new Set(['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'await', 'params', 'options']);
function camelSafe(name) {
  let n = IDENT.test(name) ? name : camel(name);
  if (JS_RESERVED.has(n)) n = `${n}_`;
  return n;
}

function paramsRequired(o) {
  return o.members.some((m) => m.required);
}

function emitResources() {
  let out = HEADER;
  out += `// One class per x-sdk-group; one method per operation (plus \`<method>All\` for paginated ones).\n\n`;
  out += `import type { APIPromise } from '../core/api-promise.js';\n`;
  out += `import { APIResource, type PageIterable } from '../core/client.js';\n`;
  out += `import type { PaginationOptions, RequestOptions } from '../core/types.js';\n`;
  out += `import * as ops from './operations.js';\n`;
  const typeImports = [...new Set(operations.flatMap((o) => [o.paramsType, o.responseType, ...(o.itemType ? [o.itemType] : [])]))].sort();
  out += `import type {\n${typeImports.map((t) => `  ${t},`).join('\n')}\n} from './types.js';\n`;
  for (const g of groups) {
    out += `\n/** \`client.${g}\` */\nexport class ${pascal(g)}Resource extends APIResource {\n`;
    const methods = operations.filter((o) => o.group === g);
    out += methods
      .map((o) => {
        const pargs = pathArgList(o);
        const req = paramsRequired(o);
        const sig = [
          ...pargs.map((a) => `${a.name}: ${a.type}`),
          req ? `params: ${o.paramsType}` : `params: ${o.paramsType} = {}`,
          `options?: RequestOptions`,
        ].join(', ');
        const pathArr = `[${pargs.map((a) => a.name).join(', ')}]`;
        let m = methodDoc(o);
        m += `  ${o.method}(${sig}): APIPromise<${o.responseType}> {\n`;
        m += `    return this._client._call<${o.responseType}>(ops.${o.constName}, ${pathArr}, params, options);\n  }\n`;
        if (o.pagination) {
          const sigAll = [
            ...pargs.map((a) => `${a.name}: ${a.type}`),
            req ? `params: ${o.paramsType}` : `params: ${o.paramsType} = {}`,
            `options?: PaginationOptions`,
          ].join(', ');
          const how =
            o.pagination.style === 'offset'
              ? `Iterates every item of \`${o.method}\` by advancing \`offset\` (${o.pagination.items}[]).`
              : `Iterates every item of \`${o.method}\` by following \`${o.pagination.next}\` via \`${o.pagination.cursorParam}\` (${o.pagination.items}[]).`;
          m += `\n${docComment(how, '  ', ['Use `options.pageSize` / `options.maxItems` to bound it.', `\`${o.label}\``])}`;
          m += `  ${o.allMethod}(${sigAll}): PageIterable<${o.itemType}> {\n`;
          m += `    return this._client._paginate<${o.itemType}>(ops.${o.constName}, ${pathArr}, params, options);\n  }\n`;
        }
        return m;
      })
      .join('\n');
    out += `}\n`;
  }
  return out;
}

function emitClient() {
  let out = HEADER;
  out += `// The namespaces of the client, one per x-sdk-group.\n\n`;
  out += `import { BaseClient } from '../core/client.js';\n`;
  out += `import {\n${groups.map((g) => `  ${pascal(g)}Resource,`).join('\n')}\n} from './resources.js';\n\n`;
  out += `export abstract class GeneratedClient extends BaseClient {\n`;
  out += groups
    .map((g) => {
      const n = operations.filter((o) => o.group === g).length;
      return `  /** ${n} operation${n === 1 ? '' : 's'}. */\n  readonly ${g}: ${pascal(g)}Resource = new ${pascal(g)}Resource(this);`;
    })
    .join('\n');
  out += `\n}\n\n`;
  out += `/** Number of operations generated from openapi.json. */\nexport const OPERATION_COUNT = ${operations.length};\n`;
  return out;
}

// ------------------------------------------------------------------------------------------------
// emit: README method table

function emitReadmeTable() {
  const rows = ['| Method | HTTP | Summary |', '| --- | --- | --- |'];
  for (const o of operations) {
    const pargs = pathArgList(o).map((a) => a.name);
    const call = `client.${o.group}.${o.method}(${[...pargs, paramsRequired(o) ? 'params' : 'params?'].join(', ')})`;
    const extra = o.pagination ? `<br>+ \`${o.allMethod}()\` iterator` : '';
    const summary = (o.op.summary ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    rows.push(`| \`${call}\`${extra} | \`${o.httpMethod} ${o.path}\` | ${summary} |`);
  }
  return `<!-- generated:methods:start (scripts/generate.mjs) -->\n${operations.length} operations in ${groups.length} namespaces.\n\n${rows.join('\n')}\n<!-- generated:methods:end -->`;
}

// ------------------------------------------------------------------------------------------------
// write / check

const files = new Map([
  ['src/generated/types.ts', emitTypes()],
  ['src/generated/operations.ts', emitOperations()],
  ['src/generated/resources.ts', emitResources()],
  ['src/generated/client.ts', emitClient()],
]);

const readmePath = join(ROOT, 'README.md');
if (OUT_DIR) {
  for (const [rel, content] of [...files]) {
    const abs = join(OUT_DIR, rel.replace(/^src\/generated\//, ''));
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
  }
  console.log(`${operations.length} operations, ${groups.length} namespaces, ${schemaTypeNames.size} schemas -> ${OUT_DIR}`);
  process.exit(0);
}
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8');
  const re = /<!-- generated:methods:start[\s\S]*?<!-- generated:methods:end -->/;
  if (re.test(readme)) files.set('README.md', readme.replace(re, emitReadmeTable()));
}

let stale = [];
for (const [rel, content] of files) {
  const abs = join(ROOT, rel);
  const current = existsSync(abs) ? readFileSync(abs, 'utf8') : null;
  if (current === content) continue;
  if (CHECK) {
    stale.push(rel);
  } else {
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    console.log(`wrote ${relative(ROOT, abs)}`);
  }
}
if (CHECK && stale.length) {
  console.error(`Generated files are out of date (run \`npm run generate\`):\n  ${stale.join('\n  ')}`);
  process.exit(1);
}
console.log(`${operations.length} operations, ${groups.length} namespaces, ${schemaTypeNames.size} schemas${CHECK ? ' (up to date)' : ''}`);
