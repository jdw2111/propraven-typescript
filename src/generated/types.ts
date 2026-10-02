// Code generated from openapi.json by scripts/generate.mjs. DO NOT EDIT.
// Types for every components/schemas entry and every operation's params and success response.

import type { PageItem } from '../core/types.js';

// ---- components/schemas ----

export interface AccountUsage {
  tier?: "free" | "starter" | "pro" | "scale" | "api_100k";
  period?: {
    start?: string;
    end?: string;
    label?: string;
  };
  /** Plan allotment for the current period. */
  calls_included?: number;
  calls_used?: number;
  calls_remaining?: number;
  /** Whether further calls will be hard-rejected vs allowed-and-billed. */
  hard_capped?: boolean;
  rate_limit?: {
    per_minute?: number;
    per_day?: number;
  };
}

export interface AffordabilityRow {
  county_fips?: string;
  state_fips?: string;
  county_name?: string | null;
  year?: number;
  median_sale_price?: number | null;
  median_household_income?: number | null;
  price_to_income_ratio?: number | null;
  monthly_payment_estimate?: number | null;
  pct_income_for_housing?: number | null;
  affordability_rating?: "AFFORDABLE" | "MODERATE" | "EXPENSIVE" | "VERY_EXPENSIVE";
}

/** Mapbox-geocoded address suggestion. Use to disambiguate user input before calling /api/v1/lookup or /api/v1/parcels/{id}. */
export interface AutocompleteAddress {
  name?: string;
  type?: "address";
  lat?: number | null;
  lng?: number | null;
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
  parcel_id?: string;
  county_fips?: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  type?: "parcel";
}

export interface AutocompleteResult {
  locations?: Array<AutocompleteLocation>;
  parcels?: Array<AutocompleteParcel>;
  addresses?: Array<AutocompleteAddress>;
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
  authority?: string;
  dataset?: string;
  url?: string | null;
}

export interface Contractor {
  contractor_name_normalized?: string;
  contractor_license?: string | null;
  permit_count?: number;
  jurisdiction_count?: number;
  state_count?: number;
  county_count?: number;
  total_permit_value?: number;
  avg_permit_value?: number;
  first_permit_date?: string | null;
  last_permit_date?: string | null;
  active_years?: number | null;
  top_permit_types?: Array<string> | null;
  /** Comma-delimited 2-letter state codes. */
  states_list?: string | null;
  /** National rank, 1 = highest activity. */
  contractor_rank?: number;
}

export interface CountyDetail {
  market_stats?: Array<{
    county_fips?: string;
    state_fips?: string;
    quarter?: string;
    sale_count?: number;
    median_sale_price?: number | null;
    avg_sale_price?: number | null;
    total_volume?: number | null;
    price_yoy_pct?: number | null;
    /** Average days on market. */
    avg_dom?: number | null;
  }>;
  affordability?: Array<AffordabilityRow>;
  parcel_summary?: {
    parcel_count?: number;
    avg_assessed_value?: number | null;
  };
  flip_summary?: {
    flip_count?: number;
    avg_roi?: number | null;
    avg_hold_days?: number | null;
    total_profit?: number | null;
  } | null;
}

export interface Deed {
  document_number?: string;
  recording_date?: string;
  sale_date?: string | null;
  sale_price?: number | null;
  grantor_name?: string;
  grantee_name?: string;
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
  county_fips?: string;
  state_fips?: string;
  parcel_id?: string;
  owner_name?: string;
  entity_type?: "LLC" | "CORP" | "TRUST" | "LP" | "LTD" | "ASSOCIATION" | "OTHER_ENTITY";
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  total_assessed_value?: number | null;
  zoning?: string | null;
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
  results?: Array<Parcel>;
  total?: number;
  page?: number;
  pages?: number;
}

export interface HighLandRatioParcel {
  county_fips?: string;
  state_fips?: string;
  parcel_id?: string;
  owner_name?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  land_assessed_value?: number | null;
  improvement_assessed_value?: number | null;
  total_assessed_value?: number | null;
  /** land / improvement, higher = more redevelopment potential. */
  land_improvement_ratio?: number;
  zoning?: string | null;
}

