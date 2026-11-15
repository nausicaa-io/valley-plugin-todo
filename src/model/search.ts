interface ParsedSearch {
  tags: string[]
  text: string
}

/** Split a query into `#tag` tokens and the leftover free text. */
export function parseSearch(query: string): ParsedSearch {
  const tags: string[] = []
  const text = query
    .replace(/#(\S+)/g, (_, tag: string) => {
      tags.push(tag.toLowerCase())
      return ' '
    })
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
  return { tags, text }
}

/**
 * A matcher for one search query, parsed once for a whole list. Every `#tag`
 * token must prefix-match one of the record's tags (AND), and any remaining
 * free text must be a substring of one of `textFields`.
 */
export function searchMatcher(query: string): (tags: string[], ...textFields: string[]) => boolean {
  const parsed = parseSearch(query)
  if (!parsed.tags.length && !parsed.text) return () => true
  return (tags, ...textFields) => {
    for (const tag of parsed.tags) {
      if (!tags.some((t) => t.toLowerCase().startsWith(tag))) return false
    }
    return !parsed.text || textFields.some((f) => f.toLowerCase().includes(parsed.text))
  }
}

interface Haystack {
  tags: string[]
  withGroup: string[]
  withoutGroup: string[]
}

const haystacks = new WeakMap<object, Haystack>()

function haystackOf(todo: { tags?: string[]; title: string; note: string; group?: string | null }): Haystack {
  let hit = haystacks.get(todo)
  if (!hit) {
    const title = todo.title.toLowerCase()
    const note = todo.note.toLowerCase()
    hit = {
      tags: (todo.tags ?? []).map((t) => t.toLowerCase()),
      withGroup: [title, note, (todo.group ?? '').toLowerCase()],
      withoutGroup: [title, note]
    }
    haystacks.set(todo, hit)
  }
  return hit
}

/**
 * {@link searchMatcher} over whole records. The lowercased fields are cached
 * per record object, so typing re-lowercases nothing until a record changes.
 * `includeGroup` mirrors the lists, which search the group name too.
 */
export function todoSearchMatcher(
  query: string,
  includeGroup = true
): (todo: { tags?: string[]; title: string; note: string; group?: string | null }) => boolean {
  const parsed = parseSearch(query)
  if (!parsed.tags.length && !parsed.text) return () => true
  return (todo) => {
    const hay = haystackOf(todo)
    for (const tag of parsed.tags) {
      if (!hay.tags.some((t) => t.startsWith(tag))) return false
    }
    return !parsed.text || (includeGroup ? hay.withGroup : hay.withoutGroup).some((f) => f.includes(parsed.text))
  }
}
