// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Webhook subscriptions and delivery history. Manage which events PropRaven pushes to your endpoints.
 */
export class Webhooks extends APIResource {
  /**
   * Creates a new webhook subscription. The returned `secret` is shown ONCE — store
   * it server-side and use it to verify every incoming delivery via the
   * `X-PropRaven-Signature` header (HMAC-SHA256 over `<unix_ms>.<raw_body>`). Reject
   * deliveries where `|now - t| > 5min`.
   *
   * @example
   * ```ts
   * const response = await client.v1.webhooks.createEndpoint({
   *   event_types: ['parcel.sold'],
   *   filter_kind: 'parcel_ids',
   *   filter_value: { parcel_ids: ['string'] },
   *   url: 'https://example.com',
   * });
   * ```
   */
  createEndpoint(
    body: WebhookCreateEndpointParams,
    options?: RequestOptions,
  ): APIPromise<WebhookCreateEndpointResponse> {
    return this._client.post('/api/v1/webhooks', { body, ...options });
  }

  /**
   * Marks the endpoint inactive. Delivery history is preserved. The endpoint can no
   * longer receive new events but past deliveries remain queryable via the
   * deliveries route.
   *
   * @example
   * ```ts
   * const response = await client.v1.webhooks.disableEndpoint(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  disableEndpoint(id: string, options?: RequestOptions): APIPromise<WebhookDisableEndpointResponse> {
    return this._client.delete(path`/api/v1/webhooks/${id}`, options);
  }

  /**
   * Returns all webhook endpoints for the calling account, plus the per-tier quota.
   *
   * @example
   * ```ts
   * const response = await client.v1.webhooks.listEndpoints();
   * ```
   */
  listEndpoints(options?: RequestOptions): APIPromise<WebhookListEndpointsResponse> {
    return this._client.get('/api/v1/webhooks', options);
  }

  /**
   * Returns the last 100 delivery attempts for an endpoint — useful for debugging
   * signature mismatches, retry visibility, and dead-letter inspection.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.webhooks.retrieveDeliveries(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieveDeliveries(id: string, options?: RequestOptions): APIPromise<WebhookRetrieveDeliveriesResponse> {
    return this._client.get(path`/api/v1/webhooks/${id}/deliveries`, options);
  }

  /**
   * Returns the full endpoint record (without the secret).
   *
   * @example
   * ```ts
   * const webhook = await client.v1.webhooks.retrieveEndpoint(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  retrieveEndpoint(id: string, options?: RequestOptions): APIPromise<Webhook> {
    return this._client.get(path`/api/v1/webhooks/${id}`, options);
  }
}

export interface Webhook {
  id?: string;

  created_at?: string;

  deliveries_attempted?: number;

  deliveries_succeeded?: number;

  description?: string;

  disabled_at?: string;

  disabled_reason?: string | null;

  event_types?: Array<'parcel.sold' | 'parcel.permit_filed' | 'parcel.owner_changed'>;

  filter_kind?: 'parcel_ids' | 'state_fips' | 'county_fips';

  /**
   * Shape varies with filter_kind. parcel_ids: explicit list. state_fips: all
   * parcels in a state. county_fips: all parcels in a county within a state.
   */
  filter_value?: WebhookFilter;

  is_active?: boolean;

  last_delivery_at?: string;

  last_success_at?: string;

  /**
   * First 14 chars of the secret (whsec\_ + 8 hex). Use to identify the webhook in
   * your dashboard; full secret is shown only at create time.
   */
  secret_prefix?: string;

  /**
   * Customer endpoint. Must be https://.
   */
  url?: string;
}

/**
 * Shape varies with filter_kind. parcel_ids: explicit list. state_fips: all
 * parcels in a state. county_fips: all parcels in a county within a state.
 */
export type WebhookFilter = WebhookFilter.ParcelIDs | WebhookFilter.StateFips | WebhookFilter.UnionMember2;

export namespace WebhookFilter {
  export interface ParcelIDs {
    /**
     * Composite parcel IDs to subscribe to. 1–1000 IDs.
     */
    parcel_ids: Array<string>;
  }

  export interface StateFips {
    /**
     * 2-digit state FIPS — subscribe to all parcels in this state.
     */
    state_fips: string;
  }

  export interface UnionMember2 {
    /**
     * 3-digit county FIPS (within the state) — subscribe to all parcels in this
     * county.
     */
    county_fips: string;

    state_fips: string;
  }
}

export interface WebhookCreateEndpointResponse extends Webhook {
  /**
   * Signature-verification reminder.
   */
  hint: string;

  /**
   * **Shown once.** Copy and store server-side immediately. Used to sign every
   * outgoing delivery.
   */
  secret: string;
}

export interface WebhookDisableEndpointResponse {
  deleted?: string;
}

export interface WebhookListEndpointsResponse {
  quota?: WebhookListEndpointsResponse.Quota;

  tier?: 'free' | 'starter' | 'pro' | 'scale' | 'api_100k';

  webhooks?: Array<Webhook>;
}

export namespace WebhookListEndpointsResponse {
  export interface Quota {
    /**
     * Max simultaneous active webhook endpoints on this tier.
     */
    maxEndpoints?: number;

    /**
     * Max event deliveries per UTC day on this tier.
     */
    maxEventsPerDay?: number;
  }
}

export interface WebhookRetrieveDeliveriesResponse {
  deliveries?: Array<WebhookRetrieveDeliveriesResponse.Delivery>;
}

export namespace WebhookRetrieveDeliveriesResponse {
  export interface Delivery {
    id?: string;

    attempts?: number;

    created_at?: string;

    dead_lettered_at?: string;

    /**
     * Deterministic event identifier — sha256(source || pk || event_type). Idempotent
     * re-deliveries share this.
     */
    event_id?: string;

    event_occurred_at?: string;

    event_type?: 'parcel.sold' | 'parcel.permit_filed' | 'parcel.owner_changed';

    last_attempt_at?: string;

    last_error?: string | null;

    /**
     * Truncated to ~1KB.
     */
    last_response_body?: string | null;

    last_response_status?: number | null;

    next_attempt_at?: string;

    status?: 'pending' | 'in_flight' | 'succeeded' | 'failed' | 'dead_lettered';
  }
}

export interface WebhookCreateEndpointParams {
  /**
   * Event types to subscribe to. NOTE: only parcel.sold is live in v1.0; others 501.
   */
  event_types: Array<'parcel.sold' | 'parcel.permit_filed' | 'parcel.owner_changed'>;

  filter_kind: 'parcel_ids' | 'state_fips' | 'county_fips';

  /**
   * Shape varies with filter_kind. parcel_ids: explicit list. state_fips: all
   * parcels in a state. county_fips: all parcels in a county within a state.
   */
  filter_value: WebhookFilter;

  /**
   * Customer endpoint. https:// only.
   */
  url: string;

  /**
   * Optional human-readable label for your dashboard.
   */
  description?: string;
}

export declare namespace Webhooks {
  export {
    type Webhook as Webhook,
    type WebhookFilter as WebhookFilter,
    type WebhookCreateEndpointResponse as WebhookCreateEndpointResponse,
    type WebhookDisableEndpointResponse as WebhookDisableEndpointResponse,
    type WebhookListEndpointsResponse as WebhookListEndpointsResponse,
    type WebhookRetrieveDeliveriesResponse as WebhookRetrieveDeliveriesResponse,
    type WebhookCreateEndpointParams as WebhookCreateEndpointParams,
  };
}
