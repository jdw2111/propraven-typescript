// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.
// One class per x-sdk-group; one method per operation (plus `<method>All` for paginated ones).

import type { APIPromise } from '../core/api-promise.js';
import { APIResource, type PageIterable } from '../core/client.js';
import type { PaginationOptions, RequestOptions } from '../core/types.js';
import * as ops from './operations.js';
import type {
  AccountUsageParams,
  AccountUsageResponse,
  CmbsExposureParams,
  CmbsExposureResponse,
  CohortsExportParams,
  CohortsExportResponse,
  CohortsListParams,
  CohortsListResponse,
  CoverageGetParams,
  CoverageGetResponse,
  CoverageMapParams,
  CoverageMapResponse,
  CreditsBalanceParams,
  CreditsBalanceResponse,
  CreditsTopupParams,
  CreditsTopupResponse,
  CrimeLookupParams,
  CrimeLookupResponse,
  DealsAbsenteeItem,
  DealsAbsenteeParams,
  DealsAbsenteeResponse,
  DealsContractorsItem,
  DealsContractorsParams,
  DealsContractorsResponse,
  DealsEntitiesItem,
  DealsEntitiesParams,
  DealsEntitiesResponse,
  DealsFlipsItem,
  DealsFlipsParams,
  DealsFlipsResponse,
  DealsHighLandRatioItem,
  DealsHighLandRatioParams,
  DealsHighLandRatioResponse,
  DealsLendersItem,
  DealsLendersParams,
  DealsLendersResponse,
  DealsLongHoldItem,
  DealsLongHoldParams,
  DealsLongHoldResponse,
  DealsMarketItem,
  DealsMarketParams,
  DealsMarketResponse,
  DealsPortfolioOwnersItem,
  DealsPortfolioOwnersParams,
  DealsPortfolioOwnersResponse,
  FreshnessDatasetsParams,
  FreshnessDatasetsResponse,
  FreshnessGetParams,
  FreshnessGetResponse,
  IntelligenceCreateScenarioParams,
  IntelligenceCreateScenarioResponse,
  IntelligenceHandoffParams,
  IntelligenceHandoffResponse,
  IntelligenceRunParams,
  IntelligenceRunResponse,
  IntelligenceSignalsParams,
  IntelligenceSignalsResponse,
  LeadsFindParams,
  LeadsFindResponse,
  LicenseesFirmsParams,
  LicenseesFirmsResponse,
  LookupBatchParams,
  LookupBatchResponse,
  LookupGetParams,
  LookupGetResponse,
  MarketCompareZillowMarketsParams,
  MarketCompareZillowMarketsResponse,
  MarketCountiesItem,
  MarketCountiesParams,
  MarketCountiesResponse,
  MarketCountyParams,
  MarketCountyResponse,
  MarketFlipsItem,
  MarketFlipsParams,
  MarketFlipsResponse,
  MarketSnapshotParams,
  MarketSnapshotResponse,
  MarketTrendsParams,
  MarketTrendsResponse,
  MarketZillowContextParams,
  MarketZillowContextResponse,
  MarketZillowTimeseriesParams,
  MarketZillowTimeseriesResponse,
  OwnersCardParams,
  OwnersCardResponse,
  OwnersGetParams,
  OwnersGetResponse,
  OwnersPortfolioParams,
  OwnersPortfolioResponse,
  OwnersPropertiesItem,
  OwnersPropertiesParams,
  OwnersPropertiesResponse,
  OwnersReportParams,
  OwnersReportResponse,
  OwnersSearchParams,
  OwnersSearchResponse,
  OwnersTransactionsParams,
  OwnersTransactionsResponse,
  ParcelsAssessmentHistoryParams,
  ParcelsAssessmentHistoryResponse,
  ParcelsBatchParams,
  ParcelsBatchResponse,
  ParcelsCompPackParams,
  ParcelsCompPackResponse,
  ParcelsCompsParams,
  ParcelsCompsResponse,
  ParcelsDeedsParams,
  ParcelsDeedsResponse,
  ParcelsGeojsonParams,
  ParcelsGeojsonResponse,
  ParcelsGetParams,
  ParcelsGetResponse,
  ParcelsOccupantsParams,
  ParcelsOccupantsResponse,
  ParcelsOwnerParams,
  ParcelsOwnerResponse,
  ParcelsPermitsParams,
  ParcelsPermitsResponse,
  ParcelsPoisParams,
  ParcelsPoisResponse,
  ParcelsReportParams,
  ParcelsReportResponse,
  ParcelsRiskScoreParams,
  ParcelsRiskScoreResponse,
  ParcelsRisksParams,
  ParcelsRisksResponse,
  ParcelsTaxStatusParams,
  ParcelsTaxStatusResponse,
  ParcelsTrafficHistoryParams,
  ParcelsTrafficHistoryResponse,
  ParcelsViolationsParams,
  ParcelsViolationsResponse,
  SearchAutocompleteParams,
  SearchAutocompleteResponse,
  SearchExportParams,
  SearchExportResponse,
  SearchFullItem,
  SearchFullParams,
  SearchFullResponse,
  SearchParcelsItem,
  SearchParcelsParams,
  SearchParcelsResponse,
  StorefrontAvailabilityParams,
  StorefrontAvailabilityResponse,
  StorefrontCatalogParams,
  StorefrontCatalogResponse,
  TrafficStationsParams,
  TrafficStationsResponse,
  VerifyBatchParams,
  VerifyBatchResponse,
  VerifyGetParams,
  VerifyGetResponse,
  WatchCreateParams,
  WatchCreateResponse,
  WatchDeleteParams,
  WatchDeleteResponse,
  WatchListParams,
  WatchListResponse,
  WatchPollParams,
  WatchPollResponse,
  WebhooksCreateParams,
  WebhooksCreateResponse,
  WebhooksDeleteParams,
  WebhooksDeleteResponse,
  WebhooksDeliveriesParams,
  WebhooksDeliveriesResponse,
  WebhooksGetParams,
  WebhooksGetResponse,
  WebhooksListParams,
  WebhooksListResponse,
  WebhooksRetryDeliveryParams,
  WebhooksRetryDeliveryResponse,
} from './types.js';

/** `client.account` */
export class AccountResource extends APIResource {
  /**
   * Current-period usage and quota
   *
   * Returns the calling key's current-period API usage, included allotment, remaining calls, configured per-minute and per-day rate limits, and the hard-cap status. Per-user (all of a user's API keys roll up to the same monthly counter, since they share a Stripe subscription).
   *
   * `GET /api/v1/account/usage`
   */
  usage(params: AccountUsageParams = {}, options?: RequestOptions): APIPromise<AccountUsageResponse> {
    return this._client._call<AccountUsageResponse>(ops.account_usage, [], params, options);
  }
}

/** `client.cmbs` */
export class CmbsResource extends APIResource {
  /**
   * CMBS loan exposure for a parcel or an owner
   *
   * Commercial mortgage-backed security loans tied to one parcel (`id`) or to a borrower/sponsor portfolio (`owner`). Pass exactly one.
   *
   * `GET /api/v1/cmbs/exposure`
   */
  exposure(params: CmbsExposureParams = {}, options?: RequestOptions): APIPromise<CmbsExposureResponse> {
    return this._client._call<CmbsExposureResponse>(ops.cmbs_exposure, [], params, options);
  }
}

/** `client.cohorts` */
export class CohortsResource extends APIResource {
  /**
   * Mail-merge export of one of your lists (account required; included for subscribers, per row otherwise)
   *
   * A mail-merge CSV of one of the caller's own lists: one row per MAILING ADDRESS (owner, mailing line1 / city / state / ZIP, the property address(es), their canonical ids, stage, source, as_of, as_of_basis, grade). Every address is read from ONE address column family of a parcel's record, with its ZIP; only mail-ready addresses become rows, and `X-Export-Parcels-Not-Mail-Ready` counts the rest.
   *
   * ACCOUNT REQUIRED: an API key or a signed-in session; anonymous callers -- including x402 / credit-token wallets -- get HTTP 401 `code: "account_required"` before any read. The list must be the caller's own (404 otherwise).
   *
   * PRICE: INCLUDED for a paid PropRaven subscription. Any other account pays $0.10 per mailing row, the quote capped at $20, from a prepaid credit balance (`X-CREDIT-TOKEN`) or per call via x402 (`X-PAYMENT`, sent with your credentials); with neither, HTTP 402 carrying the exact quote. `preview=true` returns the row count and the quote, free, with no data.
   *
   * Each export is recorded in PropRaven's people-data access log BEFORE the CSV is returned (and before an x402 payment settles). If the log cannot be written the export is refused (503) and any charge refunded or released.
   *
   * `GET /api/v1/cohorts/{id}/export`
   */
  export(id: string, params: CohortsExportParams = {}, options?: RequestOptions): APIPromise<CohortsExportResponse> {
    return this._client._call<CohortsExportResponse>(ops.cohorts_export, [id], params, options);
  }

