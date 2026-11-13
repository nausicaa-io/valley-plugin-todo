import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { expect, it } from 'vitest'

const ROOT = resolve(__dirname, '..')
const UI_MODULES = ['src/runtime.ts', 'src/localization.ts', 'src/statuses.ts']

/** Every package module the backend bundle loads, following relative imports from its entry point. */
function backendModules(): string[] {
  const seen = new Set<string>()
  const visit = (file: string): void => {
    if (seen.has(file)) return
    seen.add(file)
    if (!/\.tsx?$/.test(file)) return
    const source = readFileSync(file, 'utf8')
    for (const [, specifier] of source.matchAll(/(?:import|export)\s[^'"]*?from\s+'([^']+)'/g)) {
      if (!specifier.startsWith('.')) {
        expect(specifier, `${file} imports ${specifier}`).not.toMatch(/^react(?:-dom)?(?:\/|$)/)
        continue
      }
      const target = resolve(dirname(file), specifier)
      const found = [target, `${target}.ts`, `${target}.tsx`, resolve(target, 'index.ts')].find((candidate) => existsSync(candidate) && statSync(candidate).isFile())
      if (!found) throw new Error(`${file}: cannot resolve ${specifier}`)
      visit(found)
    }
  }
  visit(resolve(ROOT, 'src/backend/index.ts'))
  return [...seen].map((file) => file.slice(ROOT.length + 1))
}

it('keeps the backend bundle free of the UI runtime, localization and components', () => {
  const modules = backendModules()
  expect(modules).toContain('src/backend/index.ts')
  expect(modules.filter((file) => file.endsWith('.tsx') || UI_MODULES.includes(file) || file.startsWith('locales/'))).toEqual([])
})
