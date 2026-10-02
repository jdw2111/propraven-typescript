// Hand-written. Query-string and path encoding.

/** Encode one query value: booleans as true/false, arrays comma-joined, objects as JSON. */
function encodeScalar(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') return String(value);
  if (value instanceof Date) return value.toISOString();
  return JSON.stringify(value);
}

/**
 * Append `name=value` pairs. `null`/`undefined` are omitted. Arrays are comma-joined unless
 * `explode` is true, in which case the parameter is repeated.
 */
export function appendQuery(search: URLSearchParams, name: string, value: unknown, explode = false): void {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    const items = value.filter((v) => v !== undefined && v !== null);
    if (explode) {
      for (const item of items) search.append(name, encodeScalar(item));
    } else {
      search.append(name, items.map(encodeScalar).join(','));
    }
    return;
  }
  search.append(name, encodeScalar(value));
}

/** URL-encode one path segment value (`37:119:12104406` -> `37%3A119%3A12104406`). */
export function encodePathSegment(value: unknown): string {
  return encodeURIComponent(String(value));
}
