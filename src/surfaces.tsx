import { METADATA_PANEL_SEGMENT_V1, provideBookmarkSurface, type PluginSurfaceSnapshot, type UiMenuItem, type ValleyPluginApi } from '@valley/plugin-sdk'
import type { SlotId } from '@valley/plugin-sdk/types'
import type { PluginLinkState } from '@valley/plugin-sdk/paths'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { React, api, revealRequestStore } from './runtime'
import { getSharedTodos, onSharedTodos } from './sharedTodos'
import { applyTodoVisibleState, getViewHistoryState, goViewHistory, onView, readTodoVisibleState } from './viewStore'
import { pinnedView, showView, useShownView } from './tabs'
import { loadTodo } from './data'
import { uiText } from './localization'
import { GroupFilterPopover } from './TodoPanel'
import { getGroups, useGroups } from './groupStore'
import { allGroups, groupColorFor, groupKey, selectedGroupKeys } from './groups'
import { DEFAULT_VIEW, smartListDef } from './views'
import { openManageGroups } from './GroupEditor'
import { allStatuses, effectiveStatus, statusDef } from './statuses'
import { ChevronDown } from './icons'
import type { InteropValueSchema } from '@valley/plugin-sdk'

const bookmarkStateSchema = {
  "type": "object",
  "properties": {
    "v": {
      "type": "literal",
      "value": 1
    },
    "view": {
      "type": "string"
    },
    "showCompleted": {
      "type": "boolean"
    },
    "statusFilter": {
      "type": "union",
      "anyOf": [
        {
          "type": "union",
          "anyOf": [
            {
              "type": "literal",
              "value": "all"
            }
          ]
        },
        {
          "type": "array",
          "items": {
            "type": "string"
          },
          "maxItems": 512
        }
      ]
    },
    "search": {
      "type": "string"
    },
    "sort": {
      "type": "object",
      "properties": {
        "field": {
          "type": "union",
          "anyOf": [
            {
              "type": "literal",
              "value": "auto"
            },
            {
              "type": "literal",
              "value": "due"
            },
            {
              "type": "literal",
              "value": "priority"
            },
            {
              "type": "literal",
              "value": "flagged"
            },
            {
              "type": "literal",
              "value": "updated"
            },
            {
              "type": "literal",
              "value": "created"
            },
            {
              "type": "literal",
              "value": "name"
            }
          ]
        },
        "dir": {
          "type": "union",
          "anyOf": [
            {
              "type": "literal",
              "value": "asc"
            },
            {
              "type": "literal",
              "value": "desc"
            }
          ]
        }
      },
      "required": [
        "field",
        "dir"
      ],
      "additionalProperties": false
    },
    "todoId": {
      "type": "string"
    }
  },
  "required": [
    "v",
    "view",
    "showCompleted",
    "statusFilter",
    "search",
    "sort"
  ],
  "additionalProperties": false
} satisfies InteropValueSchema



function summaryStatuses() {
  const ids = allStatuses()
  return ['completed' as const, ...ids.filter((id) => id !== 'completed')].map((id) => statusDef(id))
}

interface TodoSurfaceState {
  actions: UiMenuItem[] | null
  /** The main tab (instanceId, '' without one) whose page set `actions`. */
  actionsOwner?: string
  selected: Map<SlotId, string>
  listeners: Set<() => void>
}

function state(): TodoSurfaceState {
  return api.runtime.getOrCreate('todo.surfaces', () => ({ actions: null, selected: new Map(), listeners: new Set() }))
}

function notify(): void { for (const listener of state().listeners) listener() }

export function setTodoSurfaceActions(actions: UiMenuItem[] | null, owner = ''): void {
  const current = state()
  if (!actions && current.actionsOwner !== undefined && current.actionsOwner !== owner) return
  current.actions = actions
  current.actionsOwner = actions ? owner : undefined
  notify()
}

export function selectTodoProperties(id: string | null, surface: SlotId): void {
  if (id) state().selected.set(surface, id)
  else state().selected.delete(surface)
  notify()
}

