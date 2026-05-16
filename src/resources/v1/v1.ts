// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountAPI from './account';
import { Account, AccountRetrieveUsageResponse } from './account';
import * as DealsAPI from './deals';
import {
  AffordabilityRow,
  DealFindAbsenteeOwnersParams,
  DealFindAbsenteeOwnersResponse,
  DealFindEntityOwnedParcelsParams,
  DealFindEntityOwnedParcelsResponse,
  DealFindFlipsParams,
  DealFindFlipsResponse,
  DealFindHighLandRatioParams,
  DealFindHighLandRatioResponse,
  DealFindLongHoldParcelsParams,
  DealFindLongHoldParcelsResponse,
  DealFindPortfolioOwnersParams,
  DealFindPortfolioOwnersResponse,
  DealRetrieveMarketSummaryParams,
  DealRetrieveMarketSummaryResponse,
  DealSearchContractorsParams,
  DealSearchContractorsResponse,
  DealSearchLendersParams,
  DealSearchLendersResponse,
  Deals,
} from './deals';
import * as OwnersAPI from './owners';
import {
  Owner,
  OwnerRetrievePortfolioSummaryResponse,
  OwnerRetrievePropertiesParams,
  OwnerRetrievePropertiesResponse,
  OwnerRetrieveTransactionsResponse,
  OwnerSearchOwnersParams,
  OwnerSearchOwnersResponse,
  Owners,
} from './owners';
import * as ParcelsAPI from './parcels';
import {
  Deed,
  Parcel,
  ParcelRetrieveDeedsResponse,
  ParcelRetrieveGeojsonParams,
  ParcelRetrieveGeojsonResponse,
  ParcelRetrieveOwnerResponse,
  ParcelRetrievePermitsResponse,
  ParcelRetrieveReportParams,
  ParcelRetrieveReportResponse,
  ParcelRetrieveTrafficHistoryParams,
  ParcelRetrieveTrafficHistoryResponse,
  Parcels,
  Permit,
  RiskAssessment,
} from './parcels';
import * as SearchAPI from './search';
import {
  Search,
  SearchAutocompleteParams,
  SearchAutocompleteResponse,
  SearchExportResultsParams,
  SearchExportResultsResponse,
  SearchFullSearchParams,
  SearchFullSearchResponse,
  SearchParcelSearchParams,
  SearchParcelSearchResponse,
} from './search';
import * as WebhooksAPI from './webhooks';
import {
  Webhook,
  WebhookCreateEndpointParams,
  WebhookCreateEndpointResponse,
  WebhookDisableEndpointResponse,
  WebhookFilter,
  WebhookListEndpointsResponse,
  WebhookRetrieveDeliveriesResponse,
  Webhooks,
} from './webhooks';
import * as MarketAPI from './market/market';
import {
  Market,
  MarketRetrieveFlipActivityParams,
  MarketRetrieveFlipActivityResponse,
  MarketRetrieveTrendsParams,
  MarketRetrieveTrendsResponse,
} from './market/market';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Data coverage statistics.
 */
export class V1 extends APIResource {
  parcels: ParcelsAPI.Parcels = new ParcelsAPI.Parcels(this._client);
  search: SearchAPI.Search = new SearchAPI.Search(this._client);
  deals: DealsAPI.Deals = new DealsAPI.Deals(this._client);
  market: MarketAPI.Market = new MarketAPI.Market(this._client);
  owners: OwnersAPI.Owners = new OwnersAPI.Owners(this._client);
  webhooks: WebhooksAPI.Webhooks = new WebhooksAPI.Webhooks(this._client);
  account: AccountAPI.Account = new AccountAPI.Account(this._client);

  /**
   * Retrieve parcel coverage statistics at the state or county level.
   *
   * @example
   * ```ts
   * const response = await client.v1.retrieveCoverage();
   * ```
   */
  retrieveCoverage(
    query: V1RetrieveCoverageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<V1RetrieveCoverageResponse> {
    return this._client.get('/api/v1/coverage', { query, ...options });
  }
}

export interface V1RetrieveCoverageResponse {
  data?: Array<V1RetrieveCoverageResponse.Data>;

  states_covered?: number;

