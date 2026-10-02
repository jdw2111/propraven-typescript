// Hand-written. A Promise for the parsed body that can also hand out the raw Response.

import type { WithResponse } from './types.js';

/**
 * Returned by every generated method. `await` it for the parsed body, or call
 * `.withResponse()` for `{ data, response, rateLimit, requestId }`.
 *
 * The request starts immediately; `then`/`catch`/`finally` are delegated to the underlying
 * request so a rejection is reported exactly once, to whoever consumes it.
 */
export class APIPromise<T> extends Promise<T> {
  private readonly _raw: Promise<WithResponse<T>>;
  private _data: Promise<T> | undefined;

  constructor(raw: Promise<WithResponse<T>>) {
    super((resolve) => resolve(null as T));
    this._raw = raw;
  }

  static override get [Symbol.species](): PromiseConstructor {
    return Promise;
  }

  /** Resolve to the parsed body together with the raw `Response` and rate-limit info. */
  withResponse(): Promise<WithResponse<T>> {
    return this._raw;
  }

  private parsed(): Promise<T> {
    if (!this._data) this._data = this._raw.then((r) => r.data);
    return this._data;
  }

  override then<R1 = T, R2 = never>(
    onfulfilled?: ((value: T) => R1 | PromiseLike<R1>) | null,
    onrejected?: ((reason: unknown) => R2 | PromiseLike<R2>) | null,
  ): Promise<R1 | R2> {
    return this.parsed().then(onfulfilled, onrejected);
  }

  override catch<R = never>(onrejected?: ((reason: unknown) => R | PromiseLike<R>) | null): Promise<T | R> {
    return this.parsed().catch(onrejected);
  }

  override finally(onfinally?: (() => void) | null): Promise<T> {
    return this.parsed().finally(onfinally);
  }
}
