import type { ReactElement } from 'react'
import type { TodoStatus } from '../../types'
import { paletteCssValue, paletteRef } from '@valley/plugin-sdk/palette'
import { React, api } from '../../runtime'
import {
  CircleCheck,
  GripVertical,
  Lock,
  Plus,
  Strikethrough,
  TodoStatusGlyph,
  Trash
} from '../icons'
import { uiText } from '../../localization'
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
} from '../../state/statusStore'
import { loadTodoList } from '../../data/listCache'
import { setTodoStatus } from '../../data/undo'
import { TASK_ICON_FOLDER, useTaskIcons } from '../taskIcons'
import { todoStatusLabelDefault } from '../../localization'

import { CommitTextField, useSetting } from './shared'

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
export function StatusesSettings(): ReactElement {
  const { ColorField, IconButton, Section, Toggle, useReorderDrag } = api.ui.settings
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
