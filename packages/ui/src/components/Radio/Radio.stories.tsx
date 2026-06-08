import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './Radio'

const meta: Meta<typeof RadioGroup> = {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A group of mutually exclusive radio options rendered inside a \`<fieldset>\`. Uses native \`<input type="radio">\` inputs (visually hidden) for full keyboard and screen-reader support. Individual options can be disabled independently via \`option.disabled\`.

## Import
\`\`\`tsx
import { RadioGroup } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the size of the radio dots and label text.',
            table: { defaultValue: { summary: 'md' } },
        },
        label: {
            control: 'text',
            description: 'Legend text rendered above the group.',
        },
        name: {
            control: 'text',
            description: 'Shared `name` attribute — required for browser grouping of radio inputs.',
        },
        value: {
            control: 'text',
            description: 'Currently selected value.',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables all options in the group.',
            table: { defaultValue: { summary: 'false' } },
        },
        error: {
            control: 'text',
            description: 'Error message shown below the group.',
        },
        options: {
            description: 'Array of `{ value, label, disabled? }` objects.',
            table: { type: { summary: 'RadioOption[]' } },
        },
        onChange: {
            action: 'changed',
            description: 'Called with the selected `value` string.',
            table: { category: 'Events' },
        },
    },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

const sizes = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
]

const sizesSource = `const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]`

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three sizes — `sm`, `md` (default), and `lg`.' },
            source: {
                code: `import { RadioGroup } from '@dhaivick/ui'

<RadioGroup size="sm" label="Small" name="sm" options={sizes} />
<RadioGroup size="md" label="Medium" name="md" options={sizes} />
<RadioGroup size="lg" label="Large" name="lg" options={sizes} />`,
            },
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: 32 }}>
            <RadioGroup size="sm" label="Small" name="size-sm" options={sizes} />
            <RadioGroup size="md" label="Medium" name="size-md" options={sizes} />
            <RadioGroup size="lg" label="Large" name="size-lg" options={sizes} />
        </div>
    ),
}

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { useState } from 'react'
import { RadioGroup } from '@dhaivick/ui'

${sizesSource}

const [value, setValue] = useState('')

<RadioGroup label="Size" name="size" options={sizes} value={value} onChange={setValue} />`,
            },
        },
    },
    render: () => {
        const [value, setValue] = useState('')
        return (
            <RadioGroup label="Size" name="size" options={sizes} value={value} onChange={setValue} />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const mediumRadio = canvas.getByRole('radio', { name: 'Medium' })
        await userEvent.click(mediumRadio.parentElement as HTMLElement)
        await expect(mediumRadio).toBeChecked()
        await expect(canvas.getByRole('radio', { name: 'Small' })).not.toBeChecked()
    },
}

export const WithError: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Pass an `error` string to surface validation feedback below the group. In this demo the error clears once a selection is made.' },
            source: {
                code: `import { useState } from 'react'
import { RadioGroup } from '@dhaivick/ui'

${sizesSource}

const [value, setValue] = useState('')

<RadioGroup
  label="Size"
  name="size"
  options={sizes}
  value={value}
  onChange={setValue}
  error={value ? undefined : 'Please select a size.'}
/>`,
            },
        },
    },
    render: () => {
        const [value, setValue] = useState('')
        return (
            <RadioGroup
                label="Size"
                name="size-error"
                options={sizes}
                value={value}
                onChange={setValue}
                error={value ? undefined : 'Please select a size.'}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Please select a size.')).toBeVisible()
        const smallRadio = canvas.getByRole('radio', { name: 'Small' })
        await userEvent.click(smallRadio.parentElement as HTMLElement)
        await expect(canvas.queryByText('Please select a size.')).not.toBeInTheDocument()
    },
}

export const Disabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Setting `disabled` on the group disables all options.' },
            source: {
                code: `import { RadioGroup } from '@dhaivick/ui'

${sizesSource}

<RadioGroup label="Size" name="size" options={sizes} value="sm" disabled />`,
            },
        },
    },
    args: { label: 'Size', name: 'size', options: sizes, value: 'sm', disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        for (const radio of canvas.getAllByRole('radio')) {
            await expect(radio).toBeDisabled()
        }
    },
}

export const PartiallyDisabled: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Individual options can be disabled via `option.disabled` without affecting the rest of the group.' },
            source: {
                code: `import { useState } from 'react'
import { RadioGroup } from '@dhaivick/ui'

const [value, setValue] = useState('pro')

<RadioGroup
  label="Plan"
  name="plan"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
  value={value}
  onChange={setValue}
/>`,
            },
        },
    },
    render: () => {
        const [value, setValue] = useState('pro')
        return (
            <RadioGroup
                label="Plan"
                name="plan"
                options={[
                    { value: 'free', label: 'Free' },
                    { value: 'pro', label: 'Pro' },
                    { value: 'enterprise', label: 'Enterprise', disabled: true },
                ]}
                value={value}
                onChange={setValue}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('radio', { name: 'Enterprise' })).toBeDisabled()
        const freeRadio = canvas.getByRole('radio', { name: 'Free' })
        await userEvent.click(freeRadio.parentElement as HTMLElement)
        await expect(freeRadio).toBeChecked()
    },
}
