import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { createMockValleyApi } from './harness'
import { initRuntime } from '../src/runtime'
import { initLocalization } from '../src/localization'
import { Settings } from '../src/Settings'

afterEach(cleanup)

describe('todo settings', () => {
  it('keeps disabled statuses visible in Settings with the shared hidden utility', () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' }, settings: { statuses: { active: [] } } })
    initLocalization(mock.api)
    initRuntime(mock.api)
    render(<><style>{'.hidden { visibility: hidden; }'}</style><Settings /></>)

    for (const name of ['In Progress', 'Waiting', 'On Hold', 'Delegated', 'Deferred', 'Canceled']) {
      expect(screen.getByRole('button', { name: `Show ${name}` })).toBeVisible()
      expect(screen.getByLabelText(`Color of ${name}`)).toBeVisible()
    }
    expect(document.querySelectorAll('.todo-status-setting-row')).toHaveLength(8)
    expect(mock.api.settings.get()).toMatchObject({ statuses: { active: [] } })
  })

  it('embeds shared group management', () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    initLocalization(mock.api)
    initRuntime(mock.api)
    render(React.createElement(Settings))

    expect(document.body.textContent!.indexOf('Groups')).toBeLessThan(document.body.textContent!.indexOf('Statuses'))
    expect(screen.getAllByText('Statuses')).toHaveLength(1)
    expect(screen.getByRole('combobox', { name: 'Date breakdown' })).toHaveValue('monthly')
    expect(screen.queryByRole('button', { name: 'Daily' })).not.toBeInTheDocument()

    // The pane used to read "This plugin has no settings" while lists were the
    // one thing a user came looking for.
    expect(screen.getByTestId('shared-groups-editor')).toBeInTheDocument()

    expect(mock.api.workspace.openSettings).not.toHaveBeenCalled()
  })

  it('pins locked statuses and moves optional rows between Show and Hide by X, plus, or drag', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    const reorder = mock.api.ui.settings.useReorderDrag
    mock.api.ui.settings.useReorderDrag = options => ({ ...reorder(options), activeId: 'waiting' })
    initLocalization(mock.api)
    initRuntime(mock.api)
    render(React.createElement(Settings))

    const rows = [...document.querySelectorAll('.todo-status-setting-row')]
    expect(rows.slice(0, 2).map((row) => row.textContent)).toEqual(['To do', 'Completed'])
    expect(rows.slice(0, 2).every((row) => row.classList.contains('locked'))).toBe(true)
    expect(screen.getByLabelText('Color of To do')).toBeEnabled()
    expect(screen.getByLabelText('Color of Completed')).toBeEnabled()
    expect(screen.getByText('Show')).toBeInTheDocument()
    expect(screen.getByText('Hide')).toBeInTheDocument()
    expect(rows[0].querySelector('[aria-label="Hide To do"]')).toBeNull()
    expect(rows[1].querySelector('[aria-label="Hide Completed"]')).toBeNull()
    expect(screen.queryByRole('combobox', { name: 'Add status' })).not.toBeInTheDocument()

    await act(async () => fireEvent.keyDown(screen.getAllByTitle('Reorder status')[0], { key: 'End' }))
    expect((mock.api.settings.get().statuses as { active: string[] }).active.at(-1)).toBe('inprogress')

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Hide Waiting' })))
    expect((mock.api.settings.get().statuses as { active: string[] }).active).not.toContain('waiting')
    const showWaiting = screen.getByRole('button', { name: 'Show Waiting' })
    expect(showWaiting.querySelector('path')?.getAttribute('d')).toBe('M12 5v14M5 12h14')

    await act(async () => fireEvent.click(showWaiting))
    expect((mock.api.settings.get().statuses as { active: string[] }).active.at(-1)).toBe('waiting')

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Hide Waiting' })))
    const hiddenRow = screen.getByRole('button', { name: 'Show Waiting' }).closest('.todo-status-setting-row')!
    const handle = hiddenRow.querySelector<HTMLButtonElement>('button.todo-status-setting-handle')!
    expect(handle).toHaveAttribute('draggable', 'true')
    let payload = ''
    const dataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData: (_type: string, value: string) => { payload = value },
      getData: () => payload
    }
    fireEvent.dragStart(handle, { dataTransfer })
    expect(payload).toBe('waiting')
    expect(document.querySelector('.accepts-drop')).toBeNull()
    const showZone = document.querySelector('.todo-status-show')!
    fireEvent.dragOver(showZone, { dataTransfer })
    expect(showZone).toHaveClass('accepts-drop')
    expect(document.querySelector('.todo-status-settings')).toHaveAttribute('data-drop-zone', 'show')
    await act(async () => fireEvent.drop(showZone, { dataTransfer }))

    expect((mock.api.settings.get().statuses as { active: string[] }).active.at(-1)).toBe('waiting')
    expect(screen.getByText('No hidden statuses')).toBeInTheDocument()
    expect(document.querySelector('.accepts-drop')).toBeNull()
    expect(document.querySelector('.todo-status-settings')).not.toHaveAttribute('data-drop-zone')
  })

  it('reorders, hides, restores, and always keeps one smart list visible', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'todo' },
      settings: { panelChip: 'today' }
    })
    initLocalization(mock.api)
    initRuntime(mock.api)
    render(React.createElement(Settings))

    expect([...document.querySelectorAll('.todo-smart-list-setting-row')].map((row) => row.textContent)).toEqual([
      'Scheduled', 'Today', 'Flagged', 'All', 'Completed'
    ])

    await act(async () => fireEvent.keyDown(screen.getAllByTitle('Reorder smart list')[0], { key: 'End' }))
    expect((mock.api.settings.get().smartLists as { order: string[] }).order).toEqual([
      'today', 'flagged', 'all', 'completed', 'scheduled'
    ])

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Hide Today' })))
    expect(mock.api.settings.get()).toMatchObject({
      panelChip: 'flagged',
      smartLists: { hidden: ['today'] }
    })
    expect(screen.getByText('Hidden')).toBeInTheDocument()
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Restore' })))
    expect((mock.api.settings.get().smartLists as { hidden: string[] }).hidden).toEqual([])

    for (const name of ['Today', 'Flagged', 'All', 'Completed']) {
      await act(async () => fireEvent.click(screen.getByRole('button', { name: `Hide ${name}` })))
    }
    expect(screen.getByRole('button', { name: 'Hide Scheduled' })).toBeDisabled()
    expect(document.querySelectorAll('.todo-smart-list-setting-row')).toHaveLength(1)
  })
})