  /**
   * List your saved parcel lists (cohorts)
   *
   * Cohorts are saved parcel lists built in the PropRaven app; export one with GET /cohorts/{id}/export.
   *
   * `GET /api/v1/cohorts`
   */
  list(params: CohortsListParams = {}, options?: RequestOptions): APIPromise<CohortsListResponse> {
    return this._client._call<CohortsListResponse>(ops.cohorts_list, [], params, options);
  }
}

/** `client.coverage` */
export class CoverageResource extends APIResource {
  /**
   * Get coverage statistics
   *
   * Retrieve parcel coverage statistics at the state or county level. API key optional: anonymous callers are rate-limited per IP; a present but invalid key is a 401; a valid key is rate-limited at its own tier and is not metered.
   *
   * `GET /api/v1/coverage`
   */
  get(params: CoverageGetParams = {}, options?: RequestOptions): APIPromise<CoverageGetResponse> {
    return this._client._call<CoverageGetResponse>(ops.coverage_get, [], params, options);
  }

  /**
   * County coverage map data
   *
   * Per-county parcel coverage for the national coverage map (compact keys). Free; IP-throttled on the restricted budget; cached for an hour.
   *
   * `GET /api/v1/coverage/map`
   */
  map(params: CoverageMapParams = {}, options?: RequestOptions): APIPromise<CoverageMapResponse> {
    return this._client._call<CoverageMapResponse>(ops.coverage_map, [], params, options);
  }
}

/** `client.credits` */
export class CreditsResource extends APIResource {
  /**
   * Read a prepaid credit balance + ledger
   *
   * Return the balance and recent ledger for the credit token in the X-CREDIT-TOKEN header. No payment; the token is the credential (never a query param).
   *
   * `GET /api/v1/storefront/credits/balance`
   */
  balance(params: CreditsBalanceParams, options?: RequestOptions): APIPromise<CreditsBalanceResponse> {
    return this._client._call<CreditsBalanceResponse>(ops.credits_balance, [], params, options);
  }

  /**
   * Fund a prepaid credit balance over x402
   *
   * Pay `amount` USDC once via x402 to fund a prepaid credit balance; receive a credit token (pzc_...) to spend on any paid endpoint via the X-CREDIT-TOKEN header — the recurring/volume rail, no account, no CDP/Stripe. GET with no payment returns a 402 for `amount`; present an existing X-CREDIT-TOKEN to top it up in place. Idempotent on the settlement tx.
   *
   * `GET /api/v1/storefront/credits/topup`
   */
  topup(params: CreditsTopupParams, options?: RequestOptions): APIPromise<CreditsTopupResponse> {
    return this._client._call<CreditsTopupResponse>(ops.credits_topup, [], params, options);
  }
}

/** `client.crime` */
export class CrimeResource extends APIResource {
  /**
   * Crime score near a point
   *
   * The crime score of the nearest scored parcel within about 500 m of the point, or `crime: null`. Free; IP-throttled.
   *
   * `GET /api/v1/crime/lookup`
   */
  lookup(params: CrimeLookupParams, options?: RequestOptions): APIPromise<CrimeLookupResponse> {
    return this._client._call<CrimeLookupResponse>(ops.crime_lookup, [], params, options);
  }
}

/** `client.deals` */
export class DealsResource extends APIResource {
  /**
   * Find absentee owners
   *
   * Retrieve parcels owned by absentee owners, useful for off-market deal sourcing.
   *
   * `GET /api/v1/deals/absentee`
   */
  absentee(params: DealsAbsenteeParams = {}, options?: RequestOptions): APIPromise<DealsAbsenteeResponse> {
    return this._client._call<DealsAbsenteeResponse>(ops.deals_absentee, [], params, options);
  }

  /**
   * Iterates every item of `absentee` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/absentee`
   */
  absenteeAll(params: DealsAbsenteeParams = {}, options?: PaginationOptions): PageIterable<DealsAbsenteeItem> {
    return this._client._paginate<DealsAbsenteeItem>(ops.deals_absentee, [], params, options);
  }

  /**
   * Search contractors by permit activity
   *
   * Returns contractor profiles aggregated from 45M+ building permits. Each profile includes permit count, jurisdictions worked, total declared permit value, and activity dates. Use to identify active contractors in a market or find a specific contractor by name.
   *
   * `GET /api/v1/deals/contractors`
   */
  contractors(params: DealsContractorsParams = {}, options?: RequestOptions): APIPromise<DealsContractorsResponse> {
    return this._client._call<DealsContractorsResponse>(ops.deals_contractors, [], params, options);
  }

  /**
   * Iterates every item of `contractors` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/contractors`
   */
  contractorsAll(params: DealsContractorsParams = {}, options?: PaginationOptions): PageIterable<DealsContractorsItem> {
    return this._client._paginate<DealsContractorsItem>(ops.deals_contractors, [], params, options);
  }

  /**
   * Find entity-owned parcels (LLC, Corp, Trust, LP)
   *
   * Returns parcels owned by legal entities identified from owner-name pattern matching across 221M+ parcels. Pass `top=true` to get aggregated entity rankings instead of per-parcel rows. One of `county_fips`, `state_fips`, `search`, or `top` is required.
   *
   * `GET /api/v1/deals/entities`
   */
  entities(params: DealsEntitiesParams = {}, options?: RequestOptions): APIPromise<DealsEntitiesResponse> {
    return this._client._call<DealsEntitiesResponse>(ops.deals_entities, [], params, options);
  }

  /**
   * Iterates every item of `entities` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/entities`
   */
  entitiesAll(params: DealsEntitiesParams = {}, options?: PaginationOptions): PageIterable<DealsEntitiesItem> {
    return this._client._paginate<DealsEntitiesItem>(ops.deals_entities, [], params, options);
  }

  /**
   * Find property flips
   *
   * Retrieve recently flipped properties. Use ?view=flippers to get a ranked list of top flippers instead.
   *
   * `GET /api/v1/deals/flips`
   */
  flips(params: DealsFlipsParams = {}, options?: RequestOptions): APIPromise<DealsFlipsResponse> {
    return this._client._call<DealsFlipsResponse>(ops.deals_flips, [], params, options);
  }

  /**
   * Iterates every item of `flips` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/flips`
   */
  flipsAll(params: DealsFlipsParams = {}, options?: PaginationOptions): PageIterable<DealsFlipsItem> {
    return this._client._paginate<DealsFlipsItem>(ops.deals_flips, [], params, options);
  }

  /**
   * Find parcels with high land-to-improvement ratio
   *
   * Returns parcels where land value significantly exceeds improvement value — a signal for redevelopment, teardown, or assemblage opportunities. `county_fips` or `state_fips` is required.
   *
   * `GET /api/v1/deals/high-land-ratio`
   */
  highLandRatio(params: DealsHighLandRatioParams = {}, options?: RequestOptions): APIPromise<DealsHighLandRatioResponse> {
    return this._client._call<DealsHighLandRatioResponse>(ops.deals_highLandRatio, [], params, options);
  }

  /**
   * Iterates every item of `highLandRatio` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/high-land-ratio`
   */
  highLandRatioAll(params: DealsHighLandRatioParams = {}, options?: PaginationOptions): PageIterable<DealsHighLandRatioItem> {
    return this._client._paginate<DealsHighLandRatioItem>(ops.deals_highLandRatio, [], params, options);
  }

  /**
   * Search lender profiles
   *
   * Returns lender profiles aggregated from deed/mortgage transactions. Includes mortgage count, total volume, geographic spread, and a national rank.
   *
   * `GET /api/v1/deals/lenders`
   */
  lenders(params: DealsLendersParams = {}, options?: RequestOptions): APIPromise<DealsLendersResponse> {
    return this._client._call<DealsLendersResponse>(ops.deals_lenders, [], params, options);
  }

  /**
   * Iterates every item of `lenders` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/lenders`
   */
  lendersAll(params: DealsLendersParams = {}, options?: PaginationOptions): PageIterable<DealsLendersItem> {
    return this._client._paginate<DealsLendersItem>(ops.deals_lenders, [], params, options);
  }

  /**
   * Find long-held parcels (10+ years)
   *
   * Returns parcels not sold in `min_years` or more. Long-hold owners are often motivated sellers — estate planning, deferred maintenance, life changes. `county_fips` or `state_fips` is required.
   *
   * `GET /api/v1/deals/long-hold`
   */
  longHold(params: DealsLongHoldParams = {}, options?: RequestOptions): APIPromise<DealsLongHoldResponse> {
    return this._client._call<DealsLongHoldResponse>(ops.deals_longHold, [], params, options);
  }

  /**
   * Iterates every item of `longHold` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/long-hold`
   */
  longHoldAll(params: DealsLongHoldParams = {}, options?: PaginationOptions): PageIterable<DealsLongHoldItem> {
    return this._client._paginate<DealsLongHoldItem>(ops.deals_longHold, [], params, options);
  }

  /**
   * County-quarter transaction summary or affordability index
   *
   * Default: returns county/quarter transaction summaries. Pass `view=affordability` to retrieve the home-affordability index instead (price-to-income ratios + rating).
   *
   * `GET /api/v1/deals/market`
   */
  market(params: DealsMarketParams = {}, options?: RequestOptions): APIPromise<DealsMarketResponse> {
    return this._client._call<DealsMarketResponse>(ops.deals_market, [], params, options);
  }

