import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, createEvent, fireEvent, render, screen } from '@testing-library/react'
import { Profiler } from 'react'
import * as React from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { SwipeRow, type SwipeRowActions } from '../src/SwipeRow'
import { initRuntime } from '../src/runtime'
import { injectStyles } from '../src/styles'
import { createMockValleyApi } from '@valley/plugin-testkit'

/**
 * The row is 259px wide here, leaving 171px for a tray.
 *
 * Both trays hold three buttons — leading (a right-swipe, `.todo-swipe-tray-left`
 * at `left: 0`) Tomorrow / This weekend / Date & Time, trailing (a left-swipe,
 * `.todo-swipe-tray-right`) Flag / Details / Delete. Neither set spells itself
 * out in 171px, so both take the designed icons-only fallback of 3 × ICON_WIDTH
 * — a 144px detent either side, commit at 207px. Never clipped text: that is
 * what `trayLayout` is for. Those are the numbers every expectation below is
 * really about.
 */
const OPEN = 144
const OPEN_TRAILING = 144

const todo: TodoRecord = {
  id: 't1',
  title: 'Observe moss',
  completed: false,
  priority: 'normal',
  dueDate: '',
  note: '',
  tags: [],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z'
}

function setup(container?: HTMLElement): { actions: SwipeRowActions; root: HTMLDivElement } {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-08-26T12:00:00'))
  const mock = createMockValleyApi({ manifest: { id: 'todo' } })
  initRuntime(mock.api)
  const actions: SwipeRowActions = {
    reschedule: vi.fn(),
    pickDate: vi.fn(),
    setStatus: vi.fn(),
    toggleFlag: vi.fn(),
    openDetails: vi.fn(),
    remove: vi.fn()
  }
  render(
    <SwipeRow todo={todo} disabled={false} actions={actions}>
      <div>Observe moss</div>
    </SwipeRow>,
    { container }
  )
  const root = (container ?? document).querySelector('.todo-swipe') as HTMLDivElement
  Object.defineProperty(root, 'clientWidth', { configurable: true, value: 259 })
  root.setPointerCapture = vi.fn()
  return { actions, root }
}

/**
 * `timeStamp` is pinned explicitly rather than left to the clock: the gesture
 * now reads velocity off it, so a test that let jsdom fill it in would be
 * asserting on whatever the machine happened to be doing.
 */
function pointer(
  type: 'pointerDown' | 'pointerMove' | 'pointerUp',
  target: HTMLElement,
  init: { pointerId: number; clientX: number; clientY: number; button?: number; t?: number }
): void {
  // `t` is never 0: React swaps a falsy nativeEvent.timeStamp for Date.now().
  const event = createEvent[type](target, init)
  Object.defineProperty(event, 'pointerId', { value: init.pointerId })
  Object.defineProperty(event, 'clientX', { value: init.clientX })
  Object.defineProperty(event, 'clientY', { value: init.clientY })
  Object.defineProperty(event, 'button', { value: init.button ?? 0 })
  Object.defineProperty(event, 'timeStamp', { value: init.t ?? 1 })
  fireEvent(target, event)
}

function wheel(target: HTMLElement, init: { deltaX: number; t?: number }): Event {
  const event = createEvent.wheel(target, { deltaX: init.deltaX, deltaY: 0, cancelable: true })
  Object.defineProperty(event, 'timeStamp', { value: init.t ?? 1 })
  fireEvent(target, event)
  return event
}

/** Run the settle spring to rest. */
function settle(): void {
  act(() => vi.advanceTimersByTime(3000))
}

