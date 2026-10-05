import type { PropRaven } from '@propraven/sdk';
import { main } from './runtime.js';

export async function run(client: PropRaven) {
  const row = await client.parcels.get('37:119:12104406');
  return { parcel_id: row.parcel_id, address: row.address, zoning: row.zoning, year_built: row.year_built };
}

if (require.main === module) void main(run).catch((error) => { console.error(error); process.exitCode = 1; });
