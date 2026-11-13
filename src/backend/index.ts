import { startReminderOwner } from './reminders'
import { readReminderCandidates } from './reminderQuery'
import { startCompletionBackfill } from './backfill'
import { DEFAULT_TODO_ICONS } from './iconDefaults'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import { registerWorkflowContribution, type WorkflowContributionContract } from '@valley/plugin-sdk/workflow'
import { createTodoDomain } from '../domain/writer'
import { readLightTodos, TARGETED_READ_LIMIT } from '../domain/taskReads'
import { normalizeGroups } from '@valley/plugin-sdk/groups'
import { generateId } from '../domain/ids'
import { normalizeTodoRecord } from '../domain/records'
import { DEFAULT_STATUS_DONE, normalizeCustomStatuses, patchForStatus, STATUSES, OPTIONAL_STATUSES } from '../model/statusModel'
import type { TodoRecord, TodoStatus } from '../types'
import config from '../../config.json'
import { isClockTime, isTodoPriority } from '../domain/validation'
import type { RecordsAppendPayload, RecordsDeletePayload, RecordsUpdatePayload, TaskIconsResult } from '../domain/rpc'

const text = (value: unknown, name: string): string => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Expected ${name}.`)
  return value.trim()
}
const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T12:00:00Z`)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value

export function todoWorkflowValues(raw: Record<string, unknown>, settings: Record<string, unknown>): Partial<TodoRecord> {
  const values: Record<string, unknown> = {}
  const allowed = ['title', 'dueDate', 'startTime', 'endTime', 'note', 'priority', 'status', 'completed', 'flagged']
  for (const key of allowed) if (raw[key] !== undefined) values[key] = raw[key]
  for (const [key, value] of Object.entries(values)) {
    if (key === 'completed' || key === 'flagged') { if (typeof value !== 'boolean') throw new Error(`Expected ${key} to be a boolean.`) }
    else if (typeof value !== 'string') throw new Error(`Expected ${key} to be text.`)
  }
  if (values.title !== undefined) values.title = text(values.title, 'a task title')
  if (values.dueDate && !validDate(String(values.dueDate))) throw new Error('Expected a valid task date (YYYY-MM-DD).')
  for (const key of ['startTime', 'endTime']) if (values[key] && !isClockTime(String(values[key]))) throw new Error('Expected a valid task time (HH:mm).')
  if (values.endTime && (!values.startTime || String(values.endTime) <= String(values.startTime))) throw new Error('Task end time must follow its start time.')
  if (values.priority !== undefined && !isTodoPriority(values.priority)) throw new Error('Unknown task priority.')
  const enabled = (settings.statuses as { active?: unknown } | undefined)?.active
  const active = ['open', 'completed', ...(Array.isArray(enabled) ? enabled : OPTIONAL_STATUSES)]
  const customStatuses = normalizeCustomStatuses((settings.statuses as { custom?: unknown } | undefined)?.custom)
  const custom = customStatuses.filter((status) => (Array.isArray(enabled) ? enabled : []).includes(status.id)).map((status) => status.id)
  if (values.status !== undefined && (![...STATUSES, ...custom].includes(values.status as TodoStatus) || !active.includes(String(values.status)))) throw new Error('This task status is disabled.')
  const rawDone = (settings.statuses as { done?: unknown } | undefined)?.done
  const done = rawDone && typeof rawDone === 'object' ? Object.fromEntries(Object.entries(rawDone as Record<string, unknown>).filter(([, value]) => typeof value === 'boolean')) as Record<string, boolean> : {}
  const statusSettings = { custom: customStatuses, done }
  if (values.status !== undefined) Object.assign(values, patchForStatus(values.status as TodoStatus, statusSettings))
  else if (values.completed !== undefined) Object.assign(values, patchForStatus(values.completed ? 'completed' : 'open', statusSettings))
  return values as Partial<TodoRecord>
}

