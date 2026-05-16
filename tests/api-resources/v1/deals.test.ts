// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Propraven from 'propraven';

const client = new Propraven({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource deals', () => {
  // Mock server tests are disabled
  test.skip('findAbsenteeOwners', async () => {
    const responsePromise = client.v1.deals.findAbsenteeOwners();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findAbsenteeOwners: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.findAbsenteeOwners(
        {
          county_fips: '37183',
          limit: 1,
          min_value: 50000,
          offset: 0,
          out_of_state: true,
          state_fips: '37',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('findEntityOwnedParcels', async () => {
    const responsePromise = client.v1.deals.findEntityOwnedParcels();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findEntityOwnedParcels: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.findEntityOwnedParcels(
        {
          county_fips: '37183',
          entity_type: 'LLC',
          limit: 1,
          min_value: 0,
          offset: 0,
          search: 'BLACKSTONE',
          state_fips: '37',
          top: true,
          zoning: 'zoning',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('findFlips', async () => {
    const responsePromise = client.v1.deals.findFlips();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findFlips: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.findFlips(
        {
          county_fips: '37183',
          flip_tier: 'quick',
          limit: 1,
          min_profit: 25000,
          offset: 0,
          state_fips: '37',
          view: 'flippers',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('findHighLandRatio', async () => {
    const responsePromise = client.v1.deals.findHighLandRatio();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findHighLandRatio: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.findHighLandRatio(
        {
          county_fips: 'county_fips',
          limit: 1,
          min_ratio: 1,
          min_value: 0,
          offset: 0,
          state_fips: 'state_fips',
          zoning: 'zoning',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('findLongHoldParcels', async () => {
    const responsePromise = client.v1.deals.findLongHoldParcels();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findLongHoldParcels: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.findLongHoldParcels(
        {
          county_fips: 'county_fips',
          hold_tier: '10-15yr',
          limit: 1,
          min_value: 0,
          min_years: 0,
          offset: 0,
          state_fips: 'state_fips',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('findPortfolioOwners', async () => {
    const responsePromise = client.v1.deals.findPortfolioOwners();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('findPortfolioOwners: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.findPortfolioOwners(
        {
          limit: 1,
          min_properties: 0,
          min_value: 0,
          offset: 0,
          search: 'search',
          state: 'NC',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveMarketSummary', async () => {
    const responsePromise = client.v1.deals.retrieveMarketSummary();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveMarketSummary: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.retrieveMarketSummary(
        {
          county_fips: 'county_fips',
          limit: 1,
          offset: 0,
          rating: 'AFFORDABLE',
          state_fips: 'state_fips',
          view: 'affordability',
          year: '2024',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('searchContractors', async () => {
    const responsePromise = client.v1.deals.searchContractors();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('searchContractors: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.searchContractors(
        {
          limit: 1,
          min_permits: 1,
          min_value: 0,
          offset: 0,
          search: 'SMITH CONSTRUCTION',
          state: 'NC',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('searchLenders', async () => {
    const responsePromise = client.v1.deals.searchLenders();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('searchLenders: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.deals.searchLenders(
        {
          limit: 1,
          min_mortgages: 0,
          offset: 0,
          search: 'WELLS FARGO',
          state: 'NC',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });
});