const transformOf = (root: HTMLElement): string =>
  (root.querySelector('.todo-swipe-surface') as HTMLElement).style.transform

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('SwipeRow', () => {
  describe('transparent surfaces', () => {
    let disposeStyles: () => void

    beforeEach(() => {
      disposeStyles = injectStyles()
    })

    afterEach(() => {
      disposeStyles()
      delete document.documentElement.dataset.theme
    })

    it.each(['dark', 'light'])('hides resting actions independently of the %s row background', (mode) => {
      document.documentElement.dataset.theme = mode
      const { root } = setup()
      const surface = root.querySelector('.todo-swipe-surface') as HTMLElement
      surface.style.backgroundColor = 'rgba(120, 190, 200, 0.2)'

      pointer('pointerDown', root, { pointerId: 1, clientX: 0, clientY: 0 })
      pointer('pointerMove', root, { pointerId: 1, clientX: 7, clientY: 0 })
      pointer('pointerUp', root, { pointerId: 1, clientX: 7, clientY: 0 })

      for (const tray of root.querySelectorAll<HTMLElement>('.todo-swipe-tray')) {
        expect(tray.style.width).toBe(`${OPEN}px`)
        expect(tray).toHaveAttribute('aria-hidden', 'true')
        expect(getComputedStyle(tray).visibility).toBe('hidden')
        expect(getComputedStyle(tray).pointerEvents).toBe('none')
        for (const button of tray.querySelectorAll('button')) {
          expect(button).not.toBeVisible()
          expect(button.tabIndex).toBe(-1)
        }
      }
      expect(screen.queryAllByRole('button')).toHaveLength(0)
      expect(getComputedStyle(surface).backgroundColor).toBe('rgba(120, 190, 200, 0.2)')
      expect(transformOf(root)).toBe('')
    })

    it.each([
      { direction: 1, side: 'left', label: 'Tomorrow', action: 'reschedule' },
      { direction: -1, side: 'right', label: 'Flag', action: 'toggleFlag' }
    ] as const)('reveals only the $side tray during a swipe and hides it after its action', ({ direction, side, label, action }) => {
      const { root, actions } = setup()
      const active = root.querySelector(`.todo-swipe-tray-${side}`) as HTMLElement
      const inactive = root.querySelector(`.todo-swipe-tray-${side === 'left' ? 'right' : 'left'}`) as HTMLElement

      pointer('pointerDown', root, { pointerId: 1, clientX: 0, clientY: 0, t: 1 })
      pointer('pointerMove', root, { pointerId: 1, clientX: direction * 120, clientY: 0, t: 401 })
      expect(getComputedStyle(active).visibility).toBe('visible')
      expect(getComputedStyle(active).pointerEvents).not.toBe('none')
      expect(getComputedStyle(inactive).visibility).toBe('hidden')
      expect(getComputedStyle(inactive).pointerEvents).toBe('none')
      pointer('pointerUp', root, { pointerId: 1, clientX: direction * 120, clientY: 0, t: 401 })
      settle()

      const button = screen.getByRole('button', { name: label })
      expect(button).toBeVisible()
      fireEvent.click(button)
      expect(actions[action]).toHaveBeenCalledTimes(1)
      settle()

      expect(transformOf(root)).toBe('')
      expect(getComputedStyle(active).visibility).toBe('hidden')
      expect(getComputedStyle(active).pointerEvents).toBe('none')
      expect(screen.queryAllByRole('button')).toHaveLength(0)
    })

    it('hides both trays again after a trackpad nudge springs closed', () => {
      const { root } = setup()
      const leading = root.querySelector('.todo-swipe-tray-left') as HTMLElement
      wheel(root, { deltaX: -64 })
      expect(getComputedStyle(leading).visibility).toBe('visible')
      settle()
      expect(transformOf(root)).toBe('')
      for (const tray of root.querySelectorAll('.todo-swipe-tray')) {
        expect(getComputedStyle(tray).visibility).toBe('hidden')
        expect(getComputedStyle(tray).pointerEvents).toBe('none')
      }
    })
  })

  it('ignores sub-threshold and vertical movement', () => {
    const { actions, root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 7, clientY: 0 })
    pointer('pointerUp', root, { pointerId: 1, clientX: 7, clientY: 0 })
    expect(actions.reschedule).not.toHaveBeenCalled()

    pointer('pointerDown', root, { pointerId: 2, button: 0, clientX: 0, clientY: 0 })
    pointer('pointerMove', root, { pointerId: 2, clientX: 20, clientY: 30 })
    pointer('pointerUp', root, { pointerId: 2, clientX: 20, clientY: 30 })
    expect(actions.reschedule).not.toHaveBeenCalled()
  })

  it('refuses to fire on a full swipe from closed, and resists at the open detent', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 240, clientY: 0, t: 41 })
    // Resistance starts at the open detent, not most of the way across the row.
    const held = Number(/translate3d\((-?[\d.]+)px/.exec(transformOf(root))?.[1])
    expect(held).toBeGreaterThan(OPEN)
    expect(held).toBeLessThan(OPEN + 40)
    expect(root.className).not.toContain('committed')

    pointer('pointerUp', root, { pointerId: 1, clientX: 240, clientY: 0, t: 41 })
    expect(actions.reschedule).not.toHaveBeenCalled()
    settle()
    expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)
  })

  it('commits on a second full swipe from the already-open row', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 240, clientY: 0, t: 41 })
    pointer('pointerUp', root, { pointerId: 1, clientX: 240, clientY: 0, t: 41 })
    settle()

    pointer('pointerDown', root, { pointerId: 2, button: 0, clientX: 0, clientY: 0, t: 100 })
    pointer('pointerMove', root, { pointerId: 2, clientX: 60, clientY: 0, t: 140 })
    expect(root.className).not.toContain('committed')

    pointer('pointerMove', root, { pointerId: 2, clientX: 240, clientY: 0, t: 180 })
    expect(root.className).toContain('committed')
    expect(root.querySelector('.todo-swipe-tray-left')?.className).toContain('committed')

    pointer('pointerUp', root, { pointerId: 2, clientX: 240, clientY: 0, t: 180 })
    expect(actions.reschedule).toHaveBeenCalledTimes(1)
  })

  it('throws the row open on a short fast flick', () => {
    vi.useFakeTimers()
    const { root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 30, clientY: 0, t: 21 })
    pointer('pointerUp', root, { pointerId: 1, clientX: 30, clientY: 0, t: 21 })
    settle()
    expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)
  })

  it('closes the same travel when it was placed slowly instead of thrown', () => {
    vi.useFakeTimers()
    const { root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 30, clientY: 0, t: 501 })
    pointer('pointerUp', root, { pointerId: 1, clientX: 30, clientY: 0, t: 501 })
    settle()
    expect(transformOf(root)).toBe('')
  })

  it('rests on the open detent and nowhere in between', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
    pointer('pointerUp', root, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
    settle()
    expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)
    expect(actions.reschedule).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Tomorrow' }))
    expect(actions.reschedule).toHaveBeenCalledTimes(1)
  })

  it('springs a short trackpad nudge back closed', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    const event = wheel(root, { deltaX: -64 })
    expect(event.defaultPrevented).toBe(true)
    act(() => vi.advanceTimersByTime(140))
    expect(actions.reschedule).not.toHaveBeenCalled()
    settle()
    expect(transformOf(root)).toBe('')
  })

  it('sticks a longer trackpad swipe open', () => {
    vi.useFakeTimers()
    const { root } = setup()
    wheel(root, { deltaX: -100 })
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)
  })

  it('cancels horizontal wheel input before the engagement threshold', () => {
    const { root } = setup()
    const event = wheel(root, { deltaX: 3 })
    expect(event.defaultPrevented).toBe(true)
  })

  it('commits the outermost trailing action only on a second trackpad swipe', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    wheel(root, { deltaX: 240 })
    act(() => vi.advanceTimersByTime(140))
    expect(actions.remove).not.toHaveBeenCalled()
    settle()
    expect(transformOf(root)).toBe(`translate3d(-${OPEN_TRAILING}px, 0, 0)`)

    wheel(root, { deltaX: 240, t: 500 })
    act(() => vi.advanceTimersByTime(140))
    expect(actions.remove).toHaveBeenCalledTimes(1)
  })

  it('offers Flag on the trailing side only, and never as a full-swipe commit', () => {
    const { actions, root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 20, clientY: 0, t: 10 })

    const trailing = root.querySelector('.todo-swipe-tray-right') as HTMLElement
    const leading = root.querySelector('.todo-swipe-tray-left') as HTMLElement
    // Three each side. Flag belongs to the trailing tray; the leading one stays
    // purely about rescheduling.
    expect([...trailing.querySelectorAll('.todo-swipe-action')].map((b) => b.className))
      .toEqual([
        'todo-swipe-action todo-swipe-flag',
        'todo-swipe-action todo-swipe-details',
        'todo-swipe-action todo-swipe-delete'
      ])
    expect(leading.querySelector('.todo-swipe-flag')).toBeNull()

    // Flag leads, so Delete stays the button at the row's own edge and a full
    // trailing swipe still means Delete — never a silent flag instead.
    ;(trailing.querySelector('.todo-swipe-flag') as HTMLElement).click()
    expect(actions.toggleFlag).toHaveBeenCalledTimes(1)
    expect(actions.remove).not.toHaveBeenCalled()
  })

  it('parks on the detent when trackpad momentum takes over, and never commits', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    // Opened first, so the row is armed and momentum is the only thing left
    // standing between a coasting trackpad and a deleted todo.
    wheel(root, { deltaX: 240 })
    act(() => vi.advanceTimersByTime(140))
    settle()

    // The fingers push a little and lift well short of the threshold. What
    // follows is what a trackpad actually sends: a long, monotonically decaying
    // tail — dozens of frames that together would walk the row a hundred pixels
    // past the commit point. It is absorbed at the detent instead.
    const push = [7, 11, 10, 9, 8, 6, 4]
    const tail = Array.from({ length: 40 }, (_, i) => Math.max(1, 3 - Math.floor(i / 15)))
    ;[...push, ...tail].forEach((deltaX, i) => wheel(root, { deltaX, t: 500 + i * 16 }))
    act(() => vi.advanceTimersByTime(140))
    expect(actions.remove).not.toHaveBeenCalled()
    settle()
    expect(transformOf(root)).toBe(`translate3d(-${OPEN_TRAILING}px, 0, 0)`)
  })

  it('lands a trackpad full swipe whose threshold was crossed before the coast', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    wheel(root, { deltaX: 240 })
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(actions.remove).not.toHaveBeenCalled()

    // Fingers push past the commit point, then lift. Every real trackpad swipe
    // leaves a tail like this, so refusing it outright would make a full swipe
    // unreachable on a trackpad.
    const frames = [30, 50, 70, 50, 35, 22, 14, 8, 4]
    frames.forEach((deltaX, i) => wheel(root, { deltaX, t: 500 + i * 16 }))
    act(() => vi.advanceTimersByTime(140))
    expect(actions.remove).toHaveBeenCalledTimes(1)
  })

  it.each([false, true])('closes immediately on an owning-window resize (iframe: %s)', (nested) => {
    const frame = nested ? document.createElement('iframe') : null
    if (frame) document.body.append(frame)
    const container = frame?.contentDocument!.body.appendChild(frame.contentDocument!.createElement('div'))
    // vitest.setup stubs ResizeObserver as a no-op; this one hands back its
    // callback so the resize can actually be fired.
    const observers: ResizeObserverCallback[] = []
    const real = globalThis.ResizeObserver
    class Fake {
      constructor(private readonly cb: ResizeObserverCallback) {
        observers.push(cb)
      }
      // A real ResizeObserver reports once on observe; the component uses that
      // first call to learn the width it is starting from.
      observe(): void {
        this.cb([], this as unknown as ResizeObserver)
      }
      disconnect(): void {}
      unobserve(): void {}
    }
    if (frame) Object.defineProperty(frame.contentWindow, 'ResizeObserver', { value: Fake })
    else globalThis.ResizeObserver = Fake as unknown as typeof ResizeObserver
    try {
      vi.useFakeTimers()
      const { root } = setup(container)
      pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
      pointer('pointerMove', root, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
      pointer('pointerUp', root, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
      settle()
      expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)

      Object.defineProperty(root, 'clientWidth', { configurable: true, value: 520 })
      act(() => observers.forEach((cb) => cb([], {} as ResizeObserver)))
      // Immediate: no spring to wait out, because the sidebar is still moving.
      expect(transformOf(root)).toBe('')

      // A resize that does not change the width leaves an open row alone.
      pointer('pointerDown', root, { pointerId: 2, button: 0, clientX: 0, clientY: 0, t: 500 })
      pointer('pointerMove', root, { pointerId: 2, clientX: 200, clientY: 0, t: 900 })
      pointer('pointerUp', root, { pointerId: 2, clientX: 200, clientY: 0, t: 900 })
      settle()
      const open = transformOf(root)
      expect(open).not.toBe('')
      act(() => observers.forEach((cb) => cb([], {} as ResizeObserver)))
      expect(transformOf(root)).toBe(open)
    } finally {
      cleanup()
      frame?.remove()
      globalThis.ResizeObserver = real
    }
  })

  it('never clips a label: it spells them out or drops to icons', () => {
    const { root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 20, clientY: 0, t: 10 })

    // 259px of row: neither tray fits three labels across, so both drop to
    // icons rather than clipping. Flag joining Details and Delete is what moved
    // the trailing tray over that line.
    const leading = root.querySelector('.todo-swipe-tray-left') as HTMLElement
    const trailing = root.querySelector('.todo-swipe-tray-right') as HTMLElement
    expect(leading.className).toContain('icons')
    expect(trailing.className).toContain('icons')
    // The trailing tray's own detent, measured while IT is the open side — an
    // inactive tray is collapsed to 0 so it cannot bleed out past the surface.
    pointer('pointerUp', root, { pointerId: 1, clientX: 20, clientY: 0, t: 10 })
    pointer('pointerDown', root, { pointerId: 9, button: 0, clientX: 0, clientY: 0, t: 20 })
    pointer('pointerMove', root, { pointerId: 9, clientX: -20, clientY: 0, t: 30 })
    expect(trailing.style.width).toBe(`${OPEN_TRAILING}px`)
    pointer('pointerUp', root, { pointerId: 9, clientX: -20, clientY: 0, t: 30 })

    // Widen the row and the reschedule labels earn their place too.
    pointer('pointerUp', root, { pointerId: 1, clientX: 20, clientY: 0, t: 10 })
    Object.defineProperty(root, 'clientWidth', { configurable: true, value: 520 })
    pointer('pointerDown', root, { pointerId: 2, button: 0, clientX: 0, clientY: 0, t: 100 })
    pointer('pointerMove', root, { pointerId: 2, clientX: 20, clientY: 0, t: 110 })
    expect((root.querySelector('.todo-swipe-tray-left') as HTMLElement).className).toContain('labelled')
    // Three buttons wide enough for "This weekend" in full, never a share of a
    // fixed tray.
    expect((root.querySelector('.todo-swipe-tray-left') as HTMLElement).style.width).toBe('318px')
  })

  it('drives the drag straight to the DOM, without re-rendering the row', () => {
    // The pin for the reason this gesture felt laggy: a `setOffset` per pointer
    // frame re-rendered the row and both trays — six buttons and their icons —
    // to move one transform. A commit here means that regressed.
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    initRuntime(mock.api)
    const commits = vi.fn()
    const actions: SwipeRowActions = {
      reschedule: vi.fn(),
      pickDate: vi.fn(),
      setStatus: vi.fn(),
      toggleFlag: vi.fn(),
      openDetails: vi.fn(),
      remove: vi.fn()
    }
    render(
      <Profiler id="swipe" onRender={commits}>
        <SwipeRow todo={todo} disabled={false} actions={actions}>
          <div>Observe moss</div>
        </SwipeRow>
      </Profiler>
    )
    const root = document.querySelector('.todo-swipe') as HTMLDivElement
    Object.defineProperty(root, 'clientWidth', { configurable: true, value: 259 })
    root.setPointerCapture = vi.fn()

    // The first measurement legitimately commits: the row width goes 0 -> 259
    // and the tier with it.
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 20, clientY: 0, t: 10 })
    const settledCommits = commits.mock.calls.length

    for (let x = 21; x < 60; x++) {
      pointer('pointerMove', root, { pointerId: 1, clientX: x, clientY: 0, t: 10 + x })
    }
    expect(commits.mock.calls.length).toBe(settledCommits)
    expect(transformOf(root)).toBe('translate3d(59px, 0, 0)')
    expect(root.className).toContain('open')
  })

  it('collapses the other tray, so its buttons cannot bleed out beside the open one', () => {
    // Both trays are always painted. Their open widths together exceed the row
    // (144 + 144 against 259 here, 300 + 201 on a real 422px sidebar), and the
    // surface only hides that while it covers the whole row — so an inactive
    // tray left at its rest width shows through the moment the row moves. That
    // is how a yellow Flag appeared at the end of the LEADING tray.
    vi.useFakeTimers()
    const { root } = setup()
    const trayWidths = (): string[] =>
      [...root.querySelectorAll('.todo-swipe-tray')].map((tray) => (tray as HTMLElement).style.width)

    // Closed: both keep their rest width, and the surface covers both.
    expect(trayWidths()).toEqual([`${OPEN}px`, `${OPEN_TRAILING}px`])

    // Right-swipe: the leading tray owns the row, the trailing one collapses.
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
    expect(trayWidths()).toEqual(['144px', '0px'])
    pointer('pointerUp', root, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
    settle()
    expect(trayWidths()).toEqual([`${OPEN}px`, '0px'])

    // Put it back: a swipe that lands near closed rests there, and both trays
    // go back to their rest widths under the covering surface.
    pointer('pointerDown', root, { pointerId: 2, button: 0, clientX: 0, clientY: 0, t: 500 })
    pointer('pointerMove', root, { pointerId: 2, clientX: -150, clientY: 0, t: 900 })
    // Held still before letting go: placed, not thrown, so the projection has
    // no momentum to carry it on into the trailing tray.
    pointer('pointerMove', root, { pointerId: 2, clientX: -150, clientY: 0, t: 1400 })
    pointer('pointerUp', root, { pointerId: 2, clientX: -150, clientY: 0, t: 1400 })
    settle()
    expect(transformOf(root)).toBe('')
    expect(trayWidths()).toEqual([`${OPEN}px`, `${OPEN_TRAILING}px`])

    // …and the mirror image, from closed, in its own gesture.
    pointer('pointerDown', root, { pointerId: 3, button: 0, clientX: 0, clientY: 0, t: 1000 })
    pointer('pointerMove', root, { pointerId: 3, clientX: -120, clientY: 0, t: 1400 })
    pointer('pointerUp', root, { pointerId: 3, clientX: -120, clientY: 0, t: 1400 })
    settle()
    expect(trayWidths()).toEqual(['0px', `${OPEN_TRAILING}px`])

  })

  it('stops a closing swipe at closed, whatever it does afterwards', () => {
    vi.useFakeTimers()
    const { actions, root } = setup()
    // Trailing open.
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', root, { pointerId: 1, clientX: -120, clientY: 0, t: 401 })
    pointer('pointerUp', root, { pointerId: 1, clientX: -120, clientY: 0, t: 401 })
    settle()
    expect(transformOf(root)).toBe(`translate3d(-${OPEN_TRAILING}px, 0, 0)`)

    // One swipe back the other way, far enough to have opened the leading tray
    // twice over. Closed is a wall for this gesture, so the row stops there…
    pointer('pointerDown', root, { pointerId: 2, button: 0, clientX: 0, clientY: 0, t: 500 })
    // Tracks the finger 1:1 on the way back…
    pointer('pointerMove', root, { pointerId: 2, clientX: 100, clientY: 0, t: 540 })
    expect(transformOf(root)).toBe('translate3d(-44px, 0, 0)')
    // …and stops dead at closed rather than carrying on into the leading tray.
    pointer('pointerMove', root, { pointerId: 2, clientX: 200, clientY: 0, t: 560 })
    expect(transformOf(root)).toBe('')
    pointer('pointerMove', root, { pointerId: 2, clientX: 400, clientY: 0, t: 580 })
    expect(transformOf(root)).toBe('')
    pointer('pointerUp', root, { pointerId: 2, clientX: 400, clientY: 0, t: 580 })
    settle()
    expect(transformOf(root)).toBe('')
    // …and nothing fires on the way past.
    expect(actions.reschedule).not.toHaveBeenCalled()
    expect(actions.remove).not.toHaveBeenCalled()

    // Reversing back onto the side it came from within the same gesture still
    // tracks: the wall is the crossing, not the direction.
    pointer('pointerDown', root, { pointerId: 3, button: 0, clientX: 0, clientY: 0, t: 700 })
    pointer('pointerMove', root, { pointerId: 3, clientX: -120, clientY: 0, t: 1100 })
    pointer('pointerUp', root, { pointerId: 3, clientX: -120, clientY: 0, t: 1100 })
    settle()
    expect(transformOf(root)).toBe(`translate3d(-${OPEN_TRAILING}px, 0, 0)`)

    // Put it away again, then the leading tray is one swipe away — the wall only
    // ever belonged to the gesture that started on an open row.
    pointer('pointerDown', root, { pointerId: 4, button: 0, clientX: 0, clientY: 0, t: 1200 })
    pointer('pointerMove', root, { pointerId: 4, clientX: 300, clientY: 0, t: 1600 })
    pointer('pointerUp', root, { pointerId: 4, clientX: 300, clientY: 0, t: 1600 })
    settle()
    expect(transformOf(root)).toBe('')

    pointer('pointerDown', root, { pointerId: 5, button: 0, clientX: 0, clientY: 0, t: 1700 })
    pointer('pointerMove', root, { pointerId: 5, clientX: 120, clientY: 0, t: 2100 })
    pointer('pointerUp', root, { pointerId: 5, clientX: 120, clientY: 0, t: 2100 })
    settle()
    expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)
  })

  it('never lets a trackpad swipe close one tray and open the other', () => {
    vi.useFakeTimers()
    const { root } = setup()
    // Trailing open, the way a real trackpad does it: a burst that decays.
    ;[80, 90, 70, 40].forEach((deltaX, i) => wheel(root, { deltaX, t: 100 + i * 16 }))
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(transformOf(root)).toBe(`translate3d(-${OPEN_TRAILING}px, 0, 0)`)

    // One swipe the other way, with the momentum tail every trackpad leaves
    // behind. It puts the tray away and stops — the tail cannot walk the row on
    // into the reschedule tray, which is what made a single swipe flip sides.
    ;[-70, -90, -80, -60, -30, -14, -6, -2].forEach((deltaX, i) =>
      wheel(root, { deltaX, t: 500 + i * 16 })
    )
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(transformOf(root)).toBe('')
  })

  it('lets the next swipe take the row while the last one is still coasting', () => {
    vi.useFakeTimers()
    const { root } = setup()

    // A real two-finger swipe: a push, then the tail it leaves behind. No idle
    // gap anywhere in what follows — the second swipe arrives while the first
    // is still throwing frames, which is exactly how it feels to swipe twice in
    // a row, and every one of those frames used to be absorbed as "the first
    // swipe, already spent".
    const open = [30, 60, 55, 40, 30, 20, 10, 5, 3]
    open.forEach((deltaX, i) => wheel(root, { deltaX, t: 100 + i * 16 }))

    // Straight into the swipe back, no pause. Momentum never turns around, so
    // the reversal is the boundary between the two.
    const back = [-25, -60, -70, -50, -30, -15, -6, -2]
    back.forEach((deltaX, i) => wheel(root, { deltaX, t: 100 + (open.length + i) * 16 }))
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(transformOf(root)).toBe('')
  })

  it('opens the other side on the next swipe, even before the last one stopped coasting', () => {
    vi.useFakeTimers()
    const { root } = setup()
    ;[80, 90, 70, 40].forEach((deltaX, i) => wheel(root, { deltaX, t: 100 + i * 16 }))
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(transformOf(root)).toBe(`translate3d(-${OPEN_TRAILING}px, 0, 0)`)

    // Close it, then swipe the same way again straight afterwards — no idle gap
    // between them, because the first swipe is still coasting. A trackpad has no
    // touch-down to separate the two, so the growing delta is the boundary: the
    // second swipe is a gesture of its own and opens the leading tray.
    const frames = [-70, -90, -80, -60, -30, -14, -6, -2, -60, -90, -80, -50]
    frames.forEach((deltaX, i) => wheel(root, { deltaX, t: 500 + i * 16 }))
    act(() => vi.advanceTimersByTime(140))
    settle()
    expect(transformOf(root)).toBe(`translate3d(${OPEN}px, 0, 0)`)
  })

  it('takes pointer capture only once the gesture engages', () => {
    // Pointer capture retargets the COMPATIBILITY mouse events too, so a row
    // that captured on every press dispatched `click` at itself instead of at
    // the control under the finger: the checkbox, ⋯, a file card and the date
    // all stopped working, with nothing in the DOM to show why.
    const { root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0 })
    expect(root.setPointerCapture).not.toHaveBeenCalled()

    pointer('pointerMove', root, { pointerId: 1, clientX: 20, clientY: 0, t: 10 })
    expect(root.setPointerCapture).toHaveBeenCalledWith(1)
  })

  it('keeps one row open at a time, closing whichever was open before', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-26T12:00:00'))
    const mock = createMockValleyApi({ manifest: { id: 'todo' } })
    initRuntime(mock.api)
    const actions: SwipeRowActions = {
      reschedule: vi.fn(),
      pickDate: vi.fn(),
      setStatus: vi.fn(),
      toggleFlag: vi.fn(),
      openDetails: vi.fn(),
      remove: vi.fn()
    }
    render(
      <>
        <SwipeRow todo={todo} disabled={false} actions={actions}>
          <div>First</div>
        </SwipeRow>
        <SwipeRow todo={{ ...todo, id: 't2' }} disabled={false} actions={actions}>
          <div>Second</div>
        </SwipeRow>
      </>
    )
    const [first, second] = [...document.querySelectorAll('.todo-swipe')] as HTMLDivElement[]
    for (const row of [first, second]) {
      Object.defineProperty(row, 'clientWidth', { configurable: true, value: 259 })
      row.setPointerCapture = vi.fn()
    }

    pointer('pointerDown', first, { pointerId: 1, button: 0, clientX: 0, clientY: 0, t: 1 })
    pointer('pointerMove', first, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
    pointer('pointerUp', first, { pointerId: 1, clientX: 120, clientY: 0, t: 401 })
    settle()
    expect(transformOf(first)).toBe(`translate3d(${OPEN}px, 0, 0)`)

    // The second row only has to MOVE — the first is put away the moment the
    // next gesture takes over, not when it lands on a detent.
    pointer('pointerDown', second, { pointerId: 2, button: 0, clientX: 0, clientY: 0, t: 500 })
    pointer('pointerMove', second, { pointerId: 2, clientX: 120, clientY: 0, t: 900 })
    settle()
    expect(transformOf(first)).toBe('')

    pointer('pointerUp', second, { pointerId: 2, clientX: 120, clientY: 0, t: 900 })
    settle()
    expect(transformOf(second)).toBe(`translate3d(${OPEN}px, 0, 0)`)
    expect(transformOf(first)).toBe('')
  })

  it('does not let a different pointer finish the active gesture', () => {
    const { actions, root } = setup()
    pointer('pointerDown', root, { pointerId: 1, button: 0, clientX: 0, clientY: 0 })
    pointer('pointerMove', root, { pointerId: 1, clientX: 120, clientY: 0 })
    pointer('pointerUp', root, { pointerId: 2, clientX: 120, clientY: 0 })
    expect(actions.reschedule).not.toHaveBeenCalled()
  })
})
