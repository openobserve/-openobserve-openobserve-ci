## Overview

Upload Windows PE debug info files to OpenObserve to symbolicate your profiles.


## Setup

You need to have `OO_API_KEY` in your environment.

```bash
# Environment setup
export OO_API_KEY="<API KEY>"
```

You can configure the tool to use OpenObserve EU by defining the `OO_SITE` environment variable as `datadoghq.eu`. By default, the requests are sent to OpenObserve US.

To make these variables available, OpenObserve recommends setting them in an encrypted `openobserve-ci.json` file at the root of your project:

```json
{
  "apiKey": "<API_KEY>",
  "ooSite": "<SITE>"
}
```

To override the full URL for the intake endpoint, define the `OPENOBSERVE_SOURCEMAP_INTAKE_URL` environment variable.

## Commands

### `upload`

**Warning:** The `pe-symbols upload` command is in beta. It requires you to set `OO_BETA_COMMANDS_ENABLED=1`.

This command will upload debug info from Windows PE files to OpenObserve in order to symbolicate your application's profiles.

Run the following command to upload all the necessary files:

```bash
OO_BETA_COMMANDS_ENABLED=1 openobserve-ci pe-symbols upload ~/your/build/bin/
```

If the location is a directory, the command scans it recursively looking for PE files. For each PE file, it uploads the corresponding .PDB file to OpenObserve.
If the location is a file, the command uploads the corresponding .PDB file to OpenObserve.

| Parameter | Condition | Description |
|-----------|-----------|-------------|
| `--dry-run` | Optional | Run the command without the final step of uploading. All other checks are performed. |
| `--max-concurrency` | Optional | The number of concurrent uploads to the API. Defaults to 20. |
| `--disable-git`    | Optional | Prevents the command from invoking Git in the current working directory and sending repository-related data to OpenObserve (such as the hash, remote URL, and paths within the repository of sources referenced in the source map). |
| `--repository-url` | Optional | Overrides the remote repository with a custom URL. For example, `https://github.com/my-company/my-project`. |
| `--replace-existing` | Optional | If symbol information with the same build ID is already present on OpenObserve side, discard it and use the newly uploaded information.<br>Default behavior is to only replace existing debug information if the newly uploaded information is considered a better source with the following ordering: debug info > symbol table > dynamic symbol table. |
