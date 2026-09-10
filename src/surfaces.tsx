import { METADATA_PANEL_SEGMENT_V1, PLUGIN_SURFACE_V1, type PluginSurfaceSnapshot, type UiMenuItem, type ValleyPluginApi } from '@valley/plugin-sdk'
import type { SlotId } from '@valley/plugin-sdk/types'
import type { PluginLinkState } from '@valley/plugin-sdk/paths'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { React, api, revealRequestStore } from './runtime'
import { getSharedTodos, onSharedTodos } from './sharedTodos'
import { applyTodoVisibleState, getViewHistoryState, goViewHistory, onView, readTodoVisibleState, setView, useView } from './viewStore'
import { loadTodos } from './data'
import { uiText } from './localization'
import { GroupFilterPopover } from './TodoPanel'
import { getGroups, useGroups } from './groupStore'
import { allGroups, groupColorFor, groupKey } from './groups'
import { DEFAULT_VIEW, smartListDef } from './views'
import { openManageGroups } from './GroupEditor'
import { STATUS_DEFS, effectiveStatus } from './statuses'
import { ChevronDown } from './icons'

const SUMMARY_STATUSES = [
  STATUS_DEFS.find((status) => status.id === 'completed')!,
  ...STATUS_DEFS.filter((status) => status.id !== 'completed')
]

interface TodoSurfaceState {
  actions: UiMenuItem[] | null
  selected: Map<SlotId, string>
  listeners: Set<() => void>
}

function state(): TodoSurfaceState {
  return api.runtime.getOrCreate('todo.surfaces', () => ({ actions: null, selected: new Map(), listeners: new Set() }))
}

function notify(): void { for (const listener of state().listeners) listener() }

export function setTodoSurfaceActions(actions: UiMenuItem[] | null): void { state().actions = actions; notify() }

export function selectTodoProperties(id: string | null, surface: SlotId): void {
  if (id) state().selected.set(surface, id)
  else state().selected.delete(surface)
  notify()
}

function snapshot(surface: SlotId): PluginSurfaceSnapshot {
  const view = readTodoVisibleState()
  const selected = getSharedTodos().find((todo) => todo.id === state().selected.get(surface))
  return {
    title: uiText('manifest.name'), view, actions: state().actions ?? [],
    ...(selected ? { item: { id: selected.id, title: selected.title, state: { ...view, todoId: selected.id } } } : {}),
    navigation: { ...getViewHistoryState(), goBack: () => goViewHistory(-1), goForward: () => goViewHistory(1) }
  }
}

function subscribe(listener: () => void): () => void {
  const listeners = state().listeners
  listeners.add(listener)
  const offTodos = onSharedTodos(listener)
  const offView = onView(listener)
  const offSettings = api.settings.subscribe(listener)
  return () => { listeners.delete(listener); offTodos(); offView(); offSettings() }
}

async function restore(raw: PluginLinkState, surface: SlotId, background = false): Promise<void> {
  if (typeof raw.todoId === 'string' && !(await loadTodos()).some((todo) => todo.id === raw.todoId)) throw new Error('The bookmarked task no longer exists.')
  if (!applyTodoVisibleState(raw)) throw new Error('Unsupported To-Do bookmark.')
  selectTodoProperties(typeof raw.todoId === 'string' ? raw.todoId : null, surface)
  if (!background && typeof raw.todoId === 'string') revealRequestStore().request(raw.todoId, 'focus')
}

function GroupStatusBreakdown({ label, color, todos }: { label: string; color: string; todos: ReturnType<typeof getSharedTodos> }): React.ReactElement {
  const [expanded, setExpanded] = React.useState(false)
  return <section className={`todo-status-group${expanded ? ' expanded' : ''}`}>
    <button className="todo-status-group-header" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
      <span className="todo-status-group-name"><span className="props-info-dot" style={{ background: color }} />{label}</span>
      <span className="todo-status-group-meta"><span>{todos.length}</span><ChevronDown /></span>
    </button>
    {expanded && <div className="todo-group-status-breakdown">
      {SUMMARY_STATUSES.map((status) => <div className="todo-group-status-row" key={status.id}>
        <span>{uiText(status.labelKey)}</span>
        <span>{todos.filter((todo) => effectiveStatus(todo) === status.id).length}</span>
      </div>)}
    </div>}
  </section>
}

