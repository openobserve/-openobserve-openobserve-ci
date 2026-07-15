import type {CommandContext} from '../../..'

import {Cli} from 'clipanion'

import {createMockContext} from '../../../helpers/__tests__/testing-tools'
import {listAllPlugins} from '../../../helpers/plugin'

import {PluginListCommand} from '../list'

describe('PluginListCommand', () => {
  test.each([
    {
      title: 'no args',
      args: [],
      expectedOutput: 'The following plugins are available:\n\n\n',
    },
    {
      title: '--json',
      args: ['--json'],
      expectedOutput: '[]\n',
    },
    {
      title: '--all',
      args: ['--all'],
      expectedOutput: `The following plugins are available:\n\n - (built-in) @openobserve/openobserve-ci-plugin-aas\n - (built-in) @openobserve/openobserve-ci-plugin-cloud-run\n - (built-in) @openobserve/openobserve-ci-plugin-container-app\n - (built-in) @openobserve/openobserve-ci-plugin-coverage\n - (built-in) @openobserve/openobserve-ci-plugin-deployment\n - (built-in) @openobserve/openobserve-ci-plugin-dora\n - (built-in) @openobserve/openobserve-ci-plugin-gate\n - (built-in) @openobserve/openobserve-ci-plugin-junit\n - (built-in) @openobserve/openobserve-ci-plugin-lambda\n - (built-in) @openobserve/openobserve-ci-plugin-sarif\n - (built-in) @openobserve/openobserve-ci-plugin-sbom\n - (built-in) @openobserve/openobserve-ci-plugin-stepfunctions\n - (built-in) @openobserve/openobserve-ci-plugin-synthetics\n - (built-in) @openobserve/openobserve-ci-plugin-terraform\n`,
    },
    {
      title: '--all --json',
      args: ['--all', '--json'],
      expectedOutput: `[{"name":"@openobserve/openobserve-ci-plugin-aas","scope":"aas","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-cloud-run","scope":"cloud-run","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-container-app","scope":"container-app","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-coverage","scope":"coverage","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-deployment","scope":"deployment","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-dora","scope":"dora","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-gate","scope":"gate","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-junit","scope":"junit","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-lambda","scope":"lambda","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-sarif","scope":"sarif","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-sbom","scope":"sbom","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-stepfunctions","scope":"stepfunctions","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-synthetics","scope":"synthetics","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-terraform","scope":"terraform","isBuiltin":true}]\n`,
    },
  ])('all plugins are built-in ($title)', async ({args, expectedOutput}) => {
    const cli = new Cli<CommandContext>()
    cli.register(PluginListCommand)

    const context = createMockContext() as CommandContext
    context.builtinPlugins = listAllPlugins()

    const code = await cli.run(['plugin', 'list', ...args], context)

    expect(context.stdout.toString()).toStrictEqual(expectedOutput)
    expect(code).toBe(0)
  })

  test.each([
    {
      title: 'no args',
      args: [],
      expectedOutput: `The following plugins are available:\n\n - @openobserve/openobserve-ci-plugin-aas (install with openobserve-ci plugin install aas)\n`,
    },
    {
      title: '--json',
      args: ['--json'],
      expectedOutput: `[{"name":"@openobserve/openobserve-ci-plugin-aas","scope":"aas","isBuiltin":false}]\n`,
    },
    {
      title: '--all',
      args: ['--all'],
      expectedOutput: `The following plugins are available:\n\n - @openobserve/openobserve-ci-plugin-aas (install with openobserve-ci plugin install aas)\n - (built-in) @openobserve/openobserve-ci-plugin-cloud-run\n - (built-in) @openobserve/openobserve-ci-plugin-container-app\n - (built-in) @openobserve/openobserve-ci-plugin-coverage\n - (built-in) @openobserve/openobserve-ci-plugin-deployment\n - (built-in) @openobserve/openobserve-ci-plugin-dora\n - (built-in) @openobserve/openobserve-ci-plugin-gate\n - (built-in) @openobserve/openobserve-ci-plugin-junit\n - (built-in) @openobserve/openobserve-ci-plugin-lambda\n - (built-in) @openobserve/openobserve-ci-plugin-sarif\n - (built-in) @openobserve/openobserve-ci-plugin-sbom\n - (built-in) @openobserve/openobserve-ci-plugin-stepfunctions\n - (built-in) @openobserve/openobserve-ci-plugin-synthetics\n - (built-in) @openobserve/openobserve-ci-plugin-terraform\n`,
    },
    {
      title: '--all --json',
      args: ['--all', '--json'],
      expectedOutput: `[{"name":"@openobserve/openobserve-ci-plugin-aas","scope":"aas","isBuiltin":false},{"name":"@openobserve/openobserve-ci-plugin-cloud-run","scope":"cloud-run","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-container-app","scope":"container-app","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-coverage","scope":"coverage","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-deployment","scope":"deployment","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-dora","scope":"dora","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-gate","scope":"gate","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-junit","scope":"junit","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-lambda","scope":"lambda","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-sarif","scope":"sarif","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-sbom","scope":"sbom","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-stepfunctions","scope":"stepfunctions","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-synthetics","scope":"synthetics","isBuiltin":true},{"name":"@openobserve/openobserve-ci-plugin-terraform","scope":"terraform","isBuiltin":true}]\n`,
    },
  ])('list available plugins ($title)', async ({args, expectedOutput}) => {
    const cli = new Cli<CommandContext>()
    cli.register(PluginListCommand)

    const context = createMockContext() as CommandContext
    context.builtinPlugins = listAllPlugins().filter(
      // Arbitrarily remove a plugin from the list of built-in plugins.
      // This simulates `@openobserve/openobserve-ci` having all plugins listed as dependencies, except one.
      (plugin) => plugin !== '@openobserve/openobserve-ci-plugin-aas'
    )

    const code = await cli.run(['plugin', 'list', ...args], context)

    expect(context.stdout.toString()).toStrictEqual(expectedOutput)
    expect(code).toBe(0)
  })
})
