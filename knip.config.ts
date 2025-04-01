import type { KnipConfig } from 'knip'
export default {
  entry: ['eslint.config.ts', 'sponsorkit.config.ts'],
  ignoreDependencies: ['lint-staged']
} satisfies KnipConfig
