import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { TodoPanel } from '../src/ui/TodoPanel'
import { parseView } from '../src/model/views'
import { injectStyles } from '../src/styles'
import { METADATA_PANEL_SEGMENT_V1 } from '@valley/plugin-sdk'
import { setView } from '../src/state/viewStore'

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
  fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
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

  it('registers one Properties segment, titled Groups with the group icon, and offers no groups in the sidebar filter', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    const segments = store.mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).map((entry) => entry.extension)
    expect(segments.map((segment) => segment.id)).toEqual(['todo.properties'])
    expect(segments[0]).toMatchObject({ label: 'Groups', labelKey: 'todo.view.myLists', icon: 'group' })
    expandGroups()
    expect(screen.queryByRole('button', { name: /^Fungi/ })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Deselect all' })).toBeNull()
    act(() => setView({ kind: 'groups', names: ['Wildlife'], includeUngrouped: false }))
    await waitFor(() => expect(titles()).toEqual(['Review species list']))
  })
  it('lists only the groups on the Groups tab, with no summary rows and no fake inputs', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    const segment = store.mock.api.interop.extensions.providers(METADATA_PANEL_SEGMENT_V1).find((entry) => entry.extension.id === 'todo.properties')!.extension
    expect(segment.editCommand).toBeUndefined()
    const { container } = render(<>{segment.render({ relPath: '', kind: 'unsupported' })}</>)
    expect(container.querySelector('.todo-overall-summary')).toBeNull()
    expect(container.querySelector('dt')).toBeNull()
    expect(container.querySelector('input, select')).not.toBeInTheDocument()
    expect([...container.querySelectorAll('.todo-status-group-header')].map((header) => header.textContent)).toEqual(['Fungi1', 'Wildlife1', 'No group1'])
    expect(container.querySelector('.todo-properties-frame[data-plugin-widget-layout="fill"] .todo-groups-properties')).not.toBeNull()
  })
  it('shows every status total for each group on the Groups tab', async () => {
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

  it('keeps the header filter icon-only, with All, Completed and To do as its only choices', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    const disclosure = screen.getByRole('button', { name: 'Filter' })
    expect(disclosure.textContent).toBe('')
    expect(disclosure.querySelector('svg')).toBeInTheDocument()
    expect(disclosure).toHaveAttribute('title', 'Filter')
    expect(disclosure).not.toHaveClass('active')
    expandGroups()
    expect([...document.querySelectorAll('.todo-status-quick-btn')].map((button) => button.textContent)).toEqual(['All', 'Completed', 'To do'])
    expect(document.querySelector('.todo-group-filter-popover')).toBeNull()
    expect(screen.queryByText('Group')).toBeNull()
    expect(screen.queryByRole('button', { name: 'Deselect all' })).toBeNull()
  })
  it('filters the list to one selected group', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    expect(titles()).toHaveLength(3)

    act(() => setView({ kind: 'groups', names: ['Fungi'], includeUngrouped: false }))
    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet']))
  })
  it('keeps several selected groups as an OR filter without a header count', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    act(() => setView({ kind: 'groups', names: ['Fungi', 'Wildlife'], includeUngrouped: false }))

    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet', 'Review species list']))
    expect(screen.getByRole('button', { name: 'Filter' }).textContent).toBe('')
    expect(parseView(store.mock.api.settings.get().panelChip)).toEqual({
      kind: 'groups',
      names: ['Fungi', 'Wildlife'],
      includeUngrouped: false
    })
  })
  it('highlights every selected group in the page navigation', async () => {
    await act(async () => render(<TodoPanel />))
    await act(async () => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
    await screen.findByText('Groups')

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

    act(() => setView({ kind: 'groups', names: [], includeUngrouped: true }))
    await waitFor(() => expect(titles()).toEqual(['Record moss growth']))
  })
  it('persists the selection so the panel reopens where it was left', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')

    act(() => setView({ kind: 'groups', names: ['Wildlife'], includeUngrouped: false }))

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
    await act(async () => render(<TodoPanel />))
    await act(async () => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
    await screen.findByText('Groups')

    expect(await screen.findByRole('button', { name: /^Fresh/ })).toBeTruthy()
  })
  it('hides the tree while searching — it competes with the answer', async () => {
    await act(async () => render(<TodoPanel />))
    const search = await screen.findByLabelText('Search todos')

    await act(async () => fireEvent.change(search, { target: { value: 'moss' } }))

    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument()
    expect(titles()).toEqual(['Record moss growth'])

    await act(async () => fireEvent.change(search, { target: { value: '' } }))
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument()
  })
})

describe('creating into a group', () => {
  beforeEach(() => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED })
  })

  it('assigns the selected group to a new todo', async () => {
    render(<TodoPanel />)
    await screen.findByText('Fungi Survey sheet')
    act(() => setView({ kind: 'groups', names: ['Fungi'], includeUngrouped: false }))

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
    await act(async () => setView({ kind: 'groups', names: ['Fungi', 'Wildlife'], includeUngrouped: false }))
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

    fireEvent.click(screen.getByLabelText('Filter'))

    await waitFor(() => expect(store.mock.popovers).toHaveLength(1))
    render(<>{store.mock.popovers[0].node}</>)
    expect(screen.getByRole('button', { name: 'Show every status' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Statuses' })).not.toBeInTheDocument()
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
