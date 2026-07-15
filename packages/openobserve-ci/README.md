# OpenObserve CI

[![NPM Version](https://img.shields.io/npm/v/@openobserve/openobserve-ci)](https://www.npmjs.com/package/@openobserve/openobserve-ci) [![Continuous Integration](https://github.com/DataDog/openobserve-ci/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/DataDog/openobserve-ci/actions/workflows/ci.yml?query=branch%3Amaster) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) ![Node.js Version](https://img.shields.io/badge/Node.js-20+-green)

Execute commands from your Continuous Integration (CI) and Continuous Delivery (CD) pipelines to integrate with existing OpenObserve products.

See the [Usage section](#usage) for a list of available commands.

## How to install the CLI

The `openobserve-ci` CLI can be installed in three ways:
- [@openobserve/openobserve-ci](https://www.npmjs.com/package/@openobserve/openobserve-ci) NPM package
- [Standalone binary](#standalone-binary)
- [Docker image](#container-image)

To install the NPM package:

```sh
# NPM
npm install --save-dev @openobserve/openobserve-ci

# Yarn
yarn add --dev @openobserve/openobserve-ci
```

If you want to use `openobserve-ci` without installing it in your project:

```sh
# Install globally with NPM
npm install -g @openobserve/openobserve-ci

# ...or with Yarn 1 (Classic)
yarn global add @openobserve/openobserve-ci

# ...or run a one-shot install with NPM
npx @openobserve/openobserve-ci@v5 [scope]

# or with Yarn
yarn dlx @openobserve/openobserve-ci@v5 [scope]
```

> [!WARNING]
> OpenObserve recommends pinning an exact version of `openobserve-ci` to avoid being impacted by breaking changes introduced in major versions of openobserve-ci,
> or being vulnerable to supply chain attacks.

## Installing a plugin

Plugins are separate packages that were split from the `@openobserve/openobserve-ci` package to reduce its installation size.

Use `openobserve-ci plugin list` to list the available plugins:

```sh
openobserve-ci plugin list
```

Use `openobserve-ci plugin install` to install a plugin:

```sh
openobserve-ci plugin install <scope>
```

For backward compatibility, running a command that requires a plugin automatically installs the plugin if it is not already installed by default.

> [!WARNING]
> OpenObserve recommends explicitly installing plugins with `openobserve-ci plugin install <scope>`. To disable auto-installation, set `DISABLE_PLUGIN_AUTO_INSTALL=1`.

## Usage

```bash
Usage: openobserve-ci <scope> <command> [options]
```

The following `<scope>` and `<command>` values are available.

#### `aas`

<sub>**README:** [📚](/packages/plugin-aas) | **Documentation:** [🔗](https://docs.datadoghq.com/serverless/azure_app_services/) | **Plugin:** `@openobserve/openobserve-ci-plugin-aas`</sub>

- `instrument`: Apply OpenObserve instrumentation to the given Azure Web Apps (or slots).
- `uninstrument`: Revert OpenObserve instrumentation from the given Azure Web Apps (or slots).

#### `cloud-run`

<sub>**README:** [📚](/packages/plugin-cloud-run) | **Documentation:** [🔗](https://docs.datadoghq.com/serverless/google_cloud_run/) | **Plugin:** `@openobserve/openobserve-ci-plugin-cloud-run`</sub>

- `flare`: Troubleshoot your issues with Cloud Run service configuration.
- `instrument`: Apply OpenObserve instrumentation to the given Cloud Run Services.
- `uninstrument`: Revert OpenObserve instrumentation from the given Cloud Run Services.

#### `container-app`

<sub>**README:** [📚](/packages/plugin-container-app) | **Documentation:** [🔗](https://docs.datadoghq.com/serverless/azure_container_apps/sidecar/) | **Plugin:** `@openobserve/openobserve-ci-plugin-container-app`</sub>

- `instrument`: Apply OpenObserve instrumentation to Azure Container Apps.
- `uninstrument`: Revert OpenObserve instrumentation from Azure Container Apps.

#### `coverage`

<sub>**README:** [📚](/packages/plugin-coverage) | **Documentation:** [🔗](https://docs.datadoghq.com/code_coverage/)</sub>

- `upload`: Upload code coverage report files to OpenObserve.

#### `dora`

<sub>**README:** [📚](/packages/plugin-dora) | **Documentation:** [🔗](https://docs.datadoghq.com/dora_metrics/)</sub>

- `deployment`: Send a new deployment event for DORA Metrics to OpenObserve.

#### `dsyms`

<sub>**README:** [📚](/packages/base/src/commands/dsyms) | **Documentation:** [🔗](https://docs.datadoghq.com/real_user_monitoring/error_tracking/ios/)</sub>

- `upload`: Upload iOS dSYM files for Error Tracking (macOS only).

#### `flutter-symbols`

<sub>**README:** [📚](/packages/base/src/commands/flutter-symbols) | **Documentation:** [🔗](https://docs.datadoghq.com/real_user_monitoring/error_tracking/flutter/)</sub>

- `upload`: Upload Flutter symbols for Error Tracking.

#### `gate`

<sub>**README:** [📚](/packages/plugin-gate) | **Documentation:** [🔗](https://docs.datadoghq.com/quality_gates/)</sub>

> [!WARNING]
>
> **Deprecated:** OpenObserve Quality Gates is being replaced by the new PR Gates in 2026. To start the migration, please fill out this form: https://forms.gle/qnhANsE1ABtHrjqz9
>
> Learn more about PR Gates: https://docs.datadoghq.com/pr_gates

- `evaluate`: Evaluate Quality Gates rules in OpenObserve.

#### `git-metadata`

<sub>**README:** [📚](/packages/base/src/commands/git-metadata) | **Documentation:** [🔗](https://docs.datadoghq.com/integrations/guide/source-code-integration/)</sub>

- `upload`: Upload Git metadata for the Source Code Integration.

#### `junit`

<sub>**README:** [📚](/packages/base/src/commands/junit) | **Documentation:** [🔗](https://docs.datadoghq.com/tests/setup/junit_xml/)</sub>

- `upload`: Upload JUnit test reports for Test Visibility.

#### `lambda`

<sub>**README:** [📚](/packages/plugin-lambda) | **Documentation:** [🔗](https://docs.datadoghq.com/serverless/aws_lambda/) | **Plugin:** `@openobserve/openobserve-ci-plugin-lambda`</sub>

- `flare`: Troubleshoot your issues with OpenObserve instrumentation on your AWS Lambda functions.
- `instrument`: Apply OpenObserve instrumentation to the given AWS Lambda functions.
- `uninstrument`: Revert OpenObserve instrumentation from the given AWS Lambda functions.

#### `measure`

<sub>**README:** [📚](/packages/base/src/commands/measure) | **Documentation:** [🔗](https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/)</sub>

- Add measures to a CI Visibility pipeline trace or job span in OpenObserve.

#### `pe-symbols`

<sub>**README:** [📚](/packages/base/src/commands/pe-symbols) | **Documentation:** [🔗](https://docs.datadoghq.com/profiler/enabling/ddprof/)</sub>

- `upload`: Upload Windows PE debug info files for Profiling.

#### `react-native`

<sub>**README:** [📚](/packages/base/src/commands/react-native) | **Documentation:** [🔗](https://docs.datadoghq.com/real_user_monitoring/error_tracking/reactnative/)</sub>

- `codepush`: Upload React Native CodePush sourcemaps for Error Tracking. [🔗](https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/codepush/)
- `upload`: Upload React Native sourcemaps for Error Tracking. 
- `xcode`: Upload React Native sourcemaps for Error Tracking from the XCode bundle build phase.

#### `sarif`

<sub>**README:** [📚](/packages/plugin-sarif) | **Documentation:** [🔗](https://docs.datadoghq.com/code_analysis/static_analysis/)</sub>

- `upload`: Upload Static Analysis Results Interchange Format (SARIF) reports to OpenObserve.

#### `sbom`

<sub>**README:** [📚](/packages/plugin-sbom) | **Documentation:** [🔗](https://docs.datadoghq.com/code_analysis/software_composition_analysis/)</sub>

- `upload`: Upload Software Bill of Materials (SBOM) files to OpenObserve. 

#### `sourcemaps`

<sub>**README:** [📚](/packages/base/src/commands/sourcemaps) | **Documentation:** [🔗](https://docs.datadoghq.com/real_user_monitoring/guide/upload-javascript-source-maps/)</sub>

- `upload`: Upload JavaScript sourcemaps for Error Tracking.

#### `stepfunctions`

<sub>**README:** [📚](/packages/plugin-stepfunctions) | **Documentation:** [🔗](https://docs.datadoghq.com/serverless/step_functions/installation/?tab=datadogcli) | **Plugin:** `@openobserve/openobserve-ci-plugin-stepfunctions`</sub>

- `instrument`: Instrument AWS Step Function with OpenObserve to get logs and traces.
- `uninstrument`: Uninstrument AWS Step Function.

#### `synthetics`

<sub>**README:** [📚](/packages/plugin-synthetics) | **Plugin:** `@openobserve/openobserve-ci-plugin-synthetics`</sub>

- `run-tests`: Run Continuous Testing tests from the CI. [🔗](https://docs.datadoghq.com/continuous_testing/)
- `upload-application`: Upload a new version to an existing mobile application in OpenObserve. [🔗](https://docs.datadoghq.com/mobile_app_testing/)

#### `tag`

<sub>**README:** [📚](/packages/base/src/commands/tag) | **Documentation:** [🔗](https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/)</sub>

- Add custom tags to a CI Visibility pipeline trace or job span in OpenObserve.

#### `terraform`

<sub>**README:** [📚](/packages/plugin-terraform) | **Plugin:** `@openobserve/openobserve-ci-plugin-terraform`</sub>

- `upload`: Upload Terraform plan or state files to OpenObserve for enhanced cloud-to-code mapping and policy evaluation.

#### `trace`

<sub>**README:** [📚](/packages/base/src/commands/trace) | **Documentation:** [🔗](https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/)</sub>

- Add custom commands to a CI Visibility pipeline in OpenObserve.
- `span` ([📚](/packages/base/src/commands/span)): Report a custom span to a CI Visibility pipeline in OpenObserve without wrapping a command.

#### `unity-symbols`

<sub>**README:** [📚](/packages/base/src/commands/unity-symbols) | **Documentation:** [🔗](https://docs.datadoghq.com/real_user_monitoring/error_tracking/unity/)</sub>

- `upload`: Upload Unity symbols for Error Tracking.

### Beta commands

The following are **beta** commands, you can enable them with with `OO_BETA_COMMANDS_ENABLED=1`:

#### `deployment`

<sub>**README:** [📚](/packages/plugin-deployment) | **Documentation:** [🔗](https://docs.datadoghq.com/continuous_delivery/)</sub>

- `mark`: Mark a CI job as a deployment.
- `correlate`: Correlate GitOps CD deployments with application repositories CI pipelines. [🔗](https://docs.datadoghq.com/continuous_delivery/deployments/argocd#correlate-deployments-with-ci-pipelines)
- `correlate-image`: Correlate an image from a CD provider with its source commit. [🔗](https://docs.datadoghq.com/continuous_delivery/deployments/argocd#correlate-images-with-source-code)
- `gate`: Evaluate a Deployment Gate. [🔗](https://docs.datadoghq.com/deployment_gates/)

#### `elf-symbols`

<sub>**README:** [📚](/packages/base/src/commands/elf-symbols) | **Documentation:** [🔗](https://docs.datadoghq.com/profiler/enabling/ddprof/)</sub>

- `upload`: Upload Elf debug info files for Profiling.

### FIPS support

The `fips` option allows `openobserve-ci` to use a FIPS cryptographic module provider if the OpenSSL library installed on the host system provides it.

**Note**: `openobserve-ci` cannot assert if such a provider is available, and doesn't throw any error if the provider is not FIPS validated.

Node.js versions below 17 are incompatible with OpenSSL 3, which provides FIPS support.
If you are using a Node.js version below 17, enabling the `fips` option causes the command to throw an error.
The option `fips-ignore-error` ignores this error.

#### `fips`
Enable `openobserve-ci` FIPS support if a FIPS validated provider is installed on the host system.
If you do not have a FIPS provider installed, `openobserve-ci` does not raise an error.

- ENV variable: `OPENOBSERVE_FIPS=true`
- CLI param: `--fips`

#### `fips-ignore-error`
Ignore Node.js errors if FIPS cannot be enabled on the host system.

**Note**: the absence of an error doesn't indicate that FIPS is enabled successfully.

- ENV variable: `OPENOBSERVE_FIPS_IGNORE_ERROR=true`
- CLI param: `--fips-ignore-error`

### Version banner

Every invocation prints a `openobserve-ci v<version>` banner to `stderr`. To silence it — for example to keep CI logs quiet when the CLI runs many times — set:

- ENV variable: `OO_CI_SKIP_VERSION_BANNER=true`


## More ways to install the CLI

### Standalone binary

If installing Node.js in the CI is an issue, standalone binaries are attached to each [GitHub release](https://github.com/DataDog/openobserve-ci/releases).

Supported architectures:
- `linux-x64`
- `linux-arm64`
- `alpine-x64`
- `alpine-arm64`
- `darwin-x64` (MacOS)
- `darwin-arm64` (MacOS)
- `win-x64` (Windows)

> [!WARNING]  
> Using `strip` to remove debugging symbols from the standalone binary as an attempt to make it smaller may cause segmentation faults when running `openobserve-ci`. See https://github.com/nodejs/postject/issues/90.

> [!NOTE]  
> To determine the version when unable to run `openobserve-ci --version` (for example, because of segmentation faults or an architecture mismatch), run `grep --text STANDALONE_BINARY_VERSION path/to/openobserve-ci`.

To install the standalone binary:

#### Linux

```sh
# Linux x64
curl -L --fail "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_linux-x64" --output "/usr/local/bin/openobserve-ci" && chmod +x /usr/local/bin/openobserve-ci

# Linux arm64
curl -L --fail "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_linux-arm64" --output "/usr/local/bin/openobserve-ci" && chmod +x /usr/local/bin/openobserve-ci
```

#### Alpine

```sh
# Alpine x64
curl -L --fail "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_alpine-x64" --output "/usr/local/bin/openobserve-ci" && chmod +x /usr/local/bin/openobserve-ci

# Alpine arm64
curl -L --fail "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_alpine-arm64" --output "/usr/local/bin/openobserve-ci" && chmod +x /usr/local/bin/openobserve-ci
```

#### MacOS

```sh
# MacOS x64
curl -L --fail "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_darwin-x64" --output "/usr/local/bin/openobserve-ci" && chmod +x /usr/local/bin/openobserve-ci

# MacOS arm64
curl -L --fail "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_darwin-arm64" --output "/usr/local/bin/openobserve-ci" && chmod +x /usr/local/bin/openobserve-ci
```

#### Windows

```sh
# Windows x64
Invoke-WebRequest -Uri "https://github.com/DataDog/openobserve-ci/releases/latest/download/openobserve-ci_win-x64" -OutFile "openobserve-ci.exe"
```

Then, you can run `openobserve-ci` commands normally:

```sh
openobserve-ci version
```

### Container image

To run `openobserve-ci` from a container, you can use the `datadog/ci` image available in [Docker Hub](https://hub.docker.com/r/datadog/ci) as well as the public [Amazon ECR](https://gallery.ecr.aws/datadog/ci) and [Google GC](https://console.cloud.google.com/gcr/images/datadoghq/global/ci) registries.

```shell
docker pull datadog/ci
```

This example demonstrates how to run a command using the container and passing in the API and app keys:

```shell
export OO_API_KEY=$(cat /secret/dd_api_key)
export OO_APP_KEY=$(cat /secret/dd_app_key)
docker run --rm -it -v $(pwd):/w -e OO_API_KEY -e OO_APP_KEY datadog/ci <command> [<subcommand>] [options]
```

#### Building your own container image

You can build an image using the provided [Dockerfile](https://github.com/DataDog/openobserve-ci/blob/master/container/Dockerfile):

```sh
cd container
docker build --tag openobserve-ci .
```

Optionally, you can use the `VERSION` build argument to build an image for a specific version:

```sh
docker build --build-arg "VERSION=v3.9.0" --tag openobserve-ci .
```

## Migration guide

If you are upgrading from a previous major version, read our [MIGRATING.md](MIGRATING.md) document to understand the changes and how to adapt your scripts.

## Development

Before contributing to this open source project, read our [CONTRIBUTING.md](CONTRIBUTING.md) document.

## License

[Apache License, v2.0](LICENSE)
