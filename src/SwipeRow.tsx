import { React, api } from './runtime'
import type { ReactElement, ReactNode } from 'react'
import type { TodoRecord } from '@valley/plugin-sdk/types'
import { ArrowRightCircle, CalendarDays, Flag, Info, Trash, TodoStatusGlyph, Weekend } from './icons'
import { rescheduleActions, type RescheduleAction } from './reschedule'
import { statusMenuOptions, effectiveStatus, patchForStatus } from './statuses'
import { isoDay } from './sort'
import { uiText } from './localization'
import {
  ENGAGE_PX,
  resolveRelease,
  springStep,
  trackOffset,
  trayLayout,
  velocityFrom,
  type TrayLayout
} from './swipeModel'

/**
 * Swipe actions on a todo row.
 *
 * Right-swipe reveals **when** (a contextual reschedule tray — see
 * `reschedule.ts`), left-swipe reveals **what** (Flag · Details · Delete). The
 * split is the one Reminders taught everybody: dates on the leading edge,
 * everything else on the trailing one, destructive action furthest out.
 *
 * The whole gesture is one state machine — `begin` · `move` · `end` — and both
 * input paths (pointer drag, trackpad wheel) only translate their events into
 * those three calls. Everything that decides *feel* is a pure function in
 * `swipeModel.ts`, so it is testable without a browser; this file is wiring.
 *
 * The shape it implements is iOS's:
 *
 *  - two rest positions per side, closed and fully open — nothing in between,
 *    which is what makes a swipe feel sticky instead of draggy;
 *  - 1:1 tracking to the limit for the gesture, elastic past it;
 *  - a release lands on the detent nearest the *projected* resting position,
 *    so a flick throws the row rather than measuring how far it got;
 *  - **one swipe does one thing**: a gesture that starts on an open row can
 *    only put it away. Closed is a wall, not a waypoint, so the swipe that
 *    shuts the trailing tray never carries on through zero and opens the
 *    leading one behind it — and the trackpad's own momentum cannot either.
 *    Opening the other side is the *next* swipe, which is a gesture of its own.
 *
 * One deliberate departure from iOS: a full swipe only *commits* on the side
 * that was already open when the gesture began. From closed the row resists at
 * the open detent, whatever the swipe — so opening is stage one and committing
 * is stage two, and the expanded red fill never appears unless releasing really
 * would run the action.
 */

/**
 * Settle timing. Just under critical damping on purpose: a critically damped
 * spring is the *slowest* curve that does not oscillate, and its long asymptotic
 * tail is what made a release read as the row not knowing where it was going.
 */
const SETTLE_RESPONSE = 0.22
const RETURN_RESPONSE = 0.18
const FLICK_DAMPING = 0.8
const DRAG_DAMPING = 0.9
/** Above this, a release counts as thrown rather than placed. */
const FLICK_VELOCITY = 400

/** Fallback release for a slow trackpad scroll that never builds momentum. */
const WHEEL_IDLE_MS = 80
/** Momentum only reads as momentum after a real push, not a two-pixel nudge. */
const COAST_MIN_PEAK = 10
/** A wheel delta growing by this much is a new swipe, never a decaying tail. */
const RESWIPE_GROWTH = 5
/** …and so is one this size pointing back the way the last swipe came from. */
const RESWIPE_MIN = 4
const COAST_FRAMES = 3
const COAST_RATIO = 0.5

/** Velocity samples kept for the release; more than this is ancient history. */
const MAX_SAMPLES = 6

export interface SwipeRowActions {
  reschedule: (date: string) => void
  pickDate: (anchor: HTMLElement) => void
  setStatus: (anchor: HTMLElement) => void
  toggleFlag: () => void
  openDetails: () => void
  remove: () => void
}

interface Tray {
  key: string
  label: string
  cls: string
  icon: ReactNode
  run: (anchor: HTMLElement) => void
}

type Side = 'left' | 'right'

