// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ParcelsAPI from './parcels';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * Geographic and filtered parcel search.
 */
export class Search extends APIResource {
  /**
   * Fast prefix-matched autocomplete: returns cities/places, matching parcels, and
   * Mapbox-geocoded addresses for the prefix. Three independent tiers run in
   * parallel with per-tier timeouts so a slow DB query never blocks fast Mapbox
   * results. Use for type-ahead UIs and address entry; for full-detail lookup use
   * parcel lookup.
   *
   * @example
   * ```ts
   * const response = await client.v1.search.autocomplete({
   *   q: 'xx',
   * });
   * ```
   */
  autocomplete(
    query: SearchAutocompleteParams,
    options?: RequestOptions,
  ): APIPromise<SearchAutocompleteResponse> {
    return this._client.get('/api/v1/search/autocomplete', { query, ...options });
  }

  /**
   * Returns up to 10,000 search-matched parcels as a CSV download. Accepts the same
   * geographic + attribute filters as POST /api/v1/search. Designed for spreadsheet
   * / Excel workflows; for programmatic ingestion, use the JSON search endpoint and
   * paginate.
   *
   * @example
   * ```ts
   * const response = await client.v1.search.exportResults();
   * ```
   */
  exportResults(
    query: SearchExportResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<string> {
    return this._client.get('/api/v1/search/export', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/csv' }, options?.headers]),
    });
  }

  /**
   * Paginated search across the parcel search index by free-text query (`q`) and
   * optional field/state/city filters. Distinct from POST /api/v1/search which is
   * geo-bounded; this endpoint is text-anchored and works without a bounding box.
   * Returns 50/page by default, 200 max.
   *
   * @example
   * ```ts
   * const response = await client.v1.search.fullSearch({
   *   q: 'xx',
   * });
   * ```
   */
  fullSearch(query: SearchFullSearchParams, options?: RequestOptions): APIPromise<SearchFullSearchResponse> {
    return this._client.get('/api/v1/search/full', { query, ...options });
  }

  /**
   * Search parcels within geographic bounds with optional filters, sorting, and
   * pagination.
   *
   * @example
   * ```ts
   * const response = await client.v1.search.parcelSearch({
   *   bounds: {
   *     east: -78.55,
   *     north: 35.85,
   *     south: 35.75,
   *     west: -78.7,
   *   },
   * });
   * ```
   */
  parcelSearch(
    body: SearchParcelSearchParams,
    options?: RequestOptions,
  ): APIPromise<SearchParcelSearchResponse> {
    return this._client.post('/api/v1/search', { body, ...options });
  }
}

export interface SearchAutocompleteResponse {
  addresses?: Array<SearchAutocompleteResponse.Address>;

  locations?: Array<SearchAutocompleteResponse.Location>;

  parcels?: Array<SearchAutocompleteResponse.Parcel>;
}

export namespace SearchAutocompleteResponse {
  /**
   * Mapbox-geocoded address suggestion. Use to disambiguate user input before
   * calling /api/v1/lookup or /api/v1/parcels/{id}.
   */
  export interface Address {
    lat?: number;

    lng?: number;

    name?: string;

    type?: 'address';
  }

  export interface Location {
    city?: string;

    lat?: number;

    lng?: number;

    name?: string;

    parcel_count?: number;

    state?: string;

    type?: 'city';
  }

  export interface Parcel {
    address?: string | null;

    city?: string | null;

    county_fips?: string;

    parcel_id?: string;

    state?: string | null;

    type?: 'parcel';
  }
}

export type SearchExportResultsResponse = Uploadable;

export interface SearchFullSearchResponse {
  page?: number;

  pages?: number;

  results?: Array<ParcelsAPI.Parcel>;

  total?: number;
}

export interface SearchParcelSearchResponse {
  data?: Array<ParcelsAPI.Parcel>;

  limit?: number;

  offset?: number;

  total?: number;
}

