// Hand-written. Types shared by the core and the generated layer.

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/** Per-request options. Every generated method accepts these as its last argument. */
export interface RequestOptions {
  /** Timeout for this request in milliseconds (overrides the client's `timeout`). */
  timeout?: number;
  /** Retries for this request (overrides the client's `maxRetries`). */
  maxRetries?: number;
  /** Extra headers. A `null` value removes a header the SDK would otherwise send. */
  headers?: Record<string, string | null | undefined>;
  /** Extra query parameters, encoded like the generated ones. */
  query?: Record<string, unknown>;
  /** Abort the request (never retried). */
  signal?: AbortSignal;
}

/** Options for the `*All` auto-paginating iterators. */
export interface PaginationOptions extends RequestOptions {
  /** Items to request per page (sent as `limit`). Defaults to `params.limit`, else the server default. */
  pageSize?: number;
  /** Stop after yielding this many items in total. */
  maxItems?: number;
}

/** The rate-limit window reported by the last response (`X-RateLimit-*` headers). */
export interface RateLimitInfo {
  /** Size of the window that will refuse you first. */
  limit: number | null;
  /** Calls left in that window. */
  remaining: number | null;
  /** Unix epoch SECONDS when that window resets. */
  reset: number | null;
}

/** The parsed body plus the raw `Response`, from `APIPromise.withResponse()`. */
export interface WithResponse<T> {
  data: T;
  response: Response;
  rateLimit: RateLimitInfo | null;
  requestId: string | null;
}

/**
 * Element type of a page: `R[K][number]`, distributed over unions, `unknown` when `R` is untyped.
 * Bare-array responses page over the array itself.
 */
export type PageItem<R, K extends string> =
  unknown extends R ? unknown
  : R extends ReadonlyArray<infer A> ? A
  : R extends { [P in K]?: ReadonlyArray<infer I> | null | undefined } ? I
  : never;

/** How the generated layer describes one operation to the core. */
export interface OperationDescriptor {
  readonly operationId: string;
  readonly group: string;
  readonly method: string;
  readonly httpMethod: HTTPMethod;
  /** Path template with `{name}` placeholders, including the `/api/v1` prefix. */
  readonly path: string;
  /** Path parameter names in path order (= positional argument order). */
  readonly pathParams: readonly string[];
  /** Query parameters: SDK name -> wire name and array encoding. */
  readonly query: Readonly<Record<string, { readonly name: string; readonly explode?: boolean }>>;
  /** Header parameters: SDK name (e.g. `creditToken`) -> wire header (e.g. `X-CREDIT-TOKEN`). */
  readonly headers: Readonly<Record<string, string>>;
  /**
   * JSON body. `fields`: the body is an object whose members are spread into the params object
   * (SDK name -> wire name). `value`: the whole body is passed as one param (non-object schemas).
   */
  readonly body:
    | null
    | { readonly kind: 'fields'; readonly fields: Readonly<Record<string, string>>; readonly required: boolean }
    | { readonly kind: 'value'; readonly param: string; readonly required: boolean };
  /** `json`: parse JSON; `text`: return a string (CSV); `auto`: by Content-Type; `none`: no body. */
  readonly response: 'json' | 'text' | 'auto' | 'none';
  /** `Accept` header for this operation. */
  readonly accept: string;
  readonly pagination?:
    | { readonly style: 'offset'; readonly items: string }
    | { readonly style: 'cursor'; readonly items: string; readonly cursorParam: string; readonly next: string };
}
