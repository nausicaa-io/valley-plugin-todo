import { describe, expect, it } from 'vitest'
import {
  project,
  resolveRelease,
  rubberband,
  springStep,
  trackOffset,
  trayLayout,
  velocityFrom
} from '../src/swipeModel'

describe('rubberband', () => {
  it('follows the finger at the constant and never reaches the dimension', () => {
    expect(rubberband(1, 200)).toBeCloseTo(0.55, 1)
    expect(rubberband(1e6, 200)).toBeLessThan(200)
    expect(rubberband(1e6, 200)).toBeGreaterThan(190)
  })

  it('is monotone and odd', () => {
    expect(rubberband(50, 200)).toBeGreaterThan(rubberband(20, 200))
    expect(rubberband(-50, 200)).toBeCloseTo(-rubberband(50, 200), 6)
  })

  it('is zero for a dimension with no room', () => {
    expect(rubberband(50, 0)).toBe(0)
  })
})

describe('project', () => {
  it('keeps the sign and scales with velocity', () => {
    expect(project(1000)).toBeGreaterThan(0)
    expect(project(-1000)).toBeCloseTo(-project(1000), 6)
    expect(project(2000)).toBeCloseTo(2 * project(1000), 6)
  })

  it('throws further at the slower deceleration rate', () => {
    expect(project(1000, 0.998)).toBeGreaterThan(project(1000, 0.99))
  })
})

describe('velocityFrom', () => {
  it('measures px/s over the trailing window', () => {
    expect(velocityFrom([{ x: 0, t: 0 }, { x: 30, t: 60 }])).toBeCloseTo(500, 6)
  })

  it('ignores samples older than the window', () => {
    const samples = [{ x: 0, t: 0 }, { x: 5, t: 900 }, { x: 65, t: 1000 }]
    expect(velocityFrom(samples)).toBeCloseTo(600, 6)
  })

  it('survives no movement and no samples', () => {
    expect(velocityFrom([{ x: 4, t: 7 }])).toBe(0)
    expect(velocityFrom([])).toBe(0)
  })
})

describe('trackOffset', () => {
  it('tracks 1:1 up to the commit point', () => {
    expect(trackOffset(120, 200, 260)).toBe(120)
    expect(trackOffset(-200, 200, 260)).toBe(-200)
  })

  it('resists past it without ever hitting a wall', () => {
    const near = trackOffset(240, 200, 260)
    const far = trackOffset(400, 200, 260)
    expect(near).toBeGreaterThan(200)
    expect(far).toBeGreaterThan(near)
    expect(far).toBeLessThan(260)
  })

  it('refuses a side with no actions', () => {
    expect(trackOffset(120, 0, 260)).toBe(0)
  })
})

describe('resolveRelease', () => {
  const base = { openWidth: 144, committed: false }

  it('closes a slow drag that did not reach halfway', () => {
    expect(resolveRelease({ ...base, offset: 40, velocity: 0 })).toEqual({ target: 0, commit: false })
  })

  it('opens a short flick, because the throw is projected', () => {
    expect(resolveRelease({ ...base, offset: 30, velocity: 1500 }).target).toBe(144)
  })

  it('closes on a reverse flick even from near the open detent', () => {
    expect(resolveRelease({ ...base, offset: 130, velocity: -1500 }).target).toBe(0)
  })

  it('mirrors on the trailing side', () => {
    expect(resolveRelease({ ...base, offset: -30, velocity: -1500 }).target).toBe(-144)
  })

  it('commits only from the live committed state, never from projection', () => {
    expect(resolveRelease({ ...base, offset: 30, velocity: 9000 }).commit).toBe(false)
    expect(resolveRelease({ ...base, offset: 210, velocity: 0, committed: true })).toEqual({
      target: 0,
      commit: true
    })
  })

  it('does nothing for a side with no actions', () => {
    expect(resolveRelease({ offset: 40, velocity: 800, openWidth: 0, committed: false })).toEqual({
      target: 0,
      commit: false
    })
  })
})

describe('springStep', () => {
  it('converges on the target', () => {
    let value = 0
    let velocity = 0
    let done = false
    for (let i = 0; i < 200 && !done; i++) {
      const step = springStep(value, velocity, 144, 1 / 60, 0.35, 1)
      value = step.value
      velocity = step.velocity
      done = step.done
    }
    expect(done).toBe(true)
    expect(value).toBe(144)
  })

  it('does not overshoot when critically damped', () => {
    let value = 0
    let velocity = 0
    let peak = 0
    for (let i = 0; i < 200; i++) {
      const step = springStep(value, velocity, 144, 1 / 60, 0.35, 1)
      value = step.value
      velocity = step.velocity
      peak = Math.max(peak, value)
      if (step.done) break
    }
    expect(peak).toBeLessThanOrEqual(144.5)
  })

  it('clamps a huge frame gap so a backgrounded window cannot launch the row', () => {
    const step = springStep(0, 0, 144, 10, 0.35, 1)
    expect(Math.abs(step.value)).toBeLessThan(144)
  })
})

/**
 * Labels for a three-button tray, as the gauge measures them. jsdom has no
 * canvas, so the component falls back to ~7px a character; these numbers are
 * that fallback for "Tomorrow" / "This weekend" / "Date".
 */
const LABELS = [56, 84, 28]

describe('trayLayout', () => {
  it('drops every label rather than clip one', () => {
    // Narrowest sidebar: three buttons wanting 106px each cannot fit in 142.
    const layout = trayLayout(230, LABELS, false)
    expect(layout.labelled).toBe(false)
    expect(layout.buttonWidth).toBe(48)
    expect(layout.openWidth).toBe(142)
    expect(230 - layout.openWidth).toBeGreaterThan(80)
  })

  it('sizes a labelled button to hold its widest label whole', () => {
    const layout = trayLayout(440, LABELS, false)
    expect(layout.labelled).toBe(true)
    // 84px of text plus the padding it sits in, not a guess from a tier table.
    expect(layout.buttonWidth).toBe(106)
    expect(layout.openWidth).toBe(318)
  })

  it('never labels a tray it would have to clip', () => {
    const layout = trayLayout(400, LABELS, false)
    expect(layout.labelled).toBe(false)
    expect(layout.openWidth).toBe(144)
  })

  it('holds the labels through the hysteresis band, so a resize cannot flicker', () => {
    // 3 x 106 = 318 needs 406px of row; the band keeps them to 382.
    expect(trayLayout(400, LABELS, true).labelled).toBe(true)
    expect(trayLayout(400, LABELS, false).labelled).toBe(false)
    expect(trayLayout(370, LABELS, true).labelled).toBe(false)
  })

  it('gives a short-labelled tray a sensible floor', () => {
    expect(trayLayout(600, [10, 12], false).buttonWidth).toBe(56)
  })

  it('clamps the tray so the reserve always survives', () => {
    expect(trayLayout(150, LABELS, false).openWidth).toBe(96)
  })

  it('puts commit clear of the open detent', () => {
    const layout = trayLayout(230, LABELS, false)
    expect(layout.commitPoint).toBeGreaterThan(layout.openWidth + 50)
    expect(layout.commitPoint).toBeLessThan(230)
  })

  it('pins a side with no actions shut', () => {
    expect(trayLayout(400, [], false)).toMatchObject({ openWidth: 0, commitPoint: 0 })
  })

  it('stays bounded before the row has been measured', () => {
    const layout = trayLayout(0, LABELS, false)
    expect(layout.openWidth).toBe(144)
    expect(Number.isFinite(layout.commitPoint)).toBe(true)
    expect(layout.commitPoint).toBeGreaterThan(layout.openWidth)
  })
})
