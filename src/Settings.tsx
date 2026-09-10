import type { DragEvent, ReactElement } from 'react'
import { React, api } from './runtime'
import { openManageGroups } from './GroupEditor'
import {
  CalendarClock,
  CalendarToday,
  CircleCheck,
  Flag,
  GripVertical,
  Inbox,
  Lock,
  Plus,
  TodoStatusGlyph,
  X
} from './icons'
import { uiText } from './localization'
import {
  OPTIONAL_STATUSES,
  getStatusSettings,
  setStatusSettings,
  statusDef,
  type OptionalTodoStatus,
  type TodoStatusSettings
} from './statuses'
import {
  DATE_BREAKDOWN_SETTING_KEY,
  getDateBreakdown,
  getSmartListSettings,
  getView,
  setSmartListSettings,
  setView
} from './viewStore'
import type { DateBreakdown } from './sections'
import { smartListDef, type SmartListId, type SmartListSettings } from './views'

const SMART_LIST_ICONS: Record<SmartListId, () => ReactElement> = {
  scheduled: () => <CalendarClock />,
  today: () => <CalendarToday />,
  flagged: () => <Flag />,
  all: () => <Inbox />,
  completed: () => <CircleCheck />
}

function SmartListsSettings(): ReactElement {
  const { Button, IconButton, useReorderDrag } = api.ui.settings
  const [settings, setLocal] = React.useState<SmartListSettings>(getSmartListSettings)
  React.useEffect(() => api.settings.subscribe(() => setLocal(getSmartListSettings())), [])

  const commit = (next: SmartListSettings): void => {
    setLocal(next)
    setSmartListSettings(next)
  }
  const visible = settings.order.filter((id) => !settings.hidden.includes(id))
  const items = visible.map(smartListDef)
  const reorder = useReorderDrag({
    items,
    getId: (list) => list.id,
    getLabel: (list) => uiText(list.labelKey),
    onReorder: (next) => {
      const visibleIds = next.map((list) => list.id)
      let cursor = 0
      commit({
        ...settings,
        order: settings.order.map((id) => settings.hidden.includes(id) ? id : visibleIds[cursor++])
      })
    }
  })

  const hide = (id: SmartListId): void => {
    if (visible.length <= 1) return
    const next = { ...settings, hidden: [...settings.hidden, id] }
    commit(next)
    const view = getView()
    if (view.kind === 'smart' && view.id === id) {
      const fallback = next.order.find((candidate) => !next.hidden.includes(candidate))!
      setView({ kind: 'smart', id: fallback })
    }
  }

  return (
    <api.ui.settings.Section title={uiText('todo.settings.smartLists')}>
      <div className="todo-smart-list-settings">
        <p className="todo-status-settings-desc">{uiText('todo.settings.smartListsDesc')}</p>
        {items.map((list) => {
          const handleProps = reorder.getHandleProps(list)
          return (
            <div
              className={'todo-smart-list-setting-row' + (reorder.overId === list.id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
              key={list.id}
              {...reorder.getItemProps(list)}
            >
              <button
                {...handleProps}
                className={(handleProps.className ?? '') + ' todo-status-setting-handle'}
                title={uiText('todo.settings.smartListReorder')}
              >
                <GripVertical />
              </button>
              <span className="todo-smart-list-setting-glyph">{SMART_LIST_ICONS[list.id]()}</span>
              <span className="todo-status-setting-name">{uiText(list.labelKey)}</span>
              <IconButton
                onClick={() => hide(list.id)}
                disabled={visible.length <= 1}
                ariaLabel={uiText('todo.settings.smartListHide', { p0: uiText(list.labelKey) })}
                title={uiText('todo.settings.smartListHide', { p0: uiText(list.labelKey) })}
              >
                <X />
              </IconButton>
            </div>
          )
        })}
        {settings.hidden.length > 0 && (
          <div className="todo-smart-list-hidden">
            <span className="todo-smart-list-hidden-title">{uiText('todo.settings.smartListsHidden')}</span>
            {settings.hidden.map((id) => {
              const list = smartListDef(id)
              return (
                <div className="todo-smart-list-hidden-row" key={id}>
                  <span className="todo-smart-list-setting-glyph">{SMART_LIST_ICONS[id]()}</span>
                  <span>{uiText(list.labelKey)}</span>
                  <Button onClick={() => commit({ ...settings, hidden: settings.hidden.filter((candidate) => candidate !== id) })}>
                    {uiText('todo.settings.smartListRestore')}
                  </Button>
                </div>
              )
            })}
          </div>
        )}
        {reorder.liveRegion}
      </div>
    </api.ui.settings.Section>
  )
}

function StatusesSettings(): ReactElement {
  const { ColorField, IconButton, useReorderDrag } = api.ui.settings
  const [settings, setLocal] = React.useState<TodoStatusSettings>(getStatusSettings)

  React.useEffect(() => api.settings.subscribe(() => setLocal(getStatusSettings())), [])

  const commit = (next: TodoStatusSettings): void => {
    setLocal(next)
    setStatusSettings(next)
  }

  const active = settings.active.map((id) => statusDef(id))
  const hidden = OPTIONAL_STATUSES.filter((id) => !settings.active.includes(id)).map((id) => statusDef(id))
  const optional = [...active, ...hidden]
  const reorder = useReorderDrag({
    items: optional,
    getId: (status) => status.id,
    getLabel: (status) => uiText(status.labelKey),
    onReorder: (next, move) => {
      const movingWasShown = settings.active.includes(move.activeId as OptionalTodoStatus)
      const targetIsShown = settings.active.includes(move.overId as OptionalTodoStatus)
      if (movingWasShown && targetIsShown) {
        const shown = new Set(settings.active)
        commit({ ...settings, active: next.filter((status) => shown.has(status.id as OptionalTodoStatus)).map((status) => status.id as OptionalTodoStatus) })
      } else if (movingWasShown) {
        commit({ ...settings, active: settings.active.filter((id) => id !== move.activeId) })
      } else if (targetIsShown) {
        const nextActive = [...settings.active]
        const targetIndex = nextActive.indexOf(move.overId as OptionalTodoStatus)
        nextActive.splice(targetIndex + (move.position === 'after' ? 1 : 0), 0, move.activeId as OptionalTodoStatus)
        commit({ ...settings, active: nextActive })
      }
    }
  })

  const hide = (id: OptionalTodoStatus): void => {
    commit({ ...settings, active: settings.active.filter((candidate) => candidate !== id) })
  }

  const show = (id: OptionalTodoStatus): void => {
    if (settings.active.includes(id)) return
    commit({ ...settings, active: [...settings.active, id] })
  }

  const receiveDrop = (destination: 'show' | 'hide', event: DragEvent<HTMLDivElement>): void => {
    const row = (event.target as Element).closest('.todo-status-setting-row')
    if (row && !row.classList.contains('locked')) return
    const id = event.dataTransfer.getData('text/plain') as OptionalTodoStatus
    if (!OPTIONAL_STATUSES.includes(id)) return
    event.preventDefault()
    if (destination === 'show') show(id)
    else hide(id)
    reorder.cancel()
  }

  const locked = [statusDef('open'), statusDef('completed')]

  return (
    <api.ui.settings.Section title={uiText('todo.settings.statuses')}>
      <div className="todo-status-settings">
        <p className="todo-status-settings-desc">{uiText('todo.settings.statusesDesc')}</p>
        <span className="todo-status-visibility-title">{uiText('todo.settings.statusesShow')}</span>
        <div
          className={`todo-status-visibility-zone todo-status-show${reorder.activeId && !settings.active.includes(reorder.activeId as OptionalTodoStatus) ? ' accepts-drop' : ''}`}
          onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move' }}
          onDrop={(event) => receiveDrop('show', event)}
        >
          {locked.map((status) => (
            <div className="todo-status-setting-row locked" key={status.id}>
              <span className="todo-status-setting-handle" title={uiText('todo.settings.statusLocked')}>
                <Lock />
              </span>
              <span className="todo-status-setting-glyph">
                <TodoStatusGlyph status={status.id === 'open' ? null : status.id} dotCls={status.cls} />
              </span>
              <span className="todo-status-setting-name">{uiText(status.labelKey)}</span>
              <ColorField
                value={settings.colors[status.id]}
                onChange={(color) => commit({ ...settings, colors: { ...settings.colors, [status.id]: color } })}
                ariaLabel={uiText('todo.settings.statusColor', { p0: uiText(status.labelKey) })}
                allowCustom={false}
              />
              <span className="todo-status-setting-action" aria-hidden="true" />
            </div>
          ))}
          {active.map((status) => {
            const handleProps = reorder.getHandleProps(status)
            return (
              <div
                className={'todo-status-setting-row' + (reorder.overId === status.id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
                key={status.id}
                {...reorder.getItemProps(status)}
              >
                <button
                  {...handleProps}
                  draggable
                  className={(handleProps.className ?? '') + ' todo-status-setting-handle'}
                  title={uiText('todo.settings.statusReorder')}
                  onDragStart={(event) => {
                    handleProps.onDragStart?.(event)
                    event.dataTransfer.setData('text/plain', status.id)
                  }}
                >
                  <GripVertical />
                </button>
                <span className="todo-status-setting-glyph"><TodoStatusGlyph status={status.id} dotCls={status.cls} /></span>
                <span className="todo-status-setting-name">{uiText(status.labelKey)}</span>
                <ColorField
                  value={settings.colors[status.id as OptionalTodoStatus]}
                  onChange={(color) => commit({ ...settings, colors: { ...settings.colors, [status.id]: color } })}
                  ariaLabel={uiText('todo.settings.statusColor', { p0: uiText(status.labelKey) })}
                  allowCustom={false}
                />
                <IconButton
                  className="todo-status-setting-action"
                  onClick={() => hide(status.id as OptionalTodoStatus)}
                  ariaLabel={uiText('todo.settings.statusHide', { p0: uiText(status.labelKey) })}
                  title={uiText('todo.settings.statusHide', { p0: uiText(status.labelKey) })}
                >
                  <X />
                </IconButton>
              </div>
            )
          })}
        </div>
        <span className="todo-status-visibility-title">{uiText('todo.settings.statusesHide')}</span>
        <div
          className={`todo-status-visibility-zone todo-status-hide${reorder.activeId && settings.active.includes(reorder.activeId as OptionalTodoStatus) ? ' accepts-drop' : ''}`}
          onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move' }}
          onDrop={(event) => receiveDrop('hide', event)}
        >
          {hidden.map((status) => {
            const handleProps = reorder.getHandleProps(status)
            return (
              <div
                className={'todo-status-setting-row hidden' + (reorder.overId === status.id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
                key={status.id}
                {...reorder.getItemProps(status)}
              >
                <button
                  {...handleProps}
                  draggable
                  className={(handleProps.className ?? '') + ' todo-status-setting-handle'}
                  title={uiText('todo.settings.statusReorder')}
                  onDragStart={(event) => {
                    handleProps.onDragStart?.(event)
                    event.dataTransfer.setData('text/plain', status.id)
                  }}
                >
                  <GripVertical />
                </button>
                <span className="todo-status-setting-glyph"><TodoStatusGlyph status={status.id} dotCls={status.cls} /></span>
                <span className="todo-status-setting-name">{uiText(status.labelKey)}</span>
                <ColorField
                  value={settings.colors[status.id as OptionalTodoStatus]}
                  onChange={(color) => commit({ ...settings, colors: { ...settings.colors, [status.id]: color } })}
                  ariaLabel={uiText('todo.settings.statusColor', { p0: uiText(status.labelKey) })}
                  allowCustom={false}
                />
                <IconButton
                  className="todo-status-setting-action"
                  onClick={() => show(status.id as OptionalTodoStatus)}
                  ariaLabel={uiText('todo.settings.statusShow', { p0: uiText(status.labelKey) })}
                  title={uiText('todo.settings.statusShow', { p0: uiText(status.labelKey) })}
                >
                  <Plus />
                </IconButton>
              </div>
            )
          })}
          {!hidden.length && <span className="todo-status-visibility-empty">{uiText('todo.settings.statusesHideEmpty')}</span>}
          </div>
        {reorder.liveRegion}
      </div>
    </api.ui.settings.Section>
  )
}

export function Settings(): ReactElement {
  const { Button, Row, Section, SelectField } = api.ui.settings
  const [dateBreakdown, setDateBreakdown] = React.useState<DateBreakdown>(getDateBreakdown)
  return (
    <>
      <Section title={uiText('todo.settings.display')}>
        <Row title={uiText('todo.settings.dateBreakdown')} description={uiText('todo.settings.dateBreakdownDesc')}>
          <SelectField
            className="todo-date-breakdown-select"
            value={dateBreakdown}
            onChange={(value) => {
              const next = value as DateBreakdown
              setDateBreakdown(next)
              void api.settings.set(DATE_BREAKDOWN_SETTING_KEY, next)
            }}
            ariaLabel={uiText('todo.settings.dateBreakdown')}
            options={[
              { value: 'monthly', label: uiText('todo.breakdown.monthly') },
              { value: 'weekly', label: uiText('todo.breakdown.weekly') },
              { value: 'daily', label: uiText('todo.breakdown.daily') }
            ]}
          />
        </Row>
      </Section>
      <SmartListsSettings />
      <Section title={uiText('todo.settings.groups')}>
        <Row title={uiText('todo.settings.groups')} description={uiText('todo.settings.groupsDesc')}>
          <Button onClick={() => void openManageGroups()}>{uiText('todo.settings.groups')}</Button>
        </Row>
      </Section>
      <StatusesSettings />
    </>
  )
}
