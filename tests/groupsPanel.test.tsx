import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { TodoPanel } from '../src/TodoPanel'
import { parseView } from '../src/views'
import { injectStyles } from '../src/styles'
import { METADATA_PANEL_SEGMENT_V1 } from '@valley/plugin-sdk'
import { setView } from '../src/viewStore'

let store: TodoNotesMock

const CONFIGURED = [
  { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
  { id: 'group_wildlife', name: 'Wildlife', color: '#eab308' }
]

const RECORDS: DataRecord[] = [
  { id: 'a', title: 'Fungi Survey sheet', completed: false, group: 'Fungi' } as DataRecord,
  { id: 'b', title: 'Review species list', completed: false, group: 'Wildlife' } as DataRecord,
  { id: 'c', title: 'Record moss growth', completed: false } as DataRecord
]

function titles(): string[] {
  return screen.getAllByRole('heading', { level: 4 }).map((h) => (h.textContent ?? '').trim())
}

/** Group rows live in the header popover. */
function expandGroups(): void {
  fireEvent.click(screen.getByRole('button', { name: /^Groups/ }))
  render(<>{store.mock.popovers.at(-1)?.node}</>)
}

/** ＋ summons the create field; there is no permanent box. */
async function compose(value: string): Promise<void> {
  const create = await screen.findByLabelText('New todo')
  await act(async () => fireEvent.click(create))
  const field = await screen.findByLabelText('New todo title')
  await act(async () => {
    fireEvent.change(field, { target: { value } })
    fireEvent.submit(field.closest('form')!)
  })
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('the sidebar tree', () => {
  beforeEach(() => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED })
  })

  it('offers the same live group filter in its own compact inspector tab', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    const segment = store.mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'todo.groups')!.extension
    expect(segment.icon).toBe('group')
    const { container } = render(<>{segment.render({ relPath: '', kind: 'unsupported' })}</>)
    expect(container.querySelectorAll('.props-info-row')).toHaveLength(3)
    expect(screen.getByText('Fungi', { selector: 'dt' }).nextElementSibling).toHaveTextContent('1')
    const fungiSwitch = screen.getByRole('switch', { name: 'Fungi' })
    expect(fungiSwitch.parentElement).toHaveClass('props-info-filter-value')
    await act(async () => fireEvent.click(fungiSwitch))
    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet']))
    expect(screen.getByRole('switch', { name: 'Fungi' })).toBeChecked()
    act(() => setView({ kind: 'groups', names: ['Wildlife'], includeUngrouped: false }))
    expect(screen.getByRole('switch', { name: 'Fungi' })).not.toBeChecked()
    expect(screen.getByRole('switch', { name: 'Wildlife' })).toBeChecked()
    await waitFor(() => expect(titles()).toEqual(['Review species list']))
    fireEvent.click(screen.getByRole('button', { name: 'Manage groups' }))
    expect(store.mock.api.workspace.openSettings).toHaveBeenCalledWith('groups')
    expect(store.mock.api.workspace.setGroups).not.toHaveBeenCalled()
  })

  it('shows unselected To-Do facts as key/value rows without fake inputs', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    const segment = store.mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'todo.properties')!.extension
    expect(segment.editCommand).toBeUndefined()
    const { container } = render(<>{segment.render({ relPath: '', kind: 'unsupported' })}</>)
    expect(container.querySelectorAll('.todo-overall-summary > .props-info-row')).toHaveLength(10)
    expect(screen.getByText('Tasks', { selector: 'dt' }).nextElementSibling).toHaveTextContent('3')
    expect(screen.getByText('Completed', { selector: 'dt' }).nextElementSibling).toHaveTextContent('0')
    expect(screen.getByText('To do', { selector: 'dt' }).nextElementSibling).toHaveTextContent('3')
    expect(container.querySelector('input, select')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.todo-status-group-header')).toHaveLength(3)
  })

  it('shows every status total overall and for each group while group filters stay compact', async () => {
    store = installTodoNotes([
      { id: 'open', title: 'Survey fungi', completed: false, group: 'Fungi' } as DataRecord,
      { id: 'waiting', title: 'Wait for spores', completed: false, status: 'waiting', group: 'Fungi' } as DataRecord,
      { id: 'done', title: 'Catalog fungi', completed: true, status: 'completed', group: 'Fungi' } as DataRecord
    ], { groups: CONFIGURED })
    render(<TodoPanel />)
    await screen.findByText('Survey fungi')

    const segments = store.mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1)
    const summary = segments.find((entry) => entry.extension.id === 'todo.properties')!.extension
    const { container: summaryContainer } = render(<>{summary.render({ relPath: '', kind: 'unsupported' })}</>)
    expect([...summaryContainer.querySelectorAll('.todo-overall-summary > .props-info-row')].map((row) => row.textContent)).toEqual([
      'ViewAll', 'Tasks3', 'Completed1', 'To do1', 'In Progress0', 'Waiting1', 'On Hold0', 'Delegated0', 'Deferred0', 'Canceled0'
    ])
    const fungiHeader = within(summaryContainer).getByRole('button', { name: /^Fungi/ })
    const fungiSummary = fungiHeader.closest('.todo-status-group') as HTMLElement
    expect(fungiHeader).toHaveAttribute('aria-expanded', 'false')
    expect(fungiHeader.querySelector('.todo-status-group-meta')).toHaveTextContent('3')
    expect(fungiSummary.querySelector('.todo-group-status-row')).not.toBeInTheDocument()
    fireEvent.click(fungiHeader)
    expect(fungiHeader).toHaveAttribute('aria-expanded', 'true')
    expect([...fungiSummary.querySelectorAll('.todo-group-status-row')].map((row) => row.textContent)).toEqual([
      'Completed1', 'To do1', 'In Progress0', 'Waiting1', 'On Hold0', 'Delegated0', 'Deferred0', 'Canceled0'
    ])

    const groupSegment = segments.find((entry) => entry.extension.id === 'todo.groups')!.extension
    const { container } = render(<>{groupSegment.render({ relPath: '', kind: 'unsupported' })}</>)
    const fungi = within(container).getByText('Fungi', { selector: 'dt' }).closest('.todo-group-filter-item') as HTMLElement
    expect(fungi.querySelector('.props-info-value')).toHaveTextContent('3')
    expect(fungi.querySelectorAll('.props-info-row')).toHaveLength(1)
    expect(container.querySelector('.todo-group-status-row')).not.toBeInTheDocument()
  })

  it('lists the five smart lists with their counts', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    for (const [name, count] of [
      ['Scheduled', '0'],
      ['Today', '0'],
      ['Flagged', '0'],
      ['All', '3'],
      ['Completed', '0']
    ] as const) {
      const row = screen.getByRole('button', { name: new RegExp(`^${name}`) })
      expect(row.textContent).toBe(`${name}${count}`)
    }
  })

  it('keeps the header group filter icon-only', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    expect(screen.queryByRole('button', { name: /^Fungi/ })).not.toBeInTheDocument()
    const disclosure = screen.getByRole('button', { name: /^Groups/ })
    expect(disclosure.textContent).toBe('')
    expect(disclosure.querySelector('svg')).toBeInTheDocument()
    expect(disclosure).toHaveAttribute('title', 'Groups')
    expect(disclosure).not.toHaveClass('active')
    expandGroups()
    expect(screen.getByText('Group')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Deselect all' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: /^Fungi/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens the central Groups settings from the accent heading', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expandGroups()

    fireEvent.click(screen.getByRole('button', { name: 'Group' }))

    expect(store.mock.api.workspace.openSettings).toHaveBeenCalledWith('groups')
  })

  it('selects and clears every group from the labeled bulk action', async () => {
    await act(async () => render(<TodoPanel />))
    await screen.findByText('Fungi Survey sheet')
    expandGroups()

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Deselect all' })))
    expect(screen.getByRole('button', { name: 'Select all' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Fungi/ })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: /^Wildlife/ })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: /^No group/ })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: /^Groups/ }).textContent).toBe('')
    expect(screen.getByRole('button', { name: /^Groups/ })).toHaveClass('active')
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0)

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Select all' })))
    expect(screen.getByRole('button', { name: 'Deselect all' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Groups/ }).textContent).toBe('')
    expect(screen.getByRole('button', { name: /^Groups/ })).not.toHaveClass('active')
    expect(titles()).toHaveLength(3)
  })

  it('merges adjacent selections and rounds separated selection runs independently', async () => {
    await act(async () => render(<TodoPanel />))
    await screen.findByText('Fungi Survey sheet')
    expandGroups()

    let rows = [...document.querySelectorAll('.todo-group-filter-row')]
    expect(rows[0]).toHaveClass('active', 'selection-run-start')
    expect(rows[0]).not.toHaveClass('selection-run-end')
    expect(rows[1]).toHaveClass('active')
    expect(rows[1]).not.toHaveClass('selection-run-start', 'selection-run-end')
    expect(rows[2]).toHaveClass('active', 'selection-run-end')
    expect(rows[2]).not.toHaveClass('selection-run-start')

    await act(async () => fireEvent.click(screen.getByRole('button', { name: /^Wildlife/ })))
    rows = [...document.querySelectorAll('.todo-group-filter-row')]
    expect(rows[0]).toHaveClass('active', 'selection-run-start', 'selection-run-end')
    expect(rows[1]).not.toHaveClass('active', 'selection-run-start', 'selection-run-end')
    expect(rows[2]).toHaveClass('active', 'selection-run-start', 'selection-run-end')

    const disposeStyles = injectStyles()
    const css = document.getElementById('notes-todo-styles')?.textContent ?? ''
    expect(css).toContain('.todo-group-filter-row.active:hover {\n  background: color-mix(in srgb, var(--title-color) 14%, transparent);')
    expect(css).toContain('.todo-group-filter-row.active:has(+ .todo-group-filter-row:hover)')
    expect(css).toContain('.todo-group-filter-row:hover + .todo-group-filter-row.active')
    expect(css).toMatch(/\.todo-tree-search \{\s*width: auto;\s*flex: none;/)
    disposeStyles()
  })

  it('shows every group and No group, each with its open count', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expandGroups()

    const rows = [...document.querySelectorAll('.todo-group-filter-row')]
    expect(rows.map((r) => (r.textContent ?? '').trim())).toEqual([
      '✓Fungi1',
      '✓Wildlife1',
      '✓No group1'
    ])
  })

  it('filters the list to one group after clearing the default selection', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expect(titles()).toHaveLength(3)

    expandGroups()
    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(screen.getByRole('button', { name: /^Fungi/ }))
    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet']))
  })

  it('keeps several selected groups as an OR filter without a header count', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expandGroups()

    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(screen.getByRole('button', { name: /^Fungi/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Wildlife/ }))

    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet', 'Review species list']))
    expect(screen.getByRole('button', { name: /^Groups/ }).textContent).toBe('')
    expect(parseView(store.mock.api.settings.get().panelChip)).toEqual({
      kind: 'groups',
      names: ['Fungi', 'Wildlife'],
      includeUngrouped: false
    })
  })

  it('highlights every selected group in the page navigation', async () => {
    await act(async () => render(<TodoPanel />))
    await act(async () => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
    await screen.findByText('My Lists')

    await act(async () => setView({ kind: 'groups', names: ['Fungi', 'Wildlife'], includeUngrouped: false }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^Fungi/ })).toHaveClass('active')
      expect(screen.getByRole('button', { name: /^Fungi/ })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: /^Wildlife/ })).toHaveClass('active')
      expect(screen.getByRole('button', { name: /^Wildlife/ })).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('shows only ungrouped todos under No group', async () => {
    render(<TodoPanel />)
    await screen.findByText('Record moss growth')
    expandGroups()

    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(screen.getByRole('button', { name: /^No group/ }))
    await waitFor(() => expect(titles()).toEqual(['Record moss growth']))
  })

  it('persists the selection so the panel reopens where it was left', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expandGroups()

    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(screen.getByRole('button', { name: /^Wildlife/ }))

    await waitFor(() =>
      expect(parseView(store.mock.api.settings.get().panelChip)).toEqual({ kind: 'groups', names: ['Wildlife'], includeUngrouped: false })
    )
  })

  it('restores a persisted selection on mount', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'group:Fungi' })
    render(<TodoPanel />)

    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet']))
  })

  it('shows a configured group that nothing is assigned to yet', async () => {
    store = installTodoNotes([], {
      groups: [{ id: 'group_empty', name: 'Fresh', color: '#22c55e' }]
    })
    render(<TodoPanel />)
    await screen.findByRole('button', { name: /^Groups/ })
    expandGroups()

    expect(await screen.findByRole('button', { name: /^Fresh/ })).toBeTruthy()
  })

  it('hides the tree while searching — it competes with the answer', async () => {
    await act(async () => render(<TodoPanel />))
    const search = await screen.findByLabelText('Search todos')

    await act(async () => fireEvent.change(search, { target: { value: 'moss' } }))

    expect(screen.getByRole('button', { name: /^Groups/ })).toBeInTheDocument()
    expect(titles()).toEqual(['Record moss growth'])

    await act(async () => fireEvent.change(search, { target: { value: '' } }))
    expect(screen.getByRole('button', { name: /^Groups/ })).toBeInTheDocument()
  })
})

