import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        storybookTest({
            configDir: path.join(__dirname, '.storybook'),
        }),
    ],
    test: {
        name: 'storybook',
        browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
        },
        coverage: {
            provider: 'v8',
            include: ['packages/*/src/**/*.{ts,tsx}'],
            exclude: ['**/*.stories.*', '**/*.d.ts', '**/index.ts'],
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: './coverage',
        },
    },
})