  /**
   * Iterates every item of `market` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/market`
   */
  marketAll(params: DealsMarketParams = {}, options?: PaginationOptions): PageIterable<DealsMarketItem> {
    return this._client._paginate<DealsMarketItem>(ops.deals_market, [], params, options);
  }

  /**
   * Find portfolio investors (owners of 2+ properties)
   *
   * Returns portfolio owners ranked by property count and total assessed value. Useful for finding institutional buyers, small landlords, or specific investor families.
   *
   * `GET /api/v1/deals/portfolio-owners`
   */
  portfolioOwners(params: DealsPortfolioOwnersParams = {}, options?: RequestOptions): APIPromise<DealsPortfolioOwnersResponse> {
    return this._client._call<DealsPortfolioOwnersResponse>(ops.deals_portfolioOwners, [], params, options);
  }

  /**
   * Iterates every item of `portfolioOwners` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/deals/portfolio-owners`
   */
  portfolioOwnersAll(params: DealsPortfolioOwnersParams = {}, options?: PaginationOptions): PageIterable<DealsPortfolioOwnersItem> {
    return this._client._paginate<DealsPortfolioOwnersItem>(ops.deals_portfolioOwners, [], params, options);
  }
}

/** `client.freshness` */
export class FreshnessResource extends APIResource {
  /**
   * Per-dataset availability and freshness
   *
   * `GET /api/v1/freshness/datasets`
   */
  datasets(params: FreshnessDatasetsParams = {}, options?: RequestOptions): APIPromise<FreshnessDatasetsResponse> {
    return this._client._call<FreshnessDatasetsResponse>(ops.freshness_datasets, [], params, options);
  }

  /**
   * How fresh the served parcel snapshot is
   *
   * Build and swap times of the served snapshot, plus a source-registry freshness proxy (`content_*`). Free; anonymous callers are IP-throttled.
   *
   * `GET /api/v1/freshness`
   */
  get(params: FreshnessGetParams = {}, options?: RequestOptions): APIPromise<FreshnessGetResponse> {
    return this._client._call<FreshnessGetResponse>(ops.freshness_get, [], params, options);
  }
}

/** `client.intelligence` */
export class IntelligenceResource extends APIResource {
  /**
   * Save an explicit named residual scenario
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. No query parameters are used by this operation; its inputs are the strict JSON body. This contract does not indicate source activation, deployment or an SDK release. Retained objects are scoped to the current account and their creator; no caller-supplied account/user grant is accepted. Current source rights are checked for every read/use, independently of archived grants. Creates an immutable base/downside/upside revision linked to an owned readable run. A parent revision must belong to the same run and creator. Formula uses fixed-dollar profit and purchase-independent carry; no live values/default costs are invented. Negative residuals remain explicit. The JSON object is strict, bounded to 16,384 bytes, and costs must contain each of the five buckets once.
   *
   * `POST /api/v1/intelligence/scenarios`
   */
  createScenario(params: IntelligenceCreateScenarioParams, options?: RequestOptions): APIPromise<IntelligenceCreateScenarioResponse> {
    return this._client._call<IntelligenceCreateScenarioResponse>(ops.intelligence_createScenario, [], params, options);
  }

  /**
   * Prepare an owned structured investigation handoff
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. Unknown and repeated query parameters are rejected. This contract does not indicate source activation, deployment or an SDK release. Retained objects are scoped to the current account and their creator; no caller-supplied account/user grant is accepted. Current source rights are checked for every read/use, independently of archived grants. Returns the same retained calculations, evidence and optional saved scenario, with observations separated from user assumptions. The scenario must belong to the same run/creator. Delivery is structured_only_not_sent; no agent/model is started.
   *
   * `GET /api/v1/intelligence/runs/{runId}/handoff`
   */
  handoff(runId: string, params: IntelligenceHandoffParams = {}, options?: RequestOptions): APIPromise<IntelligenceHandoffResponse> {
    return this._client._call<IntelligenceHandoffResponse>(ops.intelligence_handoff, [runId], params, options);
  }

  /**
   * Read an owned retained run and evidence
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. Unknown and repeated query parameters are rejected. This contract does not indicate source activation, deployment or an SDK release. Retained objects are scoped to the current account and their creator; no caller-supplied account/user grant is accepted. Current source rights are checked for every read/use, independently of archived grants. Withdrawn rights or changed source semantics may withhold a saved result; its immutable archived payload is not rewritten.
   *
   * `GET /api/v1/intelligence/runs/{runId}`
   */
  run(runId: string, params: IntelligenceRunParams = {}, options?: RequestOptions): APIPromise<IntelligenceRunResponse> {
    return this._client._call<IntelligenceRunResponse>(ops.intelligence_run, [runId], params, options);
  }

  /**
   * Get evidence-backed property signals
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. Unknown and repeated query parameters are rejected. This contract does not indicate source activation, deployment or an SDK release. Retained objects are scoped to the current account and their creator; no caller-supplied account/user grant is accepted. Current source rights are checked for every read/use, independently of archived grants. Assessment composition, where qualified, is not market value. Other groups remain explicitly unavailable without approved adapters. Exact values are numerator/denominator strings; historical runs exclude later-learned evidence.
   *
   * `GET /api/v1/parcels/{id}/signals`
   */
  signals(id: string, params: IntelligenceSignalsParams = {}, options?: RequestOptions): APIPromise<IntelligenceSignalsResponse> {
    return this._client._call<IntelligenceSignalsResponse>(ops.intelligence_signals, [id], params, options);
  }
}

/** `client.leads` */
export class LeadsResource extends APIResource {
  /**
   * Lead feed (paid, priced per lead) — with a FREE preview
   *
   * The Machine Storefront's lead feed: the qualified target list for one SIGNAL in one STATE, delivered as lead records and priced PER LEAD.
   *
   * Each lead carries its canonical_id (state:county:APN), owner, assessed value, that signal's own strength fields (years held, land/improvement ratio, flip profit, portfolio size, ...), a deterministic lead_score (1-100) and provenance {as_of, source}.
   *
   * PRICE: per_lead = clamp($0.25 x S(signal strength) x V(asset-value tier), $0.05, $1.00); total = min(count x per_lead, $20). You pay for the leads DELIVERED -- min(matching rows, limit) -- and an empty result is never charged for. The exact total is advertised in the 402's accepts[0].maxAmountRequired (USDC atomic units, 6 decimals).
   *
   * FREE PREVIEW: add preview=true for the exact count, the exact quote and up to three MASKED sample leads (APN truncated to state:county, house number stripped, owner name and every other people field withheld). No payment, no API key required; anonymous callers are IP-throttled at the free tier. The anonymous security alternative (`{}`) applies to the preview ONLY.
   *
   * ACCOUNT REQUIRED FOR DELIVERY: a lead is an owner's name and mailing address by area -- people data, delivered to PropRaven ACCOUNTS only. A paid (non-preview) pull must carry an API key (`Authorization: Bearer pz_...`), an MCP OAuth token or a signed-in session on EVERY rail. Payment alone (an x402 `X-PAYMENT` header or a prepaid `X-CREDIT-TOKEN`) is not an account: without one the call is refused with HTTP 401 `code: "account_required"`, `reason: "people_data_requires_account"`, before any payment is verified or any credit drawn.
   *
   * PAID ACCESS (preview omitted), for an account, requires ONE of: (a) x402 pay-per-call -- send a base64 signed x402 PaymentPayload in the `X-PAYMENT` header together with your credentials; on a successful build the leads are returned and the on-chain settlement receipt is in the `X-PAYMENT-RESPONSE` response header. (b) A prepaid `X-CREDIT-TOKEN` balance. (c) A genuine PAID PropRaven subscription entitlement (lead feeds are included). Being merely authenticated is NOT sufficient. (d) Anything else -> HTTP 402 whose `accepts` array carries the exact payment requirements for this pull.
   *
   * OWNER CONTACT: each delivered lead carries `owner_contact` -- the owner's best mailing address, read from ONE address column family of the record with its ZIP, flagged mail_ready. `mail_ready=true` narrows the pull to parcels whose record carries a complete one-family mailing address (parcel-grain signals only). Each delivery is recorded in PropRaven's people-data access log before it is returned; if the log is unavailable the delivery is refused (503) and nothing is charged.
   *
   * BOUNDED READS: every read carries a statement timeout (10 s with `mail_ready`, 25 s otherwise). A pull too broad to finish returns 503 `code: "lead_read_timeout"` telling you to narrow it (add `county`); nothing is charged.
   *
   * NOTE on `distressed`: an assessment-derived cohort (a structure on the books assessed at a nominal value, on land that carries real value). It is NOT a pre-foreclosure, tax-lien or lis-pendens feed.
   *
   * `GET /api/v1/leads/find`
   */
  find(params: LeadsFindParams, options?: RequestOptions): APIPromise<LeadsFindResponse> {
    return this._client._call<LeadsFindResponse>(ops.leads_find, [], params, options);
  }
}

