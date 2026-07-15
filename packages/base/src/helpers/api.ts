import {OPENOBSERVE_SITE_US1} from '../constants'

/**
 * Read the OpenObserve site from `OPENOBSERVE_SITE` / `OO_SITE` env vars.
 * Returns `undefined` when neither is set.
 */
export const getOpenObserveSiteFromEnv = (): string | undefined => process.env.OPENOBSERVE_SITE || process.env.OO_SITE

/**
 * Single source of truth for OpenObserve site resolution. If `site` is passed, returns it.
 * Otherwise reads from `OPENOBSERVE_SITE` / `OO_SITE` env vars with US1 fallback.
 */
export const getOpenObserveSite = (site?: string): string => site || getOpenObserveSiteFromEnv() || OPENOBSERVE_SITE_US1

/**
 * Build `https://{subdomain}.{site}` with optional env var override.
 */
export const getIntakeUrl = (
  subdomain: string,
  options?: {
    overrideEnvVar?: string
    site?: string
  }
): string => {
  if (options?.overrideEnvVar) {
    const override = process.env[options.overrideEnvVar]
    if (override) {
      return override
    }
  }

  return `https://${subdomain}.${getOpenObserveSite(options?.site)}`
}

/**
 * Build the full API URL (`https://api.{site}`) for a given site.
 */
export const getApiUrl = (site?: string): string => `https://api.${getOpenObserveSite(site)}`

/**
 * @deprecated Use {@link getIntakeUrl} instead.
 *
 * Get the base intake URL for a service. If the `OO_SITE` or `OPENOBSERVE_SITE` environment
 * variables are not defined, use the default site (US1).
 */
export const getBaseIntakeUrl = (intake: string) => getIntakeUrl(intake)
