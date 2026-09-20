import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, renderHook, screen, waitFor, within } from '@testing-library/react'
import * as React from 'react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import {
  CALENDAR_ITEM_SOURCE_V2,
  CALENDAR_ITEM_SOURCE_REVISION_V1,
  CALENDAR_NAVIGATOR_V1,
  CALENDAR_PANEL_SELECTION_V1,
  type CalendarNavigator,
  type ValleyPluginApi
} from '@valley/plugin-sdk'
import { installTodoNotes, type TodoNotesMock } from './mockTodoNotes'
import { TodoPanel } from '../src/TodoPanel'
import { Page } from '../src/Page'
import { NoteTasksPanel } from '../src/NoteTasksPanel'
import { usePendingIds } from '../src/hooks'
import { registerCalendarSource } from '../src/calendarSource'
import { revealRequestStore } from '../src/runtime'
import { usePanelPresentation } from '../src/viewStore'

let store: TodoNotesMock

function setup(records: DataRecord[] = [], settings: Record<string, unknown> = {}): void {
  store = installTodoNotes(records, settings)
}

async function showDetails(): Promise<void> {
  await act(async () => fireEvent.click(screen.getByLabelText('Compact view')))
}

function overrideTransaction(transaction: ValleyPluginApi['data']['transaction']): void {
  store.mock.api.data.transaction = transaction
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
  vi.useRealTimers()
})

