// Hand-written. Public entry point of @propraven/sdk.

import { PropRaven } from './client.js';

export { PropRaven };
export default PropRaven;

/**
 * @deprecated Renamed to `PropRaven` in 0.3.0. This alias will be removed in a future release.
 */
export const Propraven = PropRaven;
/** @deprecated Renamed to `PropRaven` in 0.3.0. */
export type Propraven = PropRaven;

export {
  APIConnectionError,
  APIError,
  APITimeoutError,
  APIUserAbortError,
  AuthenticationError,
  BadRequestError,
  ConflictError,
  GatewayTimeoutError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PermissionDeniedError,
  PropRavenError,
  RateLimitError,
  ServiceUnavailableError,
  UnprocessableEntityError,
  type ProblemFieldError,
} from './core/errors.js';
export { APIPromise } from './core/api-promise.js';
export {
  PageIterable,
  computeRetryDelay,
  DEFAULT_BASE_URL,
  DEFAULT_MAX_RETRIES,
  DEFAULT_TIMEOUT_MS,
  type ClientOptions,
  type Fetch,
} from './core/client.js';
export type {
  OperationDescriptor,
  PageItem,
  PaginationOptions,
  RateLimitInfo,
  RequestOptions,
  WithResponse,
} from './core/types.js';
export {
  verifyWebhook,
  computeWebhookSignature,
  WebhookVerificationError,
  WEBHOOK_SIGNATURE_HEADER,
  type VerifyWebhookParams,
} from './webhooks.js';
export { VERSION } from './version.js';
export { operations } from './generated/operations.js';
export * from './generated/resources.js';
export * from './generated/types.js';
