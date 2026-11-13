import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it } from 'vitest'
import { injectStyles } from '../src/styles'

const EXPECTED_SHA256 = 'daf78bf055ef16943f5b784da88248045d4cf7db36b6c2bd8273b26c214b51de'
const EXPECTED_LENGTH = 134489

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
