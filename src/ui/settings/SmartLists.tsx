import type { ReactElement } from 'react'
import { paletteCssContrast, paletteCssValue } from '@valley/plugin-sdk/palette'
import { React, api } from '../../runtime'
import {
  CalendarClock,
  CalendarToday,
  CalendarWeek,
  CircleCheck,
  Flag,
  GripVertical,
  Inbox
} from '../icons'
import { uiText } from '../../localization'
import {
  getSmartListSettings,
  getView,
  setSmartListSettings,
  setView
} from '../../state/viewStore'
import { smartListDef, smartListForeground, type SmartListId, type SmartListSettings, type SmartListTextColor } from '../../model/views'

import { useSetting } from './shared'

const SMART_LIST_ICONS: Record<SmartListId, () => ReactElement> = {
  scheduled: () => <CalendarClock />,
  today: () => <CalendarToday />,
  week: () => <CalendarWeek />,
  flagged: () => <Flag />,
  all: () => <Inbox />,
  completed: () => <CircleCheck />
}

/**
 * Every smart list in one column: drag to reorder, recolour, and a switch to
 * show or hide it. Hidden lists stay in place so their position survives.
 */
export function SmartListsSettings(): ReactElement {
  const { ColorField, Section, SelectField, Toggle, useReorderDrag } = api.ui.settings
  const [settings, setLocal] = useSetting<SmartListSettings>(getSmartListSettings)
  const textOptions = [
    { value: 'auto', label: uiText('todo.settings.textAuto') },
    { value: 'white', label: uiText('todo.settings.textWhite'), color: '#ffffff' },
    { value: 'black', label: uiText('todo.settings.textBlack'), color: '#000000' }
  ]

  const commit = (next: SmartListSettings): void => {
    setLocal(next)
    setSmartListSettings(next)
  }
  const visibleCount = settings.order.filter((id) => !settings.hidden.includes(id)).length
  const items = settings.order.map((id) => smartListDef(id, settings))
  const reorder = useReorderDrag({
    items,
    indicatorOnly: true,
    getId: (list) => list.id,
    getLabel: (list) => uiText(list.labelKey),
    onReorder: (next) => commit({ ...settings, order: next.map((list) => list.id) })
  })

  const setVisible = (id: SmartListId, visible: boolean): void => {
    if (visible) {
      commit({ ...settings, hidden: settings.hidden.filter((candidate) => candidate !== id) })
      return
    }
    if (visibleCount <= 1) return
    const next = { ...settings, hidden: [...settings.hidden, id] }
    commit(next)
    const view = getView()
    if (view.kind === 'smart' && view.id === id) {
      setView({ kind: 'smart', id: next.order.find((candidate) => !next.hidden.includes(candidate))! })
    }
  }

  return (
    <Section title={uiText('todo.settings.smartLists')}>
      <p className="todo-settings-desc">{uiText('todo.settings.smartListsDesc')}</p>
      <div className="todo-settings-list todo-smart-list-settings" role="list">
        <div className="todo-settings-item todo-settings-head" aria-hidden="true">
          <span />
          <span />
          <span className="todo-settings-name">{uiText('todo.settings.colList')}</span>
          <span>{uiText('todo.settings.colColor')}</span>
          <span>{uiText('todo.settings.colText')}</span>
          <span>{uiText('todo.settings.colShow')}</span>
        </div>
        {items.map((list, index) => {
          const hidden = settings.hidden.includes(list.id)
          // Host-drawn controls are matched to their slot, so a moved row
          // remounts them; otherwise they keep the values of the row that was there.
          const slot = `${list.id}@${index}`
          const handleProps = reorder.getHandleProps(list)
          const label = uiText(list.labelKey)
          return (
            <div
              role="listitem"
              className={'todo-settings-item todo-smart-list-setting-row' + (hidden ? ' is-off' : '') + (reorder.overId === list.id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
              key={list.id}
              {...reorder.getItemProps(list)}
            >
              <button
                {...handleProps}
                className={(handleProps.className ?? '') + ' todo-settings-handle'}
                title={uiText('todo.settings.smartListReorder')}
              >
                <GripVertical />
              </button>
              <span className="todo-settings-chip" style={{ background: paletteCssValue(list.color), color: smartListForeground(list, paletteCssContrast) }} aria-hidden="true">
                {SMART_LIST_ICONS[list.id]()}
              </span>
              <span className="todo-settings-name">{label}</span>
              <ColorField
                key={`color:${slot}`}
                value={list.color}
                onChange={(color) => commit({ ...settings, colors: { ...settings.colors, [list.id]: color } })}
                ariaLabel={uiText('todo.settings.smartListColor', { p0: label })}
                allowCustom={false}
              />
              <SelectField
                key={`text:${slot}`}
                className="todo-settings-text-select"
                value={list.textColor ?? 'auto'}
                options={textOptions}
                ariaLabel={uiText('todo.settings.statusText', { p0: label })}
                onChange={(value) => {
                  const textColors = { ...settings.textColors }
                  if (value === 'auto') delete textColors[list.id]
                  else textColors[list.id] = value as SmartListTextColor
                  commit({ ...settings, textColors })
                }}
              />
              <Toggle
                key={`show:${slot}`}
                checked={!hidden}
                disabled={!hidden && visibleCount <= 1}
                label={uiText('todo.settings.smartListShow', { p0: label })}
                onChange={(next) => setVisible(list.id, next)}
              />
            </div>
          )
        })}
      </div>
      {reorder.liveRegion}
    </Section>
  )
}
