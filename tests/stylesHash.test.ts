import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it } from 'vitest'
import { injectStyles } from '../src/styles'

const EXPECTED_SHA256 = '945621966a128ff340912e8ab131ed234681f97ba81385986b5b403d567b85dc'
const EXPECTED_LENGTH = 133002

describe('plugin stylesheet', () => {
  afterEach(() => {
    document.getElementById('notes-todo-styles')?.remove()
  })

  it('injects the exact accepted CSS, in the accepted order', () => {
    injectStyles()
    const text = document.getElementById('notes-todo-styles')?.textContent ?? ''
    expect(text.length).toBe(EXPECTED_LENGTH)
    expect(createHash('sha256').update(text).digest('hex')).toBe(EXPECTED_SHA256)
  })
})
