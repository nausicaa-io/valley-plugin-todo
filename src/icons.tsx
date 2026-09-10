import { React } from './runtime'
import type { ReactElement, ReactNode } from 'react'

/** Inline SVG icons rendered through the plugin's injected React instance. */
type IconProps = { className?: string; title?: string }

const Svg = (props: IconProps & { children: ReactNode }): ReactElement =>
  React.createElement(
    'svg',
    {
      className: props.className,
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true
    },
    props.title ? <title>{props.title}</title> : null,
    props.children
  )

const FilledSvg = (props: IconProps & { children: ReactNode; viewBox?: string }): ReactElement =>
  React.createElement(
    'svg',
    {
      className: props.className,
      width: '1em',
      height: '1em',
      viewBox: props.viewBox ?? '0 0 24 24',
      fill: 'currentColor',
      'aria-hidden': true
    },
    props.title ? <title>{props.title}</title> : null,
    props.children
  )

/** Material Design `MdCancel`, inlined to preserve the plugin's host React instance. */
export const MdCancel = (p: IconProps): ReactElement => (
  <FilledSvg {...p}>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </FilledSvg>
)

/** Material Design `MdPauseCircle`, inlined to preserve the plugin's host React instance. */
export const MdPauseCircle = (p: IconProps): ReactElement => (
  <FilledSvg {...p} viewBox="2 2 20 20">
    <circle cx="12" cy="12" r="10" fill="#fff" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
  </FilledSvg>
)

/** In Progress — a circle half filled, the universal "started" mark. */
export const StatusInProgress = (p: IconProps): ReactElement => (
  <FilledSvg {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z" />
  </FilledSvg>
)

/** Waiting — a clock, i.e. blocked on someone else's move. */
export const StatusWaiting = (p: IconProps): ReactElement => (
  <FilledSvg {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z" />
  </FilledSvg>
)

/** Delegated — an arrow leaving toward a person. */
export const StatusDelegated = (p: IconProps): ReactElement => (
  <FilledSvg {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z" />
  </FilledSvg>
)

/** Deferred — a crescent moon: parked for someday, not dropped. */
export const StatusDeferred = (p: IconProps): ReactElement => (
  <FilledSvg {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z" />
  </FilledSvg>
)

/** The done check, as a filled disc — the completed twin of the outline states. */
export const StatusCompleted = (p: IconProps): ReactElement => (
  <FilledSvg {...p}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z" />
  </FilledSvg>
)

/**
 * The leading glyph for a status, in every surface that lists them (the
 * checkbox hold-menu, ⋯ → Status, the swipe tray). `open` keeps the hollow dot —
 * it is the absence of a status, and drawing it a glyph implies otherwise.
 */
const STATUS_GLYPHS: Record<string, (p: IconProps) => ReactElement> = {
  inprogress: StatusInProgress,
  waiting: StatusWaiting,
  onhold: MdPauseCircle,
  delegated: StatusDelegated,
  deferred: StatusDeferred,
  completed: StatusCompleted,
  canceled: MdCancel
}

export const TodoStatusGlyph = ({ status, dotCls }: { status: string | null; dotCls: string }): ReactElement => {
  const Glyph = status ? STATUS_GLYPHS[status] : undefined
  if (Glyph) return <Glyph className={`todo-status-menu-svg ${dotCls}`} />
  return <span className={`todo-status-menu-dot ${dotCls}`} />
}

export const Plus = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
)

export const Search = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>
)

export const X = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
)

export const GripVertical = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" /></Svg>
)

export const Lock = (p: IconProps): ReactElement => (
  <Svg {...p}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Svg>
)

export const Ellipsis = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Svg>
)

export const Info = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></Svg>
)

export const CompactView = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="3" rx="1" />
    <rect x="3" y="10.5" width="18" height="3" rx="1" />
    <rect x="3" y="17" width="18" height="3" rx="1" />
  </Svg>
)

export const ComfortableView = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="7" rx="1.5" />
    <rect x="3" y="14" width="18" height="7" rx="1.5" />
  </Svg>
)

export const SortAscending = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4" /></Svg>
)

export const SortDescending = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10" /></Svg>
)

export const UpdatedSortGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-2.3-5.7L20 8.6" />
    <path d="M20 4v4.6h-4.6M12 8v4l3 2" />
  </Svg>
)

export const CreatedSortGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6" />
  </Svg>
)

export const NameSortGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4" /></Svg>
)

export const ChevronDown = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
)

export const Flag = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <path d="M4 22v-7" />
  </Svg>
)

/** Font Awesome `FaExclamation`, inlined to preserve the plugin's host React instance. */
export const FaExclamation = (p: IconProps): ReactElement => (
  <FilledSvg {...p} viewBox="0 0 192 512">
    <path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z" />
  </FilledSvg>
)

export const Pencil = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Svg>
)

export const FolderInput = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
    <path d="m9 14 3 3 3-3M12 17V9" />
  </Svg>
)

export const CircleCheck = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 3 3 5-6" />
  </Svg>
)

export const Trash = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </Svg>
)

export const Bell = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Svg>
)

/** The meta line's clock — a start/end time is a point on the dial, not a date. */
export const Clock = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)

/**
 * Priority, as rising bars. Deliberately level-neutral rather than an arrow:
 * one glyph serves low, medium and high, and the colour says which.
 */
export const PriorityGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M6 20v-4M12 20V10M18 20V4" />
  </Svg>
)

export const Link = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </Svg>
)

export const Settings = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
)

/** Settings-style lucide `group` glyph used by the counted group filter. */
export const GroupGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2" />
    <rect width="7" height="5" x="7" y="5" rx="1" />
    <rect width="7" height="5" x="10" y="14" rx="1" />
  </Svg>
)

/** The ➤ beside a location: lucide `navigation`, the same glyph the map uses. */
export const Navigation = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </Svg>
)

/** A place, as the row's meta line and the detail label denote one. */
export const MapPin = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
)

export const Paperclip = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48" />
  </Svg>
)

/* Attachment-card glyphs — one per `FileIconId` family the cards can show. */
export const FileGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </Svg>
)

export const ImageGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21" />
  </Svg>
)

export const AudioGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></Svg>
)

export const VideoGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="m22 8-6 4 6 4V8z" /><rect width="14" height="12" x="2" y="6" rx="2" /></Svg>
)

export const CalendarClock = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="18" cy="18" r="4" />
    <path d="M18 16.5V18l1 1" />
  </Svg>
)

export const CalendarToday = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="12" cy="15" r="2" fill="currentColor" stroke="none" />
  </Svg>
)

export const CalendarDays = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </Svg>
)

export const Inbox = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </Svg>
)

/* Swipe-tray glyphs. */
export const ArrowRightCircle = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8l4 4-4 4M8 12h8" /></Svg>
)

/** "This weekend" — a deck chair reads as time off at 15px better than a sun. */
export const Weekend = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M3 18h18" />
    <path d="M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
    <path d="M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
    <path d="M4 21v-3M20 21v-3" />
  </Svg>
)

/* Indent / outdent — Apple-Reminders nesting. */
export const IndentGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M21 6H11M21 12H11M21 18H11" /><path d="m3 8 4 4-4 4" /></Svg>
)

export const OutdentGlyph = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M21 6H11M21 12H11M21 18H11" /><path d="m7 8-4 4 4 4" /></Svg>
)
