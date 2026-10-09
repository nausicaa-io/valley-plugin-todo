# To-Do

Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.

This repository owns the plugin’s interface, behavior, dependencies, schemas, tests, translations, and compiled releases. It uses Valley manifest API 5 and the injected SDK 6.

Valley ships this core plugin as a verified release artifact in its application resources. Core and external installations run with the same sandbox, permissions, and SDK/IPC contract. The core package and its locale files are never installed into `.valley`; ordinary vault documents and saved plugin data retain their existing locations.

## Package

- `manifest.json`: readable English identity, version, and paired `author` / `authorUrl` arrays.
- `config.json`: runtime entry points, permissions, contributions, and storage declarations.
- `src/`: plugin interface.
- `locales/`: English, German, Spanish, French, and Simplified Chinese catalogs.
- `tests/`: package-owned checks using the portable SDK testkit.
- `runtime/`: compiled installation artifact, including the package’s locale catalogs.
- `vendor/`: pinned SDK, testkit, and build-tool archives for independent development.

The package’s `manifest.name` and `manifest.description` catalog entries translate its identity, including while disabled. Missing translations fall back to this package’s English catalog. A plugin never falls back to Valley’s catalog or another plugin’s catalog.

## Development and releases

Use Node 24.19.0 and npm 11.17.0. From this repository, run:

```sh
npm ci
npm run check
```

The check validates types and package boundaries, runs the package tests, and rebuilds `runtime/`. It requires no Valley source checkout. Keep the rebuilt runtime, locale files, dependency lock, and vendored tools with each release. Increment the package and manifest versions together.

Valley release maintainers explicitly import the compiled artifact into the application’s `plugins.lock.json`; building Valley does not build or read this repository. All privileged work uses declared SDK capabilities, authenticated IPC, and explicit grants. Disabling or unloading the plugin releases its subscriptions and resources.

Selected-task reads in version 3.1 query only that task and its relationships, retain complete paginated history, and coalesce concurrent reads. List ordering uses Set membership while preserving the existing stable display order. Ordinary completion timelines retain their existing status-history semantics.

Groups settings edits the shared vault registry used by Calendar and other plugins. Single-click anywhere on a dated task opens Calendar; double-click opens the task editor. Undated tasks open the editor. Status controls and links retain their own actions.

Tasks are independent. Add To-Do opens a compact inline editor in the left sidebar, including when the main page is active. Enter saves the task and keeps the editor ready for another; notes, tags, date, time, location, and flag are optional. Creation never opens the detail modal.

## Workflow integration

The backend publishes `workflow.provider` version `1.0.0` through the injected SDK. Actions create, get, list, update, and complete tasks. Triggers report task creation, edits, and transitions to completed. Trigger data contains `record`; use Workflow conditions to filter it. Status and date validation matches To-Do's domain rules.

The backend owns the serialized task writer for both the interface and Workflow. Revision-guarded document updates preserve relationship data, status history, and undo behavior. Events follow committed changes and carry the host's causal context. A Workflow action with a delivery failure after commit reports an uncertain outcome and must not be retried automatically. Interface saves retain their successful result and undo entry, with a separate event-delivery warning. Workflows require To-Do to be installed and enabled; no provider reads another plugin's files.

Task list already emits one execution item per task. No collection selector is declared; tags, reminders, URLs and attachments remain attributes of each task.
