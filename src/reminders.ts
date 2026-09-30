import type { TodoRecord } from '@valley/plugin-sdk/types'
import { api, captureTodoScope } from './runtime'
import { loadTodoList } from './data'
import { uiText } from './localization'

/**
 * Reminder alarms for dated todos.
 *
 * The firing times live in the **host**, not in this module: every unfired
 * reminder is handed to `api.notifications.schedule`, which persists it in main
 * and arms it there. That is the whole reason this file no longer owns a single
 * `window.setTimeout` — a renderer timer dies with its window, so a reminder set
 * for 09:00 simply never arrived if the user had closed the window, and on macOS
 * the app stays resident, which made the failure silent.
 *
 * What the host covers, so this module no longer has to:
 *
 * - **Every window closed.** Main fires anyway.
 * - **A slept machine.** Main's timer is late rather than skipped, exactly as a
 *   renderer's was — which is why the `visibilitychange`/`focus` catch-up that
 *   used to live here is gone.
 * - **The app shut across the moment.** Main announces it once at the next vault
 *   open as a missed notification, rather than dropping it.
 *
 * A *fully quit* app still cannot fire — Electron bridges no OS-level
 * pre-scheduling — which is what `todo.reminderAppOpenHint` states in the UI.
 */

/** Everything under this prefix is ours; `cancelAll` sweeps by it. */
const KEY_PREFIX = 'reminder:'

/** Re-hand the schedule to main this often, so a far reminder cannot drift. */


/**
 * Epoch ms of a todo's reminder, or null when it has none, already fired, or is
 * finished. Local wall-clock by construction: `new Date(y, m-1, d, hh, mm)` puts
 * "09:00" at 09:00 in whatever zone the user is in now, which is what a reminder
 * means — an instant would shift it when they travel.
 */
export function reminderAt(todo: TodoRecord): number | null {
  if (!todo.remindAt || todo.reminderFiredAt || todo.completed) return null
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(todo.remindAt)
  if (!match) return null
  const [, y, m, d, hh, mm] = match
  const at = new Date(
    Number(y),
    Number(m) - 1,
    Number(d),
    hh ? Number(hh) : 0,
    mm ? Number(mm) : 0,
    0,
    0
  )
  return Number.isNaN(at.getTime()) ? null : at.getTime()
}

export interface DueReminders {
  /**
   * Already past. The host owned these moments and has announced them — a
   * renderer that raises them again is a second banner for one reminder — so
   * they are stamped, not re-fired.
   */
  settled: TodoRecord[]
  /** Still ahead: hand each to the host at its absolute epoch-ms moment. */
  upcoming: { todo: TodoRecord; at: number }[]
}

/**
 * Split todos into "the host has had its go at this one" and "arm it".
 *
 * Pure, so the split is testable without a clock or a host. There is no horizon:
 * a reminder three weeks out is armed now, because main persists the schedule
 * and re-arms it at vault open — the reason a horizon existed at all was that a
 * renderer timer could not be trusted that far.
 */
export function dueReminders(todos: readonly TodoRecord[], now: number): DueReminders {
  const settled: TodoRecord[] = []
  const upcoming: { todo: TodoRecord; at: number }[] = []
  for (const todo of todos) {
    const at = reminderAt(todo)
    if (at === null) continue
    if (at <= now) settled.push(todo)
    else upcoming.push({ todo, at })
  }
  return { settled, upcoming }
}

/** Title and body of the banner for one todo. */
export function reminderSpec(todo: TodoRecord): { title: string; body: string } {
  return {
    title: todo.title,
    body: todo.note.trim().split('\n')[0] || uiText('todo.reminderBody')
  }
}

export function startReminders(): () => void {
  const scope = captureTodoScope()
  return api.notifications.onAction(({ key, action, targetItemId }) => {
    if (action !== 'click' || !key.startsWith(KEY_PREFIX)) return
    const id = targetItemId ?? key.slice(KEY_PREFIX.length).split(':')[0]
    void loadTodoList(scope).then(todos => {
      scope.assertActive()
      const todo = todos.find(todo => todo.id === id)
      if (todo?.filePath) void scope.api.workspace.openFile(todo.filePath)
      else void scope.api.commands.executeOwn('open-page', {})
    }).catch(() => {})
  })
}