/** `client.licensees` */
export class LicenseesResource extends APIResource {
  /**
   * Search licensed firms in a place
   *
   * Firms licensed by the issuing state boards (FL DBPR and DFS, CA DRE and the Board of Accountancy, NY DOS, CT DCP, VA DPOR) in one city or zip, grouped by name and by the issuer's parent-license link, with their distinct street locations. `min_locations=3` finds firms with at least three licensed locations there. Requires an account; a person-shaped firm is people data and each response serving one is logged. 503 `licensee_layer_unavailable` until the layer is loaded.
   *
   * `GET /api/v1/licensees/firms`
   */
  firms(params: LicenseesFirmsParams, options?: RequestOptions): APIPromise<LicenseesFirmsResponse> {
    return this._client._call<LicenseesFirmsResponse>(ops.licensees_firms, [], params, options);
  }
}

/** `client.lookup` */
export class LookupResource extends APIResource {
  /**
   * Resolve up to 500 parcel queries in one call
   *
   * Each query resolves independently (UUID → APN → address), so a partial batch degrades row by row. Answered from the search index: fields listed in `unavailable_fields` are null on every row of this endpoint. Each matched row is one lookup against your plan.
   *
   * `POST /api/v1/lookup/batch`
   */
  batch(params: LookupBatchParams, options?: RequestOptions): APIPromise<LookupBatchResponse> {
    return this._client._call<LookupBatchResponse>(ops.lookup_batch, [], params, options);
  }

  /**
   * Exact parcel lookup (UUID or APN)
   *
   * Resolve one parcel from an exact key: a PropRaven parcel UUID or an APN. Answered from the search index (the `parcel` fields are a subset of GET /parcels/{id}). Anonymous callers are IP-throttled on the restricted budget (100/day); fuzzy address input needs a key and is answered by POST /lookup/batch.
   *
   * `GET /api/v1/lookup`
   */
  get(params: LookupGetParams, options?: RequestOptions): APIPromise<LookupGetResponse> {
    return this._client._call<LookupGetResponse>(ops.lookup_get, [], params, options);
  }
}

/** `client.market` */
export class MarketResource extends APIResource {
  /**
   * Compare explicit provider regions at one common period
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. Unknown and repeated query parameters are rejected. This contract does not indicate source activation, deployment or an SDK release. Use-specific, unexpired reviewed Zillow rights are checked before parcel resolution or repository/cache access. Denied/unknown rights return explicit unavailable metric values, not substitute data. Each metric exposes actual regional geography/variant and freshness; regional values do not become parcel estimates or residual inputs. Up to five distinct region IDs use one dataset/accepted snapshot and common month. First ID is the reference. Value gaps retain a missing reason; incompatible regions are not converted to comparable parcel data. Alternatively provide parcel_id, metric and period (optional window_months) instead of dataset_key and region_ids. Property geography is resolved only by the server. County/metro/national comparisons require compatible metric definitions, units and variants, one requested month and an explicit captured acceptance cutoff. Each dataset retains its own snapshot provenance. Missing mappings, permissions and variants remain unavailable; mixed query forms are rejected.
   *
   * `GET /api/v1/market/zillow/compare`
   */
  compareZillowMarkets(params: MarketCompareZillowMarketsParams, options?: RequestOptions): APIPromise<MarketCompareZillowMarketsResponse> {
    return this._client._call<MarketCompareZillowMarketsResponse>(ops.market_compareZillowMarkets, [], params, options);
  }

  /**
   * Get county market statistics
   *
   * Retrieve real estate market statistics aggregated at the county level, including sale counts, median prices, and year-over-year changes. API key optional (county aggregates, no person-level fields): anonymous callers are rate-limited per IP at the free tier; a present but invalid key is a 401; keyed calls are metered.
   *
   * `GET /api/v1/market/counties`
   */
  counties(params: MarketCountiesParams = {}, options?: RequestOptions): APIPromise<MarketCountiesResponse> {
    return this._client._call<MarketCountiesResponse>(ops.market_counties, [], params, options);
  }

  /**
   * Iterates every item of `counties` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/market/counties`
   */
  countiesAll(params: MarketCountiesParams = {}, options?: PaginationOptions): PageIterable<MarketCountiesItem> {
    return this._client._paginate<MarketCountiesItem>(ops.market_counties, [], params, options);
  }

  /**
   * Detailed view for a single county
   *
   * Returns the full county profile: quarterly market stats (sale count, median price, YoY change, days on market), affordability index by year, parcel summary (count, avg assessed value), and flip activity. Use for county-detail dashboards.
   *
   * `GET /api/v1/market/counties/{fips}`
   */
  county(fips: string, params: MarketCountyParams = {}, options?: RequestOptions): APIPromise<MarketCountyResponse> {
    return this._client._call<MarketCountyResponse>(ops.market_county, [fips], params, options);
  }

  /**
   * Flip-activity summary grouped by county
   *
   * Aggregated flip activity per county: count, average ROI, average hold days, total profit. Use for surfacing the hottest flip markets. Differs from /api/v1/deals/flips which returns the underlying transactions. Requires an API key (or a signed-in session); metered.
   *
   * `GET /api/v1/market/flips`
   */
  flips(params: MarketFlipsParams = {}, options?: RequestOptions): APIPromise<MarketFlipsResponse> {
    return this._client._call<MarketFlipsResponse>(ops.market_flips, [], params, options);
  }

  /**
   * Iterates every item of `flips` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/market/flips`
   */
  flipsAll(params: MarketFlipsParams = {}, options?: PaginationOptions): PageIterable<MarketFlipsItem> {
    return this._client._paginate<MarketFlipsItem>(ops.market_flips, [], params, options);
  }

  /**
   * Market snapshot for a geography
   *
   * Demographics, economy, housing, lending, hazard and market context for exactly one geography: a county, census tract, CBSA or ZIP.
   *
   * `GET /api/v1/market/snapshot`
   */
  snapshot(params: MarketSnapshotParams = {}, options?: RequestOptions): APIPromise<MarketSnapshotResponse> {
    return this._client._call<MarketSnapshotResponse>(ops.market_snapshot, [], params, options);
  }

  /**
   * Get market trends
   *
   * Retrieve quarterly time series of market metrics for one or more counties or a state. Requires an API key (or a signed-in session); metered.
   *
   * `GET /api/v1/market/trends`
   */
  trends(params: MarketTrendsParams = {}, options?: RequestOptions): APIPromise<MarketTrendsResponse> {
    return this._client._call<MarketTrendsResponse>(ops.market_trends, [], params, options);
  }

  /**
   * Get qualified regional Zillow context for a property
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. Unknown and repeated query parameters are rejected. This contract does not indicate source activation, deployment or an SDK release. Use-specific, unexpired reviewed Zillow rights are checked before parcel resolution or repository/cache access. Denied/unknown rights return explicit unavailable metric values, not substitute data. Each metric exposes actual regional geography/variant and freshness; regional values do not become parcel estimates or residual inputs. Only the trusted served parcel supplies ZIP/county/state. Caller-supplied geography/CBSA is rejected; there is no inferred metro match. canonical_id is omitted when rights prevent parcel lookup.
   *
   * `GET /api/v1/market/zillow/context`
   */
  zillowContext(params: MarketZillowContextParams, options?: RequestOptions): APIPromise<MarketZillowContextResponse> {
    return this._client._call<MarketZillowContextResponse>(ops.market_zillowContext, [], params, options);
  }

  /**
   * Get one provider region monthly series
   *
   * Requires API-key or first-party session authentication and a current account in the default-off server cohort. Valid current membership does not require a new paid subscription. Existing API quotas still apply. Responses are private, no-store. Unknown and repeated query parameters are rejected. This contract does not indicate source activation, deployment or an SDK release. Use-specific, unexpired reviewed Zillow rights are checked before parcel resolution or repository/cache access. Denied/unknown rights return explicit unavailable metric values, not substitute data. Each metric exposes actual regional geography/variant and freshness; regional values do not become parcel estimates or residual inputs. Provider region IDs are not FIPS/CBSA codes. Explicit selection remains regional, not a property mapping. Range is ordered and limited to600 monthly periods.
   *
   * `GET /api/v1/market/zillow/timeseries`
   */
  zillowTimeseries(params: MarketZillowTimeseriesParams, options?: RequestOptions): APIPromise<MarketZillowTimeseriesResponse> {
    return this._client._call<MarketZillowTimeseriesResponse>(ops.market_zillowTimeseries, [], params, options);
  }
}

