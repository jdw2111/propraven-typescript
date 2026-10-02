// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.
// Types for every components/schemas entry and every operation's params and success response.

import type { PageItem } from '../core/types.js';

// ---- components/schemas ----

export interface AccountUsage {
  tier: "free" | "starter" | "pro" | "scale" | "api_100k";
  period: string;
  period_start: string;
  period_end: string;
  calls_used: number;
  /** Plan allotment for the current period. */
  calls_included: number;
  calls_remaining: number;
  rate_limit: {
    per_minute: number;
    per_day: number;
  };
  hard_cap_enabled: boolean;
  auth_source: string;
  /** Whether further calls will be hard-rejected vs allowed-and-billed. */
  hard_capped?: boolean;
}

export interface AffordabilityRow {
  county_fips: string;
  median_household_income: number | null;
  median_sale_price: number | null;
  price_to_income_ratio: number | null;
  affordability_rating: "AFFORDABLE" | "MODERATE" | "EXPENSIVE" | "VERY_EXPENSIVE" | null;
  year: number | null;
  refreshed_at: string | null;
  state_fips?: string;
  county_name?: string | null;
  monthly_payment_estimate?: number | null;
  pct_income_for_housing?: number | null;
}

export interface AssessmentHistory {
  canonical_id: string;
  status: "ok" | "empty";
  records: Array<AssessmentHistoryRecord>;
  coverage: {
    assessment_years: Array<number>;
    tax_years: Array<number>;
    record_count: number;
    truncated: boolean;
    limit: number;
    note: string;
    source_product: string;
    source_version: string;
  };
}

export interface AssessmentHistoryRecord {
  /** Source-stated year; null means unknown. Never inferred from a snapshot or capture date. */
  assessment_year: number | null;
  /** Source-stated year; null means unknown. Never inferred from a snapshot or capture date. */
  tax_year: number | null;
  /** Snapshot vintage year, not an assessment year. */
  vintage_year: number | null;
  total_value: number | null;
  land_value: number | null;
  improvement_value: number | null;
  tax_amount: number | null;
  tax_paid_amount: number | null;
  vintage: string | null;
  source_url: string | null;
  source_as_of: string | null;
  value_basis: "assessed" | "appraised" | "market" | "taxable";
  source: string;
}

/** Mapbox-geocoded address suggestion. Use to disambiguate user input before calling /api/v1/lookup or /api/v1/parcels/{id}. */
export interface AutocompleteAddress {
  name: string | null;
  type: string | null;
  lat: number | null;
  lng: number | null;
  south: number | null;
  north: number | null;
  west: number | null;
  east: number | null;
}

export interface AutocompleteLocation {
  name?: string;
  type?: "city";
  state?: string;
  city?: string;
  lat?: number | null;
  lng?: number | null;
  parcel_count?: number;
}

export interface AutocompleteParcel {
  parcel_id: string;
  address: string | null;
  city: string | null;
  state_fips: string;
  state: string | null;
  county_fips: string;
  owner_name: string | null;
  latitude: number | null;
  longitude: number | null;
  total_assessed_value: number | null;
  type?: "parcel";
}

export interface AutocompleteResult {
  locations: Array<AutocompleteLocation>;
  parcels: Array<AutocompleteParcel>;
  addresses: Array<AutocompleteAddress>;
  degraded: boolean;
  owner_name_search?: {
    status: string;
    code: string;
    reason: string;
    note: string;
  };
  people_fields?: {
    status: string;
    code: string;
    reason: string;
    note: string;
  };
}

/** A co-owner of record: another owner the SAME assessor record names beside the owner (OWNER2, ownname2, ADD_OWNER ...), as the county published it. Same source and as-of date as the owner name. Account required, like every people field. */
export interface CoOwner {
  name?: string;
  basis?: "assessor_co_owner";
  source?: ContactSource;
  as_of?: string | null;
  as_of_basis?: "roll_year" | "release_vintage" | null;
  grade?: "A" | "B" | "C" | "D";
}

export interface ComparableSale {
  comp_parcel_id?: string;
  comp_sale_price?: number | null;
  comp_sale_date?: string | null;
  comp_sqft?: number | null;
  comp_beds?: number | null;
  comp_baths?: number | null;
  similarity_score?: number | null;
  distance_miles?: number | null;
}

export interface ContactSource {
  /** Who published the value, e.g. the county assessor. */
  authority: string;
  dataset: string;
  url: string | null;
}

export interface Contractor {
  contractor_name_normalized: string | null;
  contractor_license: string | null;
  permit_count: number | null;
  jurisdiction_count: number | null;
  state_count: number | null;
  county_count: number | null;
  total_permit_value: number | null;
  avg_permit_value: number | null;
  first_permit_date: string | null;
  last_permit_date: string | null;
  active_years: number | null;
  top_permit_types: string | null;
  /** Comma-delimited 2-letter state codes. */
  states_list: string | null;
  /** National rank, 1 = highest activity. */
  contractor_rank: number | null;
}

export interface CountyDetail {
  county_fips: string;
  market_stats: Array<{
    county_fips: string;
    state_fips: string;
    quarter: string | null;
    sale_count: number | null;
    median_sale_price: number | null;
    avg_sale_price: number | null;
    total_volume: number | null;
    price_yoy_pct: number | null;
    /** Average days on market. */
    avg_dom: number | null;
    refreshed_at: string | null;
  }>;
  affordability: Array<AffordabilityRow>;
  data_provenance: {
    market: {
      dataset: string | null;
      period_upper_bound: string | null;
      returned_records: number | null;
      oldest_record_refresh: string | null;
      newest_record_refresh: string | null;
      records_without_refresh: number | null;
      source_vintage: string | null;
      basis: string | null;
    };
    affordability: {
      dataset: string | null;
      period_upper_bound: number | null;
      returned_records: number | null;
      oldest_record_refresh: string | null;
      newest_record_refresh: string | null;
      records_without_refresh: number | null;
      source_vintage: string | null;
      income_measure: {
        stored_field: string | null;
        interpretation: string | null;
        source_tax_year: string | null;
        source_lineage_verified: boolean | null;
        limitations: string | null;
      };
      basis: string | null;
    };
  };
  parcel_summary: {
    parcel_count: number | null;
    avg_assessed_value: number | null;
  };
  flip_summary: {
    flip_count: number | null;
    avg_roi: number | null;
    avg_hold_days: number | null;
    total_profit: number | null;
  };
}

export interface Deed {
  document_number: string | null;
  recording_date: string | null;
  sale_date: string | null;
  document_type: string | null;
  sale_price: number | null;
  consideration: number | null;
  grantor_name: string | null;
  grantee_name: string | null;
  grantor_name_2: string | null;
  grantee_name_2: string | null;
  grantor_address: string | null;
  grantee_address: string | null;
  grantor_type: string | null;
  grantee_type: string | null;
  book: string | null;
  page: string | null;
  instrument_number: string | null;
  transfer_tax: number | null;
  excise_tax: number | null;
  sale_type: string | null;
  is_arm_length: boolean | null;
  legal_description: string | null;
  lot: string | null;
  block: string | null;
  subdivision: string | null;
  source_url: string | null;
  property_address: string | null;
  property_city: string | null;
  property_state: string | null;
  deed_type?: string | null;
}

/** One real sub-table (deeds, comps, or permits) in a dossier, with the exact serving relation it came from and that relation's own watermark (each is NOT pinned to the parcels epoch). */
export interface DossierSubSection {
  /** The serving relation the rows came from. */
  relation?: string;
  /** Watermark for this relation. */
  as_of?: string | null;
  status?: "ok" | "empty";
  row_count?: number;
  note?: string;
  rows?: Array<{ [key: string]: unknown }>;
}

export interface EntityAggregate {
  owner_name?: string;
  entity_type?: string;
  parcel_count?: number;
  total_value?: number | null;
  states_arr?: Array<string>;
}

