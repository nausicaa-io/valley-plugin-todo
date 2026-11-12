import { describe, expect, it } from 'vitest'
import { noteLinkTargets } from '../src/noteLinks'

describe('note links', () => {
  it('lists embeds, wikilinks and web links once, without anchors or aliases', () => {
    const note = '![[fileTypes/documents/pdf/sample.pdf]]\nSee [[Projects/Field plan#Week 2|the plan]] and ![[fileTypes/documents/pdf/sample.pdf#page=3]].\n[Atlas](https://example.org/atlas/)'
    expect(noteLinkTargets(note)).toEqual([
      { target: 'fileTypes/documents/pdf/sample.pdf', label: 'sample.pdf', external: false },
      { target: 'Projects/Field plan', label: 'the plan', external: false },
      { target: 'https://example.org/atlas/', label: 'example.org/atlas', external: true }
    ])
    expect(noteLinkTargets('plain text only')).toEqual([])
  })
})
