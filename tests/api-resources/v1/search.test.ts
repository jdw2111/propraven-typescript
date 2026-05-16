// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Propraven from 'propraven';

const client = new Propraven({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Mock server tests are disabled
  test.skip('autocomplete: only required params', async () => {
    const responsePromise = client.v1.search.autocomplete({ q: 'xx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('autocomplete: required and optional params', async () => {
    const response = await client.v1.search.autocomplete({ q: 'xx' });
  });

  // Mock server tests are disabled
  test.skip('exportResults', async () => {
    const responsePromise = client.v1.search.exportResults();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('exportResults: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.v1.search.exportResults(
        {
          east: 0,
          limit: 1,
          north: 0,
          order: 'asc',
          sort: 'address',
          south: 0,
          west: 0,
          zoningCategories: 'zoningCategories',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Propraven.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('fullSearch: only required params', async () => {
    const responsePromise = client.v1.search.fullSearch({ q: 'xx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('fullSearch: required and optional params', async () => {
    const response = await client.v1.search.fullSearch({
      q: 'xx',
      city: 'city',
      dir: 'asc',
      field: 'all',
      limit: 1,
      page: 1,
      sort: 'address',
      state: 'xx',
    });
  });

  // Mock server tests are disabled
  test.skip('parcelSearch: only required params', async () => {
    const responsePromise = client.v1.search.parcelSearch({
      bounds: {
        east: -78.55,
        north: 35.85,
        south: 35.75,
        west: -78.7,
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('parcelSearch: required and optional params', async () => {
    const response = await client.v1.search.parcelSearch({
      bounds: {
        east: -78.55,
        north: 35.85,
        south: 35.75,
        west: -78.7,
      },
      filters: {
        absenteeOnly: true,
        acreageRange: { max: 10, min: 0.5 },
        ownerTypes: ['individual'],
        valueRange: { max: 500000, min: 100000 },
        yearBuiltRange: { max: 2024, min: 1990 },
        zoningCategories: ['residential', 'commercial'],
      },
      limit: 1,
      offset: 0,
      order: 'asc',
      sort: 'assessed_value',
    });
  });
});
