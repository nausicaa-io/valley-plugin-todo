import { ReminderDefaults } from './ReminderOffsets'
import type { CSSProperties, ReactElement } from 'react'
import type { CustomStatusId, TodoStatus } from '../types'
import { paletteCssContrast, paletteCssValue, paletteRef } from '@valley/plugin-sdk/palette'
import { React, api } from '../runtime'
import {
  CalendarClock,
  CalendarToday,
  CalendarWeek,
  CircleCheck,
  Flag,
  GripVertical,
  Inbox,
  Lock,
  Plus,
  Strikethrough,
  TodoStatusGlyph,
  Trash,
  X
} from './icons'
import { uiText } from '../localization'
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
  type OptionalTodoStatus,
  type ShowableStatus,
  type StatusDef,
  type TodoStatusSettings
} from '../state/statusStore'
import {
  DATE_BREAKDOWN_SETTING_KEY,
  getDateBreakdown,
  getSmartListSettings,
  getView,
  setSmartListSettings,
  setView
} from '../state/viewStore'
import type { DateBreakdown } from '../model/sections'
import { smartListDef, smartListForeground, type SmartListId, type SmartListSettings, type SmartListTextColor } from '../model/views'
import { loadTodoList, onTodoListChanged, setTodoStatus } from '../data/reads'
import { TASK_ICON_FOLDER, useTaskIcons } from './taskIcons'
import { todoStatusLabelDefault } from '../localization'
import { USE_LOCAL_GROUPS_KEY, USE_SHARED_GROUPS_KEY, setLocalGroups, useAllGroups, useGroupKinds, useLocalGroups } from '../state/groupStore'
import { groupKey, nextGroupColor } from '../model/groups'
import { LOCAL_GROUP_LIMIT, LOCAL_GROUP_NAME_MAX, newLocalGroupId, renameLocalGroup, type LocalGroup } from '../model/localGroups'

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
function CommitTextField({ initial, onCommit, onType, onEnter, placeholder, ariaLabel, disabled, className = 'todo-settings-text', invalid }: {
  initial: string
  onCommit: (value: string) => void
  onType?: (value: string) => void
  /** Runs after the Enter commit, for a field that submits a row. */
  onEnter?: () => void
  placeholder?: string
  ariaLabel: string
  disabled?: boolean
  className?: string
  invalid?: boolean
}): ReactElement {
  const skip = React.useRef(false)
  return (
    <input
      className={`settings-control ${className}${invalid ? ' invalid' : ''}`}
      aria-invalid={invalid || undefined}
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
          if (onEnter) { onCommit(event.currentTarget.value); onEnter(); return }
          event.currentTarget.blur()
        } else if (event.key === 'Escape') {
          event.preventDefault()
          event.currentTarget.value = initial
          onType?.(initial)
          skip.current = true
          event.currentTarget.blur()
        }
      }}
    />
  )
}

/** The add row's icon: the chosen symbol, or an empty To do ring until one is picked. */
function NewStatusIcon({ name }: { name: string | undefined }): ReactElement {
  const icons = useTaskIcons()
  const svg = name ? icons[name] : undefined
  return svg
    ? <span className="todo-status-menu-svg todo-status-asset" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
    : <span className="todo-status-menu-dot todo-st-open" aria-hidden="true" />
}

/** A grid of the shared task icons; picking one closes the popover, picking the chosen one again goes back to the status's own glyph. */
function StatusIconPicker({ current, onPick }: { current: string | undefined; onPick: (name: string | undefined) => void }): ReactElement {
  const icons = useTaskIcons()
  const names = Object.keys(icons).sort((a, b) => a.localeCompare(b))
  return (
    <div className="todo-icon-picker">
      <div className="todo-icon-picker-grid" role="listbox" aria-label={uiText('todo.settings.statusIcon')}>
        {names.map((name) => (
          <button key={name} type="button" role="option" aria-selected={current === name} className={`todo-icon-picker-item${current === name ? ' is-active' : ''}`} title={name} aria-label={name} onClick={() => onPick(current === name ? undefined : name)}>
            <span className="todo-icon-picker-svg" dangerouslySetInnerHTML={{ __html: icons[name] }} />
          </button>
        ))}
      </div>
      <p className="todo-icon-picker-hint">{uiText('todo.settings.statusIconHint', { p0: TASK_ICON_FOLDER })}</p>
    </div>
  )
}

