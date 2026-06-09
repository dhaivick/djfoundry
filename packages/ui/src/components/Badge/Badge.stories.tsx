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
                component: `Wraps any element and overlays a small indicator badge at a corner. Use \`label\` for a numbered/text badge or omit it for a dot.

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
            table: { defaultValue: { summary: 'error' } },
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Indicator size.',
            table: { defaultValue: { summary: 'md' } },
        },
        placement: {
            control: 'radio',
            options: ['top-right', 'bottom-right'],
            description: 'Corner the badge is anchored to.',
            table: { defaultValue: { summary: 'top-right' } },
        },
        label: {
            control: 'text',
            description: 'Badge indicator text or number. Omit for a dot.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Badge>

const BoxIcon = () => (
    <div
        style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
        }}
    >
        🔔
    </div>
)

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Badge } from '@dhaivick/ui'

<Badge label="3">
  <button>Notifications</button>
</Badge>`,
            },
        },
    },
    args: { label: '3' },
    render: (args) => (
        <Badge {...args}>
            <BoxIcon />
        </Badge>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('3')).toBeVisible()
    },
}

export const Dot: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Omit `label` to render a plain dot indicator.' },
            source: {
                code: `import { Badge } from '@dhaivick/ui'

<Badge variant="success">
  <button>Status</button>
</Badge>`,
            },
        },
    },
    args: { variant: 'success' },
    render: (args) => (
        <Badge {...args}>
            <BoxIcon />
        </Badge>
    ),
}

export const Variants: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Five semantic color variants.' },
            source: {
                code: `import { Badge } from '@dhaivick/ui'

<Badge label="1" variant="default"><BoxIcon /></Badge>
<Badge label="2" variant="success"><BoxIcon /></Badge>
<Badge label="3" variant="warning"><BoxIcon /></Badge>
<Badge label="4" variant="error"><BoxIcon /></Badge>
<Badge label="5" variant="info"><BoxIcon /></Badge>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 12 }}>
            <Badge label="1" variant="default"><BoxIcon /></Badge>
            <Badge label="2" variant="success"><BoxIcon /></Badge>
            <Badge label="3" variant="warning"><BoxIcon /></Badge>
            <Badge label="4" variant="error"><BoxIcon /></Badge>
            <Badge label="5" variant="info"><BoxIcon /></Badge>
        </div>
    ),
}

export const Placements: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: '`top-right` (default) and `bottom-right` placements.' },
            source: {
                code: `import { Badge } from '@dhaivick/ui'

<Badge label="9" placement="top-right"><BoxIcon /></Badge>
<Badge label="9" placement="bottom-right"><BoxIcon /></Badge>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 24, padding: 12 }}>
            <Badge label="9" placement="top-right"><BoxIcon /></Badge>
            <Badge label="9" placement="bottom-right"><BoxIcon /></Badge>
        </div>
    ),
}

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three indicator sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Badge } from '@dhaivick/ui'

<Badge label="5" size="sm"><BoxIcon /></Badge>
<Badge label="5" size="md"><BoxIcon /></Badge>
<Badge label="5" size="lg"><BoxIcon /></Badge>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 12 }}>
            <Badge label="5" size="sm"><BoxIcon /></Badge>
            <Badge label="5" size="md"><BoxIcon /></Badge>
            <Badge label="5" size="lg"><BoxIcon /></Badge>
        </div>
    ),
}
