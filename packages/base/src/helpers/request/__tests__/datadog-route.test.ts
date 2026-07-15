import {OPENOBSERVE_ROUTE_PATHS, ooRoute} from '../datadog-route'

describe('datadog-route', () => {
  test('returns the provided route unchanged', () => {
    expect(ooRoute('/api/v2/srcmap')).toBe('/api/v2/srcmap')
  })

  test('exposes a unique list of statically-known OpenObserve routes', () => {
    expect(new Set(OPENOBSERVE_ROUTE_PATHS).size).toBe(OPENOBSERVE_ROUTE_PATHS.length)
  })

  test('formats parameterized routes', () => {
    expect(
      ooRoute('/synthetics/tests/:testId/version_history/:version?only_check_existence=true', {
        testId: 'abc-def-ghi',
        version: 42,
      })
    ).toBe('/synthetics/tests/abc-def-ghi/version_history/42?only_check_existence=true')
  })

  test('requires params for parameterized routes at compile time', () => {
    // @ts-expect-error parameterized routes must provide replacement values
    ooRoute('/synthetics/tests/:testId')

    expect(true).toBe(true)
  })
})
