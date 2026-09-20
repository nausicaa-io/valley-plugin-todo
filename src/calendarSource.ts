import type {
  CalendarItemAction,
  CalendarItemBadge,
  CalendarItemPatch,
  CalendarSourceItem,
  CalendarItemSourceV2
} from '@valley/plugin-sdk'
import {
  CALENDAR_ITEM_SOURCE_REVISION_V1,
  CALENDAR_ITEM_SOURCE_V2,
  GEO_NAVIGATOR_V1
} from '@valley/plugin-sdk'
import { parseAppOpenUrl } from '@valley/plugin-sdk/paths'
import { openLocation } from './LocationField'
import { api, captureTodoScope, revealRequestStore } from './runtime'
import type { TodoPriority, TodoRecord } from './types'
import { appendTodo, deleteTodo, loadCalendarTodoPage, loadTodo, onCalendarItemsChanged, updateTodo } from './data'
import { groupColorFor, type TodoGroup } from './groups'
import { getGroups, onGroupsChanged } from './groupStore'
import { DEFAULT_VIEW, setView } from './viewStore'
import { generateId } from './lib'

const PRIORITIES: readonly string[] = ['normal', 'low', 'medium', 'high']

function asPriority(value: string | undefined, fallback: TodoPriority): TodoPriority {
  return value && PRIORITIES.includes(value) ? (value as TodoPriority) : fallback
}

/**
 * A grouped todo carries its group's colour across, so one task is one colour in
 * both plugins. An explicit `todo.color` still wins — that is the per-task
 * override, and the group is only its default.
 *
 * A todo with no group deliberately sends **no** colour: absent means "the
 * calendar's own rules decide", which keeps colouring by priority and status
 * working for the ungrouped tasks that have always relied on it.
 */
/**
 * What the todo carries, so a calendar can draw it on the chip instead of making
 * the user right-click every item to find out. One badge per menu entry below.
 */
function badges(todo: TodoRecord): CalendarItemBadge[] | undefined {
  const out: CalendarItemBadge[] = []
  if (todo.filePath) out.push('note')
  if (todo.attachments?.length) out.push('attachment')
  if (todo.urls?.length) out.push('link')
  if (todo.location) out.push('location')
  return out.length > 0 ? out : undefined
}

function toItem(todo: TodoRecord, groups: TodoGroup[]): CalendarSourceItem | null {
  if (!todo.dueDate) return null
  return {
    badges: badges(todo),
    icon: 'list-todo',
    id: todo.id,
    documentRef: { pluginId: api.pluginId, sourceId: 'tasks', itemId: todo.id },
    title: todo.title,
    date: todo.dueDate.slice(0, 10),
    startTime: todo.startTime,
    endTime: todo.endTime,
    completed: todo.completed,
    filePath: todo.filePath,
    tags: todo.tags,
    note: todo.note,
    location: todo.location,
    urls: todo.urls,
    attachments: todo.attachments,
    priority: todo.priority,
    status: todo.status,
    ...(todo.group ? { group: todo.group } : {}),
    ...(todo.color ? { color: todo.color } : todo.group ? { color: groupColorFor(todo.group, groups) } : {})
  }
}

function merge(todo: TodoRecord, patch: CalendarItemPatch): TodoRecord {
  return {
    ...todo,
    title: patch.title?.trim() || todo.title,
    dueDate: patch.date ?? todo.dueDate,
    startTime: 'startTime' in patch ? patch.startTime : todo.startTime,
    endTime: 'endTime' in patch ? patch.endTime : todo.endTime,
    note: 'note' in patch ? patch.note ?? '' : todo.note,
    location: 'location' in patch ? patch.location : todo.location,
    urls: 'urls' in patch ? patch.urls : todo.urls,
    attachments: 'attachments' in patch ? patch.attachments : todo.attachments,
    group: 'group' in patch ? patch.group : todo.group,
    tags: patch.tags ?? todo.tags,
    priority: asPriority(patch.priority, todo.priority),
    filePath: 'filePath' in patch ? patch.filePath : todo.filePath,
    completed: patch.completed ?? todo.completed,
    updatedAt: new Date().toISOString()
  }
}

async function todoById(itemId: string): Promise<TodoRecord | null> {
  return loadTodo(itemId)
}

/** `Archive/Images/Apple - Lantern.png` → `Apple - Lantern.png`. */
function fileName(relPath: string): string {
  const cut = relPath.lastIndexOf('/')
  return cut === -1 ? relPath : relPath.slice(cut + 1)
}

const ATTACHMENT_PREFIX = 'attachment:'
const URL_PREFIX = 'url:'

