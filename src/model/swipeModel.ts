/**
 * The physics and layout maths behind a todo row's swipe.
 *
 * Kept pure and width-injected because jsdom has no layout: every number here
 * is an argument, never a measurement, so the feel of the gesture is testable
 * without a browser. `SwipeRow.tsx` is then only wiring — events in, transform
 * out.
 *
 * The constants are Apple's rather than invented, because the row is imitating
 * a specific interaction and near-misses are what make an imitation read as
 * wrong: UIScrollView's rubber-band constant, the projection function from
 * WWDC 2018 "Designing Fluid Interfaces", and SwipeCellKit's expansion
 * thresholds (that library reimplements stock Mail.app).
 */

/** Travel before the gesture engages — under this a click is still a click. */
export const ENGAGE_PX = 8

/** UIScrollView's rubber-band constant. */
const RUBBER_CONSTANT = 0.55

/** Scroll deceleration; 0.998 is the system default, 0.99 the "snappier" one. */
const DECELERATION = 0.998

/** Resistance past the commit point. iOS resists only there, never before it. */
const OVERSCROLL_ELASTICITY = 0.2

/** However narrow the row, a committed swipe still has this much give left. */
const MIN_OVERSCROLL = 20

/** Row left uncovered by a fully open tray, so there is always somewhere to grab. */
const RESERVE_PX = 88

/** Commit sits at least this far past the open detent, so it is a decision. */
const COMMIT_CLEARANCE = 56

/** …and always leaves this much row, so the surface never fully disappears. */
const COMMIT_EDGE_INSET = 24

/** An icon-only button: an 18px glyph with breathing room either side. */
const ICON_WIDTH = 48

/** A labelled button is its widest label plus the padding the label sits in. */
const LABEL_PADDING = 22
const MIN_LABEL_WIDTH = 56

// The sidebar resizes on every mousemove frame (shell/Sidebar.tsx, 245–480px),
// so the labels/icons switch needs a band or it strobes as the user drags
// across the threshold.
const LABEL_BAND = 24

/** Buttons may squeeze this small before the reserve gives way instead. */
const MIN_BUTTON_WIDTH = 32

/**
 * iOS resistance: follows the finger at `constant` and asymptotes at `dimension`,
 * so there is always a little more give and never a wall.
 */
