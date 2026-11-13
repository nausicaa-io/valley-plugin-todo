import type { DocumentRevision } from '../domain/rpc'
import { canonicalGroupName, normalizeGroups } from '@valley/plugin-sdk/groups'
import { React, api } from '../runtime'
import { isTodoListRecord, type TodoListRecord } from '../domain/completion'
import { uiText } from '../localization'
import { patchForStatus } from '../state/statusStore'
import type { TodoRecord, TodoStatus } from '../types'
import { loadTodo } from './reads'
import { callUpdateResult, rawAppend, rawDelete, rawUpdate } from './client'

export async function appendTodo(record: TodoRecord): Promise<boolean> {
  if (!record.id || !record.title.trim()) return false
  const ok = await rawAppend(record)
  if (ok) {
    api.undo.push({
      label: uiText('todo.undo.add', { title: record.title.trim() }),
      undo: async () => ({ ok: await rawDelete(record.id) }),
      redo: async () => ({ ok: await rawAppend(record) })
    })
  }
  return ok
}

/**
 * Save an edit and register its undo. The undo snapshot is the record the owner
 * replaced, returned by `records.update`, with its group spelled as the list
 * spells it; a list record's omitted focus sessions are the owner's to keep.
 */
export async function updateTodo(id: string, record: TodoRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  if (!id || !record.title.trim()) return false
  const listed = isTodoListRecord(record)
  const sent = listed ? { ...record } : record
  if (listed) {
    delete (sent as Partial<TodoListRecord>).historyLoaded
    delete (sent as Partial<TodoListRecord>).completionSummary
  }
  const result = await callUpdateResult(id, sent, expectedUpdatedAt, documentRevision)
  const previous = result?.previous
  // As the list would have read it: groups in their configured spelling, a task without a title not at all.
  const prev = previous?.title ? { ...previous, group: canonicalGroupName(previous.group, normalizeGroups(api.getState().groups)) ?? previous.group } : null
  const next = listed ? { ...sent, history: record.history === undefined ? prev?.history : record.history } : record
  const ok = result !== null
  if (ok && prev) {
    api.undo.push({
      label: uiText('todo.undo.edit', { title: prev.title }),
      undo: async () => ({ ok: await rawUpdate(id, prev) }),
      redo: async () => ({ ok: await rawUpdate(id, next) })
    })
  }
  return ok
}

export async function deleteTodo(id: string): Promise<boolean> {
  const prev = await loadTodo(id)
  const ok = await rawDelete(id)
  if (ok && prev) {
    api.undo.push({
      label: uiText('todo.undo.delete', { title: prev.title }),
      undo: async () => ({ ok: await rawAppend(prev) }),
      redo: async () => ({ ok: await rawDelete(id) })
    })
  }
  return ok
}

/**
 * Ask before deleting, then delete through `remove` (the controller's optimistic
 * path). One helper because two surfaces offer the action — a row's ⋯ menu and
 * the detail modal's footer — and they must raise the same dialog.
 */
/** Ask, then delete. Resolves whether the task was deleted (false on Cancel). */
export async function confirmDeleteTodo(
  todo: Pick<TodoRecord, 'id' | 'title'>,
  remove: (id: string) => Promise<void>
): Promise<boolean> {
  const choice = await api.ui.confirm({
    title: uiText('todo.delete.title'),
    message: React.createElement(
      'span',
      null,
      React.createElement('strong', null, todo.title),
      ` ${uiText('todo.delete.message')}`
    ),
    actions: [
      { label: uiText('auto.77dfd2135f4d'), value: 'cancel', variant: 'ghost' },
      { label: uiText('auto.f6fdbe48dc54'), value: 'delete', variant: 'danger' }
    ]
  })
  if (choice !== 'delete') return false
  await remove(todo.id)
  return true
}

/** Set a todo's focus-lifecycle status, rewriting only its record. */
export async function setTodoStatus(id: string, status: TodoStatus): Promise<boolean> {
  const current = await loadTodo(id)
  if (!current) return false
  return updateTodo(id, { ...current, ...patchForStatus(status), updatedAt: new Date().toISOString() })
}
