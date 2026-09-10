# To-Do — Terminal CLI

`valley todo <command>` manages tasks in the running Valley app. Requires Valley
to be open (see the repo README for `npm link` setup and multi-vault targeting
with `--vault`). Run `valley todo --help` for the live list.

Every mutation goes through the same isolated SQLite datasets as the UI, fires
the change event so open panels reload, and is **undoable with ⌘Z in the app**.

## Create & inspect

| Command | What it does |
|---|---|
| `valley todo add "<title>" [--priority p --due d --note n --tag a,b]` | Add a todo. `--priority` ∈ normal/low/medium/high; `--due` accepts `today`, `tomorrow`, or `YYYY-MM-DD`; `--tag` is comma-separated. |
| `valley todo list [--today --overdue --status s --priority p]` | List todos with optional filters. |
| `valley todo search "<query>"` | Search title/note; `#tag` tokens filter by tag (top 20). |

## Change state

| Command | What it does |
|---|---|
| `valley todo done "<id or title>"` | Mark complete (sets `completed` + status `completed`). |
| `valley todo complete "<id or title>"` | Alias of `done`. |
| `valley todo reopen "<id or title>"` | Clear completion, set status `open`. |
| `valley todo cancel "<id or title>"` | Set status `canceled`. |
| `valley todo pause "<id or title>"` | Set status `onhold`. |
| `valley todo status "<id or title>" <status>` | Set any enabled status (open, inprogress, waiting, onhold, delegated, deferred, canceled, completed). |
| `valley todo edit "<id or title>" [--title --priority --due --note --tag]` | Patch fields (only the flags you pass change). |
| `valley todo delete "<id or title>" --confirm` | Delete. Without `--confirm` it just prints what would be deleted. |

## Subtasks & focus

| Command | What it does |
|---|---|
| `valley todo subtask-add "<parent>" "<title>"` | Add a subtask to a todo. |
| `valley todo subtask-done "<parent>" "<subtask title>"` | Mark a subtask complete. |
| `valley todo focus "<id or title>"` | Start a focus session on a todo (drives the footer focus chip). |
| `valley todo focus-clear` | Stop the active focus session. |

## Examples

```bash
valley todo add "Submit Fungi Survey sheet" --priority high --due tomorrow --tag fungi,mycology
valley todo list --today
valley todo done "Fungi Survey"
valley todo delete "old draft" --confirm
```

## Notes

- `<id or title>` resolves by exact id first, then a case-insensitive title
  substring. If a title matches **multiple** todos the command lists them and does
  nothing — re-run with the exact id (shown in `list`/`search` output as `[id]`).
- `add`/`edit`/`done`/`delete`/status changes are all on the ⌘Z undo stack in-app.
