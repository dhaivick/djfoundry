import { expect, fn, userEvent, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A primary action element. Supports three sizes and a loading state that prevents double-submission by disabling the button and showing an animated spinner while keeping the button width stable.

## Import
\`\`\`tsx
import { Button } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls padding and font size.',
            table: { defaultValue: { summary: 'md' } },
        },
        loading: {
            control: 'boolean',
            description: 'Shows a spinner and disables the button. Use during async operations.',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and applies a muted style.',
            table: { defaultValue: { summary: 'false' } },
        },
        onClick: {
            action: 'clicked',
            description: 'Click handler. Not called when disabled or loading.',
            table: { category: 'Events' },
        },
        children: {
            control: 'text',
            description: 'Content rendered inside the button.',
        },
    },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Button } from '@dhaivick/ui'\n\n<Button>Click me</Button>` },
        },
    },
    args: { children: 'Click me', onClick: fn() },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button')
        await userEvent.click(button)
        await expect(args.onClick).toHaveBeenCalledOnce()
    },
}

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg` — map to 12 px / 14 px / 16 px font sizes.' },
            source: {
                code: `import { Button } from '@dhaivick/ui'

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
}

export const Small: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Button } from '@dhaivick/ui'\n\n<Button size="sm">Small</Button>` },
        },
    },
    args: { children: 'Small', size: 'sm' },
}

export const Medium: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Button } from '@dhaivick/ui'\n\n<Button size="md">Medium</Button>` },
        },
    },
    args: { children: 'Medium', size: 'md' },
}

export const Large: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Button } from '@dhaivick/ui'\n\n<Button size="lg">Large</Button>` },
        },
    },
    args: { children: 'Large', size: 'lg' },
}

export const Loading: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: {
                story: 'The label is hidden via `visibility: hidden` (not `display: none`) so the button width stays fixed during the loading transition.',
            },
            source: { code: `import { Button } from '@dhaivick/ui'\n\n<Button loading>Saving</Button>` },
        },
    },
    args: { children: 'Saving', loading: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button')).toBeDisabled()
    },
}

export const Disabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'A disabled button cannot be focused or activated. Prefer `loading` for async feedback.' },
            source: { code: `import { Button } from '@dhaivick/ui'\n\n<Button disabled>Unavailable</Button>` },
        },
    },
    args: { children: 'Unavailable', disabled: true, onClick: fn() },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button')
        await expect(button).toBeDisabled()
        await userEvent.click(button, { pointerEventsCheck: 0 })
        await expect(args.onClick).not.toHaveBeenCalled()
    },
}