const SIDES: Side[] = ['left', 'right']

interface Geometry {
  rowWidth: number
  left: TrayLayout
  right: TrayLayout
}

const EMPTY_LAYOUT: TrayLayout = { buttonWidth: 0, labelled: false, openWidth: 0, commitPoint: 0 }

/**
 * One gesture, whatever drove it.
 *
 * `origin` is the side the row was showing when it began — open detent or not.
 * A gesture that started with a tray showing may only put that tray away: it is
 * what stops one swipe from closing the trailing actions and opening the
 * reschedule tray behind them.
 */
interface Gesture {
  kind: 'pointer' | 'wheel'
  pointerId: number
  originX: number
  originY: number
  /** Row offset the gesture began from. */
  base: number
  origin: Side | null
  /** Past the engage threshold: the row is now moving with the hand. */
  live: boolean
  /** Accumulated wheel travel (the pointer path reads the finger instead). */
  distance: number
  /** Trackpad momentum bookkeeping — the tail after the fingers lift. */
  peak: number
  previous: number
  decay: number
  /** The commit point was reached while the fingers were still down. */
  crossed: boolean
  /** Already landed; the rest of the coast is absorbed rather than tracked. */
  ended: boolean
}

function newGesture(kind: Gesture['kind'], pointerId: number, x: number, y: number, base: number, origin: Side | null): Gesture {
  return {
    kind,
    pointerId,
    originX: x,
    originY: y,
    base,
    origin,
    live: false,
    distance: 0,
    peak: 0,
    previous: 0,
    decay: 0,
    crossed: false,
    ended: false
  }
}

function rescheduleTray(actions: RescheduleAction[], on: SwipeRowActions): Tray[] {
  const icons: Record<string, ReactNode> = {
    today: <ArrowRightCircle />,
    tomorrow: <ArrowRightCircle />,
    weekend: <Weekend />,
    pick: <CalendarDays />
  }
  return actions.map((action) => ({
    key: action.id,
    label: uiText(action.labelKey),
    cls: `todo-swipe-action todo-swipe-${action.id}`,
    icon: icons[action.id],
    run: (anchor: HTMLElement) => {
      if (action.date) on.reschedule(action.date)
      else on.pickDate(anchor)
    }
  }))
}

/**
 * The one row whose tray is showing, app-wide.
 *
 * A list may only ever have one open row: two trays side by side read as two
 * pending decisions, and the second swipe is how a user *asks* for the first row
 * to be put away. Module scope rather than a store because it is not state
 * anybody renders — the previous row closes itself the moment another moves, and
 * a plugin reload drops the reference with the module.
 */
let openRow: { close: () => void } | null = null

function claimOpenRow(row: { close: () => void }): void {
  if (openRow === row) return
  const previous = openRow
  // Claim first: closing the previous row paints it to 0, and a release that
  // still saw itself as the open row would clear the claim just made.
  openRow = row
  previous?.close()
}

function releaseOpenRow(row: { close: () => void }): void {
  if (openRow === row) openRow = null
}

let gauge: CanvasRenderingContext2D | null | undefined

/**
 * How wide a tray label actually renders, so the button can be sized to hold it
 * whole. A canvas gauge measures text without touching layout, which matters
 * because this runs inside the gesture's own measurement pass.
 *
 * jsdom has no 2D context; the per-character estimate there is only ever used
 * to order "does this fit", and it orders it the same way.
 */
function labelWidth(text: string, font: string): number {
  if (gauge === undefined) {
    try {
      gauge = document.createElement('canvas').getContext('2d')
    } catch {
      gauge = null
    }
  }
  if (!gauge) return text.length * 7
  gauge.font = font
  return gauge.measureText(text).width
}

const reducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const sideOf = (value: number): Side | null => (value > 0 ? 'left' : value < 0 ? 'right' : null)

