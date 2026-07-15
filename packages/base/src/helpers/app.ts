import type {SpanTags} from './interfaces'

import {getOpenObserveSite} from './api'
import {CI_JOB_URL, CI_PIPELINE_URL} from './tags'

export const DEFAULT_OPENOBSERVE_SUBDOMAIN = 'app'

export const getBaseUrl = () => {
  const site = getOpenObserveSite()
  const subdomain = process.env.OO_SUBDOMAIN || ''

  return getCommonAppBaseURL(site, subdomain)
}

export const getCommonAppBaseURL = (ooSite: string, subdomain: string) => {
  const validSubdomain = subdomain || DEFAULT_OPENOBSERVE_SUBDOMAIN
  const ooSiteParts = ooSite.split('.')

  if (ooSiteParts.length === 3) {
    if (validSubdomain === DEFAULT_OPENOBSERVE_SUBDOMAIN) {
      return `https://${ooSite}/`
    }

    return `https://${validSubdomain}.${ooSiteParts[1]}.${ooSiteParts[2]}/`
  }

  return `https://${validSubdomain}.${ooSite}/`
}

export const getTestRunsUrlPath = (spanTags: SpanTags, queryPrefix = ''): string => {
  if (!spanTags[CI_PIPELINE_URL] && !spanTags[CI_JOB_URL]) {
    return ''
  }

  let query = queryPrefix
  if (spanTags[CI_JOB_URL]) {
    query += ` @ci.job.url:"${spanTags[CI_JOB_URL]}"`
  } else if (spanTags[CI_PIPELINE_URL]) {
    query += ` @ci.pipeline.url:"${spanTags[CI_PIPELINE_URL]}"`
  }

  return `ci/test-runs?query=${encodeURIComponent(query)}`
}
