/* eslint-disable quote-props */
import type {RecordWithKebabCaseKeys} from '@openobserve/openobserve-ci-base/helpers/types'

// openobserve: trimmed to the symbol-upload commands (+ shared infra). The
// OpenObserve-product commands (synthetics, sarif, lambda, dora, gate, ...) and
// their plugin packages were removed — see scripts/openobserve. If commands are
// added back, regenerate via bin/lint-packages.ts.

import {commands as ciEnvCommands} from './commands/ci-env/cli'
import {commands as dsymsCommands} from './commands/dsyms/cli'
import {commands as elfSymbolsCommands} from './commands/elf-symbols/cli'
import {commands as flutterSymbolsCommands} from './commands/flutter-symbols/cli'
import {commands as gitMetadataCommands} from './commands/git-metadata/cli'
import {commands as peSymbolsCommands} from './commands/pe-symbols/cli'
import {commands as pluginCommands} from './commands/plugin/cli'
import {commands as reactNativeCommands} from './commands/react-native/cli'
import {commands as sourcemapsCommands} from './commands/sourcemaps/cli'
import {commands as unitySymbolsCommands} from './commands/unity-symbols/cli'
import {commands as versionCommands} from './commands/version/cli'

// prettier-ignore
export const commands = {
  'ci-env': ciEnvCommands,
  'dsyms': dsymsCommands,
  'elf-symbols': elfSymbolsCommands,
  'flutter-symbols': flutterSymbolsCommands,
  'git-metadata': gitMetadataCommands,
  'pe-symbols': peSymbolsCommands,
  'plugin': pluginCommands,
  'react-native': reactNativeCommands,
  'sourcemaps': sourcemapsCommands,
  'unity-symbols': unitySymbolsCommands,
  'version': versionCommands,
} satisfies RecordWithKebabCaseKeys

/**
 * All retained command scopes are implemented entirely in `@openobserve/openobserve-ci-base`
 * (no separate plugin packages remain after the openobserve trim).
 */
export const noPluginExceptions: Set<string> = new Set([
  'ci-env',
  'dsyms',
  'elf-symbols',
  'flutter-symbols',
  'git-metadata',
  'pe-symbols',
  'plugin',
  'react-native',
  'sourcemaps',
  'unity-symbols',
  'version',
]) satisfies Set<keyof typeof commands>