describe('TodoPanel', () => {
  beforeEach(() => setup())

  it('persists each narrow panel presentation independently across remounts', async () => {
    const todo = renderHook(() => usePanelPresentation('todo'))
    act(() => todo.result.current[1]({ compact: false, sortField: 'name', sortDir: 'asc' }))
    await waitFor(() => expect(store.mock.api.settings.get().panelPresentation).toMatchObject({
      compact: false,
      sortField: 'name',
      sortDir: 'asc'
    }))
    todo.unmount()

    const restored = renderHook(() => usePanelPresentation('todo'))
    expect(restored.result.current[0]).toMatchObject({ compact: false, sortField: 'name', sortDir: 'asc' })

    const attachment = renderHook(() => usePanelPresentation('attachment'))
    act(() => attachment.result.current[1]({
      compact: false,
      sortField: 'created',
      sortDir: 'asc',
      showCompleted: true,
      statusFilter: ['waiting']
    }))
    await waitFor(() => expect(store.mock.api.settings.get().attachmentPanelPresentation).toMatchObject({
      compact: false,
      sortField: 'created',
      sortDir: 'asc',
      showCompleted: true,
      statusFilter: ['waiting']
    }))
    expect(restored.result.current[0]).toMatchObject({ compact: false, sortField: 'name', sortDir: 'asc' })
  })

  it('formats row dates with the global date preference', async () => {
    setup([{ id: 'dated', title: 'Inspect alpine plot', completed: false, dueDate: '2027-03-14' } as DataRecord])
    render(<TodoPanel />)
    expect(await screen.findByText('14-03-2027')).toBeInTheDocument()
    expect(screen.queryByText('14.03.2027')).not.toBeInTheDocument()
  })

  it('consumes an owner reveal that arrived before the panel mounted', async () => {
    setup([{ id: 'todo-1', title: 'Inspect alpine plot', completed: false } as DataRecord])
    const scrollIntoView = vi.fn()
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView
    })
    revealRequestStore().request('todo-1', 'focus')

    render(<TodoPanel />)

    const row = (await screen.findByText('Inspect alpine plot')).closest('.todo-row')
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' }))
    expect(row).toHaveClass('todo-reveal-target')
    expect(revealRequestStore().get()).toBeNull()
  })

  it('opens one editor for an owner request with the page and sidebar both mounted', async () => {
    setup([{ id: 'todo-1', title: 'Inspect alpine plot', completed: false } as DataRecord])
    render(<><TodoPanel /><Page navigation={{ setController: vi.fn() }} /></>)
    await screen.findAllByText('Inspect alpine plot')
    act(() => revealRequestStore().request('todo-1', 'edit'))
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(screen.getByLabelText('Todo title')).toHaveValue('Inspect alpine plot')
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
  })

  /** ＋ opens the composer; the field only exists once it has. */
  async function compose(value: string): Promise<HTMLInputElement> {
    fireEvent.click(await screen.findByLabelText('New todo'))
    const field = (await screen.findByLabelText('New todo title')) as HTMLInputElement
    fireEvent.change(field, { target: { value } })
    return field
  }

  const submitCompose = (): void => {
    fireEvent.submit(screen.getByLabelText('New todo title').closest('form')!)
  }

  it('has no create field until ＋ asks for one', async () => {
    render(<TodoPanel />)
    await screen.findByLabelText('New todo')
    expect(screen.queryByLabelText('New todo title')).not.toBeInTheDocument()
  })

  it('creates a todo and persists it to the data file', async () => {
    render(<TodoPanel />)
    await compose('Record habitat')
    submitCompose()

    await waitFor(() => expect(store.records).toHaveLength(1))
    expect(store.records[0]).toMatchObject({ title: 'Record habitat', completed: false })
  })

  it('keeps the composer open so a run of todos is one flow', async () => {
    render(<TodoPanel />)
    await compose('First')
    submitCompose()
    await waitFor(() => expect(store.records).toHaveLength(1))

    const field = screen.getByLabelText('New todo title') as HTMLInputElement
    expect(field.value).toBe('')
    fireEvent.change(field, { target: { value: 'Second' } })
    submitCompose()
    await waitFor(() => expect(store.records).toHaveLength(2))
  })

  it('closes the composer on Escape and on an empty commit', async () => {
    render(<TodoPanel />)
    const field = await compose('')
    fireEvent.keyDown(field, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByLabelText('New todo title')).not.toBeInTheDocument())

    await compose('')
    submitCompose()
    await waitFor(() => expect(screen.queryByLabelText('New todo title')).not.toBeInTheDocument())
    expect(store.records).toHaveLength(0)
  })

  it('prevents duplicate appends while the create is pending', async () => {
    setup()
    const transaction = vi.fn().mockReturnValue(new Promise(() => {})) // never resolves
    overrideTransaction(transaction)

    render(<TodoPanel />)
    await compose('Once')
    await act(async () => {
      submitCompose()
      submitCompose()
    })

    expect(transaction).toHaveBeenCalledTimes(1)
  })

  it('rolls back a rejected create and restores the input', async () => {
    setup()
    overrideTransaction(vi.fn().mockRejectedValue(new Error('write failed')))

    render(<TodoPanel />)
    await compose('Restore me')
    submitCompose()

    await waitFor(() =>
      expect((screen.getByLabelText('New todo title') as HTMLInputElement).value).toBe('Restore me')
    )
  })

  it('toggles completion via the checkbox', async () => {
    setup([{ id: 't1', title: 'Inspect wetland', completed: false } as DataRecord])
    render(<TodoPanel />)
    const checkbox = await screen.findByLabelText('Complete Inspect wetland')
    fireEvent.click(checkbox)
    await waitFor(() => expect(store.records[0]).toMatchObject({ completed: true }))
  })

  it('keeps the ordinary sidebar mounted while completing a task with attachment cards', async () => {
    setup([{
      id: 'linked',
      title: 'Archive habitat photo',
      completed: false,
      filePath: 'Images/Habitat.png',
      attachments: ['Images/Detail.png']
    } as DataRecord])
    const finishRefresh = holdReconciliation()
    const { container } = await act(async () => render(<TodoPanel />))
    await showDetails()
    await screen.findByTitle('Images/Habitat.png')
    const shell = container.querySelector('.todo-panel')

    await act(async () => fireEvent.click(screen.getByLabelText('Complete Archive habitat photo')))

    await waitFor(() => expect(screen.queryByText('Archive habitat photo')).not.toBeInTheDocument())
    expect(screen.queryByText('Loading todos')).not.toBeInTheDocument()
    expect(container.querySelector('.todo-panel')).toBe(shell)
    act(() => finishRefresh(store.records.map((record) => ({ ...record }))))
    await waitFor(() => expect(container.querySelector('.todo-panel')).toBe(shell))
  })

  it('opens the workspace page and switches to navigation only while its To-Do tab is active', async () => {
    setup([
      { id: 'fungi', title: 'Inspect bolete', completed: false, group: 'Fungi' } as DataRecord
    ], {
      groups: [{ id: 'fungi', name: 'Fungi', color: 'palette:orange' }]
    })
    render(<TodoPanel />)

    fireEvent.click(await screen.findByRole('button', { name: 'Open To-Do page' }))
    expect(store.mock.api.workspace.openMainTab).toHaveBeenCalledOnce()
    expect(screen.getByLabelText('New todo')).toBeInTheDocument()
    expect(document.querySelector('.todo-smart-strip')).not.toBeNull()

    act(() => store.mock.emitState({ activePluginTab: { pluginId: 'todo' } }))
    await waitFor(() => expect(document.querySelector('.todo-active-navigation')).not.toBeNull())
    expect(document.querySelectorAll('.todo-smart-grid .todo-smart-chip')).toHaveLength(5)
    expect(screen.getByText('My Lists')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Fungi/ })).toHaveTextContent('1')
    expect(screen.queryByLabelText('New todo')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Compact view')).not.toBeInTheDocument()

    act(() => store.mock.emitState({ activePluginTab: { pluginId: 'calendar' } }))
    await waitFor(() => expect(screen.getByLabelText('New todo')).toBeInTheDocument())
    expect(document.querySelector('.todo-active-navigation')).toBeNull()
    expect(document.querySelector('.todo-smart-strip')).not.toBeNull()
  })

  it('keeps the sidebar to lists and groups, with no tag strip', async () => {
    // A row of every tag in the vault, each with its own count, was navigation
    // nobody asked for: it grew without bound, pushed the actual todos down the
    // panel, and repeated what the search field already does with `#tag`.
    setup([
      { id: 'a', title: 'Survey habitat', completed: false, tags: ['forest', 'moss'] },
      { id: 'b', title: 'Review samples', completed: false, tags: ['forest'] }
    ] as DataRecord[])
    render(<TodoPanel />)

    await screen.findByLabelText('New todo')
    expect(document.querySelector('.todo-tag-strip')).toBeNull()
    expect(screen.queryAllByText('#forest').filter((n) => n.classList.contains('todo-tree-label'))).toHaveLength(0)
    expect(screen.queryAllByText('#moss').filter((n) => n.classList.contains('todo-tree-label'))).toHaveLength(0)
  })

  it('keeps smart lists in one horizontally scrolling icon row', async () => {
    render(<TodoPanel />)
    await screen.findByLabelText('New todo')

    const strip = document.querySelector('.todo-smart-strip')!
    expect(strip.querySelectorAll('.todo-smart-chip')).toHaveLength(5)
    expect(strip.querySelectorAll('.todo-tree-icon')).toHaveLength(5)
  })

  it('separates status, density, and sort controls and gives Flagged and Priority distinct sort glyphs', async () => {
    await act(async () => render(<TodoPanel />))
    await screen.findByLabelText('New todo')

    const statusControl = screen.getByLabelText('Status and completed')
    expect(statusControl).not.toHaveClass('active')
    const density = screen.getByLabelText('Compact view')
    expect(density).toHaveAttribute('aria-pressed', 'true')
    expect(density).not.toHaveClass('active')
    const compactGlyph = density.querySelector('svg')?.innerHTML
    await act(async () => fireEvent.click(density))
    expect(density).toHaveAttribute('aria-pressed', 'false')
    expect(density).not.toHaveClass('active')
    expect(density.querySelector('svg')?.innerHTML).not.toBe(compactGlyph)
    const sortControl = screen.getByLabelText('Sort todos by')
    expect(sortControl.querySelectorAll('svg')).toHaveLength(2)
    await act(async () => fireEvent.click(sortControl))
    await waitFor(() => expect(store.mock.popovers).toHaveLength(1))
    await act(async () => render(<>{store.mock.popovers[0].node}</>))

    const flaggedPath = screen.getByRole('button', { name: 'Flagged' }).querySelector('path')?.getAttribute('d')
    const priorityPath = screen.getByRole('button', { name: 'Priority' }).querySelector('path')?.getAttribute('d')
    expect(flaggedPath).toContain('M4 15')
    expect(priorityPath).toBe('M6 20v-4M12 20V10M18 20V4')
    const fieldGlyphs = ['Due', 'Priority', 'Flagged', 'Updated', 'Created', 'Name'].map(
      (name) => screen.getByRole('button', { name }).querySelector('svg')?.innerHTML
    )
    expect(new Set(fieldGlyphs).size).toBe(6)
    const headingDirections = [...document.querySelectorAll('.todo-sort-heading .todo-sort-direction')]
      .map((button) => button.getAttribute('aria-label'))
    expect(headingDirections).toEqual(['Desc', 'Asc'])
    expect(screen.getByRole('button', { name: 'Desc' })).toHaveAttribute('aria-pressed', 'true')
    const asc = screen.getByRole('button', { name: 'Asc' })
    expect(asc.closest('.todo-sort-heading')).not.toBeNull()
    expect(asc).toHaveAttribute('aria-pressed', 'false')
    const headerSortGlyphs = sortControl.innerHTML
    await act(async () => fireEvent.click(asc))
    expect(asc).toHaveAttribute('aria-pressed', 'true')
    expect(sortControl.innerHTML).not.toBe(headerSortGlyphs)
  })

  it('uses explicit Hide completed and Show all choices', async () => {
    setup([
      { id: 'open', title: 'Survey meadow', completed: false } as DataRecord,
      { id: 'done', title: 'Catalog moss', completed: true } as DataRecord
    ])
    await act(async () => render(<TodoPanel />))
    await screen.findByText('Survey meadow')

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Status and completed' })))
    await waitFor(() => expect(store.mock.popovers.length).toBeGreaterThan(0))
    await act(async () => render(<>{store.mock.popovers.at(-1)?.node}</>))
    const hide = screen.getByRole('button', { name: 'Hide completed' })
    const show = screen.getByRole('button', { name: 'Show all' })
    expect(hide.closest('.todo-completed-row')).toContainElement(show)
    expect(hide).toHaveAttribute('aria-pressed', 'true')
    expect(show).toHaveAttribute('aria-pressed', 'false')
    expect(screen.queryByText('Catalog moss')).not.toBeInTheDocument()

    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Statuses' })))
    await waitFor(() => expect(store.mock.popovers).toHaveLength(2))
    await act(async () => render(<>{store.mock.popovers[1].node}</>))
    const statusMenu = within(document.querySelector('.todo-status-filter-menu') as HTMLElement)
    const completedStatus = statusMenu.getByRole('button', { name: 'Completed' })
    expect(completedStatus).toHaveAttribute('aria-pressed', 'false')

    await act(async () => fireEvent.click(show))
    expect(show).toHaveAttribute('aria-pressed', 'true')
    expect(completedStatus).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('Status and completed')).toHaveClass('active')
    expect(await screen.findByText('Catalog moss')).toBeInTheDocument()
    await act(async () => fireEvent.click(hide))
    expect(completedStatus).toHaveAttribute('aria-pressed', 'false')
    await waitFor(() => expect(screen.queryByText('Catalog moss')).not.toBeInTheDocument())

    await act(async () => fireEvent.click(completedStatus))
    expect(show).toHaveAttribute('aria-pressed', 'true')
    await act(async () => fireEvent.click(completedStatus))
    expect(hide).toHaveAttribute('aria-pressed', 'true')
  })

  it('selects several statuses and never allows an empty status selection', async () => {
    setup([
      { id: 'wait', title: 'Await bloom', completed: false, status: 'waiting' } as DataRecord,
      { id: 'hold', title: 'Pause survey', completed: false, status: 'onhold' } as DataRecord,
      { id: 'open', title: 'Collect sample', completed: false, status: 'open' } as DataRecord
    ], { statusFilter: ['waiting'] })
    render(<TodoPanel />)

    expect(await screen.findByText('Await bloom')).toBeInTheDocument()
    expect(screen.queryByText('Pause survey')).not.toBeInTheDocument()
    const tree = document.querySelector('.todo-tree')!
    const statusChip = tree.querySelector('.todo-status-chip')!
    expect(statusChip).toHaveTextContent('Status: Waiting')
    expect(statusChip.previousElementSibling).toHaveClass('todo-smart-strip')
    expect(statusChip.nextElementSibling).toBeNull()
    expect(document.querySelector('.todo-tree-group')).toBeNull()
    expect(screen.getByRole('button', { name: /^Groups/ })).toBeInTheDocument()
    expect(statusChip.querySelector('.todo-chip-clear')).not.toBeNull()
    expect(statusChip.lastElementChild).toHaveClass('todo-chip-clear')

    fireEvent.click(screen.getByRole('button', { name: 'Status and completed' }))
    await waitFor(() => expect(store.mock.popovers).toHaveLength(1))
    render(<>{store.mock.popovers[0].node}</>)
    fireEvent.click(screen.getByRole('button', { name: 'Statuses' }))
    await waitFor(() => expect(store.mock.popovers).toHaveLength(2))
    render(<>{store.mock.popovers[1].node}</>)

    fireEvent.click(screen.getByRole('button', { name: 'On Hold' }))
    expect(await screen.findByText('Pause survey')).toBeInTheDocument()
    expect(store.mock.api.settings.get().statusFilter).toEqual(['waiting', 'onhold'])

    fireEvent.click(screen.getByRole('button', { name: 'Waiting' }))
    await waitFor(() => expect(screen.queryByText('Await bloom')).not.toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: 'On Hold' }))
    expect(store.mock.api.settings.get().statusFilter).toEqual(['onhold'])
    expect(screen.getByText('Pause survey')).toBeInTheDocument()
  })

  it('preserves an inactive status on existing tasks but removes it from assignment menus', async () => {
    setup([
      { id: 'hold', title: 'Paused survey', completed: false, status: 'onhold' } as DataRecord
    ], {
      statuses: {
        active: ['inprogress', 'waiting', 'delegated', 'deferred', 'canceled'],
        colors: { onhold: 'palette:orange' }
      }
    })
    render(<TodoPanel />)

    expect(await screen.findByText('On Hold')).toBeInTheDocument()
    const checkbox = screen.getByLabelText('Complete Paused survey')
    vi.useFakeTimers()
    fireEvent.pointerDown(checkbox)
    act(() => vi.advanceTimersByTime(450))
    expect(store.mock.menus.at(-1)?.map((item) => item.label)).not.toContain('On Hold')
    fireEvent.pointerUp(checkbox)
  })

  it('nests a task when it is dragged onto another task', async () => {
    setup([
      { id: 'parent', title: 'Survey habitat', completed: false },
      { id: 'child', title: 'Photograph moss', completed: false }
    ] as DataRecord[])
    render(<TodoPanel />)

    const source = (await screen.findByText('Photograph moss')).closest('.todo-row')!
    const target = screen.getByText('Survey habitat').closest('.todo-row')!
    const dataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData: vi.fn()
    }
    fireEvent.dragStart(source.querySelector('.todo-title-md')!, { dataTransfer })
    fireEvent.dragOver(target, { dataTransfer })
    fireEvent.drop(target, { dataTransfer })

    await waitFor(() => expect(store.records.find((record) => record.id === 'child')).toMatchObject({
      parentId: 'parent'
    }))
  })

  it('paints every in-flight status on the checkbox and offers all eight on hold', async () => {
    setup([
      { id: 'todo', title: 'Write', completed: false, status: 'open' } as DataRecord,
      { id: 'prog', title: 'Drafting', completed: false, status: 'inprogress' } as DataRecord,
      { id: 'wait', title: 'Awaiting bloom', completed: false, status: 'waiting' } as DataRecord,
      { id: 'hold', title: 'Parked', completed: false, status: 'onhold' } as DataRecord,
      { id: 'deleg', title: 'Migrated sample', completed: false, status: 'delegated' } as DataRecord,
      { id: 'defer', title: 'Someday', completed: false, status: 'deferred' } as DataRecord
    ])
    render(<TodoPanel />)

    expect(await screen.findByLabelText('Complete Write')).toHaveAttribute('data-status', 'open')
    for (const [title, status] of [
      ['Drafting', 'inprogress'],
      ['Awaiting bloom', 'waiting'],
      ['Parked', 'onhold'],
      ['Migrated sample', 'delegated'],
      ['Someday', 'deferred']
    ] as const) {
      const el = screen.getByLabelText(`Complete ${title}`)
      expect(el).toHaveAttribute('data-status', status)
      // Only the two done statuses tick the box; the rest carry a glyph.
      expect(el).not.toBeChecked()
      expect(el.parentElement?.querySelector(`.todo-st-${status}`)).toBeInTheDocument()
    }

    const onHold = screen.getByLabelText('Complete Parked')
    vi.useFakeTimers()
    fireEvent.pointerDown(onHold)
    act(() => vi.advanceTimersByTime(450))
    expect(store.mock.menus.at(-1)?.map((item) => item.label)).toEqual([
      'To do', 'Completed', 'In Progress', 'Waiting', 'On Hold', 'Delegated', 'Deferred', 'Canceled'
    ])
    fireEvent.pointerUp(onHold)
  })

  it('ticks the box for completed and glyphs it for canceled', async () => {
    // Both are done statuses, so they live in the Completed list.
    store = installTodoNotes(
      [
        { id: 'complete', title: 'Sent', completed: true, status: 'completed' } as DataRecord,
        { id: 'cancel', title: 'Dropped', completed: true, status: 'canceled' } as DataRecord
      ],
      { panelChip: 'completed' }
    )
    render(<TodoPanel />)

    const completed = await screen.findByLabelText('Complete Sent')
    expect(completed).toHaveAttribute('data-status', 'completed')
    expect(completed).toBeChecked()

    const canceled = screen.getByLabelText('Complete Dropped')
    expect(canceled).toHaveAttribute('data-status', 'canceled')
    expect(canceled).not.toBeChecked()
    expect(canceled.parentElement?.querySelector('.todo-st-canceled')).toBeInTheDocument()
  })

  it('opens a dated row in Calendar without opening its linked file', async () => {
    setup([{
      id: 't1',
      title: 'Linked',
      completed: false,
      dueDate: '2026-08-12',
      startTime: '08:30',
      endTime: '10:00',
      filePath: 'Notes/A.md'
    } as DataRecord])
    const openDate = vi.fn()
    store.mock.provideInterop(CALENDAR_NAVIGATOR_V1, {
      id: 'calendar',
      labelKey: 'plugin.calendar.name',
      openDate
    } satisfies CalendarNavigator, 'calendar')
    store.mock.provideInterop(CALENDAR_ITEM_SOURCE_V2, { list: async () => ({ items: [], revision: 'fixture' }) }, 'todo')
    const sourceId = store.mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)
      .find((provider) => provider.owner === 'todo')?.providerId
    render(<TodoPanel />)
    const title = await screen.findByText('Linked')
    fireEvent.click(title)
    expect(openDate).toHaveBeenCalledWith({
      date: '2026-08-12',
      startTime: '08:30',
      endTime: '10:00',
      sourceId,
      itemId: 't1'
    })
    expect(store.mock.api.workspace.openFile).not.toHaveBeenCalled()
  })

  it('navigates from the row\u2019s own date, and only once', async () => {
    setup([{
      id: 't1',
      title: 'Linked',
      completed: false,
      dueDate: '2026-08-12',
      startTime: '08:30'
    } as DataRecord])
    const openDate = vi.fn()
    store.mock.provideInterop(CALENDAR_NAVIGATOR_V1, {
      id: 'calendar',
      labelKey: 'plugin.calendar.name',
      openDate
    } satisfies CalendarNavigator, 'calendar')
    store.mock.provideInterop(CALENDAR_ITEM_SOURCE_V2, { list: async () => ({ items: [], revision: 'fixture' }) }, 'todo')
    render(<TodoPanel />)

    // The date stops the click: the row would otherwise navigate a second time
    // for the same press.
    fireEvent.click(await screen.findByTitle('Show 12-08-2026 in the calendar'))

    expect(openDate).toHaveBeenCalledTimes(1)
    expect(openDate).toHaveBeenCalledWith(expect.objectContaining({ date: '2026-08-12', itemId: 't1' }))
  })

  it('opens a date-only row as an all-day Calendar selection', async () => {
    setup([{
      id: 't1', title: 'All day', completed: false, dueDate: '2026-08-12'
    } as DataRecord])
    const openDate = vi.fn()
    store.mock.provideInterop(CALENDAR_NAVIGATOR_V1, {
      id: 'calendar',
      labelKey: 'plugin.calendar.name',
      openDate
    } satisfies CalendarNavigator, 'calendar')
    store.mock.provideInterop(CALENDAR_ITEM_SOURCE_V2, { list: async () => ({ items: [], revision: 'fixture' }) }, 'todo')
    const sourceId = store.mock.api.interop.services.providers(CALENDAR_ITEM_SOURCE_V2)
      .find((provider) => provider.owner === 'todo')?.providerId
    render(<TodoPanel />)

    fireEvent.click(await screen.findByText('All day'))

    expect(openDate).toHaveBeenCalledWith({
      date: '2026-08-12',
      startTime: undefined,
      endTime: undefined,
      sourceId,
      itemId: 't1'
    })
    expect(store.mock.popovers).toHaveLength(0)
  })

  it('does not open Calendar for an undated row', async () => {
    setup([{ id: 't1', title: 'Someday', completed: false } as DataRecord])
    const openDate = vi.fn()
    store.mock.provideInterop(CALENDAR_NAVIGATOR_V1, {
      id: 'calendar',
      labelKey: 'plugin.calendar.name',
      openDate
    } satisfies CalendarNavigator, 'calendar')
    render(<TodoPanel />)

    fireEvent.click(await screen.findByText('Someday'))

    expect(openDate).not.toHaveBeenCalled()
    expect(store.mock.popovers).toHaveLength(0)
    expect(store.mock.api.workspace.openFile).not.toHaveBeenCalled()
  })

  it('does nothing for dated rows when Calendar is disabled', async () => {
    setup([{
      id: 't1', title: 'Dated but local', completed: false, dueDate: '2026-08-12'
    } as DataRecord])
    render(<TodoPanel />)

    fireEvent.click(await screen.findByText('Dated but local'))

    expect(store.mock.popovers).toHaveLength(0)
  })

  it('draws two file cards and expands the rest in place', async () => {
    // Seven files drew a 460px row that owned the whole sidebar at 259px.
    setup([{
      id: 't1',
      title: 'Wall',
      completed: false,
      filePath: 'Notes/A.md',
      attachments: ['Notes/B.md', 'Notes/C.md', 'Notes/D.md', 'Notes/E.md', 'Notes/F.md', 'Notes/G.md']
    } as DataRecord])
    await act(async () => render(<TodoPanel />))
    await showDetails()

    await screen.findByTitle('Notes/A.md')
    expect(document.querySelectorAll('.todo-file-card')).toHaveLength(3)
    expect(screen.queryByTitle('Notes/C.md')).not.toBeInTheDocument()

    await act(async () => fireEvent.click(screen.getByTitle('+5 more')))

    // The whole list, in the row — never the detail modal, which is the editor.
    expect(await screen.findByTitle('Notes/G.md')).toBeInTheDocument()
    expect(document.querySelectorAll('.todo-file-card')).toHaveLength(8)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(store.mock.api.workspace.openFile).not.toHaveBeenCalled()

    await act(async () => fireEvent.click(screen.getByTitle('Show less')))

    expect(document.querySelectorAll('.todo-file-card')).toHaveLength(3)
  })

  it('opens a linked file only from its explicit file card', async () => {
    setup([{
      id: 't1',
      title: 'Linked',
      completed: false,
      dueDate: '2026-08-12',
      filePath: 'Notes/A.md'
    } as DataRecord])
    const openDate = vi.fn()
    store.mock.provideInterop(CALENDAR_NAVIGATOR_V1, {
      id: 'calendar',
      labelKey: 'plugin.calendar.name',
      openDate
    } satisfies CalendarNavigator, 'calendar')
    await act(async () => render(<TodoPanel />))
    await showDetails()

    await act(async () => fireEvent.click(await screen.findByTitle('Notes/A.md')))

    expect(store.mock.api.workspace.openFile).toHaveBeenCalledWith('Notes/A.md', undefined, {
      newTab: false
    })
    expect(openDate).not.toHaveBeenCalled()
  })

  // ⌘-click on a file card must reach the host as an explicit new-tab open — a
  // plugin has no platform seam, so it asks `api.ui.hasModKey`.
  it('asks for a new tab when the file card is mod-clicked', async () => {
    setup([{
      id: 't1',
      title: 'Linked',
      completed: false,
      dueDate: '2026-08-12',
      filePath: 'Notes/A.md'
    } as DataRecord])
    await act(async () => render(<TodoPanel />))
    await showDetails()

    await act(async () => fireEvent.click(await screen.findByTitle('Notes/A.md'), { ctrlKey: true }))

    expect(store.mock.api.workspace.openFile).toHaveBeenCalledWith('Notes/A.md', undefined, {
      newTab: true
    })
  })

  it('offers icon-led group, priority, status, edit, and delete actions', async () => {
    setup([{
      id: 't1',
      title: 'Plan survey',
      completed: false,
      priority: 'normal',
      group: 'Fungi',
      status: 'open'
    } as DataRecord], { groups: [
      { id: 'group_fungi', name: 'Fungi', color: '#3b82f6' },
      { id: 'group_plants', name: 'Plants', color: '#22c55e' }
    ] })
    render(<TodoPanel />)
    await screen.findByText('Plan survey')

    fireEvent.click(screen.getByLabelText('Todo options'))
    const menu = store.mock.menus.at(-1) ?? []
    expect(menu.map((item) => item.label)).toEqual([
      'Status', 'Reschedule', 'Flag', 'Priority', 'Move to group',
      undefined, 'Indent', 'Outdent',
      undefined, 'Edit',
      undefined, 'Delete'
    ])
    expect(menu.filter((item) => item.type !== 'separator').every((item) => !!item.icon)).toBe(true)

    const move = menu.find((item) => item.label === 'Move to group')
    expect(move?.submenu?.map((item) => item.label)).toEqual(['No group', 'Fungi', 'Plants'])
    expect(move?.submenu?.find((item) => item.label === 'Fungi')?.checked).toBe(true)
    await act(async () => {
      await move?.submenu?.find((item) => item.label === 'Plants')?.onSelect?.()
    })
    await waitFor(() => expect(store.records[0]).toMatchObject({ group: 'Plants' }))

    const priority = menu.find((item) => item.label === 'Priority')
    const flag = menu.find((item) => item.label === 'Flag')
    expect(priority?.icon).not.toEqual(flag?.icon)
    const menuIcons = render(<>{flag?.icon}{priority?.icon}</>).container.querySelectorAll('svg')
    expect(menuIcons[0]?.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(menuIcons[0]?.querySelector('path')?.getAttribute('d')).toContain('M4 15')
    expect(menuIcons[1]?.getAttribute('viewBox')).toBe('0 0 192 512')
    expect(menuIcons[1]?.querySelector('path')?.getAttribute('d')).toContain('M176 432')
    expect(priority?.submenu?.map((item) => item.label)).toEqual(['None', 'Low', 'Medium', 'High'])
    await act(async () => {
      await priority?.submenu?.find((item) => item.label === 'High')?.onSelect?.()
    })
    await waitFor(() => expect(store.records[0]).toMatchObject({ priority: 'high' }))

    const status = menu.find((item) => item.label === 'Status')
    expect(status?.submenu?.map((item) => item.label)).toEqual([
      'To do', 'Completed', 'In Progress', 'Waiting', 'On Hold', 'Delegated', 'Deferred', 'Canceled'
    ])
    await act(async () => {
      await status?.submenu?.find((item) => item.label === 'On Hold')?.onSelect?.()
    })
    await waitFor(() => expect(store.records[0]).toMatchObject({ status: 'onhold', completed: false }))

    await act(async () => {
      await status?.submenu?.find((item) => item.label === 'Completed')?.onSelect?.()
    })
    await waitFor(() => expect(store.records[0]).toMatchObject({ status: 'completed', completed: true }))

    const deleteItem = menu.find((item) => item.label === 'Delete')
    expect(deleteItem).toMatchObject({ danger: true })
    vi.mocked(store.mock.api.ui.confirm).mockResolvedValueOnce('delete')
    await act(async () => {
      await deleteItem?.onSelect?.()
    })
    const confirmation = vi.mocked(store.mock.api.ui.confirm).mock.calls[0]?.[0]
    expect(confirmation).toMatchObject({
      title: 'Delete todo?',
      actions: [
        { label: 'Cancel', value: 'cancel', variant: 'ghost' },
        { label: 'Delete', value: 'delete', variant: 'danger' }
      ]
    })
    const message = render(<>{confirmation.message}</>)
    expect(message.container.textContent).toBe('Plan survey will be permanently deleted.')
    message.unmount()
    await waitFor(() => expect(store.records).toHaveLength(0))
  })

  /** Open a row's ⋯ menu and run its «Edit» entry. */
  async function editFromMenu(index = 0): Promise<void> {
    fireEvent.click(screen.getAllByLabelText('Todo options')[index])
    const edit = (store.mock.menus.at(-1) ?? []).find((item) => item.label === 'Edit')
    await act(async () => {
      await edit?.onSelect?.()
    })
  }

  it('edits in one modal and a second row replaces its subject', async () => {
    setup([
      { id: 't1', title: 'First', completed: false } as DataRecord,
      { id: 't2', title: 'Second', completed: false } as DataRecord
    ])
    render(<TodoPanel />)
    await screen.findByText('First')

    await editFromMenu(0)
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
    expect((screen.getByLabelText('Todo title') as HTMLInputElement).value).toBe('First')
    expect(store.mock.popovers).toHaveLength(0)

    await editFromMenu(1)
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
    expect((screen.getByLabelText('Todo title') as HTMLInputElement).value).toBe('Second')

    fireEvent.change(screen.getByLabelText('Todo title'), { target: { value: 'Second survey' } })
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(store.records.find((todo) => todo.id === 't2')?.title).toBe('Second survey'))
  })

  it('preserves an autosave draft when another surface changes the document', async () => {
    setup([{ id: 't1', title: 'Fern survey', note: 'Original', completed: false } as DataRecord])
    render(<TodoPanel />)
    await screen.findByText('Fern survey')
    await editFromMenu()
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'Local unsaved [[Ferns]]' } })
    await act(async () => {
      await store.mock.api.data.dataset('todo.tasks').update({ id: 't1' }, { note: 'External committed body' })
    })
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument(), { timeout: 2500 })
    expect(screen.getByLabelText('Note')).toHaveValue('Local unsaved [[Ferns]]')
    expect(store.records[0].note).toBe('External committed body')
  })

  it('opens the editor on a double-click, and never on a single one', async () => {
    setup([{ id: 't1', title: 'Plan survey', completed: false, dueDate: '2026-08-12' } as DataRecord])
    const openDate = vi.fn()
    store.mock.provideInterop(CALENDAR_NAVIGATOR_V1, {
      id: 'calendar',
      labelKey: 'plugin.calendar.name',
      openDate
    } satisfies CalendarNavigator, 'calendar')
    render(<TodoPanel />)
    const title = await screen.findByText('Plan survey')

    fireEvent.click(title)
    expect(openDate).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // The browser fires click twice before dblclick; the second one belongs to
    // the editor, so it must not navigate the Calendar again.
    fireEvent.click(title, { detail: 2 })
    fireEvent.doubleClick(title)
    expect(openDate).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
  })

  it('deletes from the editor through the same confirmation the row raises', async () => {
    setup([{ id: 't1', title: 'Plan survey', completed: false } as DataRecord])
    render(<TodoPanel />)
    await screen.findByText('Plan survey')
    await editFromMenu()

    vi.mocked(store.mock.api.ui.confirm).mockResolvedValueOnce('delete')
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    })

    expect(vi.mocked(store.mock.api.ui.confirm).mock.calls[0]?.[0]).toMatchObject({
      title: 'Delete todo?'
    })
    await waitFor(() => expect(store.records).toHaveLength(0))
    // The record is gone, so the editor that described it must be gone too.
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('opens the editor from the row, with the title the user typed', async () => {
    render(<TodoPanel />)
    await compose('Record habitat')
    await act(async () => {
      submitCompose()
    })
    await waitFor(() => expect(store.records).toHaveLength(1))

    await editFromMenu()
    const title = screen.getByLabelText('Todo title') as HTMLInputElement
    expect(title.value).toBe('Record habitat')
    // The host modal focuses this rather than its own ✕ — typing continues in
    // the field the user was already filling in.
    expect(title).toHaveAttribute('data-modal-initial-focus', 'true')
  })

  it('filters only from the mounted right Calendar panel selection', async () => {
    setup([
      { id: 'a', title: 'June four', completed: false, dueDate: '2026-06-04' } as DataRecord,
      { id: 'b', title: 'June five', completed: false, dueDate: '2026-06-05' } as DataRecord,
      { id: 'c', title: 'June nine', completed: false, dueDate: '2026-06-09' } as DataRecord
    ])
    render(<TodoPanel />)
    await screen.findByText('June four')

    await act(async () => store.mock.emitState({ selectedDate: '2026-06-04' }))
    expect(screen.getByText('June four')).toBeInTheDocument()
    expect(screen.getByText('June five')).toBeInTheDocument()
    expect(screen.getByText('June nine')).toBeInTheDocument()

    let offSelection = (): void => {}
    const publishSelection = (value: { selectedDate: string | null; rangeStart: string | null; rangeEnd: string | null } | null): void => {
      offSelection()
      offSelection = value
        ? store.mock.provideInterop(CALENDAR_PANEL_SELECTION_V1, value, 'calendar')
        : () => {}
    }

    await act(async () => publishSelection({
      selectedDate: '2026-06-05', rangeStart: null, rangeEnd: null
    }))
    expect(document.querySelectorAll('.todo-smart-strip .todo-smart-chip')).toHaveLength(1)
    expect(document.querySelector('.todo-smart-strip .todo-calendar-selection-chip')).toHaveTextContent('05-06-2026')
    expect(document.querySelector('.todo-due-chips .todo-date-chip')).toBeNull()
    expect(screen.queryByText('June four')).not.toBeInTheDocument()
    expect(screen.getByText('June five')).toBeInTheDocument()

    await act(async () => publishSelection({
      selectedDate: '2026-06-05', rangeStart: '2026-06-04', rangeEnd: '2026-06-05'
    }))
    expect(document.querySelector('.todo-calendar-selection-chip')).toHaveTextContent('04-06-2026 – 05-06-2026')
    expect(screen.getByText('June four')).toBeInTheDocument()
    expect(screen.getByText('June five')).toBeInTheDocument()
    expect(screen.queryByText('June nine')).not.toBeInTheDocument()

    await act(async () => publishSelection(null))
    expect(document.querySelectorAll('.todo-smart-strip .todo-smart-chip')).toHaveLength(5)
    expect(screen.getByText('June nine')).toBeInTheDocument()
  })

  it('sorts by due date by default: no-deadline first, then latest→oldest, priority breaking ties', async () => {
    setup([
      { id: 'far', title: 'Far away', completed: false, priority: 'normal', dueDate: '2026-06-20' } as DataRecord,
      { id: 'soonLow', title: 'Soon low', completed: false, priority: 'low', dueDate: '2026-06-10' } as DataRecord,
      { id: 'none', title: 'No deadline', completed: false, priority: 'normal', dueDate: '' } as DataRecord,
      { id: 'soonHigh', title: 'Soon high', completed: false, priority: 'high', dueDate: '2026-06-10' } as DataRecord
    ])
    render(<TodoPanel />)
    await screen.findByText('No deadline')
    const order = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent ?? '')
    expect(order.map((t) => t.replace(/^[!\s]+/, ''))).toEqual([
      'No deadline',
      'Far away',
      'Soon high',
      'Soon low'
    ])
  })

  it('breaks same-day ties by start time: timed chronological, untimed last', async () => {
    setup([
      { id: 'late', title: 'Evening', completed: false, priority: 'high', dueDate: '2026-06-09', startTime: '18:00' } as DataRecord,
      { id: 'noon', title: 'Afternoon', completed: false, priority: 'normal', dueDate: '2026-06-09', startTime: '13:15' } as DataRecord,
      { id: 'untimed', title: 'Whenever', completed: false, priority: 'high', dueDate: '2026-06-09' } as DataRecord,
      { id: 'morning', title: 'Morning', completed: false, priority: 'low', dueDate: '2026-06-09', startTime: '07:30' } as DataRecord
    ])
    render(<TodoPanel />)
    await screen.findByText('Morning')
    const order = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent ?? '')
    expect(order.map((t) => t.replace(/^[!\s]+/, ''))).toEqual([
      'Morning',
      'Afternoon',
      'Evening',
      'Whenever'
    ])
  })

  it('filters by #tag and narrows with multiple hashtags (AND)', async () => {
    setup([
      { id: 'a', title: 'Catalog fox tracks', completed: false, tags: ['animals', 'forest'] } as DataRecord,
      { id: 'b', title: 'Record morel habitat', completed: false, tags: ['fungi', 'forest'] } as DataRecord,
      { id: 'c', title: 'Review badger tracks', completed: false, tags: ['animals'] } as DataRecord
    ])
    render(<TodoPanel />)
    // The search field is permanent: the tree replaced the chip bar that used
    // to be worth the row it occupied.
    const search = await screen.findByLabelText('Search todos')

    fireEvent.change(search, { target: { value: '#animals' } })
    await waitFor(() => {
      const titles = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent ?? '')
      expect(titles).toEqual(['Catalog fox tracks', 'Review badger tracks'])
    })

    fireEvent.change(search, { target: { value: '#animals #forest' } })
    await waitFor(() => {
      const titles = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent ?? '')
      expect(titles).toEqual(['Catalog fox tracks'])
    })
  })
})

