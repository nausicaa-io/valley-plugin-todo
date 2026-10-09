import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetTransactionOperation } from '@valley/plugin-sdk'
import { asColor, asString, asTime, isRecord } from '@valley/plugin-sdk/normalize'
import { isAllowedExternalUrl, normalizeRelPathOpt, parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { canonicalGroupName, normalizeGroups } from '@valley/plugin-sdk/groups'
import { generateId } from './lib'
import { parseTodoStatus } from './statuses'
import type { TodoPriority, TodoRecord, TodoSession, TodoStatusChange } from './types'

const TASKS_DATASET = 'todo.tasks'
const TAGS_DATASET = 'todo.task_tags'
const LINKS_DATASET = 'todo.task_links'
const ATTACHMENTS_DATASET = 'todo.task_attachments'
const SESSIONS_DATASET = 'todo.focus_sessions'
const STATUS_HISTORY_DATASET = 'todo.status_history'
// ── value coercion ──────────────────────────────────────────────────────────

const PRIORITIES: TodoPriority[] = ['normal', 'low', 'medium', 'high']

function asBool(value: unknown): boolean {
  return value === true
}
function asPriority(value: unknown): TodoPriority {
  return typeof value === 'string' && (PRIORITIES as string[]).includes(value)
    ? (value as TodoPriority)
    : 'normal'
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
      from: parseTodoStatus(entry.from),
      to: parseTodoStatus(entry.to),
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

/** Only explicitly supported web/app links; vault files use the separate path field. */
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

/** Vault-relative attachment paths, de-duplicated; escapes and empties dropped. */
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

export function normalizeTodoRecord(record: DataRecord): TodoRecord {
  const now = new Date().toISOString()
  const id = asString(record.id, generateId('todo'))
  const createdAt = asString(record.createdAt, now)
  const history = normalizeHistory(record.history)
  const statusHistory = normalizeStatusHistory(record.statusHistory)
  const status = parseTodoStatus(record.status)
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
    status: record.status ?? null,
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

export function relationWrites(record: TodoRecord, includeTags = true): DatasetTransactionOperation[] {
  return [
    ...(includeTags ? record.tags.map((tag) => ({
      dataset: TAGS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, tag }
    })) : []),
    ...(record.urls ?? []).map((url, position) => ({
      dataset: LINKS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, url }
    })),
    ...(record.attachments ?? []).map((path, position) => ({
      dataset: ATTACHMENTS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, path }
    })),
    ...(record.history ?? []).map((session, position) => ({
      dataset: SESSIONS_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, ...session }
    })),
    ...(record.statusHistory ?? []).map((entry, position) => ({
      dataset: STATUS_HISTORY_DATASET,
      operation: 'insert' as const,
      values: { taskId: record.id, position, ...entry }
    }))
  ]
}

export function relationDeletes(taskId: string, relations: TodoRelations): DatasetTransactionOperation[] {
  return [
    ...relations.tags.map((row) => ({ dataset: TAGS_DATASET, operation: 'delete' as const, key: { taskId, tag: String(row.tag) } })),
    ...relations.links.map((row) => ({ dataset: LINKS_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } })),
    ...relations.attachments.map((row) => ({ dataset: ATTACHMENTS_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } })),
    ...relations.sessions.map((row) => ({ dataset: SESSIONS_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } })),
    ...relations.statusHistory.map((row) => ({ dataset: STATUS_HISTORY_DATASET, operation: 'delete' as const, key: { taskId, position: Number(row.position) } }))
  ]
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

