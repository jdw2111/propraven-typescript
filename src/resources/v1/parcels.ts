// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Parcel lookup, owner details, permits, deeds, and risk data.
 */
export class Parcels extends APIResource {
  /**
   * Retrieve a single parcel by its composite ID (county_fips:parcel_id).
   *
   * @example
   * ```ts
   * const parcel = await client.v1.parcels.retrieve(
   *   '37183:0012345',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Parcel> {
    return this._client.get(path`/api/v1/parcels/${id}`, options);
  }

  /**
   * Retrieve deed transactions and transfer history for a parcel.
   *
   * @example
   * ```ts
   * const response = await client.v1.parcels.retrieveDeeds(
   *   '37183:0012345',
   * );
   * ```
   */
  retrieveDeeds(id: string, options?: RequestOptions): APIPromise<ParcelRetrieveDeedsResponse> {
    return this._client.get(path`/api/v1/parcels/${id}/deeds`, options);
  }

  /**
   * Returns parcel polygons inside a bounding box as a GeoJSON FeatureCollection.
   * Only served at zoom ≥ 14 to limit data volume — coarser bbox returns an empty
   * collection. Each feature's properties include parcel_id, county_fips,
   * owner_name, assessed value, and basic attributes for rendering popups.
   *
   * @example
   * ```ts
   * const response = await client.v1.parcels.retrieveGeojson({
   *   bbox: '-.6...,.1........6,....,-108.6',
   *   zoom: 0,
   * });
   * ```
   */
  retrieveGeojson(
    query: ParcelRetrieveGeojsonParams,
    options?: RequestOptions,
  ): APIPromise<ParcelRetrieveGeojsonResponse> {
    return this._client.get('/api/v1/parcels/geojson', { query, ...options });
  }

  /**
   * Retrieve the owner of a parcel along with their portfolio summary and list of
   * properties.
   *
   * @example
   * ```ts
   * const response = await client.v1.parcels.retrieveOwner(
   *   '37183:0012345',
   * );
   * ```
   */
  retrieveOwner(id: string, options?: RequestOptions): APIPromise<ParcelRetrieveOwnerResponse> {
    return this._client.get(path`/api/v1/parcels/${id}/owner`, options);
  }

  /**
   * Retrieve building and construction permits associated with a parcel.
   *
   * @example
   * ```ts
   * const response = await client.v1.parcels.retrievePermits(
   *   '37183:0012345',
   * );
   * ```
   */
  retrievePermits(id: string, options?: RequestOptions): APIPromise<ParcelRetrievePermitsResponse> {
    return this._client.get(path`/api/v1/parcels/${id}/permits`, options);
  }

  /**
   * Returns the full canonical parcel record plus every enrichment: UCC liens,
   * comparable sales, owner portfolio context, permits, deeds, hazard composite.
   * This is the single most data-dense endpoint per parcel — designed for
   * due-diligence and underwriting workflows. Heavier than parcels/{id}; cache
   * aggressively when serving UIs.
   *
   * @example
   * ```ts
   * const response = await client.v1.parcels.retrieveReport(
   *   'id',
   * );
   * ```
   */
  retrieveReport(
    id: string,
    query: ParcelRetrieveReportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ParcelRetrieveReportResponse> {
    return this._client.get(path`/api/v1/parcels/${id}/report`, { query, ...options });
  }

  /**
   * Retrieve flood, wildfire, air quality, and crime risk data for a parcel.
   *
   * @example
   * ```ts
   * const riskAssessment =
   *   await client.v1.parcels.retrieveRisks('37183:0012345');
   * ```
   */
  retrieveRisks(id: string, options?: RequestOptions): APIPromise<RiskAssessment> {
    return this._client.get(path`/api/v1/parcels/${id}/risks`, options);
  }

  /**
   * Finds the AADT (annual average daily traffic) station nearest to the given
   * coordinates and returns its historical time series plus 3/5/7-year CAGRs. Useful
   * for retail / CRE site selection. Search radius ~2 miles; returns empty data if
   * no station is in range.
   *
   * @example
   * ```ts
   * const response =
   *   await client.v1.parcels.retrieveTrafficHistory('id', {
   *     lat: 0,
   *     lng: 0,
   *   });
   * ```
   */
  retrieveTrafficHistory(
    id: string,
    query: ParcelRetrieveTrafficHistoryParams,
    options?: RequestOptions,
  ): APIPromise<ParcelRetrieveTrafficHistoryResponse> {
    return this._client.get(path`/api/v1/parcels/${id}/traffic-history`, { query, ...options });
  }
}

export interface Deed {
  deed_type?: string | null;

