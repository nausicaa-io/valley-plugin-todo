import { api } from './runtime'

export function renderInlineMarkdown(value: string): Promise<string> {
  return api.markdown.render(value, { inline: true })
}
