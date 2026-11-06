export interface ParsedSearch {
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
 * Match a record against a search query.
 * Every `#tag` token must prefix-match one of the record's tags (AND), and any
 * remaining free text must be a substring of one of `textFields`.
 */
export function matchesSearch(query: string, tags: string[], ...textFields: string[]): boolean {
  return searchMatcher(query)(tags, ...textFields)
}

/** {@link matchesSearch} with the query parsed once, for filtering a whole list. */
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
