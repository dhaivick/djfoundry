import { expect, userEvent, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Code } from './Code'

const meta: Meta<typeof Code> = {
    title: 'Components/Code',
    component: Code,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `Renders code inline or as a syntax-highlighted block with a copy button. Inline mode wraps a \`<code>\` tag with a subtle background; block mode renders a dark \`<pre>\` panel with an optional language label and one-click copy.

## Import
\`\`\`tsx
import { Code } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        block: {
            control: 'boolean',
            description: 'Renders a full code block with toolbar instead of inline code.',
            table: { defaultValue: { summary: 'false' } },
        },
        language: {
            control: 'text',
            description: 'Language label shown in the toolbar (e.g. `tsx`, `bash`). Only visible in block mode.',
        },
        children: {
            control: 'text',
            description: 'The code string to display.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Code>

const snippet = `import { Button } from '@dhaivick/ui'

export function App() {
  return <Button>Click me</Button>
}`

export const Inline: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Code } from '@dhaivick/ui'\n\n<p>Use the <Code>className</Code> prop to extend styles.</p>` },
        },
    },
    render: () => (
        <p style={{ fontSize: 14, color: '#374151' }}>
            Use the <Code>className</Code> prop to extend styles.
        </p>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('className')).toBeVisible()
    },
}

export const Block: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Code } from '@dhaivick/ui'

const snippet = \`import { Button } from '@dhaivick/ui'

export function App() {
  return <Button>Click me</Button>
}\`

<Code block language="tsx">{snippet}</Code>`,
            },
        },
    },
    args: { block: true, language: 'tsx', children: snippet },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('tsx')).toBeVisible()
        await expect(canvas.getByRole('button', { name: 'Copy code' })).toBeVisible()
    },
}

export const BlockWithoutLanguage: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Code } from '@dhaivick/ui'\n\n<Code block>{snippet}</Code>`,
            },
        },
    },
    args: { block: true, children: snippet },
}

export const CopyInteraction: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Clicking Copy changes the button label to "Copied!" for 2 seconds.' },
            source: {
                code: `import { Code } from '@dhaivick/ui'\n\n<Code block language="bash">pnpm add @dhaivick/ui</Code>`,
            },
        },
    },
    args: { block: true, language: 'bash', children: 'pnpm add @dhaivick/ui' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const copyBtn = canvas.getByRole('button', { name: 'Copy code' })
        await userEvent.click(copyBtn)
        await expect(await canvas.findByText('Copied!')).toBeVisible()
    },
}
