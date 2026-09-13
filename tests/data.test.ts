import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { installTodoNotes } from './mockTodoNotes'
import {
  appendTodo,
  deleteTodo,
  deleteTodoSubtree,
  loadTodo,
  loadTodos,
  logTodoSession,
  normalizeTodoUrl,
  setTodoStatus,
  updateTodo
} from '../src/data'
import type { TodoRecord, TodoSession } from '../src/types'

const NOW = '2026-06-01T12:00:00.000Z'

function todo(overrides: Partial<TodoRecord> = {}): TodoRecord {
  return {
    id: 'todo_test',
    title: 'Catalog fern specimen',
    completed: false,
    priority: 'normal',
    dueDate: '2026-06-05',
    note: '',
    tags: [],
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides
  }
}

describe('todo data layer', () => {
  beforeEach(() => installTodoNotes())

  it.each([999, 1000, 1001])('coalesces selected-task reads and loads every one of %i history rows without reading other tasks', async (count) => {
    const history = Array.from({ length: count }, (_, position) => ({ from: 'open' as const, to: 'waiting' as const, changedAt: new Date(Date.UTC(2026, 0, 1, 0, position)).toISOString() }))
    const { mock } = installTodoNotes([todo({ statusHistory: history }), todo({ id: 'unrelated', title: 'Other task', statusHistory: history })] as unknown as DataRecord[])
    const dataset = mock.api.data.dataset
    const reads: { id: string; where: unknown }[] = []
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => { reads.push({ id, where: query?.where }); return handle.query(query) } }
    }) as typeof dataset
    const results = await Promise.all(Array.from({ length: 20 }, () => loadTodo('todo_test')))
    expect(results.every((record) => record?.id === 'todo_test' && record.statusHistory?.length === count)).toBe(true)
    for (const read of reads) expect(read.where).toEqual(read.id === 'todo.tasks' ? { id: 'todo_test' } : { taskId: 'todo_test' })
    expect(reads.filter((read) => read.id === 'todo.tasks')).toHaveLength(1)
    expect(reads.filter((read) => read.id === 'todo.status_history')).toHaveLength(count > 1000 ? 2 : 1)
    expect(await loadTodo('missing')).toBeNull()
  })

  it('shares full reads during relationship bursts and returns the latest complete history', async () => {
    const { mock } = installTodoNotes([todo({ statusHistory: Array.from({ length: 1001 }, (_, position) => ({
      from: 'open', to: 'waiting', changedAt: new Date(Date.UTC(2026, 0, 1, 0, position)).toISOString()
    })) }) as unknown as DataRecord])
    const dataset = mock.api.data.dataset
    const reads: string[] = []
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        reads.push(id)
        const result = await handle.query(query)
        if (id === 'todo.tasks' && reads.filter((entry) => entry === id).length === 1) await held
        return result
      } }
    }) as typeof dataset
    const first = loadTodos()
    const consumers = Array.from({ length: 20 }, () => loadTodos())
    expect(consumers.every((pending) => pending === first)).toBe(true)
    await vi.waitFor(() => expect(reads.filter((id) => id === 'todo.status_history')).toHaveLength(2))
    await dataset('todo.status_history').insert({ taskId: 'todo_test', position: 1001, from: 'waiting', to: 'open', changedAt: NOW })
    await dataset('todo.task_tags').insert({ taskId: 'todo_test', tag: 'fern' })
    release()
    const results = await Promise.all([first, ...consumers])
    expect(results.every((value) => value === results[0])).toBe(true)
    expect(results[0][0].statusHistory).toHaveLength(1002)
    expect(results[0][0].tags).toEqual(['fern'])
    expect(reads.filter((id) => id === 'todo.tasks')).toHaveLength(2)
    expect(reads.filter((id) => id === 'todo.status_history')).toHaveLength(4)
  })

  it('retries a failed shared read without retaining a rejected request', async () => {
    const { mock } = installTodoNotes([todo() as unknown as DataRecord])
    const dataset = mock.api.data.dataset
    let fail = true
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (id === 'todo.tasks' && fail) { fail = false; throw new Error('Read unavailable') }
        return handle.query(query)
      } }
    }) as typeof dataset
    await expect(loadTodos()).rejects.toThrow('Read unavailable')
    expect(await loadTodos()).toMatchObject([{ id: 'todo_test' }])
  })

  it('assembles relationships by task without mixing owners and keeps persisted position order', async () => {
    const { mock } = installTodoNotes([
      todo({ id: 'fern', tags: ['fern'], urls: ['https://example.com/fern'], attachments: ['Fern.pdf'] }),
      todo({ id: 'moss', tags: ['moss'], urls: ['https://example.com/moss'], attachments: ['Moss.pdf'] })
    ] as unknown as DataRecord[])
    await mock.api.data.dataset('todo.task_links').insert({ taskId: 'fern', position: 2, url: 'https://example.com/third' })
    await mock.api.data.dataset('todo.task_links').insert({ taskId: 'fern', position: 1, url: 'https://example.com/second' })
    const result = await loadTodos()
    expect(result.find((item) => item.id === 'fern')).toMatchObject({ tags: ['fern'], attachments: ['Fern.pdf'], urls: ['https://example.com/fern', 'https://example.com/second', 'https://example.com/third'] })
    expect(result.find((item) => item.id === 'moss')).toMatchObject({ tags: ['moss'], attachments: ['Moss.pdf'], urls: ['https://example.com/moss'] })
  })

  it('commits note, tags and other fields through one revision-checked document update', async () => {
    const { mock } = installTodoNotes([todo() as unknown as DataRecord])
    const update = vi.spyOn(mock.api.documents, 'update')
    expect(await updateTodo('todo_test', todo({ title: 'Changed', note: '# Ferns', tags: ['botanik/äste'] }), NOW)).toBe(true)
    expect(update).toHaveBeenCalledWith({ pluginId: 'todo', sourceId: 'tasks', itemId: 'todo_test' }, expect.objectContaining({
      body: '# Ferns', explicitTags: ['botanik/äste'], expectedRevision: expect.any(Number), vaultGeneration: expect.any(Number)
    }))
    const operations = update.mock.calls[0][1].operations ?? []
    expect(operations.some((operation) => operation.dataset === 'todo.task_tags')).toBe(false)
    expect(operations.find((operation) => operation.dataset === 'todo.tasks')?.values).not.toHaveProperty('note')
    expect((await loadTodos())[0]).toMatchObject({ title: 'Changed', note: '# Ferns', tags: ['botanik/äste'] })
    expect(mock.undoActions).toHaveLength(1)
  })

  it('refuses stale editing state and keeps persisted notes intact after a failed save', async () => {
    const { mock } = installTodoNotes([todo() as unknown as DataRecord])
    const update = vi.spyOn(mock.api.documents, 'update')
    expect(await updateTodo('todo_test', todo({ note: 'Stale' }), 'older')).toBe(false)
    expect(update).not.toHaveBeenCalled()
    update.mockRejectedValue(new Error('Revision changed'))
    expect(await updateTodo('todo_test', todo({ note: 'Unsaved' }), NOW)).toBe(false)
    expect((await loadTodos())[0].note).toBe('')
  })

  it('pins the edit revision across autosaves and rejects later external relation changes', async () => {
    const { mock } = installTodoNotes([todo() as unknown as DataRecord])
    const ref = { pluginId: 'todo', sourceId: 'tasks', itemId: 'todo_test' }
    const baseline = (await mock.api.documents.read(ref))!
    const revision = { expectedRevision: baseline.revision, vaultGeneration: baseline.vaultGeneration }
    expect(await updateTodo('todo_test', todo({ note: 'First edit' }), NOW, revision)).toBe(true)
    expect(revision.expectedRevision).toBeGreaterThan(baseline.revision)
    const persisted = (await loadTodos())[0]
    expect(await updateTodo('todo_test', { ...persisted, note: 'Second edit' }, persisted.updatedAt, revision)).toBe(true)
    await mock.api.data.dataset('todo.task_tags').insert({ taskId: 'todo_test', tag: 'external' })
    expect(await updateTodo('todo_test', { ...(await loadTodos())[0], note: 'Stale draft' }, undefined, revision)).toBe(false)
    expect((await loadTodos())[0]).toMatchObject({ note: 'Second edit', tags: ['external'] })
  })

  it('appends, updates, and deletes todo records', async () => {
    installTodoNotes()
    expect(await appendTodo(todo())).toBe(true)
    expect(await loadTodos()).toHaveLength(1)

    expect(
      await updateTodo('todo_test', todo({ completed: true, priority: 'high', note: 'Plot three' }))
    ).toBe(true)
    expect((await loadTodos())[0]).toMatchObject({ completed: true, priority: 'high' })

    expect(await deleteTodo('todo_test')).toBe(true)
    expect(await loadTodos()).toEqual([])
  })

  it('rejects an empty title and strips unsafe file paths', async () => {
    installTodoNotes()
    expect(await appendTodo(todo({ id: 'todo_bad', title: '' }))).toBe(false)
    expect(await appendTodo(todo({ id: 'todo_safe', title: 'Safe', filePath: '../outside.md' }))).toBe(true)
    expect(await loadTodos()).toEqual([
      expect.objectContaining({ id: 'todo_safe', filePath: undefined })
    ])
  })

  // `normalizeTodoRecord` is a whitelist: a field it does not name is erased on
  // every read, so each one needs a round trip of its own.
  it('round-trips flag, urls, attachments and the reminder', async () => {
    installTodoNotes()
    await appendTodo(
      todo({
        flagged: true,
        urls: [
          'https://field.example.test/habitat-survey-9',
          'https://field.example.test/field-guide'
        ],
        attachments: ['Habitats/HabitatSurvey9.pdf', 'Habitats/FieldGuide.png'],
        remindAt: '2026-06-05T09:00'
      })
    )
    expect((await loadTodos())[0]).toMatchObject({
      flagged: true,
      urls: [
        'https://field.example.test/habitat-survey-9',
        'https://field.example.test/field-guide'
      ],
      attachments: ['Habitats/HabitatSurvey9.pdf', 'Habitats/FieldGuide.png'],
      remindAt: '2026-06-05T09:00'
    })
  })

  it('round-trips a geocoded location, and keeps a label with no fix', async () => {
    installTodoNotes()
    await appendTodo(todo({ location: { name: 'Alder Marsh Reserve', lng: 8.5476, lat: 47.3763 } }))
    await appendTodo(todo({ id: 'todo_labelled', location: { name: 'Fern Hollow' } }))
    const [placed, labelled] = await loadTodos()
    expect(placed.location).toEqual({ name: 'Alder Marsh Reserve', lng: 8.5476, lat: 47.3763 })
    // A typed-in place still stores when the Map plugin is off and there is no
    // geocoder to resolve it.
    expect(labelled.location).toEqual({ name: 'Fern Hollow' })
  })

  it('drops half a position rather than pinning a task to the equator', async () => {
    installTodoNotes()
    await appendTodo(todo({ id: 'somewhere', location: { name: 'Somewhere', lat: 47.3763 } } as never))
    await appendTodo(todo({ id: 'nowhere', location: { name: 'Nowhere', lng: 900, lat: 47 } } as never))
    await appendTodo(todo({ id: 'empty-place', location: { name: '   ' } } as never))
    const loaded = await loadTodos()
    expect(loaded[0].location).toEqual({ name: 'Somewhere' })
    expect(loaded[1].location).toEqual({ name: 'Nowhere' })
    expect(loaded[2].location).toBeUndefined()
  })

  it('drops a non-http url, an escaping attachment and a malformed reminder', async () => {
    installTodoNotes()
    await appendTodo(
      todo({
        urls: ['javascript:alert(1)', 'file:///etc/passwd'],
        attachments: ['../outside.pdf', 'Habitats/ok.pdf', 'Habitats/ok.pdf'],
        // A full ISO instant is not local wall clock — half-parsing it would
        // fire the reminder at the wrong hour.
        remindAt: '2026-06-05T09:00:00.000Z'
      })
    )
    expect((await loadTodos())[0]).toMatchObject({
      urls: undefined,
      attachments: ['Habitats/ok.pdf'],
      remindAt: undefined
    })
  })

  it('round-trips supported web and app links and rejects unknown or unsafe schemes', async () => {
    const supported = [
      'https://field.example.test/specimen',
      'http://field.example.test/specimen',
      'mailto:keeper@example.test',
      'obsidian://open?vault=Field&file=Specimen',
      'valley://open?file=Habitats%2FSpecimen.md'
    ]
    expect(supported.map(normalizeTodoUrl)).toEqual(supported)
    for (const unsafe of [
      'javascript:alert(1)',
      'file:///etc/passwd',
      'ftp://field.example.test/specimen',
      'valley://delete?file=Habitats%2FSpecimen.md',
      'not a url'
    ]) expect(normalizeTodoUrl(unsafe)).toBeUndefined()

    await appendTodo(todo({ urls: supported }))
    expect((await loadTodos())[0].urls).toEqual(supported)
  })

  it('loads only cutover task rows', async () => {
    const store = installTodoNotes([
      todo() as unknown as DataRecord,
      {
        id: 'old_mirror',
        title: 'Old mirrored checkbox',
        completed: false,
        source: { kind: 'markdown', path: 'Notes/A.md', marker: 'old', line: 2 }
      } as unknown as DataRecord
    ])

    expect((await loadTodos()).map((record) => record.id)).toEqual(['todo_test'])
    expect(store.records).toHaveLength(1)
  })

  it('makes canonical done statuses completed', async () => {
    installTodoNotes([
      { id: 'active', title: 'Active', completed: false, status: 'inprogress' },
      { id: 'done', title: 'Done', completed: false, status: 'completed' },
      { id: 'canceled', title: 'Canceled', completed: false, status: 'canceled' }
    ] as unknown as DataRecord[])

    expect(await loadTodos()).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'active', status: 'inprogress', completed: false }),
      expect.objectContaining({ id: 'done', status: 'completed', completed: true }),
      expect.objectContaining({ id: 'canceled', status: 'canceled', completed: true })
    ]))
  })

  it('deletes and restores a subtree through one undo action', async () => {
    const store = installTodoNotes([
      { ...todo({ id: 'parent' }), title: 'Parent' },
      { ...todo({ id: 'child', parentId: 'parent' }), title: 'Child' },
      { ...todo({ id: 'grandchild', parentId: 'child' }), title: 'Grandchild' }
    ] as unknown as DataRecord[])

    expect(await deleteTodoSubtree(['grandchild', 'child', 'parent'], 'Parent')).toBe(true)
    expect(store.records).toHaveLength(0)
    expect(store.mock.undoActions).toHaveLength(1)
    expect((await store.mock.undoActions[0].undo()).ok).toBe(true)
    expect(store.records.map((record) => record.id).sort()).toEqual(['child', 'grandchild', 'parent'])
  })

})

