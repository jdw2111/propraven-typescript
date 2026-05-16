// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DealsAPI from './deals';
import * as ParcelsAPI from './parcels';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Deal sourcing: absentee owners, property flips.
 */
export class Deals extends APIResource {
  /**
   * Retrieve parcels owned by absentee owners, useful for off-market deal sourcing.
   *
   * @example
   * ```ts
   * const response = await client.v1.deals.findAbsenteeOwners();
   * ```
   */
  findAbsenteeOwners(
    query: DealFindAbsenteeOwnersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealFindAbsenteeOwnersResponse> {
    return this._client.get('/api/v1/deals/absentee', { query, ...options });
  }

  /**
   * Returns parcels owned by legal entities identified from owner-name pattern
   * matching across 221M+ parcels. Pass `top=true` to get aggregated entity rankings
   * instead of per-parcel rows. One of `county_fips`, `state_fips`, `search`, or
   * `top` is required.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.deals.findEntityOwnedParcels();
   * ```
   */
  findEntityOwnedParcels(
    query: DealFindEntityOwnedParcelsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealFindEntityOwnedParcelsResponse> {
    return this._client.get('/api/v1/deals/entities', { query, ...options });
  }

  /**
   * Retrieve recently flipped properties. Use ?view=flippers to get a ranked list of
   * top flippers instead.
   *
   * @example
   * ```ts
   * const response = await client.v1.deals.findFlips();
   * ```
   */
  findFlips(
    query: DealFindFlipsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealFindFlipsResponse> {
    return this._client.get('/api/v1/deals/flips', { query, ...options });
  }

  /**
   * Returns parcels where land value significantly exceeds improvement value — a
   * signal for redevelopment, teardown, or assemblage opportunities. `county_fips`
   * or `state_fips` is required.
   *
   * @example
   * ```ts
   * const response = await client.v1.deals.findHighLandRatio();
   * ```
   */
  findHighLandRatio(
    query: DealFindHighLandRatioParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealFindHighLandRatioResponse> {
    return this._client.get('/api/v1/deals/high-land-ratio', { query, ...options });
  }

  /**
   * Returns parcels not sold in `min_years` or more. Long-hold owners are often
   * motivated sellers — estate planning, deferred maintenance, life changes.
   * `county_fips` or `state_fips` is required.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.deals.findLongHoldParcels();
   * ```
   */
  findLongHoldParcels(
    query: DealFindLongHoldParcelsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealFindLongHoldParcelsResponse> {
    return this._client.get('/api/v1/deals/long-hold', { query, ...options });
  }

  /**
   * Returns portfolio owners ranked by property count and total assessed value.
   * Useful for finding institutional buyers, small landlords, or specific investor
   * families.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.deals.findPortfolioOwners();
   * ```
   */
  findPortfolioOwners(
    query: DealFindPortfolioOwnersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealFindPortfolioOwnersResponse> {
    return this._client.get('/api/v1/deals/portfolio-owners', { query, ...options });
  }

  /**
   * Default: returns county/quarter transaction summaries. Pass `view=affordability`
   * to retrieve the home-affordability index instead (price-to-income ratios +
   * rating).
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.deals.retrieveMarketSummary();
   * ```
   */
  retrieveMarketSummary(
    query: DealRetrieveMarketSummaryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealRetrieveMarketSummaryResponse> {
    return this._client.get('/api/v1/deals/market', { query, ...options });
  }

  /**
   * Returns contractor profiles aggregated from 45M+ building permits. Each profile
   * includes permit count, jurisdictions worked, total declared permit value, and
   * activity dates. Use to identify active contractors in a market or find a
   * specific contractor by name.
   *
   * @example
   * ```ts
   * const response = await client.v1.deals.searchContractors();
   * ```
   */
  searchContractors(
    query: DealSearchContractorsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealSearchContractorsResponse> {
    return this._client.get('/api/v1/deals/contractors', { query, ...options });
  }

  /**
   * Returns lender profiles aggregated from deed/mortgage transactions. Includes
   * mortgage count, total volume, geographic spread, and a national rank.
   *
   * @example
   * ```ts
   * const response = await client.v1.deals.searchLenders();
   * ```
   */
  searchLenders(
    query: DealSearchLendersParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealSearchLendersResponse> {
    return this._client.get('/api/v1/deals/lenders', { query, ...options });
  }
}

export interface AffordabilityRow {
  affordability_rating?: 'AFFORDABLE' | 'MODERATE' | 'EXPENSIVE' | 'VERY_EXPENSIVE';

  county_fips?: string;

  county_name?: string | null;

  median_household_income?: number | null;

  median_sale_price?: number | null;

  monthly_payment_estimate?: number | null;

  pct_income_for_housing?: number | null;

  price_to_income_ratio?: number | null;

  state_fips?: string;

  year?: number;
}

export interface DealFindAbsenteeOwnersResponse {
  data?: Array<ParcelsAPI.Parcel>;

  limit?: number;

  offset?: number;

  total?: number;
}

export type DealFindEntityOwnedParcelsResponse =
  | DealFindEntityOwnedParcelsResponse.UnionMember0
  | DealFindEntityOwnedParcelsResponse.UnionMember1;

export namespace DealFindEntityOwnedParcelsResponse {
  export interface UnionMember0 {
    data?: Array<UnionMember0.Data>;

    limit?: number;

    offset?: number;

    total?: number;
  }

  export namespace UnionMember0 {
    export interface Data {
      address?: string | null;

      city?: string | null;

      county_fips?: string;

      entity_type?: 'LLC' | 'CORP' | 'TRUST' | 'LP' | 'LTD' | 'ASSOCIATION' | 'OTHER_ENTITY';

      owner_name?: string;

      parcel_id?: string;

      state?: string | null;

      state_fips?: string;

      total_assessed_value?: number | null;

      zip?: string | null;

      zoning?: string | null;
    }
  }

  export interface UnionMember1 {
    data?: Array<UnionMember1.Data>;

    limit?: number;

    offset?: number;

    summary?: UnionMember1.Summary;

    total?: number;
  }

  export namespace UnionMember1 {
    export interface Data {
      entity_type?: string;

      owner_name?: string;

      parcel_count?: number;

      states_arr?: Array<string>;

      total_value?: number | null;
    }

    export interface Summary {
      corp_count?: number;

      llc_count?: number;

      lp_count?: number;

      total_entities?: number;

      total_parcels?: number;

      trust_count?: number;
    }
  }
}

export interface DealFindFlipsResponse {
  data?: Array<DealFindFlipsResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace DealFindFlipsResponse {
  export interface Data {
    address?: string;

    buy_date?: string;

    buy_price?: number;

    buyer_name?: string;

    county_fips?: string;

    flip_tier?: 'quick' | 'standard' | 'long';

    hold_days?: number;

    parcel_id?: string;

    profit?: number;

    sell_date?: string;

    sell_price?: number;

    seller_name?: string;
  }
}

export interface DealFindHighLandRatioResponse {
  data?: Array<DealFindHighLandRatioResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace DealFindHighLandRatioResponse {
  export interface Data {
    address?: string | null;

    city?: string | null;

    county_fips?: string;

    improvement_assessed_value?: number | null;

    land_assessed_value?: number | null;

    /**
     * land / improvement, higher = more redevelopment potential.
     */
    land_improvement_ratio?: number;

    owner_name?: string | null;

    parcel_id?: string;

    state?: string | null;

    state_fips?: string;

    total_assessed_value?: number | null;

    zoning?: string | null;
  }
}

export interface DealFindLongHoldParcelsResponse {
  data?: Array<DealFindLongHoldParcelsResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace DealFindLongHoldParcelsResponse {
  export interface Data {
    address?: string | null;

    city?: string | null;

    county_fips?: string;

    hold_tier?: '10-15yr' | '15-20yr' | '20-30yr' | '30yr+';

    last_sale_date?: string;

    owner_name?: string | null;

    parcel_id?: string;

    state?: string | null;

    state_fips?: string;

    total_assessed_value?: number | null;

    years_held?: number;

    zip?: string | null;
  }
}

export interface DealFindPortfolioOwnersResponse {
  data?: Array<DealFindPortfolioOwnersResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace DealFindPortfolioOwnersResponse {
  export interface Data {
    avg_assessed_value?: number | null;

    county_count?: number;

    owner_name_normalized?: string;

    owner_state?: string | null;

    /**
     * National rank, 1 = largest portfolio.
     */
    portfolio_rank?: number;

    property_count?: number;

    state_count?: number;

    states_list?: string | null;

    total_acreage?: number | null;

    total_assessed_value?: number | null;
  }
}

export type DealRetrieveMarketSummaryResponse =
  | DealRetrieveMarketSummaryResponse.UnionMember0
  | DealRetrieveMarketSummaryResponse.UnionMember1;

export namespace DealRetrieveMarketSummaryResponse {
  export interface UnionMember0 {
    data?: Array<UnionMember0.Data>;

    limit?: number;

    offset?: number;

    total?: number;
  }

  export namespace UnionMember0 {
    export interface Data {
      avg_sale_price?: number | null;

      county_fips?: string;

      county_name?: string | null;

      median_sale_price?: number | null;

      sale_count?: number;

      state_fips?: string;

      year?: number;
    }
  }

  export interface UnionMember1 {
    data?: Array<DealsAPI.AffordabilityRow>;

    limit?: number;

    offset?: number;

    total?: number;
  }
}

export interface DealSearchContractorsResponse {
  data?: Array<DealSearchContractorsResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace DealSearchContractorsResponse {
  export interface Data {
    active_years?: number | null;

    avg_permit_value?: number;

    contractor_license?: string | null;

    contractor_name_normalized?: string;

    /**
     * National rank, 1 = highest activity.
     */
    contractor_rank?: number;

    county_count?: number;

    first_permit_date?: string;

    jurisdiction_count?: number;

    last_permit_date?: string;

    permit_count?: number;

    state_count?: number;

    /**
     * Comma-delimited 2-letter state codes.
     */
    states_list?: string | null;

    top_permit_types?: Array<string>;

    total_permit_value?: number;
  }
}

export interface DealSearchLendersResponse {
  data?: Array<DealSearchLendersResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace DealSearchLendersResponse {
  export interface Data {
    avg_mortgage_amount?: number | null;

    county_count?: number;

    first_mortgage_date?: string;

    last_mortgage_date?: string;

    lender_name_normalized?: string;

    /**
     * National rank, 1 = highest volume.
     */
    lender_rank?: number;

    median_mortgage_amount?: number | null;

    mortgage_count?: number;

    state_count?: number;

    states_list?: string | null;

    total_mortgage_volume?: number | null;
  }
}

export interface DealFindAbsenteeOwnersParams {
  /**
   * Filter by county FIPS code.
   */
  county_fips?: string;

  limit?: number;

  /**
   * Minimum assessed value.
   */
  min_value?: number;

  offset?: number;

  /**
   * Only return owners whose mailing address is in a different state.
   */
  out_of_state?: boolean;

  /**
   * Filter by state FIPS code.
   */
  state_fips?: string;
}

export interface DealFindEntityOwnedParcelsParams {
  /**
   * 5-digit county FIPS filter.
   */
  county_fips?: string;

  /**
   * Filter by entity classification.
   */
  entity_type?: 'LLC' | 'CORP' | 'TRUST' | 'LP' | 'LTD' | 'ASSOCIATION' | 'OTHER_ENTITY';

  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Minimum assessed value, USD.
   */
  min_value?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * Owner-name substring search.
   */
  search?: string;

  /**
   * 2-digit state FIPS filter.
   */
  state_fips?: string;

  /**
   * If true, returns aggregated entity rankings with summary stats instead of
   * per-parcel rows.
   */
  top?: boolean;

  /**
   * Zoning substring filter.
   */
  zoning?: string;
}

export interface DealFindFlipsParams {
  /**
   * Filter by county FIPS code.
   */
  county_fips?: string;

  /**
   * Filter by flip speed tier (quick: <6mo, standard: 6-12mo, long: 12-24mo).
   */
  flip_tier?: 'quick' | 'standard' | 'long';

  limit?: number;

  /**
   * Minimum estimated profit.
   */
  min_profit?: number;

  offset?: number;

  /**
   * Filter by state FIPS code.
   */
  state_fips?: string;

  /**
   * Set to 'flippers' to return a ranked list of top flippers instead of individual
   * flips.
   */
  view?: 'flippers';
}

export interface DealFindHighLandRatioParams {
  /**
   * 5-digit county FIPS filter.
   */
  county_fips?: string;

  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Minimum land/improvement ratio.
   */
  min_ratio?: number;

  /**
   * Minimum land assessed value, USD.
   */
  min_value?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * 2-digit state FIPS filter.
   */
  state_fips?: string;

  /**
   * Zoning substring filter.
   */
  zoning?: string;
}

export interface DealFindLongHoldParcelsParams {
  /**
   * 5-digit county FIPS filter.
   */
  county_fips?: string;

  /**
   * Filter by hold-period tier.
   */
  hold_tier?: '10-15yr' | '15-20yr' | '20-30yr' | '30yr+';

  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Minimum assessed value, USD.
   */
  min_value?: number;

  /**
   * Minimum years held.
   */
  min_years?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * 2-digit state FIPS filter.
   */
  state_fips?: string;
}

export interface DealFindPortfolioOwnersParams {
  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Minimum properties owned.
   */
  min_properties?: number;

  /**
   * Minimum total portfolio assessed value, USD.
   */
  min_value?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * Owner name substring search.
   */
  search?: string;

  /**
   * 2-letter owner mailing state filter.
   */
  state?: string;
}

export interface DealRetrieveMarketSummaryParams {
  /**
   * 5-digit county FIPS filter.
   */
  county_fips?: string;

  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * Affordability-rating filter (only meaningful with view=affordability).
   */
  rating?: 'AFFORDABLE' | 'MODERATE' | 'EXPENSIVE' | 'VERY_EXPENSIVE';

  /**
   * 2-digit state FIPS filter.
   */
  state_fips?: string;

  /**
   * Switch to the affordability-index dataset.
   */
  view?: 'affordability';

  /**
   * Year filter.
   */
  year?: string;
}

export interface DealSearchContractorsParams {
  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Minimum permit count to include.
   */
  min_permits?: number;

  /**
   * Minimum total declared permit value, USD.
   */
  min_value?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * Contractor name search (case-insensitive substring).
   */
  search?: string;

  /**
   * 2-letter state filter.
   */
  state?: string;
}

export interface DealSearchLendersParams {
  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Minimum mortgage count.
   */
  min_mortgages?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * Lender name substring search.
   */
  search?: string;

  /**
   * 2-letter state filter.
   */
  state?: string;
}

export declare namespace Deals {
  export {
    type AffordabilityRow as AffordabilityRow,
    type DealFindAbsenteeOwnersResponse as DealFindAbsenteeOwnersResponse,
    type DealFindEntityOwnedParcelsResponse as DealFindEntityOwnedParcelsResponse,
    type DealFindFlipsResponse as DealFindFlipsResponse,
    type DealFindHighLandRatioResponse as DealFindHighLandRatioResponse,
    type DealFindLongHoldParcelsResponse as DealFindLongHoldParcelsResponse,
    type DealFindPortfolioOwnersResponse as DealFindPortfolioOwnersResponse,
    type DealRetrieveMarketSummaryResponse as DealRetrieveMarketSummaryResponse,
    type DealSearchContractorsResponse as DealSearchContractorsResponse,
    type DealSearchLendersResponse as DealSearchLendersResponse,
    type DealFindAbsenteeOwnersParams as DealFindAbsenteeOwnersParams,
    type DealFindEntityOwnedParcelsParams as DealFindEntityOwnedParcelsParams,
    type DealFindFlipsParams as DealFindFlipsParams,
    type DealFindHighLandRatioParams as DealFindHighLandRatioParams,
    type DealFindLongHoldParcelsParams as DealFindLongHoldParcelsParams,
    type DealFindPortfolioOwnersParams as DealFindPortfolioOwnersParams,
    type DealRetrieveMarketSummaryParams as DealRetrieveMarketSummaryParams,
    type DealSearchContractorsParams as DealSearchContractorsParams,
    type DealSearchLendersParams as DealSearchLendersParams,
  };
}