/** `client.owners` */
export class OwnersResource extends APIResource {
  /**
   * Owner card -- the owner of record and their mailing contact (account required)
   *
   * The owner of record and how to reach them BY MAIL, for one parcel (`parcel_id`) or one owner name (`name`, the exact owner-of-record spelling). Returns the co-owners the same assessor record names (`co_owners`, `co_owner_status`: listed / none_listed / not_checked) and the best mailing address -- read from ONE address column family of the record, with its ZIP, flagged mail_ready / po_box / equals_situs, graded A-D with its source and as-of date (`as_of_basis`: roll_year = the record's tax year; release_vintage = the PropRaven parcel release that served a record with no roll year, never presented as the county's date; recording_date = a deed; null when there is no date) -- plus, for an owner name, the owner's distinct mailing addresses across up to 50 of their parcels (`parcels_citing`). `phones` are OWNER phones only: a building permit filed in the current owner's era published the phone for the owner role (the field name, the publisher, or a role column on the permit says so) and names the current owner; otherwise `phone_status` says none_published, or not_checked when the lookup could not run. `people_on_permits` separately lists applicant and contractor phones from the parcel's permits (role, name, permit, date, and `era`: filed in the current owner's era or before it); they are never the owner's phone, and a phone whose role the source does not state is never served. Every phone is E.164 with its extension split off and the published value kept verbatim (`phone_raw`). Grade-D (contradictory) addresses are hidden unless include_low_confidence=true.
   *
   * ACCOUNT REQUIRED: an API key, an MCP OAuth token or a signed-in session. Anonymous callers -- including x402 / credit-token wallets -- get HTTP 401 `code: "account_required"` before any read.
   *
   * LOOKUP CAP: on an account without a paid plan each card counts as ONE lookup against the monthly lookup cap, spent before any read (a card that is not served is refunded). At the cap: HTTP 402 `code: "lookup_cap_reached"` with used / limit / plan and the upgrade link. Each served card is recorded in PropRaven's people-data access log.
   *
   * `GET /api/v1/owners/card`
   */
  card(params: OwnersCardParams = {}, options?: RequestOptions): APIPromise<OwnersCardResponse> {
    return this._client._call<OwnersCardResponse>(ops.owners_card, [], params, options);
  }

  /**
   * Get owner profile
   *
   * Retrieve a specific owner profile by name, including property count, total assessed value, entity type, and states.
   *
   * `GET /api/v1/owners/{name}`
   */
  get(name: string, params: OwnersGetParams = {}, options?: RequestOptions): APIPromise<OwnersGetResponse> {
    return this._client._call<OwnersGetResponse>(ops.owners_get, [name], params, options);
  }

  /**
   * Get owner portfolio summary
   *
   * Retrieve an owner's portfolio with aggregated summary statistics and property breakdown.
   *
   * `GET /api/v1/owners/{name}/portfolio`
   */
  portfolio(name: string, params: OwnersPortfolioParams = {}, options?: RequestOptions): APIPromise<OwnersPortfolioResponse> {
    return this._client._call<OwnersPortfolioResponse>(ops.owners_portfolio, [name], params, options);
  }

  /**
   * Get owner's properties
   *
   * Retrieve the list of properties owned by a specific owner.
   *
   * `GET /api/v1/owners/{name}/properties`
   */
  properties(name: string, params: OwnersPropertiesParams = {}, options?: RequestOptions): APIPromise<OwnersPropertiesResponse> {
    return this._client._call<OwnersPropertiesResponse>(ops.owners_properties, [name], params, options);
  }

  /**
   * Iterates every item of `properties` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/owners/{name}/properties`
   */
  propertiesAll(name: string, params: OwnersPropertiesParams = {}, options?: PaginationOptions): PageIterable<OwnersPropertiesItem> {
    return this._client._paginate<OwnersPropertiesItem>(ops.owners_properties, [name], params, options);
  }

  /**
   * Owner intelligence report (paid, priced per resolution; account required) — with a free preview
   *
   * The Machine Storefront's owner intelligence report: every parcel nationwide whose OWNER-OF-RECORD name matches one owner NAME's realistic spellings (or a public company TICKER's hand-curated entity list), deduped nationally and priced PER RESOLUTION.
   *
   * ACCOUNT REQUIRED (every mode, including the free preview): an API key (`Authorization: Bearer pz_...`) or a signed-in session. Payment alone (an x402 `X-PAYMENT` header or a prepaid `X-CREDIT-TOKEN`) is not an account. An anonymous call is refused with HTTP 401, `code: "account_required"`, `reason: "owner_lookup_requires_account"`, before any read, payment verification or credit debit.
   *
   * MATCHING is spelling matching, NOT a verified corporate or beneficial-ownership link: different owners can share a spelling and some of one owner's spellings can be missed. Every property carries `match_basis` (exact_spelling = the record's owner name is the requested name after case/punctuation/whitespace normalization; variant = matched only through an expanded suffix/hyphen/N.A. spelling; ticker_curated = on the hand-curated ticker list) and `match_confidence: "candidate"`. The report carries: owner {query_name, ticker, entity_type, resolved_variants, match}, summary {count, total_assessed_value, total_acreage, states, by_state[]}, properties[] (each with match_basis, canonical_id, address, valuation, lot/building, last sale, property_type), and provenance {as_of, source}.
   *
   * PRICE: per resolution = clamp($1.75 x P(portfolio size) x V(portfolio value), $0.25, $20). P is log-scaled on the distinct parcel count the match uncovers (the dominant axis); V is log-scaled on the summed assessed value; a missing value floors V rather than raising the price. A match that uncovers zero parcels is returned free and never charged. The exact price is advertised in the 402's accepts[0].maxAmountRequired (USDC atomic units, 6 decimals).
   *
   * FREE PREVIEW: add preview=true for the summary (count, total value, states spanned, entity type), the exact price, and up to three MASKED sample properties (APN truncated to state:county, house number stripped). No payment; an account is still required.
   *
   * PAID ACCESS (preview omitted), for an authenticated account, requires ONE of: (a) x402 pay-per-call — send a base64 signed x402 PaymentPayload in the `X-PAYMENT` header alongside your credentials; on a successful build the full portfolio is returned and the on-chain settlement receipt is in the `X-PAYMENT-RESPONSE` response header. (b) A prepaid `X-CREDIT-TOKEN` balance. (c) A genuine PAID PropRaven subscription entitlement (owner reports are included). Being merely authenticated is NOT sufficient. (d) Anything else -> HTTP 402 whose `accepts` array carries the exact payment requirements for this resolution.
   *
   * `GET /api/v1/owners/{name}/report`
   */
  report(name: string, params: OwnersReportParams = {}, options?: RequestOptions): APIPromise<OwnersReportResponse> {
    return this._client._call<OwnersReportResponse>(ops.owners_report, [name], params, options);
  }

  /**
   * Search property owners
   *
   * Search for property owners by name. Returns owner profiles with property counts and portfolio values.
   *
   * `GET /api/v1/owners/search`
   */
  search(params: OwnersSearchParams, options?: RequestOptions): APIPromise<OwnersSearchResponse> {
    return this._client._call<OwnersSearchResponse>(ops.owners_search, [], params, options);
  }

  /**
   * Recorded deed transactions for an owner
   *
   * Returns up to 100 most-recent deed events where the named owner is either grantor or grantee. Useful for building an owner's transaction timeline across their portfolio.
   *
   * `GET /api/v1/owners/{name}/transactions`
   */
  transactions(name: string, params: OwnersTransactionsParams = {}, options?: RequestOptions): APIPromise<OwnersTransactionsResponse> {
    return this._client._call<OwnersTransactionsResponse>(ops.owners_transactions, [name], params, options);
  }
}

/** `client.parcels` */
export class ParcelsResource extends APIResource {
  /**
   * Get recorded annual assessment history
   *
   * Returns source-backed historical assessment observations from published county history. Uses exact national parcel identity. Never substitutes the current parcel snapshot. Unknown assessment years remain null; vintage years and tax years are distinct. Missing years are not interpolated. County coverage can be partial by town and year. Unpublished coverage and failed reads return 503, not an empty history. Requires normal API or first-party session authentication.
   *
   * `GET /api/v1/parcels/{id}/assessment-history`
   */
  assessmentHistory(id: string, params: ParcelsAssessmentHistoryParams = {}, options?: RequestOptions): APIPromise<ParcelsAssessmentHistoryResponse> {
    return this._client._call<ParcelsAssessmentHistoryResponse>(ops.parcels_assessmentHistory, [id], params, options);
  }

  /**
   * Fetch up to 100 parcels by (state, county, parcel) tuple
   *
   * Card-projection rows for up to 100 unique `(state_fips, county_fips, parcel_id)` tuples. `county_fips` is the 3-digit within-state code (a 5-digit value is refused with a 400 naming the fix). Tuples with no match are listed in `missing`.
   *
   * `POST /api/v1/parcels/batch`
   */
  batch(params: ParcelsBatchParams, options?: RequestOptions): APIPromise<ParcelsBatchResponse> {
    return this._client._call<ParcelsBatchResponse>(ops.parcels_batch, [], params, options);
  }

