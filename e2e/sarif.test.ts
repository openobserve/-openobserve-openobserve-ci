import {OPENOBSERVE_CI_COMMAND, execPromise} from './helpers/exec'

describe('sarif', () => {
  it('upload completes successfully', async () => {
    const result = await execPromise(
      `${OPENOBSERVE_CI_COMMAND} sarif upload --service=openobserve-ci-e2e-tests-sarif e2e/fixtures/sarif-reports`,
      {
        OO_API_KEY: process.env.OO_API_KEY,
        OPENOBSERVE_API_KEY: undefined,
      }
    )

    expect(result.exitCode).toBe(0)
  })
})
