import { describe, expect, it, vi } from 'vitest'
import type { PluginBackendApi } from '@valley/plugin-sdk'
import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import { register } from '../src/backend/index'
import type { TodoRecord } from '../src/types'
import CONFIG from '../config.json'

const CLOSING = 'Plugin runtime is closing'

function deferred<T = void>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => { resolve = done })
  return { promise, resolve }
}

const flush = async (): Promise<void> => { for (let index = 0; index < 20; index++) await new Promise((resolve) => setTimeout(resolve, 0)) }

const task = (id: string, overrides: Partial<TodoRecord> = {}): TodoRecord => ({
  id, title: `Survey ${id}`, completed: false, priority: 'normal', dueDate: '', note: '', tags: [],
  createdAt: '2026-11-03T08:00:00.000Z', updatedAt: '2026-11-03T08:00:00.000Z', ...overrides
})

/**
 * A backend api over the testkit mock whose capability requests the host refuses
 * once the runtime is closing, the way `sandboxRuntime` does at quit. `requests`
 * lists every capability request the guest issued, `refused` the ones refused.
 */
function closingBackend(mock: MockValleyApi) {
  const state = { closing: false, requests: [] as string[], refused: [] as string[] }
  const handlers = new Map<string, (payload: unknown, context?: unknown) => unknown>()
  const gate = <A extends unknown[], R>(name: string, call: (...args: A) => Promise<R>) => (...args: A): Promise<R> => {
    state.requests.push(name)
    if (state.closing) { state.refused.push(name); return Promise.reject(new Error(CLOSING)) }
    return call(...args)
  }
  const data = mock.api.data
  const dataset = data.dataset.bind(data)
  const files = data.files
  const api = {
    ...mock.api,
    data: {
      ...data,
      dataset: (id: string) => {
        const handle = dataset(id)
        return {
          ...handle,
          query: gate(`${id}.query`, handle.query.bind(handle)),
          read: gate(`${id}.read`, handle.read.bind(handle)),
          get: gate(`${id}.get`, handle.get.bind(handle)),
          delete: gate(`${id}.delete`, handle.delete.bind(handle))
        }
      },
      transaction: gate('data.transaction', data.transaction.bind(data)),
      files: {
        ...files,
        readText: gate('files.readText', files.readText.bind(files)),
        readTextBaseline: gate('files.readTextBaseline', files.readTextBaseline.bind(files)),
        writeTextGuarded: gate('files.writeTextGuarded', files.writeTextGuarded.bind(files))
      }
    },
    documents: {
      ...mock.api.documents,
      read: gate('documents.read', mock.api.documents.read.bind(mock.api.documents)),
      update: gate('documents.update', mock.api.documents.update.bind(mock.api.documents))
    },
    notifications: {
      ...mock.api.notifications,
      schedule: gate('notifications.schedule', mock.api.notifications.schedule.bind(mock.api.notifications)),
      cancel: gate('notifications.cancel', mock.api.notifications.cancel.bind(mock.api.notifications)),
      onOccurrence: () => () => {}
    },
    services: { emit: gate('services.emit', async () => undefined) },
    lifecycle: { onResume: () => () => {} },
    i18n: { t: (key: string) => key },
    rpc: {
      handle: (method: string, handler: (payload: unknown) => unknown) => { handlers.set(method, handler); return () => handlers.delete(method) },
      handleOperation: (method: string, handler: (payload: unknown, context: unknown) => unknown) => { handlers.set(method, handler); return () => handlers.delete(method) },
      emit: vi.fn()
    }
  } as unknown as PluginBackendApi
  const call = (method: string, payload: unknown): Promise<unknown> => Promise.resolve().then(() => handlers.get(method)!(payload))
  return { api, state, call }
}

function setup() {
  const mock = createMockValleyApi({ manifest: { id: 'todo', datasets: CONFIG.datasets as unknown as ValleyPluginManifest['datasets'], noteDocuments: CONFIG.noteDocuments } })
  return { mock, ...closingBackend(mock) }
}

const stored = async (mock: MockValleyApi, id: string): Promise<boolean> => (await mock.api.data.dataset('todo.tasks').query({ where: { id }, limit: 1 })).rows.length === 1

describe('To-Do backend at quit (O72)', () => {
  it('stops cleanly when the closing runtime refuses a reminder reconcile already in flight', async () => {
    const { mock, api, state } = setup()
    const dispose = register(api)
    await flush()
    const due = new Date(Date.now() + 86_400_000)
    const date = `${due.getFullYear()}-${String(due.getMonth() + 1).padStart(2, '0')}-${String(due.getDate()).padStart(2, '0')}`
    const held = deferred()
    const schedule = mock.api.notifications.schedule.bind(mock.api.notifications)
    api.notifications.schedule = (async (...args: Parameters<typeof schedule>) => { state.requests.push('notifications.schedule'); await held.promise; return schedule(...args) }) as typeof api.notifications.schedule
    await mock.api.data.transaction([{ dataset: 'todo.tasks', operation: 'insert', values: { ...task('heron', { dueDate: date, startTime: '09:00' }), tags: undefined } as never }])
    await flush()
    expect(state.requests.at(-1)).toBe('notifications.schedule')
    state.closing = true
    const before = state.requests.length
    const stopped = dispose()
    held.resolve()
    await expect(stopped).resolves.toBeUndefined()
    expect(state.requests.slice(before)).toEqual([])
  })

  it('never loses an acknowledged write: in-flight writes finish, queued and later writes are refused without a request', async () => {
    const { mock, api, state, call } = setup()
    const dispose = register(api)
    await flush()
    expect(await call('records.append', { record: task('before') })).toBe(true)
    const held = deferred()
    const transaction = mock.api.data.transaction.bind(mock.api.data)
    api.data.transaction = (async (...args: Parameters<typeof transaction>) => { state.requests.push('data.transaction'); await held.promise; return transaction(...args) }) as typeof transaction
    const inFlight = call('records.append', { record: task('in-flight') }).then(() => true, () => false)
    await flush()
    const queued = call('records.append', { record: task('queued') }).then(() => true, () => false)
    await flush()
    const stopped = dispose()
    const after = call('records.append', { record: task('after') }).then(() => true, () => false)
    const requestsAtDispose = state.requests.length
    held.resolve()
    await stopped
    const outcomes = { 'in-flight': await inFlight, queued: await queued, after: await after }
    state.closing = false
    expect(outcomes).toEqual({ 'in-flight': true, queued: false, after: false })
    expect(state.requests.slice(requestsAtDispose).filter((name) => name !== 'services.emit')).toEqual([])
    for (const id of ['before', 'in-flight', 'queued', 'after']) expect(await stored(mock, id), id).toBe(id === 'before' || outcomes[id as keyof typeof outcomes])
  })

  it('reports a write the closing runtime refuses as failed and leaves no row behind', async () => {
    const { mock, api, state, call } = setup()
    const dispose = register(api)
    await flush()
    state.closing = true
    await expect(call('records.append', { record: task('refused') })).rejects.toThrow(CLOSING)
    await expect(dispose()).resolves.toBeUndefined()
    state.closing = false
    expect(await stored(mock, 'refused')).toBe(false)
  })
})
