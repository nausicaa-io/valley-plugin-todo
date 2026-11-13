import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { TodoRecord } from './types'

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

/** A 53-bit string hash (cyrb53): a changed title, note line or language changes it. */
function textSignature(value: string): string {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index)
    h1 = Math.imul(h1 ^ code, 2654435761)
    h2 = Math.imul(h2 ^ code, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
}

const numberMap = (value: unknown): Record<string, number> => value && typeof value === 'object' && !Array.isArray(value)
  ? Object.fromEntries(Object.entries(value).filter((entry): entry is [string, number] => typeof entry[1] === 'number'))
  : {}
const stringMap = (value: unknown): Record<string, string> => value && typeof value === 'object' && !Array.isArray(value)
  ? Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'))
  : {}

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
 * reconciles only those tasks; a settings change that moves the default reminder
 * offsets, resume, the local day boundary and unkeyed changes reconcile everything.
 * An occurrence already scheduled for the same time with the same text (the
 * `scheduled` and `texts` maps of reminder-state.json) is not handed to the host again. Disposal stops admitting work at once, never
 * issues another request, and waits for the work already running, so a quit
 * cannot fail on a reconcile the closing runtime refuses.
 */
export function startReminderOwner(api: PluginBackendApi, list: () => Promise<TodoRecord[]>, complete?: (id: string) => Promise<unknown>, getMany?: (ids: string[]) => Promise<TodoRecord[]>): () => Promise<void> {
  let active = true
  let pending = Promise.resolve()
  let keys: string[] = []
  let fired: Record<string, number> = {}
  let scheduledAt: Record<string, number> = {}
  let texts: Record<string, string> = {}
  let stateDirty = false
  let appliedOffsets: string | undefined
  let dirty: Set<string> | 'all' | null = null
  let scheduled = false
  const live = (): void => { if (!active) throw new Error('To-Do reminders are stopped.') }
  const save = async () => {
    live()
    fired = Object.fromEntries(Object.entries(fired).sort((a, b) => b[1] - a[1]).slice(0, 4096))
    const current = await api.data.files.readTextBaseline('reminder-state.json')
    live()
    const result = await api.data.files.writeTextGuarded('reminder-state.json', JSON.stringify({ keys, fired, scheduled: scheduledAt, texts }), current?.baseline ?? null)
    if (!result.ok) throw new Error('Could not persist reminder state')
    stateDirty = false
  }
  const ready = api.data.files.readText('reminder-state.json').then(text => {
    if (!text) return
    const raw = JSON.parse(text) as { keys: string[]; fired: Record<string, number>; scheduled?: unknown; texts?: unknown }
    keys = Array.isArray(raw.keys) ? raw.keys.filter(key => typeof key === 'string') : []
    fired = raw.fired && typeof raw.fired === 'object' ? raw.fired : {}
    scheduledAt = numberMap(raw.scheduled)
    texts = stringMap(raw.texts)
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
      const body = record.note.trim().split('\n')[0]
      const signature = textSignature(`${api.i18n.language?.() ?? ''}\n${record.title}\n${body}`)
      if (scheduledAt[key] === occurrence.at && texts[key] === signature) continue
      live()
      await api.notifications.schedule(key, [occurrence.at], {
        eventId: 'reminder', title: record.title, body, targetItemId: record.id,
        reminderId: occurrence.id, scheduleRevision: String(occurrence.at),
        actions: [
          { id: 'open', kind: 'open', label: api.i18n.t('notification.open') },
          ...(complete ? [{ id: 'complete', kind: 'action' as const, label: api.i18n.t('notification.complete') }] : []),
          { id: 'snooze', kind: 'snooze', label: api.i18n.t('notification.snooze'), choices: [5, 10, 30, 60].map(minutes => ({ id: String(minutes), label: api.i18n.t('notification.minutes', { count: minutes }), minutes })) }
        ]
      })
      scheduledAt[key] = occurrence.at
      texts[key] = signature
      stateDirty = true
    }
  }
  const forget = (key: string): void => {
    if (key in scheduledAt || key in texts) { delete scheduledAt[key]; delete texts[key]; stateDirty = true }
  }
  const defaults = (): number[] => {
    const settings = api.settings.get().reminderOffsets
    return Array.isArray(settings) ? settings as number[] : [10]
  }
  const reconcileAll = async () => {
    const wanted: string[] = []
    const offsets = defaults()
    appliedOffsets = JSON.stringify(offsets)
    const records = await list()
    for (const record of records) await schedule(record, offsets, wanted)
    const kept = new Set(wanted)
    for (const key of keys) if (!kept.has(key)) { live(); await api.notifications.cancel(key); forget(key) }
    const changed = stateDirty || keys.length !== wanted.length || keys.some((key, index) => key !== wanted[index])
    keys = wanted
    if (changed) await save()
  }
  const reconcileTasks = async (ids: Set<string>) => {
    const wanted: string[] = []
    const offsets = defaults()
    const records = await getMany!([...ids])
    for (const record of records) await schedule(record, offsets, wanted)
    const kept = new Set(wanted)
    const retained = keys.filter(key => !ids.has(reminderTaskId(key)))
    for (const key of keys) if (ids.has(reminderTaskId(key)) && !kept.has(key)) { live(); await api.notifications.cancel(key); forget(key) }
    const next = [...retained, ...wanted]
    const changed = stateDirty || next.length !== keys.length || next.some((key, index) => key !== keys[index])
    keys = next
    if (changed) await save()
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
  const offSettings = api.settings.subscribe(() => { if (JSON.stringify(defaults()) !== appliedOffsets) reconcile() })
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
  // Reminder times are local wall-clock times: a new day (and with it a possible offset change) gets one full pass.
  let dayTimer: ReturnType<typeof setTimeout> | undefined
  const nextDay = (): void => {
    const now = new Date()
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime()
    dayTimer = setTimeout(() => { if (!active) return; reconcile(); nextDay() }, Math.max(1000, midnight - now.getTime() + 1000))
  }
  nextDay()
  reconcile()
  return async () => {
    active = false
    clearTimeout(dayTimer); offData(); offSettings(); offResume(); offOccurrence(); offAction()
    await pending.catch(() => {})
  }
}
