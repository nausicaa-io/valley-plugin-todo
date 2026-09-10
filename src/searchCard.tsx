/**
 * Todo → `search.resultCard`.
 *
 * The Todo plugin owns how a todo looks in vault-wide search results and what
 * clicking one does. This used to live in the core search panel, which meant
 * core carried Todo's field names, priority symbols, status badges and time
 * formatting. Now the panel asks "who renders `todo` cards?" and renders
 * whatever comes back; with Todo disabled the same hits fall back to plain rows.
 */
import type { DataRecord } from '@valley/plugin-sdk/types'
import type { ValleyPluginApi, SearchResultCard, SearchResultCardContext } from '@valley/plugin-sdk'
import { SEARCH_RESULT_CARD_V1 } from '@valley/plugin-sdk'
import { React, api } from './runtime'
import { formatMinutes } from './draft'
import { paletteCssValue } from '@valley/plugin-sdk/palette'
import { groupColorFor } from './groups'
import { getGroups } from './groupStore'
import { CalendarDays, CircleCheck, Clock, Flag, Link, Paperclip, TodoStatusGlyph } from './icons'
import { PRIORITIES, formatDate } from './sort'
import { parseTodoStatus, statusDef } from './statuses'
import { todoStatusLabel } from './localization'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const bool = (v: unknown): boolean => v === true
const num = (v: unknown): number | undefined =>
  typeof v === 'number' && Number.isFinite(v) ? v : undefined
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []

function navigablePath(value: unknown): string {
  const path = str(value).replace(/\\/g, '/').replace(/^\.\//, '')
  return path === '.valley' || path.startsWith('.valley/') ? '' : path
}

function TodoSearchCard({
  record,
  ctx
}: {
  record: DataRecord
  ctx: SearchResultCardContext
}): React.ReactElement {
  const { compact } = ctx
  const completed = bool(record.completed)
  const title = str(record.title) || ctx.title
  const priority = str(record.priority)
  const symbol = PRIORITIES.find((p) => p.id === priority)?.symbol
  const note = str(record.note)
  const tags = [...new Set([...strArr(record.tags), ...ctx.tags])]
  const dueDate = str(record.dueDate)
  const estimatedMinutes = num(record.estimatedMinutes)
  const actualMinutes = num(record.actualMinutes)
  const status = parseTodoStatus(record.status)
  const statusBadge = status && status !== 'open' ? statusDef(status) : undefined
  const filePath = str(record.filePath)
  const group = str(record.group)
  const flagged = bool(record.flagged)
  const urls = strArr(record.urls).length
  const attachments = strArr(record.attachments).length
  const hasMeta = !!(
    dueDate ||
    group ||
    attachments ||
    urls ||
    estimatedMinutes !== undefined ||
    (!compact && actualMinutes !== undefined) ||
    statusBadge
  )
  // Same flat markup as TodoRow so a search hit and a panel row read alike; the
  // check is inert here (a result card describes, it does not mutate).
  return (
    <article
      className={`todo-row search-card${completed ? ' completed' : ''}${filePath ? ' todo-row-linked' : ''}${compact ? ' compact' : ''}${flagged ? ' flagged' : ''}`}
      onClick={(event) => ctx.onOpen({ newTab: api.ui.hasModKey(event) })}
    >
      <input
        className="todo-check"
        type="checkbox"
        checked={completed}
        readOnly
        tabIndex={-1}
        aria-hidden
      />
      <div className="todo-row-main">
        <h4>
          {symbol && (
            <span className={`todo-priority-inline todo-priority-${priority}`}>{symbol} </span>
          )}
          {title}
        </h4>
        {!compact && note.trim() && <api.ui.MarkdownView className="todo-notes" value={note}
          context={{ ref: { pluginId: 'todo', sourceId: 'tasks', itemId: str(record.id) }, sourcePath: filePath || undefined }} />}
        {!compact && tags.length > 0 && (
          <div className="todo-tags-view">
            {tags.map((tag) => (
              <span key={tag} className="todo-tag-view-pill">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {hasMeta && (
          <div className="todo-view-meta">
            {group && (
              <span className="todo-group-text" style={{ color: paletteCssValue(groupColorFor(group, getGroups())) }}>
                <span className="todo-group-dot" aria-hidden="true" />
                {group}
              </span>
            )}
            {statusBadge && (
              <span className={`todo-status-badge ${statusBadge.cls}`}>
                <TodoStatusGlyph status={status ?? null} dotCls={statusBadge.cls} />
                {todoStatusLabel(status!)}
              </span>
            )}
            {dueDate && (
              <span className="todo-date">
                <span className="todo-meta-icon"><CalendarDays /></span>
                {formatDate(dueDate, api.getState().dateFormat)}
              </span>
            )}
            {attachments > 0 && (
              <span className="todo-attach-count">
                <span className="todo-meta-icon"><Paperclip /></span>
                {attachments}
              </span>
            )}
            {!!urls && <span className="todo-meta-glyph"><Link /></span>}
            {estimatedMinutes !== undefined && (
              <span className="todo-time-badge">
                <span className="todo-meta-icon"><Clock /></span>
                <span className="todo-time-label">{api.ui.t('todo.estimated')}</span>{' '}
                {formatMinutes(estimatedMinutes)}
              </span>
            )}
            {!compact && actualMinutes !== undefined && (
              <span className="todo-time-badge">
                <span className="todo-meta-icon"><CircleCheck /></span>
                <span className="todo-time-label">{api.ui.t('todo.actual')}</span>{' '}
                {formatMinutes(actualMinutes)}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="todo-row-actions">
        {flagged && <span className="todo-flag-mark"><Flag /></span>}
      </div>
    </article>
  )
}

export function registerSearchCard(pluginApi: ValleyPluginApi): () => void {
  const card: SearchResultCard = {
    cardKind: 'todo',
    render: (record, ctx) => <TodoSearchCard record={record} ctx={ctx} />,
    open: async (record, ctx) => {
      if (str(record.id) && !ctx.newTab) {
        await pluginApi.documents.open({ pluginId: pluginApi.pluginId, sourceId: 'tasks', itemId: str(record.id) })
        return true
      }
      const filePath = navigablePath(record.filePath) || navigablePath(ctx.path)
      if (filePath) pluginApi.workspace.openFile(filePath, undefined, { newTab: ctx.newTab })
      else if (ctx.newTab) pluginApi.workspace.openMainTab({ newTab: true })
      else pluginApi.workspace.revealOwnPanel('left_sidebar')
      return true
    }
  }
  return pluginApi.interop.extensions.provide(SEARCH_RESULT_CARD_V1, card)
}
