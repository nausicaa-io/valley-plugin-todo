import type { TodoStatus } from './types'
import {
  isPaletteRef,
  paletteCssContrast,
  paletteCssValue,
  paletteRefId,
  runtimePaletteSnapshot
} from '@valley/plugin-sdk/palette'
import { React, api } from './runtime'
import { setCustomStatusLabels, todoStatusLabel } from './localization'
import {
  CUSTOM_STATUS_DEFAULT_COLOR as CUSTOM_DEFAULT_COLOR,
  CUSTOM_STATUS_LABEL_MAX,
  DEFAULT_STRIKETHROUGH,
  OPTIONAL_STATUSES,
  OPTIONAL_STATUS_SET as OPTIONAL_SET,
  STATUS_DEF_BY_ID as BY_ID,
  STATUS_DEFS as BASE_STATUS_DEFS,
  STATUS_SETTINGS_KEY,
  STATUS_TEXT_COLORS,
  STATUSES,
  isCustomStatusId,
  isDoneStatus as isDoneStatusFor,
  normalizeCustomStatuses,
  patchForStatus as patchForStatusFor,
  effectiveStatus,
  type OptionalTodoStatus,
  type ShowableStatus,
  type StatusDef,
  type StatusDoneSettings,
  type StatusStyle,
  type StatusTextColor,
  type TodoStatusSettings
} from './model/statusModel'

export {
  CUSTOM_STATUS_LABEL_MAX,
  CUSTOM_STATUS_LIMIT,
  DONE_STATUSES,
  OPTIONAL_STATUSES,
  STATUS_DEFS,
  STATUS_SETTINGS_KEY,
  STATUS_TEXT_COLORS,
  STATUSES,
  effectiveStatus,
  isCustomStatusId,
  newCustomStatusId,
  normalizeCustomStatuses,
  parseStoredStatus
} from './model/statusModel'
export type { CustomStatusDef, OptionalTodoStatus, ShowableStatus, StatusDef, StatusStyle, StatusTextColor, TodoStatusSettings } from './model/statusModel'

function paletteReferenceExists(value: unknown): value is string {
  if (typeof value !== 'string' || !isPaletteRef(value)) return false
  const id = paletteRefId(value)
  if (!id) return false
  const palette = runtimePaletteSnapshot()
  return palette.colors.some((color) => color.id === id) || palette.archived.some((color) => color.id === id)
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
  // Statuses are always drawn as coloured text; the filled badge style is retired.
  const style: StatusStyle = 'text'
  const text = (value: unknown, max: number): string => typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max) : ''
  const removed = (Array.isArray(raw.removed) ? raw.removed : []).filter((id): id is OptionalTodoStatus => typeof id === 'string' && OPTIONAL_SET.has(id as TodoStatus))
  const labels = Object.fromEntries(ids.map((id) => [id, text(record(raw.labels)[id], CUSTOM_STATUS_LABEL_MAX)]).filter(([, label]) => label)) as Partial<Record<TodoStatus, string>>
  // To do and Completed always use their own glyphs.
  const icons = Object.fromEntries(ids.filter((id) => id !== 'open' && id !== 'completed').map((id) => [id, text(record(raw.icons)[id], 80)]).filter(([, icon]) => icon && /^[^/\\]+$/.test(icon))) as Partial<Record<TodoStatus, string>>
  const done = Object.fromEntries(OPTIONAL_STATUSES.map((id) => [id, record(raw.done)[id]]).filter(([id, value]) => typeof value === 'boolean' && value !== BY_ID.get(id as TodoStatus)?.done)) as Partial<Record<TodoStatus, boolean>>
  return { active: active.filter((id) => !removed.includes(id as OptionalTodoStatus)), custom, colors, textColors, strikethrough, style, labels, icons, done, removed: [...new Set(removed)] }
}

let statusMemo: { raw: unknown; palette: unknown; value: TodoStatusSettings } | null = null

/**
 * The normalised settings, shared by every row until the stored value (or the
 * palette it is validated against) changes identity.
 */
export function getStatusSettings(): TodoStatusSettings {
  const raw = api?.settings.get()[STATUS_SETTINGS_KEY]
  const palette = runtimePaletteSnapshot()
  if (statusMemo && statusMemo.raw === raw && statusMemo.palette === palette) return statusMemo.value
  const value = normalizeStatusSettings(raw)
  statusMemo = { raw, palette, value }
  return value
}

export function setStatusSettings(settings: TodoStatusSettings): void {
  void api.settings.set(STATUS_SETTINGS_KEY, normalizeStatusSettings(settings))
}

setCustomStatusLabels((status) => { const settings = getStatusSettings(); return settings.labels[status] ?? settings.custom.find((custom) => custom.id === status)?.label })

/** Every status a stored task may carry: the built-ins plus the custom ones, archived included. */
export function allStatuses(settings: TodoStatusSettings = getStatusSettings()): TodoStatus[] {
  return [...STATUSES, ...settings.custom.map((status) => status.id)]
}

export function isDoneStatus(status: TodoStatus, settings: StatusDoneSettings = getStatusSettings()): boolean {
  return isDoneStatusFor(status, settings)
}

export function patchForStatus(status: TodoStatus | null, settings?: StatusDoneSettings): { completed: boolean; status: TodoStatus | undefined } {
  return patchForStatusFor(status, settings ?? getStatusSettings())
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
  return { ...base, label: settings.labels[base.id] ?? todoStatusLabel(base.id), done: settings.done[base.id] ?? base.done, color: settings.colors[base.id], custom: false }
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
