// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Propraven from '@propraven/sdk';

const client = new Propraven({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource market', () => {
  // Mock server tests are disabled
  test.skip('retrieveFlipActivity', async () => {
    const responsePromise = client.v1.market.retrieveFlipActivity();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveFlipActivity: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.market.retrieveFlipActivity(
        {
          limit: 1,
          offset: 0,
          state_fips: '37',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveTrends', async () => {
    const responsePromise = client.v1.market.retrieveTrends();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveTrends: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.market.retrieveTrends(
        { county_fips: '37183,37063', state_fips: '37' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });
});
