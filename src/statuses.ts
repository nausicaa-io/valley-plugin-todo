import type { TodoStatus } from '@valley/plugin-sdk/types'
import {
  isPaletteRef,
  paletteCssValue,
  paletteRef,
  paletteRefId,
  runtimePaletteSnapshot
} from '@valley/plugin-sdk/palette'
import { React, api } from './runtime'

export interface StatusDef {
  id: TodoStatus
  labelKey: string
  color: string
  done: boolean
  cls: string
  locked: boolean
}

export type OptionalTodoStatus = Exclude<TodoStatus, 'open' | 'completed'>

export interface TodoStatusSettings {
  active: OptionalTodoStatus[]
  colors: Record<TodoStatus, string>
}

export const STATUS_SETTINGS_KEY = 'statuses'

const BASE_STATUS_DEFS: StatusDef[] = [
  { id: 'open', labelKey: 'todo.status.todo', color: paletteRef('gray'), done: false, cls: 'todo-st-open', locked: true },
  { id: 'completed', labelKey: 'todo.status.completed', color: paletteRef('green'), done: true, cls: 'todo-st-completed', locked: true },
  { id: 'inprogress', labelKey: 'todo.status.inProgress', color: paletteRef('primary-blue'), done: false, cls: 'todo-st-inprogress', locked: false },
  { id: 'waiting', labelKey: 'todo.status.waiting', color: paletteRef('yellow'), done: false, cls: 'todo-st-waiting', locked: false },
  { id: 'onhold', labelKey: 'todo.status.onHold', color: paletteRef('orange'), done: false, cls: 'todo-st-onhold', locked: false },
  { id: 'delegated', labelKey: 'todo.status.delegated', color: paletteRef('mint'), done: false, cls: 'todo-st-delegated', locked: false },
  { id: 'deferred', labelKey: 'todo.status.deferred', color: paletteRef('violet'), done: false, cls: 'todo-st-deferred', locked: false },
  { id: 'canceled', labelKey: 'todo.status.canceled', color: paletteRef('red'), done: true, cls: 'todo-st-canceled', locked: false }
]

export const STATUS_DEFS: readonly StatusDef[] = BASE_STATUS_DEFS
export const STATUSES: TodoStatus[] = BASE_STATUS_DEFS.map((status) => status.id)
export const OPTIONAL_STATUSES: OptionalTodoStatus[] = BASE_STATUS_DEFS
  .filter((status): status is StatusDef & { id: OptionalTodoStatus } => !status.locked)
  .map((status) => status.id)
export const DONE_STATUSES: TodoStatus[] = BASE_STATUS_DEFS.filter((status) => status.done).map((status) => status.id)

const BY_ID = new Map<TodoStatus, StatusDef>(BASE_STATUS_DEFS.map((status) => [status.id, status]))
const OPTIONAL_SET = new Set<TodoStatus>(OPTIONAL_STATUSES)

function paletteReferenceExists(value: unknown): value is string {
  if (typeof value !== 'string' || !isPaletteRef(value)) return false
  const id = paletteRefId(value)
  if (!id) return false
  const palette = runtimePaletteSnapshot()
  return palette.colors.some((color) => color.id === id) || palette.archived.some((color) => color.id === id)
}

export function normalizeStatusSettings(value: unknown): TodoStatusSettings {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const sourceActive = Array.isArray(raw.active) ? raw.active : OPTIONAL_STATUSES
  const active: OptionalTodoStatus[] = []
  for (const id of sourceActive) {
    if (typeof id !== 'string' || !OPTIONAL_SET.has(id as TodoStatus)) continue
    if (!active.includes(id as OptionalTodoStatus)) active.push(id as OptionalTodoStatus)
  }
  const rawColors = raw.colors && typeof raw.colors === 'object'
    ? raw.colors as Record<string, unknown>
    : {}
  const colors = Object.fromEntries(STATUSES.map((id) => {
    const fallback = BY_ID.get(id)!.color
    return [id, paletteReferenceExists(rawColors[id]) ? rawColors[id] : fallback]
  })) as Record<TodoStatus, string>
  return { active, colors }
}

export function getStatusSettings(): TodoStatusSettings {
  return normalizeStatusSettings(api?.settings.get()[STATUS_SETTINGS_KEY])
}

export function setStatusSettings(settings: TodoStatusSettings): void {
  void api.settings.set(STATUS_SETTINGS_KEY, normalizeStatusSettings(settings))
}

export function statusDef(status: TodoStatus | null | undefined): StatusDef {
  const base = (status && BY_ID.get(status)) || BASE_STATUS_DEFS[0]
  return { ...base, color: getStatusSettings().colors[base.id] }
}

export function activeStatusDefs(): StatusDef[] {
  const settings = getStatusSettings()
  return [
    BASE_STATUS_DEFS[0],
    BASE_STATUS_DEFS[1],
    ...settings.active.map((id) => statusDef(id))
  ]
}

export function activeStatuses(): TodoStatus[] {
  return activeStatusDefs().map((status) => status.id)
}

export function isStatusActive(status: TodoStatus): boolean {
  return status === 'open' || status === 'completed' || getStatusSettings().active.includes(status as OptionalTodoStatus)
}

export function useStatusVocabulary(): StatusDef[] {
  const [defs, setDefs] = React.useState<StatusDef[]>(activeStatusDefs)
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

export function parseTodoStatus(value: unknown): TodoStatus | undefined {
  if (typeof value !== 'string') return undefined
  return (STATUSES as string[]).includes(value) ? value as TodoStatus : undefined
}

export function effectiveStatus(todo: { status?: TodoStatus; completed: boolean }): TodoStatus {
  return todo.status ?? (todo.completed ? 'completed' : 'open')
}

export function patchForStatus(status: TodoStatus | null): { completed: boolean; status: TodoStatus | undefined } {
  if (status === null || status === 'open') return { completed: false, status: undefined }
  return { completed: DONE_STATUSES.includes(status), status }
}

export interface StatusMenuOption {
  status: TodoStatus | null
  labelKey: string
  cls: string
}

export function statusMenuOptions(): StatusMenuOption[] {
  return activeStatusDefs().map((status) => ({
    status: status.id === 'open' ? null : status.id,
    labelKey: status.labelKey,
    cls: status.cls
  }))
}

function statusColorCss(): string {
  return BASE_STATUS_DEFS.map((base) => {
    const def = statusDef(base.id)
    const value = paletteCssValue(def.color)
    return `.${def.cls}{color:${value}}.todo-detail-field[data-status="${def.id}"] .select-field-value{color:${value}}`
  }).join('')
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