describe('creating into a group', () => {
  beforeEach(() => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED })
  })

  it('assigns the selected group to a new todo', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expandGroups()
    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(screen.getByRole('button', { name: /^Fungi/ }))

    await compose('Track animal motion')

    await waitFor(() =>
      expect(store.records.find((r) => r.title === 'Track animal motion')).toMatchObject({
        group: 'Fungi'
      })
    )
  })

  it('asks which selected group receives a quick-added todo', async () => {
    await act(async () => render(<TodoPanel />))
    await screen.findByText('Fungi Survey sheet')
    expandGroups()
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Deselect all' })))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /^Fungi/ })))
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /^Wildlife/ })))
    store.mock.api.ui.openMenu = vi.fn(async () => 'group:1')

    await compose('Count woodland tracks')

    await waitFor(() => expect(store.records.find((record) => record.title === 'Count woodland tracks')).toMatchObject({ group: 'Wildlife' }))
    expect(store.mock.api.ui.openMenu).toHaveBeenCalledWith(
      [
        { id: 'group:0', label: 'Fungi' },
        { id: 'group:1', label: 'Wildlife' }
      ],
      expect.any(Object)
    )
  })

  it('leaves a todo ungrouped when a smart list is selected', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    await compose('Unclassified sample')

    await waitFor(() => expect(store.records.find((r) => r.title === 'Unclassified sample')).toBeTruthy())
    expect(store.records.find((r) => r.title === 'Unclassified sample')?.group).toBeNull()
  })

  it('flags a todo created inside Flagged, so it does not vanish on creation', async () => {
    store = installTodoNotes([], { panelChip: 'flagged' })
    render(<TodoPanel />)

    await compose('Flag fox survey')

    await waitFor(() =>
      expect(store.records.find((r) => r.title === 'Flag fox survey')).toMatchObject({ flagged: true })
    )
  })
})

describe('the group machinery', () => {
  beforeEach(() => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED })
  })

  it('keeps group management out of the filter menu', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    fireEvent.click(screen.getByLabelText('Status and completed'))

    await waitFor(() => expect(store.mock.popovers).toHaveLength(1))
    render(<>{store.mock.popovers[0].node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Statuses' }))
    await waitFor(() => expect(store.mock.popovers).toHaveLength(2))
    render(<>{store.mock.popovers[1].node}</>)
    expect(screen.getByRole('button', { name: 'In Progress' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
    expect(screen.queryByText('New group')).not.toBeInTheDocument()
    expect(screen.queryByText('Manage groups')).not.toBeInTheDocument()
  })

  it('creates straight from ＋, with no menu in the way', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    await compose('Typed')

    await waitFor(() => expect(store.records.find((r) => r.title === 'Typed')).toBeTruthy())
    expect(store.mock.menus).toHaveLength(0)
  })
})