/** One delivered lead. Signal-specific strength fields are flattened alongside the common keys (e.g. years_held + hold_tier for long_hold; profit + profit_pct + flip_tier for flip; land_improvement_ratio for high_land_ratio/distressed; property_count + states_list for portfolio_owner). */
export interface Lead {
  /** state_fips:county_fips3:parcel_id (the assessor APN, never a PropRaven UUID). Null on the owner-grain portfolio_owner cohort. MASKED to "37:183:..." in the free preview. */
  canonical_id?: string | null;
  /** Situs address. House number stripped in the free preview. */
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  /** Withheld (null) in the free preview. Delivered leads go to accounts only. */
  owner_name?: string | null;
  /** Total assessed value (sell price on the flip cohort). */
  assessed_value?: number | null;
  /** Deterministic 1-100: the signal's base intent plus a bounded bonus from that signal's own strength column. Re-derivable, never random. */
  lead_score?: number;
  provenance?: {
    /** The serving epoch's generated_at. */
    as_of?: string | null;
    source?: string;
  };
  /** Present and true ONLY on free-preview sample leads. */
  masked?: boolean;
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
  preview?: true;
  /** Up to three MASKED leads: APN truncated to state:county, house number stripped, owner name withheld. Enough to judge the set, not enough to work it. */
  sample?: Array<Lead>;
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
  per_lead?: Money;
  /** Unit price to 4dp: clamp($0.25 x S x V, $0.05, $1.00). */
  per_lead_usd?: number;
  total?: Money;
  /** The amount actually charged: min(count x per_lead, $20). */
  total_usd?: number;
  /** total_usd in USDC atomic units (6dp) -- what the 402 advertises as maxAmountRequired. */
  total_atomic_usdc?: string;
  asset?: string;
  /** Leads priced = leads delivered. */
  count?: number;
  signal?: string;
  /** Asset-value tier, from the median assessed value of the delivered set. */
  tier?: "low" | "mid" | "high" | "premium";
  tier_label?: string;
  /** The dials, so the price is auditable. */
  breakdown?: {
    base_per_lead?: number;
    /** Signal-strength multiplier (absentee 1.0 ... distressed 1.9). */
    S?: number;
    /** Asset-value tier multiplier (low 0.7, mid 1.0, high 1.5, premium 2.2). */
    V?: number;
    /** Per-lead price BEFORE the [$0.05, $1.00] clamp. */
    per_lead_raw?: number;
    /** count x per_lead BEFORE the $20 per-call cap. */
    total_raw?: number;
    /** True when the $20 cap bound -- volume beyond it was free. */
    capped?: boolean;
  };
  pay?: Array<string>;
  note?: string;
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
  county_fips?: string;
  state_fips?: string;
  parcel_id?: string;
  owner_name?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  last_sale_date?: string | null;
  years_held?: number;
  hold_tier?: "10-15yr" | "15-20yr" | "20-30yr" | "30yr+";
  total_assessed_value?: number | null;
}

/** One mailing address, read from ONE address column family of the record (owner_mailing_* or owner_*), never a street from one family and a ZIP from the other. */
export interface MailingAddress {
  /** Where the address came from, e.g. owner_mailing, owner_address, deed_grantee. */
  basis?: string;
  line1?: string | null;
  city?: string | null;
  state?: string | null;
  zip5?: string | null;
  zip4?: string | null;
  /** Street, city, state and a 5-digit ZIP are all present and consistent. */
  mail_ready?: boolean;
  po_box?: boolean;
  /** The mailing address is the property itself (owner-occupied). */
  equals_situs?: boolean;
  /** Owner (name) cards only: how many of the owner's parcels carry this address. */
  parcels_citing?: number;
  /** The address as one mailing label. */
  label?: string | null;
  source?: ContactSource;
  as_of?: string | null;
  /** A = the authority's own complete record; D = contradictory (hidden unless include_low_confidence=true). */
  grade?: "A" | "B" | "C" | "D";
}

export interface MarketFlipsRow {
  county_fips?: string;
  flip_count?: number;
  /** Average profit percentage (e.g. 0.18 = 18%). */
  avg_roi?: number | null;
  avg_hold_days?: number | null;
  total_profit?: number | null;
}

