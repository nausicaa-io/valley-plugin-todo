import { ReminderDefaults } from './ReminderOffsets'
import type { CSSProperties, ReactElement } from 'react'
import type { CustomStatusId, TodoStatus } from './types'
import { paletteCssContrast, paletteCssValue } from '@valley/plugin-sdk/palette'
import { React, api } from './runtime'
import {
  CalendarClock,
  CalendarToday,
  CalendarWeek,
  CircleCheck,
  Flag,
  GripVertical,
  Inbox,
  Lock,
  Strikethrough,
  TodoStatusGlyph,
  Trash
} from './icons'
import { uiText } from './localization'
import {
  CUSTOM_STATUS_LABEL_MAX,
  CUSTOM_STATUS_LIMIT,
  OPTIONAL_STATUSES,
  getStatusSettings,
  isCustomStatusId,
  newCustomStatusId,
  normalizeStatusSettings,
  setStatusSettings,
  statusDef,
  type ShowableStatus,
  type StatusDef,
  type StatusStyle,
  type StatusTextColor,
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
import { smartListDef, smartListForeground, type SmartListId, type SmartListSettings, type SmartListTextColor } from './views'
import { StatusBadgeView } from './StatusBadge'
import { loadTodoList, setTodoGroup, setTodoStatus } from './data'
import { getLocalGroups, setLocalGroups, useGroups, useLocalGroups } from './groupStore'
import { groupKey, nextGroupColor } from './groups'
import { LOCAL_GROUP_LIMIT, LOCAL_GROUP_NAME_MAX, newLocalGroupId, renameLocalGroup, type LocalGroup } from './localGroups'

/**
 * The host draws its Segmented control at its natural width inside a full-width
 * placeholder, starting at the left. Sizing the placeholder to that width
 * (host .settings-segmented: 1px border, 0.75rem labels, 10px side padding,
 * 1px dividers) lets the row end-align it like the other controls.
 */
function segmentedStyle(labels: string[]): CSSProperties | undefined {
  const width = segmentedWidth(labels)
  return width ? { '--todo-segmented-width': `${width}px` } as CSSProperties : undefined
}

function segmentedWidth(labels: string[]): number {
  const root = getComputedStyle(document.documentElement)
  const family = root.getPropertyValue('--interface-font').trim() || getComputedStyle(document.body).fontFamily
  const context = document.createElement('canvas').getContext('2d')
  if (!context) return 0
  const size = (parseFloat(root.fontSize) || 16) * 0.75
  // The host buttons may keep the browser's button font, so take the wider of the two.
  const text = Math.max(...[family, 'system-ui, -apple-system, sans-serif'].map((font) => {
    context.font = `${size}px ${font}`
    return labels.reduce((sum, label) => sum + context.measureText(label).width, 0)
  }))
  return Math.ceil(text + labels.length * 20 + (labels.length - 1) + 2) + 4
}

const SMART_LIST_ICONS: Record<SmartListId, () => ReactElement> = {
  scheduled: () => <CalendarClock />,
  today: () => <CalendarToday />,
  week: () => <CalendarWeek />,
  flagged: () => <Flag />,
  all: () => <Inbox />,
  completed: () => <CircleCheck />
}

function useSetting<T>(read: () => T): [T, (next: T) => void] {
  const [value, setValue] = React.useState<T>(read)
  React.useEffect(() => api.settings.subscribe(() => setValue(read())), [read])
  return [value, setValue]
}

/**
 * Every smart list in one column: drag to reorder, recolour, and a switch to
 * show or hide it. Hidden lists stay in place so their position survives.
 */
function SmartListsSettings(): ReactElement {
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

/**
 * A text field drawn in the plugin's own document, with the shared Settings
 * control styling. The host TextField is controlled across the frame bridge, so
 * fast typing drops characters whenever an older value comes back after newer
 * keystrokes. This one is uncontrolled: it reports each keystroke to `onType`
 * and the final text to `onCommit` on Enter or blur; Escape restores `initial`.
 */
function CommitTextField({ initial, onCommit, onType, placeholder, ariaLabel, disabled }: {
  initial: string
  onCommit: (value: string) => void
  onType?: (value: string) => void
  placeholder?: string
  ariaLabel: string
  disabled?: boolean
}): ReactElement {
  const skip = React.useRef(false)
  return (
    <input
      className="settings-control todo-settings-text"
      type="text"
      defaultValue={initial}
      placeholder={placeholder}
      aria-label={ariaLabel}
      disabled={disabled}
      autoComplete="off"
      spellCheck={false}
      onChange={(event) => onType?.(event.currentTarget.value)}
      onBlur={(event) => {
        if (skip.current) { skip.current = false; return }
        onCommit(event.currentTarget.value)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          event.currentTarget.blur()
        } else if (event.key === 'Escape') {
          event.preventDefault()
          event.currentTarget.value = initial
          skip.current = true
          event.currentTarget.blur()
        }
      }}
    />
  )
}

/**
 * One row per status: its badge as it will look, the badge colour, the label
 * colour, and whether the status is offered at all. To do and Completed are
 * always offered and stay first; the rest reorder by their grip.
 */
function StatusesSettings(): ReactElement {
  const { Button, ColorField, IconButton, Row, Section, Segmented, SelectField, Toggle, useReorderDrag } = api.ui.settings
  const [settings, setLocal] = useSetting<TodoStatusSettings>(getStatusSettings)
  const draft = React.useRef('')
  const [addKey, setAddKey] = React.useState(0)
  const [canAdd, setCanAdd] = React.useState(false)

  /** Normalized first, so a status just added already has its default colours here. */
  const commit = (next: TodoStatusSettings): void => {
    const normalized = normalizeStatusSettings(next)
    setLocal(normalized)
    setStatusSettings(normalized)
  }

  const active = settings.active.map((id) => statusDef(id, settings))
  const reorder = useReorderDrag({
    items: active,
    indicatorOnly: true,
    getId: (status) => status.id,
    getLabel: (status) => status.label,
    onReorder: (next) => commit({ ...settings, active: next.map((status) => status.id as ShowableStatus) })
  })

  const setShown = (id: ShowableStatus, shown: boolean): void => {
    if (shown === settings.active.includes(id)) return
    commit({ ...settings, active: shown ? [...settings.active, id] : settings.active.filter((candidate) => candidate !== id) })
  }

  const customLabel = (label: string): string => label.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, CUSTOM_STATUS_LABEL_MAX)
  const addStatus = (): void => {
    const label = customLabel(draft.current)
    if (!label || settings.custom.length >= CUSTOM_STATUS_LIMIT) return
    const id = newCustomStatusId()
    commit({ ...settings, custom: [...settings.custom, { id, label, done: false }], active: [...settings.active, id] })
    draft.current = ''
    setCanAdd(false)
    setAddKey((key) => key + 1)
  }
  const renameStatus = (id: CustomStatusId, value: string): void => {
    const label = customLabel(value)
    if (!label) return
    commit({ ...settings, custom: settings.custom.map((status) => status.id === id ? { ...status, label } : status) })
  }
  /** Tasks carry `completed` next to their status, so flipping Done rewrites the tasks in that status. */
  const setDone = async (id: CustomStatusId, done: boolean): Promise<void> => {
    commit({ ...settings, custom: settings.custom.map((status) => status.id === id ? { ...status, done } : status) })
    const todos = (await loadTodoList()).filter((todo) => todo.status === id)
    await Promise.all(todos.map((todo) => setTodoStatus(todo.id, id)))
  }
  const deleteStatus = async (id: CustomStatusId): Promise<void> => {
    const label = statusDef(id, settings).label
    const todos = (await loadTodoList()).filter((todo) => todo.status === id)
    const choice = await api.ui.confirm({
      title: uiText('todo.settings.statusDeleteTitle', { p0: label }),
      message: todos.length
        ? uiText('todo.settings.statusDeleteMoves', { count: todos.length, p0: uiText('todo.status.todo') })
        : uiText('todo.settings.statusDeleteUnused'),
      actions: [
        { label: uiText('auto.77dfd2135f4d'), value: 'cancel', variant: 'ghost' },
        { label: uiText('auto.f6fdbe48dc54'), value: 'delete', variant: 'danger' }
      ]
    })
    if (choice !== 'delete') return
    await Promise.all(todos.map((todo) => setTodoStatus(todo.id, 'open')))
    const current = getStatusSettings()
    commit({ ...current, custom: current.custom.filter((status) => status.id !== id), active: current.active.filter((candidate) => candidate !== id) })
  }

  const textOptions = [
    { value: 'auto', label: uiText('todo.settings.textAuto') },
    { value: 'white', label: uiText('todo.settings.textWhite'), color: '#ffffff' },
    { value: 'black', label: uiText('todo.settings.textBlack'), color: '#000000' }
  ]

  const row = (status: StatusDef, kind: 'locked' | 'shown' | 'off', index: number): ReactElement => {
    const id = status.id
    const slot = `${id}@${index}`
    const label = status.label
    const handleProps = kind === 'shown' ? reorder.getHandleProps(status) : null
    const custom = isCustomStatusId(id) ? id : null
    return (
      <div
        role="listitem"
        className={'todo-settings-item todo-status-setting-row' + (kind === 'locked' ? ' locked' : '') + (kind === 'off' ? ' is-off' : '') + (kind === 'shown' && reorder.overId === id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
        key={id}
        {...(kind === 'shown' ? reorder.getItemProps(status) : {})}
      >
        {handleProps ? (
          <button
            {...handleProps}
            className={(handleProps.className ?? '') + ' todo-settings-handle'}
            title={uiText('todo.settings.statusReorder')}
          >
            <GripVertical />
          </button>
        ) : (
          <span className="todo-settings-handle is-static" title={kind === 'locked' ? uiText('todo.settings.statusLocked') : undefined}>
            {kind === 'locked' && <Lock />}
          </span>
        )}
        <span className="todo-settings-glyph">
          <TodoStatusGlyph status={id === 'open' ? null : id} dotCls={status.cls} />
        </span>
        {custom ? (
          <span className="todo-settings-name todo-settings-name-field">
            <CommitTextField
              key={`name:${slot}:${label}`}
              initial={label}
              ariaLabel={uiText('todo.settings.statusName')}
              onCommit={(value) => renameStatus(custom, value)}
            />
          </span>
        ) : <span className="todo-settings-name">{label}</span>}
        <span className="todo-settings-preview">
          <StatusBadgeView status={id} style={settings.style} />
        </span>
        <IconButton
          key={`strike:${slot}`}
          className="todo-settings-strike"
          pressed={settings.strikethrough[id]}
          aria-pressed={settings.strikethrough[id]}
          ariaLabel={uiText('todo.settings.statusStrike', { p0: label })}
          title={uiText('todo.settings.statusStrike', { p0: label })}
          onClick={() => commit({ ...settings, strikethrough: { ...settings.strikethrough, [id]: !settings.strikethrough[id] } })}
        >
          <Strikethrough />
        </IconButton>
        <ColorField
          key={`color:${slot}`}
          value={settings.colors[id]}
          onChange={(color) => commit({ ...settings, colors: { ...settings.colors, [id]: color } })}
          ariaLabel={uiText('todo.settings.statusColor', { p0: label })}
          allowCustom={false}
        />
        <SelectField
          key={`text:${slot}`}
          className="todo-settings-text-select"
          value={settings.textColors[id]}
          options={textOptions}
          disabled={settings.style !== 'filled'}
          ariaLabel={uiText('todo.settings.statusText', { p0: label })}
          onChange={(value) => commit({ ...settings, textColors: { ...settings.textColors, [id]: value as StatusTextColor } })}
        />
        <Toggle
          key={`show:${slot}`}
          checked={kind !== 'off'}
          disabled={kind === 'locked'}
          label={uiText(custom ? 'todo.settings.statusShowCustom' : 'todo.settings.statusShow', { p0: label })}
          onChange={(next) => setShown(id as ShowableStatus, next)}
        />
        <span className="todo-settings-row-actions">
          {custom && (
            <>
              <IconButton
                key={`done:${slot}`}
                className="todo-settings-strike"
                pressed={status.done}
                aria-pressed={status.done}
                ariaLabel={uiText('todo.settings.statusDone', { p0: label })}
                title={uiText('todo.settings.statusDone', { p0: label })}
                onClick={() => void setDone(custom, !status.done)}
              >
                <CircleCheck />
              </IconButton>
              <IconButton
                key={`delete:${slot}`}
                ariaLabel={uiText('todo.settings.statusDelete', { p0: label })}
                title={uiText('todo.settings.statusDelete', { p0: label })}
                onClick={() => void deleteStatus(custom)}
              >
                <Trash />
              </IconButton>
            </>
          )}
        </span>
      </div>
    )
  }

  const hidden = [
    ...OPTIONAL_STATUSES.filter((id) => !settings.active.includes(id)),
    ...settings.custom.map((status) => status.id).filter((id) => !settings.active.includes(id))
  ].map((id) => statusDef(id, settings))
  const styleOptions = [
    { value: 'filled', label: uiText('todo.settings.styleFilled') },
    { value: 'text', label: uiText('todo.settings.styleText') }
  ]
  const full = settings.custom.length >= CUSTOM_STATUS_LIMIT

  return (
    <>
      <Section title={uiText('todo.settings.statusAppearance')}>
        <Row title={uiText('todo.settings.statusStyle')} description={uiText('todo.settings.statusStyleDesc')}>
          <div className="todo-settings-end" style={segmentedStyle(styleOptions.map((option) => option.label))}>
            <Segmented
              value={settings.style}
              ariaLabel={uiText('todo.settings.statusStyle')}
              options={styleOptions}
              onChange={(value) => commit({ ...settings, style: value as StatusStyle })}
            />
          </div>
        </Row>
      </Section>
      <Section title={uiText('todo.settings.statuses')}>
        <p className="todo-settings-desc">{uiText('todo.settings.statusesDescCustom')}</p>
        <div className="todo-settings-list todo-status-settings" role="list">
          <div className="todo-settings-item todo-settings-head" aria-hidden="true">
            <span />
            <span />
            <span className="todo-settings-name">{uiText('todo.settings.colStatus')}</span>
            <span className="todo-settings-preview">{uiText('todo.settings.colPreview')}</span>
            <span className="todo-settings-head-glyph" title={uiText('todo.settings.colStrike')}><Strikethrough /></span>
            <span>{uiText('todo.settings.colColor')}</span>
            <span>{uiText('todo.settings.colText')}</span>
            <span>{uiText('todo.settings.colShow')}</span>
            <span />
          </div>
          {row(statusDef('open', settings), 'locked', 0)}
          {row(statusDef('completed', settings), 'locked', 1)}
          {active.map((status, index) => row(status, 'shown', 2 + index))}
          {hidden.map((status, index) => row(status, 'off', 2 + active.length + index))}
        </div>
        {reorder.liveRegion}
        <div className="todo-status-add">
          <CommitTextField
            key={`add:${addKey}`}
            initial=""
            placeholder={uiText('todo.settings.statusNewPlaceholder')}
            ariaLabel={uiText('todo.settings.statusNew')}
            disabled={full}
            onType={(value) => { draft.current = value; if (!!customLabel(value) !== canAdd) setCanAdd(!canAdd) }}
            onCommit={(value) => { draft.current = value }}
          />
          <Button type="button" disabled={full || !canAdd} onClick={addStatus}>{uiText('todo.settings.statusAdd')}</Button>
        </div>
      </Section>
    </>
  )
}

function GeneralSettings(): ReactElement {
  const { Row, Section, SelectField } = api.ui.settings
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
      <ReminderDefaults />
    </>
  )
}

/**
 * Individual groups: To-Do-only lists under the shared ones. Each may sit under
 * a shared group, so that group's view includes it. A rename keeps the old name
 * as an alias, so tasks that carry it still resolve.
 */
function LocalGroupsSettings(): ReactElement {
  const { Button, ColorField, IconButton, Section, SelectField } = api.ui.settings
  const local = useLocalGroups()
  const groups = useGroups()
  const shared = groups.filter((group) => !local.some((candidate) => candidate.id === group.id))
  const draft = React.useRef('')
  const [addKey, setAddKey] = React.useState(0)
  const [draftName, setDraftName] = React.useState('')
  const taken = (name: string, except?: string): boolean => groups.some((group) => group.id !== except && [group.name, ...(group.aliases ?? [])].some((candidate) => groupKey(candidate) === groupKey(name)))
  const save = (next: LocalGroup[]): void => { void setLocalGroups(next) }
  const add = (): void => {
    const name = draft.current.trim().slice(0, LOCAL_GROUP_NAME_MAX)
    if (!name || taken(name) || local.length >= LOCAL_GROUP_LIMIT) return
    save([...local, { id: newLocalGroupId(), name, color: nextGroupColor(groups) }])
    draft.current = ''
    setDraftName('')
    setAddKey((key) => key + 1)
  }
  const rename = (group: LocalGroup, value: string): void => {
    if (!value.trim() || value.trim() === group.name || taken(value, group.id)) return
    save(local.map((candidate) => candidate.id === group.id ? renameLocalGroup(candidate, value) : candidate))
  }
  const remove = async (group: LocalGroup): Promise<void> => {
    const names = new Set([group.name, ...(group.aliases ?? [])].map(groupKey))
    const todos = (await loadTodoList()).filter((todo) => todo.group && names.has(groupKey(todo.group)))
    const choice = await api.ui.confirm({
      title: uiText('todo.settings.localGroupDeleteTitle', { p0: group.name }),
      message: todos.length ? uiText('todo.settings.localGroupDeleteMoves', { count: todos.length }) : uiText('todo.settings.localGroupDeleteUnused'),
      actions: [
        { label: uiText('auto.77dfd2135f4d'), value: 'cancel', variant: 'ghost' },
        { label: uiText('auto.f6fdbe48dc54'), value: 'delete', variant: 'danger' }
      ]
    })
    if (choice !== 'delete') return
    await Promise.all(todos.map((todo) => setTodoGroup(todo.id, undefined)))
    save(getLocalGroups().filter((candidate) => candidate.id !== group.id))
  }
  const parentOptions = [
    { value: '', label: uiText('todo.settings.localGroupNoParent') },
    ...shared.map((group) => ({ value: group.id, label: group.name, color: group.color }))
  ]
  return (
    <Section title={uiText('todo.settings.localGroups')}>
      <p className="todo-settings-desc">{uiText('todo.settings.localGroupsDesc')}</p>
      {local.length > 0 && (
        <div className="todo-settings-list todo-local-groups" role="list">
          <div className="todo-settings-item todo-settings-head" aria-hidden="true">
            <span>{uiText('todo.settings.colColor')}</span>
            <span>{uiText('todo.settings.localGroupName')}</span>
            <span>{uiText('todo.settings.localGroupParent')}</span>
            <span />
          </div>
          {local.map((group) => (
            <div role="listitem" className="todo-settings-item" key={group.id}>
              <ColorField
                value={group.color}
                onChange={(color) => save(local.map((candidate) => candidate.id === group.id ? { ...candidate, color } : candidate))}
                ariaLabel={uiText('todo.settings.localGroupColor', { p0: group.name })}
              />
              <CommitTextField
                key={`name:${group.id}:${group.name}`}
                initial={group.name}
                ariaLabel={uiText('todo.settings.localGroupName')}
                onCommit={(value) => rename(group, value)}
              />
              <SelectField
                value={group.parent ?? ''}
                options={parentOptions}
                ariaLabel={uiText('todo.settings.localGroupParentOf', { p0: group.name })}
                onChange={(value) => save(local.map((candidate) => {
                  if (candidate.id !== group.id) return candidate
                  const { parent: _, ...rest } = candidate
                  return value ? { ...rest, parent: value } : rest
                }))}
              />
              <IconButton
                ariaLabel={uiText('todo.settings.localGroupDelete', { p0: group.name })}
                title={uiText('todo.settings.localGroupDelete', { p0: group.name })}
                onClick={() => void remove(group)}
              >
                <Trash />
              </IconButton>
            </div>
          ))}
        </div>
      )}
      <div className="todo-status-add">
        <CommitTextField
          key={`add:${addKey}`}
          initial=""
          placeholder={uiText('todo.settings.localGroupNew')}
          ariaLabel={uiText('todo.settings.localGroupNew')}
          onType={(value) => { draft.current = value; const name = value.trim(); if (name !== draftName && (!name || !draftName)) setDraftName(name) }}
          onCommit={(value) => { draft.current = value; setDraftName(value.trim()) }}
        />
        <Button type="button" disabled={!draftName || local.length >= LOCAL_GROUP_LIMIT} onClick={add}>{uiText('todo.settings.localGroupAdd')}</Button>
      </div>
    </Section>
  )
}

/** `todo.settings` — rendered once per manifest `settingsSections` id, and once for the main page. */
export function Settings({ section }: { section?: string }): ReactElement {
  if (section === 'statuses') return <StatusesSettings />
  if (section === 'lists') {
    return (
      <>
        <SmartListsSettings />
        <api.ui.settings.Section>
          <api.ui.settings.GroupsEditor />
        </api.ui.settings.Section>
        <LocalGroupsSettings />
      </>
    )
  }
  return <GeneralSettings />
}