function Properties(): React.ReactElement {
  const todos = React.useSyncExternalStore(onSharedTodos, getSharedTodos, getSharedTodos)
  const groups = useGroups()
  const view = useView()
  const viewLabel = view.kind === 'smart' ? uiText(smartListDef(view.id).labelKey) : view.kind === 'groups' ? [...view.names, ...(view.includeUngrouped ? [uiText('todo.chip.noGroup')] : [])].join(', ') : view.kind === 'tag' ? `#${view.name}` : uiText('todo.chip.noGroup')
  return <div className="right-panel-body props-info">
    <dl className="props-info-table todo-overall-summary">{[
      [uiText('todo.properties.view'), viewLabel],
      [uiText('todo.properties.tasks'), todos.length],
      ...SUMMARY_STATUSES.map((status) => [uiText(status.labelKey), todos.filter((todo) => effectiveStatus(todo) === status.id).length])
    ].map(([label, value]) => <div className="props-info-row" key={label}><dt className="props-info-key">{label}</dt><dd className="props-info-value">{value}</dd></div>)}</dl>
    <div className="todo-status-groups">
      {[...allGroups(groups), ...(todos.some((todo) => !todo.group) ? [null] : [])].map((name) => {
        const matching = todos.filter((todo) => name === null ? !todo.group : groupKey(todo.group ?? '') === groupKey(name))
        const label = name ?? uiText('todo.chip.noGroup')
        return <GroupStatusBreakdown key={name ?? 'ungrouped'} label={label} color={name ? paletteCssValue(groupColorFor(name, groups)) : 'var(--text-tertiary)'} todos={matching} />
      })}
    </div>
  </div>
}

function GroupProperties(): React.ReactElement {
  const todos = React.useSyncExternalStore(onSharedTodos, getSharedTodos, getSharedTodos)
  const groups = useGroups()
  const view = useView()
  return <div className="right-panel-body props-info"><GroupFilterPopover embedded todos={todos} groups={groups} names={allGroups(groups)} hasUngrouped={todos.some((todo) => !todo.group)} selected={view.kind === 'groups' ? view.names : []} includeUngrouped={view.kind === 'nogroup' || (view.kind === 'groups' && view.includeUngrouped === true)} onChange={(names, includeUngrouped) => setView(names.length || includeUngrouped ? { kind: 'groups', names, includeUngrouped } : DEFAULT_VIEW)} onOpenSettings={openManageGroups} /></div>
}

export function registerTodoSurfaces(pluginApi: ValleyPluginApi): () => void {
  const surfaces = ['main_workspace', 'left_sidebar', 'right_sidebar'] as const
  const offs = surfaces.map((surface) => pluginApi.interop.extensions.provide(PLUGIN_SURFACE_V1, {
    id: `todo.${surface}`, surface, getSnapshot: () => snapshot(surface), subscribe, restore: (value, _instanceId, options) => restore(value, surface, options?.background)
  }))
  offs.push(pluginApi.interop.extensions.provide(METADATA_PANEL_SEGMENT_V1, {
    id: 'todo.properties', label: 'To-Do', labelKey: 'manifest.name', icon: 'list-todo', pluginSurfaces: ['main_workspace'],
    inspect: async ({ subject }) => {
      const todo = (await loadTodos()).find((entry) => entry.id === subject?.item?.id)
      return todo ? Object.entries(todo).map(([id, value]) => ({ id, label: uiText(`todo.field.${id}`), value: value ?? null, readOnly: true })) : []
    },
    render: () => <Properties />
  }))
  offs.push(pluginApi.interop.extensions.provide(METADATA_PANEL_SEGMENT_V1, {
    id: 'todo.groups', label: 'Groups', labelKey: 'todo.view.groups', icon: 'group', pluginSurfaces: ['main_workspace'],
    inspect: () => getGroups().map((group) => ({ id: group.id, label: group.name, value: getSharedTodos().filter((todo) => groupKey(todo.group ?? '') === groupKey(group.name)).length, readOnly: true })),
    render: () => <GroupProperties />
  }))
  return () => offs.forEach((off) => off())
}
