import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it } from 'vitest'
import { injectStyles } from '../src/styles'

const EXPECTED_SHA256 = '4412cfa15d79d1fc2a34883f5d1594233cf8dfc725ed2c3900448beb4d4426a0'
const EXPECTED_LENGTH = 107502

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
