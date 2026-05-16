// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Propraven } from '../client';

export abstract class APIResource {
  protected _client: Propraven;

  constructor(client: Propraven) {
    this._client = client;
  }
}
