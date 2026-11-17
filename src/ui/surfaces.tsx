import { METADATA_PANEL_SEGMENT_V1, provideBookmarkSurface, type MetadataPanelSegmentContext, type PluginProperty, type PluginSurfaceSnapshot, type UiMenuItem, type ValleyPluginApi } from '@valley/plugin-sdk'
import type { SlotId } from '@valley/plugin-sdk/types'
import type { PluginLinkState } from '@valley/plugin-sdk/paths'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { React, api, revealRequestStore } from '../runtime'
import { getSharedTodos, onSharedTodos } from '../state/sharedTodos'
import { applyTodoVisibleState, getViewHistoryState, goViewHistory, onView, readTodoVisibleState } from '../state/viewStore'
import { pinnedView } from '../state/tabs'
import { loadTodo } from '../data/reads'
import { uiText } from '../localization'
import { useGroups } from '../state/groupStore'
import { allGroups, groupColorFor, groupKey, groupKeysCovered, isSubgroupName } from '../model/groups'
import { allStatuses, effectiveStatus, statusDef } from '../state/statusStore'
import { ChevronDown } from './icons'
import { registerInfoDetails } from '../integrations/infoDetails'
import { TASK_SEGMENT_ICON, TASK_SEGMENT_ID, TaskCard } from './TaskCard'
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
  if ((state().selected.get(surface) ?? null) === id) return
  if (id) state().selected.set(surface, id)
  else state().selected.delete(surface)
  notify()
}

/** The task a surface has selected: the row the main table marks and the right sidebar's Task tab shows. */
export function useSelectedTodoId(surface: SlotId): string | null {
  const subscribeSelected = React.useCallback((listener: () => void) => {
    const listeners = state().listeners
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  }, [])
  const read = (): string | null => state().selected.get(surface) ?? null
  return React.useSyncExternalStore(subscribeSelected, read, read)
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

function GroupStatusBreakdown({ label, color, todos, sub }: { label: string; color: string; todos: ReturnType<typeof getSharedTodos>; sub?: boolean }): React.ReactElement {
  const [expanded, setExpanded] = React.useState(false)
  return <section className={`todo-status-group${sub ? ' todo-status-subgroup' : ''}${expanded ? ' expanded' : ''}`}>
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

/** The Groups tab of the right sidebar: every group with its total, opening to its counts by status. A subgroup sits indented under its group. */
function Properties(): React.ReactElement {
  const todos = React.useSyncExternalStore(onSharedTodos, getSharedTodos, getSharedTodos)
  const groups = useGroups()
  // The tab fills the sidebar and scrolls in the shared ScrollPanel once the groups outgrow it.
  return <div className="todo-properties-frame" data-plugin-widget-layout="fill"><api.ui.ScrollPanel fill><div className="right-panel-body props-info todo-groups-properties">
    <div className="todo-status-groups">
      {[...allGroups(groups), ...(todos.some((todo) => !todo.group) ? [null] : [])].map((name) => {
        const matching = todos.filter((todo) => name === null ? !todo.group : groupKeysCovered(name).has(groupKey(todo.group ?? '')))
        const label = name ?? uiText('todo.chip.noGroup')
        return <GroupStatusBreakdown key={name ?? 'ungrouped'} label={label} sub={name !== null && isSubgroupName(name, groups)} color={name ? paletteCssValue(groupColorFor(name, groups)) : 'var(--text-tertiary)'} todos={matching} />
      })}
    </div>
  </div></api.ui.ScrollPanel></div>
}

/** The selected task's fields, as the host reads Properties by machine. */
async function inspectTask({ subject }: MetadataPanelSegmentContext): Promise<PluginProperty[]> {
  const todo = subject?.item?.id ? await loadTodo(subject.item.id) : null
  return todo ? Object.entries(todo).map(([id, value]) => ({ id, label: uiText(`todo.field.${id}`), value: (value ?? null) as never, readOnly: true })) : []
}

export function registerTodoSurfaces(pluginApi: ValleyPluginApi): () => void {
  const surfaces = ['main_workspace', 'left_sidebar', 'right_sidebar'] as const
  const offs = surfaces.map((surface) => provideBookmarkSurface(pluginApi, {
    id: `todo.${surface}`, surface, getSnapshot: (instanceId) => snapshot(surface, instanceId), subscribe, restore: (value, instanceId, options) => restore(value, surface, options?.background, instanceId)
  }, { stateSchema: bookmarkStateSchema, itemStateSchema: { ...bookmarkStateSchema, required: [...bookmarkStateSchema.required, "todoId"] }, description: (snapshot, item) => typeof snapshot.view.path === 'string' && snapshot.view.path ? snapshot.view.path : uiText(item ? 'bookmark.item' : 'bookmark.view') }))
  // The Task tab: the row selected in the main table, shown when a row is clicked.
  offs.push(pluginApi.interop.extensions.provide(METADATA_PANEL_SEGMENT_V1, {
    id: TASK_SEGMENT_ID, label: 'Task', labelKey: 'todo.task.tab', icon: TASK_SEGMENT_ICON, pluginSurfaces: ['main_workspace'],
    inspect: inspectTask,
    render: () => <TaskCard />
  }))
  offs.push(pluginApi.interop.extensions.provide(METADATA_PANEL_SEGMENT_V1, {
    id: 'todo.properties', label: 'Groups', labelKey: 'todo.view.myLists', icon: 'group', pluginSurfaces: ['main_workspace'],
    inspect: inspectTask,
    render: () => <Properties />
  }))
  offs.push(registerInfoDetails())
  return () => offs.forEach((off) => off())
}
