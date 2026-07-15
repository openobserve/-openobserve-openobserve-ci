import {OPENOBSERVE_CI_COMMAND, execPromise} from './helpers/exec'
import {checkJunitUpload} from './helpers/junit-upload-checker'

const OO_SERVICE = 'openobserve-ci-e2e-tests-junit'

describe('junit', () => {
  it('upload with measures (glob expansion)', async () => {
    const result = await execPromise(
      `${OPENOBSERVE_CI_COMMAND} junit upload --service=openobserve-ci-e2e-tests-junit **/junit-reports/**/*.xml --measures testmeasure1:20 --report-measures sessionmeasure1:40`,
      {
        OO_API_KEY: process.env.OO_API_KEY,
        OPENOBSERVE_API_KEY: undefined,
      }
    )
    expect(result.exitCode).toBe(0)

    await checkJunitUpload({
      service: OO_SERVICE,
      commitSha: process.env.GITHUB_SHA!,
      testLevel: 'test',
      extraFilter: '@testmeasure1:20',
    })

    await checkJunitUpload({
      service: OO_SERVICE,
      commitSha: process.env.GITHUB_SHA!,
      testLevel: 'session',
      extraFilter: '@sessionmeasure1:40',
    })
  })

  it('upload with measures (literal glob string)', async () => {
    const result = await execPromise(
      `${OPENOBSERVE_CI_COMMAND} junit upload --service=openobserve-ci-e2e-tests-junit '**/junit-reports/**' --measures testmeasure2:60 --report-measures sessionmeasure2:80`,
      {
        OO_API_KEY: process.env.OO_API_KEY,
        OPENOBSERVE_API_KEY: undefined,
      }
    )
    expect(result.exitCode).toBe(0)

    await checkJunitUpload({
      service: OO_SERVICE,
      commitSha: process.env.GITHUB_SHA!,
      testLevel: 'test',
      extraFilter: '@testmeasure2:60',
    })

    await checkJunitUpload({
      service: OO_SERVICE,
      commitSha: process.env.GITHUB_SHA!,
      testLevel: 'session',
      extraFilter: '@sessionmeasure2:80',
    })
  })
})
