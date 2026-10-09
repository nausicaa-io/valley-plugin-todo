import { startReminderOwner } from '../reminderOwner'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import { registerWorkflowContribution, type WorkflowContributionContract } from '@valley/plugin-sdk/workflow'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { createTodoDomain } from '../domain'
import { generateId } from '../lib'
import { normalizeTodoRecord } from '../records'
import { patchForStatus, STATUSES, OPTIONAL_STATUSES } from '../statuses'
import type { TodoRecord, TodoStatus } from '../types'
import config from '../../config.json'

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
  for (const key of ['startTime', 'endTime']) if (values[key] && !/^([01]\d|2[0-3]):[0-5]\d$/.test(String(values[key]))) throw new Error('Expected a valid task time (HH:mm).')
  if (values.endTime && (!values.startTime || String(values.endTime) <= String(values.startTime))) throw new Error('Task end time must follow its start time.')
  if (values.priority !== undefined && !['normal', 'low', 'medium', 'high'].includes(String(values.priority))) throw new Error('Unknown task priority.')
  const enabled = (settings.statuses as { active?: unknown } | undefined)?.active
  const active = ['open', 'completed', ...(Array.isArray(enabled) ? enabled : OPTIONAL_STATUSES)]
  if (values.status !== undefined && (!STATUSES.includes(values.status as TodoStatus) || !active.includes(String(values.status)))) throw new Error('This task status is disabled.')
  if (values.status !== undefined) Object.assign(values, patchForStatus(values.status as TodoStatus))
  else if (values.completed !== undefined) Object.assign(values, patchForStatus(values.completed ? 'completed' : 'open'))
  return values as Partial<TodoRecord>
}

export function register(api: PluginBackendApi): () => Promise<void> {
  const domain = createTodoDomain(api, async (event, payload) => {
    try { await api.services.emit('workflow.provider', event, JSON.parse(JSON.stringify(payload))) }
    catch (error) { api.rpc.emit('records.eventDeliveryFailed', { event, recordId: payload.record.id, message: error instanceof Error ? error.message : String(error) }) }
  })
  const offReminders = startReminderOwner(api, () => domain.list(), id => domain.patch(id, patchForStatus('completed')))
  const offs = [
    api.rpc.handle('records.append', payload => domain.append((payload as { record: TodoRecord }).record)),
    api.rpc.handle('records.update', payload => {
      const input = payload as { id: string; record: TodoRecord; expectedUpdatedAt?: string; documentRevision?: { expectedRevision: number; vaultGeneration: number }; exactStatusHistory?: boolean }
      return domain.update(text(input.id, 'a task id'), input.record, input.expectedUpdatedAt, input.documentRevision, undefined, undefined, { exactStatusHistory: input.exactStatusHistory === true })
    }),
    api.rpc.handle('records.delete', payload => domain.remove(text((payload as { id: string }).id, 'a task id'))),
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
      const records = (await domain.list(scoped)).filter(record => (!query || `${record.title}\n${record.note}`.toLocaleLowerCase().includes(query)) && (parameters.completed === undefined || record.completed === parameters.completed)).slice(0, limit)
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
      record = normalizeTodoRecord({ ...values, id: generateId('todo'), title: text(values.title, 'a task title'), createdAt: now, updatedAt: now } as unknown as DataRecord)
      await domain.append(record, scoped, emit)
    } else {
      const id = text(parameters.id, 'a task id')
      if (nodeTypeId === 'task.get') {
        const found = await domain.get(id, scoped)
        if (!found) throw new Error('The task no longer exists.')
        record = found
      } else if (nodeTypeId === 'task.update' || nodeTypeId === 'task.complete') {
        const values = nodeTypeId === 'task.complete' ? patchForStatus('completed') : (current: TodoRecord) => todoWorkflowValues({ ...current, ...(parameters.completed === undefined ? {} : { status: undefined }), ...parameters }, scoped.settings.get())
        record = await domain.patch(id, values, scoped, emit)
      } else throw new Error('Unknown To-Do workflow action.')
    }
    return { items: [{ json: JSON.parse(JSON.stringify(record)) as Record<string, unknown> }] }
  })
  void contribution.ready.catch(error => api.rpc.emit('workflow.registrationFailed', { message: error instanceof Error ? error.message : String(error) }))
  return async () => { await offReminders(); contribution.dispose(); offs.forEach(off => off()); await domain.dispose() }
}
