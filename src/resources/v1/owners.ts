// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ParcelsAPI from './parcels';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Owner search, profiles, and portfolios.
 */
export class Owners extends APIResource {
  /**
   * Retrieve an owner's portfolio with aggregated summary statistics and property
   * breakdown.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.owners.retrievePortfolioSummary(
   *     'BLACKROCK FUND ADVISORS',
   *   );
   * ```
   */
  retrievePortfolioSummary(
    name: string,
    options?: RequestOptions,
  ): APIPromise<OwnerRetrievePortfolioSummaryResponse> {
    return this._client.get(path`/api/v1/owners/${name}/portfolio`, options);
  }

  /**
   * Retrieve a specific owner profile by name, including property count, total
   * assessed value, entity type, and states.
   *
   * @example
   * ```ts
   * const owner = await client.v1.owners.retrieveProfile(
   *   'BLACKROCK FUND ADVISORS',
   * );
   * ```
   */
  retrieveProfile(name: string, options?: RequestOptions): APIPromise<Owner> {
    return this._client.get(path`/api/v1/owners/${name}`, options);
  }

  /**
   * Retrieve the list of properties owned by a specific owner.
   *
   * @example
   * ```ts
   * const response = await client.v1.owners.retrieveProperties(
   *   'BLACKROCK FUND ADVISORS',
   * );
   * ```
   */
  retrieveProperties(
    name: string,
    query: OwnerRetrievePropertiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OwnerRetrievePropertiesResponse> {
    return this._client.get(path`/api/v1/owners/${name}/properties`, { query, ...options });
  }

  /**
   * Returns up to 100 most-recent deed events where the named owner is either
   * grantor or grantee. Useful for building an owner's transaction timeline across
   * their portfolio.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.owners.retrieveTransactions(
   *     'BLACKROCK FUND ADVISORS',
   *   );
   * ```
   */
  retrieveTransactions(
    name: string,
    options?: RequestOptions,
  ): APIPromise<OwnerRetrieveTransactionsResponse> {
    return this._client.get(path`/api/v1/owners/${name}/transactions`, options);
  }

  /**
   * Search for property owners by name. Returns owner profiles with property counts
   * and portfolio values.
   *
   * @example
   * ```ts
   * const response = await client.v1.owners.searchOwners({
   *   q: 'BLACKROCK',
   * });
   * ```
   */
  searchOwners(
    query: OwnerSearchOwnersParams,
    options?: RequestOptions,
  ): APIPromise<OwnerSearchOwnersResponse> {
    return this._client.get('/api/v1/owners/search', { query, ...options });
  }
}

export interface Owner {
  entity_type?: 'individual' | 'corporation' | 'llc' | 'trust' | 'government' | 'other';

  owner_name?: string;

  property_count?: number;

  states?: Array<string>;

  total_assessed_value?: number;
}

export interface OwnerRetrievePortfolioSummaryResponse {
  entity_type?: 'individual' | 'corporation' | 'llc' | 'trust' | 'government' | 'other';

  owner_name?: string;

  properties?: Array<ParcelsAPI.Parcel>;

  summary?: OwnerRetrievePortfolioSummaryResponse.Summary;
}

export namespace OwnerRetrievePortfolioSummaryResponse {
  export interface Summary {
    avg_assessed_value?: number;

    counties?: number;

    property_count?: number;

    states?: Array<string>;

    total_assessed_value?: number;

    zoning_breakdown?: { [key: string]: number };
  }
}

export interface OwnerRetrievePropertiesResponse {
  data?: Array<ParcelsAPI.Parcel>;

  limit?: number;

  offset?: number;

  total?: number;
}

export interface OwnerRetrieveTransactionsResponse {
  count?: number;

  data?: Array<OwnerRetrieveTransactionsResponse.Data>;
}

export namespace OwnerRetrieveTransactionsResponse {
  export interface Data {
    document_number?: string;

    /**
     * Recorded document type (Warranty Deed, Quit Claim, etc.).
     */
    document_type?: string | null;

    grantee_name?: string | null;

    grantor_name?: string | null;

    property_address?: string | null;

    recording_date?: string;

    sale_date?: string;

    /**
     * USD. Null when state is non-disclosure.
     */
    sale_price?: number | null;
  }
}

export interface OwnerSearchOwnersResponse {
  data?: Array<Owner>;
}

export interface OwnerRetrievePropertiesParams {
  limit?: number;

  offset?: number;
}

export interface OwnerSearchOwnersParams {
  /**
   * Search query for owner name.
   */
  q: string;

  limit?: number;

  /**
   * Minimum number of properties owned.
   */
  min_properties?: number;
}

export declare namespace Owners {
  export {
    type Owner as Owner,
    type OwnerRetrievePortfolioSummaryResponse as OwnerRetrievePortfolioSummaryResponse,
    type OwnerRetrievePropertiesResponse as OwnerRetrievePropertiesResponse,
    type OwnerRetrieveTransactionsResponse as OwnerRetrieveTransactionsResponse,
    type OwnerSearchOwnersResponse as OwnerSearchOwnersResponse,
    type OwnerRetrievePropertiesParams as OwnerRetrievePropertiesParams,
    type OwnerSearchOwnersParams as OwnerSearchOwnersParams,
  };
}
