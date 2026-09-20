import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes, TodoPropertiesHost, type TodoNotesMock } from './mockTodoNotes'
import { Page } from '../src/Page'
import { TodoPanel } from '../src/TodoPanel'
import { isoDay } from '../src/sort'
import { serializeView } from '../src/views'
import {
  applyTodoVisibleState,
  readTodoVisibleState,
  setView
} from '../src/viewStore'
import { PLUGIN_SURFACE_V1, type MainWorkspaceNavigationController } from '@valley/plugin-sdk'

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

function holdReconciliation(): (records: DataRecord[]) => void {
  const originalDataset = store.mock.api.data.dataset
  let reads = 0
  let finish!: (records: DataRecord[]) => void
  const refresh = new Promise<DataRecord[]>((resolve) => { finish = resolve })
  store.mock.api.data.dataset = ((dataset: string) => {
    const accessor = originalDataset(dataset)
    if (dataset !== 'todo.tasks') return accessor
    return {
      ...accessor,
      query: async (query) => ++reads === 1
        ? accessor.query(query)
        : { rows: await refresh, revision: 1 }
    }
  }) as typeof store.mock.api.data.dataset
  return finish
}

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

/**
 * The page shows whatever the sidebar selected. It carries no filter of its
 * own any more — the two surfaces reading one value is the whole point of the
 * navigation rewrite, and a page that could disagree with the sidebar is the
 * bug the chip bar had.
 */
