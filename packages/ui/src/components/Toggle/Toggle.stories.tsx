import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
    title: 'Components/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A switch-style toggle built on a native \`<input type="checkbox" role="switch">\`. Semantically equivalent to a checkbox but visually communicates an immediate on/off effect rather than a form selection.

## Import
\`\`\`tsx
import { Toggle } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the size of the track and thumb.',
            table: { defaultValue: { summary: 'md' } },
        },
        label: {
            control: 'text',
            description: 'Label text rendered next to the toggle.',
        },
        checked: {
            control: 'boolean',
            description: 'Controlled on/off state.',
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and applies a muted style.',
            table: { defaultValue: { summary: 'false' } },
        },
        enabledText: {
            control: 'text',
            description: 'Text shown inside the track when on. Enables the labeled variant.',
        },
        disabledText: {
            control: 'text',
            description: 'Text shown inside the track when off. Used with `enabledText`.',
        },
        onChange: {
            action: 'changed',
            description: 'Change handler for controlled usage.',
            table: { category: 'Events' },
        },
    },
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Toggle } from '@dhaivick/ui'

<Toggle size="sm" label="Small" />
<Toggle size="md" label="Medium" />
<Toggle size="lg" label="Large" />`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Toggle size="sm" label="Small" />
            <Toggle size="md" label="Medium" />
            <Toggle size="lg" label="Large" />
        </div>
    ),
}

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { useState } from 'react'
import { Toggle } from '@dhaivick/ui'

const [checked, setChecked] = useState(false)

<Toggle
  label="Enable notifications"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`,
            },
        },
    },
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Toggle
                label="Enable notifications"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const toggle = canvas.getByRole('switch')
        const label = toggle.parentElement as HTMLElement
        await expect(toggle).not.toBeChecked()
        await userEvent.click(label)
        await expect(toggle).toBeChecked()
        await userEvent.click(label)
        await expect(toggle).not.toBeChecked()
    },
}

export const Labeled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: {
                story: 'Pass `enabledText` and `disabledText` to show text inside the track. The enabled text fades in on the left when on; the disabled text fades in on the right when off.',
            },
            source: {
                code: `import { useState } from 'react'
import { Toggle } from '@dhaivick/ui'

const [checked, setChecked] = useState(false)

<Toggle
  label="Notifications"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  enabledText="On"
  disabledText="Off"
/>`,
            },
        },
    },
    render: () => {
        const [checked, setChecked] = useState(false)
        return (
            <Toggle
                label="Notifications"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                enabledText="On"
                disabledText="Off"
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const toggle = canvas.getByRole('switch')
        const label = toggle.parentElement as HTMLElement
        await expect(toggle).not.toBeChecked()
        await userEvent.click(label)
        await expect(toggle).toBeChecked()
    },
}

export const Disabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'A disabled toggle cannot be interacted with.' },
            source: { code: `import { Toggle } from '@dhaivick/ui'\n\n<Toggle label="Feature unavailable" disabled />` },
        },
    },
    args: { label: 'Feature unavailable', disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('switch')).toBeDisabled()
    },
}

export const DisabledOn: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Read-only enabled state — useful for displaying a locked setting.' },
            source: { code: `import { Toggle } from '@dhaivick/ui'\n\n<Toggle label="Always enabled" checked disabled />` },
        },
    },
    args: { label: 'Always enabled', checked: true, disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const toggle = canvas.getByRole('switch')
        await expect(toggle).toBeChecked()
        await expect(toggle).toBeDisabled()
    },
}
