# V1

Types:

- <code><a href="./src/resources/v1/v1.ts">V1RetrieveCoverageResponse</a></code>

Methods:

- <code title="get /api/v1/coverage">client.v1.<a href="./src/resources/v1/v1.ts">retrieveCoverage</a>({ ...params }) -> V1RetrieveCoverageResponse</code>

## Parcels

Types:

- <code><a href="./src/resources/v1/parcels.ts">Deed</a></code>
- <code><a href="./src/resources/v1/parcels.ts">Parcel</a></code>
- <code><a href="./src/resources/v1/parcels.ts">Permit</a></code>
- <code><a href="./src/resources/v1/parcels.ts">RiskAssessment</a></code>
- <code><a href="./src/resources/v1/parcels.ts">ParcelRetrieveDeedsResponse</a></code>
- <code><a href="./src/resources/v1/parcels.ts">ParcelRetrieveGeojsonResponse</a></code>
- <code><a href="./src/resources/v1/parcels.ts">ParcelRetrieveOwnerResponse</a></code>
- <code><a href="./src/resources/v1/parcels.ts">ParcelRetrievePermitsResponse</a></code>
- <code><a href="./src/resources/v1/parcels.ts">ParcelRetrieveReportResponse</a></code>
- <code><a href="./src/resources/v1/parcels.ts">ParcelRetrieveTrafficHistoryResponse</a></code>

Methods:

- <code title="get /api/v1/parcels/{id}">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieve</a>(id) -> Parcel</code>
- <code title="get /api/v1/parcels/{id}/deeds">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieveDeeds</a>(id) -> ParcelRetrieveDeedsResponse</code>
- <code title="get /api/v1/parcels/geojson">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieveGeojson</a>({ ...params }) -> ParcelRetrieveGeojsonResponse</code>
- <code title="get /api/v1/parcels/{id}/owner">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieveOwner</a>(id) -> ParcelRetrieveOwnerResponse</code>
- <code title="get /api/v1/parcels/{id}/permits">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrievePermits</a>(id) -> ParcelRetrievePermitsResponse</code>
- <code title="get /api/v1/parcels/{id}/report">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieveReport</a>(id, { ...params }) -> ParcelRetrieveReportResponse</code>
- <code title="get /api/v1/parcels/{id}/risks">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieveRisks</a>(id) -> RiskAssessment</code>
- <code title="get /api/v1/parcels/{id}/traffic-history">client.v1.parcels.<a href="./src/resources/v1/parcels.ts">retrieveTrafficHistory</a>(id, { ...params }) -> ParcelRetrieveTrafficHistoryResponse</code>

## Search

Types:

- <code><a href="./src/resources/v1/search.ts">SearchAutocompleteResponse</a></code>
- <code><a href="./src/resources/v1/search.ts">SearchExportResultsResponse</a></code>
- <code><a href="./src/resources/v1/search.ts">SearchFullSearchResponse</a></code>
- <code><a href="./src/resources/v1/search.ts">SearchParcelSearchResponse</a></code>

Methods:

- <code title="get /api/v1/search/autocomplete">client.v1.search.<a href="./src/resources/v1/search.ts">autocomplete</a>({ ...params }) -> SearchAutocompleteResponse</code>
- <code title="get /api/v1/search/export">client.v1.search.<a href="./src/resources/v1/search.ts">exportResults</a>({ ...params }) -> string</code>
- <code title="get /api/v1/search/full">client.v1.search.<a href="./src/resources/v1/search.ts">fullSearch</a>({ ...params }) -> SearchFullSearchResponse</code>
- <code title="post /api/v1/search">client.v1.search.<a href="./src/resources/v1/search.ts">parcelSearch</a>({ ...params }) -> SearchParcelSearchResponse</code>

## Deals

Types:

- <code><a href="./src/resources/v1/deals.ts">AffordabilityRow</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealFindAbsenteeOwnersResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealFindEntityOwnedParcelsResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealFindFlipsResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealFindHighLandRatioResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealFindLongHoldParcelsResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealFindPortfolioOwnersResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealRetrieveMarketSummaryResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealSearchContractorsResponse</a></code>
- <code><a href="./src/resources/v1/deals.ts">DealSearchLendersResponse</a></code>

Methods:

- <code title="get /api/v1/deals/absentee">client.v1.deals.<a href="./src/resources/v1/deals.ts">findAbsenteeOwners</a>({ ...params }) -> DealFindAbsenteeOwnersResponse</code>
- <code title="get /api/v1/deals/entities">client.v1.deals.<a href="./src/resources/v1/deals.ts">findEntityOwnedParcels</a>({ ...params }) -> DealFindEntityOwnedParcelsResponse</code>
- <code title="get /api/v1/deals/flips">client.v1.deals.<a href="./src/resources/v1/deals.ts">findFlips</a>({ ...params }) -> DealFindFlipsResponse</code>
- <code title="get /api/v1/deals/high-land-ratio">client.v1.deals.<a href="./src/resources/v1/deals.ts">findHighLandRatio</a>({ ...params }) -> DealFindHighLandRatioResponse</code>
- <code title="get /api/v1/deals/long-hold">client.v1.deals.<a href="./src/resources/v1/deals.ts">findLongHoldParcels</a>({ ...params }) -> DealFindLongHoldParcelsResponse</code>
- <code title="get /api/v1/deals/portfolio-owners">client.v1.deals.<a href="./src/resources/v1/deals.ts">findPortfolioOwners</a>({ ...params }) -> DealFindPortfolioOwnersResponse</code>
- <code title="get /api/v1/deals/market">client.v1.deals.<a href="./src/resources/v1/deals.ts">retrieveMarketSummary</a>({ ...params }) -> DealRetrieveMarketSummaryResponse</code>
- <code title="get /api/v1/deals/contractors">client.v1.deals.<a href="./src/resources/v1/deals.ts">searchContractors</a>({ ...params }) -> DealSearchContractorsResponse</code>
- <code title="get /api/v1/deals/lenders">client.v1.deals.<a href="./src/resources/v1/deals.ts">searchLenders</a>({ ...params }) -> DealSearchLendersResponse</code>

