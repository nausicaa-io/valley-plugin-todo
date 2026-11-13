import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetTransactionOperation } from '@valley/plugin-sdk'
import { asColor, asString, asTime, isRecord } from '@valley/plugin-sdk/normalize'
import { isAllowedExternalUrl, normalizeRelPathOpt, parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { canonicalGroupName, normalizeGroups } from '@valley/plugin-sdk/groups'
import { generateId } from './lib'
import { isCustomStatusId, parseStoredStatus } from './model/statusModel'
import type { TodoPriority, TodoRecord, TodoSession, TodoStatusChange } from './types'

import { ATTACHMENTS_DATASET, LINKS_DATASET, SESSIONS_DATASET, STATUS_HISTORY_DATASET, TAGS_DATASET, TASKS_DATASET } from './domain/datasets'
import { isTodoPriority } from './domain/validation'
// ── value coercion ──────────────────────────────────────────────────────────

function asBool(value: unknown): boolean {
  return value === true
}
function asPriority(value: unknown): TodoPriority {
  return isTodoPriority(value) ? value : 'normal'
}
function asMinutes(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return Math.round(value)
  return undefined
}
export function normalizeHistory(value: unknown): TodoSession[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is Record<string, unknown> => isRecord(entry))
    .map((entry) => ({
      startedAt: asString(entry.startedAt),
      endedAt: asString(entry.endedAt),
      activeMinutes: asMinutes(entry.activeMinutes) ?? 0,
      pauseMinutes: asMinutes(entry.pauseMinutes) ?? 0
    }))
    .filter((entry) => entry.startedAt && entry.endedAt)
}

export function normalizeStatusHistory(value: unknown): TodoStatusChange[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is Record<string, unknown> => isRecord(entry))
    .map((entry) => ({
      from: parseStoredStatus(entry.from),
      to: parseStoredStatus(entry.to),
      changedAt: asString(entry.changedAt)
    }))
    .filter((entry): entry is TodoStatusChange => !!entry.from && !!entry.to && !!entry.changedAt && entry.from !== entry.to)
}

/**
 * A reminder is local wall-clock, `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM` — anything
 * else (a full ISO instant a hand-edit or an older build left behind) is dropped
 * rather than half-parsed into the wrong hour.
 */
function asRemindAt(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const s = value.trim()
  return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(s) ? s : undefined
}

/** Only explicitly supported web/app links; realm files use the separate path field. */
export function normalizeTodoUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const s = value.trim()
  if (!s) return undefined
  if (parseAppOpenUrl(s)) return s
  return isAllowedExternalUrl(s) ? s : undefined
}

/** The link list, de-duplicated and restricted to the shared safe-scheme policy. */
function normalizeUrls(value: unknown): string[] | undefined {
  const raw = Array.isArray(value) ? value : []
  const urls = [
    ...new Set(
      raw.map((entry) => normalizeTodoUrl(entry)).filter((entry): entry is string => !!entry)
    )
  ]
  return urls.length ? urls : undefined
}

/** Realm-relative attachment paths, de-duplicated; escapes and empties dropped. */
function normalizeAttachments(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const paths = [
    ...new Set(
      value
        .map((entry) => normalizeRelPathOpt(entry))
        .filter((entry): entry is string => !!entry)
    )
  ]
  return paths.length ? paths : undefined
}

/**
 * A place: a required label plus an optional fix. Coordinates are kept only as a
 * pair — half a position is worse than none, because it maps to the equator.
 */
function normalizeLocation(value: unknown): TodoRecord['location'] {
  if (!isRecord(value)) return undefined
  const name = asString(value.name).trim()
  if (!name) return undefined
  const lng = Number(value.lng)
  const lat = Number(value.lat)
  const fixed = Number.isFinite(lng) && Number.isFinite(lat) && Math.abs(lng) <= 180 && Math.abs(lat) <= 90
  return fixed ? { name, lng, lat } : { name }
}

export function normalizeTodoRecord(input: DataRecord | Partial<TodoRecord>): TodoRecord {
  const record = input as DataRecord
  const now = new Date().toISOString()
  const id = asString(record.id, generateId('todo'))
  const createdAt = asString(record.createdAt, now)
  const history = normalizeHistory(record.history)
  const statusHistory = normalizeStatusHistory(record.statusHistory)
  const status = parseStoredStatus(isCustomStatusId(record.customStatus) ? record.customStatus : record.status)
  return {
    id,
    title: asString(record.title).trim(),
    completed: asBool(record.completed) || status === 'completed' || status === 'canceled',
    priority: asPriority(record.priority),
    dueDate: asString(record.dueDate),
    reminderOffsets: Array.isArray(record.reminderOffsets) ? record.reminderOffsets as number[] : undefined,
    reminderTime: asTime(record.reminderTime),
    startTime: asTime(record.startTime),
    endTime: asTime(record.endTime),
    color: asColor(record.color),
    note: asString(record.note),
    tags: Array.isArray(record.tags)
      ? record.tags.filter((t): t is string => typeof t === 'string' && !!t.trim()).map((t) => t.trim())
      : [],
    estimatedMinutes: asMinutes(record.estimatedMinutes),
    actualMinutes: asMinutes(record.actualMinutes),
    history: history.length ? history : undefined,
    statusHistory: statusHistory.length ? statusHistory : undefined,
    status,
    filePath: normalizeRelPathOpt(record.filePath),
    group: asString(record.group).trim() || undefined,
    flagged: asBool(record.flagged) || undefined,
    urls: normalizeUrls(record.urls),
    attachments: normalizeAttachments(record.attachments),
    location: normalizeLocation(record.location),
    remindAt: asRemindAt(record.remindAt),
    reminderFiredAt: asString(record.reminderFiredAt) || undefined,
    createdAt,
    updatedAt: asString(record.updatedAt, createdAt)
  }
}

