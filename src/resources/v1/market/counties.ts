// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as DealsAPI from '../deals';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * County-level market statistics and trends.
 */
export class Counties extends APIResource {
  /**
   * Returns the full county profile: quarterly market stats (sale count, median
   * price, YoY change, days on market), affordability index by year, parcel summary
   * (count, avg assessed value), and flip activity. Use for county-detail
   * dashboards.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.market.counties.retrieveDetail('21029');
   * ```
   */
  retrieveDetail(fips: string, options?: RequestOptions): APIPromise<CountyRetrieveDetailResponse> {
    return this._client.get(path`/api/v1/market/counties/${fips}`, options);
  }

  /**
   * Retrieve real estate market statistics aggregated at the county level, including
   * sale counts, median prices, and year-over-year changes.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.market.counties.retrieveStatistics();
   * ```
   */
  retrieveStatistics(
    query: CountyRetrieveStatisticsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CountyRetrieveStatisticsResponse> {
    return this._client.get('/api/v1/market/counties', { query, ...options });
  }
}

export interface CountyRetrieveDetailResponse {
  affordability?: Array<DealsAPI.AffordabilityRow>;

  flip_summary?: CountyRetrieveDetailResponse.FlipSummary;

  market_stats?: Array<CountyRetrieveDetailResponse.MarketStat>;

  parcel_summary?: CountyRetrieveDetailResponse.ParcelSummary;
}

export namespace CountyRetrieveDetailResponse {
  export interface FlipSummary {
    avg_hold_days?: number | null;

    avg_roi?: number | null;

    flip_count?: number;

    total_profit?: number | null;
  }

  export interface MarketStat {
    /**
     * Average days on market.
     */
    avg_dom?: number | null;

    avg_sale_price?: number | null;

    county_fips?: string;

    median_sale_price?: number | null;

    price_yoy_pct?: number | null;

    quarter?: string;

    sale_count?: number;

    state_fips?: string;

    total_volume?: number | null;
  }

  export interface ParcelSummary {
    avg_assessed_value?: number | null;

    parcel_count?: number;
  }
}

export interface CountyRetrieveStatisticsResponse {
  data?: Array<CountyRetrieveStatisticsResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace CountyRetrieveStatisticsResponse {
  export interface Data {
    avg_days_on_market?: number;

    avg_price?: number;

    county_fips?: string;

    county_name?: string;

    median_price?: number;

    quarter?: string;

    sale_count?: number;

    state_abbr?: string;

    state_fips?: string;

    /**
     * Year-over-year median price change as a decimal (e.g., 0.05 = 5%).
     */
    yoy_change?: number;
  }
}

export interface CountyRetrieveStatisticsParams {
  limit?: number;

  /**
   * Minimum number of sales in the period to include a county.
   */
  min_sales?: number;

  offset?: number;

  order?: 'asc' | 'desc';

  /**
   * Specific quarter to retrieve (e.g., 2025Q4). Defaults to latest available.
   */
  quarter?: string;

  /**
   * Sort field.
   */
  sort?: 'sale_count' | 'median_price' | 'yoy_change' | 'county_name';

  /**
   * Filter by state FIPS code.
   */
  state_fips?: string;
}

export declare namespace Counties {
  export {
    type CountyRetrieveDetailResponse as CountyRetrieveDetailResponse,
    type CountyRetrieveStatisticsResponse as CountyRetrieveStatisticsResponse,
    type CountyRetrieveStatisticsParams as CountyRetrieveStatisticsParams,
  };
}
