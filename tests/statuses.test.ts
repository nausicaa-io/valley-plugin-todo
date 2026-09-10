import { describe, expect, it } from 'vitest'
import { isPaletteRef } from '@valley/plugin-sdk/palette'
import type { TodoStatus } from '@valley/plugin-sdk/types'
import {
  DONE_STATUSES,
  OPTIONAL_STATUSES,
  STATUSES,
  STATUS_DEFS,
  activeStatusDefs,
  effectiveStatus,
  normalizeStatusFilter,
  normalizeStatusSettings,
  parseTodoStatus,
  patchForStatus,
  statusDef,
  statusMenuOptions
} from '../src/statuses'
import { injectStyles } from '../src/styles'

describe('the status vocabulary', () => {
  it('is exactly the eight the app can set', () => {
    expect(STATUSES).toEqual([
      'open',
      'completed',
      'inprogress',
      'waiting',
      'onhold',
      'delegated',
      'deferred',
      'canceled'
    ])
  })

  it('gives every status but "open" a palette colour and a class', () => {
    // A reference, never a hex: the status scale must not follow the accent, but
    // it does follow the theme and the user's own `--color-*` overrides.
    for (const def of STATUS_DEFS) {
      expect(def.cls).toMatch(/^todo-st-/)
      expect(isPaletteRef(def.color), `${def.id}: ${def.color}`).toBe(true)
    }
  })

  it('uses a distinct colour per status, so two states never read alike', () => {
    const colors = STATUS_DEFS.filter((d) => d.color).map((d) => d.color)
    expect(new Set(colors).size).toBe(colors.length)
  })

  it('counts completed and canceled as done, and nothing else', () => {
    expect(DONE_STATUSES).toEqual(['completed', 'canceled'])
  })

  it('falls back to "open" for an unknown status rather than throwing', () => {
    expect(statusDef(undefined).id).toBe('open')
    expect(statusDef('nonsense' as TodoStatus).id).toBe('open')
  })
})

describe('parseTodoStatus', () => {
  it('passes every current status through unchanged', () => {
    for (const status of STATUSES) expect(parseTodoStatus(status)).toBe(status)
  })

  it('ignores retired, unknown, and malformed values at runtime', () => {
    for (const raw of ['active', 'paused', 'blocked', 'suspended', 'done', 'finished', 'moved', ' completed ', 'nonsense', '', 42, null, undefined, {}]) {
      expect(parseTodoStatus(raw)).toBeUndefined()
    }
  })
})

describe('patchForStatus', () => {
  it('clears the field for "to do" rather than storing open', () => {
    expect(patchForStatus(null)).toEqual({ completed: false, status: undefined })
    expect(patchForStatus('open')).toEqual({ completed: false, status: undefined })
  })

  it('sets the completed flag for exactly the done statuses', () => {
    for (const status of STATUSES) {
      if (status === 'open') continue
      expect(patchForStatus(status)).toEqual({
        completed: DONE_STATUSES.includes(status),
        status
      })
    }
  })
})

describe('effectiveStatus', () => {
  it('reads a bare completed flag as completed', () => {
    expect(effectiveStatus({ completed: true })).toBe('completed')
    expect(effectiveStatus({ completed: false })).toBe('open')
  })

  it('prefers an explicit status over the flag', () => {
    expect(effectiveStatus({ completed: true, status: 'canceled' })).toBe('canceled')
    expect(effectiveStatus({ completed: false, status: 'waiting' })).toBe('waiting')
  })
})

describe('status settings', () => {
  it('defaults to the six optional statuses and pins the locked pair first', () => {
    expect(normalizeStatusSettings(undefined).active).toEqual(OPTIONAL_STATUSES)
    expect(activeStatusDefs().slice(0, 2).map((status) => status.id)).toEqual(['open', 'completed'])
  })

  it('drops unknown and duplicate ids and rejects literals or missing palette references', () => {
    const settings = normalizeStatusSettings({
      active: ['waiting', 'nonsense', 'waiting', 'canceled'],
      colors: { waiting: '#123456', canceled: 'palette:missing-status-color', onhold: 'palette:orange' }
    })
    expect(settings.active).toEqual(['waiting', 'canceled'])
    expect(settings.colors.waiting).toBe('palette:yellow')
    expect(settings.colors.canceled).toBe('palette:red')
    expect(settings.colors.onhold).toBe('palette:orange')
    expect(settings.colors.open).toBe('palette:gray')
    expect(settings.colors.completed).toBe('palette:green')
  })

  it('migrates a scalar filter and prunes inactive selections', () => {
    expect(normalizeStatusFilter('waiting', ['open', 'completed', 'waiting'])).toEqual(['waiting'])
    expect(normalizeStatusFilter(['waiting', 'onhold'], ['open', 'completed', 'waiting'])).toEqual(['waiting'])
    expect(normalizeStatusFilter(['onhold'], ['open', 'completed', 'waiting'])).toBe('all')
  })
})