describe('the To-Do page', () => {
  beforeEach(() => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED })
  })

  it('opens on All, so an undated todo is never invisible on a fresh vault', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('All')
    expect(titles()).toHaveLength(3)
  })

  it('orders the toolbar as search, sort field, direction, then statuses', async () => {
    store = installTodoNotes(RECORDS, {
      groups: CONFIGURED,
      pageSort: { field: 'due', dir: 'asc' }
    })
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    const toolbar = container.querySelector('.todo-page-toolbar')!
    expect([...toolbar.children].map((element) => {
      if (element.matches('.todo-search-wrap')) return 'search'
      if (element.matches('select')) return 'due'
      if (element.matches('.flagged-notes-sort-dir')) return 'direction'
      if (element.matches('.todo-status-filter-select')) return 'statuses'
      return 'other'
    })).toEqual(['search', 'due', 'direction', 'statuses'])
  })

  it('round-trips linked navigation, filters, search, and sort into persistent settings', () => {
    const linkedView = serializeView({ kind: 'groups', names: ['Fungi'], includeUngrouped: false })
    expect(applyTodoVisibleState({
      v: 1,
      view: linkedView,
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'moss',
      sort: { field: 'priority', dir: 'desc' }
    })).toBe(true)

    expect(readTodoVisibleState()).toEqual({
      v: 1,
      view: linkedView,
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'moss',
      sort: { field: 'priority', dir: 'desc' }
    })
    expect(store.mock.api.settings.get()).toMatchObject({
      panelChip: linkedView,
      pageShowCompleted: true,
      statusFilter: ['waiting'],
      pageSearch: 'moss',
      pageSort: { field: 'priority', dir: 'desc' }
    })
    expect(applyTodoVisibleState({ ...readTodoVisibleState(), v: 2 })).toBe(false)
  })

  it('falls back from a missing linked tag while retaining every valid filter', async () => {
    applyTodoVisibleState({
      v: 1,
      view: 'tag:missing',
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'survey',
      sort: { field: 'name', dir: 'asc' }
    })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByRole('heading', { level: 1, name: 'All' })

    expect(readTodoVisibleState()).toMatchObject({
      view: 'all',
      showCompleted: true,
      statusFilter: ['waiting'],
      search: 'survey',
      sort: { field: 'name', dir: 'asc' }
    })
  })

  it('leaves navigation to the host strip and keeps the active view and actions', async () => {
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    const bar = container.querySelector('.todo-page-appbar')
    expect(bar).not.toBeNull()
    expect(bar?.querySelector('.todo-page-appbar-title')).toHaveTextContent('All')
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Forward' })).not.toBeInTheDocument()

    expect(screen.queryByRole('button', { name: 'More actions' })).not.toBeInTheDocument()
    const provider = store.mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'main_workspace')!.extension
    expect(provider.getSnapshot().actions?.map((item) => item.label)).toContain('Manage groups')
  })

  it('registers internal view history for the host navigation controls', async () => {
    let controller: MainWorkspaceNavigationController | null = null
    const navigation = {
      setController: (next: MainWorkspaceNavigationController | null): void => {
        controller = next
      }
    }
    render(<Page navigation={navigation} />)

    act(() => setView({ kind: 'smart', id: 'today' }))
    await screen.findByRole('heading', { level: 1, name: 'Today' })
    await waitFor(() => expect(controller?.canGoBack).toBe(true))

    await act(async () => { await controller?.goBack() })
    await screen.findByRole('heading', { level: 1, name: 'All' })
    expect((controller as MainWorkspaceNavigationController | null)?.canGoForward).toBe(true)
  })

  it('titles itself after the selected view, in that view’s colour', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'scheduled' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    const title = await screen.findByRole('heading', { level: 1 })
    expect(title.textContent).toBe('Scheduled')
    // The variable, not a resolved colour — that is what keeps the title
    // following the theme and any `--color-red` the user overrode.
    expect(title.getAttribute('style')).toContain('var(--color-red)')
  })

  it('takes a group’s own colour for a group view', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'group:Fungi' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    const title = await screen.findByRole('heading', { level: 1 })
    expect(title.textContent).toBe('Fungi')
    expect(title.getAttribute('style')).toContain('rgb(59, 130, 246)')
    await waitFor(() => expect(titles()).toEqual(['Fungi Survey sheet']))
  })

  it('follows the sidebar’s selection', async () => {
    render(
      <>
        <TodoPanel />
        <Page navigation={{ setController: vi.fn() }} />
      </>
    )
    await screen.findAllByText('Fungi Survey sheet')

    fireEvent.click(screen.getByRole('button', { name: /^Groups/ }))
    render(<>{store.mock.popovers.at(-1)?.node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Deselect all' }))
    fireEvent.click(await screen.findByRole('button', { name: /^Fungi/ }))

    await waitFor(() => expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Fungi'))
  })

  it('keeps sidebar and page search synchronized', async () => {
    render(
      <>
        <TodoPanel />
        <Page navigation={{ setController: vi.fn() }} />
      </>
    )
    const searches = await screen.findAllByLabelText('Search todos')
    for (const input of searches) {
      expect(input).toHaveClass('search-field-input')
      expect(input.parentElement).toHaveClass('search-field')
      expect(input.parentElement?.querySelector('.search-field-icon')).toBeInTheDocument()
    }

    fireEvent.change(searches[0], { target: { value: 'moss' } })

    expect(searches[1]).toHaveValue('moss')
    await waitFor(() => expect(screen.queryByText('Review species list')).not.toBeInTheDocument())
    expect(screen.getAllByText('Record moss growth')).toHaveLength(2)
    const clear = screen.getAllByRole('button', { name: 'Clear search' })
    expect(clear.every((button) => button.classList.contains('search-field-action'))).toBe(true)
    fireEvent.click(clear[1])
    expect(searches[0]).toHaveValue('')
    expect(searches[1]).toHaveValue('')
    fireEvent.change(searches[0], { target: { value: 'moss' } })
    fireEvent.keyDown(searches[0], { key: 'Escape' })
    expect(searches[0]).toHaveValue('')
    expect(searches[1]).toHaveValue('')
    expect(await screen.findAllByLabelText('Search todos')).toEqual(searches)
  })

  it('persists the shared selection under the one key both surfaces read', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    expect(store.mock.api.settings.get()).not.toHaveProperty('pageChip')
  })

  it('routes group management to the central Settings page', async () => {
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')
    fireEvent.click(screen.getByRole('button', { name: 'New todo' }))
    await waitFor(() => expect(store.mock.menus).toHaveLength(1))
    store.mock.menus[0].find((item) => item.label === 'Manage groups')?.onSelect?.()
    expect(store.mock.api.workspace.openSettings).toHaveBeenCalledWith('groups')
  })

  it('reports the completed tally and shows or hides its rows on demand', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Open one', completed: false } as DataRecord,
      { id: 'b', title: 'Done one', completed: true } as DataRecord
    ])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Open one')

    expect(screen.getByText('1 Completed')).toBeInTheDocument()
    expect(titles()).toEqual(['Open one'])

    fireEvent.click(screen.getByRole('button', { name: 'Show all' }))
    await waitFor(() => expect(titles()).toContain('Done one'))
    expect(screen.getByRole('button', { name: 'Hide completed' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Hide completed' }))
    await waitFor(() => expect(titles()).toEqual(['Open one']))
  })

  it('keeps the workspace page mounted while completing a task with attachment cards', async () => {
    store = installTodoNotes([{
      id: 'linked',
      title: 'Archive field recording',
      completed: false,
      filePath: 'Audio/Field.m4a',
      attachments: ['Notes/Field.md']
    } as DataRecord])
    const finishRefresh = holdReconciliation()
    const { container } = render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByTitle('Audio/Field.m4a')
    const shell = container.querySelector('.todo-page')

    fireEvent.click(screen.getByLabelText('Complete Archive field recording'))

    await waitFor(() => expect(screen.queryByText('Archive field recording')).not.toBeInTheDocument())
    expect(screen.queryByText('Loading todos')).not.toBeInTheDocument()
    expect(container.querySelector('.todo-page')).toBe(shell)
    act(() => finishRefresh(store.records.map((record) => ({ ...record }))))
    await waitFor(() => expect(container.querySelector('.todo-page')).toBe(shell))
  })

  it('renders Completed as a newest-first completion timeline', async () => {
    store = installTodoNotes([
      {
        id: 'older', title: 'Older completion', completed: true, status: 'completed',
        statusHistory: [{ from: 'open', to: 'completed', changedAt: '2026-06-11T12:00:00.000Z' }]
      } as DataRecord,
      {
        id: 'newer', title: 'Newer cancellation', completed: true, status: 'canceled',
        statusHistory: [{ from: 'open', to: 'canceled', changedAt: '2026-06-13T12:00:00.000Z' }]
      } as DataRecord,
      {
        id: 'legacy', title: 'Legacy completion', completed: true,
        updatedAt: '2026-06-12T12:00:00.000Z'
      } as DataRecord,
      {
        id: 'reopened', title: 'Reopened task', completed: false, status: 'open',
        statusHistory: [
          { from: 'open', to: 'completed', changedAt: '2026-06-14T12:00:00.000Z' },
          { from: 'completed', to: 'open', changedAt: '2026-06-15T12:00:00.000Z' }
        ]
      } as DataRecord
    ], { panelChip: 'completed' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    await screen.findByText('Newer cancellation')
    expect(titles()).toEqual(['Newer cancellation', 'Legacy completion', 'Older completion'])
    expect(document.querySelectorAll('.todo-completed-timeline .todo-schedule-head')).toHaveLength(3)
    expect(screen.queryByText('Reopened task')).not.toBeInTheDocument()
  })

  it('uses the global short date format for completed timeline headings', async () => {
    store = installTodoNotes([
      {
        id: 'completed-short-date', title: 'Completed fern survey', completed: true, status: 'completed',
        statusHistory: [{ from: 'open', to: 'completed', changedAt: '2026-06-13T12:00:00.000Z' }]
      } as DataRecord
    ], { panelChip: 'completed' })
    store.mock.emitState({ shortDateFormat: 'dddd dd mmmm yyyy' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    await screen.findByText('Completed fern survey')
    expect(screen.getByText('Saturday 13 June 2026')).toBeInTheDocument()
  })

  it('groups a dated view under date headers instead of repeating the date per row', async () => {
    const today = isoDay(new Date())
    store = installTodoNotes(
      [
        { id: 'a', title: 'Due today', completed: false, dueDate: today } as DataRecord,
        { id: 'b', title: 'Long overdue', completed: false, dueDate: '2020-01-01' } as DataRecord,
        { id: 'c', title: 'Future survey', completed: false, dueDate: '2099-01-02' } as DataRecord
      ],
      { panelChip: 'scheduled' }
    )
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Long overdue')

    expect(screen.getByRole('heading', { level: 2, name: /^Overdue/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /^Today/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('is-overdue')
    expect(document.querySelectorAll('.todo-day-head.is-overdue')).toHaveLength(1)
    // The row's own inline date is suppressed — the header already said it.
    expect(document.querySelector('.todo-date')).toBeNull()

    // 2099 is well past the day-header horizon, so it rolls into a collapsed
    // month rather than adding a header of its own to a list nobody has
    // scrolled to yet.
    expect(document.querySelectorAll('h2.todo-day-head')).toHaveLength(0)
    expect(screen.queryByText('Future survey')).toBeNull()
    const month = screen.getByRole('button', { expanded: false, name: /January/ })
    fireEvent.click(month)
    expect(await screen.findByText('Future survey')).toBeInTheDocument()
  })

  it('splits Today by time of day, and leads with the untimed work', async () => {
    const today = isoDay(new Date())
    store = installTodoNotes(
      [
        { id: 'a', title: 'Whenever', completed: false, dueDate: today } as DataRecord,
        { id: 'b', title: 'Standup', completed: false, dueDate: today, startTime: '09:30' } as DataRecord,
        { id: 'c', title: 'Review', completed: false, dueDate: today, startTime: '14:00' } as DataRecord,
        { id: 'd', title: 'Reading', completed: false, dueDate: today, startTime: '21:00' } as DataRecord
      ],
      { panelChip: 'today' }
    )
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Standup')

    const heads = [...document.querySelectorAll('.todo-timeofday-head')].map((h) => h.textContent)
    // Untimed leads with no header of its own — it is most of a day, and a
    // heading over it would shout louder than the timed items it sits above.
    expect(heads).toEqual(['Morning', 'Afternoon', 'Tonight'])
    expect(titles()).toEqual(['Whenever', 'Standup', 'Review', 'Reading'])
  })

  it('keeps the inline date in an undated view', async () => {
    store = installTodoNotes([
      { id: 'a', title: 'Someday', completed: false, dueDate: '2026-12-01' } as DataRecord
    ])
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Someday')

    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0)
    expect(document.querySelector('.todo-date')).not.toBeNull()
  })

  it('assigns the active group to a quick-added todo, tokens and all', async () => {
    store = installTodoNotes(RECORDS, { groups: CONFIGURED, panelChip: 'group:Fungi' })
    render(<Page navigation={{ setController: vi.fn() }} />)
    await screen.findByText('Fungi Survey sheet')

    fireEvent.change(await screen.findByLabelText('Quick add a task'), {
      target: { value: 'Habitat survey 10 !! @today' }
    })
    fireEvent.submit(screen.getByLabelText('Quick add a task').closest('form')!)

    await waitFor(() => {
      const created = store.records.find((r) => r.title === 'Habitat survey 10')
      expect(created).toMatchObject({ group: 'Fungi', priority: 'medium' })
      expect(String(created?.dueDate ?? '')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  it('dates a todo created inside Today, so it does not vanish on creation', async () => {
    store = installTodoNotes([], { panelChip: 'today' })
    render(<Page navigation={{ setController: vi.fn() }} />)

    fireEvent.change(await screen.findByLabelText('Quick add a task'), {
      target: { value: 'Observe otter den' }
    })
    fireEvent.submit(screen.getByLabelText('Quick add a task').closest('form')!)

    await waitFor(() =>
      expect(store.records.find((r) => r.title === 'Observe otter den')).toMatchObject({
        dueDate: isoDay(new Date())
      })
    )
  })

  /** The page renders its own editor, so it must obey the same one-at-a-time rule. */
  it('edits the selected row in a modal while Properties stays read-only', async () => {
    render(<><Page navigation={{ setController: vi.fn() }} /><TodoPropertiesHost mock={store.mock} /></>)
    await screen.findByText('Fungi Survey sheet')

    fireEvent.doubleClick(screen.getByText('Review species list'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
    expect(screen.getByRole('region', { name: 'Task properties' }).querySelector('input, textarea, select')).not.toBeInTheDocument()
    expect((screen.getByLabelText('Todo title') as HTMLInputElement).value).toBe('Review species list')
    expect(store.mock.popovers).toHaveLength(0)
  })

})


it.each(['scheduled', 'completed'] as const)('bounds the %s date section containers for a large timeline', async (id) => {
  const records = Array.from({ length: 500 }, (_, index) => ({
    id: `date-${index}`, title: `Date task ${index}`, completed: id === 'completed',
    dueDate: new Date(Date.UTC(2020, 0, index + 1)).toISOString().slice(0, 10),
    ...(id === 'completed' ? { completedAt: new Date(Date.UTC(2020, 0, index + 1)).toISOString() } : {})
  }))
  store = installTodoNotes(records, { panelChip: serializeView({ kind: 'smart', id }), pageShowCompleted: true })
  const view = render(<Page navigation={{ setController: vi.fn() }} />)
  await waitFor(() => expect(view.container.querySelector('.todo-row')).not.toBeNull())
  expect(view.container.querySelectorAll(id === 'completed' ? '.todo-schedule-block' : '.todo-page-days').length).toBeLessThan(40)
  expect(view.container.querySelectorAll('.todo-row').length).toBeLessThan(40)
})

it('bounds future month containers while retaining month expansion', async () => {
  store = installTodoNotes(Array.from({ length: 500 }, (_, index) => ({ id: `month-${index}`, title: `Future task ${index}`, completed: false, dueDate: new Date(Date.UTC(2090, index, 1)).toISOString().slice(0, 10) })), { panelChip: serializeView({ kind: 'smart', id: 'scheduled' }) })
  const view = render(<Page navigation={{ setController: vi.fn() }} />)
  await waitFor(() => expect(view.container.querySelector('.todo-month')).not.toBeNull())
  expect(view.container.querySelectorAll('.todo-month').length).toBeLessThan(40)
  const header = view.container.querySelector('.todo-month-head')!
  fireEvent.click(header)
  expect(header).toHaveAttribute('aria-expanded', 'true')
  expect(await screen.findByText('Future task 0')).toBeTruthy()
  expect(view.container.querySelectorAll('.todo-month').length).toBeLessThan(40)
})
