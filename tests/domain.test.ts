import { describe, expect, it, vi } from 'vitest'
import { createMockValleyApi } from '@valley/plugin-testkit'
import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { createTodoDomain } from '../src/domain'
import type { TodoRecord } from '../src/types'
import config from '../config.json'

const record = (): TodoRecord => ({ id: 'fern', title: 'Inspect fern', completed: false, priority: 'normal', dueDate: '', note: '', tags: ['plant'], createdAt: '2026-09-30T08:00:00.000Z', updatedAt: '2026-09-30T08:00:00.000Z' })
const setup = () => {
  const mock = createMockValleyApi({ manifest: { id: 'todo', datasets: config.datasets as unknown as ValleyPluginManifest['datasets'], noteDocuments: config.noteDocuments } })
  const publish = vi.fn(async (_event: string, _payload: unknown) => {})
  const domain = createTodoDomain(mock.api, publish)
  return { mock, publish, domain }
}

describe('headless To-Do owner', () => {
  it('commits and emits without a renderer, including one completion transition', async () => {
    const { domain, publish } = setup()
    await domain.append(record())
    expect(publish).toHaveBeenCalledWith('task.created', { record: expect.objectContaining({ id: 'fern', title: 'Inspect fern' }) })
    await domain.patch('fern', { completed: true, status: 'completed' })
    await domain.patch('fern', { completed: true, status: 'completed' })
    expect(publish.mock.calls.filter(([event]) => event === 'task.completed')).toHaveLength(1)
    expect((await domain.get('fern'))?.statusHistory).toHaveLength(1)
    await domain.dispose()
    await expect(domain.append({ ...record(), id: 'after-dispose' })).rejects.toThrow('stopped')
  })

  it('emits no event for failed or stale mutations and preserves the current record', async () => {
    const { domain, publish, mock } = setup()
    await domain.append(record())
    publish.mockClear()
    expect(await domain.update('fern', { ...record(), title: 'Stale' }, 'stale')).toEqual({ ok: false })
    expect(publish).not.toHaveBeenCalled()
    vi.spyOn(mock.api.documents, 'update').mockRejectedValueOnce(new Error('Conflict'))
    await expect(domain.update('fern', { ...record(), title: 'Rejected' })).rejects.toThrow('Conflict')
    expect((await domain.get('fern'))?.title).toBe('Inspect fern')
    expect(publish).not.toHaveBeenCalled()
  })

  it('serializes concurrent updates and preserves status history, notes, and relations', async () => {
    const { domain } = setup()
    await domain.append(record())
    await Promise.all([domain.patch('fern', { note: 'Updated note' }), domain.patch('fern', { completed: true, status: 'completed' })])
    expect(await domain.get('fern')).toMatchObject({ note: 'Updated note', tags: ['plant'], completed: true, statusHistory: [{ from: 'open', to: 'completed' }] })
  })

  it('writes back an exact snapshot without logging a transition only when asked to', async () => {
    const { domain } = setup()
    await domain.append(record())
    const before = (await domain.get('fern'))!
    await domain.patch('fern', { completed: true, status: 'completed' })
    const applied = (await domain.get('fern'))!
    expect(applied.statusHistory).toHaveLength(1)
    expect((await domain.update('fern', before, undefined, undefined, undefined, undefined, { exactStatusHistory: true })).ok).toBe(true)
    expect(await domain.get('fern')).toEqual({ ...before, updatedAt: expect.any(String) })
    expect((await domain.update('fern', applied, undefined, undefined, undefined, undefined, { exactStatusHistory: true })).ok).toBe(true)
    expect(await domain.get('fern')).toEqual({ ...applied, updatedAt: expect.any(String) })
    await domain.update('fern', before)
    expect((await domain.get('fern'))?.statusHistory?.map(({ from, to }) => ({ from, to }))).toEqual([{ from: 'open', to: 'completed' }, { from: 'completed', to: 'open' }])
  })

  it('uses the scoped action publisher and ignores reminder bookkeeping', async () => {
    const { domain, publish, mock } = setup()
    await domain.append(record())
    publish.mockClear()
    await domain.patch('fern', { reminderFiredAt: new Date().toISOString() })
    expect(publish).not.toHaveBeenCalled()
    const scoped = vi.fn(async () => {})
    await domain.patch('fern', { title: 'Scoped edit' }, mock.api, scoped)
    expect(publish).not.toHaveBeenCalled()
    expect(scoped).toHaveBeenCalledWith('task.updated', expect.objectContaining({ record: expect.objectContaining({ title: 'Scoped edit' }) }))
  })

  it('deletes only the exact reviewed task with a host record-revision fence', async () => {
    const { domain, mock } = setup()
    await domain.append(record())
    await domain.append({ ...record(), id: 'moss', title: 'Preserve moss' })
    const dataset = mock.api.data.dataset('todo.tasks'), originalDataset = mock.api.data.dataset.bind(mock.api.data)
    vi.spyOn(mock.api.data, 'dataset').mockImplementation(id => id === 'todo.tasks' ? dataset : originalDataset(id))
    const remove = vi.spyOn(dataset, 'delete'), baseline = await dataset.read({ id: 'fern' })
    expect(await domain.remove('fern', mock.api, 'stale')).toBe(false)
    expect(remove).not.toHaveBeenCalled()
    expect(await domain.remove('fern', mock.api, record().updatedAt)).toBe(true)
    expect(remove).toHaveBeenCalledWith({ id: 'fern' }, { expected: [{ dataset: 'todo.tasks', key: { id: 'fern' }, revision: baseline.revision }] })
    expect(await domain.get('fern')).toBeNull()
    expect((await domain.get('moss'))?.title).toBe('Preserve moss')
    expect((await mock.api.data.dataset('todo.task_tags').query({ where: { taskId: 'fern' } })).rows).toEqual([])
  })

  it('refuses a concurrent dataset edit after the timestamp read and before deletion', async () => {
    const { domain, mock } = setup()
    await domain.append(record())
    const dataset = mock.api.data.dataset('todo.tasks'), originalDataset = mock.api.data.dataset.bind(mock.api.data), originalDelete = dataset.delete.bind(dataset)
    vi.spyOn(mock.api.data, 'dataset').mockImplementation(id => id === 'todo.tasks' ? dataset : originalDataset(id))
    vi.spyOn(dataset, 'delete').mockImplementationOnce(async (key, options) => {
      await dataset.update({ id: 'fern' }, { title: 'Concurrent edit', updatedAt: '2026-09-30T08:01:00.000Z' })
      return originalDelete(key, options)
    })
    expect(await domain.remove('fern', mock.api, record().updatedAt)).toBe(false)
    expect(await domain.get('fern')).toMatchObject({ title: 'Concurrent edit', tags: ['plant'] })
  })

  it('preserves unknown deletion outcomes rather than treating them as stale refusals', async () => {
    const { domain, mock } = setup()
    await domain.append(record())
    const dataset = mock.api.data.dataset('todo.tasks'), originalDataset = mock.api.data.dataset.bind(mock.api.data), unknown = Object.assign(new Error('Acknowledgment lost'), { code: 'conflict', outcomeUnknown: true })
    vi.spyOn(mock.api.data, 'dataset').mockImplementation(id => id === 'todo.tasks' ? dataset : originalDataset(id))
    vi.spyOn(dataset, 'delete').mockRejectedValueOnce(unknown)
    await expect(domain.remove('fern', mock.api, record().updatedAt)).rejects.toBe(unknown)
  })
})