function snapshot(surface: SlotId, instanceId?: string): PluginSurfaceSnapshot {
  const pinned = surface === 'main_workspace' ? pinnedView(instanceId) : null
  const view = readTodoVisibleState(pinned ?? undefined)
  const selected = getSharedTodos().find((todo) => todo.id === state().selected.get(surface))
  return {
    title: uiText('manifest.name'), view, actions: state().actions ?? [],
    ...(selected ? { item: { id: selected.id, title: selected.title, state: { ...view, todoId: selected.id } } } : {}),
    ...(pinned ? {} : { navigation: { ...getViewHistoryState(), goBack: () => goViewHistory(-1), goForward: () => goViewHistory(1) } })
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

async function restore(raw: PluginLinkState, surface: SlotId, background = false, instanceId?: string): Promise<void> {
  if (typeof raw.todoId === 'string' && !(await loadTodo(raw.todoId))) throw new Error('The bookmarked task no longer exists.')
  if (!applyTodoVisibleState(raw, surface === 'main_workspace' && pinnedView(instanceId) !== null)) throw new Error('Unsupported To-Do bookmark.')
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
      {summaryStatuses().map((status) => <div className="todo-group-status-row" key={status.id}>
        <span>{status.label}</span>
        <span>{todos.filter((todo) => effectiveStatus(todo) === status.id).length}</span>
      </div>)}
    </div>}
  </section>
}

function Properties(): React.ReactElement {
  const todos = React.useSyncExternalStore(onSharedTodos, getSharedTodos, getSharedTodos)
  const groups = useGroups()
  const view = useShownView()
  const viewLabel = view.kind === 'smart' ? uiText(smartListDef(view.id).labelKey) : view.kind === 'groups' ? [...view.names, ...(view.includeUngrouped ? [uiText('todo.chip.noGroup')] : [])].join(', ') : view.kind === 'tag' ? `#${view.name}` : uiText('todo.chip.noGroup')
  return <div className="right-panel-body props-info">
    <dl className="props-info-table todo-overall-summary">{[
      [uiText('todo.properties.view'), viewLabel],
      [uiText('todo.properties.tasks'), todos.length],
      ...summaryStatuses().map((status) => [status.label, todos.filter((todo) => effectiveStatus(todo) === status.id).length])
    ].map(([label, value]) => <div className="props-info-row" key={label}><dt className="props-info-key">{label}</dt><dd className="props-info-value">{value}</dd></div>)}</dl>
    <div className="todo-status-groups">
      {[...allGroups(groups), ...(todos.some((todo) => !todo.group) ? [null] : [])].map((name) => {
        const matching = todos.filter((todo) => name === null ? !todo.group : selectedGroupKeys([name]).has(groupKey(todo.group ?? '')))
        const label = name ?? uiText('todo.chip.noGroup')
        return <GroupStatusBreakdown key={name ?? 'ungrouped'} label={label} color={name ? paletteCssValue(groupColorFor(name, groups)) : 'var(--text-tertiary)'} todos={matching} />
      })}
    </div>
  </div>
}

function GroupProperties(): React.ReactElement {
  const todos = React.useSyncExternalStore(onSharedTodos, getSharedTodos, getSharedTodos)
  const groups = useGroups()
  const view = useShownView()
  return <div className="right-panel-body props-info"><GroupFilterPopover embedded todos={todos} groups={groups} names={allGroups(groups)} hasUngrouped={todos.some((todo) => !todo.group)} selected={view.kind === 'groups' ? view.names : []} includeUngrouped={view.kind === 'nogroup' || (view.kind === 'groups' && view.includeUngrouped === true)} onChange={(names, includeUngrouped) => showView(names.length || includeUngrouped ? { kind: 'groups', names, includeUngrouped } : DEFAULT_VIEW)} onOpenSettings={openManageGroups} /></div>
}

export function registerTodoSurfaces(pluginApi: ValleyPluginApi): () => void {
  const surfaces = ['main_workspace', 'left_sidebar', 'right_sidebar'] as const
  const offs = surfaces.map((surface) => provideBookmarkSurface(pluginApi, {
    id: `todo.${surface}`, surface, getSnapshot: (instanceId) => snapshot(surface, instanceId), subscribe, restore: (value, instanceId, options) => restore(value, surface, options?.background, instanceId)
  }, { stateSchema: bookmarkStateSchema, itemStateSchema: { ...bookmarkStateSchema, required: [...bookmarkStateSchema.required, "todoId"] }, description: (snapshot, item) => typeof snapshot.view.path === 'string' && snapshot.view.path ? snapshot.view.path : uiText(item ? 'bookmark.item' : 'bookmark.view') }))
  offs.push(pluginApi.interop.extensions.provide(METADATA_PANEL_SEGMENT_V1, {
    id: 'todo.properties', label: 'To-Do', labelKey: 'manifest.name', icon: 'list-todo', pluginSurfaces: ['main_workspace'],
    inspect: async ({ subject }) => {
      const todo = subject?.item?.id ? await loadTodo(subject.item.id) : null
      return todo ? Object.entries(todo).map(([id, value]) => ({ id, label: uiText(`todo.field.${id}`), value: (value ?? null) as never, readOnly: true })) : []
    },
    render: () => <Properties />
  }))
  offs.push(pluginApi.interop.extensions.provide(METADATA_PANEL_SEGMENT_V1, {
    id: 'todo.groups', label: 'Groups', labelKey: 'todo.view.groups', icon: 'group', pluginSurfaces: ['main_workspace'],
    inspect: () => getGroups().map((group) => ({ id: group.id, label: group.name, value: getSharedTodos().filter((todo) => selectedGroupKeys([group.name]).has(groupKey(todo.group ?? ''))).length, readOnly: true })),
    render: () => <GroupProperties />
  }))
  return () => offs.forEach((off) => off())
}