describe('logTodoSession', () => {
  const session: TodoSession = {
    startedAt: '2026-06-03T08:00:00.000Z',
    endedAt: '2026-06-03T10:15:00.000Z',
    activeMinutes: 135,
    pauseMinutes: 5
  }

  it('pushes the session into history and banks only active time', async () => {
    installTodoNotes([{ id: 't1', title: 'First task', completed: false, actualMinutes: 30 } as unknown as DataRecord])
    expect(await logTodoSession('t1', session)).toBe(true)

    const t1 = (await loadTodos()).find((t) => t.id === 't1')!
    expect(t1.history).toHaveLength(1)
    expect(t1.history?.[0]).toEqual(session)
    expect(t1.actualMinutes).toBe(165) // 30 existing + 135 active (pause not banked)
    expect(t1.completed).toBe(false)
    // Banking time is bookkeeping, not a state change — it used to stamp the
    // retired `suspended`, overwriting whatever the user had chosen.
    expect(t1.status).toBeUndefined()
  })

  it('leaves an explicit status alone when it banks time', async () => {
    installTodoNotes([
      { id: 't3', title: 'Third task', completed: false, status: 'waiting' } as unknown as DataRecord
    ])
    await logTodoSession('t3', session)
    expect((await loadTodos()).find((t) => t.id === 't3')?.status).toBe('waiting')
  })

  it('flips completed when opts.complete is set', async () => {
    installTodoNotes([{ id: 't2', title: 'Second task', completed: false } as unknown as DataRecord])
    await logTodoSession('t2', session, { complete: true })
    const t2 = (await loadTodos()).find((t) => t.id === 't2')!
    expect(t2.completed).toBe(true)
    expect(t2.actualMinutes).toBe(135)
    expect(t2.status).toBe('completed')
  })

  it('returns false for an unknown todo id', async () => {
    installTodoNotes()
    expect(await logTodoSession('nope', session)).toBe(false)
  })
})

