import {OPENOBSERVE_CI_COMMAND, execPromise} from './helpers/exec'

describe('sourcemaps', () => {
  it('upload completes successfully', async () => {
    const result = await execPromise(
      `${OPENOBSERVE_CI_COMMAND} sourcemaps upload e2e/fixtures/sourcemaps/ --release-version=e2e --service=e2e-tests --minified-path-prefix=https://e2e-tests.datadoghq.com/static/`,
      {
        OPENOBSERVE_API_KEY: process.env.OPENOBSERVE_API_KEY,
        OPENOBSERVE_APP_KEY: process.env.OPENOBSERVE_APP_KEY,
      }
    )

    expect(result.exitCode).toBe(0)
  })
})
