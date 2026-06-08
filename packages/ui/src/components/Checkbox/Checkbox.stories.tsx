import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A custom-styled checkbox built on a native \`<input type="checkbox">\`. The native input is visually hidden but remains in the accessibility tree, so keyboard navigation and screen readers work without extra ARIA attributes.

## Import
\`\`\`tsx
import { Checkbox } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the size of the box and label text.',
            table: { defaultValue: { summary: 'md' } },
        },
        label: {
            control: 'text',
            description: 'Label text rendered next to the checkbox.',
        },
        checked: {
            control: 'boolean',
            description: 'Controlled checked state.',
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and applies a muted style.',
            table: { defaultValue: { summary: 'false' } },
        },
        onChange: {
            action: 'changed',
            description: 'Change handler for controlled usage.',
            table: { category: 'Events' },
        },
    },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Checkbox } from '@dhaivick/ui'

<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox size="sm" label="Small" />
            <Checkbox size="md" label="Medium" />
            <Checkbox size="lg" label="Large" />
        </div>
    ),
}

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { useState } from 'react'
import { Checkbox } from '@dhaivick/ui'

const [checked, setChecked] = useState(false)

<Checkbox
  label="Accept terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`,
            },
        },
    },
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Checkbox
                label="Accept terms and conditions"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkbox = canvas.getByRole('checkbox')
        const label = checkbox.parentElement as HTMLElement
        await expect(checkbox).not.toBeChecked()
        await userEvent.click(label)
        await expect(checkbox).toBeChecked()
        await userEvent.click(label)
        await expect(checkbox).not.toBeChecked()
    },
}

export const Disabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'A disabled checkbox cannot be toggled.' },
            source: { code: `import { Checkbox } from '@dhaivick/ui'\n\n<Checkbox label="Option unavailable" disabled />` },
        },
    },
    args: { label: 'Option unavailable', disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('checkbox')).toBeDisabled()
    },
}

export const DisabledChecked: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Read-only checked state — useful for displaying a locked selection.' },
            source: { code: `import { Checkbox } from '@dhaivick/ui'\n\n<Checkbox label="Already selected" checked disabled />` },
        },
    },
    args: { label: 'Already selected', checked: true, disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const checkbox = canvas.getByRole('checkbox')
        await expect(checkbox).toBeChecked()
        await expect(checkbox).toBeDisabled()
    },
}
