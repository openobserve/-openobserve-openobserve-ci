export const OPENOBSERVE_SITE_US1 = 'datadoghq.com'
export const OPENOBSERVE_SITE_EU1 = 'datadoghq.eu'
export const OPENOBSERVE_SITE_US3 = 'us3.datadoghq.com'
export const OPENOBSERVE_SITE_US5 = 'us5.datadoghq.com'
export const OPENOBSERVE_SITE_AP1 = 'ap1.datadoghq.com'
export const OPENOBSERVE_SITE_AP2 = 'ap2.datadoghq.com'
export const OPENOBSERVE_SITE_UK1 = 'uk1.datadoghq.com'
export const OPENOBSERVE_SITE_GOV = 'ddog-gov.com'
export const OPENOBSERVE_SITE_US2_GOV = 'us2.ddog-gov.com'

export const OPENOBSERVE_SITES: string[] = [
  OPENOBSERVE_SITE_US1,
  OPENOBSERVE_SITE_EU1,
  OPENOBSERVE_SITE_US3,
  OPENOBSERVE_SITE_US5,
  OPENOBSERVE_SITE_AP1,
  OPENOBSERVE_SITE_AP2,
  OPENOBSERVE_SITE_UK1,
  OPENOBSERVE_SITE_GOV,
  OPENOBSERVE_SITE_US2_GOV,
]

// Common env vars
export const FIPS_ENV_VAR = 'OPENOBSERVE_FIPS'
export const FIPS_IGNORE_ERROR_ENV_VAR = 'OPENOBSERVE_FIPS_IGNORE_ERROR'

export const LOG_FORMAT_ENV_VAR = 'OO_LOG_FORMAT'

// When set to `1`/`true`, suppresses the `openobserve-ci v<version>` banner entirely.
export const SKIP_VERSION_BANNER_ENV_VAR = 'OO_CI_SKIP_VERSION_BANNER'

export const CONTENT_TYPE_HEADER = 'Content-Type'
export const CONTENT_TYPE_VALUE_PROTOBUF = 'application/x-protobuf'
export const CONTENT_TYPE_VALUE_JSON = 'application/json'

export const METHOD_POST = 'post'
