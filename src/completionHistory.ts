import type { ValleyPluginApi, DatasetRecord } from '@valley/plugin-sdk'
import type { TodoRecord } from './types'
import { STATUSES } from './statuses'

export interface TodoListRecord extends TodoRecord {
  historyLoaded: false
  completionSummary: { changedAt: string } | null
}

export async function readCompletionSummaries(
  source: ValleyPluginApi,
  ids: string[],
  assertActive: () => void
): Promise<Map<string, { changedAt: string }>> {
  const result = new Map<string, { changedAt: string }>()
  const dataset = source.data.dataset('todo.status_history')
  for (let offset = 0; offset < ids.length; offset += 20) {
    let pending = ids.slice(offset, offset + 20)
    const ceilings = new Map<string, number>()
    while (pending.length) {
      assertActive()
      const positions = await dataset.aggregate({
        where: {
          taskId: { in: pending },
          or: ['completed', 'canceled'].map((to) => ({
            to,
            from: { in: STATUSES.filter((status) => status !== to) }
          })),
          ...(ceilings.size ? { and: [{ or: pending.map((taskId) => ({ taskId, position: { lt: ceilings.get(taskId)! } })) }] } : {})
        },
        groupBy: ['taskId'],
        metrics: { position: { operation: 'max', field: 'position' } }
      })
      assertActive()
      if (!positions.length) break
      const page = await dataset.query({
        select: ['taskId', 'changedAt'],
        where: { or: positions.map((row: DatasetRecord) => ({ taskId: row.taskId, position: row.position })) },
        limit: 20
      })
      assertActive()
      pending = []
      for (const row of page.rows) {
        const id = String(row.taskId)
        if (typeof row.changedAt === 'string' && row.changedAt) {
          result.set(id, { changedAt: row.changedAt })
        } else {
          const position = positions.find((entry) => entry.taskId === id)?.position
          if (typeof position !== 'number' || !Number.isInteger(position)) throw new Error('Invalid completion position')
          ceilings.set(id, position)
          pending.push(id)
        }
      }
    }
  }
  return result
}

export function isTodoListRecord(todo: TodoRecord): todo is TodoListRecord {
  return 'historyLoaded' in todo && todo.historyLoaded === false
}
