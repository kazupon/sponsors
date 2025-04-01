import {
  defineConfig,
  javascript,
  jsonc,
  markdown,
  prettier,
  typescript,
  yaml
} from '@kazupon/eslint-config'
import { globalIgnores } from 'eslint/config'

export default defineConfig(
  javascript(),
  typescript(),
  jsonc({
    jsonc: true,
    json5: true,
    json: true
  }),
  yaml({
    rules: {
      'yml/quotes': 'off'
    }
  }),
  markdown(),
  prettier(),
  globalIgnores(['.vscode', 'pnpm-lock.yaml', 'tsconfig.json'])
)
