import {Command} from 'clipanion'

import {BaseCommand} from '@openobserve/openobserve-ci-base'

import {cliVersion} from '../../version'

export class VersionCommand extends BaseCommand {
  public static paths = [['version']]

  public static usage = Command.Usage({
    // This description is longer than usual because this is valuable information, and it's unlikely
    // that the user is going to run `openobserve-ci version --help`. This description will show in `openobserve-ci --help` instead.
    description:
      'Get the current version of openobserve-ci. This command outputs a prefixed version, e.g. `v1.0.0`. If you want the raw version, use `openobserve-ci --version`.',
  })

  public async execute() {
    this.context.stdout.write(`v${cliVersion}\n`)

    return 0
  }
}