  document_number?: string;

  grantee_name?: string;

  grantor_name?: string;

  recording_date?: string;

  sale_date?: string | null;

  sale_price?: number | null;
}

export interface Parcel {
  absentee_owner?: boolean;

  acreage?: number | null;

  address?: string;

  assessed_value?: number | null;

  city?: string;

  /**
   * 5-digit county FIPS code.
   */
  county_fips?: string;

  county_name?: string;

  /**
   * Crime score from 0 (low) to 100 (high).
   */
  crime_score?: number | null;

  /**
   * Composite deal opportunity score from 0 to 100.
   */
  deal_score?: number | null;

  improvement_value?: number | null;

  land_use?: string | null;

  land_value?: number | null;

  last_sale_date?: string | null;

  last_sale_price?: number | null;

  latitude?: number | null;

  longitude?: number | null;

  mailing_address?: string | null;

  market_value?: number | null;

  owner_name?: string;

  owner_type?: 'individual' | 'corporation' | 'llc' | 'trust' | 'government' | 'other';

  /**
   * County-assigned parcel identifier.
   */
  parcel_id?: string;

  state_abbr?: string;

  state_fips?: string;

  year_built?: number | null;

  zip?: string;

  zoning?: string | null;

  zoning_category?: 'residential' | 'commercial' | 'industrial' | 'agricultural' | 'mixed' | 'other' | null;
}

export interface Permit {
  contractor?: string | null;

  description?: string;

  estimated_cost?: number | null;

  issued_date?: string | null;

  permit_number?: string;

  status?: 'issued' | 'pending' | 'approved' | 'expired' | 'completed' | 'denied';

  type?: string;
}

export interface RiskAssessment {
  air_quality?: RiskAssessment.AirQuality;

  crime?: RiskAssessment.Crime;

  flood_zone?: RiskAssessment.FloodZone;

  wildfire?: RiskAssessment.Wildfire;
}

export namespace RiskAssessment {
  export interface AirQuality {
    category?:
      | 'good'
      | 'moderate'
      | 'unhealthy_sensitive'
      | 'unhealthy'
      | 'very_unhealthy'
      | 'hazardous'
      | null;

    /**
     * Median Air Quality Index value.
     */
    median_aqi?: number | null;
  }

  export interface Crime {
    /**
     * Crime score from 0 (low) to 100 (high).
     */
    score?: number | null;

    tier?: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high' | null;

    trend?: 'decreasing' | 'stable' | 'increasing' | null;
  }

  export interface FloodZone {
    description?: string | null;

    in_floodplain?: boolean;

    /**
     * FEMA flood zone designation.
     */
    zone?: string | null;
  }

  export interface Wildfire {
    /**
     * Annual burn probability as a decimal.
     */
    burn_probability?: number | null;

    risk_class?: 'low' | 'moderate' | 'high' | 'very_high' | 'extreme' | null;
  }
}

export interface ParcelRetrieveDeedsResponse {
  data?: Array<Deed>;
}

/**
 * GeoJSON FeatureCollection of parcel polygons. Each feature's properties carry
 * the basic parcel summary for popup rendering.
 */
export interface ParcelRetrieveGeojsonResponse {
  features?: Array<ParcelRetrieveGeojsonResponse.Feature>;

