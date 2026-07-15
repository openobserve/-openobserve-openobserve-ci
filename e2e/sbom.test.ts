import {OPENOBSERVE_CI_COMMAND, execPromise} from './helpers/exec'

describe('sbom', () => {
  it('upload completes successfully', async () => {
    const result = await execPromise(
      `${OPENOBSERVE_CI_COMMAND} sbom upload --service=openobserve-ci-e2e-tests-sbom --env test e2e/fixtures/sbom-reports/sbom.json`,
      {
        OO_API_KEY: process.env.OO_API_KEY,
        OO_APP_KEY: process.env.OO_APP_KEY,
        OPENOBSERVE_API_KEY: undefined,
        OPENOBSERVE_APP_KEY: undefined,
      }
    )

    expect(result.exitCode).toBe(0)
  })
})
