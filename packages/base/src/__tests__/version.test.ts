import {Logger, LogLevel} from '../helpers/logger'
import {cliVersion, printVersion} from '../version'

describe('printVersion', () => {
  const collect = (jsonOutput: boolean) => {
    const lines: string[] = []
    const logger = new Logger((s) => lines.push(s), LogLevel.INFO, {jsonOutput})

    return {lines, logger}
  }

  it('emits the banner as a JSON line in JSON mode', () => {
    const {lines, logger} = collect(true)

    printVersion(logger)

    expect(JSON.parse(lines[0])).toEqual({level: 'info', message: `openobserve-ci v${cliVersion}`})
  })

  it('emits a dim text banner in text mode', () => {
    const {lines, logger} = collect(false)

    printVersion(logger)

    expect(lines[0]).toContain(`openobserve-ci v${cliVersion}`)
    expect(() => JSON.parse(lines[0])).toThrow()
  })

  it('does not print for the version command', () => {
    const original = process.argv
    process.argv = ['node', 'openobserve-ci', 'version']

    try {
      const {lines, logger} = collect(false)
      printVersion(logger)
      expect(lines).toHaveLength(0)
    } finally {
      process.argv = original
    }
  })

  it.each(['1', 'true', 'TRUE'])('does not print when OO_CI_SKIP_VERSION_BANNER is %p', (value) => {
    const original = process.env.OO_CI_SKIP_VERSION_BANNER
    process.env.OO_CI_SKIP_VERSION_BANNER = value

    try {
      const {lines, logger} = collect(false)
      printVersion(logger)
      expect(lines).toHaveLength(0)
    } finally {
      if (original === undefined) {
        delete process.env.OO_CI_SKIP_VERSION_BANNER
      } else {
        process.env.OO_CI_SKIP_VERSION_BANNER = original
      }
    }
  })
})
