import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PropRaven } from '@propraven/sdk';

export interface Recording {
  name: string;
  method: string;
  path: string;
  query: Record<string, string>;
  body: unknown;
  response: unknown;
  schema_pointer: string;
}

export function recordings(): Recording[] {
  return JSON.parse(readFileSync(resolve(__dirname, '../examples/fixtures/responses.json'), 'utf8')).records;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function replay() {
  const rows = recordings();
  const seen: string[] = [];
  const fetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const url = new URL(String(input));
    if (url.origin !== 'https://example.invalid' || new Headers(init?.headers).has('authorization')) {
      throw new Error('Mock requests must use example.invalid without authorization');
    }
    const query = Object.fromEntries(url.searchParams);
    const body: unknown = init?.body ? JSON.parse(String(init.body)) : null;
    const row = rows.find((r) => r.method === (init?.method ?? 'GET') && r.path === decodeURIComponent(url.pathname)
      && canonical(r.query) === canonical(query) && canonical(r.body) === canonical(body));
    if (!row) throw new Error('Unrecorded request: mock mode never falls back to the network');
    seen.push(row.name);
    return new Response(JSON.stringify(row.response), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
  return { fetch, seen };
}

export function makeClient(mock = true): PropRaven {
  return mock
    ? new PropRaven({ apiKey: '', baseURL: 'https://example.invalid', fetch: replay().fetch, maxRetries: 0 })
    : new PropRaven();
}

export async function main(run: (client: PropRaven) => Promise<unknown>): Promise<void> {
  const args = process.argv.slice(2);
  if (args.some((a) => !['--mock', '--live'].includes(a)) || (args.includes('--mock') && args.includes('--live'))) {
    throw new Error('Usage: --mock (default, offline) OR --live (normal SDK environment configuration)');
  }
  console.log(JSON.stringify(await run(makeClient(!args.includes('--live'))), null, 2));
}