export interface SearchAutocompleteParams {
  /**
   * Search prefix. Minimum 2 chars.
   */
  q: string;
}

export interface SearchExportResultsParams {
  /**
   * Bounding box: east longitude.
   */
  east?: number;

  /**
   * Row cap. Hard max 10,000.
   */
  limit?: number;

  /**
   * Bounding box: north latitude.
   */
  north?: number;

  /**
   * Sort direction.
   */
  order?: 'asc' | 'desc';

  /**
   * Sort column.
   */
  sort?:
    | 'address'
    | 'city'
    | 'state'
    | 'owner_name'
    | 'total_assessed_value'
    | 'zoning'
    | 'year_built'
    | 'lot_size_acres'
    | 'ownership_type';

  /**
   * Bounding box: south latitude.
   */
  south?: number;

  /**
   * Bounding box: west longitude.
   */
  west?: number;

  /**
   * Comma-delimited zoning categories.
   */
  zoningCategories?: string;
}

export interface SearchFullSearchParams {
  /**
   * Search query. Min 2 chars.
   */
  q: string;

  /**
   * City filter.
   */
  city?: string;

  /**
   * Sort direction.
   */
  dir?: 'asc' | 'desc';

  /**
   * Field to match against.
   */
  field?: 'all' | 'address' | 'owner_name' | 'city';

  /**
   * Page size, max 200.
   */
  limit?: number;

  /**
   * 1-indexed page number.
   */
  page?: number;

  /**
   * Sort column.
   */
  sort?: 'address' | 'city' | 'state' | 'owner_name' | 'total_value' | 'year_built';

  /**
   * 2-letter state filter.
   */
  state?: string;
}

export interface SearchParcelSearchParams {
  bounds: SearchParcelSearchParams.Bounds;

  filters?: SearchParcelSearchParams.Filters;

  /**
   * Number of results to return.
   */
  limit?: number;

  /**
   * Number of results to skip for pagination.
   */
  offset?: number;

  order?: 'asc' | 'desc';

  /**
   * Sort field.
   */
  sort?: 'assessed_value' | 'sale_price' | 'acreage' | 'year_built' | 'deal_score';
}

export namespace SearchParcelSearchParams {
  export interface Bounds {
    east: number;

    north: number;

    south: number;

    west: number;
  }

  export interface Filters {
    /**
     * Only return parcels with absentee owners.
     */
    absenteeOnly?: boolean;

    /**
     * Filter by acreage range.
     */
    acreageRange?: Filters.AcreageRange;

    /**
     * Filter by owner entity type.
     */
    ownerTypes?: Array<'individual' | 'corporation' | 'llc' | 'trust' | 'government' | 'other'>;

    /**
     * Filter by assessed value range.
     */
    valueRange?: Filters.ValueRange;

    /**
     * Filter by year built range.
     */
    yearBuiltRange?: Filters.YearBuiltRange;

    /**
     * Filter by zoning category (e.g., residential, commercial, industrial).
     */
    zoningCategories?: Array<string>;
  }

  export namespace Filters {
    /**
     * Filter by acreage range.
     */
    export interface AcreageRange {
      max?: number;

      min?: number;
    }

    /**
     * Filter by assessed value range.
     */
    export interface ValueRange {
      max?: number;

      min?: number;
    }

    /**
     * Filter by year built range.
     */
    export interface YearBuiltRange {
      max?: number;

      min?: number;
    }
  }
}

export declare namespace Search {
  export {
    type SearchAutocompleteResponse as SearchAutocompleteResponse,
    type SearchExportResultsResponse as SearchExportResultsResponse,
    type SearchFullSearchResponse as SearchFullSearchResponse,
    type SearchParcelSearchResponse as SearchParcelSearchResponse,
    type SearchAutocompleteParams as SearchAutocompleteParams,
    type SearchExportResultsParams as SearchExportResultsParams,
    type SearchFullSearchParams as SearchFullSearchParams,
    type SearchParcelSearchParams as SearchParcelSearchParams,
  };
}
