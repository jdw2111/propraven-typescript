import type { PropRaven } from '@propraven/sdk';
import { main } from './runtime.js';

export async function run(client: PropRaven) {
  const text = await client.search.full({ q: '123 Main St', field: 'address', state: 'NC', limit: 5 });
  const bounded = await client.search.parcels({
    bounds: { north: 35.215, south: 35.205, east: -80.855, west: -80.865 },
    filters: { valueRange: { min: 100000 } }, limit: 50,
  });
  return {
    address_results: text.results.map((r) => ({ parcel_id: r.parcel_id, address: r.site_address })),
    bounds_results: bounded.data.map((r) => ({ parcel_id: r.parcel_id, address: r.address })),
    bounds_total: bounded.total, bounds_has_more: bounded.has_more,
  };
}

if (require.main === module) void main(run).catch((error) => { console.error(error); process.exitCode = 1; });
