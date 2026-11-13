import { React, api } from '../runtime'
import { uiText } from '../localization'

const MAX_MINUTES = 10080

/** "1:30" → 90. Hours up to 168, minutes 00–59; anything else is not a time. */
export function parseReminderTime(value: string): number | null {
  const match = /^(\d{1,3}):([0-5]\d)$/.exec(value.trim())
  if (!match) return null
  const minutes = Number(match[1]) * 60 + Number(match[2])
  return minutes <= MAX_MINUTES ? minutes : null
}

/** 90 → "01:30", 10 → "00:10". */
export function formatReminderTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

/**
 * The default reminder: off, or one reminder a set time (hh:mm) before a timed
 * task. The field takes only digits and a colon and saves only a valid time.
 */
export function ReminderDefaults() {
  const read = (): number[] => {
    const raw = api.settings.get().reminderOffsets
    return Array.isArray(raw) ? raw.filter((value): value is number => Number.isInteger(value) && value >= 0 && value <= MAX_MINUTES).slice(0, 1) : [10]
  }
  const [value, setValue] = React.useState<number[]>(read)
  React.useEffect(() => api.settings.subscribe(() => setValue(read())), [])
  const { Row, Section, SelectField } = api.ui.settings
  const mode = value.length ? 'custom' : 'off'
  const [text, setText] = React.useState(() => formatReminderTime(value[0] ?? 10))
  const [invalid, setInvalid] = React.useState(false)
  React.useEffect(() => { if (value.length) { setText(formatReminderTime(value[0])); setInvalid(false) } }, [value[0]])
  const save = (next: number[]): void => { setValue(next); void api.settings.set('reminderOffsets', next) }
  const commit = (): void => {
    const minutes = parseReminderTime(text)
    if (minutes === null) { setInvalid(true); return }
    setInvalid(false)
    if (minutes !== value[0]) save([minutes])
  }
  return <Section title={uiText('reminders.title')}>
    <Row title={uiText('reminders.defaultTitle')} description={uiText('reminders.defaultDesc')}>
      <SelectField className="todo-reminder-mode" ariaLabel={uiText('reminders.defaultTitle')} value={mode}
        onChange={(next) => save(next === 'off' ? [] : [parseReminderTime(text) ?? 10])}
        options={[{ value: 'off', label: uiText('reminders.off') }, { value: 'custom', label: uiText('reminders.custom') }]} />
    </Row>
    {mode === 'custom' && (
      <Row title={uiText('reminders.timeBefore')} description={invalid ? <span className="todo-reminder-note is-error" role="alert">{uiText('reminders.timeInvalid')}</span> : uiText('reminders.timeBeforeDesc')}>
        <input
          className={`settings-control todo-reminder-time${invalid ? ' invalid' : ''}`}
          type="text"
          inputMode="numeric"
          value={text}
          placeholder="0:10"
          aria-label={uiText('reminders.timeBefore')}
          aria-invalid={invalid || undefined}
          maxLength={6}
          onChange={(event) => { setText(event.currentTarget.value.replace(/[^\d:]/g, '').replace(/:(?=.*:)/g, '')); setInvalid(false) }}
          onBlur={commit}
          onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); commit() } }}
        />
      </Row>
    )}
  </Section>
}
