# To-Do integration rules

- Read `README.md` and the workspace plugin skill before changes.
- Keep task mutations in the backend domain owner. UI actions, undo, and Workflow use that writer through the SDK; do not reintroduce renderer dataset writes.
- Publish Workflow task events only after committed document changes. Carry scoped host causation and preserve uncertain outcomes after commit failures; never automatically retry them.
- A failed event delivery must not undo the success or undo registration of an already committed UI save. Report delivery separately; Workflow actions retain their uncertain-outcome semantics.
- Preserve document revisions, relationships, status history, and completion-transition semantics. Verify `tests/domain.test.ts` and `tests/workflow.test.ts` with affected UI tests.
- Keep integrations behind public SDK contracts, with no app-internal imports or access to another plugin's source or files.

- Notification schedules and completion handling belong to the backend. Calendar/To-Do reminder offsets preserve Off, explicit choices and absolute reminders; date-only items require an explicit time. Persist occurrence recovery before notification and never replay a missed alarm or timer. Pomodoro recovery advances once into a paused phase. The host owns notification audio; UI sound players are for previews only.

- Reminder dataset version changes include explicit additive migrations and an existing-database preservation check; fresh-realm tests alone do not validate rollout.

- Visual checks of To-Do dialogs and tiles include hover and focus states: hover every card, tile and row with a hover-only control (remove ×, actions) and confirm the control sits fully inside its container and the dialog never clips it.
- A new key in a saved settings object needs a matching property in `config.json` → `settingsSchema` (the `statuses` schema has `additionalProperties: false`): the host rejects the whole save otherwise, and `void api.settings.set(...)` hides the rejection. `tests/statusSchema.test.ts` checks the statuses keys; verify a changed setting by reading `.valley/plugins/data/todo/config.json` after the live click, not only by the screen.
- Status icons come only from To-Do's own folder `.valley/assets/icons/todo-icon/` (bundled outline set in `assets/todo-icon/`, seeded without overwriting); never borrow another owner's icon folder such as the Markdown `task-icon`.
- List order has one definition: the comparators in `src/model/sort.ts` and `src/model/sections.ts`. The Rust kernel (`src/wasm`, loaded through `api.wasm`) must give exactly their order, ties included; change both together and keep `tests/orderKernel.test.ts` (it loads the built `runtime/assets/order.wasm`) comparing them. A new sortable field needs its numeric key in `src/model/orderKeys.ts` only if the key orders exactly as the stored text does; otherwise that order stays in TypeScript.
- A changed crate has a new digest: put the one `npm run build` names into `config.json` → `runtime.wasm[0].sha256`, and install `runtime/assets/` with the rest of `runtime/`. A test that mounts the plugin with the full `config.json` serves the module (`loadPackageWasm`), or the unexpected console warning fails it.
- Dead styles are removed by rule, not by eye: a `todo-*` class is dead only when no component sets it, literally or through one of the template prefixes (`todo-st-`, `todo-priority-`, `todo-swipe-`, `todo-table-`, `todo-icon-`, `todo-smart-chip`). Re-pin `tests/stylesHash.test.ts` only after checking that every remaining rule is unchanged.
- A change to a To-Do-only group (colour, name, place) shows at once, like a shared group's (15 Nov): `setLocalGroups` shows the new groups before the settings round trip returns. Never make a group editor wait for `api.settings` to echo a change before repainting; verify a colour pick against the shared editor on the same page.
