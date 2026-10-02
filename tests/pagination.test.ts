import { describe, expect, it } from 'vitest';
import { makeClient } from './helpers.js';

const rows = (from: number, n: number) => Array.from({ length: n }, (_, i) => ({ parcel_id: `p${from + i}` }));

describe('offset pagination', () => {
  it('walks 3 pages and stops on a short page', async () => {
    const { client, calls } = makeClient([
      { json: { data: rows(0, 2), limit: 2, offset: 0 } },
      { json: { data: rows(2, 2), limit: 2, offset: 2 } },
      { json: { data: rows(4, 1), limit: 2, offset: 4 } },
    ]);
    const out = await client.deals.absenteeAll({ county_fips: '37119' }, { pageSize: 2 }).toArray();
    expect(out.map((r) => (r as { parcel_id: string }).parcel_id)).toEqual(['p0', 'p1', 'p2', 'p3', 'p4']);
    expect(calls).toHaveLength(3);
    expect(calls.map((c) => [c.url.searchParams.get('offset'), c.url.searchParams.get('limit')])).toEqual([
      ['0', '2'],
      ['2', '2'],
      ['4', '2'],
    ]);
    expect(calls.every((c) => c.url.searchParams.get('county_fips') === '37119')).toBe(true);
  });

  it('stops when offset reaches total', async () => {
    const { client, calls } = makeClient([
      { json: { data: rows(0, 2), total: 6, limit: 2, offset: 0 } },
      { json: { data: rows(2, 2), total: 6, limit: 2, offset: 2 } },
      { json: { data: rows(4, 2), total: 6, limit: 2, offset: 4 } },
      { json: { data: rows(6, 2), total: 6, limit: 2, offset: 6 } },
    ]);
    const out = await client.deals.flipsAll({}, { pageSize: 2 }).toArray();
    expect(out).toHaveLength(6);
    expect(calls).toHaveLength(3);
  });

  it('stops on has_more === false even with a full page', async () => {
    const { client, calls } = makeClient([
      { json: { data: rows(0, 2), has_more: true, limit: 2 } },
      { json: { data: rows(2, 2), has_more: false, limit: 2 } },
      { json: { data: rows(4, 2), has_more: false, limit: 2 } },
    ]);
    const out = await client.market.countiesAll({}, { pageSize: 2 }).toArray();
    expect(out).toHaveLength(4);
    expect(calls).toHaveLength(2);
  });

  it('respects maxItems and shrinks the last page', async () => {
    const { client, calls } = makeClient([
      { json: { data: rows(0, 2), limit: 2 } },
      { json: { data: rows(2, 1), limit: 1 } },
    ]);
    const out = await client.deals.absenteeAll({}, { pageSize: 2, maxItems: 3 }).toArray();
    expect(out).toHaveLength(3);
    expect(calls.map((c) => c.url.searchParams.get('limit'))).toEqual(['2', '1']);
  });

  it('puts limit/offset in the JSON body for POST /search', async () => {
    const { client, calls } = makeClient([
      { json: { data: rows(0, 2), total: 3, total_is_estimate: false, total_is_lower_bound: false, has_more: true, limit: 2, offset: 0 } },
      { json: { data: rows(2, 1), total: 3, total_is_estimate: false, total_is_lower_bound: false, has_more: false, limit: 2, offset: 2 } },
    ]);
    const out = [];
    for await (const row of client.search.parcelsAll({ filters: { absenteeOnly: true } }, { pageSize: 2 })) out.push(row);
    expect(out).toHaveLength(3);
    expect(calls.map((c) => c.body)).toEqual([
      { filters: { absenteeOnly: true }, offset: 0, limit: 2 },
      { filters: { absenteeOnly: true }, offset: 2, limit: 2 },
    ]);
    expect(calls[0]!.url.search).toBe('');
  });

  it('starts at the caller offset and stops on an empty page', async () => {
    const { client, calls } = makeClient([{ json: { data: rows(10, 2), limit: 2 } }, { json: { data: [], limit: 2 } }]);
    const out = await client.deals.lendersAll({ offset: 10, limit: 2 }).toArray();
    expect(out).toHaveLength(2);
    expect(calls[0]!.url.searchParams.get('offset')).toBe('10');
    expect(calls[1]!.url.searchParams.get('offset')).toBe('12');
  });

  it('each iteration starts afresh', async () => {
    const { client, calls } = makeClient([{ json: { data: rows(0, 1), limit: 2 } }]);
    const it = client.deals.absenteeAll({}, { pageSize: 2 });
    await it.toArray();
    await it.toArray();
    expect(calls).toHaveLength(2);
  });
});

describe('cursor pagination', () => {
  it('follows nextCursor via after until it is null', async () => {
    const { client, calls } = makeClient([
      { json: { results: rows(0, 2), nextCursor: 'c1', hasMore: true } },
      { json: { results: rows(2, 2), nextCursor: 'c2', hasMore: true } },
      { json: { results: rows(4, 1), nextCursor: null, hasMore: false } },
    ]);
    const out = await client.search.fullAll({ q: 'main st', state: 'NC' }, { pageSize: 2 }).toArray();
    expect(out).toHaveLength(5);
    expect(calls.map((c) => c.url.searchParams.get('after'))).toEqual([null, 'c1', 'c2']);
    expect(calls.every((c) => c.url.searchParams.get('q') === 'main st' && c.url.searchParams.get('limit') === '2')).toBe(true);
  });

  it('stops when hasMore is false even if a cursor is present', async () => {
    const { client, calls } = makeClient([
      { json: { results: rows(0, 2), nextCursor: 'c1', hasMore: false } },
      { json: { results: rows(2, 2), nextCursor: null } },
    ]);
    const out = await client.search.fullAll({ q: 'oak' }).toArray();
    expect(out).toHaveLength(2);
    expect(calls).toHaveLength(1);
  });

  it('stops when nextCursor is absent and honours maxItems', async () => {
    const { client, calls } = makeClient([
      { json: { results: rows(0, 3), nextCursor: 'c1' } },
      { json: { results: rows(3, 3) } },
    ]);
    expect(await client.search.fullAll({ q: 'oak' }, { maxItems: 4 }).toArray()).toHaveLength(4);
    expect(calls).toHaveLength(2);
    const second = makeClient([{ json: { results: rows(0, 3) } }]);
    expect(await second.client.search.fullAll({ q: 'oak' }).toArray()).toHaveLength(3);
    expect(second.calls).toHaveLength(1);
  });
});