  /**
   * Comp pack (paid, priced per pack) — with a FREE preview
   *
   * The Machine Storefront's comp pack: a subject valuation INDICATED BY comparable sales, wrapped with the comps that prove it. Answers the underwriting question "what is this worth, and which sales prove it?".
   *
   * The comps are the SAME precomputed comparable_sales the free GET /api/v1/parcels/{id}/comps route serves; the subject's valuation fields come from parcels_serving. The indicated value is derived transparently (median comp $/sqft x subject sqft when both are known, else the median comp sale price) with an interquartile range, and is reconstructable from the comps in the same payload -- never a black-box AVM.
   *
   * PRICE: per pack = clamp($2 x V(subject value) x Q(comp support), $1, $20). Q ramps on the comp count with a small bonus for high median similarity. A subject with ZERO precomputed comps has no evidence to support a number and is returned free, never charged. The exact price is advertised in the 402's accepts[0].maxAmountRequired (USDC atomic units, 6 decimals).
   *
   * FREE PREVIEW: add preview=true for the subject summary, the comp count + median similarity, the exact price, and up to three MASKED comps (parcel/APN withheld, sale price rounded, date to the year). The precise indicated value and the unmasked comps are the paid product.
   *
   * PAID ACCESS (preview omitted) requires ONE of: (a) x402 pay-per-call via a base64 signed x402 PaymentPayload in the `X-PAYMENT` header (receipt in `X-PAYMENT-RESPONSE`); (b) a genuine PAID PropRaven subscription entitlement; (c) anything else -> HTTP 402 whose `accepts` carries the exact requirements.
   *
   * `GET /api/v1/parcels/{id}/comp-pack`
   */
  compPack(id: string, params: ParcelsCompPackParams = {}, options?: RequestOptions): APIPromise<ParcelsCompPackResponse> {
    return this._client._call<ParcelsCompPackResponse>(ops.parcels_compPack, [id], params, options);
  }

  /**
   * Comparable sales for a parcel
   *
   * Precomputed comparable sales near the parcel (`tier` names the comp source).
   *
   * `GET /api/v1/parcels/{id}/comps`
   */
  comps(id: string, params: ParcelsCompsParams = {}, options?: RequestOptions): APIPromise<ParcelsCompsResponse> {
    return this._client._call<ParcelsCompsResponse>(ops.parcels_comps, [id], params, options);
  }

  /**
   * Get parcel deed history
   *
   * Retrieve deed transactions and transfer history for a parcel.
   *
   * `GET /api/v1/parcels/{id}/deeds`
   */
  deeds(id: string, params: ParcelsDeedsParams = {}, options?: RequestOptions): APIPromise<ParcelsDeedsResponse> {
    return this._client._call<ParcelsDeedsResponse>(ops.parcels_deeds, [id], params, options);
  }

  /**
   * Parcel polygons as GeoJSON for a bounding box
   *
   * Returns parcel polygons inside a bounding box as a GeoJSON FeatureCollection. Only served at zoom ≥ 14 to limit data volume — coarser bbox returns an empty collection. Each feature's properties include parcel_id, county_fips, owner_name, assessed value, and basic attributes for rendering popups.
   *
   * `GET /api/v1/parcels/geojson`
   */
  geojson(params: ParcelsGeojsonParams, options?: RequestOptions): APIPromise<ParcelsGeojsonResponse> {
    return this._client._call<ParcelsGeojsonResponse>(ops.parcels_geojson, [], params, options);
  }

  /**
   * Get parcel by ID
   *
   * Retrieve a single parcel by its composite ID (county_fips:parcel_id).
   *
   * `GET /api/v1/parcels/{id}`
   */
  get(id: string, params: ParcelsGetParams = {}, options?: RequestOptions): APIPromise<ParcelsGetResponse> {
    return this._client._call<ParcelsGetResponse>(ops.parcels_get, [id], params, options);
  }

  /**
   * Business occupants of a parcel
   *
   * Businesses matched to the parcel (names, brands, categories, match confidence), primary occupant first. At most 100 rows; `truncated` says when more exist. For an account, `licensees` adds the licensed businesses the state licensing boards place at the parcel (firms, or individuals at a publisher-labelled business address; match confidence >= 0.80; never a residential parcel).
   *
   * `GET /api/v1/parcels/{id}/occupants`
   */
  occupants(id: string, params: ParcelsOccupantsParams = {}, options?: RequestOptions): APIPromise<ParcelsOccupantsResponse> {
    return this._client._call<ParcelsOccupantsResponse>(ops.parcels_occupants, [id], params, options);
  }

  /**
   * Get parcel owner details and portfolio
   *
   * Retrieve the owner of a parcel along with their portfolio summary and list of properties.
   *
   * `GET /api/v1/parcels/{id}/owner`
   */
  owner(id: string, params: ParcelsOwnerParams = {}, options?: RequestOptions): APIPromise<ParcelsOwnerResponse> {
    return this._client._call<ParcelsOwnerResponse>(ops.parcels_owner, [id], params, options);
  }

  /**
   * Get parcel permits
   *
   * Retrieve building and construction permits associated with a parcel.
   *
   * `GET /api/v1/parcels/{id}/permits`
   */
  permits(id: string, params: ParcelsPermitsParams = {}, options?: RequestOptions): APIPromise<ParcelsPermitsResponse> {
    return this._client._call<ParcelsPermitsResponse>(ops.parcels_permits, [id], params, options);
  }

  /**
   * Business parcels in a small bounding box
   *
   * Up to 250 parcels with a recorded business type inside `bbox`, highest assessed value first. Boxes larger than 0.03 square degrees return an empty list.
   *
   * `GET /api/v1/parcels/poi`
   */
  pois(params: ParcelsPoisParams, options?: RequestOptions): APIPromise<ParcelsPoisResponse> {
    return this._client._call<ParcelsPoisResponse>(ops.parcels_pois, [], params, options);
  }

  /**
   * Parcel dossier (paid, provenance-first)
   *
   * The Machine Storefront's per-parcel dossier: a single provenance-first JSON payload carrying every POPULATED field for the parcel as `{name, value}` (by default: no `sections`/`fields` params delivers everything the quote was priced on), plus the real deeds / comparable-sales / permits sub-tables. The per-field receipts (source, as_of, confidence, coverage tier) are opt-in: `?include_provenance=true` adds a `provenance` map keyed by field name. `?sections=` (identity, valuation, owner, hazard, permits, deeds, market, demographics, `core`, `all`) and `?fields=` narrow the delivered field list; anything narrowed out is NAMED in `meta.projection.omitted_fields`, and the price never changes with the projection. A ~50 KB soft cap applies to the `fields` portion only. The GeoJSON boundary is held out as a separately-priced add-on the base payload omits.
   *
   * PRICE (value-tiered, per parcel): price = clamp($5 x V(asset value) x R(data richness) x F(freshness), $2, $20). The exact amount for a given parcel is quoted, before payment, by GET /api/v1/storefront/availability?parcel_id=... and is what the 402 advertises in accepts[0].maxAmountRequired (USDC atomic units, 6 decimals).
   *
   * ACCESS requires ONE of: (a) x402 pay-per-call -- send a base64 signed x402 PaymentPayload in the `X-PAYMENT` header; on a successful build the dossier is returned and the on-chain settlement receipt is in the `X-PAYMENT-RESPONSE` response header. No account is needed for the parcel record, but PEOPLE DATA (owner names, owner mailing addresses, entity principals, deed and sale party names and addresses) is delivered to accounts only: a wallet-only or credit-token buyer receives the dossier with those fields set to null and a top-level `people_fields` marker (see PeopleFieldsWithheld), and the price is computed on exactly that body, so it never counts a field the buyer does not receive. Send your API key with the payment to receive them. (b) A genuine PAID PropRaven subscription entitlement -- the dossier is served on the subscription invoice. Being merely authenticated is NOT sufficient: a free-tier key, or a self-service first-party key with no paid plan, receives a 402. (c) Anything else -> HTTP 402 whose `accepts` array carries the exact x402 payment requirements for this parcel.
   *
   * `GET /api/v1/parcels/{id}/report`
   */
  report(id: string, params: ParcelsReportParams = {}, options?: RequestOptions): APIPromise<ParcelsReportResponse> {
    return this._client._call<ParcelsReportResponse>(ops.parcels_report, [id], params, options);
  }

  /**
   * Get parcel risk assessment
   *
   * Retrieve flood, wildfire, air quality, and crime risk data for a parcel.
   *
   * `GET /api/v1/parcels/{id}/risks`
   */
  risks(id: string, params: ParcelsRisksParams = {}, options?: RequestOptions): APIPromise<ParcelsRisksResponse> {
    return this._client._call<ParcelsRisksResponse>(ops.parcels_risks, [id], params, options);
  }

