import { expect, userEvent, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A styled native \`<select>\` dropdown with a custom chevron icon. Supports an optional label, placeholder, and inline error message. The native element is used intentionally for full accessibility and mobile support out of the box.

## Import
\`\`\`tsx
import { Select } from '@dhaivick/ui'
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
        label: {
            control: 'text',
            description: 'Visible label rendered above the select.',
        },
        placeholder: {
            control: 'text',
            description: 'Disabled first option shown when no value is selected — prompts the user to pick.',
        },
        error: {
            control: 'text',
            description: 'Error message shown below the select. Also turns the border red.',
        },
        disabled: {
            control: 'boolean',
            description: 'Prevents interaction and applies a muted style.',
            table: { defaultValue: { summary: 'false' } },
        },
        options: {
            description: 'Array of `{ value: string; label: string; disabled?: boolean }` objects.',
            table: { type: { summary: 'SelectOption[]' } },
        },
        value: {
            control: 'text',
            description: 'Controlled selected value.',
        },
        onChange: {
            action: 'changed',
            description: 'Change handler for controlled usage.',
            table: { category: 'Events' },
        },
    },
}

export default meta

type Story = StoryObj<typeof Select>

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
]

const fruitsSource = `const options = [
  { value: '', label: 'Pick a fruit', disabled: true },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]`

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { Select } from '@dhaivick/ui'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

<Select size="sm" label="Small" options={options} placeholder="Pick one" />
<Select size="md" label="Medium" options={options} placeholder="Pick one" />
<Select size="lg" label="Large" options={options} placeholder="Pick one" />`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <Select size="sm" label="Small" options={fruits} placeholder="Pick a fruit" />
            <Select size="md" label="Medium" options={fruits} placeholder="Pick a fruit" />
            <Select size="lg" label="Large" options={fruits} placeholder="Pick a fruit" />
        </div>
    ),
}

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Select } from '@dhaivick/ui'

${fruitsSource}

<Select label="Fruit" options={options} placeholder="Pick a fruit" />`,
            },
        },
    },
    args: { label: 'Fruit', options: fruits, placeholder: 'Pick a fruit' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const select = canvas.getByRole('combobox')
        await userEvent.selectOptions(select, 'banana')
        await expect(select).toHaveValue('banana')
    },
}

export const WithValue: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Pass a `value` that matches one of the option values to pre-select it.' },
            source: {
                code: `import { Select } from '@dhaivick/ui'

${fruitsSource}

<Select label="Fruit" options={options} value="banana" />`,
            },
        },
    },
    args: { label: 'Fruit', options: fruits, value: 'banana' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('combobox')).toHaveValue('banana')
    },
}

export const WithError: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Pass an `error` string to surface validation feedback below the select.' },
            source: {
                code: `import { Select } from '@dhaivick/ui'

${fruitsSource}

<Select
  label="Fruit"
  options={options}
  placeholder="Pick a fruit"
  error="Please select an option."
/>`,
            },
        },
    },
    args: { label: 'Fruit', options: fruits, placeholder: 'Pick a fruit', error: 'Please select an option.' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Please select an option.')).toBeVisible()
    },
}

export const WithDisabledOption: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Set `disabled: true` on an individual option to make it unselectable without disabling the whole field.' },
            source: {
                code: `import { Select } from '@dhaivick/ui'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
]

<Select label="Fruit" options={options} placeholder="Pick a fruit" />`,
            },
        },
    },
    args: {
        label: 'Fruit',
        placeholder: 'Pick a fruit',
        options: [
            { value: 'apple', label: 'Apple' },
            { value: 'banana', label: 'Banana', disabled: true },
            { value: 'cherry', label: 'Cherry' },
        ],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const select = canvas.getByRole('combobox')
        await userEvent.selectOptions(select, 'cherry')
        await expect(select).toHaveValue('cherry')
    },
}

export const Disabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'A disabled select cannot be opened or changed.' },
            source: {
                code: `import { Select } from '@dhaivick/ui'

${fruitsSource}

<Select label="Fruit" options={options} value="apple" disabled />`,
            },
        },
    },
    args: { label: 'Fruit', options: fruits, value: 'apple', disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('combobox')).toBeDisabled()
    },
}
