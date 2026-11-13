import type { DatasetRecord, DatasetWhere, PluginBackendApi } from '@valley/plugin-sdk'
import type { normalizeGroups } from '@valley/plugin-sdk/groups'
import { hydrateTodos, type TodoRelations } from './records'
import type { TodoRecord } from './types'

/** Reads that find tasks by a few columns first and load whole records only for the ones that matter. */
export type TaskReader = Pick<PluginBackendApi, 'data'>
export interface TaskReadOptions {
  groups: ReturnType<typeof normalizeGroups>
  assertActive?: () => void
}

const IDS_PER_READ = 100

async function rows(reader: TaskReader, dataset: string, select: string[] | undefined, where: DatasetWhere | undefined, assertActive?: () => void): Promise<DatasetRecord[]> {
  const all: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    assertActive?.()
    const page = await reader.data.dataset(dataset).query({ select, where, limit: 1000, cursor })
    assertActive?.()
    all.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return all
}

const noRelations: TodoRelations = { tags: [], links: [], attachments: [], sessions: [], statusHistory: [] }

/**
 * The tasks a full read yields, with only `columns` (and optionally the tag rows) loaded. They go
 * through the same normalisation as a full record, so a title, note, tags, completion or group
 * means exactly what it means there; a task without a title is dropped here as there.
 */
export async function readLightTodos(reader: TaskReader, columns: string[], options: TaskReadOptions & { withTags?: boolean; where?: DatasetWhere }): Promise<TodoRecord[]> {
  const [tasks, tags] = await Promise.all([
    rows(reader, 'todo.tasks', columns, options.where, options.assertActive),
    options.withTags ? rows(reader, 'todo.task_tags', ['taskId', 'tag'], undefined, options.assertActive) : []
  ])
  return hydrateTodos(tasks, { ...noRelations, tags }, options.groups)
}

/** Whole records for these ids (as a full read yields them), in the order of `ids`: one read of six datasets per 100 ids. */
export async function readTodosByIds(reader: TaskReader, ids: string[], options: TaskReadOptions): Promise<TodoRecord[]> {
  const unique = [...new Set(ids)]
  const found = new Map<string, TodoRecord>()
  for (let offset = 0; offset < unique.length; offset += IDS_PER_READ) {
    const chunk = unique.slice(offset, offset + IDS_PER_READ)
    const byTask: DatasetWhere = { taskId: { in: chunk } }
    const [tasks, tags, links, attachments, sessions, statusHistory] = await Promise.all([
      rows(reader, 'todo.tasks', undefined, { id: { in: chunk } }, options.assertActive),
      rows(reader, 'todo.task_tags', undefined, byTask, options.assertActive),
      rows(reader, 'todo.task_links', undefined, byTask, options.assertActive),
      rows(reader, 'todo.task_attachments', undefined, byTask, options.assertActive),
      rows(reader, 'todo.focus_sessions', undefined, byTask, options.assertActive),
      rows(reader, 'todo.status_history', undefined, byTask, options.assertActive)
    ])
    for (const todo of hydrateTodos(tasks, { tags, links, attachments, sessions, statusHistory }, options.groups)) found.set(todo.id, todo)
  }
  return unique.flatMap((id) => found.get(id) ?? [])
}

/** Past this many ids, one targeted read per 100 costs more round trips than a read of everything. */
export const TARGETED_READ_LIMIT = IDS_PER_READ