export interface MarketSummary {
  county_fips?: string;
  state_fips?: string;
  county_name?: string | null;
  year?: number;
  sale_count?: number;
  median_sale_price?: number | null;
  avg_sale_price?: number | null;
}

/** A money amount as a decimal string plus its currency code. */
export interface Money {
  amount?: string;
  currency?: string;
}

export interface Owner {
  owner_name?: string;
  entity_type?: "individual" | "corporation" | "llc" | "trust" | "government" | "other";
  property_count?: number;
  total_assessed_value?: number;
  states?: Array<string>;
}

/** The owner card: the owner of record and how to reach them by mail, from what the publishing authorities released. */
export interface OwnerCard {
  /** { kind: "parcel", canonical_id } or { kind: "owner", parcels_considered, parcels_capped }. */
  subject?: { [key: string]: unknown };
  owner?: {
    name?: string | null;
    name_status?: "present" | "missing" | "placeholder" | "confidential";
    entity_type?: string | null;
  };
  contact?: {
    /** The other owners the same assessor record names, in the record's order; never the owner again. Name mode: across the side-read parcels, distinct by name. */
    co_owners?: Array<CoOwner>;
    /** none_listed is claimed only for a record whose state's co-owners were loaded from the release that serves it; not_checked when the lookup could not run, the state is not loaded yet, or the loaded row was read beside a different owner. */
    co_owner_status?: "listed" | "none_listed" | "not_checked";
    /** Name mode: { parcels_checked, parcels_considered }. */
    co_owner_scope?: { [key: string]: unknown };
    mailing?: MailingAddress | null;
    /** Parcel mode: a latest-deed grantee address naming the same owner, when it differs. */
    mailing_alternates?: Array<MailingAddress>;
    /** Name mode: the owner's distinct mailing addresses, most-cited first. */
    mailing_addresses?: Array<MailingAddress>;
    /** Secretary of State principals (entity type, status, registered agent, officers) when the owner is an entity. */
    entity?: { [key: string]: unknown } | null;
    /** OWNER phones (owner role only) published on a building permit filed in the current owner's era and naming them (grade C): { e164, display, ext, phone_raw, role_basis, permit_ref, source, as_of, as_of_basis, grade }. */
    phones?: Array<{ [key: string]: unknown }>;
    /** none_published is claimed only after the permit lookup ran; not_checked when it could not (timeout, no acquisition date, no owner name). */
    phone_status?: "published" | "none_published" | "not_checked";
    /** Name mode: { parcels_checked, parcels_considered }. */
    phone_scope?: { [key: string]: unknown };
    emails?: Array<{ [key: string]: unknown }>;
    none_published?: Array<"phone" | "email">;
    hidden_low_confidence?: number;
    /** Applicant and contractor phones on the parcel's permits (name mode: across the side-read parcels), newest first, one per (role, number), at most 10: { role: applicant|contractor, role_basis, name, e164, display, ext, phone_raw, permit_ref, era: current_owner|prior_owner|unknown, source, as_of, as_of_basis, grade }. Never the owner's phone. */
    people_on_permits?: Array<{ [key: string]: unknown }>;
    /** none_published only after the parcel's permits were read in full; not_checked when the read did not run or stopped at its cap. */
    people_on_permits_status?: "listed" | "none_published" | "not_checked";
  };
  note?: string;
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
  /** 5-digit county FIPS code. */
  county_fips?: string;
  /** County-assigned parcel identifier. */
  parcel_id?: string;
  state_fips?: string;
  state_abbr?: string;
  county_name?: string;
  address?: string;
  city?: string;
  zip?: string;
  owner_name?: string;
  owner_type?: "individual" | "corporation" | "llc" | "trust" | "government" | "other";
  mailing_address?: string | null;
  assessed_value?: number | null;
  land_value?: number | null;
  improvement_value?: number | null;
  market_value?: number | null;
  acreage?: number | null;
  year_built?: number | null;
  zoning?: string | null;
  zoning_category?: "residential" | "commercial" | "industrial" | "agricultural" | "mixed" | "other" | null;
  land_use?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  last_sale_date?: string | null;
  last_sale_price?: number | null;
  absentee_owner?: boolean;
  /** Crime score from 0 (low) to 100 (high). */
  crime_score?: number | null;
  /** Composite deal opportunity score from 0 to 100. */
  deal_score?: number | null;
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
  type?: "Feature";
  geometry?: {
    type?: "Polygon";
    /** GeoJSON polygon coordinate rings: outer ring first, then any inner rings. */
    coordinates?: Array<Array<Array<number>>>;
  };
  properties?: {
    parcel_id?: string;
    county_fips?: string;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    owner_name?: string | null;
    total_assessed_value?: number | null;
    property_type?: string | null;
    year_built?: number | null;
    latitude?: number | null;
    longitude?: number | null;
  };
}

