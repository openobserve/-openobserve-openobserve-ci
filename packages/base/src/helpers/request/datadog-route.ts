/**
 * List of all OpenObserve API routes used by openobserve-ci.
 *
 * Only those routes are accepted by {@link ooRoute}.
 */
export const OPENOBSERVE_ROUTE_PATHS = [
  '/api/intake/ci/custom_spans',
  '/api/ui/support/serverless/flare',
  '/api/v1/validate',
  '/api/v2/ci/deployments/correlate-image',
  '/api/v2/ci/deployments/correlate',
  '/api/v2/ci/pipeline/metrics',
  '/api/v2/ci/pipeline/tags',
  '/api/v2/cicodescan',
  '/api/v2/cicovreprt',
  '/api/v2/ciiac',
  '/api/v2/cireport',
  '/api/v2/deployments/gates/evaluation',
  '/api/v2/deployments/gates/evaluation/:evaluationId',
  '/api/v2/dora/deployment',
  '/api/v2/git/repository/packfile',
  '/api/v2/git/repository/search_commits',
  '/api/v2/quality-gates/evaluate',
  '/api/v2/srcmap',
  '/api/v2/static-analysis-sca/dependencies',
  '/synthetics/ci/batch/:batchId',
  '/synthetics/ci/tunnel',
  '/synthetics/mobile/applications/:applicationId/multipart-presigned-urls',
  '/synthetics/mobile/applications/:applicationId/multipart-upload-complete',
  '/synthetics/mobile/applications/validation-job-status/:jobId',
  '/synthetics/settings',
  '/synthetics/tests/:testId',
  '/synthetics/tests/:testId/version_history/:version?only_check_existence=true',
  '/synthetics/tests/:testType/:testId',
  '/synthetics/tests/poll_results',
  '/synthetics/tests/search',
  '/synthetics/tests/trigger/ci',
  '/v1/input',
] as const

/**
 * Format a OpenObserve API route with optional parameters.
 *
 * @example
 * ```ts
 * const route = ooRoute('/api/v2/resources/:resourceId', {
 *   resourceId: '123',
 * })
 * ```
 */
export const ooRoute = <Route extends OpenObserveRoutePath>(
  route: Route,
  ...[params]: OpenObserveRouteArgs<Route>
): OpenObserveRoute<Route> => {
  if (!params) {
    return route as OpenObserveRoute<Route>
  }

  return route.replace(/:([A-Za-z0-9_]+)/g, (_, key: keyof OpenObserveRouteParams<Route>) =>
    encodeURIComponent(String(params[key]))
  ) as OpenObserveRoute<Route>
}

export type OpenObserveRoute<Route extends string = string> = Route & {[ooRouteBrand]: true}

type OpenObserveRoutePath = (typeof OPENOBSERVE_ROUTE_PATHS)[number]

declare const ooRouteBrand: unique symbol

type RouteParamNames<Route extends string> = Route extends `${string}:${infer Param}/${infer Rest}`
  ? Param | RouteParamNames<Rest>
  : Route extends `${string}:${infer Param}?${infer Rest}`
    ? Param | RouteParamNames<Rest>
    : Route extends `${string}:${infer Param}`
      ? Param
      : never

type OpenObserveRouteParams<Route extends OpenObserveRoutePath> = {
  [Param in RouteParamNames<Route>]: string | number
}

type OpenObserveRouteArgs<Route extends OpenObserveRoutePath> =
  RouteParamNames<Route> extends never ? [] : [params: OpenObserveRouteParams<Route>]