export const SwipeRow = ({
  todo,
  disabled,
  actions,
  onEngage,
  children
}: {
  todo: TodoRecord
  disabled: boolean
  actions: SwipeRowActions
  /** Fired once the gesture takes over, so the row can cancel its own press-and-hold. */
  onEngage?: () => void
  children: ReactNode
}): ReactElement => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const surfaceRef = React.useRef<HTMLDivElement>(null)
  const trayRefs = React.useRef<Record<Side, HTMLDivElement | null>>({ left: null, right: null })

  const offsetRef = React.useRef(0)
  const gestureRef = React.useRef<Gesture | null>(null)
  /**
   * The side that was already open when the current gesture began — the only
   * side it may drive all the way to a commit. It outlives the gesture on
   * purpose: the expanded action has to stay expanded while the row springs
   * back, or a full swipe ends with the fill popping away before the action
   * it fired has even run.
   */
  const armedRef = React.useRef<Side | null>(null)
  const samples = React.useRef<{ x: number; t: number }[]>([])
  const swallowClick = React.useRef(false)
  const frame = React.useRef<number | null>(null)
  const wheelTimer = React.useRef<number | null>(null)
  const motion = React.useRef({ velocity: 0, target: 0, response: SETTLE_RESPONSE, damping: DRAG_DAMPING })
  /** The last width written to each tray, so a frame that changes nothing writes
   *  nothing: a tray width is a layout of three buttons, their icons and their
   *  labels, and re-asserting it sixty times a second is the one avoidable cost
   *  on the gesture's hot path. */
  const painted = React.useRef<Record<Side, string>>({ left: '', right: '' })

  const left = React.useMemo(
    () => rescheduleTray(rescheduleActions(todo.dueDate ?? '', isoDay(new Date())), actions),
    [todo.dueDate, actions]
  )
  const right = React.useMemo<Tray[]>(
    // Outermost last: the trailing full swipe fires the button at the row's own
    // edge, and that is Delete — the arrangement Mail taught everybody. Flag
    // leads, furthest from that edge, because it is the one of the three that is
    // both frequent and harmless; `trayLayout` drops to icon-only when three
    // buttons cannot spell themselves out in a narrow sidebar.
    () => [
      {
        key: 'flag',
        label: uiText(todo.flagged ? 'todo.swipe.unflag' : 'todo.swipe.flag'),
        cls: 'todo-swipe-action todo-swipe-flag',
        icon: <Flag />,
        run: () => actions.toggleFlag()
      },
      {
        key: 'details',
        label: uiText('todo.details'),
        cls: 'todo-swipe-action todo-swipe-details',
        icon: <Info />,
        run: () => actions.openDetails()
      },
      {
        key: 'delete',
        label: uiText('todo.swipe.delete'),
        cls: 'todo-swipe-action todo-swipe-delete',
        icon: <Trash />,
        run: () => actions.remove()
      }
    ],
    [actions, todo.flagged]
  )
  const trays: Record<Side, Tray[]> = { left, right }

  // ── Geometry ───────────────────────────────────────────────────────────────

  const [geometry, setGeometry] = React.useState<Geometry>(() => ({
    rowWidth: 0,
    left: EMPTY_LAYOUT,
    right: EMPTY_LAYOUT
  }))
  const geometryRef = React.useRef(geometry)
  geometryRef.current = geometry

  /** The font the tray buttons are actually painted in, for the label gauge. */
  const trayFont = (): string => {
    const button = rootRef.current?.querySelector('.todo-swipe-action')
    if (!button || typeof getComputedStyle !== 'function') return '13px sans-serif'
    const style = getComputedStyle(button)
    return `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  }

  /**
   * Read the row's own width and re-derive both trays from it. Returns the fresh
   * geometry because the gesture that triggered the measurement needs it in the
   * same tick, before React has re-rendered.
   */
  const measure = (): Geometry => {
    const rowWidth = rootRef.current?.clientWidth ?? 0
    const font = trayFont()
    const previous = geometryRef.current
    const next: Geometry = {
      rowWidth,
      left: trayLayout(rowWidth, left.map((a) => labelWidth(a.label, font)), previous.left.labelled),
      right: trayLayout(rowWidth, right.map((a) => labelWidth(a.label, font)), previous.right.labelled)
    }
    geometryRef.current = next
    const changed = (side: Side): boolean =>
      previous[side].openWidth !== next[side].openWidth || previous[side].labelled !== next[side].labelled
    if (previous.rowWidth !== rowWidth || changed('left') || changed('right')) setGeometry(next)
    return next
  }
  const measureRef = React.useRef(measure)
  measureRef.current = measure

  // The reschedule tray changes length with the row's due date, which changes
  // the open detent even when the row itself has not resized.
  React.useEffect(() => {
    measureRef.current()
  }, [left, right])

  // ── Painting ───────────────────────────────────────────────────────────────

  /** Would releasing here run the outermost action? The one definition of it. */
  const isCommitted = (value: number): boolean => {
    const side = sideOf(value)
    if (!side || side !== armedRef.current) return false
    return Math.abs(value) >= geometryRef.current[side].commitPoint
  }

  /**
   * Write the gesture straight to the DOM.
   *
   * Nothing here is React's to own: the offset is transient gesture state that
   * never survives the gesture, and a `setState` per pointer frame re-rendered
   * the row and both trays — six buttons and their icons — to move one
   * transform. React still owns the tier, which changes when the panel resizes
   * and not once per frame.
   */
  const paint = (value: number, gesture = false): void => {
    offsetRef.current = value
    // Only a frame the user is driving — or a settle onto an open detent —
    // claims the open slot. A spring on its way BACK to closed paints non-zero
    // values too, and letting those claim would have the row being put away
    // close the row that just replaced it.
    if (gesture && value !== 0) claimOpenRow(identity.current)
    else if (value === 0) releaseOpenRow(identity.current)
    const root = rootRef.current
    const surface = surfaceRef.current
    if (!root || !surface) return
    surface.style.transform = value ? `translate3d(${value}px, 0, 0)` : ''
    const side = sideOf(value)
    const geo = geometryRef.current
    const committed = isCommitted(value)
    root.classList.toggle('open', value !== 0)
    root.classList.toggle('committed', committed)
    for (const which of SIDES) {
      const tray = trayRefs.current[which]
      if (!tray) continue
      const active = side === which
      tray.classList.toggle('committed', active && committed)
      // Active: past the open detent the tray stretches with the row, so the
      // buttons stay flush to the edge instead of leaving panel background
      // behind them.
      //
      // Inactive: it has to COLLAPSE, not merely sit at its rest width. Both
      // trays are always painted, and they overlap whenever the two open widths
      // exceed the row. At rest the surface covers the whole row and hides that;
      // the moment the surface moves, the far edge is uncovered and the other
      // side's buttons bleed out beside the open tray.
      const width = active
        ? committed
          ? '100%'
          : `${Math.max(geo[which].openWidth, Math.abs(value))}px`
        : `${value === 0 ? geo[which].openWidth : 0}px`
      const state = `${width}|${active}`
      if (painted.current[which] !== state) {
        painted.current[which] = state
        tray.style.width = width
        // Hidden from assistive tech exactly while the other side owns the row —
        // tracked with the width so neither can go stale without the other.
        tray.setAttribute('aria-hidden', String(!active))
      }
    }
  }

  // React owns className/style on these nodes, so any re-render for an unrelated
  // reason resets what `paint` wrote. Re-applying before the browser paints
  // means the row never flashes back to closed mid-gesture.
  React.useLayoutEffect(() => paint(offsetRef.current))

  // ── Settling ───────────────────────────────────────────────────────────────

  const stopSpring = (): void => {
    if (frame.current != null && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(frame.current)
    frame.current = null
  }

  /** Spring to a detent, seeded with the release velocity — Apple's handoff. */
  const settle = (target: number, velocity: number, response: number, damping: number): void => {
    stopSpring()
    if (target !== 0) claimOpenRow(identity.current)
    if (offsetRef.current === target || reducedMotion() || typeof requestAnimationFrame !== 'function') {
      paint(target)
      return
    }
    motion.current = { velocity, target, response, damping }
    let previous = 0
    const tick = (now: number): void => {
      const dt = previous ? (now - previous) / 1000 : 1 / 60
      previous = now
      const m = motion.current
      const step = springStep(offsetRef.current, m.velocity, m.target, dt, m.response, m.damping)
      m.velocity = step.velocity
      paint(step.value)
      frame.current = step.done ? null : requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }

  const closeRef = React.useRef<() => void>(() => {})
  closeRef.current = (): void => {
    gestureRef.current = null
    settle(0, 0, RETURN_RESPONSE, DRAG_DAMPING)
  }
  const close = React.useCallback((): void => closeRef.current(), [])
  /** This row's handle in the one-open-row registry, stable for its lifetime. */
  const identity = React.useRef<{ close: () => void }>({ close: () => closeRef.current() })

  /**
   * Snap shut and abandon any gesture in flight — no spring, no landing on a
   * detent. For the cases where the row's own geometry stopped being true
   * underneath an open tray, where animating to a detent that no longer means
   * anything is worse than just being closed.
   */
  const reset = (): void => {
    stopSpring()
    gestureRef.current = null
    if (wheelTimer.current != null) window.clearTimeout(wheelTimer.current)
    wheelTimer.current = null
    paint(0)
  }
  const resetRef = React.useRef(reset)
  resetRef.current = reset

  // ── Gesture core ───────────────────────────────────────────────────────────

  /**
   * Raw finger position → where the row actually sits.
   *
   * The elastic limit is the commit point on the armed side and the open detent
   * everywhere else, so a first swipe resists the moment its tray is fully
   * revealed. That resistance is the affordance: it says *this is as far as this
   * swipe goes*.
   *
   * Closed is a wall for a gesture that began on an open row: it stops dead
   * there rather than carrying on into the other tray. Coming back onto the
   * side it started from still tracks — the wall is the crossing, not the
   * direction.
   */
  const track = (raw: number): number => {
    const geo = geometryRef.current
    const side = sideOf(raw)
    if (!side) return 0
    const origin = gestureRef.current?.origin
    if (origin && side !== origin) return 0
    const layout = geo[side]
    const limit = side === armedRef.current ? layout.commitPoint : layout.openWidth
    return trackOffset(raw, limit, geo.rowWidth)
  }

  /** Start a gesture from wherever the row currently sits. */
  const begin = (kind: Gesture['kind'], pointerId: number, x: number, y: number, timeStamp: number): void => {
    stopSpring()
    measure()
    const base = offsetRef.current
    const side = sideOf(base)
    // A row a few pixels off zero — one still springing shut — counts as closed;
    // otherwise the swipe that arrives right behind a close would be walled by a
    // tray that is no longer there.
    const origin = Math.abs(base) > ENGAGE_PX ? side : null
    armedRef.current = side && Math.abs(base) >= geometryRef.current[side].openWidth - 1 ? side : null
    gestureRef.current = newGesture(kind, pointerId, x, y, base, origin)
    // Seeded with the row's own starting position, so the first release has a
    // velocity to read even when the gesture only produced one move frame.
    samples.current = [{ x: base, t: timeStamp }]
  }

  /** One frame of a gesture that has already passed its engage threshold. */
  const move = (raw: number, timeStamp: number): void => {
    const g = gestureRef.current
    if (!g || g.ended) return
    if (!g.live) {
      g.live = true
      stopSpring()
      // Engaging cancels the row's press-and-hold: the press that started the
      // swipe is still arming it, and a 450ms hold-menu opening mid-drag is the
      // one way this gesture can feel broken.
      onEngage?.()
    }
    samples.current.push({ x: raw, t: timeStamp })
    if (samples.current.length > MAX_SAMPLES) samples.current.shift()
    paint(track(raw), true)
    if (isCommitted(offsetRef.current)) g.crossed = true
  }

  /**
   * Land the gesture. `allowCommit` is false for trackpad momentum: once the
   * deltas start decaying the fingers have already lifted, and firing a
   * destructive action off coasting input is the one unforgivable outcome here.
   */
  const end = (allowCommit: boolean): void => {
    const g = gestureRef.current
    if (!g || g.ended) return
    g.ended = true
    if (!g.live) {
      gestureRef.current = null
      return
    }
    // A wheel gesture is kept until its coast is over, so the tail can be
    // absorbed rather than tracked; a pointer one is done the moment it lands.
    const retire = (): void => {
      if (g.kind === 'pointer') gestureRef.current = null
    }
    const velocity = velocityFrom(samples.current)
    const value = offsetRef.current
    const side = sideOf(value)
    if (!side) {
      retire()
      paint(0)
      return
    }
    const layout = geometryRef.current[side]
    const committed = allowCommit && isCommitted(value)
    const outcome = resolveRelease({ offset: value, velocity, openWidth: layout.openWidth, committed })
    retire()
    if (outcome.commit) {
      const selector =
        side === 'left' ? '.todo-swipe-tray-left button' : '.todo-swipe-tray-right button:last-child'
      const anchor = rootRef.current?.querySelector<HTMLElement>(selector)
      const tray = trays[side]
      const action = side === 'left' ? tray[0] : tray[tray.length - 1]
      settle(0, velocity, RETURN_RESPONSE, DRAG_DAMPING)
      action?.run(anchor ?? rootRef.current!)
      return
    }
    settle(
      outcome.target,
      velocity,
      SETTLE_RESPONSE,
      Math.abs(velocity) > FLICK_VELOCITY ? FLICK_DAMPING : DRAG_DAMPING
    )
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  // An open tray must not survive the row changing underneath it: a reschedule
  // rewrites `dueDate`, which rebuilds the tray, and the buttons would otherwise
  // stay open showing a set that no longer matches the row.
  React.useEffect(() => close(), [todo.dueDate, todo.flagged, close])

  React.useEffect(() => {
    const self = identity.current
    return () => {
      stopSpring()
      if (wheelTimer.current != null) window.clearTimeout(wheelTimer.current)
      // A row unmounted mid-swipe (a filter change, a reschedule that moves it
      // to another section) must not leave the registry pointing at a tray that
      // no longer exists, or the next row to open would have nothing to close.
      releaseOpenRow(self)
    }
  }, [])

  // The sidebar resizes on every mousemove frame (245–480px), so an open tray
  // has to re-tier live rather than at the next gesture.
  React.useEffect(() => {
    const root = rootRef.current
    const Observer = (root?.ownerDocument.defaultView as typeof window | null)?.ResizeObserver ?? globalThis.ResizeObserver
    if (!root || !Observer) return
    // The observer keeps its own record of the width rather than comparing
    // against the geometry: `measure()` is called from several places, and a
    // re-render triggered by the very same resize gets there first, so by the
    // time this fires the geometry already agrees with the new width.
    let observed = 0
    const observer = new Observer(() => {
      const width = root.clientWidth
      const resized = observed !== width
      observed = width
      measureRef.current()
      // A tray sized for the old row is wrong the instant the panel is not that
      // width any more: its buttons re-tier and the open detent moves, leaving
      // the row parked somewhere that is no longer a rest position. Closing is
      // the only honest answer, and it has to be immediate — the sidebar
      // resizes on every mousemove frame, so anything animated would be chasing
      // a target that keeps moving.
      if (resized && offsetRef.current !== 0) resetRef.current()
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  // ── Trackpad ───────────────────────────────────────────────────────────────

  /** What the wheel listener needs from the current render, without rebinding. */
  const wheelContext = React.useRef({ disabled, begin, move, end })
  wheelContext.current = { disabled, begin, move, end }

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const clearIdle = (): void => {
      if (wheelTimer.current != null) window.clearTimeout(wheelTimer.current)
      wheelTimer.current = null
    }
    /** The fallback release for a slow scroll that never built momentum. */
    const idle = (): void => {
      wheelTimer.current = null
      const g = gestureRef.current
      if (g?.kind !== 'wheel') return
      wheelContext.current.end(true)
      gestureRef.current = null
    }

    const onWheel = (e: WheelEvent): void => {
      const ctx = wheelContext.current
      if (ctx.disabled) return
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || e.deltaX === 0) return
      // React installs wheel events passively in Chromium. Calling
      // preventDefault from JSX therefore did nothing and let the browser's
      // horizontal navigation/scroll fight the row on every trackpad frame.
      e.preventDefault()

      const scale =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : e.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? root.clientWidth
            : 1
      const delta = -e.deltaX * scale

      let g = gestureRef.current
      if (!g || g.kind !== 'wheel') {
        ctx.begin('wheel', -1, 0, 0, e.timeStamp)
        g = gestureRef.current as Gesture
      }

      clearIdle()
      wheelTimer.current = window.setTimeout(idle, WHEEL_IDLE_MS)

      const magnitude = Math.abs(delta)
      const last = g.previous
      g.previous = magnitude

      // Where one trackpad swipe ends and the next begins.
      //
      // A trackpad has no touch-down, so the only boundary between two swipes is
      // the idle gap — and a swipe that has landed keeps throwing events for the
      // best part of a second while its momentum runs out. Every one of those
      // was being absorbed, which is why a second swipe that arrived during the
      // coast did nothing at all: it was still the first swipe, already spent.
      //
      // Momentum has two properties a hand does not: it only ever decays, and it
      // never turns around. So a delta that grows again, or one that points the
      // other way, is fingers back on the glass — and that, not the idle timer,
      // is the boundary. It lands the parked gesture and starts a fresh one from
      // wherever the row now sits, whether that is an open detent or the wall at
      // closed.
      const parked = g.live && (g.ended || (g.origin !== null && offsetRef.current === 0))
      const grew = magnitude >= last + RESWIPE_GROWTH
      const turned = g.distance !== 0 && Math.sign(delta) !== Math.sign(g.distance) && magnitude >= RESWIPE_MIN
      if (parked && (grew || turned)) {
        ctx.end(false)
        ctx.begin('wheel', -1, 0, 0, e.timeStamp)
        g = gestureRef.current as Gesture
        g.previous = magnitude
      }

      // The gesture already landed; the rest of the coast is absorbed so the row
      // stays parked on its detent instead of drifting for another second.
      if (g.ended) return

      g.decay = magnitude < last ? g.decay + 1 : 0
      g.peak = Math.max(g.peak, magnitude)
      g.distance += delta

      // A decaying tail is the trackpad's way of saying the fingers are gone —
      // treat it as the release rather than waiting out an idle timer while the
      // row keeps sliding. A threshold crossed while they were still down is a
      // decision the coast must not be able to take back, which is what
      // `crossed` carries into the release.
      const coasting =
        g.live && g.peak >= COAST_MIN_PEAK && g.decay >= COAST_FRAMES && magnitude < g.peak * COAST_RATIO
      if (coasting) {
        ctx.end(g.crossed)
        return
      }
      if (!g.live && Math.abs(g.distance) < ENGAGE_PX) return
      ctx.move(g.base + g.distance, e.timeStamp)
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      root.removeEventListener('wheel', onWheel)
      clearIdle()
    }
  }, [])

  // ── Render ─────────────────────────────────────────────────────────────────

  const renderTray = (which: Side, tray: Tray[]): ReactElement => (
    <div
      ref={(node) => {
        trayRefs.current[which] = node
      }}
      className={`todo-swipe-tray todo-swipe-tray-${which} ${geometry[which].labelled ? 'labelled' : 'icons'}`}
      aria-hidden
      style={{ width: `${geometry[which].openWidth}px` }}
    >
      {tray.map((action) => (
        <button
          key={action.key}
          type="button"
          className={action.cls}
          tabIndex={-1}
          title={action.label}
          aria-label={action.label}
          onClick={(e) => {
            e.stopPropagation()
            close()
            action.run(e.currentTarget)
          }}
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div
      ref={rootRef}
      className="todo-swipe"
      onPointerDown={(e) => {
        if (disabled || (e.pointerType === 'mouse' && e.button !== 0)) return
        // A press on a tray button is that button's, not a new gesture.
        if ((e.target as Element).closest('.todo-swipe-tray')) return
        begin('pointer', e.pointerId, e.clientX, e.clientY, e.timeStamp)
        // Capture is taken when the gesture engages, never here: pointer capture
        // retargets the compatibility mouse events too, so capturing on every
        // press dispatched `click` at this div instead of at the control under
        // the finger — the checkbox, ⋯, a file card and the date all stopped
        // working, with nothing in the DOM to show why.
      }}
      onPointerMove={(e) => {
        const g = gestureRef.current
        if (!g || g.kind !== 'pointer' || g.pointerId !== e.pointerId) return
        const dx = e.clientX - g.originX
        const dy = e.clientY - g.originY
        if (!g.live) {
          // Vertical wins ties: the list scrolls, and a gesture that steals the
          // scroll at 3px of horizontal noise makes the panel feel broken.
          if (Math.abs(dy) > Math.abs(dx)) {
            if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId)
            }
            gestureRef.current = null
            return
          }
          if (Math.abs(dx) < ENGAGE_PX) return
          swallowClick.current = true
          e.currentTarget.setPointerCapture?.(e.pointerId)
        }
        e.preventDefault()
        move(g.base + dx, e.timeStamp)
      }}
      onPointerUp={(e) => {
        const g = gestureRef.current
        if (!g || g.kind !== 'pointer' || g.pointerId !== e.pointerId) return
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
        if (g.live) move(g.base + (e.clientX - g.originX), e.timeStamp)
        end(true)
      }}
      onPointerCancel={(e) => {
        const g = gestureRef.current
        if (!g || g.kind !== 'pointer' || g.pointerId !== e.pointerId) return
        if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
        close()
      }}
      onClickCapture={(e) => {
        const onTray = !!(e.target as Element).closest('.todo-swipe-tray')
        if (onTray) swallowClick.current = false
        if (swallowClick.current && !onTray) {
          swallowClick.current = false
          e.stopPropagation()
          e.preventDefault()
          return
        }
        // A swipe that left a tray open swallows the click that closes it,
        // so releasing over the row never also opens the Calendar.
        if (offsetRef.current && !onTray) {
          e.stopPropagation()
          e.preventDefault()
          close()
        }
      }}
    >
      {left.length > 0 && renderTray('left', left)}

      <div ref={surfaceRef} className="todo-swipe-surface">
        {children}
      </div>

      {right.length > 0 && renderTray('right', right)}
    </div>
  )
}

/**
 * The status picker the swipe tray and the row menu share. Kept here rather than
 * inlined twice so the tray can never offer a different set than ⋯ → Status.
 */
export function openStatusMenu(
  anchor: HTMLElement,
  todo: TodoRecord,
  onPatch: (patch: Partial<TodoRecord>) => unknown
): void {
  const current = effectiveStatus(todo)
  void api.ui.openMenu(
    statusMenuOptions().map((option) => ({
      label: uiText(option.labelKey),
      icon: <TodoStatusGlyph status={option.status} dotCls={option.cls} />,
      type: 'radio' as const,
      checked: option.status === null ? current === 'open' : option.status === current,
      onSelect: () => onPatch(patchForStatus(option.status))
    })),
    { anchor }
  )
}