/** GeoJSON FeatureCollection of parcel polygons. Each feature's properties carry the basic parcel summary for popup rendering. */
export interface ParcelGeoJSON {
  type?: "FeatureCollection";
  features?: Array<ParcelGeoFeature>;
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
  permit_number?: string;
  type?: string;
  status?: "issued" | "pending" | "approved" | "expired" | "completed" | "denied";
  description?: string;
  issued_date?: string | null;
  estimated_cost?: number | null;
  contractor?: string | null;
}

export interface PortfolioOwner {
  owner_name_normalized?: string;
  owner_state?: string | null;
  property_count?: number;
  state_count?: number;
  county_count?: number;
  total_assessed_value?: number | null;
  avg_assessed_value?: number | null;
  total_acreage?: number | null;
  states_list?: string | null;
  /** National rank, 1 = largest portfolio. */
  portfolio_rank?: number;
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
  flood_zone?: {
    /** FEMA flood zone designation. */
    zone?: string | null;
    in_floodplain?: boolean;
    description?: string | null;
  };
  wildfire?: {
    risk_class?: "low" | "moderate" | "high" | "very_high" | "extreme" | null;
    /** Annual burn probability as a decimal. */
    burn_probability?: number | null;
  };
  air_quality?: {
    /** Median Air Quality Index value. */
    median_aqi?: number | null;
    category?: "good" | "moderate" | "unhealthy_sensitive" | "unhealthy" | "very_unhealthy" | "hazardous" | null;
  };
  crime?: {
    /** Crime score from 0 (low) to 100 (high). */
    score?: number | null;
    tier?: "very_low" | "low" | "moderate" | "high" | "very_high" | null;
    trend?: "decreasing" | "stable" | "increasing" | null;
  };
}

/** A refusal that took nothing: the work was not done and nothing was charged. Retry after `Retry-After`. */
export interface ServiceUnavailable {
  error: string;
}

export interface TrafficStationHistory {
  station?: {
    id?: string;
    station_id?: string;
    route_name?: string | null;
    functional_class?: string | null;
    /** Most recent AADT count. */
    aadt_current?: number | null;
    aadt_year?: number | null;
    cagr_3yr?: number | null;
    cagr_5yr?: number | null;
    cagr_7yr?: number | null;
    latitude?: number | null;
    longitude?: number | null;
  } | null;
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
  maxEndpoints?: number;
  /** Max event deliveries per UTC day on this tier. */
  maxEventsPerDay?: number;
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
export type CmbsExposureResponse = unknown;

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
export type CohortsListResponse = unknown;

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
  total_parcels?: number;
  states_covered?: number;
  data?: Array<{
    state_fips?: string;
    state_name?: string;
    county_fips?: string | null;
    county_name?: string | null;
    parcel_count?: number;
    geocoded_pct?: number;
    owner_pct?: number;
    value_pct?: number;
  }>;
}

// GET /api/v1/coverage/map (coverage.map)

/** Parameters for `coverage.map` (the operation takes none). */
export type CoverageMapParams = Record<string, never>;

/** Success response of `coverage.map` (GET /api/v1/coverage/map). */
export type CoverageMapResponse = unknown;

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
export type CrimeLookupResponse = unknown;

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
  data?: Array<Parcel>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<Contractor>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<EntityOwnedParcel>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<{
    county_fips?: string;
    parcel_id?: string;
    address?: string;
    buy_date?: string;
    buy_price?: number;
    sell_date?: string;
    sell_price?: number;
    profit?: number;
    hold_days?: number;
    flip_tier?: "QUICK_FLIP" | "SHORT_HOLD" | "MEDIUM_HOLD";
    buyer_name?: string;
    seller_name?: string;
  }>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<HighLandRatioParcel>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<LongHoldParcel>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<MarketSummary>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<PortfolioOwner>;
  total?: number;
  limit?: number;
  offset?: number;
}

