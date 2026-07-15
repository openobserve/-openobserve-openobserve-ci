import {OPENOBSERVE_CI_COMMAND, execPromise} from './helpers/exec'

const describeOrSkip = process.env.IS_STANDALONE_BINARY === 'true' ? describe.skip : describe

describe('synthetics', () => {
  it('run-tests completes successfully', async () => {
    const result = await execPromise(
      `${OPENOBSERVE_CI_COMMAND} synthetics run-tests --config e2e/fixtures/global.config.json`,
      {
        OPENOBSERVE_API_KEY: process.env.OPENOBSERVE_API_KEY,
        OPENOBSERVE_APP_KEY: process.env.OPENOBSERVE_APP_KEY,
      }
    )

    expect(result.stdout).toContain('View full summary in OpenObserve')
    expect(result.exitCode).toBe(0)
  })
})

describeOrSkip('synthetics plugin API', () => {
  it('importing exposed plugin API works', async () => {
    const {executeTests} = require('@openobserve/openobserve-ci-plugin-synthetics')
    expect(executeTests).toBeDefined()
  })
})
