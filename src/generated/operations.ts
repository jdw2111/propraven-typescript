// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.
// Wire-level description of every operation, consumed by the hand-written core.

import type { OperationDescriptor } from '../core/types.js';

export const account_usage: OperationDescriptor = {
  "operationId": "getAccountUsage",
  "group": "account",
  "method": "usage",
  "httpMethod": "GET",
  "path": "/api/v1/account/usage",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const cmbs_exposure: OperationDescriptor = {
  "operationId": "getCmbsExposure",
  "group": "cmbs",
  "method": "exposure",
  "httpMethod": "GET",
  "path": "/api/v1/cmbs/exposure",
  "pathParams": [],
  "query": {
    "id": {
      "name": "id"
    },
    "owner": {
      "name": "owner"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const cohorts_export: OperationDescriptor = {
  "operationId": "exportListMailMerge",
  "group": "cohorts",
  "method": "export",
  "httpMethod": "GET",
  "path": "/api/v1/cohorts/{id}/export",
  "pathParams": [
    "id"
  ],
  "query": {
    "preview": {
      "name": "preview"
    }
  },
  "headers": {
    "creditToken": "X-CREDIT-TOKEN",
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "auto",
  "accept": "text/csv, application/json"
};

export const cohorts_list: OperationDescriptor = {
  "operationId": "listCohorts",
  "group": "cohorts",
  "method": "list",
  "httpMethod": "GET",
  "path": "/api/v1/cohorts",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const coverage_get: OperationDescriptor = {
  "operationId": "getCoverage",
  "group": "coverage",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/coverage",
  "pathParams": [],
  "query": {
    "state": {
      "name": "state"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const coverage_map: OperationDescriptor = {
  "operationId": "getCoverageMap",
  "group": "coverage",
  "method": "map",
  "httpMethod": "GET",
  "path": "/api/v1/coverage/map",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const credits_balance: OperationDescriptor = {
  "operationId": "creditBalance",
  "group": "credits",
  "method": "balance",
  "httpMethod": "GET",
  "path": "/api/v1/storefront/credits/balance",
  "pathParams": [],
  "query": {},
  "headers": {
    "creditToken": "X-CREDIT-TOKEN"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const credits_topup: OperationDescriptor = {
  "operationId": "fundCredits",
  "group": "credits",
  "method": "topup",
  "httpMethod": "GET",
  "path": "/api/v1/storefront/credits/topup",
  "pathParams": [],
  "query": {
    "amount": {
      "name": "amount"
    }
  },
  "headers": {
    "creditToken": "X-CREDIT-TOKEN",
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const crime_lookup: OperationDescriptor = {
  "operationId": "getCrimeLookup",
  "group": "crime",
  "method": "lookup",
  "httpMethod": "GET",
  "path": "/api/v1/crime/lookup",
  "pathParams": [],
  "query": {
    "lat": {
      "name": "lat"
    },
    "lng": {
      "name": "lng"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const deals_absentee: OperationDescriptor = {
  "operationId": "getAbsenteeOwners",
  "group": "deals",
  "method": "absentee",
  "httpMethod": "GET",
  "path": "/api/v1/deals/absentee",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    },
    "min_value": {
      "name": "min_value"
    },
    "out_of_state": {
      "name": "out_of_state"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_contractors: OperationDescriptor = {
  "operationId": "searchContractors",
  "group": "deals",
  "method": "contractors",
  "httpMethod": "GET",
  "path": "/api/v1/deals/contractors",
  "pathParams": [],
  "query": {
    "search": {
      "name": "search"
    },
    "min_permits": {
      "name": "min_permits"
    },
    "state": {
      "name": "state"
    },
    "min_value": {
      "name": "min_value"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_entities: OperationDescriptor = {
  "operationId": "searchEntityOwnedParcels",
  "group": "deals",
  "method": "entities",
  "httpMethod": "GET",
  "path": "/api/v1/deals/entities",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    },
    "entity_type": {
      "name": "entity_type"
    },
    "search": {
      "name": "search"
    },
    "min_value": {
      "name": "min_value"
    },
    "zoning": {
      "name": "zoning"
    },
    "top": {
      "name": "top"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_flips: OperationDescriptor = {
  "operationId": "getFlips",
  "group": "deals",
  "method": "flips",
  "httpMethod": "GET",
  "path": "/api/v1/deals/flips",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    },
    "flip_tier": {
      "name": "flip_tier"
    },
    "min_profit": {
      "name": "min_profit"
    },
    "view": {
      "name": "view"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_highLandRatio: OperationDescriptor = {
  "operationId": "getHighLandRatioParcels",
  "group": "deals",
  "method": "highLandRatio",
  "httpMethod": "GET",
  "path": "/api/v1/deals/high-land-ratio",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    },
    "min_ratio": {
      "name": "min_ratio"
    },
    "min_value": {
      "name": "min_value"
    },
    "zoning": {
      "name": "zoning"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_lenders: OperationDescriptor = {
  "operationId": "searchLenders",
  "group": "deals",
  "method": "lenders",
  "httpMethod": "GET",
  "path": "/api/v1/deals/lenders",
  "pathParams": [],
  "query": {
    "search": {
      "name": "search"
    },
    "min_mortgages": {
      "name": "min_mortgages"
    },
    "state": {
      "name": "state"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_longHold: OperationDescriptor = {
  "operationId": "getLongHoldParcels",
  "group": "deals",
  "method": "longHold",
  "httpMethod": "GET",
  "path": "/api/v1/deals/long-hold",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    },
    "min_years": {
      "name": "min_years"
    },
    "hold_tier": {
      "name": "hold_tier"
    },
    "min_value": {
      "name": "min_value"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_market: OperationDescriptor = {
  "operationId": "getDealMarketSummary",
  "group": "deals",
  "method": "market",
  "httpMethod": "GET",
  "path": "/api/v1/deals/market",
  "pathParams": [],
  "query": {
    "view": {
      "name": "view"
    },
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    },
    "year": {
      "name": "year"
    },
    "rating": {
      "name": "rating"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const deals_portfolioOwners: OperationDescriptor = {
  "operationId": "getPortfolioOwners",
  "group": "deals",
  "method": "portfolioOwners",
  "httpMethod": "GET",
  "path": "/api/v1/deals/portfolio-owners",
  "pathParams": [],
  "query": {
    "min_properties": {
      "name": "min_properties"
    },
    "state": {
      "name": "state"
    },
    "min_value": {
      "name": "min_value"
    },
    "search": {
      "name": "search"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const freshness_datasets: OperationDescriptor = {
  "operationId": "getFreshnessDatasets",
  "group": "freshness",
  "method": "datasets",
  "httpMethod": "GET",
  "path": "/api/v1/freshness/datasets",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const freshness_get: OperationDescriptor = {
  "operationId": "getFreshness",
  "group": "freshness",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/freshness",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const leads_find: OperationDescriptor = {
  "operationId": "findLeads",
  "group": "leads",
  "method": "find",
  "httpMethod": "GET",
  "path": "/api/v1/leads/find",
  "pathParams": [],
  "query": {
    "signal": {
      "name": "signal"
    },
    "state": {
      "name": "state"
    },
    "county": {
      "name": "county"
    },
    "zip": {
      "name": "zip"
    },
    "value_min": {
      "name": "value_min"
    },
    "value_max": {
      "name": "value_max"
    },
    "limit": {
      "name": "limit"
    },
    "preview": {
      "name": "preview"
    },
    "mail_ready": {
      "name": "mail_ready"
    }
  },
  "headers": {
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const lookup_batch: OperationDescriptor = {
  "operationId": "lookupBatch",
  "group": "lookup",
  "method": "batch",
  "httpMethod": "POST",
  "path": "/api/v1/lookup/batch",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": {
    "kind": "fields",
    "fields": {
      "queries": "queries"
    },
    "required": true
  },
  "response": "json",
  "accept": "application/json"
};

export const lookup_get: OperationDescriptor = {
  "operationId": "lookupParcel",
  "group": "lookup",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/lookup",
  "pathParams": [],
  "query": {
    "q": {
      "name": "q"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const market_counties: OperationDescriptor = {
  "operationId": "getCountyMarketStats",
  "group": "market",
  "method": "counties",
  "httpMethod": "GET",
  "path": "/api/v1/market/counties",
  "pathParams": [],
  "query": {
    "state_fips": {
      "name": "state_fips"
    },
    "min_sales": {
      "name": "min_sales"
    },
    "quarter": {
      "name": "quarter"
    },
    "sort": {
      "name": "sort"
    },
    "order": {
      "name": "order"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const market_county: OperationDescriptor = {
  "operationId": "getCountyDetail",
  "group": "market",
  "method": "county",
  "httpMethod": "GET",
  "path": "/api/v1/market/counties/{fips}",
  "pathParams": [
    "fips"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const market_flips: OperationDescriptor = {
  "operationId": "getMarketFlips",
  "group": "market",
  "method": "flips",
  "httpMethod": "GET",
  "path": "/api/v1/market/flips",
  "pathParams": [],
  "query": {
    "state_fips": {
      "name": "state_fips"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const market_snapshot: OperationDescriptor = {
  "operationId": "getMarketSnapshot",
  "group": "market",
  "method": "snapshot",
  "httpMethod": "GET",
  "path": "/api/v1/market/snapshot",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "tract": {
      "name": "tract"
    },
    "cbsa": {
      "name": "cbsa"
    },
    "zip": {
      "name": "zip"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const market_trends: OperationDescriptor = {
  "operationId": "getMarketTrends",
  "group": "market",
  "method": "trends",
  "httpMethod": "GET",
  "path": "/api/v1/market/trends",
  "pathParams": [],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "state_fips": {
      "name": "state_fips"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const owners_card: OperationDescriptor = {
  "operationId": "getOwnerCard",
  "group": "owners",
  "method": "card",
  "httpMethod": "GET",
  "path": "/api/v1/owners/card",
  "pathParams": [],
  "query": {
    "parcel_id": {
      "name": "parcel_id"
    },
    "name": {
      "name": "name"
    },
    "include_low_confidence": {
      "name": "include_low_confidence"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const owners_get: OperationDescriptor = {
  "operationId": "getOwnerProfile",
  "group": "owners",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/owners/{name}",
  "pathParams": [
    "name"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const owners_portfolio: OperationDescriptor = {
  "operationId": "getOwnerPortfolio",
  "group": "owners",
  "method": "portfolio",
  "httpMethod": "GET",
  "path": "/api/v1/owners/{name}/portfolio",
  "pathParams": [
    "name"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const owners_properties: OperationDescriptor = {
  "operationId": "getOwnerProperties",
  "group": "owners",
  "method": "properties",
  "httpMethod": "GET",
  "path": "/api/v1/owners/{name}/properties",
  "pathParams": [
    "name"
  ],
  "query": {
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const owners_report: OperationDescriptor = {
  "operationId": "buyOwnerReport",
  "group": "owners",
  "method": "report",
  "httpMethod": "GET",
  "path": "/api/v1/owners/{name}/report",
  "pathParams": [
    "name"
  ],
  "query": {
    "ticker": {
      "name": "ticker"
    },
    "state": {
      "name": "state"
    },
    "limit": {
      "name": "limit"
    },
    "offset": {
      "name": "offset"
    },
    "preview": {
      "name": "preview"
    }
  },
  "headers": {
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const owners_search: OperationDescriptor = {
  "operationId": "searchOwners",
  "group": "owners",
  "method": "search",
  "httpMethod": "GET",
  "path": "/api/v1/owners/search",
  "pathParams": [],
  "query": {
    "q": {
      "name": "q"
    },
    "min_properties": {
      "name": "min_properties"
    },
    "limit": {
      "name": "limit"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const owners_transactions: OperationDescriptor = {
  "operationId": "getOwnerTransactions",
  "group": "owners",
  "method": "transactions",
  "httpMethod": "GET",
  "path": "/api/v1/owners/{name}/transactions",
  "pathParams": [
    "name"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_batch: OperationDescriptor = {
  "operationId": "getParcelsBatch",
  "group": "parcels",
  "method": "batch",
  "httpMethod": "POST",
  "path": "/api/v1/parcels/batch",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": {
    "kind": "fields",
    "fields": {
      "tuples": "tuples"
    },
    "required": true
  },
  "response": "json",
  "accept": "application/json"
};

export const parcels_compPack: OperationDescriptor = {
  "operationId": "buyCompPack",
  "group": "parcels",
  "method": "compPack",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/comp-pack",
  "pathParams": [
    "id"
  ],
  "query": {
    "n": {
      "name": "n"
    },
    "radius": {
      "name": "radius"
    },
    "preview": {
      "name": "preview"
    }
  },
  "headers": {
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_comps: OperationDescriptor = {
  "operationId": "getParcelComps",
  "group": "parcels",
  "method": "comps",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/comps",
  "pathParams": [
    "id"
  ],
  "query": {
    "n": {
      "name": "n"
    },
    "radius": {
      "name": "radius"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_deeds: OperationDescriptor = {
  "operationId": "getParcelDeeds",
  "group": "parcels",
  "method": "deeds",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/deeds",
  "pathParams": [
    "id"
  ],
  "query": {
    "shape": {
      "name": "shape"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_geojson: OperationDescriptor = {
  "operationId": "getParcelGeoJSON",
  "group": "parcels",
  "method": "geojson",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/geojson",
  "pathParams": [],
  "query": {
    "bbox": {
      "name": "bbox"
    },
    "zoom": {
      "name": "zoom"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_get: OperationDescriptor = {
  "operationId": "getParcel",
  "group": "parcels",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_occupants: OperationDescriptor = {
  "operationId": "getParcelOccupants",
  "group": "parcels",
  "method": "occupants",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/occupants",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_owner: OperationDescriptor = {
  "operationId": "getParcelOwner",
  "group": "parcels",
  "method": "owner",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/owner",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_permits: OperationDescriptor = {
  "operationId": "getParcelPermits",
  "group": "parcels",
  "method": "permits",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/permits",
  "pathParams": [
    "id"
  ],
  "query": {
    "shape": {
      "name": "shape"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_pois: OperationDescriptor = {
  "operationId": "getParcelPois",
  "group": "parcels",
  "method": "pois",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/poi",
  "pathParams": [],
  "query": {
    "bbox": {
      "name": "bbox"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_report: OperationDescriptor = {
  "operationId": "getParcelReport",
  "group": "parcels",
  "method": "report",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/report",
  "pathParams": [
    "id"
  ],
  "query": {
    "county_fips": {
      "name": "county_fips"
    },
    "sections": {
      "name": "sections"
    },
    "fields": {
      "name": "fields"
    },
    "include_provenance": {
      "name": "include_provenance"
    }
  },
  "headers": {
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_risks: OperationDescriptor = {
  "operationId": "getParcelRisks",
  "group": "parcels",
  "method": "risks",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/risks",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_riskScore: OperationDescriptor = {
  "operationId": "buyRiskScore",
  "group": "parcels",
  "method": "riskScore",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/risk-score",
  "pathParams": [
    "id"
  ],
  "query": {
    "preview": {
      "name": "preview"
    }
  },
  "headers": {
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_trafficHistory: OperationDescriptor = {
  "operationId": "getParcelTrafficHistory",
  "group": "parcels",
  "method": "trafficHistory",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/traffic-history",
  "pathParams": [
    "id"
  ],
  "query": {
    "lat": {
      "name": "lat"
    },
    "lng": {
      "name": "lng"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const parcels_violations: OperationDescriptor = {
  "operationId": "getParcelViolations",
  "group": "parcels",
  "method": "violations",
  "httpMethod": "GET",
  "path": "/api/v1/parcels/{id}/violations",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const search_autocomplete: OperationDescriptor = {
  "operationId": "searchAutocomplete",
  "group": "search",
  "method": "autocomplete",
  "httpMethod": "GET",
  "path": "/api/v1/search/autocomplete",
  "pathParams": [],
  "query": {
    "q": {
      "name": "q"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const search_export: OperationDescriptor = {
  "operationId": "exportSearchResults",
  "group": "search",
  "method": "export",
  "httpMethod": "GET",
  "path": "/api/v1/search/export",
  "pathParams": [],
  "query": {
    "north": {
      "name": "north"
    },
    "south": {
      "name": "south"
    },
    "east": {
      "name": "east"
    },
    "west": {
      "name": "west"
    },
    "zoningCategories": {
      "name": "zoningCategories"
    },
    "sort": {
      "name": "sort"
    },
    "order": {
      "name": "order"
    },
    "limit": {
      "name": "limit"
    }
  },
  "headers": {},
  "body": null,
  "response": "text",
  "accept": "text/csv, application/json"
};

export const search_full: OperationDescriptor = {
  "operationId": "fullSearch",
  "group": "search",
  "method": "full",
  "httpMethod": "GET",
  "path": "/api/v1/search/full",
  "pathParams": [],
  "query": {
    "q": {
      "name": "q"
    },
    "field": {
      "name": "field"
    },
    "state": {
      "name": "state"
    },
    "city": {
      "name": "city"
    },
    "page": {
      "name": "page"
    },
    "limit": {
      "name": "limit"
    },
    "sort": {
      "name": "sort"
    },
    "dir": {
      "name": "dir"
    },
    "after": {
      "name": "after"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "cursor",
    "items": "results",
    "cursorParam": "after",
    "next": "nextCursor"
  }
};

export const search_parcels: OperationDescriptor = {
  "operationId": "searchParcels",
  "group": "search",
  "method": "parcels",
  "httpMethod": "POST",
  "path": "/api/v1/search",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": {
    "kind": "fields",
    "fields": {
      "bounds": "bounds",
      "filters": "filters",
      "sort": "sort",
      "order": "order",
      "limit": "limit",
      "offset": "offset"
    },
    "required": true
  },
  "response": "json",
  "accept": "application/json",
  "pagination": {
    "style": "offset",
    "items": "data"
  }
};

export const storefront_availability: OperationDescriptor = {
  "operationId": "getStorefrontAvailability",
  "group": "storefront",
  "method": "availability",
  "httpMethod": "GET",
  "path": "/api/v1/storefront/availability",
  "pathParams": [],
  "query": {
    "parcel_id": {
      "name": "parcel_id"
    },
    "state": {
      "name": "state"
    },
    "county": {
      "name": "county"
    },
    "limit": {
      "name": "limit"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const storefront_catalog: OperationDescriptor = {
  "operationId": "getStorefrontCatalog",
  "group": "storefront",
  "method": "catalog",
  "httpMethod": "GET",
  "path": "/api/v1/storefront/catalog",
  "pathParams": [],
  "query": {
    "state": {
      "name": "state"
    },
    "tier": {
      "name": "tier"
    },
    "section": {
      "name": "section"
    },
    "grain": {
      "name": "grain"
    },
    "min_coverage": {
      "name": "min_coverage"
    },
    "red_cells": {
      "name": "red_cells"
    },
    "q": {
      "name": "q"
    },
    "include": {
      "name": "include"
    },
    "fields": {
      "name": "fields"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const traffic_stations: OperationDescriptor = {
  "operationId": "getTrafficStations",
  "group": "traffic",
  "method": "stations",
  "httpMethod": "GET",
  "path": "/api/v1/traffic/stations",
  "pathParams": [],
  "query": {
    "bbox": {
      "name": "bbox"
    }
  },
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const verify_batch: OperationDescriptor = {
  "operationId": "verifyFactsBatch",
  "group": "verify",
  "method": "batch",
  "httpMethod": "POST",
  "path": "/api/v1/verify",
  "pathParams": [],
  "query": {
    "preview": {
      "name": "preview"
    }
  },
  "headers": {
    "creditToken": "X-CREDIT-TOKEN",
    "payment": "X-PAYMENT"
  },
  "body": {
    "kind": "fields",
    "fields": {
      "lookups": "lookups"
    },
    "required": true
  },
  "response": "json",
  "accept": "application/json"
};

export const verify_get: OperationDescriptor = {
  "operationId": "verifyFactsSingle",
  "group": "verify",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/verify",
  "pathParams": [],
  "query": {
    "parcel_id": {
      "name": "parcel_id"
    },
    "fields": {
      "name": "fields"
    },
    "preview": {
      "name": "preview"
    }
  },
  "headers": {
    "creditToken": "X-CREDIT-TOKEN",
    "payment": "X-PAYMENT"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const watch_create: OperationDescriptor = {
  "operationId": "createWatch",
  "group": "watch",
  "method": "create",
  "httpMethod": "POST",
  "path": "/api/v1/watch",
  "pathParams": [],
  "query": {},
  "headers": {
    "creditToken": "X-CREDIT-TOKEN"
  },
  "body": {
    "kind": "fields",
    "fields": {
      "name": "name",
      "event_types": "event_types",
      "filter": "filter"
    },
    "required": true
  },
  "response": "json",
  "accept": "application/json"
};

export const watch_delete: OperationDescriptor = {
  "operationId": "deleteWatch",
  "group": "watch",
  "method": "delete",
  "httpMethod": "DELETE",
  "path": "/api/v1/watch/{id}",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {
    "creditToken": "X-CREDIT-TOKEN"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const watch_list: OperationDescriptor = {
  "operationId": "listWatches",
  "group": "watch",
  "method": "list",
  "httpMethod": "GET",
  "path": "/api/v1/watch",
  "pathParams": [],
  "query": {},
  "headers": {
    "creditToken": "X-CREDIT-TOKEN"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const watch_poll: OperationDescriptor = {
  "operationId": "pollWatch",
  "group": "watch",
  "method": "poll",
  "httpMethod": "GET",
  "path": "/api/v1/watch/{id}",
  "pathParams": [
    "id"
  ],
  "query": {
    "preview": {
      "name": "preview"
    },
    "limit": {
      "name": "limit"
    }
  },
  "headers": {
    "creditToken": "X-CREDIT-TOKEN"
  },
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const webhooks_create: OperationDescriptor = {
  "operationId": "createWebhook",
  "group": "webhooks",
  "method": "create",
  "httpMethod": "POST",
  "path": "/api/v1/webhooks",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": {
    "kind": "fields",
    "fields": {
      "url": "url",
      "event_types": "event_types",
      "filter_kind": "filter_kind",
      "filter_value": "filter_value",
      "description": "description"
    },
    "required": true
  },
  "response": "json",
  "accept": "application/json"
};

export const webhooks_delete: OperationDescriptor = {
  "operationId": "deleteWebhook",
  "group": "webhooks",
  "method": "delete",
  "httpMethod": "DELETE",
  "path": "/api/v1/webhooks/{id}",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const webhooks_deliveries: OperationDescriptor = {
  "operationId": "listWebhookDeliveries",
  "group": "webhooks",
  "method": "deliveries",
  "httpMethod": "GET",
  "path": "/api/v1/webhooks/{id}/deliveries",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const webhooks_get: OperationDescriptor = {
  "operationId": "getWebhook",
  "group": "webhooks",
  "method": "get",
  "httpMethod": "GET",
  "path": "/api/v1/webhooks/{id}",
  "pathParams": [
    "id"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const webhooks_list: OperationDescriptor = {
  "operationId": "listWebhooks",
  "group": "webhooks",
  "method": "list",
  "httpMethod": "GET",
  "path": "/api/v1/webhooks",
  "pathParams": [],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

export const webhooks_retryDelivery: OperationDescriptor = {
  "operationId": "retryWebhookDelivery",
  "group": "webhooks",
  "method": "retryDelivery",
  "httpMethod": "POST",
  "path": "/api/v1/webhooks/{id}/deliveries/{deliveryId}/retry",
  "pathParams": [
    "id",
    "deliveryId"
  ],
  "query": {},
  "headers": {},
  "body": null,
  "response": "json",
  "accept": "application/json"
};

/** Every operation in openapi.json. */
export const operations: readonly OperationDescriptor[] = [
  account_usage,
  cmbs_exposure,
  cohorts_export,
  cohorts_list,
  coverage_get,
  coverage_map,
  credits_balance,
  credits_topup,
  crime_lookup,
  deals_absentee,
  deals_contractors,
  deals_entities,
  deals_flips,
  deals_highLandRatio,
  deals_lenders,
  deals_longHold,
  deals_market,
  deals_portfolioOwners,
  freshness_datasets,
  freshness_get,
  leads_find,
  lookup_batch,
  lookup_get,
  market_counties,
  market_county,
  market_flips,
  market_snapshot,
  market_trends,
  owners_card,
  owners_get,
  owners_portfolio,
  owners_properties,
  owners_report,
  owners_search,
  owners_transactions,
  parcels_batch,
  parcels_compPack,
  parcels_comps,
  parcels_deeds,
  parcels_geojson,
  parcels_get,
  parcels_occupants,
  parcels_owner,
  parcels_permits,
  parcels_pois,
  parcels_report,
  parcels_risks,
  parcels_riskScore,
  parcels_trafficHistory,
  parcels_violations,
  search_autocomplete,
  search_export,
  search_full,
  search_parcels,
  storefront_availability,
  storefront_catalog,
  traffic_stations,
  verify_batch,
  verify_get,
  watch_create,
  watch_delete,
  watch_list,
  watch_poll,
  webhooks_create,
  webhooks_delete,
  webhooks_deliveries,
  webhooks_get,
  webhooks_list,
  webhooks_retryDelivery,
];
