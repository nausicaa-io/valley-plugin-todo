import type { DatasetRecord, DatasetWhere, PluginBackendApi } from '@valley/plugin-sdk'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { normalizeTodoRecord } from '../domain/records'
import type { TodoRecord } from '../types'
import { queryAll, TASKS_DATASET } from '../domain/datasets'

const ID_CHUNK = 100
/** The columns `reminderTimes`, the notification text and `normalizeTodoRecord` read; no relation dataset is needed. */
const COLUMNS = ['id', 'title', 'note', 'completed', 'status', 'customStatus', 'dueDate', 'startTime', 'reminderTime', 'reminderOffsets', 'remindAt', 'reminderFiredAt']
/**
 * A superset of the tasks that can have a reminder: not completed, and either an
 * absolute reminder or a due date with a start/reminder time. `reminderTimes` still
 * decides on the normalised record (status canceled, fired, empty values), so the
 * schedule is the one a full read produces.
 */
const CANDIDATE: DatasetWhere = {
  completed: false,
  or: [{ remindAt: { isNull: false } }, { and: [{ dueDate: { neq: '' } }, { or: [{ startTime: { isNull: false } }, { reminderTime: { isNull: false } }] }] }]
}

function page(api: Pick<PluginBackendApi, 'data'>, where: DatasetWhere): Promise<DatasetRecord[]> {
  return queryAll(api, TASKS_DATASET, { select: COLUMNS, where })
}

/** Reminder candidates as the records a full read yields for them, read in one filtered, column-selected query. */
export async function readReminderCandidates(api: Pick<PluginBackendApi, 'data'>, ids?: string[]): Promise<TodoRecord[]> {
  const rows: DatasetRecord[] = []
  if (ids === undefined) rows.push(...await page(api, CANDIDATE))
  else {
    const unique = [...new Set(ids)]
    for (let offset = 0; offset < unique.length; offset += ID_CHUNK) rows.push(...await page(api, { and: [{ id: { in: unique.slice(offset, offset + ID_CHUNK) } }, CANDIDATE] }))
  }
  return rows.map(row => normalizeTodoRecord(row as DataRecord)).filter(record => record.title)
}