/** Drop empty optional fields so persisted records stay tidy. */
export function forWrite(record: TodoRecord): TodoRecord {
  return {
    ...record,
    filePath: normalizeRelPathOpt(record.filePath),
    urls: normalizeUrls(record.urls),
    attachments: normalizeAttachments(record.attachments)
  }
}

export function taskRow(record: TodoRecord): DatasetRecord {
  return {
    id: record.id,
    title: record.title,
    completed: record.completed,
    priority: record.priority,
    dueDate: record.dueDate,
    reminderOffsets: record.reminderOffsets ?? null,
    reminderTime: record.reminderTime ?? null,
    startTime: record.startTime ?? null,
    endTime: record.endTime ?? null,
    color: record.color ?? null,
    note: record.note,
    estimatedMinutes: record.estimatedMinutes ?? null,
    actualMinutes: record.actualMinutes ?? null,
    // The status column only holds SDK values; a custom status is kept in customStatus.
    status: isCustomStatusId(record.status) ? (record.completed ? 'completed' : null) : record.status ?? null,
    customStatus: isCustomStatusId(record.status) ? record.status : null,
    filePath: record.filePath ?? null,
    group: record.group ?? null,
    flagged: record.flagged ?? null,
    location: record.location ?? null,
    remindAt: record.remindAt ?? null,
    reminderFiredAt: record.reminderFiredAt ?? null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  }
}

export interface TodoRelations {
  tags: DatasetRecord[]
  links: DatasetRecord[]
  attachments: DatasetRecord[]
  sessions: DatasetRecord[]
  statusHistory: DatasetRecord[]
}

type OrderedRelation = Exclude<keyof TodoRelations, 'tags'>

/** The ordered relation rows a record stores, positions counted from 0. */
function orderedRelationRows(record: TodoRecord): Array<{ dataset: string; relation: OrderedRelation; rows: DatasetRecord[] }> {
  return [
    { dataset: LINKS_DATASET, relation: 'links', rows: (record.urls ?? []).map((url, position) => ({ taskId: record.id, position, url })) },
    { dataset: ATTACHMENTS_DATASET, relation: 'attachments', rows: (record.attachments ?? []).map((path, position) => ({ taskId: record.id, position, path })) },
    { dataset: SESSIONS_DATASET, relation: 'sessions', rows: (record.history ?? []).map((session, position) => ({ taskId: record.id, position, ...session })) },
    { dataset: STATUS_HISTORY_DATASET, relation: 'statusHistory', rows: (record.statusHistory ?? []).map((entry, position) => ({ taskId: record.id, position, ...entry })) }
  ]
}

export function relationWrites(record: TodoRecord, includeTags = true): DatasetTransactionOperation[] {
  return [
    ...(includeTags ? record.tags.map((tag) => ({
      dataset: TAGS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, tag }
    })) : []),
    ...orderedRelationRows(record).flatMap(({ dataset, rows }) => rows.map((values) => ({ dataset, operation: 'insert' as const, values })))
  ]
}

/**
 * The writes that turn the stored link, attachment, session and status-history
 * rows into the record's: rows already stored at their position are left alone,
 * so an unchanged relation costs nothing and a status change appends one row.
 * The stored result equals deleting every row and inserting the record's.
 */
export function relationChanges(record: TodoRecord, stored: TodoRelations): DatasetTransactionOperation[] {
  const deletes: DatasetTransactionOperation[] = []
  const writes: DatasetTransactionOperation[] = []
  for (const { dataset, relation, rows } of orderedRelationRows(record)) {
    const byPosition = new Map(stored[relation].map((row) => [Number(row.position), row]))
    for (const values of rows) {
      const position = values.position as number
      const existing = byPosition.get(position)
      byPosition.delete(position)
      if (existing && Object.entries(values).every(([field, value]) => existing[field] === value)) continue
      if (!existing) { writes.push({ dataset, operation: 'insert', values }); continue }
      const { taskId: _taskId, position: _position, ...changed } = values
      writes.push({ dataset, operation: 'update', key: { taskId: record.id, position }, values: changed })
    }
    for (const position of byPosition.keys()) deletes.push({ dataset, operation: 'delete', key: { taskId: record.id, position } })
  }
  return [...deletes, ...writes]
}

export function hydrateTodos(raw: DatasetRecord[], relations: TodoRelations, groups: ReturnType<typeof normalizeGroups>): TodoRecord[] {
  const byTask = (rows: DatasetRecord[], ordered = false): Map<unknown, DatasetRecord[]> => {
    const index = new Map<unknown, DatasetRecord[]>()
    for (const row of rows) {
      const entries = index.get(row.taskId)
      if (entries) entries.push(row)
      else index.set(row.taskId, [row])
    }
    if (ordered) for (const entries of index.values()) entries.sort((a, b) => Number(a.position) - Number(b.position))
    return index
  }
  const tags = byTask(relations.tags)
  const links = byTask(relations.links, true)
  const attachments = byTask(relations.attachments, true)
  const sessions = byTask(relations.sessions, true)
  const statusHistory = byTask(relations.statusHistory, true)
  return raw
    .map((record) => normalizeTodoRecord({
      ...record,
      tags: (tags.get(record.id) ?? []).map((row) => row.tag),
      urls: (links.get(record.id) ?? []).map((row) => row.url),
      attachments: (attachments.get(record.id) ?? []).map((row) => row.path),
      history: sessions.get(record.id) ?? [],
      statusHistory: statusHistory.get(record.id) ?? []
    } as DataRecord))
    .map((todo) => ({
      ...todo,
      group: canonicalGroupName(todo.group, groups) ?? todo.group
    }))
    .filter((todo) => todo.title)
}

