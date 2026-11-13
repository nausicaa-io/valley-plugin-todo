import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { initLocalization } from '../src/localization'
import { Settings } from '../src/Settings'

afterEach(cleanup)

function setup(settings: Record<string, unknown> = {}) {
  const mock = createMockValleyApi({ manifest: { id: 'todo' }, settings })
  initLocalization(mock.api)
  initRuntime(mock.api)
  return mock
}

describe('todo settings', () => {
  it('keeps the main page to display and reminders, with lists and statuses on their own pages', () => {
    setup()
    const { unmount } = render(<Settings />)
    expect(screen.getByRole('combobox', { name: 'Date breakdown' })).toHaveValue('monthly')
    expect(screen.getByText('Default reminder')).toBeInTheDocument()
    expect(screen.queryByText('Statuses')).not.toBeInTheDocument()
    expect(screen.queryByTestId('shared-groups-editor')).not.toBeInTheDocument()
    unmount()

    render(<Settings section="lists" />)
    expect(screen.getByText('Smart lists')).toBeInTheDocument()
    expect(screen.getByTestId('shared-groups-editor')).toBeInTheDocument()
  })

  it('lists every status with a switch, keeping switched-off ones editable in place', async () => {
    const mock = setup({ statuses: { active: [] } })
    render(<><style>{'.hidden { visibility: hidden; }'}</style><Settings section="statuses" /></>)

    const rows = [...document.querySelectorAll('.todo-status-setting-row:not(.todo-status-add-row)')]
    expect(rows).toHaveLength(8)
    expect(rows.slice(0, 2).every((row) => row.classList.contains('locked'))).toBe(true)
    expect(screen.queryByRole('switch', { name: 'Show To do' })).toBeNull()
    expect(screen.queryByRole('switch', { name: 'Show Completed' })).toBeNull()
    for (const name of ['In Progress', 'Waiting', 'On Hold', 'Delegated', 'Deferred', 'Canceled']) {
      expect(screen.getByRole('switch', { name: `Show ${name}` })).not.toBeChecked()
      expect(screen.getByLabelText(`Color of ${name}`)).toBeVisible()
      expect(screen.getByRole('button', { name: `Icon of ${name}` })).toBeVisible()
    }

    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'Show Waiting' })))
    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'Show Canceled' })))
    expect((mock.api.settings.get().statuses as { active: string[] }).active).toEqual(['waiting', 'canceled'])

    await act(async () => fireEvent.keyDown(screen.getAllByTitle('Reorder status')[0], { key: 'End' }))
    expect((mock.api.settings.get().statuses as { active: string[] }).active).toEqual(['canceled', 'waiting'])

    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'Show Waiting' })))
    expect((mock.api.settings.get().statuses as { active: string[] }).active).toEqual(['canceled'])
  })

  it('renames, deletes and restores built-in statuses, with no style or preview controls', async () => {
    const mock = setup({ statuses: { active: ['waiting'] } })
    render(<Settings section="statuses" />)

    expect(screen.queryByRole('button', { name: 'Text' })).toBeNull()
    expect(document.querySelector('.todo-status-pill')).toBeNull()
    expect(screen.queryByRole('combobox', { name: /Text color of/ })).toBeNull()

    const waitingName = screen.getAllByRole('textbox', { name: 'Status name' }).find((input) => (input as HTMLInputElement).value === 'Waiting')!
    await act(async () => {
      fireEvent.change(waitingName, { target: { value: 'Blocked' } })
      fireEvent.blur(waitingName)
    })
    expect(mock.api.settings.get()).toMatchObject({ statuses: { labels: { waiting: 'Blocked' } } })

    vi.mocked(mock.api.ui.confirm).mockResolvedValueOnce('delete')
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Delete Deferred' })))
    expect((mock.api.settings.get().statuses as { removed: string[] }).removed).toEqual(['deferred'])
    expect(screen.queryByRole('switch', { name: 'Show Deferred' })).toBeNull()

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Restore 1 deleted built-in statuses' })))
    expect((mock.api.settings.get().statuses as { removed: string[] }).removed).toEqual([])
    expect(screen.getByRole('switch', { name: 'Show Deferred' })).toBeInTheDocument()
  })

  it('renames To do and Completed, whose done state is shown but locked, with no show or delete controls', async () => {
    const mock = setup()
    render(<Settings section="statuses" />)
    const todoName = screen.getAllByRole('textbox', { name: 'Status name' }).find((input) => (input as HTMLInputElement).value === 'To do')!
    await act(async () => {
      fireEvent.change(todoName, { target: { value: 'Inbox' } })
      fireEvent.blur(todoName)
    })
    expect(mock.api.settings.get()).toMatchObject({ statuses: { labels: { open: 'Inbox' } } })
    expect(screen.queryByRole('button', { name: 'Icon of Completed' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Icon of To do' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Completed counts as done' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Completed counts as done' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Inbox counts as done' })).toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Delete Completed' })).toBeNull()
  })

  it('adds a status from the add row with its strikethrough, done and shown choices', async () => {
    const mock = setup({ statuses: { active: [] } })
    render(<Settings section="statuses" />)
    const name = screen.getByRole('textbox', { name: 'New status name' })
    fireEvent.change(name, { target: { value: 'Review' } })
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Strikethrough' })))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Counts as done' })))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Add status' })))
    const saved = mock.api.settings.get().statuses as { custom: Array<{ id: string; label: string; done: boolean }>; active: string[]; strikethrough: Record<string, boolean> }
    expect(saved.custom).toEqual([expect.objectContaining({ label: 'Review', done: true })])
    expect(saved.active).toEqual([saved.custom[0].id])
    expect(saved.strikethrough[saved.custom[0].id]).toBe(true)
  })

  it('reorders, recolours and switches smart lists, always keeping one visible', async () => {
    const mock = setup({ panelChip: 'today' })
    render(<Settings section="lists" />)

    const names = (): string[] => [...document.querySelectorAll('.todo-smart-list-setting-row .todo-settings-name')].map((cell) => cell.textContent ?? '')
    expect(names()).toEqual(['Scheduled', 'Today', 'This Week', 'Flagged', 'All', 'Completed'])

    await act(async () => fireEvent.keyDown(screen.getAllByTitle('Reorder smart list')[0], { key: 'End' }))
    expect((mock.api.settings.get().smartLists as { order: string[] }).order).toEqual([
      'today', 'week', 'flagged', 'all', 'completed', 'scheduled'
    ])

    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'Show Today' })))
    expect(mock.api.settings.get()).toMatchObject({ panelChip: 'week', smartLists: { hidden: ['today'] } })
    expect(document.querySelectorAll('.todo-smart-list-setting-row')).toHaveLength(6)
    await act(async () => fireEvent.click(screen.getByRole('switch', { name: 'Show Today' })))
    expect((mock.api.settings.get().smartLists as { hidden: string[] }).hidden).toEqual([])

    for (const name of ['Today', 'This Week', 'Flagged', 'All', 'Completed']) {
      await act(async () => fireEvent.click(screen.getByRole('switch', { name: `Show ${name}` })))
    }
    expect(screen.getByRole('switch', { name: 'Show Scheduled' })).toBeDisabled()
    expect(screen.getByLabelText('Color of Scheduled')).toHaveAttribute('data-color', 'palette:red')
  })

  it('sets a fixed text colour on a smart list tile and back to auto', async () => {
    const mock = setup()
    render(<Settings section="lists" />)
    const select = screen.getByRole('combobox', { name: 'Text color of Flagged' })
    expect(select).toHaveValue('auto')
    await act(async () => fireEvent.change(select, { target: { value: 'black' } }))
    expect(mock.api.settings.get()).toMatchObject({ smartLists: { textColors: { flagged: 'black' } } })
    await act(async () => fireEvent.change(screen.getByRole('combobox', { name: 'Text color of Flagged' }), { target: { value: 'auto' } }))
    expect((mock.api.settings.get().smartLists as { textColors: object }).textColors).toEqual({})
  })

  it('toggles strikethrough per status, with Completed and Canceled on by default', async () => {
    const mock = setup()
    render(<Settings section="statuses" />)
    expect(screen.getByRole('button', { name: 'Strike through Completed' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Strike through Canceled' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Strike through Waiting' })).toHaveAttribute('aria-pressed', 'false')
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Strike through Waiting' })))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Strike through Completed' })))
    expect(mock.api.settings.get()).toMatchObject({ statuses: { strikethrough: { waiting: true, completed: false, canceled: true } } })
  })
})
