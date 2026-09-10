import { describe, expect, it } from 'vitest'
import { priorityOptions } from '../src/sort'

describe('priorityOptions', () => {
  it('maps the normal priority to "None" and orders none → high', () => {
    expect(priorityOptions()).toEqual([
      { value: 'normal', label: 'None' },
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ])
  })
})
