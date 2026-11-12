export interface NoteLink {
  target: string
  label: string
  external: boolean
}

/**
 * Link targets in a note, in order and de-duplicated: wikilinks and embeds
 * (`[[path|alias]]`, `![[file.pdf#page=2]]`) as realm paths, Markdown links as
 * external URLs. Heading/block anchors and aliases are dropped from the target.
 */
export function noteLinkTargets(note: string, limit = 12): NoteLink[] {
  const out: NoteLink[] = []
  const seen = new Set<string>()
  const push = (link: NoteLink): void => {
    if (!link.target || seen.has(link.target) || out.length >= limit) return
    seen.add(link.target)
    out.push(link)
  }
  const pattern = /!?\[\[([^\]\n]+)\]\]|\[[^\]\n]*\]\((https?:\/\/[^)\s]+)\)/g
  for (const match of note.matchAll(pattern)) {
    if (match[1]) {
      const [path, alias] = match[1].split('|')
      const target = path.split('#')[0].trim()
      push({ target, label: alias?.trim() || target.split('/').pop() || target, external: false })
    } else if (match[2]) {
      push({ target: match[2], label: match[2].replace(/^https?:\/\//, '').replace(/\/$/, ''), external: true })
    }
  }
  return out
}
