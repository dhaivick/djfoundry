import { expect, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A small inline label for status, category, or count. Five semantic color variants and three sizes.

## Import
\`\`\`tsx
import { Badge } from '@dhaivick/ui'
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
            description: 'Badge label text.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Badge } from '@dhaivick/ui'\n\n<Badge>Default</Badge>` },
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
                code: `import { Badge } from '@dhaivick/ui'

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
        </div>
    ),
}

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Badge } from '@dhaivick/ui'

<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
        </div>
    ),
}

export const Success: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Badge } from '@dhaivick/ui'\n\n<Badge variant="success">Active</Badge>` } },
    },
    args: { children: 'Active', variant: 'success' },
}

export const Warning: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Badge } from '@dhaivick/ui'\n\n<Badge variant="warning">Pending</Badge>` } },
    },
    args: { children: 'Pending', variant: 'warning' },
}

export const Error: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Badge } from '@dhaivick/ui'\n\n<Badge variant="error">Failed</Badge>` } },
    },
    args: { children: 'Failed', variant: 'error' },
}

export const Info: Story = {
    tags: ['!dev'],
    parameters: {
        docs: { source: { code: `import { Badge } from '@dhaivick/ui'\n\n<Badge variant="info">New</Badge>` } },
    },
    args: { children: 'New', variant: 'info' },
}
