import {isValidOpenObserveSite} from '../validation'

describe('validation', () => {
  test('isValidOpenObserveSite', () => {
    expect(isValidOpenObserveSite()).toBe(false)
    expect(isValidOpenObserveSite(undefined)).toBe(false)
    expect(isValidOpenObserveSite('')).toBe(false)
    expect(isValidOpenObserveSite('random')).toBe(false)
    expect(isValidOpenObserveSite('myorg.datadoghq.com')).toBe(false)
    expect(isValidOpenObserveSite('myorg.app.datadoghq.com')).toBe(false)
    expect(isValidOpenObserveSite('myorg.us3.datadoghq.com')).toBe(false)

    expect(isValidOpenObserveSite('datadoghq.com')).toBe(true)

    expect(isValidOpenObserveSite('ap1.datadoghq.com')).toBe(true)
    expect(isValidOpenObserveSite('AP1.datadoghq.com')).toBe(true)

    expect(isValidOpenObserveSite('ap2.datadoghq.com')).toBe(true)
    expect(isValidOpenObserveSite('AP2.datadoghq.com')).toBe(true)

    expect(isValidOpenObserveSite('uk1.datadoghq.com')).toBe(true)
    expect(isValidOpenObserveSite('UK1.datadoghq.com')).toBe(true)

    expect(isValidOpenObserveSite('us3.datadoghq.com')).toBe(true)
    expect(isValidOpenObserveSite('US3.datadoghq.com')).toBe(true)

    expect(isValidOpenObserveSite('us5.datadoghq.com')).toBe(true)
    expect(isValidOpenObserveSite('US5.datadoghq.com')).toBe(true)

    expect(isValidOpenObserveSite('us2.ddog-gov.com')).toBe(true)
    expect(isValidOpenObserveSite('US2.ddog-gov.com')).toBe(true)

    process.env.OO_CI_BYPASS_SITE_VALIDATION = 'true'

    expect(isValidOpenObserveSite('')).toBe(true)
    expect(isValidOpenObserveSite('random')).toBe(true)
  })
})