/** One item yielded by `deals.portfolioOwnersAll`. */
export type DealsPortfolioOwnersItem = PageItem<DealsPortfolioOwnersResponse, "data">;

// GET /api/v1/freshness/datasets (freshness.datasets)

/** Parameters for `freshness.datasets` (the operation takes none). */
export type FreshnessDatasetsParams = Record<string, never>;

/** Success response of `freshness.datasets` (GET /api/v1/freshness/datasets). */
export type FreshnessDatasetsResponse = unknown;

// GET /api/v1/freshness (freshness.get)

/** Parameters for `freshness.get` (the operation takes none). */
export type FreshnessGetParams = Record<string, never>;

/** Success response of `freshness.get` (GET /api/v1/freshness). */
export type FreshnessGetResponse = unknown;

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
export type LookupBatchResponse = unknown;

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
export type LookupGetResponse = unknown;

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
  data?: Array<{
    county_fips?: string;
    county_name?: string;
    state_fips?: string;
    state_abbr?: string;
    quarter?: string;
    sale_count?: number;
    median_price?: number;
    avg_price?: number;
    /** Year-over-year median price change as a decimal (e.g., 0.05 = 5%). */
    yoy_change?: number;
    avg_days_on_market?: number;
  }>;
  total?: number;
  limit?: number;
  offset?: number;
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
  data?: Array<MarketFlipsRow>;
  total?: number;
  limit?: number;
  offset?: number;
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
export type MarketSnapshotResponse = unknown;

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
  data?: Array<{
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
  owner_name?: string;
  entity_type?: "individual" | "corporation" | "llc" | "trust" | "government" | "other";
  summary?: {
    property_count?: number;
    total_assessed_value?: number;
    avg_assessed_value?: number;
    states?: Array<string>;
    counties?: number;
    zoning_breakdown?: { [key: string]: number };
  };
  properties?: Array<Parcel>;
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
  data?: Array<Parcel>;
  total?: number;
  limit?: number;
  offset?: number;
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
export type OwnersReportResponse = { [key: string]: unknown };

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
  data?: Array<Owner>;
}

// GET /api/v1/owners/{name}/transactions (owners.transactions)

/** Parameters for `owners.transactions` (the operation takes none). */
export type OwnersTransactionsParams = Record<string, never>;

/** Success response of `owners.transactions` (GET /api/v1/owners/{name}/transactions). */
export interface OwnersTransactionsResponse {
  data?: Array<OwnerTransaction>;
  count?: number;
}

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
export type ParcelsBatchResponse = unknown;

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
export type ParcelsCompPackResponse = { [key: string]: unknown };

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
export type ParcelsCompsResponse = unknown;

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
export type ParcelsOccupantsResponse = unknown;

// GET /api/v1/parcels/{id}/owner (parcels.owner)

/** Parameters for `parcels.owner` (the operation takes none). */
export type ParcelsOwnerParams = Record<string, never>;

