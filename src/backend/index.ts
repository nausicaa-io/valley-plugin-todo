import { startReminderOwner } from './reminders'
import { readReminderCandidates } from './reminderQuery'
import { startCompletionBackfill } from './backfill'
import { readTodoIcons } from './icons'
import { registerTodoWorkflow, text } from './workflow'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import { createTodoDomain } from '../domain/writer'
import { DEFAULT_STATUS_DONE, patchForStatus } from '../model/statusModel'
import type { RecordsAppendPayload, RecordsDeletePayload, RecordsUpdatePayload } from '../domain/rpc'

export function register(api: PluginBackendApi): () => Promise<void> {
  const domain = createTodoDomain(api, async (event, payload) => {
    try { await api.services.emit('workflow.provider', event, JSON.parse(JSON.stringify(payload))) }
    catch (error) { api.rpc.emit('records.eventDeliveryFailed', { event, recordId: payload.record.id, message: error instanceof Error ? error.message : String(error) }) }
  })
  const backfill = startCompletionBackfill(api, domain.exclusive)
  const offReminders = startReminderOwner(api, () => readReminderCandidates(api), id => domain.patch(id, patchForStatus('completed', DEFAULT_STATUS_DONE)), ids => readReminderCandidates(api, ids))
  const offs = [
    api.rpc.handle('taskIcons', () => readTodoIcons(api)),
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
  const contribution = registerTodoWorkflow(api, domain)
  return async () => {
    const completion = backfill.stop()
    const writes = domain.dispose()
    const reminders = offReminders()
    offs.forEach(off => off())
    contribution.dispose()
    await Promise.all([completion, writes, reminders])
  }
}
