import type { BuiltinTodoStatus, CustomStatusId, TodoStatus } from './types'
import {
  isPaletteRef,
  paletteCssContrast,
  paletteCssValue,
  paletteRef,
  paletteRefId,
  runtimePaletteSnapshot
} from '@valley/plugin-sdk/palette'
import { React, api } from './runtime'
import { setCustomStatusLabels, todoStatusLabel } from './localization'

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
  colors: Record<TodoStatus, string>
  textColors: Record<TodoStatus, StatusTextColor>
  /** Whether a task in this status shows its title struck through. */
  strikethrough: Record<TodoStatus, boolean>
  style: StatusStyle
}

/** Done and Canceled read as finished, so they strike through unless switched off. */
const DEFAULT_STRIKETHROUGH: TodoStatus[] = ['completed', 'canceled']

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
const CUSTOM_DEFAULT_COLOR = paletteRef('teal')

/** The built-in definitions (default colours, no labels). */
export const STATUS_DEFS: readonly Omit<StatusDef, 'label' | 'custom'>[] = BASE_STATUS_DEFS

/** The SDK's built-in statuses. Custom ones come from settings; see {@link allStatuses}. */
export const STATUSES: BuiltinTodoStatus[] = BASE_STATUS_DEFS.map((status) => status.id as BuiltinTodoStatus)
export const OPTIONAL_STATUSES: OptionalTodoStatus[] = BASE_STATUS_DEFS
  .filter((status) => !status.locked)
  .map((status) => status.id as OptionalTodoStatus)
export const DONE_STATUSES: BuiltinTodoStatus[] = BASE_STATUS_DEFS.filter((status) => status.done).map((status) => status.id as BuiltinTodoStatus)

const BY_ID = new Map<TodoStatus, Omit<StatusDef, 'label' | 'custom'>>(BASE_STATUS_DEFS.map((status) => [status.id, status]))
const OPTIONAL_SET = new Set<TodoStatus>(OPTIONAL_STATUSES)

export function isCustomStatusId(value: unknown): value is CustomStatusId {
  return typeof value === 'string' && /^custom-[a-z0-9]{1,32}$/.test(value)
}

export function newCustomStatusId(): CustomStatusId {
  return `custom-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`
}

