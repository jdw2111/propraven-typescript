// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.
// The namespaces of the client, one per x-sdk-group.

import { BaseClient } from '../core/client.js';
import {
  AccountResource,
  CmbsResource,
  CohortsResource,
  CoverageResource,
  CreditsResource,
  CrimeResource,
  DealsResource,
  FreshnessResource,
  LeadsResource,
  LookupResource,
  MarketResource,
  OwnersResource,
  ParcelsResource,
  SearchResource,
  StorefrontResource,
  TrafficResource,
  VerifyResource,
  WatchResource,
  WebhooksResource,
} from './resources.js';

export abstract class GeneratedClient extends BaseClient {
  /** 1 operation. */
  readonly account: AccountResource = new AccountResource(this);
  /** 1 operation. */
  readonly cmbs: CmbsResource = new CmbsResource(this);
  /** 2 operations. */
  readonly cohorts: CohortsResource = new CohortsResource(this);
  /** 2 operations. */
  readonly coverage: CoverageResource = new CoverageResource(this);
  /** 2 operations. */
  readonly credits: CreditsResource = new CreditsResource(this);
  /** 1 operation. */
  readonly crime: CrimeResource = new CrimeResource(this);
  /** 9 operations. */
  readonly deals: DealsResource = new DealsResource(this);
  /** 2 operations. */
  readonly freshness: FreshnessResource = new FreshnessResource(this);
  /** 1 operation. */
  readonly leads: LeadsResource = new LeadsResource(this);
  /** 2 operations. */
  readonly lookup: LookupResource = new LookupResource(this);
  /** 5 operations. */
  readonly market: MarketResource = new MarketResource(this);
  /** 7 operations. */
  readonly owners: OwnersResource = new OwnersResource(this);
  /** 15 operations. */
  readonly parcels: ParcelsResource = new ParcelsResource(this);
  /** 4 operations. */
  readonly search: SearchResource = new SearchResource(this);
  /** 2 operations. */
  readonly storefront: StorefrontResource = new StorefrontResource(this);
  /** 1 operation. */
  readonly traffic: TrafficResource = new TrafficResource(this);
  /** 2 operations. */
  readonly verify: VerifyResource = new VerifyResource(this);
  /** 4 operations. */
  readonly watch: WatchResource = new WatchResource(this);
  /** 6 operations. */
  readonly webhooks: WebhooksResource = new WebhooksResource(this);
}

/** Number of operations generated from openapi.json. */
export const OPERATION_COUNT = 69;
