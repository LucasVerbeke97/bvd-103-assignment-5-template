import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
    globalSetup: ['./database_test_setup.ts']
  }
})
