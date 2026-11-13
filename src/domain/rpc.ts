import type { TodoRecord } from '../types'

/** The payloads and results of the UI → backend `records.*` and `taskIcons` RPC calls. */
export interface DocumentRevision { expectedRevision: number; realmGeneration: number }
export interface RecordsAppendPayload { record: TodoRecord }
export interface RecordsUpdatePayload { id: string; record: TodoRecord; expectedUpdatedAt?: string; documentRevision?: DocumentRevision; exactStatusHistory?: boolean }
export interface RecordsUpdateResult { ok: boolean; record?: TodoRecord; previous?: TodoRecord; documentRevision?: DocumentRevision }
export interface RecordsDeletePayload { id: string }
export interface TaskIconsResult { icons: Record<string, string> }
