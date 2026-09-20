import type { TodoRecord } from '@valley/plugin-sdk/types'
import { api, captureTodoScope } from './runtime'
import { loadTodoList, onTodoListChanged, setReminderFired } from './data'
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
const REARM_MS = 60 * 60 * 1000

const reminderKey = (todoId: string): string => `${KEY_PREFIX}${todoId}`

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

// ── the live scheduler ──────────────────────────────────────────────────────

let rearmTimer: number | null = null
let disposed = false

/**
 * Re-state the whole schedule: drop every key of ours, then arm what is live.
 *
 * Replacing wholesale rather than diffing is what keeps a cleared, completed or
 * deleted reminder from staying armed — there is no key list to reconcile
 * against, and a reminder that fires for a todo the user already finished is
 * worse than the extra write.
 */
async function rearm(): Promise<void> {
  if (disposed) return
  const scope = captureTodoScope()
  let todos: TodoRecord[]
  try { todos = await loadTodoList(scope); scope.assertActive() } catch { return }
  if (disposed) return
  const { settled, upcoming } = dueReminders(todos, Date.now())
  await scope.api.notifications.cancelAll(KEY_PREFIX)
  try { scope.assertActive() } catch { return }
  if (disposed) return
  for (const { todo, at } of upcoming) {
    void scope.api.notifications.schedule(reminderKey(todo.id), [at], {
      eventId: 'reminder',
      ...reminderSpec(todo)
    })
  }
  // Stamping without announcing is deliberate: by the time a renderer sees one
  // of these, main has already delivered it — on time, late off a sleep, or as
  // a missed notification at vault open. Raising it here too would be the same
  // reminder twice.
  for (const todo of settled) void setReminderFired(todo.id)
}

/**
 * Start the scheduler. The disposer detaches this session's listeners — it must
 * **not** cancel the host schedule: surviving an unloaded renderer is the point,
 * and a hot reload would otherwise disarm every reminder the user had set.
 */
export function startReminders(): () => void {
  const scope = captureTodoScope()
  disposed = false
  void rearm()
  // Any mutation can add, move, clear or complete a reminder.
  const offChanged = onTodoListChanged(() => void rearm())
  // Clicking the banner opens the todo it is about; main has already focused the
  // window by the time this arrives.
  const offAction = api.notifications.onAction(({ key, action }) => {
    if (action !== 'click' || !key.startsWith(KEY_PREFIX)) return
    const id = key.slice(KEY_PREFIX.length)
    void loadTodoList(scope)
      .then((todos) => {
        scope.assertActive()
        const todo = todos.find((candidate) => candidate.id === id)
        if (todo?.filePath) void scope.api.workspace.openFile(todo.filePath)
        else void scope.api.commands.executeOwn('open-page', {})
      })
      .catch(() => {
        /* the todo is gone — opening the page is still the useful answer */
      })
  })
  rearmTimer = window.setInterval(() => void rearm(), REARM_MS)
  return () => {
    disposed = true
    offChanged()
    offAction()
    if (rearmTimer != null) window.clearInterval(rearmTimer)
    rearmTimer = null
  }
}
