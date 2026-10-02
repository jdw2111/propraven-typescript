// Not a test file: README examples, kept here so `npm run typecheck` proves they compile.
import PropRaven, { APIError, NotFoundError, RateLimitError, type Parcel } from '../src/index.js';
import { verifyWebhook, WebhookVerificationError } from '../src/webhooks.js';

export async function readmeSnippets(id: string, bounds: { north: number; south: number; east: number; west: number }) {
  const client = new PropRaven();
  const parcel = await client.parcels.get('37:119:12104406');
  console.log(parcel.address, parcel.total_assessed_value);
  const permits = await client.parcels.permits('37:119:12104406', { shape: 'envelope' });
  const page = await client.search.parcels({ bounds, filters: { absenteeOnly: true }, limit: 25 });
  await client.parcels.permits(id, { shape: 'envelope' }, { timeout: 10_000 });
  await client.verify.get({ parcel_id: '37:119:12104406', fields: 'year_built', preview: 'true' });

  try {
    await client.parcels.get('37:119:0000');
  } catch (err) {
    if (err instanceof NotFoundError) console.log('no such parcel');
    else if (err instanceof RateLimitError) console.log(`retry in ${err.retryAfter}s`);
    else if (err instanceof APIError) console.log(err.status, err.code, err.detail, err.errors, err.requestId);
    else throw err;
  }

  const tuned = new PropRaven({ maxRetries: 4, timeout: 20_000 });
  await tuned.deals.absentee({ county_fips: '37119' }, { maxRetries: 0, timeout: 5_000 });

  for await (const row of client.deals.absenteeAll({ county_fips: '37119' }, { pageSize: 100, maxItems: 1000 })) {
    console.log(row.parcel_id);
  }
  const hits = await client.search.fullAll({ q: 'main st', state: 'NC' }, { maxItems: 200 }).toArray();
  console.log(hits[0]?.site_address);

  const event = verifyWebhook({ payload: Buffer.from('{}'), signature: 't=1,v1=00', secret: 'whsec_x' });
  console.log(event, WebhookVerificationError.name);

  const { data, response, rateLimit, requestId } = await client.account.usage().withResponse();
  console.log(data.tier, response.status, rateLimit?.remaining, requestId);

  const typed: Parcel = parcel;
  return { permits, page, typed };
}
