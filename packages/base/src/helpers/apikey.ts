import type {BufferedMetricsLogger} from 'datadog-metrics'

import chalk from 'chalk'

import {InvalidConfigurationError} from './errors'
import {httpRequest, isRequestError} from './request'
import {ooRoute} from './request/datadog-route'

/** ApiKeyValidator is an helper interface to interpret OpenObserve error responses and possibly check the
 * validity of the api key.
 */
export interface ApiKeyValidator {
  verifyApiKey(error: unknown): Promise<void>
  validateApiKey(): Promise<boolean>
}

export interface ApiKeyValidatorParams {
  apiKey: string | undefined
  ooSite: string
  metricsLogger?: BufferedMetricsLogger
}

export const newApiKeyValidator = (params: ApiKeyValidatorParams): ApiKeyValidator =>
  new ApiKeyValidatorImplem(params.apiKey, params.ooSite, params.metricsLogger)

/** ApiKeyValidator is an helper class to interpret OpenObserve error responses and possibly check the
 * validity of the api key.
 */
class ApiKeyValidatorImplem {
  public apiKey: string | undefined
  public ooSite: string

  private isValid?: boolean
  private metricsLogger?: BufferedMetricsLogger

  constructor(apiKey: string | undefined, ooSite: string, metricsLogger?: BufferedMetricsLogger) {
    this.apiKey = apiKey
    this.ooSite = ooSite
    this.metricsLogger = metricsLogger
  }

  /** Check if an API key is valid, based on the HTTP error and defaulting to verify the API key
   * through OpenObserve's API for ambiguous cases.
   * An exception is raised when the API key is invalid.
   * Callers should catch the exception to display it nicely.
   */
  public async verifyApiKey(error: unknown): Promise<void> {
    if (!isRequestError(error) || error.response === undefined) {
      return
    }
    if (error.response.status === 403 || (error.response.status === 400 && !(await this.isApiKeyValid()))) {
      if (this.metricsLogger !== undefined) {
        this.metricsLogger.increment('invalid_auth', 1)
      }
      throw new InvalidConfigurationError(
        `Neither ${chalk.red.bold('OPENOBSERVE_API_KEY')} nor ${chalk.red.bold(
          'OO_API_KEY'
        )} contains a valid API key for OpenObserve site ${this.ooSite}`
      )
    }
  }

  /**
   * Check if the API key is valid by making a request to the OpenObserve validate API.
   * @returns `true` if the API key is valid, `false` otherwise.
   */
  public async validateApiKey(): Promise<boolean> {
    if (this.apiKey === undefined || this.apiKey.length === 0) {
      return false
    }

    try {
      const response = await httpRequest({
        headers: {
          'DD-API-KEY': this.apiKey,
        },
        method: 'GET',
        baseURL: `https://api.${this.ooSite}`,
        url: ooRoute('/api/v1/validate'),
      })

      return response.data.valid
    } catch (error) {
      if (isRequestError(error) && error.response && error.response.status === 403) {
        return false
      }
      throw error
    }
  }

  private async isApiKeyValid(): Promise<boolean | undefined> {
    if (this.isValid === undefined) {
      this.isValid = await this.validateApiKey()
    }

    return this.isValid
  }
}