describe('attachment-linked To-Do panel', () => {
  it('opens the linked task editor in a modal', async () => {
    store = installTodoNotes([
      { id: 'linked', title: 'Inspect fern photo', completed: false, filePath: 'Images/Fern.png' } as DataRecord
    ], {}, {}, { activePath: 'Images/Fern.png' })
    render(<NoteTasksPanel />)
    fireEvent.doubleClick(await screen.findByText('Inspect fern photo'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText('Todo title')).toHaveValue('Inspect fern photo')
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('matches every file type through filePath or attachments using exact normalized paths', async () => {
    store = installTodoNotes([
      { id: 'new', title: 'Newest linked', completed: false, dueDate: '2026-10-02', filePath: 'Images/Fern.png' } as DataRecord,
      { id: 'old', title: 'Older linked', completed: false, dueDate: '2026-09-17', attachments: ['Images/Fern.png'] } as DataRecord,
      { id: 'near', title: 'Wrong file', completed: false, dueDate: '2026-12-01', attachments: ['Images/Fern.png.bak'] } as DataRecord,
      { id: 'done', title: 'Completed linked', completed: true, dueDate: '2026-11-01', filePath: 'Images/Fern.png' } as DataRecord
    ], {}, {}, { activePath: 'Images/Fern.png' })

    const { container } = render(<NoteTasksPanel />)
    expect(await screen.findByText('Newest linked')).toBeInTheDocument()
    expect(screen.getByText('Older linked')).toBeInTheDocument()
    expect(screen.queryByText('Wrong file')).not.toBeInTheDocument()
    expect(screen.queryByText('Completed linked')).not.toBeInTheDocument()
    expect(screen.getByText('To-Do')).toBeInTheDocument()
    expect(container.querySelector('.note-tasks-source')).toBeNull()
    expect(screen.queryByText('Fern.png')).not.toBeInTheDocument()
    expect([...container.querySelectorAll('.todo-panel-date-head')].map((node) => node.textContent)).toEqual([
      'October 2026',
      'September 2026'
    ])
    expect(container.querySelectorAll('.todo-date')).toHaveLength(2)
  })

  it('mirrors the left panel controls and keeps its group filter local', async () => {
    store = installTodoNotes([
      { id: 'fungi', title: 'Linked fungi', completed: false, group: 'Fungi', filePath: 'Images/Fern.png' } as DataRecord,
      { id: 'wildlife', title: 'Linked wildlife', completed: false, group: 'Wildlife', filePath: 'Images/Fern.png' } as DataRecord
    ], {
      groups: [
        { id: 'fungi', name: 'Fungi', color: 'palette:blue' },
        { id: 'wildlife', name: 'Wildlife', color: 'palette:yellow' }
      ]
    }, {}, { activePath: 'Images/Fern.png' })

    render(<NoteTasksPanel />)
    expect(await screen.findByText('Linked fungi')).toBeInTheDocument()
    expect(screen.getByText('Linked wildlife')).toBeInTheDocument()
    const groupsButton = screen.getByRole('button', { name: 'Groups' })
    expect(groupsButton.textContent).toBe('')
    expect(groupsButton.querySelector('svg')).toBeInTheDocument()
    expect(groupsButton).toHaveAttribute('title', 'Groups')
    expect(screen.getByRole('button', { name: 'Status and completed' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Compact view' })).not.toHaveClass('active')
    expect(screen.getByRole('button', { name: 'Sort todos by' }).querySelectorAll('svg')).toHaveLength(2)

    fireEvent.click(screen.getByRole('button', { name: 'Groups' }))
    await waitFor(() => expect(store.mock.popovers).toHaveLength(1))
    render(<>{store.mock.popovers[0].node}</>)
    fireEvent.click(screen.getByRole('button', { name: /^Fungi/ }))

    await waitFor(() => expect(screen.queryByText('Linked wildlife')).not.toBeInTheDocument())
    expect(groupsButton.textContent).toBe('')
    expect(groupsButton).toHaveClass('active')
    expect(store.mock.api.settings.get().attachmentPanelPresentation).toMatchObject({
      groupNames: ['Fungi'],
      includeUngrouped: false
    })
    expect(store.mock.api.settings.get().panelChip).toBeUndefined()
  })

  it('reconciles attachment completion without remounting or returning to Loading', async () => {
    store = installTodoNotes([{
      id: 'linked',
      title: 'Archive fern image',
      completed: false,
      filePath: 'Images/Fern.png',
      attachments: ['Images/Detail.png']
    } as DataRecord], {}, {}, { activePath: 'Images/Fern.png' })
    const finishRefresh = holdReconciliation()

    const { container } = render(<NoteTasksPanel />)
    const checkbox = await screen.findByLabelText('Complete Archive fern image')
    const shell = container.querySelector('.note-tasks-panel')
    const header = screen.getByText('To-Do').closest('.panel-header')

    fireEvent.click(checkbox)

    await waitFor(() => expect(screen.queryByText('Archive fern image')).not.toBeInTheDocument())
    expect(screen.queryByText('Loading todos')).not.toBeInTheDocument()
    expect(container.querySelector('.note-tasks-panel')).toBe(shell)
    expect(screen.getByText('To-Do').closest('.panel-header')).toBe(header)
    expect(store.mock.api.getState().activePath).toBe('Images/Fern.png')

    act(() => finishRefresh(store.records.map((record) => ({ ...record }))))
    await waitFor(() => expect(store.records[0]).toMatchObject({ completed: true }))
    expect(screen.queryByText('Loading todos')).not.toBeInTheDocument()
    expect(container.querySelector('.note-tasks-panel')).toBe(shell)
  })

  it('restores an attachment-linked row after a rejected completion write', async () => {
    store = installTodoNotes([{
      id: 'linked', title: 'Keep fern task', completed: false, filePath: 'Images/Fern.png'
    } as DataRecord], {}, {}, { activePath: 'Images/Fern.png' })
    overrideTransaction(vi.fn().mockRejectedValue(new Error('write failed')))
    render(<NoteTasksPanel />)

    fireEvent.click(await screen.findByLabelText('Complete Keep fern task'))

    expect(await screen.findByText('Keep fern task')).toBeInTheDocument()
    expect(screen.queryByText('Loading todos')).not.toBeInTheDocument()
    expect(store.records[0]).toMatchObject({ completed: false })
  })
})

describe('usePendingIds', () => {
  beforeEach(() => setup())

  it('tracks in-flight ids reactively and synchronously', () => {
    const { result } = renderHook(() => usePendingIds())
    expect(result.current.isPending('a')).toBe(false)
    act(() => result.current.setPending('a', true))
    expect(result.current.isPending('a')).toBe(true)
    expect(result.current.pendingIds.has('a')).toBe(true)
    act(() => result.current.setPending('a', false))
    expect(result.current.isPending('a')).toBe(false)
  })
})

describe('the calendar item source', () => {
  const todo = (over: Partial<DataRecord> = {}): DataRecord => ({
    id: 'todo-1',
    title: 'Prepare the introduction',
    completed: false,
    priority: 'normal',
    dueDate: '2026-08-24',
    note: '',
    tags: [],
    createdAt: '2026-08-14T06:00:00.000Z',
    updatedAt: '2026-08-14T06:00:00.000Z',
    ...over
  }) as DataRecord

  async function source(records: DataRecord[], settings: Record<string, unknown> = {}) {
    store = installTodoNotes(records, settings)
    const dispose = registerCalendarSource()
    const provider = store.mock.api.interop.services
      .providers(CALENDAR_ITEM_SOURCE_V2)
      .find((entry) => entry.owner === 'todo')!
    return { provider, dispose }
  }

  const GROUPS = {
    groups: [
      { id: 'group_top-three', name: 'Top Three', color: 'palette:primary-blue' },
      { id: 'group_next', name: 'Next', color: 'palette:yellow' }
    ]
  }

  it('preserves Calendar fields and coalesces relationship bursts without reading task history', async () => {
    const { provider, dispose } = await source([todo({
      group: 'Next', startTime: '09:00', endTime: '10:00', priority: 'high', status: 'waiting',
      tags: ['fern'], note: 'Survey [[Ferns]]', filePath: 'Notes/Ferns.md',
      urls: ['https://example.test/ferns'], attachments: ['Media/fern.png'],
      location: { name: 'Fen', lng: 8, lat: 47 },
      history: [{ startedAt: '2026-08-01T09:00:00.000Z', endedAt: '2026-08-01T09:10:00.000Z', activeMinutes: 10, pauseMinutes: 0 }],
      statusHistory: [{ from: 'open', to: 'waiting', changedAt: '2026-08-01T10:00:00.000Z' }]
    })], GROUPS)
    const dataset = store.mock.api.data.dataset
    const reads: string[] = []
    let holdNextTask: Promise<void> | null = null
    store.mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        reads.push(id)
        const held = id === 'todo.tasks' ? holdNextTask : null
        if (held) holdNextTask = null
        const result = await handle.query(query)
        await held
        return result
      } }
    }) as typeof dataset
    const reloads: ReturnType<typeof provider.invoke>[] = []
    const revisions = vi.fn(() => { reloads.push(provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])) })
    const off = store.mock.api.interop.state.subscribe(CALENDAR_ITEM_SOURCE_REVISION_V1, revisions)
    try {
      const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
      expect(result.ok && (result.value as { items: unknown[] }).items).toEqual([expect.objectContaining({
        id: 'todo-1', title: 'Prepare the introduction', date: '2026-08-24',
        startTime: '09:00', endTime: '10:00', priority: 'high', status: 'waiting', completed: false,
        tags: ['fern'], note: 'Survey [[Ferns]]', filePath: 'Notes/Ferns.md',
        urls: ['https://example.test/ferns'], attachments: ['Media/fern.png'],
        badges: ['note', 'attachment', 'link', 'location'], group: 'Next', color: 'palette:yellow',
        location: { name: 'Fen', lng: 8, lat: 47 }
      })])
      expect(reads).not.toContain('todo.focus_sessions')
      expect(reads).not.toContain('todo.status_history')
      let release!: () => void
      holdNextTask = new Promise<void>((resolve) => { release = resolve })
      const pending = provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
      for (let position = 1; position <= 20; position++) {
        await dataset('todo.status_history').insert({ taskId: 'todo-1', position, from: 'open', to: 'waiting', changedAt: '2026-08-01T10:00:00.000Z' })
      }
      await dataset('todo.task_tags').insert({ taskId: 'todo-1', tag: 'moss' })
      expect(revisions).toHaveBeenCalled()
      expect(reads.filter((id) => id === 'todo.tasks')).toHaveLength(2)
      release()
      const [updated] = await Promise.all([pending, ...reloads])
      expect(updated.ok && (updated.value as { items: unknown[] }).items).toEqual([expect.objectContaining({ tags: ['fern', 'moss'] })])
      expect(reads.filter((id) => id === 'todo.tasks')).toHaveLength(3)
      expect(reads).not.toContain('todo.focus_sessions')
      expect(reads).not.toContain('todo.status_history')
      await dataset('todo.tasks').update({ id: 'todo-1' }, { status: 'completed' })
      const completed = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
      expect(completed.ok && (completed.value as { items: unknown[] }).items).toEqual([expect.objectContaining({ completed: true, status: 'completed' })])
    } finally { off(); dispose() }
  })

  it('hands the calendar the colour of the todo’s group, so one task is one colour', async () => {
    const { provider, dispose } = await source([todo({ group: 'Next' })], GROUPS)
    const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    expect(result.ok && (result.value as { items: { color?: string }[] }).items[0].color).toBe('palette:yellow')
    dispose()
  })

  it('provides the owning document identity for contributed Markdown', async () => {
    const { provider, dispose } = await source([todo({ note: '[[Ferns]]', filePath: 'Notes/Ferns.md' })])
    const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    expect(result.ok && (result.value as { items: unknown[] }).items).toEqual([expect.objectContaining({
      documentRef: { pluginId: 'todo', sourceId: 'tasks', itemId: 'todo-1' },
      note: '[[Ferns]]', filePath: 'Notes/Ferns.md'
    })])
    dispose()
  })

  it('edits through the full task record after a history-free Calendar projection', async () => {
    const { provider, dispose } = await source([todo({
      history: [{ startedAt: '2026-08-01T09:00:00.000Z', endedAt: '2026-08-01T09:10:00.000Z', activeMinutes: 10, pauseMinutes: 0 }],
      statusHistory: [{ from: 'open', to: 'waiting', changedAt: '2026-08-01T10:00:00.000Z' }]
    })])
    const history = structuredClone(store.mock.datasets.get('todo.focus_sessions'))
    const statusHistory = structuredClone(store.mock.datasets.get('todo.status_history'))
    try {
      expect((await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])).ok).toBe(true)
      expect(await provider.invoke('update', ['todo-1', { note: 'Revised fern survey' }])).toMatchObject({ ok: true, value: true })
      expect(store.records[0].note).toBe('Revised fern survey')
      expect(store.mock.datasets.get('todo.focus_sessions')).toEqual(history)
      expect(store.mock.datasets.get('todo.status_history')).toEqual(statusHistory)
    } finally { dispose() }
  })

  it('validates contributed document references at the shared service boundary', () => {
    const valid = (items: unknown[]) => CALENDAR_ITEM_SOURCE_V2.serviceCalls!.list.result({ items, revision: 'fixture' })
    const item = { id: 't1', title: 'Ferns', date: '2026-06-08' }
    expect(valid([item])).toBe(true)
    expect(valid([{ ...item, documentRef: { pluginId: 'todo', sourceId: 'tasks', itemId: 't1' } }])).toBe(true)
    expect(valid([{ ...item, documentRef: { pluginId: 'todo', sourceId: 2, itemId: 't1' } }])).toBe(false)
    expect(valid([{ ...item, documentRef: { pluginId: 'todo', sourceId: 'tasks' } }])).toBe(false)
  })

  it('sends no colour for an ungrouped todo, leaving the calendar’s rules in charge', async () => {
    const { provider, dispose } = await source([todo()], GROUPS)
    const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    expect(result.ok && (result.value as { items: { color?: string }[] }).items[0].color).toBeUndefined()
    dispose()
  })

  it('lets an explicit per-task colour win over the group', async () => {
    const { provider, dispose } = await source([todo({ group: 'Next', color: '#abcdef' })], GROUPS)
    const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    expect(result.ok && (result.value as { items: { color?: string }[] }).items[0].color).toBe('#abcdef')
    dispose()
  })

  it('offers the note, every attachment and every link as menu entries', async () => {
    const { provider, dispose } = await source([
      todo({
        filePath: 'Valley/Valley - The Promise.md',
        attachments: ['Archive/Images/People/Steve Jobs 1984.jpg', 'Archive/Images/Braun.jpg']
      })
    ])
    const result = await provider.invoke('actions', ['todo-1'])
    const actions = result.ok ? (result.value as { id: string; submenu?: unknown[] }[]) : []
    expect(actions.map((a) => a.id)).toEqual(['open-todo', 'edit', 'open-note', 'open-attachment'])
    expect(actions.find((a) => a.id === 'open-attachment')?.submenu).toHaveLength(2)
    dispose()
  })

  it('badges what the todo carries, so a chip shows it without a right-click', async () => {
    const { provider, dispose } = await source([
      todo({
        filePath: 'Valley/Valley - The Promise.md',
        attachments: ['Archive/Images/Braun.jpg'],
        urls: ['https://example.org'],
        location: { name: 'Room 3' }
      })
    ])
    const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    const item = result.ok ? (result.value as { items: { badges?: string[] }[] }).items[0] : undefined
    expect(item?.badges).toEqual(['note', 'attachment', 'link', 'location'])
    dispose()
  })

  it('sends no badges at all for a todo that carries nothing', async () => {
    const { provider, dispose } = await source([todo()])
    const result = await provider.invoke('list', [{ startDate: '0001-01-01', endDate: '9999-12-31', limit: 256 }])
    const item = result.ok ? (result.value as { items: { badges?: string[] }[] }).items[0] : undefined
    expect(item?.badges).toBeUndefined()
    dispose()
  })

  it('leaves out a submenu it has nothing to put in', async () => {
    const { provider, dispose } = await source([todo()])
    const result = await provider.invoke('actions', ['todo-1'])
    const ids = result.ok ? (result.value as { id: string }[]).map((a) => a.id) : []
    expect(ids).toEqual(['open-todo', 'edit'])
    dispose()
  })

  it('opens an attachment by id, and refuses one the todo does not carry', async () => {
    const { provider, dispose } = await source([
      todo({ attachments: ['Archive/Images/People/Steve Jobs 1984.jpg'] })
    ])
    const ok = await provider.invoke('runAction', [
      'todo-1',
      'attachment:Archive/Images/People/Steve Jobs 1984.jpg'
    ])
    expect(ok.ok && ok.value).toBe(true)
    expect(store.mock.api.workspace.openFile).toHaveBeenCalledWith(
      'Archive/Images/People/Steve Jobs 1984.jpg'
    )

    // A forged id must not become an arbitrary file open.
    const bad = await provider.invoke('runAction', ['todo-1', 'attachment:.valley/secrets.json'])
    expect(bad.ok && bad.value).toBe(false)
    expect(store.mock.api.workspace.openFile).toHaveBeenCalledTimes(1)
    dispose()
  })

  it('reveals the panel instead of opening a file for "Open in To-Do"', async () => {
    const { provider, dispose } = await source([
      todo({ filePath: 'Valley/Valley - The Promise.md' })
    ])
    const result = await provider.invoke('runAction', ['todo-1', 'open-todo'])
    expect(result.ok && result.value).toBe(true)
    expect(store.mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('left_sidebar')
    expect(store.mock.api.workspace.openFile).not.toHaveBeenCalled()
    expect(revealRequestStore().get()).toMatchObject({ todoId: 'todo-1', mode: 'focus' })
    dispose()
  })

  it('opens the shared owning editor when the contributed action was Edit', async () => {
    const { provider, dispose } = await source([todo()])
    const contexts: unknown[] = []
    const NoteInput = store.mock.api.ui.NoteInput
    store.mock.api.ui.NoteInput = (props) => { contexts.push(props.context); return React.createElement(NoteInput, props) }
    render(<TodoPanel />)
    await screen.findByText('Prepare the introduction')
    await act(async () => { await provider.invoke('runAction', ['todo-1', 'edit']) })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(contexts.at(-1)).toMatchObject({ ref: { pluginId: 'todo', sourceId: 'tasks', itemId: 'todo-1' } })
    expect(store.mock.api.workspace.showProperties).not.toHaveBeenCalled()
    dispose()
  })

  it('offers safe links without a web navigator provider', async () => {
    const { provider, dispose } = await source([
      todo({ filePath: 'Valley/Valley - The Promise.md', urls: ['https://example.org/'] })
    ])
    const providers = store.mock.api.interop.services.providers
    store.mock.api.interop.services.providers = ((contract: { id: string }) => {
      if (contract.id === 'web.navigator') throw new Error('Plugin "todo" does not consume service web.navigator')
      return providers(contract as never)
    }) as typeof providers
    const result = await provider.invoke('actions', ['todo-1'])
    const ids = result.ok ? (result.value as { id: string }[]).map((a) => a.id) : []
    expect(ids).toEqual(['open-todo', 'edit', 'open-note', 'open-link'])
    store.mock.api.interop.services.providers = providers
    dispose()
  })

  it('declines an action it does not know', async () => {
    const { provider, dispose } = await source([todo()])
    const result = await provider.invoke('runAction', ['todo-1', 'nonsense'])
    expect(result.ok && result.value).toBe(false)
    dispose()
  })
})
