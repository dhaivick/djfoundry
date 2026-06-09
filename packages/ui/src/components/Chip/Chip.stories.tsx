import { expect, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
    title: 'Components/Chip',
    component: Chip,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A small inline label for status, category, or count. Five semantic color variants and three sizes.

## Import
\`\`\`tsx
import { Chip } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'radio',
            options: ['default', 'success', 'warning', 'error', 'info'],
            description: 'Color variant.',
            table: { defaultValue: { summary: 'default' } },
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls padding and font size.',
            table: { defaultValue: { summary: 'md' } },
        },
        children: {
            control: 'text',
            description: 'Chip label text.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Chip>

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Chip } from '@dhaivick/ui'\n\n<Chip>Default</Chip>` },
        },
    },
    args: { children: 'Default' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Default')).toBeVisible()
    },
}

export const Variants: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Five semantic variants for different contexts.' },
            source: {
                code: `import { Chip } from '@dhaivick/ui'

<Chip variant="default">Default</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>
<Chip variant="info">Info</Chip>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip variant="default">Default</Chip>
            <Chip variant="success">Success</Chip>
            <Chip variant="warning">Warning</Chip>
            <Chip variant="error">Error</Chip>
            <Chip variant="info">Info</Chip>
        </div>
    ),
}

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Chip } from '@dhaivick/ui'

<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
        </div>
    ),
}

export const Success: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Chip } from '@dhaivick/ui'\n\n<Chip variant="success">Active</Chip>` } },
    },
    args: { children: 'Active', variant: 'success' },
}

export const Warning: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Chip } from '@dhaivick/ui'\n\n<Chip variant="warning">Pending</Chip>` } },
    },
    args: { children: 'Pending', variant: 'warning' },
}

export const Error: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Chip } from '@dhaivick/ui'\n\n<Chip variant="error">Failed</Chip>` } },
    },
    args: { children: 'Failed', variant: 'error' },
}

export const Info: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Chip } from '@dhaivick/ui'\n\n<Chip variant="info">New</Chip>` } },
    },
    args: { children: 'New', variant: 'info' },
}
