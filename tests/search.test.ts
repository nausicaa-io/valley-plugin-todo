import { describe, expect, it } from 'vitest'
import { SEARCH_RESULT_CARD_V1 } from '@valley/plugin-sdk'
import { createMockValleyApi } from '@valley/plugin-testkit'
import { matchesSearch, parseSearch } from '../src/search'
import { registerSearchCard } from '../src/searchCard'

describe('parseSearch', () => {
  it('extracts #tags and leftover text', () => {
    expect(parseSearch('survey #moss spores #urgent')).toEqual({
      tags: ['moss', 'urgent'],
      text: 'survey spores'
    })
  })
  it('handles plain text only', () => {
    expect(parseSearch('record habitat')).toEqual({ tags: [], text: 'record habitat' })
  })
  it('handles tags only', () => {
    expect(parseSearch('#fungi')).toEqual({ tags: ['fungi'], text: '' })
  })
})

describe('matchesSearch', () => {
  it('matches a single #tag', () => {
    expect(matchesSearch('#fungi', ['fungi', 'survey'], 'title', 'note')).toBe(true)
    expect(matchesSearch('#plants', ['fungi'], 'title', 'note')).toBe(false)
  })
  it('requires every hashtag to match (AND)', () => {
    expect(matchesSearch('#fungi #survey', ['fungi', 'survey'], 't', 'n')).toBe(true)
    expect(matchesSearch('#fungi #survey', ['fungi'], 't', 'n')).toBe(false)
  })
  it('prefix-matches tags for incremental typing', () => {
    expect(matchesSearch('#fu', ['fungi'], 't', 'n')).toBe(true)
  })
  it('combines a tag with free text', () => {
    expect(matchesSearch('survey #plants', ['plants'], 'Survey habitat', '')).toBe(true)
    expect(matchesSearch('survey #plants', ['plants'], 'Other title', '')).toBe(false)
  })
  it('matches plain text against any text field unchanged', () => {
    expect(matchesSearch('moss', [], 'survey', 'moss run')).toBe(true)
    expect(matchesSearch('spores', [], 'survey', 'moss run')).toBe(false)
  })
  it('empty query matches everything', () => {
    expect(matchesSearch('', [], '', '')).toBe(true)
    expect(matchesSearch('   ', ['x'], 'a', 'b')).toBe(true)
  })
})

describe('search result card', () => {
  it('opens the owning item editor by its stable document reference', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)
    expect(await provider.extension.open({ id: 'todo-1', title: 'Unlinked task' }, {})).toBe(true)
    expect(mock.api.documents.open).toHaveBeenCalledWith({ pluginId: 'todo', sourceId: 'tasks', itemId: 'todo-1' })
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
  })
  it('forwards new-tab intent when it opens a linked file', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)

    expect(
      await provider.extension.open({ id: 'todo-1', filePath: 'Notes/Fungi.md' }, { newTab: true })
    ).toBe(true)
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith(
      'Notes/Fungi.md',
      undefined,
      { newTab: true }
    )
  })

  it('opens its workspace in a new tab for an unlinked todo dataset hit', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)

    expect(
      await provider.extension.open(
        { id: 'todo-1', title: 'Unlinked task' },
        { newTab: true }
      )
    ).toBe(true)
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
    expect(mock.api.workspace.openMainTab).toHaveBeenCalledWith({ newTab: true })
    expect(mock.api.workspace.revealOwnPanel).not.toHaveBeenCalled()
  })
})
