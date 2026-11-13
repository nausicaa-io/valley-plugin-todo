import type { BuiltinTodoStatus, CustomStatusId, TodoStatus } from '../types'
import { paletteRef } from '@valley/plugin-sdk/palette'

/**
 * The status vocabulary without the UI: built-in definitions, custom-status
 * normalisation and the done rules. Settings are always passed in, so the backend
 * decides with the values it read (the UI wrappers in `state/statusStore.ts` read them from
 * the runtime).
 */

export interface StatusDef {
  id: TodoStatus
  labelKey: string
  /** The words to show: the translated built-in label, or the name the user gave a custom status. */
  label: string
  color: string
  done: boolean
  cls: string
  locked: boolean
  custom: boolean
}

export type OptionalTodoStatus = Exclude<BuiltinTodoStatus, 'open' | 'completed'>
/** A status that can be switched off, reordered and (custom only) deleted. */
export type ShowableStatus = OptionalTodoStatus | CustomStatusId

/** A status the user created. It is archived while it is not in `active`. */
export interface CustomStatusDef {
  id: CustomStatusId
  label: string
  done: boolean
}

/** The label colour on a filled status badge: the palette's paired contrast, or a fixed white/black. */
export type StatusTextColor = 'auto' | 'white' | 'black'
/** How a status label is drawn on rows and in the table. */
export type StatusStyle = 'filled' | 'text'

export const STATUS_TEXT_COLORS: StatusTextColor[] = ['auto', 'white', 'black']
export const CUSTOM_STATUS_LIMIT = 40
export const CUSTOM_STATUS_LABEL_MAX = 40

export interface TodoStatusSettings {
  active: ShowableStatus[]
  custom: CustomStatusDef[]
  /** Names given to built-in statuses (To do and Completed keep theirs). */
  labels: Partial<Record<TodoStatus, string>>
  /** A status icon (file name in .valley/assets/icons/todo-icon) per status. */
  icons: Partial<Record<TodoStatus, string>>
  /** Whether a built-in status counts as done, where it differs from the default. */
  done: Partial<Record<TodoStatus, boolean>>
  /** Built-in statuses removed in Settings; they no longer appear anywhere. */
  removed: OptionalTodoStatus[]
  colors: Record<TodoStatus, string>
  textColors: Record<TodoStatus, StatusTextColor>
  /** Whether a task in this status shows its title struck through. */
  strikethrough: Record<TodoStatus, boolean>
  style: StatusStyle
}

/** What the done rules read: the custom statuses and the built-in overrides. */
export type StatusDoneSettings = Pick<TodoStatusSettings, 'custom'> & Partial<Pick<TodoStatusSettings, 'done'>>

/** No custom statuses and no overrides: the built-in defaults. */
export const DEFAULT_STATUS_DONE: StatusDoneSettings = { custom: [], done: {} }

/** Done and Canceled read as finished, so they strike through unless switched off. */
export const DEFAULT_STRIKETHROUGH: TodoStatus[] = ['completed', 'canceled']

export const STATUS_SETTINGS_KEY = 'statuses'

const BASE_STATUS_DEFS: Omit<StatusDef, 'label' | 'custom'>[] = [
  { id: 'open', labelKey: 'todo.status.todo', color: paletteRef('gray'), done: false, cls: 'todo-st-open', locked: true },
  { id: 'completed', labelKey: 'todo.status.completed', color: paletteRef('green'), done: true, cls: 'todo-st-completed', locked: true },
  { id: 'inprogress', labelKey: 'todo.status.inProgress', color: paletteRef('primary-blue'), done: false, cls: 'todo-st-inprogress', locked: false },
  { id: 'waiting', labelKey: 'todo.status.waiting', color: paletteRef('yellow'), done: false, cls: 'todo-st-waiting', locked: false },
  { id: 'onhold', labelKey: 'todo.status.onHold', color: paletteRef('orange'), done: false, cls: 'todo-st-onhold', locked: false },
  { id: 'delegated', labelKey: 'todo.status.delegated', color: paletteRef('mint'), done: false, cls: 'todo-st-delegated', locked: false },
  { id: 'deferred', labelKey: 'todo.status.deferred', color: paletteRef('violet'), done: false, cls: 'todo-st-deferred', locked: false },
  { id: 'canceled', labelKey: 'todo.status.canceled', color: paletteRef('red'), done: true, cls: 'todo-st-canceled', locked: false }
]
export const CUSTOM_STATUS_DEFAULT_COLOR = paletteRef('teal')