/**
 * One row per status. To do and Completed are fixed; every other status — the
 * built-in ones included — can be renamed, given an icon from the shared task
 * icon folder, recoloured, marked done, struck through, hidden, reordered and
 * deleted. Statuses are always drawn as coloured text.
 */
function StatusesSettings(): ReactElement {
  const { Button, ColorField, IconButton, Section, Toggle, useReorderDrag } = api.ui.settings
  const [settings, setLocal] = useSetting<TodoStatusSettings>(getStatusSettings)
  useTaskIcons()
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
  /** The add row mirrors a status row: icon, name, strikethrough, colour, done and shown, then +. */
  const [newStatus, setNewStatus] = React.useState<{ icon?: string; strike: boolean; color: string; done: boolean; show: boolean }>({ strike: false, color: paletteRef('teal'), done: false, show: true })
  const addStatus = (): void => {
    const label = customLabel(draft.current)
    if (!label || settings.custom.length >= CUSTOM_STATUS_LIMIT) return
    const id = newCustomStatusId()
    commit({
      ...settings,
      custom: [...settings.custom, { id, label, done: newStatus.done }],
      active: newStatus.show ? [...settings.active, id] : settings.active,
      strikethrough: { ...settings.strikethrough, [id]: newStatus.strike },
      colors: { ...settings.colors, [id]: newStatus.color },
      icons: newStatus.icon ? { ...settings.icons, [id]: newStatus.icon } : settings.icons
    })
    draft.current = ''
    setCanAdd(false)
    setNewStatus({ strike: false, color: paletteRef('teal'), done: false, show: true })
    setAddKey((key) => key + 1)
  }
  const rename = (id: TodoStatus, value: string): void => {
    const label = customLabel(value)
    if (isCustomStatusId(id)) {
      if (!label) return
      commit({ ...settings, custom: settings.custom.map((status) => status.id === id ? { ...status, label } : status) })
    } else {
      // An empty name puts the built-in status back to its own name.
      const labels = { ...settings.labels }
      if (label && label !== todoStatusLabelDefault(id)) labels[id] = label
      else delete labels[id]
      commit({ ...settings, labels })
    }
  }
  /** Tasks carry `completed` next to their status, so flipping Done rewrites the tasks in that status. */
  const setDone = async (id: TodoStatus, done: boolean): Promise<void> => {
    if (isCustomStatusId(id)) commit({ ...settings, custom: settings.custom.map((status) => status.id === id ? { ...status, done } : status) })
    else commit({ ...settings, done: { ...settings.done, [id]: done } })
    const todos = (await loadTodoList()).filter((todo) => todo.status === id)
    await Promise.all(todos.map((todo) => setTodoStatus(todo.id, id)))
  }
  const setIcon = (id: TodoStatus, name: string | undefined): void => {
    const current = getStatusSettings()
    const icons = { ...current.icons }
    if (name) icons[id] = name
    else delete icons[id]
    commit({ ...current, icons })
  }
  const pickIcon = (anchor: HTMLElement, id: TodoStatus): void => {
    void api.ui.openPopover(({ close }) => <StatusIconPicker current={settings.icons[id]} onPick={(name) => { setIcon(id, name); close() }} />, { anchor, align: 'start', gap: 4 }, { className: 'todo-cell-popover', ariaLabel: uiText('todo.settings.statusIcon'), width: 300 })
  }
  const deleteStatus = async (id: TodoStatus): Promise<void> => {
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
    if (isCustomStatusId(id)) commit({ ...current, custom: current.custom.filter((status) => status.id !== id), active: current.active.filter((candidate) => candidate !== id) })
    else commit({ ...current, removed: [...current.removed, id as OptionalTodoStatus], active: current.active.filter((candidate) => candidate !== id) })
  }

  const row = (status: StatusDef, kind: 'locked' | 'shown' | 'off', index: number): ReactElement => {
    const id = status.id
    const slot = `${id}@${index}`
    const label = status.label
    const handleProps = kind === 'shown' ? reorder.getHandleProps(status) : null
    const locked = kind === 'locked'
    return (
      <div
        role="listitem"
        className={'todo-settings-item todo-status-setting-row' + (locked ? ' locked' : '') + (kind === 'off' ? ' is-off' : '') + (kind === 'shown' && reorder.overId === id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
        key={id}
        {...(kind === 'shown' ? reorder.getItemProps(status) : {})}
      >
        {handleProps ? (
          <button {...handleProps} className={(handleProps.className ?? '') + ' todo-settings-handle'} title={uiText('todo.settings.statusReorder')}>
            <GripVertical />
          </button>
        ) : (
          <span className="todo-settings-handle is-static" title={locked ? uiText('todo.settings.statusLocked') : undefined}>
            {locked && <Lock />}
          </span>
        )}
        {locked ? (
          // To do and Completed keep their own glyphs: the icon is not a control.
          <span className={`todo-settings-glyph ${status.cls}`}>
            <TodoStatusGlyph status={id === 'open' ? null : id} dotCls={status.cls} />
          </span>
        ) : (
          <button type="button" className={`todo-settings-glyph todo-settings-icon-btn ${status.cls}`} title={uiText('todo.settings.statusIconOf', { p0: label })} aria-label={uiText('todo.settings.statusIconOf', { p0: label })} onClick={(event) => pickIcon(event.currentTarget, id)}>
            <TodoStatusGlyph status={id} dotCls={status.cls} />
          </button>
        )}
        <span className="todo-settings-name todo-settings-name-field">
          <CommitTextField key={`name:${slot}:${label}`} initial={label} ariaLabel={uiText('todo.settings.statusName')} onCommit={(value) => rename(id, value)} />
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
        {/* To do never counts as done and Completed always does: shown, locked. Both always show, so no switch. */}
        <IconButton
          key={`done:${slot}`}
          className="todo-settings-strike"
          pressed={status.done}
          aria-pressed={status.done}
          disabled={locked}
          ariaLabel={uiText('todo.settings.statusDone', { p0: label })}
          title={uiText('todo.settings.statusDone', { p0: label })}
          onClick={() => { if (!locked) void setDone(id, !status.done) }}
        >
          <CircleCheck />
        </IconButton>
        {locked ? <span /> : (
          <Toggle
            key={`show:${slot}`}
            checked={kind !== 'off'}
            label={uiText('todo.settings.statusShow', { p0: label })}
            onChange={(next) => setShown(id as ShowableStatus, next)}
          />
        )}
        {locked ? <span /> : (
          <IconButton key={`delete:${slot}`} ariaLabel={uiText('todo.settings.statusDelete', { p0: label })} title={uiText('todo.settings.statusDelete', { p0: label })} onClick={() => void deleteStatus(id)}>
            <Trash />
          </IconButton>
        )}
      </div>
    )
  }

  const hidden = [
    ...OPTIONAL_STATUSES.filter((id) => !settings.active.includes(id) && !settings.removed.includes(id)),
    ...settings.custom.map((status) => status.id).filter((id) => !settings.active.includes(id))
  ].map((id) => statusDef(id, settings))
  const full = settings.custom.length >= CUSTOM_STATUS_LIMIT

  return (
    <Section title={uiText('todo.settings.statuses')}>
      <p className="todo-settings-desc">{uiText('todo.settings.statusesDescAll')}</p>
      <div className="todo-settings-list todo-status-settings" role="list">
        <div className="todo-settings-item todo-settings-head" aria-hidden="true">
          <span />
          <span>{uiText('todo.settings.colIcon')}</span>
          <span className="todo-settings-name">{uiText('todo.settings.colStatus')}</span>
          <span className="todo-settings-head-glyph" title={uiText('todo.settings.colStrike')}><Strikethrough /></span>
          <span>{uiText('todo.settings.colColor')}</span>
          <span className="todo-settings-head-glyph" title={uiText('todo.settings.colDone')}><CircleCheck /></span>
          <span>{uiText('todo.settings.colShow')}</span>
          <span />
        </div>
        {row(statusDef('open', settings), 'locked', 0)}
        {row(statusDef('completed', settings), 'locked', 1)}
        {active.map((status, index) => row(status, 'shown', 2 + index))}
        {hidden.map((status, index) => row(status, 'off', 2 + active.length + index))}
        <div role="listitem" className="todo-settings-item todo-status-setting-row todo-status-add-row">
          <span className="todo-settings-handle is-static" />
          <button
            type="button"
            className="todo-settings-glyph todo-settings-icon-btn todo-status-add-icon"
            style={{ color: paletteCssValue(newStatus.color) }}
            disabled={full}
            title={uiText('todo.settings.statusIcon')}
            aria-label={uiText('todo.settings.statusIcon')}
            onClick={(event) => void api.ui.openPopover(({ close }) => <StatusIconPicker current={newStatus.icon} onPick={(name) => { setNewStatus((value) => ({ ...value, icon: name })); close() }} />, { anchor: event.currentTarget, align: 'start', gap: 4 }, { className: 'todo-cell-popover', ariaLabel: uiText('todo.settings.statusIcon'), width: 300 })}
          >
            <NewStatusIcon name={newStatus.icon} />
          </button>
          <span className="todo-settings-name todo-settings-name-field">
            <CommitTextField
              key={`add:${addKey}`}
              initial=""
              placeholder={uiText('todo.settings.statusNewPlaceholder')}
              ariaLabel={uiText('todo.settings.statusNew')}
              disabled={full}
              onType={(value) => { draft.current = value; if (!!customLabel(value) !== canAdd) setCanAdd(!canAdd) }}
              onCommit={(value) => { draft.current = value }}
              onEnter={addStatus}
            />
          </span>
          <IconButton
            className="todo-settings-strike"
            pressed={newStatus.strike}
            aria-pressed={newStatus.strike}
            disabled={full}
            ariaLabel={uiText('todo.settings.colStrike')}
            title={uiText('todo.settings.colStrike')}
            onClick={() => setNewStatus((value) => ({ ...value, strike: !value.strike }))}
          >
            <Strikethrough />
          </IconButton>
          <ColorField
            key={`add-color:${addKey}`}
            value={newStatus.color}
            onChange={(color) => setNewStatus((value) => ({ ...value, color }))}
            ariaLabel={uiText('todo.settings.colColor')}
            allowCustom={false}
          />
          <IconButton
            className="todo-settings-strike"
            pressed={newStatus.done}
            aria-pressed={newStatus.done}
            disabled={full}
            ariaLabel={uiText('todo.settings.colDone')}
            title={uiText('todo.settings.colDone')}
            onClick={() => setNewStatus((value) => ({ ...value, done: !value.done }))}
          >
            <CircleCheck />
          </IconButton>
          <Toggle
            key={`add-show:${addKey}`}
            checked={newStatus.show}
            disabled={full}
            label={uiText('todo.settings.colShow')}
            onChange={(show) => setNewStatus((value) => ({ ...value, show }))}
          />
          <IconButton ariaLabel={uiText('todo.settings.statusAdd')} title={uiText('todo.settings.statusAdd')} disabled={full || !canAdd} onClick={addStatus}>
            <Plus />
          </IconButton>
        </div>
      </div>
      {reorder.liveRegion}
      {settings.removed.length > 0 && (
        <button type="button" className="todo-detail-add todo-status-restore" onClick={() => commit({ ...settings, removed: [], active: [...settings.active, ...settings.removed] })}>
          {uiText('todo.settings.statusRestore', { count: settings.removed.length })}
        </button>
      )}
    </Section>
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
 * Individual groups: To-Do-only lists beside the shared ones, edited exactly
 * like Settings → Appearance → Groups (grip, name, colour, usage, remove, and an
 * add row on the same columns). A rename keeps the old name as an alias, so
 * tasks that carry it still resolve. A group is removed only once no task uses
 * it, like a shared group.
 */
function LocalGroupsSettings(): ReactElement {
  const { Button, ColorField, IconButton, Section, useReorderDrag } = api.ui.settings
  const local = useLocalGroups()
  // Names must stay unique across both kinds, including a switched-off one.
  const groups = useAllGroups()
  const todos = useTodoGroupNames()
  const draft = React.useRef('')
  const [addKey, setAddKey] = React.useState(0)
  const [draftColor, setDraftColor] = React.useState(() => nextGroupColor(groups))
  const [duplicate, setDuplicate] = React.useState(false)
  const taken = (name: string, except?: string): boolean => groups.some((group) => group.id !== except && [group.name, ...(group.aliases ?? [])].some((candidate) => groupKey(candidate) === groupKey(name)))
  const save = (next: LocalGroup[]): void => { void setLocalGroups(next) }
  const usage = (group: LocalGroup): number => {
    const names = new Set([group.name, ...(group.aliases ?? [])].map(groupKey))
    return todos.filter((name) => names.has(groupKey(name))).length
  }
  const reorder = useReorderDrag({
    items: local,
    indicatorOnly: true,
    getId: (group) => group.id,
    getLabel: (group) => group.name,
    onReorder: (next) => save(next)
  })
  const add = (): void => {
    const name = draft.current.trim().slice(0, LOCAL_GROUP_NAME_MAX)
    if (!name || local.length >= LOCAL_GROUP_LIMIT) return
    if (taken(name)) { setDuplicate(true); return }
    const created: LocalGroup = { id: newLocalGroupId(), name, color: draftColor }
    save([...local, created])
    draft.current = ''
    setDuplicate(false)
    setDraftColor(nextGroupColor([...groups, created]))
    setAddKey((key) => key + 1)
  }
  const rename = (group: LocalGroup, value: string): void => {
    if (!value.trim() || value.trim() === group.name || taken(value, group.id)) return
    save(local.map((candidate) => candidate.id === group.id ? renameLocalGroup(candidate, value) : candidate))
  }
  return (
    <Section>
      <div className="settings-path-row settings-groups-row">
      <span className="settings-toggle-text">
        <span className="settings-toggle-title">{uiText('todo.settings.localGroups')}</span>
        <span className="settings-toggle-desc">{uiText('todo.settings.localGroupsDesc')}</span>
      </span>
      <div className="settings-colorrules settings-groups todo-local-groups" role="list" aria-label={uiText('todo.settings.localGroups')}>
        {local.map((group, index) => {
          // Host-drawn controls are matched to their slot, so a moved row
          // remounts them; otherwise they keep the values of the row that was there.
          const slot = `${group.id}@${index}`
          const handleProps = reorder.getHandleProps(group)
          const count = usage(group)
          return (
            <div
              role="listitem"
              className={'settings-colorrule-row' + (reorder.overId === group.id ? ' drop-' + (reorder.dropPosition ?? 'before') : '')}
              key={group.id}
              {...reorder.getItemProps(group)}
            >
              <button {...handleProps} className={(handleProps.className ?? '') + ' settings-colorrule-grip'}>
                <GripVertical />
              </button>
              <CommitTextField
                key={`name:${group.id}:${group.name}`}
                className="settings-colorrule-key"
                initial={group.name}
                ariaLabel={uiText('todo.settings.localGroupName')}
                onCommit={(value) => rename(group, value)}
              />
              <ColorField
                key={`color:${slot}`}
                value={group.color}
                onChange={(color) => save(local.map((candidate) => candidate.id === group.id ? { ...candidate, color } : candidate))}
                ariaLabel={uiText('todo.settings.localGroupColor', { p0: group.name })}
              />
              <span
                className="settings-group-usage"
                aria-label={uiText('todo.settings.localGroupUsage', { count })}
                title={uiText('todo.settings.localGroupUsage', { count })}
              >{count}</span>
              {/* aria-disabled, not disabled, like the shared list: the hint
                  explaining why removal is refused stays reachable on hover. */}
              <IconButton
                key={`remove:${slot}`}
                className="settings-colormap-remove"
                aria-disabled={count > 0 || undefined}
                ariaLabel={uiText('todo.settings.localGroupDelete', { p0: group.name })}
                title={count > 0 ? uiText('todo.settings.localGroupRemoveBlocked', { count }) : uiText('todo.settings.localGroupRemove')}
                onClick={() => { if (count === 0) save(local.filter((candidate) => candidate.id !== group.id)) }}
              >
                <X />
              </IconButton>
            </div>
          )
        })}
        {reorder.liveRegion}
        <div className="settings-colorrule-row settings-colorrule-add">
          <span className="settings-colorrule-grip settings-colorrule-grip-placeholder" aria-hidden="true" />
          <CommitTextField
            key={`add:${addKey}`}
            className="settings-colorrule-key"
            initial=""
            invalid={duplicate}
            placeholder={uiText('todo.settings.localGroupNew')}
            ariaLabel={uiText('todo.settings.localGroupNew')}
            onType={(value) => { draft.current = value; setDuplicate(false) }}
            onCommit={(value) => { draft.current = value }}
            onEnter={add}
          />
          <ColorField
            key={`add-color:${addKey}`}
            value={draftColor}
            onChange={setDraftColor}
            ariaLabel={uiText('todo.settings.localGroupNewColor')}
          />
          <span className="settings-colorrule-add-action">
            <span className="settings-button settings-button--medium settings-colorrule-add-sizer" aria-hidden="true">{uiText('todo.settings.localGroupAdd')}</span>
            <Button type="button" className="settings-colormap-add-btn" disabled={local.length >= LOCAL_GROUP_LIMIT} onClick={add}>{uiText('todo.settings.localGroupAdd')}</Button>
          </span>
        </div>
        {duplicate && <span className="settings-empty-text">{uiText('todo.settings.localGroupDuplicate')}</span>}
      </div>
      </div>
    </Section>
  )
}

/**
 * Shared groups and To-Do-only groups, each behind its own switch. A kind
 * that is off is neither offered nor listed in To-Do; tasks keep their group.
 */
function GroupsSettings(): ReactElement {
  const { GroupsEditor, Row, Section, Toggle } = api.ui.settings
  const kinds = useGroupKinds()
  return (
    <>
      <Section>
        <Row title={uiText('todo.settings.useSharedGroups')} description={uiText('todo.settings.useSharedGroupsDesc')}>
          <Toggle checked={kinds.shared} label={uiText('todo.settings.useSharedGroups')} onChange={(on) => { void api.settings.set(USE_SHARED_GROUPS_KEY, on) }} />
        </Row>
        <Row title={uiText('todo.settings.useLocalGroups')} description={uiText('todo.settings.useLocalGroupsDesc')}>
          <Toggle checked={kinds.local} label={uiText('todo.settings.useLocalGroups')} onChange={(on) => { void api.settings.set(USE_LOCAL_GROUPS_KEY, on) }} />
        </Row>
      </Section>
      {kinds.shared && (
        <Section>
          <GroupsEditor />
        </Section>
      )}
      {kinds.local && <LocalGroupsSettings />}
    </>
  )
}

/** The group name each task carries, kept current, for the usage counts. */
function useTodoGroupNames(): string[] {
  const [names, setNames] = React.useState<string[]>([])
  React.useEffect(() => {
    let active = true
    const load = (): void => { void loadTodoList().then((todos) => { if (active) setNames(todos.flatMap((todo) => todo.group ? [todo.group] : [])) }).catch(() => {}) }
    load()
    const off = onTodoListChanged(load)
    return () => { active = false; off() }
  }, [])
  return names
}

/** `todo.settings` — rendered once per manifest `settingsSections` id, and once for the main page. */
export function Settings({ section }: { section?: string }): ReactElement {
  if (section === 'lists') return <><SmartListsSettings /><StatusesSettings /></>
  if (section === 'groups') return <GroupsSettings />
  return <GeneralSettings />
}
