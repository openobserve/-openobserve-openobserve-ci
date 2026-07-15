import child_process from 'node:child_process'

import {version} from '../packages/openobserve-ci/package.json'

const isWin = process.platform === 'win32'
const os = isWin ? 'win' : process.platform === 'darwin' ? 'darwin' : 'linux'

const isARM = process.arch === 'arm64'
const arch = isARM ? 'arm64' : 'x64'

const STANDALONE_BINARY = `openobserve-ci_${os}-${arch}`
const STANDALONE_BINARY_PATH =
  process.env.STANDALONE_BINARY_PATH ?? (isWin ? `.\\${STANDALONE_BINARY}.exe` : `./${STANDALONE_BINARY}`)

const execBinary = async (
  args: string[]
): Promise<{exitCode?: number; error?: string; stdout: string; stderr: string}> => {
  return new Promise((resolve) => {
    child_process.execFile(STANDALONE_BINARY_PATH, args, (error, stdout, stderr) => {
      const trimmedStdout = stdout.trim()
      const trimmedStderr = stderr.trim()

      if (error) {
        if (error.signal) {
          resolve({
            error:
              error.signal === 'SIGSEGV'
                ? `The tested binary was terminated by a segmentation fault (${error.signal}).`
                : `The tested binary was terminated by ${error.signal}`,
            stdout: trimmedStdout,
            stderr: trimmedStderr,
          })

          return
        }

        resolve({
          exitCode: typeof error.code === 'number' ? error.code : 1,
          stdout: trimmedStdout,
          stderr: trimmedStderr,
        })
      } else {
        resolve({
          exitCode: 0,
          stdout: trimmedStdout,
          stderr: trimmedStderr,
        })
      }
    })
  })
}

const timeoutPerPlatform: Record<typeof os, number> = {
  // Some macOS agents sometimes run slower, making this test suite flaky on macOS only.
  // The issue is tracked here: https://github.com/actions/runner-images/issues/3885
  darwin: 10 * 1000,
  // Keep the default timeout for Linux.
  linux: 5 * 1000,
  // Running the binary on Windows is also slower than on Linux, and sometimes times out by a very small margin.
  win: 10 * 1000,
}

describe('standalone binary', () => {
  jest.setTimeout(timeoutPerPlatform[os])

  describe('version', () => {
    it('can be called', async () => {
      const result = await execBinary(['version'])
      // .slice(1) to remove the "v"
      expect(result.stdout.slice(1)).toStrictEqual(version)
    })
  })
  describe('dsyms', () => {
    it('upload can be called', async () => {
      const result = await execBinary(['dsyms', 'upload', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci dsyms upload') as string,
        stderr: '',
      })
    })
  })
  describe('git-metadata', () => {
    it('upload can be called', async () => {
      const result = await execBinary(['git-metadata', 'upload', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci git-metadata upload') as string,
        stderr: '',
      })
    })
  })
  describe('junit', () => {
    it('upload can be called', async () => {
      const result = await execBinary(['junit', 'upload', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci junit upload') as string,
        stderr: '',
      })
    })
  })
  describe('lambda', () => {
    it('instrument can be called', async () => {
      const result = await execBinary(['lambda', 'instrument', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci lambda instrument') as string,
        stderr: '',
      })
    })
  })
  describe('sourcemaps', () => {
    it('upload can be called', async () => {
      const result = await execBinary(['sourcemaps', 'upload', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci sourcemaps upload') as string,
        stderr: '',
      })
    })
  })
  describe('stepfunctions', () => {
    it('instrument can be called', async () => {
      const result = await execBinary(['stepfunctions', 'instrument', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci stepfunctions instrument') as string,
        stderr: '',
      })
    })

    it('uninstrument can be called', async () => {
      const result = await execBinary(['stepfunctions', 'uninstrument', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci stepfunctions uninstrument') as string,
        stderr: '',
      })
    })
  })
  describe('synthetics', () => {
    it('run-tests can be called', async () => {
      const result = await execBinary(['synthetics', 'run-tests', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci synthetics run-tests') as string,
        stderr: '',
      })
    })

    it('plugin can be loaded', async () => {
      const result = await execBinary(['plugin', 'check', 'synthetics', 'run-tests'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('All plugins are already baked into the standalone binary.') as string,
        // The version banner is written to stderr on every non-`version`/`--help` invocation.
        stderr: `openobserve-ci v${version}`,
      })
    })
  })
  describe('trace', () => {
    it('can be called', async () => {
      const result = await execBinary(['trace', '--help'])
      expect(result).toStrictEqual({
        exitCode: 0,
        stdout: expect.stringContaining('openobserve-ci trace') as string,
        stderr: '',
      })
    })
  })
})
