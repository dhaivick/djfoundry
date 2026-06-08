import { expect, userEvent, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A single-line text field. Supports all standard HTML input types, an optional label, and inline error messages. Use \`value\` + \`onChange\` for controlled usage or leave both unset for uncontrolled.

## Import
\`\`\`tsx
import { Input } from '@dhaivick/ui'
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
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
            description: 'HTML input type. Affects mobile keyboard and browser validation hints.',
            table: { defaultValue: { summary: 'text' } },
        },
        label: {
            control: 'text',
            description: 'Visible label rendered above the input.',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text shown when the field is empty.',
        },
        error: {
            control: 'text',
            description: 'Error message shown below the input. Also turns the border red.',
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and applies a muted style.',
            table: { defaultValue: { summary: 'false' } },
        },
        value: {
            control: 'text',
            description: 'Controlled value.',
        },
        onChange: {
            action: 'changed',
            description: 'Change handler for controlled usage.',
            table: { category: 'Events' },
        },
    },
}

export default meta

type Story = StoryObj<typeof Input>

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Input } from '@dhaivick/ui'

<Input size="sm" label="Small" placeholder="Small" />
<Input size="md" label="Medium" placeholder="Medium" />
<Input size="lg" label="Large" placeholder="Large" />`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <Input size="sm" label="Small" placeholder="Small" />
            <Input size="md" label="Medium" placeholder="Medium" />
            <Input size="lg" label="Large" placeholder="Large" />
        </div>
    ),
}

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Input } from '@dhaivick/ui'\n\n<Input label="Name" placeholder="Enter your name" />` },
        },
    },
    args: { label: 'Name', placeholder: 'Enter your name' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByRole('textbox')
        await userEvent.type(input, 'Jane')
        await expect(input).toHaveValue('Jane')
    },
}

export const Types: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'The `type` prop maps to the native HTML `type` attribute — useful for mobile keyboards and built-in browser validation.' },
            source: {
                code: `import { Input } from '@dhaivick/ui'

<Input label="Text"     type="text"     placeholder="Plain text" />
<Input label="Email"    type="email"    placeholder="you@example.com" />
<Input label="Password" type="password" placeholder="••••••••" />
<Input label="Number"   type="number"   placeholder="0" />
<Input label="Tel"      type="tel"      placeholder="+1 555 000 0000" />
<Input label="URL"      type="url"      placeholder="https://example.com" />`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <Input label="Text" type="text" placeholder="Plain text" />
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="Number" type="number" placeholder="0" />
            <Input label="Tel" type="tel" placeholder="+1 555 000 0000" />
            <Input label="URL" type="url" placeholder="https://example.com" />
        </div>
    ),
}

export const Email: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Input } from '@dhaivick/ui'\n\n<Input label="Email" type="email" placeholder="you@example.com" />` },
        },
    },
    args: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
}

export const Password: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Input } from '@dhaivick/ui'\n\n<Input label="Password" type="password" placeholder="••••••••" />` },
        },
    },
    args: { label: 'Password', type: 'password', placeholder: '••••••••' },
}

export const Number: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Input } from '@dhaivick/ui'\n\n<Input label="Age" type="number" placeholder="0" />` },
        },
    },
    args: { label: 'Age', type: 'number', placeholder: '0' },
}

export const WithError: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Pass an `error` string to display validation feedback. The border turns red and the message appears below the field.' },
            source: {
                code: `import { Input } from '@dhaivick/ui'

<Input
  label="Email"
  type="email"
  value="not-an-email"
  error="Please enter a valid email address."
/>`,
            },
        },
    },
    args: { label: 'Email', type: 'email', value: 'not-an-email', error: 'Please enter a valid email address.' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Please enter a valid email address.')).toBeVisible()
        await expect(canvas.getByRole('textbox')).toHaveValue('not-an-email')
    },
}

export const Disabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'A disabled input cannot be focused or edited. Its value is still readable but grayed out.' },
            source: { code: `import { Input } from '@dhaivick/ui'\n\n<Input label="Username" value="dhaivick" disabled />` },
        },
    },
    args: { label: 'Username', value: 'dhaivick', disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('textbox')).toBeDisabled()
    },
}