export interface EntityOwnedParcel {
  county_fips: string;
  state_fips: string;
  parcel_id: string;
  owner_name: string | null;
  entity_type: "LLC" | "CORP" | "TRUST" | "LP" | "LTD" | "ASSOCIATION" | "OTHER_ENTITY" | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  total_assessed_value: number | null;
  lot_size_acres: number | null;
  year_built: number | null;
  zoning: string | null;
  land_use_desc: string | null;
  owner_address: string | null;
  owner_city: string | null;
  owner_state: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface EntitySummary {
  total_entities?: number;
  total_parcels?: number;
  llc_count?: number;
  corp_count?: number;
  trust_count?: number;
  lp_count?: number;
}

/**
 * Deprecated name for `Problem` (kept so existing references resolve). Every error is a `Problem`.
 *
 * @deprecated
 */
export type ErrorSchema = Problem;

export interface FullSearchResult {
  results: Array<{
    /** PropRaven parcel UUID (not the county APN; see `apn`). Pass it to GET /parcels/{id}. */
    parcel_id: string;
    apn: string | null;
    county_fips: string;
    state_fips: string;
    site_address: string | null;
    city: string | null;
    zip5: string | null;
    owner_name: string | null;
    total_value: number | null;
    latitude: number | null;
    longitude: number | null;
  }>;
  total: number;
  totalCapped: boolean;
  page: number;
  pages: number;
  hasMore: boolean;
  nextCursor: string | null;
  warnings?: Array<{
    code: string | null;
    param: string | null;
    message: string | null;
  }>;
  total_is_capped?: boolean;
}

export interface HighLandRatioParcel {
  county_fips: string;
  state_fips: string;
  parcel_id: string;
  owner_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  land_assessed_value: number | null;
  improvement_assessed_value: number | null;
  total_assessed_value: number | null;
  /** land / improvement, higher = more redevelopment potential. */
  land_improvement_ratio: number | null;
  lot_size_acres: number | null;
  year_built: number | null;
  zoning: string | null;
  land_use_desc: string | null;
  latitude: number | null;
  longitude: number | null;
}

/** One delivered lead. Signal-specific strength fields are flattened alongside the common keys (e.g. years_held + hold_tier for long_hold; profit + profit_pct + flip_tier for flip; land_improvement_ratio for high_land_ratio/distressed; property_count + states_list for portfolio_owner). */
export interface Lead {
  /** state_fips:county_fips3:parcel_id (the assessor APN, never a PropRaven UUID). Null on the owner-grain portfolio_owner cohort. MASKED to "37:183:..." in the free preview. */
  canonical_id: string;
  /** Situs address. House number stripped in the free preview. */
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  /** Total assessed value (sell price on the flip cohort). */
  assessed_value: number | null;
  /** Deterministic 1-100: the signal's base intent plus a bounded bonus from that signal's own strength column. Re-derivable, never random. */
  lead_score: number | null;
  owner_address: string | null;
  owner_city: string | null;
  owner_state: string | null;
  is_out_of_state: boolean | null;
  last_sale_date: string | null;
  last_sale_price: number | null;
  /** Withheld (null) in the free preview. Delivered leads go to accounts only. */
  owner_name: string | null;
  /** Present and true ONLY on free-preview sample leads. */
  masked: boolean | null;
  provenance: {
    source: string | null;
    source_datasets: Array<string | null>;
    /** The serving epoch's generated_at. */
    as_of: string | null;
    as_of_basis: string | null;
    serving_epoch: string | null;
    freshness_status: string | null;
    catalog_reference: {
      catalog_version: string | null;
      catalog_generated_at: string | null;
      catalog_seal: {
        algorithm: string | null;
        value: string | null;
        covers: string | null;
      };
    };
    note: string | null;
  };
  /** Delivered leads only: the owner's best mailing address (ONE column family, with its ZIP), flagged mail_ready. Absent from the free preview. */
  owner_contact?: LeadOwnerContact;
}

/** The delivered lead set (paid), or an honest empty result when nothing matched (count 0, quote total $0, no payment taken). */
export interface LeadFeed {
  signal?: string;
  /** The resolved request geography and filters. */
  geo?: {
    state?: string;
    state_fips?: string | null;
    county_fips?: string | null;
    zip?: string | null;
    value_min?: number | null;
    value_max?: number | null;
    limit?: number;
    mail_ready?: boolean;
  };
  /** Leads that will be / were delivered: min(matching rows, limit). This is the priced quantity. */
  count?: number;
  /** True when the count stopped at `limit` -- more leads exist beyond this pull. */
  count_capped_at_limit?: boolean;
  quote?: LeadsQuote;
  /** Present only when a known data gap explains an empty result (e.g. the owner-portfolio rollup's unpopulated state columns). Nothing is charged in that case. */
  coverage_note?: string;
  note?: string;
  /** Absent on an unpaid empty result (count 0). */
  paid_via?: "x402" | "credits" | "subscription";
  /** The delivered, UNMASKED leads. */
  leads?: Array<Lead>;
}

/** The FREE preview (preview=true). `count` and `quote` are exactly what a paid call would deliver and charge. */
export interface LeadFeedPreview {
  signal: string;
  /** The resolved request geography and filters. */
  geo: {
    state: string;
    state_fips: string;
    county_fips: string | null;
    zip: string | null;
    value_min: number | null;
    value_max: number | null;
    mail_ready: boolean;
    limit: number;
  };
  /** Leads that will be / were delivered: min(matching rows, limit). This is the priced quantity. */
  count: number;
  /** True when the count stopped at `limit` -- more leads exist beyond this pull. */
  count_capped_at_limit: boolean;
  quote: LeadsQuote;
  preview: true;
  /** Up to three MASKED leads: APN truncated to state:county, house number stripped, owner name withheld. Enough to judge the set, not enough to work it. */
  sample: Array<Lead>;
  note: string;
  /** Present only when a known data gap explains an empty result (e.g. the owner-portfolio rollup's unpopulated state columns). Nothing is charged in that case. */
  coverage_note?: string;
}

/** The owner's best mailing address on a delivered lead (account holders only). Lead pulls do not run the per-parcel permit phone lookup (`phone_status` is always not_checked); call GET /api/v1/owners/card for the full card. */
export interface LeadOwnerContact {
  /** unavailable = the contact read failed for this delivery (never a silently missing block). */
  status?: "resolved" | "not_found" | "unavailable";
  mailing?: MailingAddress | null;
  mail_ready?: boolean;
  phone_status?: "not_checked";
  hidden_low_confidence?: number;
}

/** The per-lead price quote. IDENTICAL in the free preview and in the 402/charge -- the previewed price is the paid price. */
export interface LeadsQuote {
  per_lead: Money;
  /** Unit price to 4dp: clamp($0.25 x S x V, $0.05, $1.00). */
  per_lead_usd: number;
  total: Money;
  /** The amount actually charged: min(count x per_lead, $20). */
  total_usd: number;
  /** total_usd in USDC atomic units (6dp) -- what the 402 advertises as maxAmountRequired. */
  total_atomic_usdc: string;
  asset: string;
  /** Leads priced = leads delivered. */
  count: number;
  signal: string;
  /** Asset-value tier, from the median assessed value of the delivered set. */
  tier: "low" | "mid" | "high" | "premium";
  tier_label: string;
  /** The dials, so the price is auditable. */
  breakdown: {
    base_per_lead: number;
    /** Signal-strength multiplier (absentee 1.0 ... distressed 1.9). */
    S: number;
    /** Asset-value tier multiplier (low 0.7, mid 1.0, high 1.5, premium 2.2). */
    V: number;
    /** Per-lead price BEFORE the [$0.05, $1.00] clamp. */
    per_lead_raw: number;
    /** count x per_lead BEFORE the $20 per-call cap. */
    total_raw: number;
    /** True when the $20 cap bound -- volume beyond it was free. */
    capped: boolean;
  };
  pay: Array<string | null>;
  note: string;
}

export interface Lender {
  lender_name_normalized?: string;
  mortgage_count?: number;
  total_mortgage_volume?: number | null;
  avg_mortgage_amount?: number | null;
  median_mortgage_amount?: number | null;
  county_count?: number;
  state_count?: number;
  states_list?: string | null;
  first_mortgage_date?: string | null;
  last_mortgage_date?: string | null;
  /** National rank, 1 = highest volume. */
  lender_rank?: number;
}

export interface LongHoldParcel {
  county_fips: string;
  state_fips: string;
  parcel_id: string;
  owner_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  total_assessed_value: number | null;
  last_sale_date: string | null;
  last_sale_price: number | null;
  years_held: number | null;
  year_built: number | null;
  building_age: number | null;
  lot_size_acres: number | null;
  hold_tier: "10-15yr" | "15-20yr" | "20-30yr" | "30yr+" | null;
  land_use_desc: string | null;
  latitude: number | null;
  longitude: number | null;
}

/** One mailing address, read from ONE address column family of the record (owner_mailing_* or owner_*), never a street from one family and a ZIP from the other. */
export interface MailingAddress {
  /** Where the address came from, e.g. owner_mailing, owner_address, deed_grantee. */
  basis: string;
  line1: string;
  city: string;
  state: string;
  zip5: string;
  zip4: string | null;
  /** Street, city, state and a 5-digit ZIP are all present and consistent. */
  mail_ready: boolean;
  po_box: boolean;
  /** The mailing address is the property itself (owner-occupied). */
  equals_situs: boolean;
  zip_conflict: boolean;
  /** Owner (name) cards only: how many of the owner's parcels carry this address. */
  parcels_citing: number;
  parcels_citing_basis: string;
  /** The address as one mailing label. */
  label: string;
  source: ContactSource;
  as_of: string;
  as_of_basis: string;
  /** A = the authority's own complete record; D = contradictory (hidden unless include_low_confidence=true). */
  grade: "A" | "B" | "C" | "D";
}

export interface MarketFlipsRow {
  county_fips: string;
  flip_count: number | null;
  /** Average profit percentage (e.g. 0.18 = 18%). */
  avg_roi: number | null;
  avg_hold_days: number | null;
  total_profit: number | null;
}

export interface MarketSummary {
  county_fips: string;
  year: number | null;
  quarter: number | null;
  transaction_count: number | null;
  median_price: number | null;
  avg_price: number | null;
  total_volume: number | null;
  cash_sale_count: number | null;
  cash_sale_pct: number | null;
  median_consideration: number | null;
  unique_buyers: number | null;
  unique_sellers: number | null;
  refreshed_at: string | null;
  state_fips: string;
  county_name: string | null;
  state: string | null;
  sale_count?: number;
  median_sale_price?: number | null;
  avg_sale_price?: number | null;
}

/** A money amount as a decimal string plus its currency code. */
export interface Money {
  amount: string;
  currency: string;
}

export interface Owner {
  owner_name_normalized: string | null;
  property_count: number | null;
  state_count: number | null;
  county_count: number | null;
  total_assessed_value: number | null;
  avg_assessed_value: number | null;
  total_acreage: number | null;
  states_list: number | string | null;
  portfolio_rank: number | null;
  /** Observed values include: CORP. */
  entity_type?: string | null;
  is_pe_aggregator?: boolean | null;
  is_entity_owned?: boolean | null;
  pe_parent_group?: string | null;
  pe_sponsor?: string | null;
  pe_confidence?: number | null;
  owner_entity_type?: string | null;
  is_absentee?: boolean | null;
  contact_card?: string | null;
  owner_name?: string;
  states?: Array<string>;
}

/** The owner card: the owner of record and how to reach them by mail, from what the publishing authorities released. */
export interface OwnerCard {
  /** { kind: "parcel", canonical_id } or { kind: "owner", parcels_considered, parcels_capped }. */
  subject: {
    kind: string;
    canonical_id: string;
  };
  owner: {
    name: string;
    name_status: "present" | "missing" | "placeholder" | "confidential";
    entity_type: string;
    roles: Array<unknown>;
  };
  contact: {
    owner_name: string;
    owner_name_status: string;
    owner_roles: Array<unknown>;
    owner_name_provenance: {
      source: {
        authority: string;
        dataset: string;
        url: string | null;
      };
      as_of: string;
      as_of_basis: string;
      grade: string;
    };
    /** The other owners the same assessor record names, in the record's order; never the owner again. Name mode: across the side-read parcels, distinct by name. */
    co_owners: Array<CoOwner>;
    /** none_listed is claimed only for a record whose state's co-owners were loaded from the release that serves it; not_checked when the lookup could not run, the state is not loaded yet, or the loaded row was read beside a different owner. */
    co_owner_status: "listed" | "none_listed" | "not_checked";
    mailing: MailingAddress;
    /** Parcel mode: a latest-deed grantee address naming the same owner, when it differs. */
    mailing_alternates: Array<MailingAddress>;
    /** Secretary of State principals (entity type, status, registered agent, officers) when the owner is an entity. */
    entity: {
      entity_type: string;
      status: string | null;
      state_of_formation: string | null;
      formation_date: string | null;
      registered_agent: string | null;
      officers: Array<unknown>;
      source: {
        authority: string;
        dataset: string;
        url: string | null;
      };
      as_of: string | null;
      as_of_basis: string | null;
      grade: string;
    };
    /** OWNER phones (owner role only) published on a building permit filed in the current owner's era and naming them (grade C): { e164, display, ext, phone_raw, role_basis, permit_ref, source, as_of, as_of_basis, grade }. */
    phones: Array<{ [key: string]: unknown }>;
    /** none_published is claimed only after the permit lookup ran; not_checked when it could not (timeout, no acquisition date, no owner name). */
    phone_status: "published" | "none_published" | "not_checked";
    emails: Array<{ [key: string]: unknown }>;
    none_published: Array<"phone" | "email" | null>;
    hidden_low_confidence: number;
    /** Applicant and contractor phones on the parcel's permits (name mode: across the side-read parcels), newest first, one per (role, number), at most 10: { role: applicant|contractor, role_basis, name, e164, display, ext, phone_raw, permit_ref, era: current_owner|prior_owner|unknown, source, as_of, as_of_basis, grade }. Never the owner's phone. */
    people_on_permits: Array<{ [key: string]: unknown }>;
    /** none_published only after the parcel's permits were read in full; not_checked when the read did not run or stopped at its cap. */
    people_on_permits_status: "listed" | "none_published" | "not_checked";
    other_addresses: Array<{
      parcel_id: string;
      state: string | null;
      county: string | null;
      kind: string | null;
      address: {
        line1: string | null;
        city: string | null;
        state: string | null;
        zip5: string | null;
        zip4: string | null;
        label: string | null;
        mail_ready: boolean | null;
        po_box: boolean | null;
      };
      same_as: string | null;
      grade: string | null;
      link: string | null;
      basis: string | null;
      label_note: string | null;
      evidence: Array<unknown>;
      mail_merge: boolean | null;
      owner_name_on_record: string | null;
      owner_roles: Array<unknown>;
      cited_by: Array<{
        parcel_id: string;
        state: string | null;
        county: string | null;
      }>;
      parcels_citing: number | null;
      source: {
        authority: string | null;
        dataset: string | null;
        url: string | null;
      };
      as_of: string | null;
      as_of_basis: string;
    }>;
    other_addresses_status: string;
    other_addresses_scope: {
      name_basis: string;
      spellings: number;
      parcels_read: number;
      capped: boolean;
      copies_skipped: number;
      parcels_linked: number;
      possible_found: number;
      possible_listed: number;
      possible_cap: number;
      possible_withheld_reason: string | null;
      listed_capped: boolean;
      evidence_providers: Array<{
        id: string;
        status: string | null;
      }>;
      co_owner_link: string;
    };
    /** Name mode: { parcels_checked, parcels_considered }. */
    co_owner_scope?: { [key: string]: unknown };
    /** Name mode: the owner's distinct mailing addresses, most-cited first. */
    mailing_addresses?: Array<MailingAddress>;
    /** Name mode: { parcels_checked, parcels_considered }. */
    phone_scope?: { [key: string]: unknown };
  };
  note: string;
}

export interface OwnerTransaction {
  document_number?: string;
  recording_date?: string | null;
  sale_date?: string | null;
  /** Recorded document type (Warranty Deed, Quit Claim, etc.). */
  document_type?: string | null;
  /** USD. Null when state is non-disclosure. */
  sale_price?: number | null;
  grantor_name?: string | null;
  grantee_name?: string | null;
  property_address?: string | null;
}

export interface Parcel {
  /** PropRaven parcel UUID. Accepted by GET /parcels/{id}. */
  id: string;
  /** 3-digit within-state county FIPS code (the 5-digit form is `state_fips` + `county_fips`). */
  county_fips: string;
  /** 2-digit state FIPS code. */
  state_fips: string;
  /** County-assigned parcel identifier (APN as the county publishes it). The canonical id is `state_fips:county_fips:parcel_id`. */
  parcel_id: string;
  address: string | null;
  normalized_address: string | null;
  city: string | null;
  /** State FIPS as a number (legacy duplicate of `state_fips`). */
  state: number | null;
  zip: string | null;
  zip5: string | null;
  zip_plus4: string | null;
  latitude: number | null;
  longitude: number | null;
  land_use_code: string | null;
  land_use_desc: string | null;
  total_assessed_value: number | null;
  land_assessed_value: number | null;
  improvement_assessed_value: number | null;
  last_sale_price: number | null;
  last_sale_date: string | null;
  market_value: number | null;
  avm_value: number | null;
  avm_confidence: string | null;
  avm_method: string | null;
  tax_amount: number | null;
  tax_year: number | null;
  /** Composite deal opportunity score from 0 to 100. */
  deal_score: number | null;
  price_per_sqft: number | null;
  comp_sale_price: number | null;
  comp_sale_date: string | null;
  comp_similarity_score: number | null;
  estimated_monthly_rent: number | null;
  estimated_annual_rent: number | null;
  rent_yield_pct: number | null;
  rental_confidence: string | null;
  gross_rent_multiplier: number | null;
  land_improvement_ratio: number | null;
  improvement_to_land_ratio: number | null;
  is_redevelopment_candidate: boolean | null;
  building_sqft: number | null;
  year_built: number | null;
  lot_size_acres: number | null;
  lot_size_sqft: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  stories: number | null;
  units: number | null;
  unit_count: number | null;
  construction_type: string | null;
  owner_name: string | null;
  owner_address: string | null;
  owner_city: string | null;
  owner_state: string | null;
  owner_zip: string | null;
  ownership_type: string | null;
  owner_entity_type: string | null;
  entity_type: string | null;
  is_entity_owned: boolean | null;
  is_absentee: boolean | null;
  is_pe_aggregator: boolean | null;
  owner_occupied_flag: boolean | null;
  data_quality_score: number | null;
  flood_zone: string | null;
  is_sfha: boolean | null;
  is_opportunity_zone: boolean | null;
  is_justice40: boolean | null;
  is_flip: boolean | null;
  deed_count: number | null;
  permit_count: number | null;
  permit_count_12mo: number | null;
  zoning: string | null;
  county_name: string | null;
  property_type: string | null;
  _guards: Array<string>;
  is_flip_basis: string;
  land_improvement_ratio_stored: number | null;
  land_improvement_ratio_basis: string;
  improvement_to_land_ratio_basis: string;
  is_absentee_basis: string;
  owner_state_norm: string | null;
  is_out_of_state: boolean | null;
  identity_gate: {
    applied: boolean | null;
    suppressed: Array<string | null>;
    reason: string | null;
    join_key_basis: string;
    twins_in_other_counties: number | null;
    coords_basis: string;
    unmeasured: Array<string | null>;
    served_under_doubt: Array<string | null>;
    note: string | null;
  };
  site_gate: {
    applied: boolean | null;
    suppressed: Array<string | null>;
    reason: string | null;
    labelled: Array<string | null>;
    mailing_basis: string;
    note: string | null;
  };
  derived_gate: {
    applied: boolean | null;
    suppressed: Array<string | null>;
    recomputed: Array<string | null>;
    unevaluated: Array<unknown>;
    reason: string | null;
    note: string | null;
  };
  rent_gate: {
    applied: boolean | null;
    suppressed: Array<string | null>;
    reason: string | null;
    rental_confidence: string | null;
    note: string | null;
  };
  county_name_basis: string;
  avm_method_family: string | null;
  avm_method_basis: string;
  is_flip_dominant_share_pct?: number | null;
  price_per_sqft_basis?: string;
}

/** The paid, provenance-first parcel dossier returned by GET /parcels/{id}/report. Every populated field is delivered as `{name, value}`; the receipts (source, as_of, confidence, coverage) come as the opt-in `provenance` map (`include_provenance=true`), keyed by field name. The deeds/comps/permits sub-tables carry real rows; the GeoJSON boundary is a separately-priced add-on omitted from the base payload. Nulls/empties are dropped (see meta.field_count), not returned as null; columns a `sections`/`fields` projection leaves out are named in `meta.projection.omitted_fields`. */
export interface ParcelDossier {
  /** Parcel identity. */
  parcel?: {
    /** state_fips:county_fips:parcel_id. */
    canonical_id?: string;
    /** PropRaven row UUID when the serving row carried one. */
    id?: string | null;
    state_fips?: string;
    /** 3-digit within-state county code (the parcels_serving convention). */
    county_fips?: string;
    /** Same as county_fips, named for its width. */
    county_fips_3?: string;
    county_fips_5?: string;
    parcel_id?: string;
    state?: string | null;
    address?: string | null;
  };
  /** Every populated field the delivery kept, as {name, value}. The receipt properties below are present only on the pure assembler's unprojected output; on a delivered dossier they live in the `provenance` map when `include_provenance=true` was requested. */
  fields?: Array<{
    name?: string;
    /** The field value (any JSON type). */
    value?: unknown;
    /** Field-level source label from the sealed catalog. */
    source?: string;
    as_of?: string | null;
    /** 0..1 FIELD-LEVEL coverage (this parcel's state, else national); null when uncatalogued. Not a per-cell probability -- see confidence_basis. */
    confidence?: number | null;
    confidence_basis?: string;
    national_coverage?: number | null;
    state_coverage?: number | null;
    /** prime|strong|good|partial|sparse|trace, re-derived from the applicable (state, else national) coverage. */
    tier?: string | null;
    grain?: string | null;
    section?: string | null;
    flags?: Array<string>;
    /** False when the column is absent from the sealed catalog (source unknown). */
    catalogued?: boolean;
  }>;
  /** Real sub-tables from the serving relations. */
  sections?: {
    deeds?: DossierSubSection;
    comps?: DossierSubSection;
    permits?: DossierSubSection;
  };
  /** The GeoJSON boundary add-on. In the base dossier included=false and geometry is absent; a phase-2 add-on purchase populates geometry. */
  boundary?: {
    code?: string;
    price?: Money;
    included?: boolean;
    purchasable?: boolean;
    available?: boolean | null;
    relation?: string;
    note?: string;
    /** GeoJSON geometry, present only for an entitled add-on purchase. */
    geometry?: unknown;
  };
  /** Dossier-level provenance and pricing. */
  meta?: {
    catalog_version?: string;
    catalog_seal?: string;
    contract_version?: number;
    snapshot_as_of?: string | null;
    generated_at?: string;
    /** The dossier product's contract price. The amount actually charged is the value-tiered per-parcel quote settled via x402 (or billed on a paid subscription) -- see the 402 accepts and /storefront/availability?parcel_id=. */
    price?: Money;
    currency?: string;
    /** Populated fields actually emitted. */
    field_count?: number;
    catalog_sellable_fields?: number;
    catalog_total_columns?: number;
    sections_included?: Array<string>;
    geometry_included?: boolean;
    confidence_basis?: string;
    provenance_note?: string;
    /** The data license that governs this dossier's data (the Data license section of the Terms of Use). */
    license?: string;
    entitlement?: {
      gated?: boolean;
      method?: string;
      note?: string;
    };
  };
  /** Present only when the buyer has no account (wallet-only x402 or credit token): the people fields in this dossier were withheld. */
  people_fields?: PeopleFieldsWithheld;
}

export interface ParcelGeoFeature {
  type: string | null;
  geometry: {
    type: string | null;
    /** GeoJSON polygon coordinate rings: outer ring first, then any inner rings. */
    coordinates: Array<Array<Array<number | null>>>;
  };
  properties: {
    id: string;
    county_fips: string;
    address: string | null;
    city: string | null;
    state: string | null;
    owner: string | null;
    value: number | null;
    type: string | null;
    year_built: number | null;
    parcel_id?: string;
    owner_name?: string | null;
    total_assessed_value?: number | null;
    property_type?: string | null;
    latitude?: number | null;
    longitude?: number | null;
  };
}

/** GeoJSON FeatureCollection of parcel polygons. Each feature's properties carry the basic parcel summary for popup rendering. */
export interface ParcelGeoJSON {
  type: string;
  features: Array<ParcelGeoFeature>;
}

export interface ParcelOwnerChangedEvent {
  event_type: "parcel.owner_changed";
  /** Deterministic. Use for idempotency. */
  event_id: string;
  occurred_at: string;
  /** Starts at 1; increments on retry. */
  delivery_attempt: number;
  /** Composite county_fips:parcel_id. */
  parcel_id: string;
  state_fips: string;
  county_fips: string;
  recorded_date?: string | null;
  /** Deed/document classification (e.g., Warranty Deed, Quitclaim Deed, Trust Transfer). */
  document_type?: string | null;
  document_number?: string | null;
  /** Grantor on the recorded deed. */
  prior_owner?: string | null;
  /** Grantee on the recorded deed. */
  new_owner?: string | null;
  /** True when the transfer is a real sale (price > 0, arm's-length). When true, subscribers to parcel.sold ALSO receive that event. */
  is_sale?: boolean | null;
  /** PropRaven ingest run that surfaced this event. */
  source_run_id?: string | null;
}

export interface ParcelPermitFiledEvent {
  event_type: "parcel.permit_filed";
  /** Deterministic. Use for idempotency. */
  event_id: string;
  occurred_at: string;
  /** Starts at 1; increments on retry. */
  delivery_attempt: number;
  /** Composite county_fips:parcel_id. */
  parcel_id: string;
  state_fips: string;
  county_fips: string;
  /** PropRaven internal permit id (stable across re-ingests). */
  permit_id: string;
  /** Jurisdiction-issued permit number. */
  permit_number?: string | null;
  /** Building, electrical, roofing, demolition, etc. */
  permit_type?: string | null;
  /** Filed, issued, in_review, final, expired, withdrawn. */
  permit_status?: string | null;
  filed_date?: string | null;
  issued_date?: string | null;
  description?: string | null;
  /** Declared job cost in USD. */
  estimated_cost?: number | null;
  contractor_name?: string | null;
  contractor_license?: string | null;
  applicant_name?: string | null;
  /** PropRaven jurisdiction id; join to /v1/jurisdictions. */
  jurisdiction_id?: string | null;
  /** PropRaven ingest run that surfaced this event. */
  source_run_id?: string | null;
}

export interface ParcelSoldEvent {
  event_type: "parcel.sold";
  /** Deterministic. Use for idempotency. */
  event_id: string;
  occurred_at: string;
  /** Starts at 1; increments on retry. */
  delivery_attempt: number;
  /** Composite county_fips:parcel_id. */
  parcel_id: string;
  state_fips: string;
  county_fips: string;
  sale_date?: string | null;
  /** May be null in non-disclosure states (KS, MS, TX, UT, WY, etc.). */
  sale_price_usd?: number | null;
  grantor?: string | null;
  grantee?: string | null;
  recorded_date?: string | null;
  /** PropRaven ingest run that surfaced this event. */
  source_run_id?: string | null;
}

/** Additive marker on a record (or list) whose people fields were withheld because the caller has no PropRaven account. People fields are owner names, owner mailing / owner-address columns, entity principals, recorded-document party names and addresses (grantor/grantee, buyer/seller, prior/new owner), permit applicant names and the resolved `owner_contact` block. Withheld keys are kept and set to null (lists of people records become []), so the record's shape does not change. Payment alone (an x402 `X-PAYMENT` header or a prepaid `X-CREDIT-TOKEN`) is not an account: send an API key (`Authorization: Bearer pz_...`) or call from a signed-in session. */
export interface PeopleFieldsWithheld {
  status: "withheld";
  code: "account_required";
  reason: "people_data_requires_account";
  note: string;
}

export interface Permit {
  permit_number: string | null;
  permit_type: string | null;
  permit_status: string | null;
  description: string | null;
  work_class: string | null;
  issued_date: string | null;
  completed_date: string | null;
  estimated_cost: number | null;
  fee_amount: number | null;
  contractor_name: string | null;
  contractor_license: string | null;
  site_address: string | null;
  city: string | null;
  type?: string;
  status?: "issued" | "pending" | "approved" | "expired" | "completed" | "denied";
  contractor?: string | null;
}

export interface PortfolioOwner {
  owner_name_normalized: string | null;
  owner_state: string | null;
  property_count: number | null;
  state_count: number | null;
  county_count: number | null;
  total_assessed_value: number | null;
  avg_assessed_value: number | null;
  total_acreage: number | null;
  states_list: string | null;
  /** National rank, 1 = largest portfolio. */
  portfolio_rank: number | null;
}

/** THE error body of every /api/v1 endpoint (RFC 7807 problem details, served as `application/problem+json`). `code` is the stable machine-readable identifier (e.g. invalid_parameter, authentication_required, account_required, monthly_cap_reached, query_timeout, not_found, method_not_allowed); `detail` is human-readable and never contains database or driver text. Validation failures add `errors: [{param, message}]`. `request_id` identifies the request for support. Per-code members (e.g. `reason`, `retry_after`, `used` / `limit` / `plan` / `upgrade`, `allow`) sit beside the core members. Exception: an x402 `402 Payment Required` keeps the x402 protocol envelope (`x402Version`, `accepts`). */
export interface Problem {
  type: string;
  title: string;
  status: number;
  detail: string;
  /** Stable machine-readable code. */
  code: string;
  /** Finer reason for `code`, e.g. people_data_requires_account. */
  reason?: string;
  /** Per-parameter validation failures (400 invalid_parameter). */
  errors?: Array<{
    param: string;
    message: string;
  }>;
  /** Support handle for this request. */
  request_id?: string;
  [key: string]: unknown;
}

export interface RiskAssessment {
  flood_zone: string | null;
  is_sfha: boolean | null;
  is_sfha_basis: string;
  seismic: {
    ss: number | null;
    s1: number | null;
    sds: number | null;
    sd1: number | null;
    sdc: string | null;
    pga_g: number | null;
    nri_earthquake_rating: string | null;
  };
  windstorm: {
    hurricane_rating: string | null;
    tornado_rating: string | null;
    power_wind_mw: number | null;
    storm_score: number | null;
    storm_top_event: string | null;
    storm_event_count_30y: number | null;
    storm_tornado_count_30y: number | null;
    storm_hurricane_count_30y: number | null;
    storm_hail_count_30y: number | null;
    storm_property_dmg_usd_30y: number | null;
    storm_deaths_30y: number | null;
  };
  wildfire: {
    county_name: string | null;
    risk_national_rank: number | null;
    bp_national_rank: number | null;
    risk_state_rank: number | null;
    bp_state_rank: number | null;
    risk_class?: "low" | "moderate" | "high" | "very_high" | "extreme" | null;
    /** Annual burn probability as a decimal. */
    burn_probability?: number | null;
  };
  air_quality: {
    year: number | null;
    /** Median Air Quality Index value. */
    median_aqi: number | null;
    max_aqi: number | null;
    good_days: number | null;
    moderate_days: number | null;
    unhealthy_days: number | null;
    category?: "good" | "moderate" | "unhealthy_sensitive" | "unhealthy" | "very_unhealthy" | "hazardous" | null;
  };
  crime: {
    /** Crime score from 0 (low) to 100 (high). */
    score: number | null;
    /** Observed values include: 3. */
    tier: number | null;
    tier_label: string | null;
    /** Observed values include: improving. */
    trend: string | null;
    violent_crime_rate: number | null;
    property_crime_rate: number | null;
  };
  withhold_gate: {
    applied: boolean | null;
    suppressed: Array<string | null>;
    reason: string | null;
    reasons: {
      power_wind_mw: string | null;
      storm_hurricane_count_30y: string | null;
    };
    withheld_on: string | null;
    note: string | null;
  };
  identity_gate: {
    applied: boolean | null;
    suppressed: Array<unknown>;
    reason: string | null;
    join_key_basis: string;
    twins_in_other_counties: number | null;
    coords_basis: string | null;
    unmeasured: Array<unknown>;
    served_under_doubt: Array<unknown>;
    note: string | null;
  };
}

/** A refusal that took nothing: the work was not done and nothing was charged. Retry after `Retry-After`. */
export interface ServiceUnavailable {
  error: string;
}

export interface TrafficStationHistory {
  direct_vpd: number | null;
  nearby_vpd: number | null;
  vpd_visibility_score: number | null;
  withhold_gate: {
    applied: boolean | null;
    suppressed: Array<string | null>;
    reason: string | null;
    reasons: {
      direct_vpd: string | null;
      nearby_vpd: string | null;
      vpd_visibility_score: string | null;
    };
    withheld_on: string | null;
    note: string | null;
  };
  points: Array<{
    date: string | null;
    vpd: number | null;
  }>;
  station: {
    id: string;
    station_id: string | null;
    route_name: string | null;
    functional_class: string | null;
    /** Most recent AADT count. */
    aadt_current: number | null;
    aadt_year: number | null;
    cagr_3yr: number | null;
    cagr_5yr: number | null;
    cagr_7yr: number | null;
    latitude: number | null;
    longitude: number | null;
  };
  time_series: Array<{
    year: number | null;
    aadt: number | null;
  }>;
  /** Year-keyed historical counts (newest last). */
  history?: Array<{
    year?: number;
    aadt?: number | null;
  }>;
}

export interface UccLien {
  filing_id?: string;
  debtor_name?: string | null;
  secured_party?: string | null;
  filing_date?: string | null;
  lapse_date?: string | null;
  filing_status?: string | null;
  match_method?: string | null;
  match_confidence?: number | null;
}

export interface Webhook {
  id?: string;
  /** Customer endpoint. Must be https://. */
  url?: string;
  /** First 14 chars of the secret (whsec_ + 8 hex). Use to identify the webhook in your dashboard; full secret is shown only at create time. */
  secret_prefix?: string;
  event_types?: Array<"parcel.sold" | "parcel.permit_filed" | "parcel.owner_changed">;
  filter_kind?: "parcel_ids" | "state_fips" | "county_fips";
  filter_value?: WebhookFilter;
  description?: string | null;
  is_active?: boolean;
  created_at?: string;
  disabled_at?: string | null;
  disabled_reason?: string | null;
  deliveries_attempted?: number;
  deliveries_succeeded?: number;
  last_delivery_at?: string | null;
  last_success_at?: string | null;
}

export interface WebhookCreate {
  /** Customer endpoint. https:// only. */
  url: string;
  /** Event types to subscribe to. NOTE: only parcel.sold is live in v1.0; others 501. */
  event_types: Array<"parcel.sold" | "parcel.permit_filed" | "parcel.owner_changed">;
  filter_kind: "parcel_ids" | "state_fips" | "county_fips";
  filter_value: WebhookFilter;
  /** Optional human-readable label for your dashboard. */
  description?: string | null;
}

export type WebhookCreated = Webhook & {
  /** **Shown once.** Copy and store server-side immediately. Used to sign every outgoing delivery. */
  secret: string;
  /** Signature-verification reminder. */
  hint: string;
};

export interface WebhookDelivery {
  id?: string;
  /** Deterministic event identifier — sha256(source || pk || event_type). Idempotent re-deliveries share this. */
  event_id?: string;
  event_type?: "parcel.sold" | "parcel.permit_filed" | "parcel.owner_changed";
  event_occurred_at?: string;
  status?: "pending" | "in_flight" | "succeeded" | "failed" | "dead_lettered";
  attempts?: number;
  last_attempt_at?: string | null;
  next_attempt_at?: string | null;
  last_response_status?: number | null;
  /** Truncated to ~1KB. */
  last_response_body?: string | null;
  last_error?: string | null;
  dead_lettered_at?: string | null;
  created_at?: string;
}

/** Shape varies with filter_kind. parcel_ids: explicit list. state_fips: all parcels in a state. county_fips: all parcels in a county within a state. */
export type WebhookFilter = {
  /** Parcels to subscribe to, 1–1000: canonical ids `state_fips:county_fips:parcel_id` (preferred; the `canonical_id` other endpoints return), legacy `SSCCC:parcel_id`, parcel UUIDs, or a bare parcel_id that names exactly ONE served parcel. parcel_id is county-scoped, so a bare id that names several parcels is refused with 422 `parcel_identity_unresolved` listing the candidate canonical ids. Stored and matched on the full identity; deliveries carry `canonical_id`. */
  parcel_ids: Array<string>;
} | {
  /** 2-digit state FIPS — subscribe to all parcels in this state. */
  state_fips: string;
} | {
  state_fips: string;
  /** 3-digit county FIPS (within the state) — subscribe to all parcels in this county. */
  county_fips: string;
};

export interface WebhookQuota {
  /** Max simultaneous active webhook endpoints on this tier. */
  maxEndpoints: number;
  /** Max event deliveries per UTC day on this tier. */
  maxEventsPerDay: number;
}

/** x402 (HTTP 402) payment-required body (x402 protocol v1). `accepts` lists the payment requirements a wallet-bearing agent signs to pay per call. Returned by both paid products: the per-parcel dossier (GET /api/v1/parcels/{id}/report) and the per-lead feed (GET /api/v1/leads/find). Flow: sign an EIP-3009 transferWithAuthorization for accepts[0].maxAmountRequired, base64 the PaymentPayload into the `X-PAYMENT` request header, and retry. The response also carries `Link: <https://propraven.com/terms#data-license>; rel="license"`, the data license that governs what the payment buys. */
export interface X402PaymentRequired {
  /** x402 protocol version advertised (1 = the base exact scheme with maxAmountRequired). */
  x402Version?: number;
  /** Human-readable reason payment is required or was rejected. */
  error?: string;
  /** The payment requirements to satisfy (one entry: the dossier, or the lead pull). */
  accepts?: Array<{
    scheme?: string;
    /** base-sepolia (testnet default) or base (mainnet). */
    network?: string;
    /** The DYNAMIC price in the asset's atomic units (USDC, 6 decimals). Dossier: clamp($5 x V x R x F, $2, $20) per parcel. Lead feed: min(count x clamp($0.25 x S x V, $0.05, $1.00), $20) per pull. 2000000 = $2.00, 6250000 = $6.25, 20000000 = the $20 cap. Sign for exactly this amount. */
    maxAmountRequired?: string;
    /** The absolute URL being paid for. */
    resource?: string;
    description?: string;
    mimeType?: string;
    /** Receiving wallet address. */
    payTo?: string;
    /** How long the quote is valid before the client must re-fetch it. */
    maxTimeoutSeconds?: number;
    /** ERC-20 asset contract address (USDC on the given network). */
    asset?: string;
    /** The asset's EIP-712 domain { name, version } (USDC = { name: 'USDC', version: '2' }) -- required by the exact EVM scheme so the facilitator can reconstruct the domain separator and verify the transferWithAuthorization signature. */
    extra?: {
      name?: string;
      version?: string;
    };
  }>;
}

// ---- operation params and responses ----

// GET /api/v1/account/usage (account.usage)

/** Parameters for `account.usage` (the operation takes none). */
export type AccountUsageParams = Record<string, never>;

/** Success response of `account.usage` (GET /api/v1/account/usage). */
export type AccountUsageResponse = AccountUsage;

// GET /api/v1/cmbs/exposure (cmbs.exposure)

/** Parameters for `cmbs.exposure`. */
export interface CmbsExposureParams {
  /**
   * Parcel id (single-parcel mode).
   *
   * Query parameter `id`.
   */
  id?: string;
  /**
   * Borrower or sponsor name (portfolio mode).
   *
   * Query parameter `owner`.
   */
  owner?: string;
}

/** Success response of `cmbs.exposure` (GET /api/v1/cmbs/exposure). */
export interface CmbsExposureResponse {
  mode: string | null;
  matched: boolean | null;
  reason: string | null;
  subject: {
    canonical_id: string;
    parcel_id: string;
    state_fips: string;
    county_fips: string;
  };
  note: string | null;
  loans: Array<unknown>;
  properties: Array<unknown>;
  data_as_of: {
    snapshot_assembled: string | null;
    figures_as_of: string | null;
    refreshed_since: boolean | null;
    statement: string | null;
    source: string | null;
  };
  coverage: {
    scope: string | null;
    trusts: number | null;
    loans: number | null;
    properties: number | null;
    counts_source: string | null;
    edgar_roster: {
      reporting_month: string | null;
      cmbs_trusts_filing_abs_ee: number | null;
      of_which_served: number | null;
      measured_on: string | null;
    };
    excluded: {
      non_cmbs_trusts: number | null;
      non_cmbs_note: string | null;
      depositor_ciks: number | null;
      depositor_note: string | null;
      property_rows_stored_as_loans: number | null;
      unverified_ciks: number | null;
    };
    not_covered: Array<string | null>;
  };
  field_status: {
    is_specially_serviced: string | null;
    is_on_watchlist: string | null;
    is_interest_only: string | null;
    borrower_name: string | null;
    sponsor_name: string | null;
    loan_type: string | null;
    payment_status: string | null;
    note_rate: string | null;
    current_balance: string | null;
    uw_dscr: string | null;
    uw_ltv: string | null;
    uw_occupancy: string | null;
    uw_noi: string | null;
    appraised_value: string | null;
    current_dscr: string | null;
    current_ltv: string | null;
    current_occupancy: string | null;
    current_noi: string | null;
    current_debt_yield: string | null;
    properties: {
      loan_id: string | null;
      appraised_value: string | null;
      allocated_loan_amount: string | null;
      current_noi: string | null;
      current_occupancy: string | null;
      latitude: string | null;
      longitude: string | null;
      matched_parcel_id: string | null;
    };
  };
}

// GET /api/v1/cohorts/{id}/export (cohorts.export)

/** Parameters for `cohorts.export`. */
export interface CohortsExportParams {
  /**
   * true -> the free row count and exact quote, no data.
   *
   * Query parameter `preview`.
   */
  preview?: boolean;
  /**
   * A prepaid credit token (pzc_...) to draw the per-row price from.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken?: string;
  /**
   * x402 payment for the quoted total, sent together with your account credentials.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `cohorts.export` (GET /api/v1/cohorts/{id}/export). */
export type CohortsExportResponse = string | { [key: string]: unknown };

// GET /api/v1/cohorts (cohorts.list)

/** Parameters for `cohorts.list` (the operation takes none). */
export type CohortsListParams = Record<string, never>;

/** Success response of `cohorts.list` (GET /api/v1/cohorts). */
export interface CohortsListResponse {
  cohorts: Array<{
    id: string;
    name: string | null;
    color: string | null;
    created_at: string | null;
    parcel_count: number | null;
    total_value: number | null;
  }>;
}

// GET /api/v1/coverage (coverage.get)

/** Parameters for `coverage.get`. */
export interface CoverageGetParams {
  /**
   * State FIPS code or abbreviation to filter coverage to a specific state and return county-level breakdown.
   *
   * Query parameter `state`.
   */
  state?: string;
}

/** Success response of `coverage.get` (GET /api/v1/coverage). */
export interface CoverageGetResponse {
  data: Array<{
    state_fips: string;
    county_fips?: string;
    county_name?: string | null;
    parcel_count: number | null;
    with_address: number | null;
    with_geocode: number | null;
    with_owner: number | null;
    with_value: number | null;
    last_updated: string | null;
    population?: number | null;
    with_geometry: number | null;
    state_abbr?: string | null;
    county_count?: number | null;
    total_counties?: number | null;
    total_population?: number | null;
    covered_population?: number | null;
    population_coverage_pct?: number | null;
    state_name?: string;
    geocoded_pct?: number;
    owner_pct?: number;
    value_pct?: number;
  }>;
  state?: string;
  total_counties?: number;
  total_counties_us?: number;
  total_population_us?: number;
  covered_population_us?: number;
  population_coverage_pct?: number;
  national_counts?: {
    parcel_counts_epoch: string;
    parcels: number;
    mapped_locations: number;
    geocoded_parcels: number;
    rows: number;
    parcel_count_definitions: {
      parcels: string;
      mapped_locations: string;
      geocoded_parcels: string;
      rows: string;
    };
  };
  total_parcels?: number;
  states_covered?: number;
}

// GET /api/v1/coverage/map (coverage.map)

/** Parameters for `coverage.map` (the operation takes none). */
export type CoverageMapParams = Record<string, never>;

/** Success response of `coverage.map` (GET /api/v1/coverage/map). */
export interface CoverageMapResponse {
  meta: {
    epoch: string;
    generated_at: string;
    totals: {
      parcels: number;
      with_owner: number;
      with_address: number;
      with_geometry: number;
      with_value: number;
      counties: number;
    };
  };
  counties: Array<{
    s: string | null;
    c: number | string | null;
    nm: string | null;
    n: number | null;
    o: number | null;
    a: number | null;
    g: number | null;
    v: number | null;
    lat: number | null;
    lon: number | null;
  }>;
}

// GET /api/v1/storefront/credits/balance (credits.balance)

/** Parameters for `credits.balance`. */
export interface CreditsBalanceParams {
  /**
   * The pzc_ credit token.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken: string;
}

/** Success response of `credits.balance` (GET /api/v1/storefront/credits/balance). */
export type CreditsBalanceResponse = { [key: string]: unknown };

// GET /api/v1/storefront/credits/topup (credits.topup)

/** Parameters for `credits.topup`. */
export interface CreditsTopupParams {
  /**
   * Whole USD to fund ($1–$1000).
   *
   * Query parameter `amount`.
   */
  amount: number;
  /**
   * Optional existing pzc_ token to top up in place.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken?: string;
  /**
   * Base64 x402 PaymentPayload to fund the balance.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `credits.topup` (GET /api/v1/storefront/credits/topup). */
export type CreditsTopupResponse = { [key: string]: unknown };

// GET /api/v1/crime/lookup (crime.lookup)

/** Parameters for `crime.lookup`. */
export interface CrimeLookupParams {
  /**
   * Latitude.
   *
   * Query parameter `lat`.
   */
  lat: number;
  /**
   * Longitude.
   *
   * Query parameter `lng`.
   */
  lng: number;
}

/** Success response of `crime.lookup` (GET /api/v1/crime/lookup). */
export interface CrimeLookupResponse {
  crime: {
    crime_score: number | null;
    crime_tier: number | null;
    crime_trend: string | null;
    county_violent_crime_rate: number | null;
    county_property_crime_rate: number | null;
  };
}

// GET /api/v1/deals/absentee (deals.absentee)

/** Parameters for `deals.absentee`. */
export interface DealsAbsenteeParams {
  /**
   * Filter by county FIPS code.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * Filter by state FIPS code.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Minimum assessed value.
   *
   * Query parameter `min_value`.
   */
  min_value?: number;
  /**
   * Only return owners whose mailing address is in a different state.
   *
   * Query parameter `out_of_state`.
   */
  out_of_state?: boolean;
  /** Query parameter `limit`. */
  limit?: number;
  /** Query parameter `offset`. */
  offset?: number;
}

/** Success response of `deals.absentee` (GET /api/v1/deals/absentee). */
export interface DealsAbsenteeResponse {
  data: Array<{
    county_fips: string;
    state_fips: string;
    parcel_id: string;
    owner_name: string | null;
    property_address: string | null;
    property_city: string | null;
    property_state: string | null;
    owner_address: string | null;
    owner_city: string | null;
    owner_state: string | null;
    total_assessed_value: number | null;
    last_sale_date: string | null;
    last_sale_price: number | null;
    is_out_of_state: boolean | null;
  }>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `deals.absenteeAll`. */
export type DealsAbsenteeItem = PageItem<DealsAbsenteeResponse, "data">;

// GET /api/v1/deals/contractors (deals.contractors)

/** Parameters for `deals.contractors`. */
export interface DealsContractorsParams {
  /**
   * Contractor name search (case-insensitive substring).
   *
   * Query parameter `search`.
   */
  search?: string;
  /**
   * Minimum permit count to include.
   *
   * Query parameter `min_permits`.
   */
  min_permits?: number;
  /**
   * 2-letter state filter.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * Minimum total declared permit value, USD.
   *
   * Query parameter `min_value`.
   */
  min_value?: number;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.contractors` (GET /api/v1/deals/contractors). */
export interface DealsContractorsResponse {
  data: Array<Contractor>;
  total: number;
  limit: number;
  offset: number;
  source_quality: {
    geography_status: string;
    profile_refresh_observed_at: string;
    quality_checked_at: string;
    scope: string;
    reason: string;
  };
}

/** One item yielded by `deals.contractorsAll`. */
export type DealsContractorsItem = PageItem<DealsContractorsResponse, "data">;

// GET /api/v1/deals/entities (deals.entities)

/** Parameters for `deals.entities`. */
export interface DealsEntitiesParams {
  /**
   * 5-digit county FIPS filter.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * 2-digit state FIPS filter.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Filter by entity classification. Case-insensitive; any other value is a 400.
   *
   * Query parameter `entity_type`.
   */
  entity_type?: "LLC" | "CORP" | "TRUST" | "LP" | "LTD" | "ASSOCIATION" | "OTHER_ENTITY";
  /**
   * Owner-name substring search.
   *
   * Query parameter `search`.
   */
  search?: string;
  /**
   * Minimum assessed value, USD.
   *
   * Query parameter `min_value`.
   */
  min_value?: number;
  /**
   * Zoning substring filter.
   *
   * Query parameter `zoning`.
   */
  zoning?: string;
  /**
   * If true, returns aggregated entity rankings with summary stats instead of per-parcel rows.
   *
   * Query parameter `top`.
   */
  top?: boolean;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.entities` (GET /api/v1/deals/entities). */
export type DealsEntitiesResponse = {
  data: Array<EntityOwnedParcel>;
  total: number;
  limit: number;
  offset: number;
} | {
  data?: Array<EntityAggregate>;
  summary?: EntitySummary;
  total?: number;
  limit?: number;
  offset?: number;
};

/** One item yielded by `deals.entitiesAll`. */
export type DealsEntitiesItem = PageItem<DealsEntitiesResponse, "data">;

// GET /api/v1/deals/flips (deals.flips)

/** Parameters for `deals.flips`. */
export interface DealsFlipsParams {
  /**
   * Filter by county FIPS code.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * Filter by state FIPS code.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Filter by hold time between the two sales: QUICK_FLIP (< 180 days), SHORT_HOLD (180–364 days), MEDIUM_HOLD (365 days to 24 months). Case-insensitive. The former spellings quick / standard / long are accepted as deprecated aliases. Any other value is a 400.
   *
   * Query parameter `flip_tier`.
   */
  flip_tier?: "QUICK_FLIP" | "SHORT_HOLD" | "MEDIUM_HOLD";
  /**
   * Minimum estimated profit.
   *
   * Query parameter `min_profit`.
   */
  min_profit?: number;
  /**
   * Set to 'flippers' to return a ranked list of top flippers instead of individual flips.
   *
   * Query parameter `view`.
   */
  view?: "flippers";
  /** Query parameter `limit`. */
  limit?: number;
  /** Query parameter `offset`. */
  offset?: number;
}

/** Success response of `deals.flips` (GET /api/v1/deals/flips). */
export interface DealsFlipsResponse {
  data: Array<{
    county_fips: string;
    state_fips: string;
    parcel_id: string;
    address: string | null;
    city: string | null;
    state: string | null;
    buy_date: string | null;
    buy_price: number | null;
    buyer_name: string | null;
    sell_date: string | null;
    sell_price: number | null;
    seller_name: string | null;
    hold_days: number | null;
    profit: number | null;
    profit_pct: number | null;
    flip_tier: "QUICK_FLIP" | "SHORT_HOLD" | "MEDIUM_HOLD" | null;
  }>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `deals.flipsAll`. */
export type DealsFlipsItem = PageItem<DealsFlipsResponse, "data">;

// GET /api/v1/deals/high-land-ratio (deals.highLandRatio)

/** Parameters for `deals.highLandRatio`. */
export interface DealsHighLandRatioParams {
  /**
   * 5-digit county FIPS filter.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * 2-digit state FIPS filter.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Minimum land/improvement ratio.
   *
   * Query parameter `min_ratio`.
   */
  min_ratio?: number;
  /**
   * Minimum land assessed value, USD.
   *
   * Query parameter `min_value`.
   */
  min_value?: number;
  /**
   * Zoning substring filter.
   *
   * Query parameter `zoning`.
   */
  zoning?: string;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.highLandRatio` (GET /api/v1/deals/high-land-ratio). */
export interface DealsHighLandRatioResponse {
  data: Array<HighLandRatioParcel>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `deals.highLandRatioAll`. */
export type DealsHighLandRatioItem = PageItem<DealsHighLandRatioResponse, "data">;

// GET /api/v1/deals/lenders (deals.lenders)

/** Parameters for `deals.lenders`. */
export interface DealsLendersParams {
  /**
   * Lender name substring search.
   *
   * Query parameter `search`.
   */
  search?: string;
  /**
   * Minimum mortgage count.
   *
   * Query parameter `min_mortgages`.
   */
  min_mortgages?: number;
  /**
   * 2-letter state filter.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.lenders` (GET /api/v1/deals/lenders). */
export interface DealsLendersResponse {
  data?: Array<Lender>;
  total?: number;
  limit?: number;
  offset?: number;
}

/** One item yielded by `deals.lendersAll`. */
export type DealsLendersItem = PageItem<DealsLendersResponse, "data">;

// GET /api/v1/deals/long-hold (deals.longHold)

/** Parameters for `deals.longHold`. */
export interface DealsLongHoldParams {
  /**
   * 5-digit county FIPS filter.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * 2-digit state FIPS filter.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Minimum years held.
   *
   * Query parameter `min_years`.
   */
  min_years?: number;
  /**
   * Filter by hold-period tier. Case-insensitive; any other value is a 400.
   *
   * Query parameter `hold_tier`.
   */
  hold_tier?: "10-15yr" | "15-20yr" | "20-30yr" | "30yr+";
  /**
   * Minimum assessed value, USD.
   *
   * Query parameter `min_value`.
   */
  min_value?: number;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.longHold` (GET /api/v1/deals/long-hold). */
export interface DealsLongHoldResponse {
  data: Array<LongHoldParcel>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `deals.longHoldAll`. */
export type DealsLongHoldItem = PageItem<DealsLongHoldResponse, "data">;

// GET /api/v1/deals/market (deals.market)

/** Parameters for `deals.market`. */
export interface DealsMarketParams {
  /**
   * Switch to the affordability-index dataset.
   *
   * Query parameter `view`.
   */
  view?: "affordability";
  /**
   * 5-digit county FIPS filter.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * 2-digit state FIPS filter.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Year filter.
   *
   * Query parameter `year`.
   */
  year?: string;
  /**
   * Affordability-rating filter (only meaningful with view=affordability). Case-insensitive; any other value is a 400.
   *
   * Query parameter `rating`.
   */
  rating?: "AFFORDABLE" | "MODERATE" | "EXPENSIVE" | "VERY_EXPENSIVE";
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.market` (GET /api/v1/deals/market). */
export type DealsMarketResponse = {
  data: Array<MarketSummary>;
  data_provenance: {
    dataset: string;
    period_upper_bound: string;
    returned_records: number;
    oldest_record_refresh: string | null;
    newest_record_refresh: string | null;
    records_without_refresh: number;
    source_vintage: string | null;
    basis: string;
  };
  total: number;
  limit: number;
  offset: number;
} | {
  data?: Array<AffordabilityRow>;
  total?: number;
  limit?: number;
  offset?: number;
};

/** One item yielded by `deals.marketAll`. */
export type DealsMarketItem = PageItem<DealsMarketResponse, "data">;

// GET /api/v1/deals/portfolio-owners (deals.portfolioOwners)

/** Parameters for `deals.portfolioOwners`. */
export interface DealsPortfolioOwnersParams {
  /**
   * Minimum properties owned.
   *
   * Query parameter `min_properties`.
   */
  min_properties?: number;
  /**
   * 2-letter owner mailing state filter.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * Minimum total portfolio assessed value, USD.
   *
   * Query parameter `min_value`.
   */
  min_value?: number;
  /**
   * Owner name substring search.
   *
   * Query parameter `search`.
   */
  search?: string;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `deals.portfolioOwners` (GET /api/v1/deals/portfolio-owners). */
export interface DealsPortfolioOwnersResponse {
  data: Array<PortfolioOwner>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `deals.portfolioOwnersAll`. */
export type DealsPortfolioOwnersItem = PageItem<DealsPortfolioOwnersResponse, "data">;

// GET /api/v1/freshness/datasets (freshness.datasets)

/** Parameters for `freshness.datasets` (the operation takes none). */
export type FreshnessDatasetsParams = Record<string, never>;

/** Success response of `freshness.datasets` (GET /api/v1/freshness/datasets). */
export interface FreshnessDatasetsResponse {
  contract_version: number;
  generated_at: string;
  status: string;
  datasets: Array<{
    dataset: string | null;
    availability: string | null;
    freshness: string | null;
    freshness_reason: string | null;
    refresh: {
      source_watermark: string | null;
      source_age_hours: number | null;
      evaluated_at: string | null;
      published_at: string | null;
      status: string | null;
      warning_reason: string | null;
    };
    record_activity: {
      latest_at: string | null;
      evaluated_at: string | null;
      basis: string | null;
      age_hours: number | null;
      max_age_hours: number | null;
      status: string | null;
    };
    coverage: {
      status: string | null;
      unit: string | null;
      covered: number | null;
      as_of: string | null;
    };
  }>;
}

// GET /api/v1/freshness (freshness.get)

/** Parameters for `freshness.get` (the operation takes none). */
export type FreshnessGetParams = Record<string, never>;

/** Success response of `freshness.get` (GET /api/v1/freshness). */
export interface FreshnessGetResponse {
  content_as_of: string;
  last_enriched_at: string;
  content_date_basis: string;
  content_date_note: string;
  content_median_date: string;
  content_max_date: string;
  content_oldest_date: string;
  content_source_count: number;
  content_active_source_count: number;
  swapped_at: string;
  updated_at: string;
  snapshot_built_at: string;
  parcel_count: number;
}

// GET /api/v1/leads/find (leads.find)

/** Parameters for `leads.find`. */
export interface LeadsFindParams {
  /**
   * Which qualified cohort to pull from. Priced by strength: absentee (1.0x, widest) < long_hold (1.1x) < entity_owned (1.15x) < portfolio_owner (1.25x) < high_land_ratio (1.4x) < flip (1.6x) < distressed (1.9x).
   *
   * Query parameter `signal`.
   */
  signal: "absentee" | "long_hold" | "entity_owned" | "portfolio_owner" | "high_land_ratio" | "flip" | "distressed";
  /**
   * REQUIRED 2-letter USPS state code. Every pull is pruned to one state partition.
   *
   * Query parameter `state`.
   */
  state: string;
  /**
   * 3-digit within-state code ("183") or 5-digit state+county ("37183").
   *
   * Query parameter `county`.
   */
  county?: string;
  /**
   * 5-digit ZIP. Supported only on the long_hold and entity_owned cohorts (the other source relations carry no ZIP column) -- a zip on any other signal returns 400.
   *
   * Query parameter `zip`.
   */
  zip?: string;
  /**
   * Minimum assessed value (sell price for the flip cohort), USD.
   *
   * Query parameter `value_min`.
   */
  value_min?: number;
  /**
   * Maximum assessed value (sell price for the flip cohort), USD.
   *
   * Query parameter `value_max`.
   */
  value_max?: number;
  /**
   * How many leads to buy. Default 25, max 200. You pay for min(matching rows, limit).
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * true -> the FREE preview (count + quote + up to three masked sample leads, no payment). Omit or false -> the paid call.
   *
   * Query parameter `preview`.
   */
  preview?: boolean;
  /**
   * true -> only parcels whose record carries a complete mailing address (street, city, state, 5-digit ZIP) in ONE column family. Parcel-grain signals only (400 on portfolio_owner). Each delivered lead's `owner_contact.mail_ready` is the final word. Narrow with `county` in large states: the filter checks every candidate.
   *
   * Query parameter `mail_ready`.
   */
  mail_ready?: boolean;
  /**
   * x402 payment, sent TOGETHER with your account credentials (Authorization: Bearer pz_...) -- a payment alone is not an account and is refused with 401 before it is verified: a base64-encoded signed x402 PaymentPayload (EIP-3009 transferWithAuthorization over USDC on Base). The signed amount must equal this pull's quoted maxAmountRequired (see the 402 body, or call with preview=true first). Ignored on a preview call, which is free.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `leads.find` (GET /api/v1/leads/find). */
export type LeadsFindResponse = LeadFeedPreview | LeadFeed;

// POST /api/v1/lookup/batch (lookup.batch)

/** Parameters for `lookup.batch`. */
export interface LookupBatchParams {
  /**
   * Parcel UUIDs, APNs, canonical ids or street addresses (≤ 500).
   *
   * Body field `queries`.
   */
  queries: Array<string>;
}

/** Success response of `lookup.batch` (POST /api/v1/lookup/batch). */
export interface LookupBatchResponse {
  items: Array<{
    query: string | null;
    match_type: string | null;
    parcel: {
      id: string;
      apn: string | null;
      address: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      county_fips: string;
      state_fips: string;
      owner_name: string | null;
      land_value: number | null;
      improvement_value: number | null;
      total_assessed_value: number | null;
      last_sale: {
        date: string | null;
        price: number | null;
      };
      /** (Only null in observed responses.) */
      permits: unknown;
      hazard_score: number | null;
      latitude: number | null;
      longitude: number | null;
      has_geometry: boolean | null;
    } | null;
  }>;
  lookups_charged: number;
  unavailable_fields: Array<string | null>;
  tier: string;
  notice: string;
}

// GET /api/v1/lookup (lookup.get)

/** Parameters for `lookup.get`. */
export interface LookupGetParams {
  /**
   * PropRaven parcel UUID or APN (min 2 chars).
   *
   * Query parameter `q`.
   */
  q: string;
}

/** Success response of `lookup.get` (GET /api/v1/lookup). */
export interface LookupGetResponse {
  found: boolean | null;
  query: string | null;
  parcel: {
    id: string;
    apn: string | null;
    county_fips: string;
    state_fips: string;
    address: string | null;
    city: string | null;
    zip: string | null;
    latitude: number | null;
    longitude: number | null;
    total_assessed_value: number | null;
    last_sale_price: number | null;
    land_use_code: string | null;
    owner_name: string | null;
  };
}

// GET /api/v1/market/counties (market.counties)

/** Parameters for `market.counties`. */
export interface MarketCountiesParams {
  /**
   * Filter by state FIPS code.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Minimum number of sales in the period to include a county.
   *
   * Query parameter `min_sales`.
   */
  min_sales?: number;
  /**
   * Exact quarter, e.g. 2025Q4; any other format is a 400.
   *
   * Query parameter `quarter`.
   */
  quarter?: string;
  /**
   * Sort column. The former spellings median_price and yoy_change are accepted as deprecated aliases; any other value is a 400.
   *
   * Query parameter `sort`.
   */
  sort?: "median_sale_price" | "sale_count" | "total_volume" | "price_yoy_pct";
  /**
   * Sort direction (case-insensitive); any other value is a 400.
   *
   * Query parameter `order`.
   */
  order?: "asc" | "desc";
  /** Query parameter `limit`. */
  limit?: number;
  /** Query parameter `offset`. */
  offset?: number;
}

/** Success response of `market.counties` (GET /api/v1/market/counties). */
export interface MarketCountiesResponse {
  data: Array<{
    county_fips: string;
    state_fips: string;
    county_name: string | null;
    state: string | null;
    refreshed_at: string | null;
    quarter: string | null;
    sale_count: number | null;
    median_sale_price: number | null;
    avg_sale_price: number | null;
    total_volume: number | null;
    price_yoy_pct: number | null;
    avg_dom: number | null;
    state_abbr?: string;
    median_price?: number;
    avg_price?: number;
    /** Year-over-year median price change as a decimal (e.g., 0.05 = 5%). */
    yoy_change?: number;
    avg_days_on_market?: number;
  }>;
  summary: {
    total_counties: number;
    total_sales: number;
    overall_median_price: number;
    total_volume: number;
    avg_yoy_pct: number;
  };
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `market.countiesAll`. */
export type MarketCountiesItem = PageItem<MarketCountiesResponse, "data">;

// GET /api/v1/market/counties/{fips} (market.county)

/** Parameters for `market.county` (the operation takes none). */
export type MarketCountyParams = Record<string, never>;

/** Success response of `market.county` (GET /api/v1/market/counties/{fips}). */
export type MarketCountyResponse = CountyDetail;

// GET /api/v1/market/flips (market.flips)

/** Parameters for `market.flips`. */
export interface MarketFlipsParams {
  /**
   * 2-digit state FIPS filter.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
  /**
   * Page size, max 500.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset.
   *
   * Query parameter `offset`.
   */
  offset?: number;
}

/** Success response of `market.flips` (GET /api/v1/market/flips). */
export interface MarketFlipsResponse {
  data: Array<MarketFlipsRow>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `market.flipsAll`. */
export type MarketFlipsItem = PageItem<MarketFlipsResponse, "data">;

// GET /api/v1/market/snapshot (market.snapshot)

/** Parameters for `market.snapshot`. */
export interface MarketSnapshotParams {
  /**
   * 5-digit county FIPS.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * 11-digit census tract GEOID.
   *
   * Query parameter `tract`.
   */
  tract?: string;
  /**
   * CBSA code.
   *
   * Query parameter `cbsa`.
   */
  cbsa?: string;
  /**
   * 5-digit ZIP.
   *
   * Query parameter `zip`.
   */
  zip?: string;
}

/** Success response of `market.snapshot` (GET /api/v1/market/snapshot). */
export interface MarketSnapshotResponse {
  geo: {
    scope: string | null;
    value: number | null;
    state_fips: string;
    county_fips: string;
    county_name: string | null;
    state: string | null;
    cbsa_code: string | null;
    census_tract: string | null;
    zip5: string | null;
    geo_basis: string;
    geo_basis_withheld: Array<string | null>;
  };
  demographics: {
    acs_median_hh_income: number | null;
    acs_median_home_value: number | null;
    acs_median_rent: number | null;
    acs_median_year_built: number | null;
    acs_bachelors_plus_pct: number | null;
    acs_owner_occupied_pct: number | null;
    acs_poverty_pct: number | null;
    acs_vacant_housing_pct: number | null;
    acs_age_65plus_pct: number | null;
    acs_broadband_pct: number | null;
    acs_mean_commute_minutes: number | null;
    acs_long_commute_pct: number | null;
    tract_population: string | null;
    tract_median_home_value: string | null;
    tract_median_rent: string | null;
    tract_owner_occupied_pct: string | null;
    tract_vacancy_rate: string | null;
    tract_poverty_rate: string | null;
    tract_college_educated_pct: string | null;
    tract_avg_income: string | null;
    demographics_basis: string;
    demographics_basis_withheld: Array<string | null>;
    demographics_basis_grain: {
      acs_median_hh_income: string | null;
      acs_median_home_value: string | null;
      acs_median_rent: string | null;
      acs_median_year_built: string | null;
      acs_bachelors_plus_pct: string | null;
      acs_owner_occupied_pct: string | null;
      acs_poverty_pct: string | null;
      acs_vacant_housing_pct: string | null;
      acs_age_65plus_pct: string | null;
      acs_broadband_pct: string | null;
      acs_mean_commute_minutes: string | null;
      acs_long_commute_pct: string | null;
      tract_population: string | null;
      tract_median_home_value: string | null;
      tract_median_rent: string | null;
      tract_owner_occupied_pct: string | null;
      tract_vacancy_rate: string | null;
      tract_poverty_rate: string | null;
      tract_college_educated_pct: string | null;
      tract_avg_income: string | null;
    };
  };
  economy: {
    bea_gdp_2024_thousands: number | null;
    bea_gdp_2023_thousands: number | null;
    bea_gdp_5y_growth_pct: number | null;
    bea_gdp_10y_growth_pct: number | null;
    bea_gdp_20y_growth_pct: number | null;
    bea_pcpi_2024: number | null;
    bea_pcpi_5y_growth_pct: number | null;
    bea_personal_income_thousands_2024: number | null;
    bea_population_2024: number | null;
    county_employment: number | null;
    county_unemployment_rate: number | null;
    county_total_employees: number | null;
    county_total_establishments: number | null;
    county_median_income_irs: number | null;
    county_affordability_ratio: number | null;
    county_affordability_rating: string | null;
    lodes_jobs_total: number | null;
    lodes_jobs_high_wage: number | null;
    lodes_jobs_mid_wage: number | null;
    lodes_jobs_low_wage: number | null;
    lodes_jobs_healthcare: number | null;
    lodes_jobs_manufacturing: number | null;
    lodes_jobs_retail: number | null;
    lodes_jobs_education: number | null;
    lodes_jobs_hospitality: number | null;
    tract_total_jobs: string | null;
    tract_jobs_density_per_sqmi: string | null;
    tract_high_wage_pct: string | null;
    tract_healthcare_jobs_pct: string | null;
    economy_basis: string;
    economy_basis_withheld: Array<string | null>;
    economy_basis_grain: {
      county_employment: string | null;
      county_unemployment_rate: string | null;
      county_total_employees: string | null;
      county_total_establishments: string | null;
      lodes_jobs_total: string | null;
      lodes_jobs_high_wage: string | null;
      lodes_jobs_mid_wage: string | null;
      lodes_jobs_low_wage: string | null;
      lodes_jobs_healthcare: string | null;
      lodes_jobs_manufacturing: string | null;
      lodes_jobs_retail: string | null;
      lodes_jobs_education: string | null;
      lodes_jobs_hospitality: string | null;
      tract_total_jobs: string | null;
      tract_jobs_density_per_sqmi: string | null;
      tract_high_wage_pct: string | null;
      tract_healthcare_jobs_pct: string | null;
    };
  };
  housing: {
    bps_total_units_2024: number | null;
    bps_total_units_2023: number | null;
    bps_total_value_2024: number | null;
    bps_sf_units_2024: number | null;
    bps_sf_value_2024: number | null;
    bps_mf_units_2024: number | null;
    bps_mf_value_2024: number | null;
    bps_yoy_unit_growth_pct: number | null;
    fhfa_hpi_latest: number | null;
    fhfa_hpi_year: number | null;
    fhfa_hpi_1y_change_pct: number | null;
    fhfa_hpi_5y_change_pct: number | null;
    fhfa_hpi_10y_change_pct: number | null;
    fhfa_hpi_20y_change_pct: number | null;
    housing_basis: string;
    housing_basis_withheld: Array<string | null>;
    housing_basis_grain: {
      fhfa_hpi_latest: string | null;
      fhfa_hpi_year: string | null;
      fhfa_hpi_1y_change_pct: string | null;
      fhfa_hpi_5y_change_pct: string | null;
      fhfa_hpi_10y_change_pct: string | null;
      fhfa_hpi_20y_change_pct: string | null;
    };
  };
  lending: {
    hmda_orig_count: number | null;
    hmda_orig_volume_thousands: number | null;
    hmda_avg_loan_amount_thousands: number | null;
    hmda_avg_interest_rate: number | null;
    hmda_avg_ltv: number | null;
    hmda_conv_count: number | null;
    hmda_fha_count: number | null;
    hmda_va_count: number | null;
    hmda_usda_count: number | null;
    tract_loan_originations: string | null;
    tract_avg_loan_amount: string | null;
    tract_avg_interest_rate: string | null;
    tract_fha_pct: string | null;
    tract_investor_pct: string | null;
    tract_credit_risk_tier: string | null;
    tract_flood_claims: string | null;
    tract_flood_loss_ratio: string | null;
    lending_basis: string;
    lending_basis_withheld: Array<string | null>;
    lending_basis_grain: {
      hmda_orig_count: string | null;
      hmda_orig_volume_thousands: string | null;
      hmda_avg_loan_amount_thousands: string | null;
      hmda_avg_interest_rate: string | null;
      hmda_avg_ltv: string | null;
      hmda_conv_count: string | null;
      hmda_fha_count: string | null;
      hmda_va_count: string | null;
      hmda_usda_count: string | null;
      tract_loan_originations: string | null;
      tract_avg_loan_amount: string | null;
      tract_avg_interest_rate: string | null;
      tract_fha_pct: string | null;
      tract_investor_pct: string | null;
      tract_credit_risk_tier: string | null;
      tract_flood_claims: string | null;
      tract_flood_loss_ratio: string | null;
    };
  };
  hazard: {
    fema_disaster_count: number | null;
    fema_disaster_count_10y: number | null;
    fema_flood_count: number | null;
    fema_fire_count: number | null;
    fema_hurricane_count: number | null;
    fema_tornado_count: number | null;
    fema_earthquake_count: number | null;
    fema_sev_storm_count: number | null;
    fema_biological_count: number | null;
    fema_ia_declarations: number | null;
    fema_pa_declarations: number | null;
    fema_policy_count: number | null;
    fema_top_incident_type: string | null;
    fema_latest_declaration_date: string | null;
    county_violent_crime_rate: number | null;
    county_property_crime_rate: number | null;
    hazard_basis: string;
    hazard_basis_withheld: Array<string | null>;
    hazard_basis_grain: {
      fema_policy_count: string | null;
      county_violent_crime_rate: string | null;
      county_property_crime_rate: string | null;
    };
  };
  healthcare: {
    cms_hosp_count: number | null;
    cms_hosp_avg_stars: number | null;
    cms_hosp_4_5_star: number | null;
    cms_hosp_with_er: number | null;
    cms_nh_count: number | null;
    cms_nh_beds: number | null;
    cms_nh_avg_stars: number | null;
    cms_nh_4_5_star: number | null;
    cms_nh_1_2_star: number | null;
    cms_hospice_count: number | null;
    cms_hh_count: number | null;
    healthcare_basis: string;
    healthcare_basis_withheld: Array<string | null>;
    healthcare_basis_grain: {
      cms_hosp_count: string | null;
      cms_hosp_avg_stars: string | null;
      cms_hosp_4_5_star: string | null;
      cms_hosp_with_er: string | null;
      cms_nh_count: string | null;
      cms_nh_beds: string | null;
      cms_nh_avg_stars: string | null;
      cms_nh_4_5_star: string | null;
      cms_nh_1_2_star: string | null;
      cms_hospice_count: string | null;
      cms_hh_count: string | null;
    };
  };
  market: { [key: string]: unknown } | null;
  market_history: Array<unknown>;
  market_provenance: {
    dataset: string | null;
    period_upper_bound: string | null;
    returned_records: number | null;
    oldest_record_refresh: string | null;
    newest_record_refresh: string | null;
    records_without_refresh: number | null;
    source_vintage: string | null;
    basis: string | null;
  };
  generated_at: string | null;
  _guards: Array<string>;
}

// GET /api/v1/market/trends (market.trends)

/** Parameters for `market.trends`. */
export interface MarketTrendsParams {
  /**
   * Comma-separated list of county FIPS codes.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * State FIPS code. Used if county_fips is not provided.
   *
   * Query parameter `state_fips`.
   */
  state_fips?: string;
}

/** Success response of `market.trends` (GET /api/v1/market/trends). */
export interface MarketTrendsResponse {
  data: Array<{
    quarter: string | null;
    total_sales: number | null;
    median_price: number | null;
    total_volume: number | null;
    avg_dom: number | null;
    county_fips?: string;
    county_name?: string;
    quarters?: Array<{
      quarter?: string;
      sale_count?: number;
      median_price?: number;
      avg_price?: number;
      yoy_change?: number;
    }>;
  }>;
  mode: string;
}

// GET /api/v1/owners/card (owners.card)

/** Parameters for `owners.card`. */
export interface OwnersCardParams {
  /**
   * A canonical id (state:county:parcel) or a parcel UUID. Pass this OR `name`.
   *
   * Query parameter `parcel_id`.
   */
  parcel_id?: string;
  /**
   * An owner of record, exact spelling (e.g. from a parcel lookup). Pass this OR `parcel_id`.
   *
   * Query parameter `name`.
   */
  name?: string;
  /**
   * true -> also return grade-D (contradictory) addresses.
   *
   * Query parameter `include_low_confidence`.
   */
  include_low_confidence?: boolean;
}

/** Success response of `owners.card` (GET /api/v1/owners/card). */
export type OwnersCardResponse = OwnerCard;

// GET /api/v1/owners/{name} (owners.get)

/** Parameters for `owners.get` (the operation takes none). */
export type OwnersGetParams = Record<string, never>;

/** Success response of `owners.get` (GET /api/v1/owners/{name}). */
export type OwnersGetResponse = Owner;

// GET /api/v1/owners/{name}/portfolio (owners.portfolio)

/** Parameters for `owners.portfolio` (the operation takes none). */
export type OwnersPortfolioParams = Record<string, never>;

/** Success response of `owners.portfolio` (GET /api/v1/owners/{name}/portfolio). */
export interface OwnersPortfolioResponse {
  owner_name: string;
  properties: Array<{
    parcel_id: string;
    county_fips: string;
    state_fips: string;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    latitude: number | null;
    longitude: number | null;
    owner_name: string | null;
    total_assessed_value: number | null;
    land_assessed_value: number | null;
    improvement_assessed_value: number | null;
    lot_size_acres: number | null;
    building_sqft: number | null;
    year_built: number | null;
    zoning: string | null;
    zoning_code_raw: string | null;
    last_sale_date: string | null;
    last_sale_price: number | null;
    property_type: string | null;
    match_basis: string;
    match_confidence: string | null;
    owner_roles: Array<unknown>;
  }>;
  summary: {
    count: number;
    returned: number;
    limit: number;
    offset: number;
    truncated: boolean;
    total_value: number;
    total_acreage: number;
    states: Array<number | null>;
    by_state: Array<{
      state: string | null;
      state_fips: string;
      abbr: string | null;
      count: number | null;
      total_value: number | null;
      total_acreage: number | null;
    }>;
    property_count?: number;
    total_assessed_value?: number;
    avg_assessed_value?: number;
    counties?: number;
    zoning_breakdown?: { [key: string]: number };
  };
  match: {
    method: string;
    confidence: string;
    verified_corporate_link: boolean;
    basis_counts: {
      exact_spelling: number;
      variant: number;
      ticker_curated: number;
    };
    basis_counts_scope: string;
    note: string;
  };
  entity_type?: "individual" | "corporation" | "llc" | "trust" | "government" | "other";
}

// GET /api/v1/owners/{name}/properties (owners.properties)

/** Parameters for `owners.properties`. */
export interface OwnersPropertiesParams {
  /** Query parameter `limit`. */
  limit?: number;
  /** Query parameter `offset`. */
  offset?: number;
}

/** Success response of `owners.properties` (GET /api/v1/owners/{name}/properties). */
export interface OwnersPropertiesResponse {
  data: Array<{
    state_fips: string;
    county_fips: string;
    parcel_id: string;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    total_assessed_value: number | null;
    land_value: number | null;
    improvement_value: number | null;
    lot_size_acres: number | null;
    zoning: string | null;
    zoning_code_raw: string | null;
    land_use_desc: string | null;
    latitude: number | null;
    longitude: number | null;
    year_built: number | null;
  }>;
  total: number;
  limit: number;
  offset: number;
}

/** One item yielded by `owners.propertiesAll`. */
export type OwnersPropertiesItem = PageItem<OwnersPropertiesResponse, "data">;

// GET /api/v1/owners/{name}/report (owners.report)

/** Parameters for `owners.report`. */
export interface OwnersReportParams {
  /**
   * Optional public stock ticker; when it is on PropRaven's hand-curated list, that entity list is matched instead of expanding `name` (match_basis: ticker_curated — curated, not verified).
   *
   * Query parameter `ticker`.
   */
  ticker?: string;
  /**
   * Optional 2-letter USPS code (or 2-digit FIPS) to scope the portfolio to one state.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * Properties per page in the paid report (the summary always covers the FULL portfolio).
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Pagination offset into the property list.
   *
   * Query parameter `offset`.
   */
  offset?: number;
  /**
   * FREE try-before-buy: the summary, the exact price and three masked sample properties. No payment; an account (API key or session) is still required.
   *
   * Query parameter `preview`.
   */
  preview?: boolean;
  /**
   * Base64-encoded x402 PaymentPayload (EIP-3009 signed). Present it to pay per call for the full report.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `owners.report` (GET /api/v1/owners/{name}/report). */
export interface OwnersReportResponse {
  owner: {
    query_name: string;
    ticker: string | null;
    entity_type: string;
    resolved_variants: Array<string | null>;
    match: {
      method: string;
      confidence: string;
      verified_corporate_link: boolean;
      basis_counts: {
        exact_spelling: number;
        variant: number;
        ticker_curated: number;
      };
      basis_counts_scope: string;
      note: string;
    };
  };
  filter: {
    state_fips: string | null;
  };
  summary: {
    count: number;
    total_assessed_value: number;
    total_acreage: number;
    states: Array<number | null>;
    by_state: Array<{
      state: string | null;
      state_fips: string;
      abbr: string | null;
      count: number | null;
      total_value: number | null;
      total_acreage: number | null;
    }>;
  };
  quote: {
    price: {
      amount: string;
      currency: string;
    };
    price_usd: number;
    price_atomic_usdc: string;
    asset: string;
    parcel_count: number;
    band: string;
    band_label: string;
    breakdown: {
      base: number;
      P: number;
      V: number;
      price_raw: number;
      capped: boolean;
    };
    pay: Array<string | null>;
    note: string;
  };
  preview: boolean;
  sample: Array<{
    canonical_id: string;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    total_assessed_value: number | null;
    property_type: string | null;
    match_basis: string;
    match_confidence: string | null;
  }>;
  note: string;
}

// GET /api/v1/owners/search (owners.search)

/** Parameters for `owners.search`. */
export interface OwnersSearchParams {
  /**
   * Search query for owner name.
   *
   * Query parameter `q`.
   */
  q: string;
  /**
   * Minimum number of properties owned.
   *
   * Query parameter `min_properties`.
   */
  min_properties?: number;
  /** Query parameter `limit`. */
  limit?: number;
}

/** Success response of `owners.search` (GET /api/v1/owners/search). */
export interface OwnersSearchResponse {
  data: Array<Owner>;
  count: number;
}

// GET /api/v1/owners/{name}/transactions (owners.transactions)

/** Parameters for `owners.transactions` (the operation takes none). */
export type OwnersTransactionsParams = Record<string, never>;

/** Success response of `owners.transactions` (GET /api/v1/owners/{name}/transactions). */
export interface OwnersTransactionsResponse {
  data?: Array<OwnerTransaction>;
  count?: number;
}

// GET /api/v1/parcels/{id}/assessment-history (parcels.assessmentHistory)

/** Parameters for `parcels.assessmentHistory` (the operation takes none). */
export type ParcelsAssessmentHistoryParams = Record<string, never>;

/** Success response of `parcels.assessmentHistory` (GET /api/v1/parcels/{id}/assessment-history). */
export type ParcelsAssessmentHistoryResponse = AssessmentHistory;

// POST /api/v1/parcels/batch (parcels.batch)

/** Parameters for `parcels.batch`. */
export interface ParcelsBatchParams {
  /** Body field `tuples`. */
  tuples: Array<{
    state_fips: string;
    county_fips: string;
    parcel_id: string;
  }>;
}

/** Success response of `parcels.batch` (POST /api/v1/parcels/batch). */
export interface ParcelsBatchResponse {
  rows: Array<{
    id: string;
    county_fips: string;
    state_fips: string;
    parcel_id: string;
    address: string | null;
    normalized_address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    zip5: string | null;
    zip_plus4: string | null;
    latitude: number | null;
    longitude: number | null;
    land_use_code: string | null;
    land_use_desc: string | null;
    total_assessed_value: number | null;
    land_assessed_value: number | null;
    improvement_assessed_value: number | null;
    last_sale_price: number | null;
    last_sale_date: string | null;
    market_value: number | null;
    avm_value: number | null;
    avm_confidence: string | null;
    avm_method: string | null;
    tax_amount: number | null;
    tax_year: number | null;
    deal_score: number | null;
    price_per_sqft: number | null;
    building_sqft: number | null;
    year_built: number | null;
    lot_size_acres: number | null;
    lot_size_sqft: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    stories: number | null;
    units: number | null;
    unit_count: number | null;
    construction_type: string | null;
    owner_name: string | null;
    owner_address: string | null;
    owner_city: string | null;
    owner_state: string | null;
    owner_zip: string | null;
    ownership_type: string | null;
    owner_entity_type: string | null;
    entity_type: string | null;
    is_entity_owned: boolean | null;
    is_absentee: boolean | null;
    is_pe_aggregator: boolean | null;
    owner_occupied_flag: boolean | null;
    data_quality_score: number | null;
    flood_zone: string | null;
    is_sfha: boolean | null;
    is_opportunity_zone: boolean | null;
    is_justice40: boolean | null;
    is_flip: boolean | null;
    crime_score: number | null;
    crime_tier: number | null;
    deed_count: number | null;
    permit_count: number | null;
    permit_count_12mo: number | null;
    zoning: string | null;
    zoning_code_raw: string | null;
    county_name: string | null;
    property_type: string | null;
  }>;
  missing: Array<unknown>;
}

// GET /api/v1/parcels/{id}/comp-pack (parcels.compPack)

/** Parameters for `parcels.compPack`. */
export interface ParcelsCompPackParams {
  /**
   * How many comps back the pack.
   *
   * Query parameter `n`.
   */
  n?: number;
  /**
   * Optional post-filter: keep only precomputed comps within this many miles.
   *
   * Query parameter `radius`.
   */
  radius?: number;
  /**
   * FREE try-before-buy: subject summary, comp count, exact price and three masked comps. No payment.
   *
   * Query parameter `preview`.
   */
  preview?: boolean;
  /**
   * Base64-encoded x402 PaymentPayload (EIP-3009 signed). Present it to pay per call for the full pack.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `parcels.compPack` (GET /api/v1/parcels/{id}/comp-pack). */
export interface ParcelsCompPackResponse {
  subject: {
    canonical_id: string;
    parcel_id: string;
    state_fips: string;
    county_fips: string;
    total_assessed_value: number;
    market_value: number;
    building_sqft: number | null;
    property_type: string;
    last_sale_price: number | null;
    last_sale_date: string;
  };
  comp_count: number;
  radius_miles: number | null;
  quote: {
    price: {
      amount: string;
      currency: string;
    };
    price_usd: number;
    price_atomic_usdc: string;
    asset: string;
    comp_count: number;
    breakdown: {
      base: number;
      V: number;
      Q: number;
      price_raw: number;
      capped: boolean;
    };
    pay: Array<string | null>;
    note: string;
  };
  preview: boolean;
  sample: Array<{
    comp_parcel_id: string | null;
    comp_apn: string | null;
    comp_address: string | null;
    comp_sale_price_approx: number | null;
    comp_sale_year: number | null;
    comp_sqft: number | null;
    comp_year_built: number | null;
    similarity_score: number | null;
    distance_miles: number | null;
    rank: number | null;
  }>;
  note: string;
}

// GET /api/v1/parcels/{id}/comps (parcels.comps)

/** Parameters for `parcels.comps`. */
export interface ParcelsCompsParams {
  /**
   * Number of comps (1-25).
   *
   * Query parameter `n`.
   */
  n?: number;
  /**
   * Search radius in miles.
   *
   * Query parameter `radius`.
   */
  radius?: number;
}

/** Success response of `parcels.comps` (GET /api/v1/parcels/{id}/comps). */
export interface ParcelsCompsResponse {
  subject: {
    canonical_id: string;
    parcel_id: string;
    state_fips: string;
    county_fips: string;
  };
  tier: string;
  radius_miles: number | null;
  count: number;
  comps: Array<{
    comp_parcel_id: string | null;
    comp_apn: string | null;
    comp_sale_price: number | null;
    comp_sale_date: string | null;
    comp_address: string | null;
    comp_sqft: number | null;
    comp_year_built: number | null;
    comp_beds: number | null;
    comp_baths: number | null;
    similarity_score: number | null;
    distance_miles: number | null;
    rank: number | null;
    sale_price_reconciled: boolean | null;
  }>;
  provenance_gate: {
    applied: boolean;
    rule: string;
    scope: {
      state_fips: string;
      county_fips: string;
    };
    comps_reconciled: number;
    reason: string | null;
    note: string | null;
  };
}

// GET /api/v1/parcels/{id}/deeds (parcels.deeds)

/** Parameters for `parcels.deeds`. */
export interface ParcelsDeedsParams {
  /**
   * Body shape. Omit for the default bare array of deed rows; `envelope` returns the typed envelope with a `status` header and the frozen `known_deed_count`.
   *
   * Query parameter `shape`.
   */
  shape?: "envelope";
}

/** Success response of `parcels.deeds` (GET /api/v1/parcels/{id}/deeds). */
export type ParcelsDeedsResponse = Array<Deed> | {
  data: Array<Deed>;
  status: "per_deed" | "rollup_events" | "summary_only" | "none";
  /** parcels_serving.deed_count when the parcel carries one; NOT a count of the returned rows. */
  known_deed_count: number | null;
  /** Where known_deed_count comes from: the frozen 2026-04 weld, or the identity gate's reason when the parcel_id collides across counties — parcel_id_collides_bare_id_joined (rollup withheld, count null), parcel_id_collides_unmeasured (served with the doubt visible), collision_check_unavailable (withheld under DQ_IDENTITY_GATE_FAIL_CLOSED=1). */
  known_deed_count_basis: string | null;
  note?: string;
  /** The identity probe's verdict on the rollup (present on rollup-derived envelopes; absent on the county-scoped per_deed branch). */
  join_key_basis?: "state_county_parcel_id" | "parcel_id_collides" | "unchecked";
  /** Present when the rollup was withheld on the deeds-relation probe: the parcel_id is unique in parcels_serving (join_key_basis state_county_parcel_id) but parcel_deeds carries rows for it under another (state, county), so the frozen rollup was welded on the bare id from another parcel's deeds. */
  rollup_probe?: "deeds_relation";
};

// GET /api/v1/parcels/geojson (parcels.geojson)

/** Parameters for `parcels.geojson`. */
export interface ParcelsGeojsonParams {
  /**
   * Bounding box `west,south,east,north`.
   *
   * Query parameter `bbox`.
   */
  bbox: string;
  /**
   * Map zoom level. Below 14 returns an empty collection.
   *
   * Query parameter `zoom`.
   */
  zoom: number;
}

/** Success response of `parcels.geojson` (GET /api/v1/parcels/geojson). */
export type ParcelsGeojsonResponse = ParcelGeoJSON;

// GET /api/v1/parcels/{id} (parcels.get)

/** Parameters for `parcels.get` (the operation takes none). */
export type ParcelsGetParams = Record<string, never>;

/** Success response of `parcels.get` (GET /api/v1/parcels/{id}). */
export type ParcelsGetResponse = Parcel;

// GET /api/v1/parcels/{id}/occupants (parcels.occupants)

/** Parameters for `parcels.occupants` (the operation takes none). */
export type ParcelsOccupantsParams = Record<string, never>;

/** Success response of `parcels.occupants` (GET /api/v1/parcels/{id}/occupants). */
export interface ParcelsOccupantsResponse {
  parcel_id: string;
  occupant_count: number;
  occupants: Array<{
    occupant_id: string | null;
    name_raw: string | null;
    name_norm: string | null;
    brand_name: string | null;
    brand_wikidata: string | null;
    category_fsq: string | null;
    naics: string | null;
    confidence: number | null;
    status: string | null;
    is_primary: boolean | null;
    match_method: string | null;
    match_distance_m: number | null;
    source_count: number | null;
    first_seen: string | null;
    last_seen: string | null;
    occupant_lat: number | null;
    occupant_lon: number | null;
    lu_class: string | null;
  }>;
  truncated: boolean;
}

// GET /api/v1/parcels/{id}/owner (parcels.owner)

/** Parameters for `parcels.owner` (the operation takes none). */
export type ParcelsOwnerParams = Record<string, never>;

/** Success response of `parcels.owner` (GET /api/v1/parcels/{id}/owner). */
export interface ParcelsOwnerResponse {
  owner: {
    owner_name: string | null;
    owner_address: string | null;
    owner_city: string | null;
    owner_state: string | null;
  };
  contact: {
    owner_name: string | null;
    owner_name_status: string | null;
    owner_roles: Array<unknown>;
    owner_name_provenance: {
      source: {
        authority: string | null;
        dataset: string | null;
        url: string | null;
      };
      as_of: string | null;
      as_of_basis: string;
      grade: string | null;
    };
    co_owners: Array<unknown>;
    co_owner_status: string | null;
    mailing: {
      basis: string | null;
      line1: string | null;
      city: string | null;
      state: string | null;
      zip5: string | null;
      zip4: string | null;
      mail_ready: boolean | null;
      po_box: boolean | null;
      equals_situs: boolean | null;
      zip_conflict: boolean | null;
      parcels_citing: number | null;
      parcels_citing_basis: string;
      label: string | null;
      source: {
        authority: string | null;
        dataset: string | null;
        url: string | null;
      };
      as_of: string | null;
      as_of_basis: string;
      grade: string | null;
    };
    mailing_alternates: Array<unknown>;
    entity: {
      entity_type: string | null;
      status: string | null;
      state_of_formation: string | null;
      formation_date: string | null;
      registered_agent: string | null;
      officers: Array<unknown>;
      source: {
        authority: string | null;
        dataset: string | null;
        url: string | null;
      };
      as_of: string | null;
      as_of_basis: string | null;
      grade: string | null;
    };
    phones: Array<unknown>;
    phone_status: string | null;
    emails: Array<unknown>;
    none_published: Array<string | null>;
    hidden_low_confidence: number | null;
    people_on_permits: Array<unknown>;
    people_on_permits_status: string | null;
    other_addresses: Array<{
      parcel_id: string;
      state: string | null;
      county: string | null;
      kind: string | null;
      address: {
        line1: string | null;
        city: string | null;
        state: string | null;
        zip5: string | null;
        zip4: string | null;
        label: string | null;
        mail_ready: boolean | null;
        po_box: boolean | null;
      };
      same_as: string | null;
      grade: string | null;
      link: string | null;
      basis: string | null;
      label_note: string | null;
      evidence: Array<unknown>;
      mail_merge: boolean | null;
      owner_name_on_record: string | null;
      owner_roles: Array<unknown>;
      cited_by: Array<{
        parcel_id: string;
        state: string | null;
        county: string | null;
      }>;
      parcels_citing: number | null;
      source: {
        authority: string | null;
        dataset: string | null;
        url: string | null;
      };
      as_of: string | null;
      as_of_basis: string;
    }>;
    other_addresses_status: string | null;
    other_addresses_scope: {
      name_basis: string;
      spellings: number | null;
      parcels_read: number | null;
      capped: boolean | null;
      copies_skipped: number | null;
      parcels_linked: number | null;
      possible_found: number | null;
      possible_listed: number | null;
      possible_cap: number | null;
      possible_withheld_reason: string | null;
      listed_capped: boolean | null;
      evidence_providers: Array<{
        id: string;
        status: string | null;
      }>;
      co_owner_link: string | null;
    };
  };
  /** Observed values include: CORP. */
  entity_type: string | null;
  portfolio: {
    property_count: number | null;
    state_count: number | null;
    total_assessed_value: number | null;
    total_acreage: number | null;
    states_list: string | null;
    county_count?: number | null;
    portfolio_rank?: number | null;
  };
  properties: Array<{
    parcel_id: string;
    county_fips: string;
    state_fips: string;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    total_assessed_value: number | null;
    last_sale_price: number | null;
    last_sale_date: string | null;
    property_type: string | null;
    building_sqft: number | null;
    lot_size_acres: number | null;
    year_built: number | null;
  }>;
  owner_name?: string;
  mailing_address?: string;
  portfolio_summary?: {
    property_count?: number;
    total_assessed_value?: number;
    states?: Array<string>;
  };
}

// GET /api/v1/parcels/{id}/permits (parcels.permits)

/** Parameters for `parcels.permits`. */
export interface ParcelsPermitsParams {
  /**
   * Body shape. Omit for the default bare array of up to 100 permit rows (newest first); `envelope` returns `{ data, permit_count, permit_count_basis, truncated, row_cap }`, where `permit_count` is the parcel's true count when `permit_count_basis` is `exact` and the size of the capped window (a floor) when `capped`, and `truncated` is true when the parcel has more permits than `data` carries.
   *
   * Query parameter `shape`.
   */
  shape?: "envelope";
}

/** Success response of `parcels.permits` (GET /api/v1/parcels/{id}/permits). */
export type ParcelsPermitsResponse = Array<Permit> | {
  data: Array<Permit>;
  /** The parcel's permit count (exact) or the capped window size (a floor) — see permit_count_basis. */
  permit_count: number;
  permit_count_basis: "exact" | "capped";
  /** True when the parcel has more permits than `data` carries. */
  truncated: boolean;
  /** The row cap `data` is bounded by (100). */
  row_cap: number;
};

// GET /api/v1/parcels/poi (parcels.pois)

/** Parameters for `parcels.pois`. */
export interface ParcelsPoisParams {
  /**
   * `west,south,east,north` in decimal degrees.
   *
   * Query parameter `bbox`.
   */
  bbox: string;
}

/** Success response of `parcels.pois` (GET /api/v1/parcels/poi). */
export interface ParcelsPoisResponse {
  data: Array<unknown>;
}

// GET /api/v1/parcels/{id}/report (parcels.report)

/** Parameters for `parcels.report`. */
export interface ParcelsReportParams {
  /**
   * 5-digit county FIPS. Strongly recommended when passing a county-local id.
   *
   * Query parameter `county_fips`.
   */
  county_fips?: string;
  /**
   * Comma-separated report sections to deliver in `fields`: identity, valuation, owner, hazard, permits, deeds, market, demographics, `core` (the first four) or `all`. Omit (with no `fields`) for `all` — every populated field the quote was priced on. The compact core is delivered only on an explicit `core`.
   *
   * Query parameter `sections`.
   */
  sections?: string;
  /**
   * Comma-separated parcels_serving column names to deliver on top of `sections`.
   *
   * Query parameter `fields`.
   */
  fields?: string;
  /**
   * `true` attaches the per-field receipts map (`provenance`, keyed by field name: source, as_of, confidence, coverage, tier). Off by default — the receipts are epoch catalog metadata and roughly triple the payload.
   *
   * Query parameter `include_provenance`.
   */
  include_provenance?: boolean;
  /**
   * x402 payment: a base64-encoded signed x402 PaymentPayload (EIP-3009 transferWithAuthorization over USDC on Base). Present it to pay per call with no API key; the signed amount must equal this parcel's quoted maxAmountRequired (see the 402 body or /storefront/availability?parcel_id=). Omit it to be served only if your key holds a paid subscription entitlement; otherwise you receive a 402 carrying the payment requirements.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `parcels.report` (GET /api/v1/parcels/{id}/report). */
export type ParcelsReportResponse = ParcelDossier;

// GET /api/v1/parcels/{id}/risks (parcels.risks)

/** Parameters for `parcels.risks` (the operation takes none). */
export type ParcelsRisksParams = Record<string, never>;

/** Success response of `parcels.risks` (GET /api/v1/parcels/{id}/risks). */
export type ParcelsRisksResponse = RiskAssessment;

// GET /api/v1/parcels/{id}/risk-score (parcels.riskScore)

/** Parameters for `parcels.riskScore`. */
export interface ParcelsRiskScoreParams {
  /**
   * FREE try-before-buy: subject, resolved hazard layers, and the exact price. No payment.
   *
   * Query parameter `preview`.
   */
  preview?: boolean;
  /**
   * Base64-encoded x402 PaymentPayload (EIP-3009 signed). Present it to pay per call.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `parcels.riskScore` (GET /api/v1/parcels/{id}/risk-score). */
export interface ParcelsRiskScoreResponse {
  subject: {
    canonical_id: string;
    parcel_id: string;
    state_fips: string;
    county_fips: string;
    total_assessed_value: number;
  };
  hazard_layers: Array<string | null>;
  hazard_layer_count: number;
  quote: {
    price: {
      amount: string;
      currency: string;
    };
    price_usd: number;
    price_atomic_usdc: string;
    asset: string;
    hazard_layers: number;
    breakdown: {
      base: number;
      V: number;
      C: number;
      price_raw: number;
      capped: boolean;
    };
    pay: Array<string | null>;
    note: string;
  };
  preview: boolean;
  note: string;
}

// GET /api/v1/parcels/{id}/traffic-history (parcels.trafficHistory)

/** Parameters for `parcels.trafficHistory`. */
export interface ParcelsTrafficHistoryParams {
  /**
   * Latitude.
   *
   * Query parameter `lat`.
   */
  lat: number;
  /**
   * Longitude.
   *
   * Query parameter `lng`.
   */
  lng: number;
}

/** Success response of `parcels.trafficHistory` (GET /api/v1/parcels/{id}/traffic-history). */
export type ParcelsTrafficHistoryResponse = TrafficStationHistory;

// GET /api/v1/parcels/{id}/violations (parcels.violations)

/** Parameters for `parcels.violations` (the operation takes none). */
export type ParcelsViolationsParams = Record<string, never>;

/** Success response of `parcels.violations` (GET /api/v1/parcels/{id}/violations). */
export interface ParcelsViolationsResponse {
  data: Array<unknown>;
  violation_count: number;
  violation_count_basis: string;
  truncated: boolean;
  row_cap: number;
  coverage: string;
  coverage_reason: string;
  place: {
    place_geoid: string | null;
    place_name: string | null;
  };
  sources: Array<unknown>;
  summary: {
    open_count: number;
    closed_count: number;
    other_count: number;
    unknown_status_count: number;
    unmapped_status_count: number;
    latest_issued_date: string | null;
    latest_status: string | null;
    oldest_open_issued_date: string | null;
    has_open_code_violation: boolean | null;
  };
  withheld: {
    outside_publisher_area: number;
    account_only_fields: Array<unknown>;
  };
  covered_jurisdictions: Array<{
    source_id: string | null;
    state_fips: string;
    county_fips: string;
    place_geoid: string | null;
    place_name: string | null;
    publisher: string | null;
  }>;
  notes: Array<string | null>;
}

// GET /api/v1/search/autocomplete (search.autocomplete)

/** Parameters for `search.autocomplete`. */
export interface SearchAutocompleteParams {
  /**
   * Search prefix. Minimum 2 chars.
   *
   * Query parameter `q`.
   */
  q: string;
}

/** Success response of `search.autocomplete` (GET /api/v1/search/autocomplete). */
export type SearchAutocompleteResponse = AutocompleteResult;

// GET /api/v1/search/export (search.export)

/** Parameters for `search.export`. */
export interface SearchExportParams {
  /**
   * Bounding box: north latitude.
   *
   * Query parameter `north`.
   */
  north?: number;
  /**
   * Bounding box: south latitude.
   *
   * Query parameter `south`.
   */
  south?: number;
  /**
   * Bounding box: east longitude.
   *
   * Query parameter `east`.
   */
  east?: number;
  /**
   * Bounding box: west longitude.
   *
   * Query parameter `west`.
   */
  west?: number;
  /**
   * Comma-delimited zoning categories.
   *
   * Query parameter `zoningCategories`.
   */
  zoningCategories?: string;
  /**
   * Sort column.
   *
   * Query parameter `sort`.
   */
  sort?: "address" | "city" | "state" | "owner_name" | "total_assessed_value" | "zoning" | "year_built" | "lot_size_acres" | "ownership_type";
  /**
   * Sort direction.
   *
   * Query parameter `order`.
   */
  order?: "asc" | "desc";
  /**
   * Row cap. Hard max 10,000.
   *
   * Query parameter `limit`.
   */
  limit?: number;
}

/** Success response of `search.export` (GET /api/v1/search/export). */
export type SearchExportResponse = string;

// GET /api/v1/search/full (search.full)

/** Parameters for `search.full`. */
export interface SearchFullParams {
  /**
   * Search query. Min 2 chars.
   *
   * Query parameter `q`.
   */
  q: string;
  /**
   * Field to match against.
   *
   * Query parameter `field`.
   */
  field?: "all" | "address" | "owner_name" | "city";
  /**
   * 2-letter state filter.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * City filter.
   *
   * Query parameter `city`.
   */
  city?: string;
  /**
   * 1-indexed page number.
   *
   * Query parameter `page`.
   */
  page?: number;
  /**
   * Page size, max 200.
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * Sort column.
   *
   * Query parameter `sort`.
   */
  sort?: "address" | "city" | "state" | "owner_name" | "total_value" | "year_built";
  /**
   * Sort direction.
   *
   * Query parameter `dir`.
   */
  dir?: "asc" | "desc";
  /**
   * Opaque keyset cursor: pass the previous page's `nextCursor`. Preferred over `page`.
   *
   * Query parameter `after`.
   */
  after?: string;
}

/** Success response of `search.full` (GET /api/v1/search/full). */
export type SearchFullResponse = FullSearchResult;

/** One item yielded by `search.fullAll`. */
export type SearchFullItem = PageItem<SearchFullResponse, "results">;

// POST /api/v1/search (search.parcels)

/** Parameters for `search.parcels`. */
export interface SearchParcelsParams {
  /**
   * Viewport in WGS84 degrees. north > south. west > east is an antimeridian-crossing box.
   *
   * Body field `bounds`.
   */
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  /**
   * All optional; null means not set. Unknown members are a 400.
   *
   * Body field `filters`.
   */
  filters?: {
    /** Zoning categories (Residential, Commercial, Industrial, Mixed-Use, Agricultural, …). Unrecognised labels are reported in `zoning_categories_unrecognized`. */
    zoningCategories?: Array<string>;
    /** Owner entity type (case-insensitive). */
    ownerTypes?: Array<"individual" | "llc" | "trust" | "corporation" | "government" | "religious" | "partnership" | "association" | "financial">;
    /** Property type group, e.g. Commercial, Residential. */
    propertyType?: Array<string>;
    /** Business / use type, e.g. car_wash. */
    businessTypes?: Array<string>;
    /** Only parcels whose owner state differs from the parcel state. */
    absenteeOnly?: boolean;
    soldWithin?: "6mo" | "1yr" | "3yr" | "never";
    floodZone?: string;
    /** Assessed value range. */
    valueRange?: {
      min?: number | null;
      max?: number | null;
    };
    /** Year built range. */
    yearBuiltRange?: {
      min?: number | null;
      max?: number | null;
    };
    /** Lot size range in acres. */
    acreageRange?: {
      min?: number | null;
      max?: number | null;
    };
    minYearsOwned?: number;
    minCrimeScore?: number;
    maxCrimeScore?: number;
    crimeTrend?: string;
    /** WITHHELD — refused with 400 filter_withheld until traffic counts are verified. */
    minVpd?: number;
    /** WITHHELD — refused with 400 filter_withheld. */
    maxVpd?: number;
    /** WITHHELD — refused with 400 filter_withheld. */
    minVisibilityScore?: number;
  };
  /**
   * Sort field (unbounded queries only). The first five are the primary names; the rest are accepted column names. A legacy `{field, direction}` object is also accepted.
   *
   * Body field `sort`.
   */
  sort?: "assessed_value" | "sale_price" | "acreage" | "year_built" | "deal_score" | "address" | "city" | "state" | "owner_name" | "total_assessed_value" | "zoning" | "lot_size_acres" | "ownership_type";
  /** Body field `order`. */
  order?: "asc" | "desc";
  /**
   * Page size. Values above 500 are clamped to 500 (the response echoes the effective limit).
   *
   * Body field `limit`.
   */
  limit?: number;
  /** Body field `offset`. */
  offset?: number;
}

/** Success response of `search.parcels` (POST /api/v1/search). */
export interface SearchParcelsResponse {
  data: Array<{
    parcel_id: string;
    state_fips: string;
    county_fips: string;
    address: string | null;
    city: string | null;
    state: string | null;
    owner_name: string | null;
    total_assessed_value: number | null;
    zoning: string | null;
    zoning_code_raw: string | null;
    year_built: number | null;
    lot_size_acres: number | null;
    ownership_type: string | null;
    land_use_desc: string | null;
    latitude: number | null;
    longitude: number | null;
    direct_vpd: number | null;
    nearby_vpd: number | null;
    vpd_visibility_score: number | null;
    crime_score: number | null;
    crime_tier: number | null;
    crime_trend: string | null;
    _guards: Array<string>;
  }>;
  /** Exact matching count up to 10,000; 10,000 when capped; null when the count timed out. */
  total: number;
  /** True only when `total` is capped (a lower bound). */
  total_is_estimate: boolean;
  total_is_lower_bound: boolean;
  has_more: boolean;
  limit: number;
  offset: number;
  /** False when `bounds` was given (sort is not applied to bounded queries) or no sort was requested. */
  sort_applied: boolean;
  /** Present when withheld columns (traffic counts) are in the rows; they are null. */
  withhold_gate: {
    applied: boolean;
    suppressed: Array<string | null>;
    reason: string;
    reasons: {
      direct_vpd: string;
      nearby_vpd: string;
      vpd_visibility_score: string;
    };
    withheld_on: string;
    note: string;
  };
  /** Present when the count did not finish. */
  total_status?: "timed_out";
  zoning_categories_applied?: Array<string>;
  zoning_categories_unrecognized?: Array<string>;
  zoning_unknown_estimate?: number | null;
  zoning_unknown_is_estimate?: boolean;
  zoning_filter_note?: string;
}

/** One item yielded by `search.parcelsAll`. */
export type SearchParcelsItem = PageItem<SearchParcelsResponse, "data">;

// GET /api/v1/storefront/availability (storefront.availability)

/** Parameters for `storefront.availability`. */
export interface StorefrontAvailabilityParams {
  /**
   * PARCEL mode. A canonical state_fips:county_fips:parcel_id, a legacy 5-digit-county:parcel_id, or a parcel UUID. When present, returns the value-tiered dossier quote for this parcel (state/county are ignored).
   *
   * Query parameter `parcel_id`.
   */
  parcel_id?: string;
  /**
   * JURISDICTION mode. USPS code ("NC") or 2-digit FIPS ("37"). Required unless parcel_id is given.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * 3-digit within-state code ("183") or 5-digit state+county ("37183"). Optional; narrows JURISDICTION mode to one county.
   *
   * Query parameter `county`.
   */
  county?: string;
  /**
   * JURISDICTION mode only: cap on the returned county list (default 25, max 400).
   *
   * Query parameter `limit`.
   */
  limit?: number;
}

/** Success response of `storefront.availability` (GET /api/v1/storefront/availability). */
export interface StorefrontAvailabilityResponse {
  contract_version: number;
  catalog_version: string;
  generated_at: string;
  seal: {
    algorithm: string;
    value: string;
    covers: string;
  };
  disclosures: {
    annotation_version: string;
    seal_scope: string;
    withheld_fields: Array<{
      field: string | null;
      reason: string | null;
      withheld_on: string | null;
      note: string | null;
    }>;
    annotation_basis: string;
    reference_catalog: {
      version: string;
      seal: string;
    };
    reference_catalog_matches: boolean;
    catalog_published_at: string;
    catalog_generated_at: string;
    serving_epoch_match: string;
    current_source_vintage: string;
    freshness_scope: string;
    coverage_scope: string;
    pricing_scope: string;
    applicability: string;
    field_advisories: Array<{
      field: string | null;
      documented_at: string | null;
      evidence_source: string | null;
      evidence_scope: string | null;
      reference_catalog_version: string | null;
      reference_catalog_seal: string | null;
      reference_catalog_matches: boolean | null;
      current_value_verified: boolean | null;
      code: string | null;
      note: string | null;
    }>;
  };
  /** JURISDICTION mode: the state/county being described. */
  jurisdiction?: {
    level: string;
    state: string;
    state_fips: string;
    county_fips: string;
    county_name: string;
    parcels: number;
    share_of_national: number;
    counties: number;
    last_analyze: string;
  };
  /** JURISDICTION mode: headline coverage facts and parcel counts. */
  coverage?: {
    headline_facts: {
      address: number;
      geocode: number;
      owner: number;
      value: number;
      geometry: number;
    };
    headline_facts_scope: string;
    state_rollup_parcels: number;
    state_ratified_parcels: number;
    state_parcel_counts_unit: string;
    national: {
      parcel_counts_epoch: string;
      parcels: number;
      mapped_locations: number;
      geocoded_parcels: number;
      rows: number;
      parcel_count_definitions: {
        parcels: string;
        mapped_locations: string;
        geocoded_parcels: string;
        rows: string;
      };
    };
    national_parcels: number;
  };
  /** JURISDICTION mode: national vs in-jurisdiction field-coverage summaries. */
  fields?: {
    sellable: number;
    national: {
      measured_fields: number;
      unmeasured_fields: number;
      at_or_above: {
        "0.95": number;
        "0.80": number;
        "0.60": number;
        "0.30": number;
      };
      tiers: {
        prime: number;
        strong: number;
        good: number;
        partial: number;
        sparse: number;
        trace: number;
      };
      red_cells: number;
      red_cell_rule: string;
    };
    /** (Only null in observed responses.) */
    in_jurisdiction: unknown;
    county_field_resolution: string;
  };
  worst_gaps?: Array<{
    name: string | null;
    label: string | null;
    national: number | null;
    state: number | null;
    section: string | null;
  }>;
  /** JURISDICTION mode: the base dossier quote. */
  quote?: {
    price: {
      amount: string;
      currency: string;
    };
    currency: string;
    add_ons: Array<{
      code: string | null;
      label: string | null;
      price: {
        amount: string | null;
        currency: string | null;
      };
      available: boolean | null;
      purchasable: boolean | null;
      note: string | null;
    }>;
    pay: Array<unknown>;
    purchase_flow: string;
  };
  warts?: Array<{
    dataset: string | null;
    surface: string | null;
    status: string | null;
    observed_max_date: string | null;
    age_days: number | null;
    max_age_days: number | null;
    probed_at: string | null;
    reason: string | null;
  }>;
  /** JURISDICTION mode: the state's counties by parcel count. */
  counties?: {
    total: number;
    returned: number;
    rows: Array<{
      state_fips: string;
      county_fips: string;
      state: string | null;
      name: string | null;
      parcels: number | null;
      coverage: {
        address: number | null;
        geocode: number | null;
        owner: number | null;
        value: number | null;
        geometry: number | null;
      };
    }>;
  };
  /** 'parcel' in PARCEL mode; absent in JURISDICTION mode. */
  mode?: "parcel";
  /** PARCEL mode: the resolved parcel identity. */
  parcel?: {
    canonical_id: string;
    state_fips: string;
    county_fips: string;
    county_fips_5: string;
    parcel_id: string;
  };
  /** PARCEL mode: the value-tiered quote for this parcel. */
  dossier_quote?: {
    basis: string;
    price: Money;
    price_usd: number;
    /** What the x402 402 advertises as maxAmountRequired (USDC atomic, 6dp). */
    price_atomic_usdc: string;
    asset: string;
    /** Asset-class band (residential|multifamily|premium) derived from assessed value. */
    band: {
      key: string;
      label: string;
      range: string;
    };
    /** The auditable multipliers: base, V (asset value), R (data richness), F (freshness). */
    breakdown: {
      base: number;
      V: number;
      R: number;
      F: number;
    };
    /** The cheap signals the multipliers were derived from. */
    signals: {
      assessed_value: number;
      populated_fields: number;
      has_deeds: boolean;
      has_permits: boolean;
      freshness: string;
    };
    geometry_add_on: {
      code: string;
      label: string;
      price: {
        amount: string;
        currency: string;
      };
      purchasable: boolean;
    };
    pay: Array<string | null>;
    note: string;
  };
}

// GET /api/v1/storefront/catalog (storefront.catalog)

/** Parameters for `storefront.catalog`. */
export interface StorefrontCatalogParams {
  /**
   * USPS code ("NC") or 2-digit FIPS ("37"). Adds per-state coverage to every field and a state gaps block.
   *
   * Query parameter `state`.
   */
  state?: string;
  /**
   * prime|strong|good|partial|sparse|trace — filter by coverage tier.
   *
   * Query parameter `tier`.
   */
  tier?: string;
  /**
   * Filter to one catalog section (identity, valuation, hazard, …).
   *
   * Query parameter `section`.
   */
  section?: string;
  /**
   * parcel|county|tract|block_group|zip|unknown.
   *
   * Query parameter `grain`.
   */
  grain?: string;
  /**
   * 0..1 — only fields at/above this national coverage.
   *
   * Query parameter `min_coverage`.
   */
  min_coverage?: string;
  /**
   * 1 → only fields carrying a red-cell honesty flag.
   *
   * Query parameter `red_cells`.
   */
  red_cells?: string;
  /**
   * Substring on name, label or description.
   *
   * Query parameter `q`.
   */
  q?: string;
  /**
   * plumbing → include the internal provenance columns.
   *
   * Query parameter `include`.
   */
  include?: string;
  /**
   * none → metadata header only, without the ~615 field entries.
   *
   * Query parameter `fields`.
   */
  fields?: string;
}

/** Success response of `storefront.catalog` (GET /api/v1/storefront/catalog). */
export interface StorefrontCatalogResponse {
  contract_version: number;
  /** The serving epoch this catalog was built for. */
  catalog_version: string;
  generated_at: string;
  /** Content hash: two callers under the same seal get byte-identical numbers. */
  seal: {
    algorithm: string;
    value: string;
    covers: string;
  };
  disclosures: {
    annotation_version: string;
    seal_scope: string;
    withheld_fields: Array<{
      field: string | null;
      reason: string | null;
      withheld_on: string | null;
      note: string | null;
    }>;
    annotation_basis: string;
    reference_catalog: {
      version: string;
      seal: string;
    };
    reference_catalog_matches: boolean;
    catalog_published_at: string;
    catalog_generated_at: string;
    serving_epoch_match: string;
    current_source_vintage: string;
    freshness_scope: string;
    coverage_scope: string;
    pricing_scope: string;
    applicability: string;
    field_advisories: Array<{
      field: string | null;
      documented_at: string | null;
      evidence_source: string | null;
      evidence_scope: string | null;
      reference_catalog_version: string | null;
      reference_catalog_seal: string | null;
      reference_catalog_matches: boolean | null;
      current_value_verified: boolean | null;
      code: string | null;
      note: string | null;
    }>;
  };
  /** National counts (distinct parcels, rows, mapped locations, geocoded parcels) each with the definition it was measured under. */
  measured_from: {
    relation: string;
    schema: string;
    parent: string;
    parcels: number;
    states: number;
    method: string;
    weight_source: string;
    weights_reconcile_to_snapshot: boolean;
    manifest: string;
    snapshot_watermark: string;
    snapshot_swapped_at: string;
    parity_status: string;
    partition_analyze_min: string;
    partition_analyze_max: string;
    geocode_coverage: number;
    sampling: string;
    baseline: {
      source: string;
      last_analyze: string;
      note: string;
    };
    parcel_counts_epoch: string;
    mapped_locations: number;
    geocoded_parcels: number;
    rows: number;
    parcel_count_definitions: {
      parcels: string;
      mapped_locations: string;
      geocoded_parcels: string;
      rows: string;
    };
    geocode_coverage_basis: string;
  };
  counts: {
    columns: number;
    sellable: number;
    plumbing: number;
    headline_parcel_grain_at_80: number;
    red_cells: number;
    epoch_regressions: number;
    curation_review_required: number;
    by_grain: {
      county: number;
      parcel: number;
      tract: number;
      unknown: number;
      zip: number;
    };
    cumulative_at: {
      "0.95": number;
      "0.80": number;
      "0.60": number;
      "0.30": number;
    };
    withheld: number;
  };
  tiers: {
    prime: number;
    strong: number;
    good: number;
    partial: number;
    sparse: number;
    trace: number;
  };
  headline: {
    floor: number;
    parcel_grain_fields: number;
    all_sellable_fields: number;
    claim: string;
  };
  sections: {
    parcel: {
      relation: string;
      rows: number;
    };
    permits: {
      relation: string;
      rows: number;
      national_share: number;
    };
    deeds: {
      relation: string;
      rows: number;
      national_share: number;
    };
    comps: {
      relation: string;
      rows: number;
      national_share: number;
    };
    geometry: {
      relation: string;
      rows: number;
      national_share: number;
    };
  };
  /** The dossier pricing model (base price, floor/cap, add-ons). */
  pricing: {
    dossier: {
      amount: string;
      currency: string;
    };
    add_ons: Array<{
      code: string | null;
      label: string | null;
      price: {
        amount: string | null;
        currency: string | null;
      };
      purchasable: boolean | null;
      note: string | null;
    }>;
    catalog: string;
    availability: string;
    purchase_flow: string;
  };
  /** The base dossier quote derived from the pricing model. The per-parcel, value-tiered price is quoted by /storefront/availability?parcel_id=. */
  quote: {
    price: {
      amount: string;
      currency: string;
    };
    currency: string;
    add_ons: Array<{
      code: string | null;
      label: string | null;
      price: {
        amount: string | null;
        currency: string | null;
      };
      available: boolean | null;
      purchasable: boolean | null;
      note: string | null;
    }>;
    pay: Array<unknown>;
    purchase_flow: string;
  };
  /** Every non-ok freshness probe, shipped rather than hidden (the honesty layer). */
  warts: Array<{
    dataset: string | null;
    surface: string | null;
    status: string | null;
    observed_max_date: string | null;
    age_days: number | null;
    max_age_days: number | null;
    probed_at: string | null;
    reason: string | null;
  }>;
  freshness: Array<{
    dataset: string | null;
    surface: string | null;
    status: string | null;
    observed_max_date: string | null;
    age_days: number | null;
    max_age_days: number | null;
    probed_at: string | null;
    reason: string | null;
  }>;
  advisories: Array<{
    code: string | null;
    severity: string | null;
    headline: string | null;
    cause: string | null;
    effect: string | null;
    remedy: string | null;
    worst_affected?: Array<{
      name: string | null;
      coverage: number | null;
      baseline_coverage: number | null;
      delta: number | null;
    }>;
  }>;
  state_index: Array<number | string | null>;
  state: {
    state_fips: string;
    state: string;
    counties: number;
    parcels: number;
    rollup_parcels: number;
    share_of_national: number;
    coverage: {
      address: number;
      geocode: number;
      owner: number;
      value: number;
      geometry: number;
    };
    last_analyze: string;
    worst_gaps: Array<{
      name: string | null;
      label: string | null;
      national: number | null;
      state: number | null;
      section: string | null;
    }>;
  };
  /** Number of field entries returned after filters. */
  field_count: number;
  /** The field dictionary: one entry per serving column with name, label, section, grain, tier, national (and optional per-state) coverage, and honesty flags. */
  fields: Array<{
    name: string | null;
    type: string | null;
    section: string | null;
    grain: string | null;
    category: string | null;
    sellable: boolean | null;
    label: string | null;
    description: string | null;
    source: string | null;
    curated: boolean | null;
    coverage: number | null;
    tier: string | null;
    baseline_coverage: number | null;
    coverage_delta: number | null;
    states_measured: number | null;
    states_with_any_coverage: number | null;
    n_distinct: number | null;
    flags: Array<string | null>;
    red_cell: boolean | null;
    headline_eligible: boolean | null;
    curation_review_required: boolean | null;
    source_as_of: string | null;
    source_as_of_basis: string;
    catalog_published_at: string | null;
    catalog_generated_at: string | null;
    source_label_basis: string;
    grain_basis: string;
    catalog_description: string | null;
    historical_advisories: Array<unknown>;
    state_coverage: number | null;
  }>;
}

// GET /api/v1/traffic/stations (traffic.stations)

/** Parameters for `traffic.stations`. */
export interface TrafficStationsParams {
  /**
   * `west,south,east,north` in decimal degrees.
   *
   * Query parameter `bbox`.
   */
  bbox: string;
}

/** Success response of `traffic.stations` (GET /api/v1/traffic/stations). */
export interface TrafficStationsResponse {
  data: Array<{
    lat: number | null;
    lng: number | null;
    aadt: number | null;
    route: string | null;
  }>;
}

// POST /api/v1/verify (verify.batch)

/** Parameters for `verify.batch`. */
export interface VerifyBatchParams {
  /**
   * FREE count + price.
   *
   * Query parameter `preview`.
   */
  preview?: string;
  /**
   * Prepaid credit token to debit the batch.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken?: string;
  /**
   * Base64 x402 PaymentPayload.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
  /** Body field `lookups`. */
  lookups: Array<{
    parcel_id: string;
    fields: Array<string>;
  }>;
}

/** Success response of `verify.batch` (POST /api/v1/verify). */
export interface VerifyBatchResponse {
  lookup_count: number;
  parcel_count: number;
  quote: {
    per_lookup: {
      amount: string;
      currency: string;
    };
    total: {
      amount: string;
      currency: string;
    };
    total_usd: number;
    total_atomic_usdc: string;
    asset: string;
    lookup_count: number;
    breakdown: {
      per_lookup_usd: number;
      total_raw: number;
      capped: boolean;
    };
    pay: Array<string | null>;
    note: string;
  };
  provenance: {
    source: string;
    source_datasets: Array<string | null>;
    as_of: string | null;
    as_of_basis: string | null;
    serving_epoch: string | null;
    freshness_status: string;
    catalog_reference: {
      catalog_version: string;
      catalog_generated_at: string;
      catalog_seal: {
        algorithm: string;
        value: string;
        covers: string;
      };
    };
    note: string;
  };
  preview: boolean;
  note: string;
}

// GET /api/v1/verify (verify.get)

/** Parameters for `verify.get`. */
export interface VerifyGetParams {
  /**
   * Canonical state:county:parcel.
   *
   * Query parameter `parcel_id`.
   */
  parcel_id: string;
  /**
   * Comma-separated field aliases.
   *
   * Query parameter `fields`.
   */
  fields: string;
  /**
   * FREE count + price.
   *
   * Query parameter `preview`.
   */
  preview?: string;
  /**
   * Prepaid credit token.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken?: string;
  /**
   * Base64 x402 PaymentPayload.
   *
   * Header `X-PAYMENT`.
   */
  payment?: string;
}

/** Success response of `verify.get` (GET /api/v1/verify). */
export interface VerifyGetResponse {
  lookup_count: number;
  parcel_count: number;
  quote: {
    per_lookup: {
      amount: string;
      currency: string;
    };
    total: {
      amount: string;
      currency: string;
    };
    total_usd: number;
    total_atomic_usdc: string;
    asset: string;
    lookup_count: number;
    breakdown: {
      per_lookup_usd: number;
      total_raw: number;
      capped: boolean;
    };
    pay: Array<string | null>;
    note: string;
  };
  provenance: {
    source: string;
    source_datasets: Array<string | null>;
    as_of: string | null;
    as_of_basis: string | null;
    serving_epoch: string | null;
    freshness_status: string;
    catalog_reference: {
      catalog_version: string;
      catalog_generated_at: string;
      catalog_seal: {
        algorithm: string;
        value: string;
        covers: string;
      };
    };
    note: string;
  };
  preview: boolean;
  note: string;
}

// POST /api/v1/watch (watch.create)

/** Parameters for `watch.create`. */
export interface WatchCreateParams {
  /**
   * The pzc_ credit token.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken: string;
  /** Body field `name`. */
  name?: string;
  /**
   * Default: all three.
   *
   * Body field `event_types`.
   */
  event_types?: Array<"parcel.sold" | "parcel.owner_changed" | "parcel.permit_filed">;
  /**
   * Exactly one shape: `{parcel_ids: [...]}` / `{canonical_ids: [...]}` (1-500 ids), `{state_fips}` or `{state_fips, county_fips}`.
   *
   * Body field `filter`.
   */
  filter: {
    parcel_ids?: Array<string>;
    canonical_ids?: Array<string>;
    state_fips?: string;
    county_fips?: string;
  };
}

/** Success response of `watch.create` (POST /api/v1/watch). */
export type WatchCreateResponse = { [key: string]: unknown };

// DELETE /api/v1/watch/{id} (watch.delete)

/** Parameters for `watch.delete`. */
export interface WatchDeleteParams {
  /**
   * The pzc_ credit token.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken: string;
}

/** Success response of `watch.delete` (DELETE /api/v1/watch/{id}). */
export type WatchDeleteResponse = { [key: string]: unknown };

// GET /api/v1/watch (watch.list)

/** Parameters for `watch.list`. */
export interface WatchListParams {
  /**
   * The pzc_ credit token (identity + wallet).
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken: string;
}

/** Success response of `watch.list` (GET /api/v1/watch). */
export type WatchListResponse = { [key: string]: unknown };

// GET /api/v1/watch/{id} (watch.poll)

/** Parameters for `watch.poll`. */
export interface WatchPollParams {
  /**
   * FREE count + price + masked sample; no cursor move.
   *
   * Query parameter `preview`.
   */
  preview?: boolean;
  /**
   * Max deltas per source (default 50, max 200).
   *
   * Query parameter `limit`.
   */
  limit?: number;
  /**
   * The pzc_ credit token.
   *
   * Header `X-CREDIT-TOKEN`.
   */
  creditToken: string;
}

/** Success response of `watch.poll` (GET /api/v1/watch/{id}). */
export interface WatchPollResponse {
  deltas?: Array<{ [key: string]: unknown }>;
  people_fields?: PeopleFieldsWithheld;
}

// POST /api/v1/webhooks (webhooks.create)

/** Parameters for `webhooks.create`. */
export interface WebhooksCreateParams {
  /**
   * Customer endpoint. https:// only.
   *
   * Body field `url`.
   */
  url: string;
  /**
   * Event types to subscribe to. NOTE: only parcel.sold is live in v1.0; others 501.
   *
   * Body field `event_types`.
   */
  event_types: Array<"parcel.sold" | "parcel.permit_filed" | "parcel.owner_changed">;
  /** Body field `filter_kind`. */
  filter_kind: "parcel_ids" | "state_fips" | "county_fips";
  /** Body field `filter_value`. */
  filter_value: WebhookFilter;
  /**
   * Optional human-readable label for your dashboard.
   *
   * Body field `description`.
   */
  description?: string | null;
}

/** Success response of `webhooks.create` (POST /api/v1/webhooks). */
export type WebhooksCreateResponse = WebhookCreated;

// DELETE /api/v1/webhooks/{id} (webhooks.delete)

/** Parameters for `webhooks.delete` (the operation takes none). */
export type WebhooksDeleteParams = Record<string, never>;

/** Success response of `webhooks.delete` (DELETE /api/v1/webhooks/{id}). */
export interface WebhooksDeleteResponse {
  deleted?: string;
}

// GET /api/v1/webhooks/{id}/deliveries (webhooks.deliveries)

/** Parameters for `webhooks.deliveries` (the operation takes none). */
export type WebhooksDeliveriesParams = Record<string, never>;

/** Success response of `webhooks.deliveries` (GET /api/v1/webhooks/{id}/deliveries). */
export interface WebhooksDeliveriesResponse {
  deliveries?: Array<WebhookDelivery>;
}

// GET /api/v1/webhooks/{id} (webhooks.get)

/** Parameters for `webhooks.get` (the operation takes none). */
export type WebhooksGetParams = Record<string, never>;

/** Success response of `webhooks.get` (GET /api/v1/webhooks/{id}). */
export type WebhooksGetResponse = Webhook;

// GET /api/v1/webhooks (webhooks.list)

/** Parameters for `webhooks.list` (the operation takes none). */
export type WebhooksListParams = Record<string, never>;

/** Success response of `webhooks.list` (GET /api/v1/webhooks). */
export interface WebhooksListResponse {
  webhooks: Array<Webhook>;
  quota: WebhookQuota;
  tier: "free" | "starter" | "pro" | "scale" | "api_100k";
}

// POST /api/v1/webhooks/{id}/deliveries/{deliveryId}/retry (webhooks.retryDelivery)

/** Parameters for `webhooks.retryDelivery` (the operation takes none). */
export type WebhooksRetryDeliveryParams = Record<string, never>;

/** Success response of `webhooks.retryDelivery` (POST /api/v1/webhooks/{id}/deliveries/{deliveryId}/retry). */
export interface WebhooksRetryDeliveryResponse {
  id: string;
  status: "pending";
  next_attempt_at: string | null;
  attempts: number;
}
