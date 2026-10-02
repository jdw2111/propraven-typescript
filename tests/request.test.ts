import { describe, expect, it } from 'vitest';
import { PropRavenError } from '../src/index.js';
import { appendQuery, encodePathSegment } from '../src/core/encoding.js';
import { makeClient } from './helpers.js';

describe('query encoding', () => {
  it('encodes booleans, numbers and omits null/undefined', async () => {
    const { client, calls } = makeClient([{ json: { data: [] } }]);
    await client.deals.absentee({ county_fips: '37119', out_of_state: true, min_value: 50000, state_fips: undefined, limit: 10 });
    const url = calls[0]!.url;
    expect(url.pathname).toBe('/api/v1/deals/absentee');
    expect(url.searchParams.get('county_fips')).toBe('37119');
    expect(url.searchParams.get('out_of_state')).toBe('true');
    expect(url.searchParams.get('min_value')).toBe('50000');
    expect(url.searchParams.get('limit')).toBe('10');
    expect(url.searchParams.has('state_fips')).toBe(false);
  });

  it('encodes false as "false"', async () => {
    const { client, calls } = makeClient([{ json: { data: [] } }]);
    await client.deals.absentee({ out_of_state: false });
    expect(calls[0]!.url.searchParams.get('out_of_state')).toBe('false');
  });

  it('comma-joins arrays unless explode is true', () => {
    const a = new URLSearchParams();
    appendQuery(a, 'states', ['NC', 'SC', null]);
    expect(a.toString()).toBe('states=NC%2CSC');
    const b = new URLSearchParams();
    appendQuery(b, 'states', ['NC', 'SC'], true);
    expect(b.toString()).toBe('states=NC&states=SC');
    const c = new URLSearchParams();
    appendQuery(c, 'x', null);
    appendQuery(c, 'y', undefined);
    expect(c.toString()).toBe('');
  });

  it('passes extra query options and unknown params to the query string', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.coverage.get({ state: 'NC', future_flag: 1 } as never, { query: { tags: ['a', 'b'] } });
    const sp = calls[0]!.url.searchParams;
    expect(sp.get('state')).toBe('NC');
    expect(sp.get('future_flag')).toBe('1');
    expect(sp.get('tags')).toBe('a,b');
  });
});

describe('path encoding', () => {
  it('URL-encodes path parameters per segment', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.parcels.permits('37:119:12104406', { shape: 'envelope' });
    expect(encodePathSegment('37:119:12104406')).toBe('37%3A119%3A12104406');
    expect(calls[0]!.url.toString()).toBe('https://api.test/api/v1/parcels/37%3A119%3A12104406/permits?shape=envelope');
  });

  it('encodes slashes and spaces inside a segment', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.owners.get('SMITH & SONS / LLC');
    expect(calls[0]!.url.pathname).toBe('/api/v1/owners/SMITH%20%26%20SONS%20%2F%20LLC');
  });

  it('handles several path parameters in order', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.webhooks.retryDelivery('wh_1', 'del_2');
    expect(calls[0]!.method).toBe('POST');
    expect(calls[0]!.url.pathname).toBe('/api/v1/webhooks/wh_1/deliveries/del_2/retry');
  });

  it('rejects a missing path parameter', async () => {
    const { client, fetch } = makeClient([{ json: {} }]);
    await expect(client.parcels.get('')).rejects.toBeInstanceOf(PropRavenError);
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('JSON body', () => {
  it('spreads body fields into the params object and sends JSON', async () => {
    const { client, calls } = makeClient([{ json: { data: [], total: 0, limit: 2, offset: 0, has_more: false } }]);
    await client.search.parcels({
      bounds: { north: 35.85, south: 35.75, east: -78.55, west: -78.7 },
      filters: { absenteeOnly: true },
      limit: 2,
    });
    const call = calls[0]!;
    expect(call.method).toBe('POST');
    expect(call.url.pathname).toBe('/api/v1/search');
    expect(call.url.search).toBe('');
    expect(call.headers['content-type']).toBe('application/json');
    expect(call.body).toEqual({
      bounds: { north: 35.85, south: 35.75, east: -78.55, west: -78.7 },
      filters: { absenteeOnly: true },
      limit: 2,
    });
  });

  it('sends {} for a required body with no fields set', async () => {
    const { client, calls } = makeClient([{ json: { data: [] } }]);
    await client.search.parcels();
    expect(calls[0]!.body).toEqual({});
  });

  it('routes query, header and body members of one params object', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.verify.batch({
      preview: 'true',
      creditToken: 'ct_123',
      lookups: [{ parcel_id: '37:119:1', fields: ['year_built'] }],
    });
    const call = calls[0]!;
    expect(call.url.searchParams.get('preview')).toBe('true');
    expect(call.headers['x-credit-token']).toBe('ct_123');
    expect(call.headers['x-payment']).toBeUndefined();
    expect(call.body).toEqual({ lookups: [{ parcel_id: '37:119:1', fields: ['year_built'] }] });
  });

  it('maps header params to their wire names', async () => {
    const { client, calls } = makeClient([{ json: {} }]);
    await client.credits.balance({ creditToken: 'ct_abc' });
    expect(calls[0]!.headers['x-credit-token']).toBe('ct_abc');
    expect(calls[0]!.url.search).toBe('');
  });
});

describe('response bodies', () => {
  it('returns CSV endpoints as a string', async () => {
    const csv = 'parcel_id,address\n1,1 Main St\n';
    const { client, calls } = makeClient([{ text: csv, headers: { 'content-type': 'text/csv; charset=utf-8' } }]);
    const out = await client.search.export({ north: 1, south: 0, east: 1, west: 0 });
    expect(out).toBe(csv);
    expect(typeof out).toBe('string');
    expect(calls[0]!.headers['accept']).toBe('text/csv, application/json');
  });

  it('returns JSON or text by Content-Type for mixed endpoints', async () => {
    const { client } = makeClient([
      { json: { preview: true, parcels_listed: 3 } },
      { text: 'a,b\n1,2\n', headers: { 'content-type': 'text/csv' } },
    ]);
    expect(await client.cohorts.export('c1', { preview: true })).toEqual({ preview: true, parcels_listed: 3 });
    expect(await client.cohorts.export('c1')).toBe('a,b\n1,2\n');
  });

  it('returns null for an empty 2xx body', async () => {
    const { client } = makeClient([{ status: 204 }]);
    expect(await client.webhooks.delete('w1')).toBeNull();
  });

  it('parses bare-array responses (permits default shape)', async () => {
    const { client } = makeClient([{ json: [{ permit_id: 'a' }] }]);
    const permits = await client.parcels.permits('1');
    expect(Array.isArray(permits)).toBe(true);
  });
});
