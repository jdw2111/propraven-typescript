import type { PropRaven } from '@propraven/sdk';
import { main } from './runtime.js';

export async function run(client: PropRaven) {
  const catalog = await client.storefront.catalog({ state: 'NC', fields: 'none' });
  const availability = await client.storefront.availability({ state: 'NC', county: '37183' });
  return { catalog_version: catalog.catalog_version,
    availability_catalog_version: availability.catalog_version,
    availability_disclosures: availability.disclosures };
}

if (require.main === module) void main(run).catch((error) => { console.error(error); process.exitCode = 1; });