function paletteReferenceExists(value: unknown): value is string {
  if (typeof value !== 'string' || !isPaletteRef(value)) return false
  const id = paletteRefId(value)
  if (!id) return false
  const palette = runtimePaletteSnapshot()
  return palette.colors.some((color) => color.id === id) || palette.archived.some((color) => color.id === id)
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

export function normalizeStatusSettings(value: unknown): TodoStatusSettings {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const custom = normalizeCustomStatuses(raw.custom)
  const customIds = new Set<string>(custom.map((status) => status.id))
  const sourceActive = Array.isArray(raw.active) ? raw.active : OPTIONAL_STATUSES
  const active: ShowableStatus[] = []
  for (const id of sourceActive) {
    if (typeof id !== 'string' || !(OPTIONAL_SET.has(id as TodoStatus) || customIds.has(id))) continue
    if (!active.includes(id as ShowableStatus)) active.push(id as ShowableStatus)
  }
  const ids: TodoStatus[] = [...STATUSES, ...custom.map((status) => status.id)]
  const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const rawColors = record(raw.colors)
  const colors = Object.fromEntries(ids.map((id) => {
    const fallback = BY_ID.get(id)?.color ?? CUSTOM_DEFAULT_COLOR
    return [id, paletteReferenceExists(rawColors[id]) ? rawColors[id] : fallback]
  })) as Record<TodoStatus, string>
  const rawText = record(raw.textColors)
  const textColors = Object.fromEntries(ids.map((id) => [
    id,
    STATUS_TEXT_COLORS.includes(rawText[id] as StatusTextColor) ? rawText[id] : 'auto'
  ])) as Record<TodoStatus, StatusTextColor>
  const rawStrike = record(raw.strikethrough)
  const strikethrough = Object.fromEntries(ids.map((id) => [
    id,
    typeof rawStrike[id] === 'boolean' ? rawStrike[id] : DEFAULT_STRIKETHROUGH.includes(id) || custom.some((status) => status.id === id && status.done)
  ])) as Record<TodoStatus, boolean>
  const style: StatusStyle = raw.style === 'text' ? 'text' : 'filled'
  return { active, custom, colors, textColors, strikethrough, style }
}

export function getStatusSettings(): TodoStatusSettings {
  return normalizeStatusSettings(api?.settings.get()[STATUS_SETTINGS_KEY])
}

export function setStatusSettings(settings: TodoStatusSettings): void {
  void api.settings.set(STATUS_SETTINGS_KEY, normalizeStatusSettings(settings))
}

setCustomStatusLabels((status) => getStatusSettings().custom.find((custom) => custom.id === status)?.label)

/** Every status a stored task may carry: the built-ins plus the custom ones, archived included. */
export function allStatuses(settings: TodoStatusSettings = getStatusSettings()): TodoStatus[] {
  return [...STATUSES, ...settings.custom.map((status) => status.id)]
}

export function isDoneStatus(status: TodoStatus, settings: Pick<TodoStatusSettings, 'custom'> = getStatusSettings()): boolean {
  if (BY_ID.has(status)) return BY_ID.get(status)!.done
  return settings.custom.some((custom) => custom.id === status && custom.done)
}

/**
 * The built-in a custom status is stored as in the tasks dataset's `status`
 * column, which only holds SDK values: Completed for a done status, To do otherwise.
 */
export function builtinStatusFor(status: TodoStatus | undefined, settings: TodoStatusSettings = getStatusSettings()): BuiltinTodoStatus | undefined {
  if (status === undefined || !isCustomStatusId(status)) return status as BuiltinTodoStatus | undefined
  return isDoneStatus(status, settings) ? 'completed' : undefined
}

/** A CSS class name for a status (custom ids are already class-safe). */
function statusClass(status: TodoStatus): string {
  return `todo-st-${status}`
}

/** The CSS foreground for a filled badge of this status. */
export function statusForeground(status: TodoStatus, settings: TodoStatusSettings = getStatusSettings()): string {
  const choice = settings.textColors[status]
  if (choice === 'white') return '#ffffff'
  if (choice === 'black') return '#000000'
  return paletteCssContrast(settings.colors[status] ?? CUSTOM_DEFAULT_COLOR)
}

export function statusDef(status: TodoStatus | null | undefined, settings: TodoStatusSettings = getStatusSettings()): StatusDef {
  const custom = status && isCustomStatusId(status) ? settings.custom.find((candidate) => candidate.id === status) : undefined
  if (custom) {
    return {
      id: custom.id,
      labelKey: '',
      label: custom.label,
      color: settings.colors[custom.id] ?? CUSTOM_DEFAULT_COLOR,
      done: custom.done,
      cls: statusClass(custom.id),
      locked: false,
      custom: true
    }
  }
  const base = (status && BY_ID.get(status)) || BASE_STATUS_DEFS[0]
  return { ...base, label: todoStatusLabel(base.id), color: settings.colors[base.id], custom: false }
}

export function activeStatusDefs(settings: TodoStatusSettings = getStatusSettings()): StatusDef[] {
  return [
    statusDef('open', settings),
    statusDef('completed', settings),
    ...settings.active.map((id) => statusDef(id, settings))
  ]
}

export function activeStatuses(): TodoStatus[] {
  return activeStatusDefs().map((status) => status.id)
}

export function isStatusActive(status: TodoStatus): boolean {
  return status === 'open' || status === 'completed' || getStatusSettings().active.includes(status as ShowableStatus)
}

export function useStatusVocabulary(): StatusDef[] {
  const [defs, setDefs] = React.useState<StatusDef[]>(() => activeStatusDefs())
  React.useEffect(() => api.settings.subscribe(() => setDefs(activeStatusDefs())), [])
  return defs
}

export type TodoStatusFilter = 'all' | [TodoStatus, ...TodoStatus[]]

export function normalizeStatusFilter(value: unknown, active = activeStatuses()): TodoStatusFilter {
  if (value === 'all') return 'all'
  const source = typeof value === 'string' ? [value] : Array.isArray(value) ? value : []
  const selected = active.filter((status) => source.includes(status))
  return selected.length ? selected as [TodoStatus, ...TodoStatus[]] : 'all'
}

export function matchesStatusFilter(
  todo: { completed: boolean; status?: TodoStatus },
  filter: TodoStatusFilter
): boolean {
  return filter === 'all' || filter.includes(effectiveStatus(todo))
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

/** A built-in status, or a custom status that exists (archived ones included). */
export function parseTodoStatus(value: unknown): TodoStatus | undefined {
  if (typeof value !== 'string') return undefined
  if ((STATUSES as string[]).includes(value)) return value as TodoStatus
  return isCustomStatusId(value) && getStatusSettings().custom.some((custom) => custom.id === value) ? value : undefined
}

export function effectiveStatus(todo: { status?: TodoStatus; completed: boolean }): TodoStatus {
  return todo.status ?? (todo.completed ? 'completed' : 'open')
}

export function patchForStatus(status: TodoStatus | null, settings?: Pick<TodoStatusSettings, 'custom'>): { completed: boolean; status: TodoStatus | undefined } {
  if (status === null || status === 'open') return { completed: false, status: undefined }
  return { completed: isDoneStatus(status, settings), status }
}

export interface StatusMenuOption {
  status: TodoStatus | null
  labelKey: string
  label: string
  cls: string
  /** CSS colour for the glyph, for host menus outside the plugin stylesheet. */
  color: string
}

export function statusMenuOptions(): StatusMenuOption[] {
  return activeStatusDefs().map((status) => ({
    status: status.id === 'open' ? null : status.id,
    labelKey: status.labelKey,
    label: status.label,
    cls: status.cls,
    color: paletteCssValue(status.color)
  }))
}

function statusColorCss(): string {
  const settings = getStatusSettings()
  return allStatuses(settings).map((id) => {
    const def = statusDef(id, settings)
    const value = paletteCssValue(def.color)
    const on = statusForeground(id, settings)
    const strike = settings.strikethrough[id]
      ? `.todo-row[data-status="${id}"] h4 .todo-title-md,.todo-table-row[data-status="${id}"] .todo-table-title-text{text-decoration:line-through}`
      : ''
    return `.${def.cls}{color:${value}}.todo-detail-field[data-status="${id}"] .select-field-value{color:${value}}`
      + `.todo-status-pill[data-status="${id}"]{background:${value};color:${on}}` + strike
  }).join('')
}

export function useStatusStyle(): StatusStyle {
  const [style, setStyle] = React.useState<StatusStyle>(() => getStatusSettings().style)
  React.useEffect(() => api.settings.subscribe(() => setStyle(getStatusSettings().style)), [])
  return style
}

export function startStatusVocabulary(): () => void {
  const styleId = 'notes-todo-status-palette'
  let style = document.getElementById(styleId) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = styleId
    document.head.appendChild(style)
  }
  style.dataset.todoStatusPalette = 'true'
  const refresh = (): void => { style.textContent = statusColorCss() }
  refresh()
  const off = api.settings.subscribe(refresh)
  return () => {
    off()
    if (document.getElementById(styleId) === style) style.remove()
  }
}
