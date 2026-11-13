import type { DocumentRevision, RecordsAppendPayload, RecordsDeletePayload, RecordsUpdatePayload, RecordsUpdateResult } from '../domain/rpc'
import { api } from '../runtime'
import type { TodoRecord } from '../types'

export async function rawAppend(record: TodoRecord): Promise<boolean> {
  try { return await api.backend.call<boolean>('records.append', { record } satisfies RecordsAppendPayload) } catch { return false }
}

export async function callUpdateResult(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, exactStatusHistory = false): Promise<RecordsUpdateResult | null> {
  try {
    const result = await api.backend.call<RecordsUpdateResult>('records.update', { id, record, expectedUpdatedAt, documentRevision, ...(exactStatusHistory ? { exactStatusHistory } : {}) } satisfies RecordsUpdatePayload)
    if (result.ok && documentRevision && result.documentRevision) Object.assign(documentRevision, result.documentRevision)
    return result.ok ? result : null
  } catch { return null }
}

async function callUpdate(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, exactStatusHistory = false): Promise<TodoRecord | null> {
  const result = await callUpdateResult(id, record, expectedUpdatedAt, documentRevision, exactStatusHistory)
  return result ? result.record ?? record : null
}

export async function rawUpdate(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  return (await callUpdate(id, record, expectedUpdatedAt, documentRevision)) !== null
}

/** Update and return the record as committed, including the status transition the owner appended. */
export function rawUpdateCommitted(id: string, record: TodoRecord, expectedUpdatedAt?: string): Promise<TodoRecord | null> {
  return callUpdate(id, record, expectedUpdatedAt)
}

/** Write back an exact earlier snapshot (undo/redo of a command), keeping its status history instead of logging a new transition. */
export async function rawRestore(id: string, record: TodoRecord): Promise<boolean> {
  return (await callUpdate(id, record, undefined, undefined, true)) !== null
}

export async function rawDelete(id: string): Promise<boolean> {
  try { return await api.backend.call<boolean>('records.delete', { id } satisfies RecordsDeletePayload) } catch { return false }
}
