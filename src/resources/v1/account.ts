// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Account-scoped usage, quota, and key-level reporting.
 */
export class Account extends APIResource {
  /**
   * Returns the calling key's current-period API usage, included allotment,
   * remaining calls, configured per-minute and per-day rate limits, and the hard-cap
   * status. Per-user (all of a user's API keys roll up to the same monthly counter,
   * since they share a Stripe subscription).
   *
   * @example
   * ```ts
   * const response = await client.v1.account.retrieveUsage();
   * ```
   */
  retrieveUsage(options?: RequestOptions): APIPromise<AccountRetrieveUsageResponse> {
    return this._client.get('/api/v1/account/usage', options);
  }
}

export interface AccountRetrieveUsageResponse {
  /**
   * Plan allotment for the current period.
   */
  calls_included?: number;

  calls_remaining?: number;

  calls_used?: number;

  /**
   * Whether further calls will be hard-rejected vs allowed-and-billed.
   */
  hard_capped?: boolean;

  period?: AccountRetrieveUsageResponse.Period;

  rate_limit?: AccountRetrieveUsageResponse.RateLimit;

  tier?: 'free' | 'starter' | 'pro' | 'scale' | 'api_100k';
}

export namespace AccountRetrieveUsageResponse {
  export interface Period {
    end?: string;

    label?: string;

    start?: string;
  }

  export interface RateLimit {
    per_day?: number;

    per_minute?: number;
  }
}

export declare namespace Account {
  export { type AccountRetrieveUsageResponse as AccountRetrieveUsageResponse };
}
