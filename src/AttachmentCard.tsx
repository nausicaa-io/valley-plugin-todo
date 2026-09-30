import { React, api } from './runtime'
import type { ReactElement } from 'react'
import {
  assetUrlForRelPath,
  classifyFilePath,
  fileExtension,
  type FileKind
} from '@valley/plugin-sdk/fileTypes'
import { AudioGlyph, FileGlyph, ImageGlyph, VideoGlyph, X } from './icons'
import { uiText } from './localization'

/**
 * One attachment, drawn as a clickable card with passive file content.
 *
 * Thumbnails are real only for images — a PDF page raster needs a live pdf.js
 * document handle, which is renderer-internal and not reachable from a plugin.
 * Everything else gets its kind glyph rather than a faked preview.
 */

const KIND_LABEL_KEYS: Partial<Record<FileKind, string>> = {
  pdf: 'todo.fileKind.pdf',
  image: 'todo.fileKind.image',
  audio: 'todo.fileKind.audio',
  video: 'todo.fileKind.video',
  text: 'todo.fileKind.text',
  code: 'todo.fileKind.code',
  csv: 'todo.fileKind.csv',
  json: 'todo.fileKind.json',
  docx: 'todo.fileKind.word',
  pptx: 'todo.fileKind.powerpoint',
  model3d: 'todo.fileKind.model3d'
}

/**
 * Bytes as a person reads them. A local copy on purpose: the host's
 * `formatBytes` lives in the renderer, which the plugin import boundary refuses.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return ''
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let value = bytes
  let i = 0
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024
    i++
  }
  const digits = i === 0 ? 0 : value >= 100 ? 0 : value >= 10 ? 1 : 2
  return `${value.toFixed(digits)} ${units[i]}`
}

/** The kind line: "PDF Document", falling back to the bare extension. */
export function kindLabel(relPath: string): string {
  const key = KIND_LABEL_KEYS[classifyFilePath(relPath)]
  if (key) return uiText(key)
  const ext = fileExtension(relPath).replace('.', '').toUpperCase()
  return ext ? uiText('todo.fileKind.generic', { p0: ext }) : uiText('todo.fileKind.file')
}

const GLYPHS: Partial<Record<FileKind, (p: { className?: string }) => ReactElement>> = {
  image: ImageGlyph,
  audio: AudioGlyph,
  video: VideoGlyph
}

export const AttachmentCard = ({
  relPath,
  onRemove
}: {
  relPath: string
  onRemove?: () => void
}): ReactElement => {
  const [size, setSize] = React.useState<number | null>(null)
  const kind = classifyFilePath(relPath)
  const name = relPath.split('/').pop() ?? relPath
  const Glyph = GLYPHS[kind] ?? FileGlyph

  React.useEffect(() => {
    let cancelled = false
    void api.vault.fileInfo(relPath).then((info) => {
      if (!cancelled) setSize(info?.size ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [relPath])

  // Re-request the bytes when the file changes on disk: an <img> handed the same
  // src string is never re-fetched, so without a version token it serves stale
  // pixels. (`useAssetUrl` is renderer-only — plugins bust their own.)
  const [epoch, setEpoch] = React.useState(0)
  React.useEffect(() => api.vault.onChanged(() => setEpoch((n) => n + 1)), [])
  const thumbSrc = kind === 'image' ? `${assetUrlForRelPath(relPath)}?v=${epoch}` : null

  return (
    <div className="todo-attach-card">
      <button
        className="todo-attach-open"
        type="button"
        onClick={(e) => api.workspace.openFile(relPath, undefined, { newTab: api.ui.hasModKey(e) })}
        title={relPath}
      >
        <span className="todo-attach-copy">
          <span className="todo-attach-name">{name}</span>
          <span className="todo-attach-meta">
            {kindLabel(relPath)}
            {size !== null && ` · ${formatBytes(size)}`}
          </span>
        </span>
        <span className="todo-attach-thumb">
          {thumbSrc ? <img src={thumbSrc} alt="" loading="lazy" /> : <Glyph />}
        </span>
      </button>
      {onRemove && (
        <button
          className="todo-attach-remove"
          type="button"
          onClick={onRemove}
          title={uiText('todo.removeAttachment')}
          aria-label={uiText('todo.removeAttachmentOf', { p0: name })}
        >
          <X />
        </button>
      )}
    </div>
  )
}
