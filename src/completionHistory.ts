import type { ValleyPluginApi, DatasetRecord } from '@valley/plugin-sdk'
import type { TodoRecord } from './types'
import { allStatuses, normalizeCustomStatuses, STATUSES } from './statuses'

export interface TodoListRecord extends TodoRecord {
  historyLoaded: false
  completionSummary: { changedAt: string } | null
}

const COMPLETION_TARGETS = ['completed', 'canceled']

/** The statuses a completion may come from: what `allStatuses()` returns for these saved status settings. */
export function completionSources(statusSettings: unknown): string[] {
  const custom = statusSettings && typeof statusSettings === 'object' ? (statusSettings as { custom?: unknown }).custom : undefined
  return [...STATUSES, ...normalizeCustomStatuses(custom).map((status) => status.id)]
}

/** The host filter for status-history rows that may mark a completion. */
export function completionHistoryWhere(sources: readonly string[]) {
  return { or: COMPLETION_TARGETS.map((to) => ({ to, from: { in: sources.filter((status) => status !== to) } })) }
}

/**
 * The `completedAt` of a task: the time of its latest transition into Completed
 * or Canceled from another known status, the rule `readCompletionSummaries`
 * applies to the stored rows (a row without a time is skipped).
 */
export function latestCompletion(rows: Iterable<{ position?: unknown; from?: unknown; to?: unknown; changedAt?: unknown }>, sources: readonly string[]): string | null {
  let best: { position: number; changedAt: string } | null = null
  for (const row of rows) {
    const to = row.to, from = row.from, position = Number(row.position)
    if (typeof to !== 'string' || !COMPLETION_TARGETS.includes(to) || typeof from !== 'string' || from === to || !sources.includes(from)) continue
    if (typeof row.changedAt !== 'string' || !row.changedAt || !Number.isFinite(position)) continue
    if (!best || position > best.position) best = { position, changedAt: row.changedAt }
  }
  return best?.changedAt ?? null
}

/** {@link latestCompletion} of a record's status history, its positions counted from 0 as stored. */
export function recordCompletion(history: TodoRecord['statusHistory'], sources: readonly string[]): string | null {
  return latestCompletion((history ?? []).map((entry, position) => ({ ...entry, position })), sources)
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
            from: { in: allStatuses().filter((status) => status !== to) }
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
