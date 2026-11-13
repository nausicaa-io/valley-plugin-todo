import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { initLocalization } from '../src/localization'
import { ClockTimeField, InlineCalendar, parseClockTime } from '../src/DatePanel'

afterEach(cleanup)

function setup() {
  const mock = createMockValleyApi({ manifest: { id: 'todo' } })
  initLocalization(mock.api)
  initRuntime(mock.api)
  return mock
}

describe('date panel', () => {
  it('picks, changes month and clears a day inside the plugin', async () => {
    setup()
    const onChange = vi.fn()
    render(<InlineCalendar value="2026-11-12" onChange={onChange} />)
    expect(document.querySelector('.todo-calendar-day.is-selected')).toHaveTextContent('12')
    await act(async () => fireEvent.click(screen.getAllByRole('button', { name: /20/ }).find((b) => b.textContent === '20' && !b.classList.contains('is-outside'))!))
    expect(onChange).toHaveBeenLastCalledWith('2026-11-20')
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Next month' })))
    await act(async () => fireEvent.click([...document.querySelectorAll('.todo-calendar-day:not(.is-outside)')].find((b) => b.textContent === '1')!))
    expect(onChange).toHaveBeenLastCalledWith('2026-12-01')
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Clear' })))
    expect(onChange).toHaveBeenLastCalledWith('')
  })

  it('accepts only real hh:mm times', async () => {
    setup()
    expect(parseClockTime('9:30')).toBe('09:30')
    expect(parseClockTime('0930')).toBe('09:30')
    for (const bad of ['24:00', '12:60', '1', 'ab:cd', '12:345']) expect(parseClockTime(bad)).toBeNull()
    const onChange = vi.fn()
    render(<ClockTimeField value="" onChange={onChange} ariaLabel="Start time" />)
    const input = screen.getByRole('textbox', { name: 'Start time' })
    fireEvent.change(input, { target: { value: '2x5::61' } })
    expect(input).toHaveValue('25:61')
    await act(async () => fireEvent.blur(input))
    expect(onChange).not.toHaveBeenCalled()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    fireEvent.change(input, { target: { value: '7:05' } })
    await act(async () => fireEvent.keyDown(input, { key: 'Enter' }))
    expect(onChange).toHaveBeenLastCalledWith('07:05')
  })
})