/** Success response of `parcels.owner` (GET /api/v1/parcels/{id}/owner). */
export interface ParcelsOwnerResponse {
  owner_name?: string;
  entity_type?: "individual" | "corporation" | "llc" | "trust" | "government" | "other";
  mailing_address?: string;
  portfolio_summary?: {
    property_count?: number;
    total_assessed_value?: number;
    states?: Array<string>;
  };
  properties?: Array<Parcel>;
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
export type ParcelsPoisResponse = unknown;

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
export type ParcelsRiskScoreResponse = { [key: string]: unknown };

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
export type ParcelsViolationsResponse = unknown;

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
  data: Array<Parcel>;
  /** Exact matching count up to 10,000; 10,000 when capped; null when the count timed out. */
  total: number | null;
  /** True only when `total` is capped (a lower bound). */
  total_is_estimate: boolean;
  total_is_lower_bound: boolean;
  /** Present when the count did not finish. */
  total_status?: "timed_out";
  has_more: boolean;
  limit: number;
  offset: number;
  /** False when `bounds` was given (sort is not applied to bounded queries) or no sort was requested. */
  sort_applied: boolean;
  /** Present when withheld columns (traffic counts) are in the rows; they are null. */
  withhold_gate?: { [key: string]: unknown };
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
  contract_version?: number;
  catalog_version?: string;
  seal?: string;
  /** 'parcel' in PARCEL mode; absent in JURISDICTION mode. */
  mode?: "parcel";
  /** PARCEL mode: the resolved parcel identity. */
  parcel?: { [key: string]: unknown };
  /** PARCEL mode: the value-tiered quote for this parcel. */
  dossier_quote?: {
    price?: Money;
    price_usd?: number;
    /** What the x402 402 advertises as maxAmountRequired (USDC atomic, 6dp). */
    price_atomic_usdc?: string;
    asset?: string;
    /** Asset-class band (residential|multifamily|premium) derived from assessed value. */
    band?: { [key: string]: unknown };
    /** The auditable multipliers: base, V (asset value), R (data richness), F (freshness). */
    breakdown?: { [key: string]: unknown };
    /** The cheap signals the multipliers were derived from. */
    signals?: { [key: string]: unknown };
    pay?: Array<string>;
    [key: string]: unknown;
  };
  /** JURISDICTION mode: the state/county being described. */
  jurisdiction?: { [key: string]: unknown };
  /** JURISDICTION mode: headline coverage facts and parcel counts. */
  coverage?: { [key: string]: unknown };
  /** JURISDICTION mode: national vs in-jurisdiction field-coverage summaries. */
  fields?: { [key: string]: unknown };
  worst_gaps?: Array<{ [key: string]: unknown }>;
  /** JURISDICTION mode: the base dossier quote. */
  quote?: { [key: string]: unknown };
  /** JURISDICTION mode: the state's counties by parcel count. */
  counties?: { [key: string]: unknown };
  [key: string]: unknown;
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
  contract_version?: number;
  /** The serving epoch this catalog was built for. */
  catalog_version?: string;
  generated_at?: string;
  /** Content hash: two callers under the same seal get byte-identical numbers. */
  seal?: string;
  /** National counts (distinct parcels, rows, mapped locations, geocoded parcels) each with the definition it was measured under. */
  measured_from?: { [key: string]: unknown };
  counts?: { [key: string]: unknown };
  /** The dossier pricing model (base price, floor/cap, add-ons). */
  pricing?: { [key: string]: unknown };
  /** The base dossier quote derived from the pricing model. The per-parcel, value-tiered price is quoted by /storefront/availability?parcel_id=. */
  quote?: { [key: string]: unknown };
  /** Every non-ok freshness probe, shipped rather than hidden (the honesty layer). */
  warts?: Array<{ [key: string]: unknown }>;
  /** Number of field entries returned after filters. */
  field_count?: number;
  /** The field dictionary: one entry per serving column with name, label, section, grain, tier, national (and optional per-state) coverage, and honesty flags. */
  fields?: Array<{ [key: string]: unknown }>;
  [key: string]: unknown;
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
export type TrafficStationsResponse = unknown;

// POST /api/v1/verify (verify.batch)

/** Parameters for `verify.batch`. */
export interface VerifyBatchParams {
  /**
   * FREE count + price.
   *
   * Query parameter `preview`.
   */
  preview: string;
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
export type VerifyBatchResponse = { [key: string]: unknown };

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
  preview: string;
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
export type VerifyGetResponse = { [key: string]: unknown };

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
  webhooks?: Array<Webhook>;
  quota?: WebhookQuota;
  tier?: "free" | "starter" | "pro" | "scale" | "api_100k";
}

// POST /api/v1/webhooks/{id}/deliveries/{deliveryId}/retry (webhooks.retryDelivery)

/** Parameters for `webhooks.retryDelivery` (the operation takes none). */
export type WebhooksRetryDeliveryParams = Record<string, never>;

/** Success response of `webhooks.retryDelivery` (POST /api/v1/webhooks/{id}/deliveries/{deliveryId}/retry). */
export type WebhooksRetryDeliveryResponse = unknown;