  total_parcels?: number;
}

export namespace V1RetrieveCoverageResponse {
  export interface Data {
    county_fips?: string | null;

    county_name?: string | null;

    geocoded_pct?: number;

    owner_pct?: number;

    parcel_count?: number;

    state_fips?: string;

    state_name?: string;

    value_pct?: number;
  }
}

export interface V1RetrieveCoverageParams {
  /**
   * State FIPS code or abbreviation to filter coverage to a specific state and
   * return county-level breakdown.
   */
  state?: string;
}

V1.Parcels = Parcels;
V1.Search = Search;
V1.Deals = Deals;
V1.Market = Market;
V1.Owners = Owners;
V1.Webhooks = Webhooks;
V1.Account = Account;

export declare namespace V1 {
  export {
    type V1RetrieveCoverageResponse as V1RetrieveCoverageResponse,
    type V1RetrieveCoverageParams as V1RetrieveCoverageParams,
  };

  export {
    Parcels as Parcels,
    type Deed as Deed,
    type Parcel as Parcel,
    type Permit as Permit,
    type RiskAssessment as RiskAssessment,
    type ParcelRetrieveDeedsResponse as ParcelRetrieveDeedsResponse,
    type ParcelRetrieveGeojsonResponse as ParcelRetrieveGeojsonResponse,
    type ParcelRetrieveOwnerResponse as ParcelRetrieveOwnerResponse,
    type ParcelRetrievePermitsResponse as ParcelRetrievePermitsResponse,
    type ParcelRetrieveReportResponse as ParcelRetrieveReportResponse,
    type ParcelRetrieveTrafficHistoryResponse as ParcelRetrieveTrafficHistoryResponse,
    type ParcelRetrieveGeojsonParams as ParcelRetrieveGeojsonParams,
    type ParcelRetrieveReportParams as ParcelRetrieveReportParams,
    type ParcelRetrieveTrafficHistoryParams as ParcelRetrieveTrafficHistoryParams,
  };

  export {
    Search as Search,
    type SearchAutocompleteResponse as SearchAutocompleteResponse,
    type SearchExportResultsResponse as SearchExportResultsResponse,
    type SearchFullSearchResponse as SearchFullSearchResponse,
    type SearchParcelSearchResponse as SearchParcelSearchResponse,
    type SearchAutocompleteParams as SearchAutocompleteParams,
    type SearchExportResultsParams as SearchExportResultsParams,
    type SearchFullSearchParams as SearchFullSearchParams,
    type SearchParcelSearchParams as SearchParcelSearchParams,
  };

  export {
    Deals as Deals,
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

  export {
    Market as Market,
    type MarketRetrieveFlipActivityResponse as MarketRetrieveFlipActivityResponse,
    type MarketRetrieveTrendsResponse as MarketRetrieveTrendsResponse,
    type MarketRetrieveFlipActivityParams as MarketRetrieveFlipActivityParams,
    type MarketRetrieveTrendsParams as MarketRetrieveTrendsParams,
  };

  export {
    Owners as Owners,
    type Owner as Owner,
    type OwnerRetrievePortfolioSummaryResponse as OwnerRetrievePortfolioSummaryResponse,
    type OwnerRetrievePropertiesResponse as OwnerRetrievePropertiesResponse,
    type OwnerRetrieveTransactionsResponse as OwnerRetrieveTransactionsResponse,
    type OwnerSearchOwnersResponse as OwnerSearchOwnersResponse,
    type OwnerRetrievePropertiesParams as OwnerRetrievePropertiesParams,
    type OwnerSearchOwnersParams as OwnerSearchOwnersParams,
  };

  export {
    Webhooks as Webhooks,
    type Webhook as Webhook,
    type WebhookFilter as WebhookFilter,
    type WebhookCreateEndpointResponse as WebhookCreateEndpointResponse,
    type WebhookDisableEndpointResponse as WebhookDisableEndpointResponse,
    type WebhookListEndpointsResponse as WebhookListEndpointsResponse,
    type WebhookRetrieveDeliveriesResponse as WebhookRetrieveDeliveriesResponse,
    type WebhookCreateEndpointParams as WebhookCreateEndpointParams,
  };

  export { Account as Account, type AccountRetrieveUsageResponse as AccountRetrieveUsageResponse };
}
