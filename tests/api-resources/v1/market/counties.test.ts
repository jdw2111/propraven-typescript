// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Propraven from '@propraven/sdk';

const client = new Propraven({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource counties', () => {
  // Mock server tests are disabled
  test.skip('retrieveDetail', async () => {
    const responsePromise = client.v1.market.counties.retrieveDetail('21029');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveStatistics', async () => {
    const responsePromise = client.v1.market.counties.retrieveStatistics();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveStatistics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.market.counties.retrieveStatistics(
        {
          limit: 1,
          min_sales: 50,
          offset: 0,
          order: 'asc',
          quarter: '2025Q4',
          sort: 'sale_count',
          state_fips: '37',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });
});
