import { React, api } from '../runtime'
import type { ReactElement } from 'react'
import { ChevronLeft, ChevronRight } from './icons'
import { uiText } from '../localization'
import { isoDay } from '../model/sort'

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const monthStart = (iso: string): Date => {
  const [y, m] = (iso || isoDay(new Date())).split('-').map(Number)
  return new Date(y, m - 1, 1)
}

/**
 * A month grid drawn inside the plugin. The SDK DateField opens its calendar
 * as a second host popover, which dismisses the popover it sits in, so editors
 * that live in a popover pick the day here instead.
 */
export function InlineCalendar({ value, onChange }: { value: string; onChange: (value: string) => void }): ReactElement {
  const [shown, setShown] = React.useState(() => monthStart(value))
  const language = api.ui.language()
  const weekStart = Math.max(0, WEEKDAYS.indexOf(String(api.getState().weekStart ?? 'monday').toLowerCase()))
  const today = isoDay(new Date())
  const year = shown.getFullYear()
  const month = shown.getMonth()
  const lead = (new Date(year, month, 1).getDay() - weekStart + 7) % 7
  const days = Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - lead + i))
  const weekdayNames = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(language, { weekday: 'narrow' }).format(new Date(2024, 0, 7 + ((weekStart + i) % 7))))
  const title = new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' }).format(shown)
  const step = (delta: number): void => setShown(new Date(year, month + delta, 1))
  return (
    <div className="todo-calendar" role="group" aria-label={uiText('todo.field.dueDate')}>
      <div className="todo-calendar-head">
        <span className="todo-calendar-title">{title}</span>
        <button type="button" className="todo-calendar-nav" aria-label={uiText('todo.calendar.prev')} onClick={() => step(-1)}><ChevronLeft /></button>
        <button type="button" className="todo-calendar-nav" aria-label={uiText('todo.calendar.next')} onClick={() => step(1)}><ChevronRight /></button>
      </div>
      <div className="todo-calendar-grid">
        {weekdayNames.map((name, i) => <span key={`w${i}`} className="todo-calendar-weekday">{name}</span>)}
        {days.map((day) => {
          const iso = isoDay(day)
          const outside = day.getMonth() !== month
          return (
            <button
              key={iso}
              type="button"
              className={'todo-calendar-day' + (outside ? ' is-outside' : '') + (iso === today ? ' is-today' : '') + (iso === value ? ' is-selected' : '')}
              aria-pressed={iso === value}
              aria-label={new Intl.DateTimeFormat(language, { dateStyle: 'full' }).format(day)}
              onClick={() => onChange(iso)}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
      <div className="todo-calendar-foot">
        <button type="button" className="todo-calendar-link" disabled={!value} onClick={() => onChange('')}>{uiText('todo.calendar.clear')}</button>
        <button type="button" className="todo-calendar-link" onClick={() => { setShown(monthStart(today)); onChange(today) }}>{uiText('todo.due.today')}</button>
      </div>
    </div>
  )
}

/** `HH:mm` from typed text, or null. Accepts 9:30 and 0930. */
export function parseClockTime(raw: string): string | null {
  const text = raw.trim()
  const match = /^(\d{1,2}):?(\d{2})$/.exec(text)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) return null
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/**
 * A time of day typed as hh:mm in the plugin's document (the SDK TimeField's
 * panel is a nested host popover too). Only digits and one colon are taken;
 * the value is saved on Enter or blur when it is a real time, '' clears it.
 */
export function ClockTimeField({ value, onChange, ariaLabel, placeholder, disabled }: {
  value: string
  onChange: (value: string) => void
  ariaLabel: string
  placeholder?: string
  disabled?: boolean
}): ReactElement {
  const [text, setText] = React.useState(value)
  const [invalid, setInvalid] = React.useState(false)
  React.useEffect(() => { setText(value); setInvalid(false) }, [value])
  const commit = (): void => {
    if (!text.trim()) { setInvalid(false); if (value) onChange(''); return }
    const next = parseClockTime(text)
    if (!next) { setInvalid(true); return }
    setInvalid(false)
    setText(next)
    if (next !== value) onChange(next)
  }
  return (
    <input
      className={'settings-control todo-clock-input' + (invalid ? ' is-invalid' : '')}
      type="text"
      inputMode="numeric"
      maxLength={5}
      value={text}
      placeholder={placeholder ?? 'hh:mm'}
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      title={invalid ? uiText('todo.time.invalid') : undefined}
      disabled={disabled}
      autoComplete="off"
      spellCheck={false}
      onChange={(event) => {
        const raw = event.currentTarget.value.replace(/[^\d:]/g, '')
        const firstColon = raw.indexOf(':')
        setText(firstColon < 0 ? raw : raw.slice(0, firstColon + 1) + raw.slice(firstColon + 1).replace(/:/g, ''))
        setInvalid(false)
      }}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') { event.preventDefault(); commit() }
      }}
    />
  )
}