/** The built-in definitions (default colours, no labels). */
export const STATUS_DEFS: readonly Omit<StatusDef, 'label' | 'custom'>[] = BASE_STATUS_DEFS

/** The SDK's built-in statuses. Custom ones come from settings; see {@link allStatuses}. */
export const STATUSES: BuiltinTodoStatus[] = BASE_STATUS_DEFS.map((status) => status.id as BuiltinTodoStatus)
export const OPTIONAL_STATUSES: OptionalTodoStatus[] = BASE_STATUS_DEFS
  .filter((status) => !status.locked)
  .map((status) => status.id as OptionalTodoStatus)
export const DONE_STATUSES: BuiltinTodoStatus[] = BASE_STATUS_DEFS.filter((status) => status.done).map((status) => status.id as BuiltinTodoStatus)

export const STATUS_DEF_BY_ID = new Map<TodoStatus, Omit<StatusDef, 'label' | 'custom'>>(BASE_STATUS_DEFS.map((status) => [status.id, status]))
export const OPTIONAL_STATUS_SET = new Set<TodoStatus>(OPTIONAL_STATUSES)

export function isCustomStatusId(value: unknown): value is CustomStatusId {
  return typeof value === 'string' && /^custom-[a-z0-9]{1,32}$/.test(value)
}

export function newCustomStatusId(): CustomStatusId {
  return `custom-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`
}

export function normalizeCustomStatuses(value: unknown): CustomStatusDef[] {
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  const out: CustomStatusDef[] = []
  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue
    const raw = entry as Record<string, unknown>
    const label = typeof raw.label === 'string' ? raw.label.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, CUSTOM_STATUS_LABEL_MAX) : ''
    if (!isCustomStatusId(raw.id) || seen.has(raw.id) || !label) continue
    seen.add(raw.id)
    out.push({ id: raw.id, label, done: raw.done === true })
    if (out.length >= CUSTOM_STATUS_LIMIT) break
  }
  return out
}

export function isDoneStatus(status: TodoStatus, settings: StatusDoneSettings): boolean {
  if (STATUS_DEF_BY_ID.has(status)) return settings.done?.[status] ?? STATUS_DEF_BY_ID.get(status)!.done
  return settings.custom.some((custom) => custom.id === status && custom.done)
}

/**
 * A stored status as read from the datasets: a built-in or any well-formed
 * custom id. The backend has no access to the renderer's settings, so this
 * never checks that a custom status still exists — a deleted one reads back as
 * an unknown id and displays as To do (see {@link statusDef}).
 */
export function parseStoredStatus(value: unknown): TodoStatus | undefined {
  if (typeof value !== 'string') return undefined
  if ((STATUSES as string[]).includes(value)) return value as TodoStatus
  return isCustomStatusId(value) ? value : undefined
}

export function effectiveStatus(todo: { status?: TodoStatus; completed: boolean }): TodoStatus {
  return todo.status ?? (todo.completed ? 'completed' : 'open')
}

export function patchForStatus(status: TodoStatus | null, settings: StatusDoneSettings): { completed: boolean; status: TodoStatus | undefined } {
  if (status === null || status === 'open') return { completed: false, status: undefined }
  return { completed: isDoneStatus(status, settings), status }
}
