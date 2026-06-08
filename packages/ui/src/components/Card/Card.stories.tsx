import { expect, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A surface container with an optional header, body, and footer. Use it to group related content with a clear visual boundary.

## Import
\`\`\`tsx
import { Card } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        padding: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the body (and header/footer) padding.',
            table: { defaultValue: { summary: 'md' } },
        },
        shadow: {
            control: 'boolean',
            description: 'Adds a drop shadow to lift the card.',
            table: { defaultValue: { summary: 'false' } },
        },
        header: {
            control: 'text',
            description: 'Content rendered in the header section above the body.',
        },
        footer: {
            control: 'text',
            description: 'Content rendered in the footer section below the body.',
        },
        children: {
            control: 'text',
            description: 'Main content inside the card body.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Card } from '@dhaivick/ui'

<Card>Card content goes here.</Card>`,
            },
        },
    },
    args: { children: 'Card content goes here.' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Card content goes here.')).toBeVisible()
    },
}

export const WithHeader: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Card } from '@dhaivick/ui'

<Card header="Card Title">
  This card has a header section separated by a divider.
</Card>`,
            },
        },
    },
    args: { header: 'Card Title', children: 'This card has a header section separated by a divider.' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Card Title')).toBeVisible()
    },
}

export const WithHeaderAndFooter: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Card } from '@dhaivick/ui'

<Card header="Card Title" footer="Last updated: today">
  A card with both a header and footer.
</Card>`,
            },
        },
    },
    args: {
        header: 'Card Title',
        children: 'A card with both a header and footer.',
        footer: 'Last updated: today',
    },
}

export const WithShadow: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Add `shadow` to lift the card off the page — useful on white backgrounds.' },
            source: {
                code: `import { Card } from '@dhaivick/ui'

<Card header="Elevated Card" shadow>
  This card has a drop shadow.
</Card>`,
            },
        },
    },
    args: { header: 'Elevated Card', children: 'This card has a drop shadow.', shadow: true },
}

export const Paddings: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three padding sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Card } from '@dhaivick/ui'

<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
            <Card padding="sm">Small padding</Card>
            <Card padding="md">Medium padding</Card>
            <Card padding="lg">Large padding</Card>
        </div>
    ),
}
