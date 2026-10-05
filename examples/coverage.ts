import type { PropRaven } from '@propraven/sdk';
import { main } from './runtime.js';

export async function run(client: PropRaven) {
  const result = await client.coverage.get({ state: '37' });
  return result.data.map((row) => ({ state_fips: row.state_fips, county_fips: row.county_fips,
    parcel_count: row.parcel_count, last_updated: row.last_updated }));
}

if (require.main === module) void main(run).catch((error) => { console.error(error); process.exitCode = 1; });
