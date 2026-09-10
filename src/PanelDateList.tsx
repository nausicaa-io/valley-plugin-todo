import type { ReactElement } from 'react'
import { isoWeek, parseLocalDate, weekStartIndex } from '@valley/plugin-sdk/dateGrid'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { React, api } from './runtime'
import type { TodoListController } from './controller'
import type { TodoGroup } from './groups'
import { TodoList } from './TodoList'
import { addDays, formatDayHeader } from './sort'
import {
  completionTimestamp,
  localDayOfTimestamp,
  panelDateSections,
  todayIso,
  type DateBreakdown
} from './sections'
import { uiText } from './localization'
import { useHostState } from './hooks'

function sectionLabel(kind: 'none' | DateBreakdown, key: string, today: string, shortDateFormat: string, locale: string): string {
  if (kind === 'none') return uiText('todo.breakdown.noDate')
  if (kind === 'monthly') {
    return parseLocalDate(`${key}-01`).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  }
  if (kind === 'weekly') {
    const start = parseLocalDate(key)
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
    return uiText('todo.breakdown.weekLabel', {
      count: isoWeek(start),
      p0: `${formatDayHeader(key, locale, shortDateFormat)} – ${formatDayHeader(todayIso(end), locale, shortDateFormat)}`
    })
  }
  if (key === addDays(today, -1)) return uiText('todo.due.yesterday')
  if (key === today) return uiText('todo.due.today')
  if (key === addDays(today, 1)) return uiText('todo.due.tomorrow')
  return formatDayHeader(key, locale, shortDateFormat)
}

export function PanelDateList({
  todos,
  groups,
  compact,
  controller,
  mode,
  weekStart,
  timeline = false
}: {
  todos: TodoRecord[]
  groups: TodoGroup[]
  compact: boolean
  controller: TodoListController
  mode: DateBreakdown
  weekStart: string
  timeline?: boolean
}): ReactElement {
  const today = todayIso()
  const { shortDateFormat } = useHostState()
  const locale = api.ui.language()
  const sections = React.useMemo(
    () => {
      if (!timeline) return panelDateSections(todos, mode, weekStartIndex(weekStart))
      const ordered = [...todos].sort((a, b) => completionTimestamp(b).localeCompare(completionTimestamp(a)))
      return panelDateSections(ordered, mode, weekStartIndex(weekStart), {
        dateOf: (todo) => localDayOfTimestamp(completionTimestamp(todo)),
        inheritRoot: false
      })
    },
    [mode, timeline, todos, weekStart]
  )
  return (
    <div className="todo-panel-date-sections">
      {sections.map((section) => (
        <section className="todo-panel-date-section" key={`${section.kind}:${section.key}`}>
          <div className="todo-panel-date-head">{sectionLabel(section.kind, section.key, today, shortDateFormat, locale)}</div>
          <TodoList todos={section.todos} groups={groups} compact={compact} c={controller} />
        </section>
      ))}
    </div>
  )
}
