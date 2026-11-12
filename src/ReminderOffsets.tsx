import { React, api } from './runtime'
import { uiText } from './localization'
import { X } from './icons'

export function ReminderOffsets({ value, onChange, timed = true, time = '', onTimeChange, defaults = false }: {
  value?: number[]; onChange(value: number[] | undefined): void; timed?: boolean; time?: string; onTimeChange?(value: string): void; defaults?: boolean
}) {
  const { NumberField, SelectField, Button, IconButton, TimeField } = api.ui.settings
  const [units, setUnits] = React.useState<Record<number, boolean>>({})
  const [error, setError] = React.useState(false)
  const mode = value === undefined ? 'default' : value.length ? 'custom' : 'off'
  const update = (next: number[]): void => {
    const invalid = next.some(value => !Number.isInteger(value) || value < 0 || value > 10080) || new Set(next).size !== next.length
    setError(invalid)
    if (!invalid) onChange(next)
  }
  return <div className="todo-reminder-offsets">
    <SelectField className="todo-reminder-mode" ariaLabel={uiText('reminders.title')} value={mode} onChange={mode => { setError(false); setUnits({}); onChange(mode === 'off' ? [] : mode === 'default' ? undefined : [10]) }} options={[
      ...(!defaults ? [{ value: 'default', label: uiText('reminders.default') }] : []),
      { value: 'off', label: uiText('reminders.off') }, { value: 'custom', label: uiText('reminders.custom') }
    ]} />
    {value?.map((minutes, index) => {
      const hours = units[index] ?? (minutes > 0 && minutes % 60 === 0)
      return <div key={index} className="todo-reminder-line">
        <NumberField className="todo-reminder-number" frameClassName="todo-reminder-number-frame" min={0} max={hours ? 168 : 10080} value={hours ? minutes / 60 : minutes} ariaLabel={uiText(hours ? 'reminders.hours' : 'reminders.minutes')}
          onChange={number => { if (number !== null) update(value.map((old, i) => i === index ? number * (hours ? 60 : 1) : old)) }} />
        <SelectField className="todo-reminder-unit" value={hours ? 'hours' : 'minutes'} ariaLabel={uiText('reminders.title')} options={[{ value: 'minutes', label: uiText('reminders.minutes') }, { value: 'hours', label: uiText('reminders.hours') }]}
          onChange={unit => { setUnits(previous => ({ ...previous, [index]: unit === 'hours' })); update(value.map((old, i) => i === index ? (hours ? minutes / 60 : minutes) * (unit === 'hours' ? 60 : 1) : old)) }} />
        <IconButton onClick={() => { setUnits({}); update(value.filter((_, i) => i !== index)) }} ariaLabel={uiText('reminders.remove')} title={uiText('reminders.remove')}><X /></IconButton>
      </div>
    })}
    {mode === 'custom' && (value?.length ?? 0) < 16 && <Button className="todo-reminder-add" onClick={() => { let offset = 10; while (value?.includes(offset)) offset += 5; update([...(value ?? []), offset]) }}>{uiText('reminders.add')}</Button>}
    {!timed && mode !== 'off' && onTimeChange && <TimeField value={time} onChange={onTimeChange} ariaLabel={uiText('reminders.time')} />}
    {!timed && !time && mode !== 'off' && <span className="todo-reminder-note">{uiText('reminders.timeRequired')}</span>}
    {error && <span className="todo-reminder-note is-error" role="alert">{uiText('reminders.invalid')}</span>}
  </div>
}

export function ReminderDefaults() {
  const [value, setValue] = React.useState<number[]>(() => api.settings.get().reminderOffsets as number[] ?? [10])
  React.useEffect(() => api.settings.subscribe(() => setValue(api.settings.get().reminderOffsets as number[] ?? [10])), [])
  const { Row, Section } = api.ui.settings
  return <Section title={uiText('reminders.title')}>
    <Row title={uiText('reminders.defaultTitle')} description={uiText('reminders.defaultDesc')}>
      <ReminderOffsets value={value} defaults onChange={next => { void api.settings.set('reminderOffsets', next ?? [10]) }} />
    </Row>
  </Section>
}
