import type { BundledPluginTranslationCatalogs, ValleyPluginApi } from '@valley/plugin-sdk'
import type { TodoPriority, TodoStatus } from '@valley/plugin-sdk/types'
import en from '../locales/en.json'
import de from '../locales/de.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import zhCN from '../locales/zh-CN.json'

const catalogs = { en, de, es, fr, 'zh-CN': zhCN } satisfies BundledPluginTranslationCatalogs

function english(key: string, params?: Parameters<ValleyPluginApi['ui']['t']>[1]): string {
  const fallback = (catalogs.en as Record<string, string>)[key] ?? key
  return fallback.replace(/\{\{([^}]+)\}\}/g, (_match: string, name: string) => String(params?.[name] ?? ''))
}

let translate: ValleyPluginApi['ui']['t'] = english

export function initLocalization(api: ValleyPluginApi): void {
  api.ui.registerCatalogs(catalogs)
  translate = (key, params) => {
    const value = api.ui.t(key, params)
    return value === key ? english(key, params) : value
  }
}

export function uiText(key: string, params?: Parameters<ValleyPluginApi['ui']['t']>[1]): string {
  return translate(key, params)
}

/**
 * One key per status. Deliberately a table here rather than a `labelKey` read
 * off `STATUS_DEFS` at the call site, so `todoStatusLabel` stays the only thing
 * that turns a stored value into words — and so a key is never resolved at
 * module scope, which would freeze the language at first import.
 */
const STATUS_LABEL_KEYS: Record<TodoStatus, string> = {
  open: 'todo.status.todo',
  inprogress: 'todo.status.inProgress',
  waiting: 'todo.status.waiting',
  onhold: 'todo.status.onHold',
  delegated: 'todo.status.delegated',
  deferred: 'todo.status.deferred',
  completed: 'todo.status.completed',
  canceled: 'todo.status.canceled'
}

const PRIORITY_LABEL_KEYS: Record<TodoPriority, string> = {
  normal: 'todo.priority.none',
  low: 'todo.priority.low',
  medium: 'todo.priority.medium',
  high: 'todo.priority.high'
}

/**
 * The row's meta line reads "High priority" as ONE phrase, so it is one key per
 * level — never `todoPriorityLabel()` plus a translated " priority" suffix.
 * German inflects the adjective ("Hohe Priorität"); gluing the bare label on
 * would render "Hoch Priorität", and Romance languages put the noun first.
 */
const PRIORITY_META_KEYS: Record<TodoPriority, string> = {
  normal: 'todo.priority.noneMeta',
  low: 'todo.priority.lowMeta',
  medium: 'todo.priority.mediumMeta',
  high: 'todo.priority.highMeta'
}

export function todoStatusLabel(status: TodoStatus | null, fallback = ''): string {
  if (status === null || status === 'open') return uiText('todo.status.todo')
  const key = STATUS_LABEL_KEYS[status]
  return key ? uiText(key) : fallback || status
}

export function todoPriorityLabel(priority: TodoPriority): string {
  return uiText(PRIORITY_LABEL_KEYS[priority])
}

export function todoPriorityMetaLabel(priority: TodoPriority): string {
  return uiText(PRIORITY_META_KEYS[priority])
}