  type?: 'FeatureCollection';
}

export namespace ParcelRetrieveGeojsonResponse {
  export interface Feature {
    geometry?: Feature.Geometry;

    properties?: Feature.Properties;

    type?: 'Feature';
  }

  export namespace Feature {
    export interface Geometry {
      /**
       * GeoJSON polygon coordinate rings: outer ring first, then any inner rings.
       */
      coordinates?: Array<Array<Array<number>>>;

      type?: 'Polygon';
    }

    export interface Properties {
      address?: string | null;

      city?: string | null;

      county_fips?: string;

      latitude?: number;

      longitude?: number;

      owner_name?: string | null;

      parcel_id?: string;

      property_type?: string | null;

      state?: string | null;

      total_assessed_value?: number | null;

      year_built?: number | null;
    }
  }
}

export interface ParcelRetrieveOwnerResponse {
  entity_type?: 'individual' | 'corporation' | 'llc' | 'trust' | 'government' | 'other';

  mailing_address?: string;

  owner_name?: string;

  portfolio_summary?: ParcelRetrieveOwnerResponse.PortfolioSummary;

  properties?: Array<Parcel>;
}

export namespace ParcelRetrieveOwnerResponse {
  export interface PortfolioSummary {
    property_count?: number;

    states?: Array<string>;

    total_assessed_value?: number;
  }
}

export interface ParcelRetrievePermitsResponse {
  data?: Array<Permit>;
}

/**
 * Comprehensive parcel report — every PropRaven data point joined per parcel.
 * Subsections are populated on a best-effort basis; missing data is omitted rather
 * than nulled.
 */
export interface ParcelRetrieveReportResponse {
  comparable_sales?: Array<ParcelRetrieveReportResponse.ComparableSale>;

  deeds?: Array<Deed>;

  parcel?: Parcel;

  permits?: Array<Permit>;

  risk?: RiskAssessment;

  ucc_liens?: Array<ParcelRetrieveReportResponse.UccLien>;
}

export namespace ParcelRetrieveReportResponse {
  export interface ComparableSale {
    comp_baths?: number | null;

    comp_beds?: number | null;

    comp_parcel_id?: string;

    comp_sale_date?: string;

    comp_sale_price?: number | null;

    comp_sqft?: number | null;

    distance_miles?: number | null;

    similarity_score?: number;
  }

  export interface UccLien {
    debtor_name?: string | null;

    filing_date?: string;

    filing_id?: string;

    filing_status?: string | null;

    lapse_date?: string;

    match_confidence?: number;

    match_method?: string | null;

    secured_party?: string | null;
  }
}

export interface ParcelRetrieveTrafficHistoryResponse {
  /**
   * Year-keyed historical counts (newest last).
   */
  history?: Array<ParcelRetrieveTrafficHistoryResponse.History>;

  station?: ParcelRetrieveTrafficHistoryResponse.Station;
}

export namespace ParcelRetrieveTrafficHistoryResponse {
  export interface History {
    aadt?: number | null;

    year?: number;
  }

  export interface Station {
    id?: string;

    /**
     * Most recent AADT count.
     */
    aadt_current?: number | null;

    aadt_year?: number | null;

    cagr_3yr?: number | null;

    cagr_5yr?: number | null;

    cagr_7yr?: number | null;

    functional_class?: string | null;

    latitude?: number;

    longitude?: number;

    route_name?: string | null;

    station_id?: string;
  }
}

export interface ParcelRetrieveGeojsonParams {
  /**
   * Bounding box `west,south,east,north`.
   */
  bbox: string;

  /**
   * Map zoom level. Below 14 returns an empty collection.
   */
  zoom: number;
}

export interface ParcelRetrieveReportParams {
  /**
   * 5-digit county FIPS. Strongly recommended when passing a county-local id.
   */
  county_fips?: string;
}

export interface ParcelRetrieveTrafficHistoryParams {
  /**
   * Latitude.
   */
  lat: number;

  /**
   * Longitude.
   */
  lng: number;
}

export declare namespace Parcels {
  export {
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
}
