import {OPENOBSERVE_SITE_US1} from '../../constants'

import {getApiUrl, getBaseIntakeUrl, getOpenObserveSite, getOpenObserveSiteFromEnv, getIntakeUrl} from '../api'

describe('api helpers', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {...originalEnv}
    delete process.env.OPENOBSERVE_SITE
    delete process.env.OO_SITE
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('getOpenObserveSiteFromEnv', () => {
    it('returns undefined when no env vars are set', () => {
      expect(getOpenObserveSiteFromEnv()).toBeUndefined()
    })

    it('returns OPENOBSERVE_SITE when set', () => {
      process.env.OPENOBSERVE_SITE = 'datadoghq.eu'
      expect(getOpenObserveSiteFromEnv()).toBe('datadoghq.eu')
    })

    it('returns OO_SITE when set', () => {
      process.env.OO_SITE = 'us3.datadoghq.com'
      expect(getOpenObserveSiteFromEnv()).toBe('us3.datadoghq.com')
    })

    it('prefers OPENOBSERVE_SITE over OO_SITE', () => {
      process.env.OPENOBSERVE_SITE = 'datadoghq.eu'
      process.env.OO_SITE = 'us5.datadoghq.com'
      expect(getOpenObserveSiteFromEnv()).toBe('datadoghq.eu')
    })
  })

  describe('getOpenObserveSite', () => {
    it('returns explicit site when provided', () => {
      expect(getOpenObserveSite('ap1.datadoghq.com')).toBe('ap1.datadoghq.com')
    })

    it('returns explicit site even when env vars are set', () => {
      process.env.OPENOBSERVE_SITE = 'datadoghq.eu'
      expect(getOpenObserveSite('us3.datadoghq.com')).toBe('us3.datadoghq.com')
    })

    it('falls back to env var when no site provided', () => {
      process.env.OPENOBSERVE_SITE = 'datadoghq.eu'
      expect(getOpenObserveSite()).toBe('datadoghq.eu')
    })

    it('falls back to US1 when no site and no env vars', () => {
      expect(getOpenObserveSite()).toBe(OPENOBSERVE_SITE_US1)
    })

    it('falls back to US1 for undefined site arg', () => {
      expect(getOpenObserveSite(undefined)).toBe(OPENOBSERVE_SITE_US1)
    })
  })

  describe('getIntakeUrl', () => {
    it('builds URL with subdomain and default US1 site', () => {
      expect(getIntakeUrl('sourcemap-intake')).toBe(`https://sourcemap-intake.${OPENOBSERVE_SITE_US1}`)
    })

    it('builds URL with explicit site option', () => {
      expect(getIntakeUrl('sourcemap-intake', {site: 'datadoghq.eu'})).toBe('https://sourcemap-intake.datadoghq.eu')
    })

    it('builds URL from env var when no site option', () => {
      process.env.OO_SITE = 'us5.datadoghq.com'
      expect(getIntakeUrl('sourcemap-intake')).toBe('https://sourcemap-intake.us5.datadoghq.com')
    })

    it('uses override env var when set', () => {
      process.env.CUSTOM_URL = 'https://custom.example.com'
      expect(getIntakeUrl('sourcemap-intake', {overrideEnvVar: 'CUSTOM_URL'})).toBe('https://custom.example.com')
    })

    it('ignores override env var when not set', () => {
      expect(getIntakeUrl('sourcemap-intake', {overrideEnvVar: 'CUSTOM_URL'})).toBe(
        `https://sourcemap-intake.${OPENOBSERVE_SITE_US1}`
      )
    })

    it('prefers override env var over site option', () => {
      process.env.CUSTOM_URL = 'https://custom.example.com'
      expect(getIntakeUrl('sourcemap-intake', {overrideEnvVar: 'CUSTOM_URL', site: 'datadoghq.eu'})).toBe(
        'https://custom.example.com'
      )
    })

    it('falls back to site option when override env var is empty string', () => {
      process.env.CUSTOM_URL = ''
      expect(getIntakeUrl('sourcemap-intake', {overrideEnvVar: 'CUSTOM_URL', site: 'datadoghq.eu'})).toBe(
        'https://sourcemap-intake.datadoghq.eu'
      )
    })
  })

  describe('getApiUrl', () => {
    it('returns API URL with default US1 site', () => {
      expect(getApiUrl()).toBe(`https://api.${OPENOBSERVE_SITE_US1}`)
    })

    it('returns API URL with explicit site', () => {
      expect(getApiUrl('datadoghq.eu')).toBe('https://api.datadoghq.eu')
    })

    it('returns API URL from env var', () => {
      process.env.OPENOBSERVE_SITE = 'us3.datadoghq.com'
      expect(getApiUrl()).toBe('https://api.us3.datadoghq.com')
    })
  })

  describe('getBaseIntakeUrl (deprecated)', () => {
    it('behaves the same as getIntakeUrl with no options', () => {
      expect(getBaseIntakeUrl('sourcemap-intake')).toBe(getIntakeUrl('sourcemap-intake'))
    })

    it('uses env vars like getIntakeUrl', () => {
      process.env.OO_SITE = 'datadoghq.eu'
      expect(getBaseIntakeUrl('sourcemap-intake')).toBe('https://sourcemap-intake.datadoghq.eu')
    })
  })
})