  /**
   * Risk score (paid, priced per assessment) — with a FREE preview
   *
   * The Machine Storefront's risk score: a multi-hazard risk assessment for one parcel, anchored on FEMA's National Risk Index COMPOSITE (nri_risk_score 0-100 + rating) with the flood / seismic / windstorm / wildfire / air-quality / crime breakdown that supports it. Answers "what could go wrong with this asset?". The headline is FEMA's own methodology, not an invented weighting.
   *
   * Reuses the SAME panel the free GET /api/v1/parcels/{id}/risks route serves (getParcelRisksData) plus the NRI composite + flood detail from parcels_serving.
   *
   * PRICE: per assessment = clamp($0.60 x V(asset value) x C(hazard coverage), $0.20, $20). C ramps on how many independent hazard layers resolved. A parcel with ZERO layers is returned free, never charged. The cheapest paid SKU. The exact price is in the 402's accepts[0].maxAmountRequired (USDC atomic units).
   *
   * FREE PREVIEW: add preview=true for the subject, WHICH hazard layers resolved, and the exact price. The precise NRI score and the hazard breakdown are the paid product.
   *
   * PAID ACCESS: (a) x402 via a base64 signed PaymentPayload in `X-PAYMENT` (receipt in `X-PAYMENT-RESPONSE`); (b) a genuine PAID subscription entitlement; (c) else HTTP 402 with the exact requirements.
   *
   * `GET /api/v1/parcels/{id}/risk-score`
   */
  riskScore(id: string, params: ParcelsRiskScoreParams = {}, options?: RequestOptions): APIPromise<ParcelsRiskScoreResponse> {
    return this._client._call<ParcelsRiskScoreResponse>(ops.parcels_riskScore, [id], params, options);
  }

  /**
   * Property-tax delinquency status of a parcel
   *
   * Whether the parcel is on a treasurer's or tax collector's published property-tax delinquency, lien-sale or tax-sale list (pilot jurisdictions), with each record's status, amount (and what the amount is), tax years, sale, publisher, dates and the list's scope. ACCOUNT REQUIRED (people data, gated like the owner card): a caller with no account gets 401 `code: account_required` and nothing else. A response that serves records counts as one lookup against the account's monthly cap (included on paid plans) and is written to the people-data access log; at the cap the records are withheld with `people_fields.code: lookup_cap_reached` (nothing charged). Before the layer's first load `status` is `unavailable`.
   *
   * `GET /api/v1/parcels/{id}/tax-status`
   */
  taxStatus(id: string, params: ParcelsTaxStatusParams = {}, options?: RequestOptions): APIPromise<ParcelsTaxStatusResponse> {
    return this._client._call<ParcelsTaxStatusResponse>(ops.parcels_taxStatus, [id], params, options);
  }

  /**
   * Nearest traffic station + AADT history
   *
   * Finds the AADT (annual average daily traffic) station nearest to the given coordinates and returns its historical time series plus 3/5/7-year CAGRs. Useful for retail / CRE site selection. Search radius ~2 miles; returns empty data if no station is in range.
   *
   * `GET /api/v1/parcels/{id}/traffic-history`
   */
  trafficHistory(id: string, params: ParcelsTrafficHistoryParams, options?: RequestOptions): APIPromise<ParcelsTrafficHistoryResponse> {
    return this._client._call<ParcelsTrafficHistoryResponse>(ops.parcels_trafficHistory, [id], params, options);
  }

  /**
   * Code violations on a parcel
   *
   * Municipal code-enforcement cases matched to the parcel, with the source coverage that says whether an empty list means 'none recorded' or 'not collected here'.
   *
   * `GET /api/v1/parcels/{id}/violations`
   */
  violations(id: string, params: ParcelsViolationsParams = {}, options?: RequestOptions): APIPromise<ParcelsViolationsResponse> {
    return this._client._call<ParcelsViolationsResponse>(ops.parcels_violations, [id], params, options);
  }
}

/** `client.search` */
export class SearchResource extends APIResource {
  /**
   * Address / place / parcel autocomplete
   *
   * Fast prefix-matched autocomplete: returns cities/places, matching parcels, and Mapbox-geocoded addresses for the prefix. Three independent tiers run in parallel with per-tier timeouts so a slow DB query never blocks fast Mapbox results. Use for type-ahead UIs and address entry; for full-detail lookup use parcel lookup.
   *
   * `GET /api/v1/search/autocomplete`
   */
  autocomplete(params: SearchAutocompleteParams, options?: RequestOptions): APIPromise<SearchAutocompleteResponse> {
    return this._client._call<SearchAutocompleteResponse>(ops.search_autocomplete, [], params, options);
  }

  /**
   * Export search results as CSV
   *
   * Returns up to 10,000 search-matched parcels as a CSV download. Accepts the same geographic + attribute filters as POST /api/v1/search. Designed for spreadsheet / Excel workflows; for programmatic ingestion, use the JSON search endpoint and paginate.
   *
   * `GET /api/v1/search/export`
   */
  export(params: SearchExportParams = {}, options?: RequestOptions): APIPromise<SearchExportResponse> {
    return this._client._call<SearchExportResponse>(ops.search_export, [], params, options);
  }

  /**
   * Full paginated text + attribute search
   *
   * Paginated search across the parcel search index by free-text query (`q`) and optional field/state/city filters. Distinct from POST /api/v1/search which is geo-bounded; this endpoint is text-anchored and works without a bounding box. Returns 50/page by default, 200 max.
   *
   * `GET /api/v1/search/full`
   */
  full(params: SearchFullParams, options?: RequestOptions): APIPromise<SearchFullResponse> {
    return this._client._call<SearchFullResponse>(ops.search_full, [], params, options);
  }

  /**
   * Iterates every item of `full` by following `nextCursor` via `after` (results[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `GET /api/v1/search/full`
   */
  fullAll(params: SearchFullParams, options?: PaginationOptions): PageIterable<SearchFullItem> {
    return this._client._paginate<SearchFullItem>(ops.search_full, [], params, options);
  }

  /**
   * Search parcels
   *
   * Search parcels with optional geographic bounds and attribute filters. `bounds` and `filters` are both optional (`filters` defaults to `{}`); the body is validated and any bad member is a 400 naming it. `sort` applies to UNBOUNDED queries only: with `bounds`, rows come back in spatial-index order and the response says `sort_applied: false`. `total` is the exact number of matching parcels up to 10,000; beyond that it is 10,000 with `total_is_lower_bound: true`, and it is null if the count timed out (`total_status: "timed_out"`). Traffic-count columns are withheld until verified: they are returned as null with a `withhold_gate` block, and filters on them (minVpd, maxVpd, minVisibilityScore) are refused with 400 `filter_withheld`.
   *
   * `POST /api/v1/search`
   */
  parcels(params: SearchParcelsParams = {}, options?: RequestOptions): APIPromise<SearchParcelsResponse> {
    return this._client._call<SearchParcelsResponse>(ops.search_parcels, [], params, options);
  }

  /**
   * Iterates every item of `parcels` by advancing `offset` (data[]).
   *
   * Use `options.pageSize` / `options.maxItems` to bound it.
   * `POST /api/v1/search`
   */
  parcelsAll(params: SearchParcelsParams = {}, options?: PaginationOptions): PageIterable<SearchParcelsItem> {
    return this._client._paginate<SearchParcelsItem>(ops.search_parcels, [], params, options);
  }
}

/** `client.storefront` */
export class StorefrontResource extends APIResource {
  /**
   * Machine Storefront -- try-before-buy (jurisdiction coverage or per-parcel quote)
   *
   * Try-before-buy at two scopes, both FREE and answered from the sealed catalog:
   *
   * JURISDICTION mode (pass ?state=, optional &county=): how complete each field is in that state/county side-by-side with the national average, plus the worst local gaps and the base dossier quote. No parcel scan.
   *
   * PARCEL mode (pass ?parcel_id=): the exact value-tiered dossier price for ONE parcel BEFORE paying, with the V/R/F multiplier breakdown, band, and the cheap signals it was derived from. This uses the SAME quote math as the x402 402 on /parcels/{id}/report, so the previewed price equals the amount the payer is charged. Does one light, indexed single-parcel read.
   *
   * Provide EITHER parcel_id OR state. Same access model as the catalog: authenticated callers unmetered/uncapped, anonymous callers served and IP-throttled.
   *
   * `GET /api/v1/storefront/availability`
   */
  availability(params: StorefrontAvailabilityParams = {}, options?: RequestOptions): APIPromise<StorefrontAvailabilityResponse> {
    return this._client._call<StorefrontAvailabilityResponse>(ops.storefront_availability, [], params, options);
  }

  /**
   * Machine Storefront — sealed field catalog
   *
   * The data catalog IS the storefront: every column of the serving parcel relation with its measured national (and optional per-state) coverage, grain, tier, honesty flags, and pipeline freshness warts, plus the dossier pricing model and base quote (the per-parcel value-tiered price comes from /storefront/availability?parcel_id=). FREE -- authenticated callers are unmetered and uncapped (rate-limited at the scale window); anonymous callers are served and IP-throttled at the free tier. Answered from a committed, sealed artifact -- no database access.
   *
   * `GET /api/v1/storefront/catalog`
   */
  catalog(params: StorefrontCatalogParams = {}, options?: RequestOptions): APIPromise<StorefrontCatalogResponse> {
    return this._client._call<StorefrontCatalogResponse>(ops.storefront_catalog, [], params, options);
  }
}

/** `client.traffic` */
export class TrafficResource extends APIResource {
  /**
   * Traffic count stations in a bounding box
   *
   * Up to 150 traffic count stations (AADT) inside `bbox`, busiest first.
   *
   * `GET /api/v1/traffic/stations`
   */
  stations(params: TrafficStationsParams, options?: RequestOptions): APIPromise<TrafficStationsResponse> {
    return this._client._call<TrafficStationsResponse>(ops.traffic_stations, [], params, options);
  }
}