/** Same guard, same reason: no map plugin must cost the map entry, not the menu. */
function canOpenLocation(): boolean {
  try {
    return !!api.interop.services.providers(GEO_NAVIGATOR_V1)[0]
  } catch {
    return false
  }
}

/**
 * The menu the calendar shows on one of our todos.
 *
 * Everything hanging off a todo is reachable from here — the note it links, each
 * attachment, each external link — because the calendar's own click no longer
 * opens anything. A submenu appears only when there is something in it: an empty
 * "Open attachment ▸" is a promise the item cannot keep.
 */
function todoActions(todo: TodoRecord): CalendarItemAction[] {
  const actions: CalendarItemAction[] = [
    { id: 'open-todo', label: 'Open in To-Do', labelKey: 'todo.action.openInTodo', icon: 'checklist' },
    { id: 'edit', label: 'Edit', labelKey: 'todo.action.edit', icon: 'edit' }
  ]

  const openable: CalendarItemAction[] = []
  if (todo.filePath) {
    openable.push({
      id: 'open-note',
      label: 'Open note',
      labelKey: 'todo.action.openNote',
      description: fileName(todo.filePath),
      icon: 'note'
    })
  }
  const attachments = todo.attachments ?? []
  if (attachments.length > 0) {
    openable.push({
      id: 'open-attachment',
      label: 'Attachment',
      labelKey: 'todo.action.openAttachment',
      icon: 'attachment',
      submenu: attachments.map((relPath) => ({
        id: `${ATTACHMENT_PREFIX}${relPath}`,
        label: fileName(relPath),
        description: relPath,
        icon: 'attachment' as const
      }))
    })
  }
  const urls = todo.urls ?? []
  if (urls.length > 0) {
    openable.push({
      id: 'open-link',
      label: 'Link',
      labelKey: 'todo.action.openLink',
      icon: 'link',
      submenu: urls.map((url) => ({ id: `${URL_PREFIX}${url}`, label: url, icon: 'link' as const }))
    })
  }
  if (todo.location && canOpenLocation()) {
    openable.push({
      id: 'show-on-map',
      label: 'Show on map',
      labelKey: 'todo.action.showOnMap',
      description: todo.location.name,
      icon: 'map'
    })
  }
  if (openable.length > 0) actions.push(...openable)
  return actions
}

async function runTodoAction(todo: TodoRecord, actionId: string): Promise<boolean> {
  if (actionId.startsWith(ATTACHMENT_PREFIX)) {
    const relPath = actionId.slice(ATTACHMENT_PREFIX.length)
    if (!(todo.attachments ?? []).includes(relPath)) return false
    api.workspace.openFile(relPath)
    return true
  }
  if (actionId.startsWith(URL_PREFIX)) {
    const url = actionId.slice(URL_PREFIX.length)
    if (!(todo.urls ?? []).includes(url)) return false
    const relPath = parseAppOpenUrl(url)
    if (relPath) api.workspace.openFile(relPath)
    else void api.files.openExternalUrl(url)
    return true
  }
  switch (actionId) {
    case 'open-todo':
    case 'edit':
      await api.workspace.revealOwnPanel('left_sidebar')
      // Select a list the todo is actually in first. Revealing the panel on
      // "Flagged" and scrolling to a row that list filters out is a click that
      // visibly does nothing.
      setView(todo.completed ? { kind: 'smart', id: 'completed' } : DEFAULT_VIEW)
      revealRequestStore().request(todo.id, actionId === 'edit' ? 'edit' : 'focus')
      return true
    case 'open-note':
      if (!todo.filePath) return false
      api.workspace.openFile(todo.filePath)
      return true
    case 'show-on-map':
      if (!todo.location) return false
      openLocation(todo.location)
      return true
    default:
      return false
  }
}

