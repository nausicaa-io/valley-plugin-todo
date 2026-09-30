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
})
