import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { TodoRecord } from '@valley/plugin-sdk/types'

export function reminderTimes(record: TodoRecord, defaults: number[] = [10]): { id: string; at: number }[] {
  if (record.completed) return []
  if (record.remindAt && record.reminderFiredAt) return []
  if (record.remindAt) { const at = new Date(record.remindAt).getTime(); return Number.isFinite(at) ? [{ id: 'absolute', at }] : [] }
  const time = record.startTime || record.reminderTime
  if (!record.dueDate || !time) return []
  const at = new Date(`${record.dueDate}T${time}`).getTime()
  if (!Number.isFinite(at)) return []
  const offsets = record.reminderOffsets ?? defaults
  if (offsets.length > 16 || offsets.some(value => !Number.isInteger(value) || value < 0 || value > 10080) || new Set(offsets).size !== offsets.length) throw new Error('Invalid reminder offsets')
  return offsets.map(minutes => ({ id: String(minutes), at: at - minutes * 60000 }))
}

const REMINDER_PREFIX = 'reminder:'
const PARTIAL_LIMIT = 200

/** The task id of a `reminder:<id>:<occurrence>` key; occurrence ids never contain a colon. */
function reminderTaskId(key: string): string {
  return key.slice(REMINDER_PREFIX.length, key.lastIndexOf(':'))
}

/** Task ids a `todo.tasks` change names, or null when it names none (a full reconcile is needed). */
export function changedTaskIds(event: unknown): string[] | null {
  const keys = (event as { keys?: unknown } | undefined)?.keys
  if (!Array.isArray(keys) || !keys.length || keys.length > PARTIAL_LIMIT) return null
  const ids: string[] = []
  for (const key of keys) {
    const id = (key as { id?: unknown } | null)?.id
    if (typeof id !== 'string' || !id) return null
    ids.push(id)
  }
  return ids
}

/**
 * Keep scheduled reminders in step with the tasks. A change that names its tasks
 * reconciles only those tasks; settings, resume, the minute tick and unkeyed
 * changes reconcile everything. Disposal stops admitting work at once, never
 * issues another request, and waits for the work already running, so a quit
 * cannot fail on a reconcile the closing runtime refuses.
 */
export function startReminderOwner(api: PluginBackendApi, list: () => Promise<TodoRecord[]>, complete?: (id: string) => Promise<unknown>, getMany?: (ids: string[]) => Promise<TodoRecord[]>): () => Promise<void> {
  let active = true
  let pending = Promise.resolve()
  let keys: string[] = []
  let fired: Record<string, number> = {}
  let dirty: Set<string> | 'all' | null = null
  let scheduled = false
  const live = (): void => { if (!active) throw new Error('To-Do reminders are stopped.') }
  const save = async () => {
    live()
    fired = Object.fromEntries(Object.entries(fired).sort((a, b) => b[1] - a[1]).slice(0, 4096))
    const current = await api.data.files.readTextBaseline('reminder-state.json')
    live()
    const result = await api.data.files.writeTextGuarded('reminder-state.json', JSON.stringify({ keys, fired }), current?.baseline ?? null)
    if (!result.ok) throw new Error('Could not persist reminder state')
  }
  const ready = api.data.files.readText('reminder-state.json').then(text => {
    if (!text) return
    const raw = JSON.parse(text) as { keys: string[]; fired: Record<string, number> }
    keys = Array.isArray(raw.keys) ? raw.keys.filter(key => typeof key === 'string') : []
    fired = raw.fired && typeof raw.fired === 'object' ? raw.fired : {}
  })
  const queue = (work: () => Promise<void>) => {
    if (!active) return
    pending = pending.catch(() => {}).then(async () => { await ready; if (active) await work() })
    void pending.catch(() => { if (active) api.rpc.emit('reminders.error', { code: 'REMINDER_RECONCILIATION_FAILED' }) })
  }
  const schedule = async (record: TodoRecord, defaults: number[], wanted: string[]) => {
    for (const occurrence of reminderTimes(record, defaults)) {
      const key = `${REMINDER_PREFIX}${record.id}:${occurrence.id}`
      wanted.push(key)
      if (fired[key] === occurrence.at) continue
      live()
      await api.notifications.schedule(key, [occurrence.at], {
        eventId: 'reminder', title: record.title, body: record.note.trim().split('\n')[0], targetItemId: record.id,
        reminderId: occurrence.id, scheduleRevision: String(occurrence.at),
        actions: [
          { id: 'open', kind: 'open', label: api.i18n.t('notification.open') },
          ...(complete ? [{ id: 'complete', kind: 'action' as const, label: api.i18n.t('notification.complete') }] : []),
          { id: 'snooze', kind: 'snooze', label: api.i18n.t('notification.snooze'), choices: [5, 10, 30, 60].map(minutes => ({ id: String(minutes), label: api.i18n.t('notification.minutes', { count: minutes }), minutes })) }
        ]
      })
    }
  }
  const defaults = (): number[] => {
    const settings = api.settings.get().reminderOffsets
    return Array.isArray(settings) ? settings as number[] : [10]
  }
  const reconcileAll = async () => {
    const wanted: string[] = []
    const offsets = defaults()
    const records = await list()
    for (const record of records) await schedule(record, offsets, wanted)
    for (const key of keys) if (!wanted.includes(key)) { live(); await api.notifications.cancel(key) }
    keys = wanted
    await save()
  }
  const reconcileTasks = async (ids: Set<string>) => {
    const wanted: string[] = []
    const offsets = defaults()
    const records = await getMany!([...ids])
    for (const record of records) await schedule(record, offsets, wanted)
    const kept = new Set(wanted)
    const retained = keys.filter(key => !ids.has(reminderTaskId(key)))
    for (const key of keys) if (ids.has(reminderTaskId(key)) && !kept.has(key)) { live(); await api.notifications.cancel(key) }
    const next = [...retained, ...wanted]
    if (next.length === keys.length && next.every((key, index) => key === keys[index])) return
    keys = next
    await save()
  }
  const request = (ids: string[] | null) => {
    if (!active) return
    if (ids === null || !getMany) dirty = 'all'
    else if (dirty !== 'all') {
      dirty ??= new Set()
      for (const id of ids) dirty.add(id)
      if (dirty.size > PARTIAL_LIMIT) dirty = 'all'
    }
    if (scheduled) return
    scheduled = true
    queue(async () => {
      scheduled = false
      const work = dirty
      dirty = null
      if (work === 'all') await reconcileAll()
      else if (work?.size) await reconcileTasks(work)
    })
  }
  const reconcile = () => request(null)
  const offData = api.data.dataset('todo.tasks').subscribe(event => request(changedTaskIds(event)))
  const offSettings = api.settings.subscribe(reconcile)
  const offResume = api.lifecycle.onResume(reconcile)
  const offOccurrence = api.notifications.onOccurrence(event => {
    if (!event.key.startsWith(REMINDER_PREFIX)) return
    queue(async () => { fired[event.key] = event.scheduledAt; await save() })
  })
  const offAction = api.rpc.handle('notifications.action', async payload => {
    const event = payload as { action?: string; targetItemId?: string }
    if (event.action !== 'complete' || !complete || typeof event.targetItemId !== 'string') throw new Error('Unknown reminder action')
    const result = await complete(event.targetItemId)
    request([event.targetItemId])
    return result
  })
  const interval = setInterval(reconcile, 60_000)
  reconcile()
  return async () => {
    active = false
    clearInterval(interval); offData(); offSettings(); offResume(); offOccurrence(); offAction()
    await pending.catch(() => {})
  }
}
