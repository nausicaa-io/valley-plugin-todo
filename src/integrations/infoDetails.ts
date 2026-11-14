import { WORKSPACE_DETAILS_V1, type WorkspaceDetailItem, type WorkspaceDetailValue, type WorkspaceDetailsProvider } from '@valley/plugin-sdk'
import { api } from '../runtime'
import type { TodoStatus } from '../types'
import { englishText, uiText } from '../localization'
import { listFacts, type ListFacts } from '../model/listFacts'
import { formatDate, isoDay } from '../model/sort'
import { groupKey } from '../model/groups'
import { DEFAULT_VIEW } from '../model/views'
import { getGroups, onGroupsChanged } from '../state/groupStore'
import { getSharedTodos, onSharedTodos } from '../state/sharedTodos'
import { allStatuses, statusDef } from '../state/statusStore'
import { pinnedView, viewSummary } from '../state/tabs'
import { getView, onView } from '../state/viewStore'

const TOP_TAGS = 3

const STATIC_ROWS = ['list', 'tasks', 'open', 'completed', 'overdue', 'dueToday', 'next7', 'noDate', 'flagged', 'reminder', 'priority'] as const
const TAIL_ROWS = ['tags', 'nextDue', 'lastCompleted', 'lastChange', 'created'] as const

const staticItem = (id: string): WorkspaceDetailItem => ({ id, label: englishText(`todo.info.${id}`), labelKey: `todo.info.${id}`, kind: 'text' })
const verbatimItem = (id: string, label: string): WorkspaceDetailItem => ({ id, label, kind: 'text' })

/** Core accepts item ids matching `[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}`; a group key or status id outside that (a space, an umlaut) gets a stable hash instead. */
const DETAIL_ID = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/
export function detailItemId(prefix: string, raw: string): string {
  const plain = `${prefix}:${raw}`
  if (DETAIL_ID.test(plain)) return plain
  let hash = 0x811c9dc5
  for (const byte of new TextEncoder().encode(raw)) hash = Math.imul(hash ^ byte, 0x01000193) >>> 0
  return `${prefix}:h${hash.toString(16).padStart(8, '0')}`
}

type DynamicItems = { statuses: WorkspaceDetailItem[]; hasGroups: boolean; keys: Map<string, string> }

/** The statuses any task uses, in the order Info lists them. The list's rows come from here, whatever view is open. */
function dynamicItems(all: ListFacts): DynamicItems {
  const keys = new Map<string, string>()
  const statuses = allStatuses().filter((id) => (all.statuses.get(id) ?? 0) > 0).map((id) => {
    const itemId = detailItemId('status', id)
    keys.set(itemId, id)
    return verbatimItem(itemId, statusDef(id).label)
  })
  return { statuses, hasGroups: all.groups.size > 0, keys }
}

function textValues(facts: ListFacts, view: ReturnType<typeof getView>, items: DynamicItems): Record<string, WorkspaceDetailValue> {
  const values: Record<string, WorkspaceDetailValue> = {}
  const put = (id: string, text: string): void => { if (text) values[id] = { text } }
  const count = (id: string, n: number): void => { if (n > 0) put(id, String(n)) }
  const pattern = api.getState().dateFormat
  const day = (value: string): string => formatDate(value, pattern)
  put('list', viewSummary(view))
  put('tasks', String(facts.total))
  if (facts.total > 0) {
    put('open', String(facts.open))
    put('completed', String(facts.completed))
  }
  count('overdue', facts.overdue)
  count('dueToday', facts.dueToday)
  count('next7', facts.next7)
  count('noDate', facts.noDate)
  count('flagged', facts.flagged)
  count('reminder', facts.withReminder)
  put('priority', (['high', 'medium', 'low'] as const).filter((level) => facts.priority[level] > 0).map((level) => `${uiText(`todo.priority.${level}`)} ${facts.priority[level]}`).join(' · '))
  for (const item of items.statuses) count(item.id, facts.statuses.get(items.keys.get(item.id) as TodoStatus) ?? 0)
  count('groups', facts.groups.size)
  if (facts.tags.size) {
    const top = [...facts.tags.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, TOP_TAGS)
    put('tags', [String(facts.tags.size), ...top.map((tag) => `#${tag.name} ${tag.count}`)].join(' · '))
  }
  if (facts.nextDue) put('nextDue', `${facts.nextDue.title} · ${day(facts.nextDue.date)}`)
  if (facts.lastCompleted) put('lastCompleted', day(facts.lastCompleted))
  if (facts.lastChange) put('lastChange', day(facts.lastChange))
  if (facts.oldest && facts.newest) put('created', facts.oldest === facts.newest ? day(facts.oldest) : `${day(facts.oldest)} – ${day(facts.newest)}`)
  return values
}

/**
 * The facts of the open list as plain Info rows. Core lists a plugin's text details under its Footer details, in the
 * order they are declared here; a row with no value is not drawn. The status and group rows follow what the tasks use, so
 * the declaration is re-registered when that set (or a name) changes — never for a count.
 */
export function registerInfoDetails(): () => void {
  const listeners = new Set<() => void>()
  let key = ''
  let dynamic: DynamicItems = { statuses: [], hasGroups: false, keys: new Map() }
  let off = (): void => {}
  const declare = (): void => {
    const next = dynamicItems(listFacts(getSharedTodos(), DEFAULT_VIEW, isoDay()))
    const nextItems = [
      { id: 'title', label: 'Title', labelKey: 'details.item.title', kind: 'text' as const },
      ...STATIC_ROWS.map(staticItem), ...next.statuses, ...(next.hasGroups ? [staticItem('groups')] : []), ...TAIL_ROWS.map(staticItem)
    ]
    const nextKey = JSON.stringify(nextItems.map((item) => [item.id, item.label]))
    dynamic = next
    if (nextKey === key) return
    key = nextKey
    off()
    const provider: WorkspaceDetailsProvider = {
      id: 'todo.details', label: 'To-Do', labelKey: 'manifest.name', pluginViews: true, items: nextItems, defaultItems: ['title'],
      subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener) } },
      getSnapshot: (context) => {
        const view = pinnedView(context.instanceId) ?? getView()
        return { items: textValues(listFacts(getSharedTodos(), view, isoDay()), view, dynamic) }
      }
    }
    off = api.interop.extensions.provide(WORKSPACE_DETAILS_V1, provider)
  }
  const refresh = (): void => { declare(); for (const listener of [...listeners]) listener() }
  declare()
  const offs = [onSharedTodos(refresh), onView(refresh), onGroupsChanged(refresh), api.subscribeState(['activePluginTab', 'dateFormat'], refresh)]
  return () => { for (const stop of offs) stop(); off(); listeners.clear() }
}
