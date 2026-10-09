import { createMockValleyApi as createBaseMock } from '@valley/plugin-testkit'
import { createTodoDomain } from '../src/domain'
export * from '@valley/plugin-testkit'

export function createMockValleyApi(options: Parameters<typeof createBaseMock>[0] = {}) {
  const mock = createBaseMock(options)
  const domain = createTodoDomain(mock.api)
  const previous = mock.api.backend.call
  mock.api.backend.call = async <T>(method: string, payload?: unknown): Promise<T> => {
    const input = payload as Parameters<typeof domain.update>[1] & { record: Parameters<typeof domain.append>[0]; id: string; expectedUpdatedAt?: string; documentRevision?: Parameters<typeof domain.update>[3]; exactStatusHistory?: boolean }
    if (method === 'records.append') return await domain.append(input.record) as T
    if (method === 'records.update') return await domain.update(input.id, input.record, input.expectedUpdatedAt, input.documentRevision, undefined, undefined, { exactStatusHistory: input.exactStatusHistory === true }) as T
    if (method === 'records.delete') return await domain.remove(input.id) as T
    return previous<T>(method, payload)
  }
  return mock
}