/** `client.verify` */
export class VerifyResource extends APIResource {
  /**
   * Verify facts (batch, paid per lookup) - FREE preview
   *
   * Verify catalogued FACTS: one (parcel, field) assertion per lookup, batch (POST body { lookups: [{ parcel_id, fields }] }, up to 1000 parcels) or single (GET ?parcel_id&fields). Priced per lookup, bulk-discounted ($0.02/$0.012/$0.006), capped $20. Pay from a prepaid credit balance (X-CREDIT-TOKEN) or per call via x402. preview=true returns count+price free; empty/all-invalid is free. Fields whitelisted (is_sfha, flood_zone, nri_risk_score, owner_occupied, is_absentee, owner_name, assessed_value, market_value, building_sqft, year_built, property_type, zoning, lot_size_acres, last_sale_date/price, address/city/state/zip); unknown parcel -> found:false. `owner_name` is people data: verifying it requires an account (API key or signed-in session). A caller without one -- anonymous, wallet-only x402 or credit token -- that asks for owner_name is refused with HTTP 401 `code: "account_required"` before the quote or any payment; every other field is unaffected.
   *
   * `POST /api/v1/verify`
   */
  batch(params: VerifyBatchParams, options?: RequestOptions): APIPromise<VerifyBatchResponse> {
    return this._client._call<VerifyBatchResponse>(ops.verify_batch, [], params, options);
  }

  /**
   * Verify facts for one parcel
   *
   * Verify catalogued FACTS: one (parcel, field) assertion per lookup, batch (POST body { lookups: [{ parcel_id, fields }] }, up to 1000 parcels) or single (GET ?parcel_id&fields). Priced per lookup, bulk-discounted ($0.02/$0.012/$0.006), capped $20. Pay from a prepaid credit balance (X-CREDIT-TOKEN) or per call via x402. preview=true returns count+price free; empty/all-invalid is free. Fields whitelisted (is_sfha, flood_zone, nri_risk_score, owner_occupied, is_absentee, owner_name, assessed_value, market_value, building_sqft, year_built, property_type, zoning, lot_size_acres, last_sale_date/price, address/city/state/zip); unknown parcel -> found:false. `owner_name` is people data: verifying it requires an account (API key or signed-in session). A caller without one -- anonymous, wallet-only x402 or credit token -- that asks for owner_name is refused with HTTP 401 `code: "account_required"` before the quote or any payment; every other field is unaffected.
   *
   * `GET /api/v1/verify`
   */
  get(params: VerifyGetParams, options?: RequestOptions): APIPromise<VerifyGetResponse> {
    return this._client._call<VerifyGetResponse>(ops.verify_get, [], params, options);
  }
}

/** `client.watch` */
export class WatchResource extends APIResource {
  /**
   * Create a watch (free)
   *
   * Create a watch tied to your credit token: a filter over parcels/geography + change event types. It reports changes going FORWARD; poll it to receive (and pay per delta for) new changes. Managing watches is free. Body: { filter, event_types?, name? } where filter is { parcel_ids:[...] } | { canonical_ids:[...] } | { state_fips } | { county_fips, state_fips } and event_types is a subset of parcel.sold / parcel.owner_changed / parcel.permit_filed (default all). Parcel ids (1–500) are canonical `state_fips:county_fips:parcel_id` ids, parcel UUIDs, or bare parcel_ids that name exactly ONE served parcel; a bare id that names several parcels is refused (422, candidates listed). The watch is stored and matched on canonical ids; `parcel_resolution` reports how each input resolved.
   *
   * `POST /api/v1/watch`
   */
  create(params: WatchCreateParams, options?: RequestOptions): APIPromise<WatchCreateResponse> {
    return this._client._call<WatchCreateResponse>(ops.watch_create, [], params, options);
  }

  /**
   * Delete a watch
   *
   * Deactivate a watch. Free.
   *
   * `DELETE /api/v1/watch/{id}`
   */
  delete(id: string, params: WatchDeleteParams, options?: RequestOptions): APIPromise<WatchDeleteResponse> {
    return this._client._call<WatchDeleteResponse>(ops.watch_delete, [id], params, options);
  }

  /**
   * List your watches
   *
   * List active watches for the X-CREDIT-TOKEN. Free.
   *
   * `GET /api/v1/watch`
   */
  list(params: WatchListParams, options?: RequestOptions): APIPromise<WatchListResponse> {
    return this._client._call<WatchListResponse>(ops.watch_list, [], params, options);
  }

  /**
   * Poll a watch for new changes (priced per delta)
   *
   * Poll new parcel_deeds / parcel_permits changes matching the watch since its per-source cursor. preview=true returns the pending count + exact price + a masked sample (FREE, no cursor move). A paid poll debits the credit balance PER DELTA (clamp($0.05 x event-strength, $0.02, $0.20), capped $20/poll), advances the cursor, and returns the full deltas. A poll with no new changes is free. Insufficient balance -> 402. Parcel watches match on the full parcel identity; each delta carries `canonical_id` + `match_basis`. A watch created before 2026-09-22 whose stored bare ids are ambiguous reports them in `identity_issues` (not matched) on every poll. Deed parties (grantor / grantee names and addresses, prior / new owner) are people data, delivered to accounts only: a poll paid with a credit token and no account (no API key, no signed-in session) receives the deltas with those fields set to null and a top-level `people_fields` marker (see PeopleFieldsWithheld). The events themselves (what changed, where, when, for how much) are unchanged.
   *
   * `GET /api/v1/watch/{id}`
   */
  poll(id: string, params: WatchPollParams, options?: RequestOptions): APIPromise<WatchPollResponse> {
    return this._client._call<WatchPollResponse>(ops.watch_poll, [id], params, options);
  }
}

/** `client.webhooks` */
export class WebhooksResource extends APIResource {
  /**
   * Create a webhook endpoint
   *
   * Creates a new webhook subscription. The returned `secret` is shown ONCE — store it server-side and use it to verify every incoming delivery via the `X-PropRaven-Signature` header (HMAC-SHA256 over `<unix_ms>.<raw_body>`). Reject deliveries where `|now - t| > 5min`.
   *
   * `POST /api/v1/webhooks`
   */
  create(params: WebhooksCreateParams, options?: RequestOptions): APIPromise<WebhooksCreateResponse> {
    return this._client._call<WebhooksCreateResponse>(ops.webhooks_create, [], params, options);
  }

  /**
   * Soft-disable a webhook endpoint
   *
   * Marks the endpoint inactive. Delivery history is preserved. The endpoint can no longer receive new events but past deliveries remain queryable via the deliveries route.
   *
   * `DELETE /api/v1/webhooks/{id}`
   */
  delete(id: string, params: WebhooksDeleteParams = {}, options?: RequestOptions): APIPromise<WebhooksDeleteResponse> {
    return this._client._call<WebhooksDeleteResponse>(ops.webhooks_delete, [id], params, options);
  }

  /**
   * Recent delivery attempts for a webhook
   *
   * Returns the last 100 delivery attempts for an endpoint — useful for debugging signature mismatches, retry visibility, and dead-letter inspection.
   *
   * `GET /api/v1/webhooks/{id}/deliveries`
   */
  deliveries(id: string, params: WebhooksDeliveriesParams = {}, options?: RequestOptions): APIPromise<WebhooksDeliveriesResponse> {
    return this._client._call<WebhooksDeliveriesResponse>(ops.webhooks_deliveries, [id], params, options);
  }

  /**
   * Get a single webhook endpoint
   *
   * Returns the full endpoint record (without the secret).
   *
   * `GET /api/v1/webhooks/{id}`
   */
  get(id: string, params: WebhooksGetParams = {}, options?: RequestOptions): APIPromise<WebhooksGetResponse> {
    return this._client._call<WebhooksGetResponse>(ops.webhooks_get, [id], params, options);
  }

  /**
   * List webhook endpoints
   *
   * Returns all webhook endpoints for the calling account, plus the per-tier quota.
   *
   * `GET /api/v1/webhooks`
   */
  list(params: WebhooksListParams = {}, options?: RequestOptions): APIPromise<WebhooksListResponse> {
    return this._client._call<WebhooksListResponse>(ops.webhooks_list, [], params, options);
  }

  /**
   * Re-queue a failed webhook delivery
   *
   * Moves a `pending`, `failed` or `dead_lettered` delivery back to `pending` for immediate redelivery. A delivered one is a 409.
   *
   * `POST /api/v1/webhooks/{id}/deliveries/{deliveryId}/retry`
   */
  retryDelivery(id: string, deliveryId: string, params: WebhooksRetryDeliveryParams = {}, options?: RequestOptions): APIPromise<WebhooksRetryDeliveryResponse> {
    return this._client._call<WebhooksRetryDeliveryResponse>(ops.webhooks_retryDelivery, [id, deliveryId], params, options);
  }
}
