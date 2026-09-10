// @vitest-environment node
import { it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join as joinStylePath } from 'node:path'
import { overflowMenuDiagnostics } from '@valley/plugin-tools'

it('gives openFab overflow actions semantic icons', () => {
  expect(overflowMenuDiagnostics(readFileSync(joinStylePath(process.cwd(), 'src/Page.tsx'), 'utf8'), ['openFab'])).toEqual([])
})

it('gives TodoMenu overflow actions semantic icons', () => {
  expect(overflowMenuDiagnostics(readFileSync(joinStylePath(process.cwd(), 'src/TodoMenu.tsx'), 'utf8'), ['TodoMenu'])).toEqual([])
})