describe('setTodoStatus', () => {
  it('persists a valid status and rejects unknown ids', async () => {
    installTodoNotes([{ id: 't1', title: 'First task', completed: false } as unknown as DataRecord])
    expect(await setTodoStatus('t1', 'delegated')).toBe(true)
    expect((await loadTodos()).find((t) => t.id === 't1')?.status).toBe('delegated')
    expect(await setTodoStatus('nope', 'delegated')).toBe(false)
  })

  it('records only status transitions and logs undo and redo as transitions', async () => {
    const store = installTodoNotes([{ id: 't1', title: 'First task', completed: false } as unknown as DataRecord])
    expect(await setTodoStatus('t1', 'delegated')).toBe(true)
    let record = (await loadTodos()).find((todo) => todo.id === 't1')!
    expect(record.statusHistory).toEqual([
      expect.objectContaining({ from: 'open', to: 'delegated', changedAt: expect.any(String) })
    ])

    await updateTodo('t1', { ...record, note: 'No status change' })
    record = (await loadTodos()).find((todo) => todo.id === 't1')!
    expect(record.statusHistory).toHaveLength(1)

    const action = store.mock.undoActions[0]
    expect((await action.undo()).ok).toBe(true)
    record = (await loadTodos()).find((todo) => todo.id === 't1')!
    expect(record.statusHistory?.map(({ from, to }) => ({ from, to }))).toEqual([
      { from: 'open', to: 'delegated' },
      { from: 'delegated', to: 'open' }
    ])
    expect(action.redo).toBeDefined()
    expect((await action.redo!()).ok).toBe(true)
    record = (await loadTodos()).find((todo) => todo.id === 't1')!
    expect(record.statusHistory?.map(({ from, to }) => ({ from, to }))).toEqual([
      { from: 'open', to: 'delegated' },
      { from: 'delegated', to: 'open' },
      { from: 'open', to: 'delegated' }
    ])
  })
})