export function rubberband(overshoot: number, dimension: number, constant = RUBBER_CONSTANT): number {
  if (dimension <= 0) return 0
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/**
 * Where a flick would come to rest, per WWDC 2018. Exponential decay rather
 * than the textbook `v² / 2a` — Apple picked this deliberately and matching it
 * is what makes a thrown row land where the hand expects.
 */
export function project(velocity: number, decelerationRate = DECELERATION): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/** Velocity in px/s over the trailing `window` ms, from newest-last samples. */
export function velocityFrom(samples: { x: number; t: number }[], window = 60): number {
  const last = samples[samples.length - 1]
  if (!last) return 0
  let first = last
  for (let i = samples.length - 1; i >= 0; i--) {
    first = samples[i]
    if (last.t - first.t >= window) break
  }
  const dt = last.t - first.t
  return dt > 0 ? ((last.x - first.x) / dt) * 1000 : 0
}

/**
 * Where the row sits for a raw finger position. 1:1 up to `limit` (the commit
 * point) and elastic past it — iOS resists only past the expansion target, so
 * the whole travel from closed to committed tracks the hand exactly.
 *
 * `limit <= 0` means the side has no actions, and the row refuses to move.
 */
export function trackOffset(raw: number, limit: number, rowWidth: number): number {
  if (limit <= 0) return 0
  const magnitude = Math.abs(raw)
  if (magnitude <= limit) return raw
  const room = Math.max(MIN_OVERSCROLL, rowWidth - limit)
  return Math.sign(raw) * (limit + rubberband(magnitude - limit, room, OVERSCROLL_ELASTICITY))
}

/**
 * The detent a release lands on.
 *
 * Commit is decided by where the row *is*, never by projection: the outermost
 * action has already expanded to fill the row by then, so the user can see the
 * commitment before letting go. Projecting into it would fire a destructive
 * action off a flick that never looked committed.
 *
 * The two rest positions are closed and fully open — nothing in between. That
 * is the whole difference between a sticky swipe and a draggy one.
 */
export function resolveRelease(input: {
  offset: number
  velocity: number
  openWidth: number
  committed: boolean
}): { target: number; commit: boolean } {
  if (input.committed) return { target: 0, commit: true }
  const open = input.openWidth
  if (open <= 0) return { target: 0, commit: false }
  const sign = input.offset < 0 ? -1 : 1
  const magnitude = Math.abs(input.offset)
  // Clamped to one detent: enough for a flick to flip the decision, not enough
  // for a hard one to mean something absurd on a 230px row.
  const thrown = Math.max(-open, Math.min(open, project(input.velocity * sign)))
  const projected = magnitude + thrown
  return { target: Math.abs(projected - open) < Math.abs(projected) ? sign * open : 0, commit: false }
}

/** One frame of a damped spring (mass 1), seeded with the release velocity. */
export function springStep(
  value: number,
  velocity: number,
  target: number,
  dt: number,
  response: number,
  dampingRatio: number
): { value: number; velocity: number; done: boolean } {
  // Clamped to one frame of a plausible display. A backgrounded window hands
  // back a huge dt on the next frame and integrating it literally launches the
  // row off screen; a clock that barely moves (a faked one, a stalled
  // compositor) would otherwise leave the spring frozen mid-flight.
  const step = Math.min(Math.max(dt, 1 / 120), 1 / 30)
  const stiffness = (2 * Math.PI / response) ** 2
  const damping = 2 * dampingRatio * Math.sqrt(stiffness)
  const nextVelocity = velocity + (-stiffness * (value - target) - damping * velocity) * step
  const nextValue = value + nextVelocity * step
  const done = Math.abs(nextValue - target) < 0.5 && Math.abs(nextVelocity) < 20
  return { value: done ? target : nextValue, velocity: done ? 0 : nextVelocity, done }
}

export interface TrayLayout {
  buttonWidth: number
  /** Whether the buttons have room for their text. */
  labelled: boolean
  /** The single open detent for this side. */
  openWidth: number
  /** Travel past which the outermost action expands and takes the release. */
  commitPoint: number
}

/**
 * Size a tray from the widths its labels actually measure.
 *
 * The button width used to come from a table of tier constants, which is really
 * a guess about how wide "This weekend" renders — and a guess that was wrong
 * clipped it to "This w…". So a label that does not fit is not shown at all:
 * the icon it would have replaced says more than an ellipsis does.
 *
 * `wasLabelled` is the previous answer, and it buys the hysteresis band.
 */
export function trayLayout(rowWidth: number, labelWidths: number[], wasLabelled: boolean): TrayLayout {
  const count = labelWidths.length
  // A side with no actions refuses the gesture: commitPoint 0 makes
  // `trackOffset` pin it shut.
  if (!count) return { buttonWidth: 0, labelled: false, openWidth: 0, commitPoint: 0 }
  // An unmeasured row (jsdom, or the first frame) must still resolve to
  // something bounded rather than "commits instantly" or "never commits".
  const measured = rowWidth > RESERVE_PX
  const room = measured ? rowWidth - RESERVE_PX : count * ICON_WIDTH
  const wide = Math.max(MIN_LABEL_WIDTH, Math.ceil(Math.max(...labelWidths)) + LABEL_PADDING)
  const labelled = count * wide <= room + (wasLabelled ? LABEL_BAND : 0)
  const buttonWidth = labelled ? wide : ICON_WIDTH
  const openWidth = Math.min(count * buttonWidth, Math.max(room, count * MIN_BUTTON_WIDTH))
  const commitPoint = measured
    ? Math.min(Math.max(rowWidth * 0.8, openWidth + COMMIT_CLEARANCE), rowWidth - COMMIT_EDGE_INSET)
    : openWidth + COMMIT_CLEARANCE
  return { buttonWidth, labelled, openWidth, commitPoint }
}
