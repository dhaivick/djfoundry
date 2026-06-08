import { expect, userEvent, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `Displays a short label near a trigger element on hover or focus. The trigger element receives \`aria-describedby\` pointing to the tooltip — no extra ARIA work needed.

## Import
\`\`\`tsx
import { Tooltip } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        placement: {
            control: 'radio',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Position of the tooltip relative to the trigger.',
            table: { defaultValue: { summary: 'top' } },
        },
        content: {
            control: 'text',
            description: 'Content shown inside the tooltip.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Tooltip } from '@dhaivick/ui'
import { Button } from '@dhaivick/ui'

<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`,
            },
        },
    },
    render: () => (
        <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
            <Tooltip content="Save your changes">
                <Button>Save</Button>
            </Tooltip>
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: 'Save' })
        await userEvent.hover(trigger)
        await expect(canvas.getByRole('tooltip')).toBeVisible()
        await userEvent.unhover(trigger)
        await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument()
    },
}

export const Placements: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Four placement options — `top` (default), `bottom`, `left`, and `right`.' },
            source: {
                code: `import { Tooltip, Button } from '@dhaivick/ui'

<Tooltip content="Tooltip on top" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Tooltip on bottom" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Tooltip on left" placement="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Tooltip on right" placement="right">
  <Button>Right</Button>
</Tooltip>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 16, padding: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Tooltip content="Tooltip on top" placement="top"><Button>Top</Button></Tooltip>
            <Tooltip content="Tooltip on bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
            <Tooltip content="Tooltip on left" placement="left"><Button>Left</Button></Tooltip>
            <Tooltip content="Tooltip on right" placement="right"><Button>Right</Button></Tooltip>
        </div>
    ),
}

export const OnText: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Tooltips work on any focusable element, not just buttons.' },
            source: {
                code: `import { Tooltip } from '@dhaivick/ui'

<Tooltip content="ISO 8601 format: YYYY-MM-DD">
  <span tabIndex={0} style={{ textDecoration: 'underline dotted', cursor: 'help' }}>
    Date format
  </span>
</Tooltip>`,
            },
        },
    },
    render: () => (
        <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
            <Tooltip content="ISO 8601 format: YYYY-MM-DD">
                <span tabIndex={0} style={{ textDecoration: 'underline dotted', cursor: 'help', fontSize: 14 }}>
                    Date format
                </span>
            </Tooltip>
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByText('Date format')
        await userEvent.tab()
        await expect(canvas.getByRole('tooltip')).toBeVisible()
        await userEvent.tab()
        await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument()
    },
}
