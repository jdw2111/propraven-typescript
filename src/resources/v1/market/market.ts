// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CountiesAPI from './counties';
import {
  Counties,
  CountyRetrieveDetailResponse,
  CountyRetrieveStatisticsParams,
  CountyRetrieveStatisticsResponse,
} from './counties';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * County-level market statistics and trends.
 */
export class Market extends APIResource {
  counties: CountiesAPI.Counties = new CountiesAPI.Counties(this._client);

  /**
   * Aggregated flip activity per county: count, average ROI, average hold days,
   * total profit. Use for surfacing the hottest flip markets. Differs from
   * /api/v1/deals/flips which returns the underlying transactions.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.market.retrieveFlipActivity();
   * ```
   */
  retrieveFlipActivity(
    query: MarketRetrieveFlipActivityParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MarketRetrieveFlipActivityResponse> {
    return this._client.get('/api/v1/market/flips', { query, ...options });
  }

  /**
   * Retrieve quarterly time series of market metrics for one or more counties or a
   * state.
   *
   * @example
   * ```ts
   * const response = await client.v1.market.retrieveTrends();
   * ```
   */
  retrieveTrends(
    query: MarketRetrieveTrendsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MarketRetrieveTrendsResponse> {
    return this._client.get('/api/v1/market/trends', { query, ...options });
  }
}

export interface MarketRetrieveFlipActivityResponse {
  data?: Array<MarketRetrieveFlipActivityResponse.Data>;

  limit?: number;

  offset?: number;

  total?: number;
}

export namespace MarketRetrieveFlipActivityResponse {
  export interface Data {
    avg_hold_days?: number | null;

    /**
     * Average profit percentage (e.g. 0.18 = 18%).
     */
    avg_roi?: number | null;

    county_fips?: string;

    flip_count?: number;

    total_profit?: number | null;
  }
}

export interface MarketRetrieveTrendsResponse {
  data?: Array<MarketRetrieveTrendsResponse.Data>;
}

export namespace MarketRetrieveTrendsResponse {
  export interface Data {
    county_fips?: string;

    county_name?: string;

    quarters?: Array<Data.Quarter>;
  }

  export namespace Data {
    export interface Quarter {
      avg_price?: number;

      median_price?: number;

      quarter?: string;

      sale_count?: number;

      yoy_change?: number;
    }
  }
}

export interface MarketRetrieveFlipActivityParams {
  /**
   * Page size, max 500.
   */
  limit?: number;

  /**
   * Pagination offset.
   */
  offset?: number;

  /**
   * 2-digit state FIPS filter.
   */
  state_fips?: string;
}

export interface MarketRetrieveTrendsParams {
  /**
   * Comma-separated list of county FIPS codes.
   */
  county_fips?: string;

  /**
   * State FIPS code. Used if county_fips is not provided.
   */
  state_fips?: string;
}

Market.Counties = Counties;

export declare namespace Market {
  export {
    type MarketRetrieveFlipActivityResponse as MarketRetrieveFlipActivityResponse,
    type MarketRetrieveTrendsResponse as MarketRetrieveTrendsResponse,
    type MarketRetrieveFlipActivityParams as MarketRetrieveFlipActivityParams,
    type MarketRetrieveTrendsParams as MarketRetrieveTrendsParams,
  };

  export {
    Counties as Counties,
    type CountyRetrieveDetailResponse as CountyRetrieveDetailResponse,
    type CountyRetrieveStatisticsResponse as CountyRetrieveStatisticsResponse,
    type CountyRetrieveStatisticsParams as CountyRetrieveStatisticsParams,
  };
}
