// Hand-written. The public client: the generated namespaces on top of the hand-written core.

import { type ClientOptions } from './core/client.js';
import * as Errors from './core/errors.js';
import { GeneratedClient } from './generated/client.js';

/**
 * PropRaven API client.
 *
 * ```ts
 * import PropRaven from '@propraven/sdk';
 * const client = new PropRaven(); // reads PROPRAVEN_API_KEY
 * const parcel = await client.parcels.get('37:119:12104406');
 * ```
 */
export class PropRaven extends GeneratedClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  static PropRavenError = Errors.PropRavenError;
  static APIError = Errors.APIError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static PaymentRequiredError = Errors.PaymentRequiredError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static NotFoundError = Errors.NotFoundError;
  static MethodNotAllowedError = Errors.MethodNotAllowedError;
  static ConflictError = Errors.ConflictError;
  static PayloadTooLargeError = Errors.PayloadTooLargeError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
  static RateLimitError = Errors.RateLimitError;
  static ServiceUnavailableError = Errors.ServiceUnavailableError;
  static GatewayTimeoutError = Errors.GatewayTimeoutError;
  static InternalServerError = Errors.InternalServerError;
  static APIConnectionError = Errors.APIConnectionError;
  static APITimeoutError = Errors.APITimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
}
