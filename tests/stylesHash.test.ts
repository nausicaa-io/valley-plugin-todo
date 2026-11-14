import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it } from 'vitest'
import { injectStyles } from '../src/styles'

const EXPECTED_SHA256 = 'ff0f39bb5e8c718f3958ef0e60617200f8210e354082f3c11195439425d5f778'
const EXPECTED_LENGTH = 134525

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
