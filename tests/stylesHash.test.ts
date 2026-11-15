import { createHash } from 'node:crypto'
import { afterEach, describe, expect, it } from 'vitest'
import { injectStyles } from '../src/styles'

const EXPECTED_SHA256 = '8bf9123279a00f0123928cfdd7e5616575a5e66729861ed75a1ad59abbd8320e'
const EXPECTED_LENGTH = 105664

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