## Market

Types:

- <code><a href="./src/resources/v1/market/market.ts">MarketRetrieveFlipActivityResponse</a></code>
- <code><a href="./src/resources/v1/market/market.ts">MarketRetrieveTrendsResponse</a></code>

Methods:

- <code title="get /api/v1/market/flips">client.v1.market.<a href="./src/resources/v1/market/market.ts">retrieveFlipActivity</a>({ ...params }) -> MarketRetrieveFlipActivityResponse</code>
- <code title="get /api/v1/market/trends">client.v1.market.<a href="./src/resources/v1/market/market.ts">retrieveTrends</a>({ ...params }) -> MarketRetrieveTrendsResponse</code>

### Counties

Types:

- <code><a href="./src/resources/v1/market/counties.ts">CountyRetrieveDetailResponse</a></code>
- <code><a href="./src/resources/v1/market/counties.ts">CountyRetrieveStatisticsResponse</a></code>

Methods:

- <code title="get /api/v1/market/counties/{fips}">client.v1.market.counties.<a href="./src/resources/v1/market/counties.ts">retrieveDetail</a>(fips) -> CountyRetrieveDetailResponse</code>
- <code title="get /api/v1/market/counties">client.v1.market.counties.<a href="./src/resources/v1/market/counties.ts">retrieveStatistics</a>({ ...params }) -> CountyRetrieveStatisticsResponse</code>

## Owners

Types:

- <code><a href="./src/resources/v1/owners.ts">Owner</a></code>
- <code><a href="./src/resources/v1/owners.ts">OwnerRetrievePortfolioSummaryResponse</a></code>
- <code><a href="./src/resources/v1/owners.ts">OwnerRetrievePropertiesResponse</a></code>
- <code><a href="./src/resources/v1/owners.ts">OwnerRetrieveTransactionsResponse</a></code>
- <code><a href="./src/resources/v1/owners.ts">OwnerSearchOwnersResponse</a></code>

Methods:

- <code title="get /api/v1/owners/{name}/portfolio">client.v1.owners.<a href="./src/resources/v1/owners.ts">retrievePortfolioSummary</a>(name) -> OwnerRetrievePortfolioSummaryResponse</code>
- <code title="get /api/v1/owners/{name}">client.v1.owners.<a href="./src/resources/v1/owners.ts">retrieveProfile</a>(name) -> Owner</code>
- <code title="get /api/v1/owners/{name}/properties">client.v1.owners.<a href="./src/resources/v1/owners.ts">retrieveProperties</a>(name, { ...params }) -> OwnerRetrievePropertiesResponse</code>
- <code title="get /api/v1/owners/{name}/transactions">client.v1.owners.<a href="./src/resources/v1/owners.ts">retrieveTransactions</a>(name) -> OwnerRetrieveTransactionsResponse</code>
- <code title="get /api/v1/owners/search">client.v1.owners.<a href="./src/resources/v1/owners.ts">searchOwners</a>({ ...params }) -> OwnerSearchOwnersResponse</code>

## Webhooks

Types:

- <code><a href="./src/resources/v1/webhooks.ts">Webhook</a></code>
- <code><a href="./src/resources/v1/webhooks.ts">WebhookFilter</a></code>
- <code><a href="./src/resources/v1/webhooks.ts">WebhookCreateEndpointResponse</a></code>
- <code><a href="./src/resources/v1/webhooks.ts">WebhookDisableEndpointResponse</a></code>
- <code><a href="./src/resources/v1/webhooks.ts">WebhookListEndpointsResponse</a></code>
- <code><a href="./src/resources/v1/webhooks.ts">WebhookRetrieveDeliveriesResponse</a></code>

Methods:

- <code title="post /api/v1/webhooks">client.v1.webhooks.<a href="./src/resources/v1/webhooks.ts">createEndpoint</a>({ ...params }) -> WebhookCreateEndpointResponse</code>
- <code title="delete /api/v1/webhooks/{id}">client.v1.webhooks.<a href="./src/resources/v1/webhooks.ts">disableEndpoint</a>(id) -> WebhookDisableEndpointResponse</code>
- <code title="get /api/v1/webhooks">client.v1.webhooks.<a href="./src/resources/v1/webhooks.ts">listEndpoints</a>() -> WebhookListEndpointsResponse</code>
- <code title="get /api/v1/webhooks/{id}/deliveries">client.v1.webhooks.<a href="./src/resources/v1/webhooks.ts">retrieveDeliveries</a>(id) -> WebhookRetrieveDeliveriesResponse</code>
- <code title="get /api/v1/webhooks/{id}">client.v1.webhooks.<a href="./src/resources/v1/webhooks.ts">retrieveEndpoint</a>(id) -> Webhook</code>

## Account

Types:

- <code><a href="./src/resources/v1/account.ts">AccountRetrieveUsageResponse</a></code>

Methods:

- <code title="get /api/v1/account/usage">client.v1.account.<a href="./src/resources/v1/account.ts">retrieveUsage</a>() -> AccountRetrieveUsageResponse</code>
