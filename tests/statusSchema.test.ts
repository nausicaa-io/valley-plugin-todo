import { describe, expect, it } from 'vitest'
import config from '../config.json'
import { normalizeStatusSettings } from '../src/statuses'

describe('statuses settings schema', () => {
  it('accepts every key the plugin saves, so the host never rejects a save', () => {
    const field = (config.settingsSchema.fields as Array<{ key: string; schema?: { properties: Record<string, unknown>; additionalProperties?: boolean } }>).find((candidate) => candidate.key === 'statuses')!
    const saved = normalizeStatusSettings({ labels: { open: 'Inbox' }, icons: { waiting: 'clock' }, done: { waiting: true }, removed: ['deferred'] })
    expect(Object.keys(saved).filter((key) => !(key in field.schema!.properties))).toEqual([])
  })

  it('never keeps an icon for To do or Completed', () => {
    expect(normalizeStatusSettings({ icons: { open: 'star', completed: 'x', waiting: 'clock' } }).icons).toEqual({ waiting: 'clock' })
  })
})
