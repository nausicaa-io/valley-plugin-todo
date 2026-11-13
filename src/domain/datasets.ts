import type { DatasetRecord, DatasetWhere } from '@valley/plugin-sdk'

export const TASKS_DATASET = 'todo.tasks'
export const TAGS_DATASET = 'todo.task_tags'
export const LINKS_DATASET = 'todo.task_links'
export const ATTACHMENTS_DATASET = 'todo.task_attachments'
export const SESSIONS_DATASET = 'todo.focus_sessions'
export const STATUS_HISTORY_DATASET = 'todo.status_history'

/** The part of the UI or backend API a paged dataset read needs. */
export interface DatasetSource {
  data: { dataset(id: string): { query(query: { select?: string[]; where?: DatasetWhere; limit: number; cursor?: string }): Promise<{ rows: DatasetRecord[]; cursor?: string }> } }
}

/** Every page of one query, 1,000 rows per round trip; `assertActive` runs before and after each page. */
export async function queryAll(source: DatasetSource, dataset: string, query: { select?: string[]; where?: DatasetWhere; cursor?: string } = {}, assertActive?: () => void): Promise<DatasetRecord[]> {
  const rows: DatasetRecord[] = []
  let cursor = query.cursor
  do {
    assertActive?.()
    const page = await source.data.dataset(dataset).query(query.select ? { select: query.select, where: query.where, limit: 1000, cursor } : { where: query.where, limit: 1000, cursor })
    assertActive?.()
    rows.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return rows
}

const PARTIAL_LIMIT = 200

/** Task ids a To-Do dataset change names, or null when it names none or too many (read everything again). */
export function changedTaskIds(event: unknown, dataset: string = TASKS_DATASET): string[] | null {
  const keys = (event as { keys?: unknown } | undefined)?.keys
  if (!Array.isArray(keys) || !keys.length || keys.length > PARTIAL_LIMIT) return null
  const field = dataset === TASKS_DATASET ? 'id' : 'taskId'
  const ids: string[] = []
  for (const key of keys) {
    const id = (key as Record<string, unknown> | null)?.[field]
    if (typeof id !== 'string' || !id) return null
    ids.push(id)
  }
  return ids
}