export function registerCalendarSource(): () => void {
  const scope = captureTodoScope()
  const session = generateId('calendar-source')
  let revision = 0
  let active = true
  const source: CalendarItemSourceV2 = {
    integration: {
      name: 'To-Do',
      version: '2.0.0',
      author: 'Yanik',
      description: 'Structured task manager with smart lists, multi-group filters, statuses, swipe actions, nested subtasks, attachment-linked panels, and timestamped activity.',
      localized: {
        de: {
          name: 'To-Do',
          description: 'Strukturierter Aufgabenmanager mit intelligenten Listen, Mehrfach-Gruppenfiltern, Status, Wischaktionen, verschachtelten Unteraufgaben, an Anhänge gebundenen Bereichen und Aktivitäten mit Zeitstempel.'
        },
        es: {
          name: 'To-Do',
          description: 'Gestor de tareas estructurado con listas inteligentes, filtros de varios grupos, estados, gestos, subtareas anidadas, paneles vinculados a adjuntos y actividad con fecha y hora.'
        },
        fr: {
          name: 'To-Do',
          description: 'Gestionnaire de tâches structuré avec listes intelligentes, filtres multigroupes, statuts, gestes, sous-tâches imbriquées, panneaux liés aux pièces jointes et activité horodatée.'
        },
        'zh-CN': {
          name: 'To-Do',
          description: '结构化任务管理器，支持智能列表、多分组筛选、状态、滑动操作、嵌套子任务、附件关联面板和带时间戳的活动记录。'
        }
      }
    },
    list: async ({ startDate, endDate, limit, cursor }) => {
      let queryCursor: string | undefined
      const currentRevision = (): string => `${session}:${revision}`
      if (cursor) {
        let previous: { startDate?: unknown; endDate?: unknown; limit?: unknown; revision?: unknown; cursor?: unknown }
        try { previous = JSON.parse(cursor) } catch { throw new Error('Invalid Calendar source cursor.') }
        if (!previous || previous.startDate !== startDate || previous.endDate !== endDate || previous.limit !== limit || previous.revision !== currentRevision() || typeof previous.cursor !== 'string' || !previous.cursor) throw new Error('Calendar source cursor is stale or belongs to another range.')
        queryCursor = previous.cursor
      }
      scope.assertActive()
      if (!active) throw new Error('Calendar source was disposed.')
      const accepted = currentRevision()
      const page = await loadCalendarTodoPage(startDate, endDate, limit, queryCursor)
      scope.assertActive()
      if (!active) throw new Error('Calendar source was disposed.')
      if (cursor && accepted !== currentRevision()) throw new Error('Calendar source cursor is stale; restart the range.')
      const groups = getGroups()
      const published = currentRevision()
      return {
        items: page.todos.map(todo => toItem(todo, groups)).filter((item): item is CalendarSourceItem => !!item),
        revision: published,
        ...(page.cursor ? { cursor: JSON.stringify({ startDate, endDate, limit, revision: published, cursor: page.cursor }) } : {})
      }
    },

    create: async (date, patch) => {
      if (patch.endDate && patch.endDate !== date) return false
      const title = patch.title?.trim()
      if (!title) return false
      const now = new Date().toISOString()
      return appendTodo({
        id: generateId('todo'),
        title,
        completed: patch.completed ?? false,
        priority: asPriority(patch.priority, 'normal'),
        dueDate: date,
        startTime: patch.startTime,
        endTime: patch.endTime,
        note: patch.note ?? '',
        location: patch.location,
        urls: patch.urls,
        attachments: patch.attachments,
        group: patch.group,
        tags: patch.tags ?? [],
        filePath: patch.filePath,
        createdAt: now,
        updatedAt: now
      })
    },

    update: async (itemId, patch) => {
      const todo = await todoById(itemId)
      if (todo && patch.endDate && patch.endDate !== (patch.date ?? todo.dueDate)) return false
      return todo ? updateTodo(todo.id, merge(todo, patch), todo.updatedAt) : false
    },

    remove: (itemId) => deleteTodo(itemId),

    open: async (itemId) => {
      const todo = await todoById(itemId)
      await api.workspace.revealOwnPanel('left_sidebar')
      if (todo) {
        setView(todo.completed ? { kind: 'smart', id: 'completed' } : DEFAULT_VIEW)
        revealRequestStore().request(todo.id, 'focus')
      }
    },

    configure: () => api.workspace.openOwnSettings(),

    actions: async (itemId) => {
      const todo = await todoById(itemId)
      return todo ? todoActions(todo) : []
    },

    runAction: async (itemId, actionId) => {
      const todo = await todoById(itemId)
      return todo ? runTodoAction(todo, actionId) : false
    }
  }

  const bump = (): void => {
    api.interop.state.publish(CALENDAR_ITEM_SOURCE_REVISION_V1, ++revision)
  }
  api.interop.state.publish(CALENDAR_ITEM_SOURCE_REVISION_V1, revision)
  const offChanges = onCalendarItemsChanged(bump)
  // Recolouring a group is a settings write, not a todo write — without this the
  // calendar keeps serving the old colour until some unrelated todo changes.
  const offGroups = onGroupsChanged(bump)
  const offSource = api.interop.services.provide(CALENDAR_ITEM_SOURCE_V2, source)
  return () => {
    active = false
    offChanges()
    offGroups()
    offSource()
    api.interop.state.publish(CALENDAR_ITEM_SOURCE_REVISION_V1, null)
  }
}