export function register(api: PluginBackendApi): () => Promise<void> {
  const domain = createTodoDomain(api, async (event, payload) => {
    try { await api.services.emit('workflow.provider', event, JSON.parse(JSON.stringify(payload))) }
    catch (error) { api.rpc.emit('records.eventDeliveryFailed', { event, recordId: payload.record.id, message: error instanceof Error ? error.message : String(error) }) }
  })
  const backfill = startCompletionBackfill(api, domain.exclusive)
  const offReminders = startReminderOwner(api, () => readReminderCandidates(api), id => domain.patch(id, patchForStatus('completed', DEFAULT_STATUS_DONE)), ids => readReminderCandidates(api, ids))
  const offs = [
    // To-Do's own status icons as SVG source by name: the bundled set is seeded once, files the user adds or edits are kept.
    api.rpc.handle('taskIcons', async (): Promise<TaskIconsResult> => {
      const grant = await api.storage.open({ area: 'metadata', path: 'assets/icons/todo-icon', kind: 'directory', mode: 'write' })
      const location = (path: string) => ({ handle: grant.handle, path })
      try {
        await api.storage.mkdir(location(''))
        for (const [name, svg] of Object.entries(DEFAULT_TODO_ICONS)) {
          if (!await api.storage.stat(location(`${name}.svg`))) await api.storage.write(location(`${name}.svg`), svg)
        }
        const icons: Record<string, string> = {}
        let bytes = 0
        for (const entry of await api.storage.list(location(''))) {
          if (entry.kind !== 'file' || !/^[^/\\]+\.svg$/i.test(entry.name) || entry.size > 64_000 || bytes + entry.size > 1_000_000) continue
          try { icons[entry.name.slice(0, -4)] = await api.storage.read(location(entry.name)); bytes += entry.size } catch { /* skip unreadable */ }
        }
        return { icons }
      } finally { await api.storage.close(grant.handle).catch(() => {}) }
    }),
    api.rpc.handle('records.completionReady', () => backfill.ready()),
    api.rpc.handle('records.append', payload => domain.append((payload as RecordsAppendPayload).record)),
    api.rpc.handle('records.update', payload => {
      const input = payload as RecordsUpdatePayload
      return domain.update(text(input.id, 'a task id'), input.record, input.expectedUpdatedAt, input.documentRevision, undefined, undefined, { exactStatusHistory: input.exactStatusHistory === true })
    }),
    api.rpc.handle('records.delete', payload => domain.remove(text((payload as RecordsDeletePayload).id, 'a task id'))),
    api.rpc.handleOperation('command.task.delete', async (raw, context) => {
      const input = raw as { id: unknown; expectedUpdatedAt: unknown }
      const id = text(input.id, 'a task id'), expected = text(input.expectedUpdatedAt, 'a reviewed modification timestamp')
      context.cancellation.throwIfAborted()
      const deleted = await domain.remove(id, context.api, expected)
      if (!deleted) throw Object.assign(new Error('The task changed or no longer exists'), { code: 'REVISION_CONFLICT', outcome: 'not-applied' })
      return { id, deleted }
    })
  ]
  const contract = (config.runtime.services[0] as unknown as { metadata: { workflow: WorkflowContributionContract } }).metadata.workflow
  const contribution = registerWorkflowContribution(api, contract, async ({ nodeTypeId, parameters }, context) => {
    context.cancellation.throwIfAborted()
    const scoped = context.api
    const emit = (event: string, payload: unknown) => scoped.services.emit('workflow.provider', event, JSON.parse(JSON.stringify(payload)))
    if (nodeTypeId === 'task.list') {
      const limit = parameters.limit === undefined ? 100 : Number(parameters.limit)
      if (!Number.isInteger(limit) || limit < 1 || limit > 1000) throw new Error('Task limit must be between 1 and 1000.')
      const query = typeof parameters.query === 'string' ? parameters.query.toLocaleLowerCase() : ''
      const wanted = (record: TodoRecord) => (!query || `${record.title}\n${record.note}`.toLocaleLowerCase().includes(query)) && (parameters.completed === undefined || record.completed === parameters.completed)
      // The filter reads the columns it needs; only the tasks it keeps are loaded whole (a read of everything past 100).
      const found = (await readLightTodos(scoped, ['id', 'title', 'note', 'completed', 'status', 'customStatus'], { groups: normalizeGroups([]) })).filter(wanted).slice(0, limit).map(record => record.id)
      const records = found.length <= TARGETED_READ_LIMIT ? await domain.getMany(found, scoped) : (await domain.list(scoped)).filter(wanted).slice(0, limit)
      return { items: records.map(record => ({ json: JSON.parse(JSON.stringify(record)) as Record<string, unknown> })) }
    }
    if (nodeTypeId === 'task.delete') {
      const id = text(parameters.id, 'an item id'), expected = text(parameters.expectedUpdatedAt, 'a reviewed modification timestamp')
      const deleted = await domain.remove(id, scoped, expected)
      if (!deleted) throw Object.assign(new Error('The item changed or no longer exists'), { code: 'REVISION_CONFLICT', outcome: 'not-applied', fatal: true, transient: false, retryable: false })
      return { items: [{ json: { id, deleted } }] }
    }
    let record: TodoRecord
    if (nodeTypeId === 'task.create') {
      const values = todoWorkflowValues(parameters, scoped.settings.get())
      const now = new Date().toISOString()
      record = normalizeTodoRecord({ ...values, id: generateId('todo'), title: text(values.title, 'a task title'), createdAt: now, updatedAt: now })
      await domain.append(record, scoped, emit)
    } else {
      const id = text(parameters.id, 'a task id')
      if (nodeTypeId === 'task.get') {
        const found = await domain.get(id, scoped)
        if (!found) throw new Error('The task no longer exists.')
        record = found
      } else if (nodeTypeId === 'task.update' || nodeTypeId === 'task.complete') {
        const values = nodeTypeId === 'task.complete' ? patchForStatus('completed', DEFAULT_STATUS_DONE) : (current: TodoRecord) => todoWorkflowValues({ ...current, ...(parameters.completed === undefined ? {} : { status: undefined }), ...parameters }, scoped.settings.get())
        record = await domain.patch(id, values, scoped, emit)
      } else throw new Error('Unknown To-Do workflow action.')
    }
    return { items: [{ json: JSON.parse(JSON.stringify(record)) as Record<string, unknown> }] }
  })
  void contribution.ready.catch(error => api.rpc.emit('workflow.registrationFailed', { message: error instanceof Error ? error.message : String(error) }))
  return async () => {
    const completion = backfill.stop()
    const writes = domain.dispose()
    const reminders = offReminders()
    offs.forEach(off => off())
    contribution.dispose()
    await Promise.all([completion, writes, reminders])
  }
}