describe('statusMenuOptions', () => {
  it('offers every status, with "to do" as the clearing choice', () => {
    const options = statusMenuOptions()
    expect(options).toHaveLength(STATUSES.length)
    expect(options[0].status).toBeNull()
    expect(options.slice(1).map((o) => o.status)).toEqual(STATUSES.slice(1))
  })
})

describe('status chip styling', () => {
  it('gives inactive smart chips a surface and shares geometry with date and status chips', () => {
    const dispose = injectStyles()
    const css = document.getElementById('notes-todo-styles')?.textContent ?? ''
    expect(css).toContain('.todo-smart-chip,\n.todo-date-chip,\n.todo-status-chip')
    expect(css).toMatch(/\.todo-smart-chip,\n\.todo-date-chip,\n\.todo-status-chip \{[\s\S]*height: 28px;[\s\S]*padding: 0 10px;[\s\S]*font-size: var\(--small-font-size\)/)
    expect(css).toMatch(/\.todo-smart-chip \{[\s\S]*background: var\(--surface-color-alt\)/)
    expect(css).toMatch(/\.todo-page \{[\s\S]*background: var\(--surface-color-alt\)/)
    expect(css).toMatch(/\.todo-page-appbar \{[\s\S]*height: var\(--app-bar-height\)/)
    expect(css).toMatch(/\.todo-page-appbar-btn \{[\s\S]*width: 26px;[\s\S]*height: 26px;/)
    expect(css).toMatch(/\.todo-page \.todo-list-rows \{[\s\S]*border: 1px solid var\(--border-light\);[\s\S]*background: var\(--container-color\);[\s\S]*overflow: hidden;/)
    expect(css).toMatch(/\[data-theme='dark'\] \.note-tasks-panel \.todo-swipe-surface \{[\s\S]*background: #000;/)
    expect(css).not.toContain("[data-theme='dark'] .todo-panel .todo-swipe-surface")
    expect(css).toContain('.todo-status-visibility-zone.accepts-drop')
    expect(css).not.toContain('.todo-status-setting-add {')
    expect(css).toContain('.todo-smart-strip .todo-smart-chip .todo-tree-icon')
    expect(css).not.toContain('\n.todo-smart-chip .todo-tree-icon {')
    expect(css).toMatch(/\.todo-header-actions \.todo-menu-btn\.active \{\s*color: var\(--title-color\)/)
    expect(css).toMatch(/\.todo-header-actions \.todo-status-menu-btn\.active \{\s*color: var\(--accent-color\)/)
    expect(css).toMatch(/\.todo-completed-choices \{[\s\S]*display: grid;[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);[\s\S]*width: 100%;/)
    expect(css).toMatch(/\.todo-completed-row \{[\s\S]*align-items: stretch;[\s\S]*flex-direction: column;/)
    expect(css).toMatch(/\.todo-completed-choice \{[\s\S]*min-width: 0;[\s\S]*white-space: nowrap;/)
    expect(css).toMatch(/\.todo-sort-option\.active \{[\s\S]*color: var\(--title-color\)/)
    expect(css).toMatch(/\.todo-status-chip \.todo-chip-clear \{[\s\S]*margin-left: auto;[\s\S]*flex-basis: 16px/)
    expect(css).toMatch(/@keyframes todo-reveal-pulse \{[\s\S]*background-color: color-mix\(in srgb, var\(--accent-color\) 18%, transparent\)/)
    expect(css).toMatch(/\.todo-row\.todo-reveal-target \{\s*animation: todo-reveal-pulse/)
    dispose()
  })
})
