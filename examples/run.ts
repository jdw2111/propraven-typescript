import type { PropRaven } from '@propraven/sdk';
import * as search from './search.js';
import * as parcel from './parcel.js';
import * as coverage from './coverage.js';
import * as storefront from './storefront.js';
import { main } from './runtime.js';

export async function run(client: PropRaven) {
  return { search: await search.run(client), parcel: await parcel.run(client),
    coverage: await coverage.run(client), storefront: await storefront.run(client) };
}

if (require.main === module) void main(run).catch((error) => { console.error(error); process.exitCode = 1; });
