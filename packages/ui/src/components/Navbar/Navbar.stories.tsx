import { expect, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'
import { Button } from '../Button/Button'

const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `A horizontal navigation bar with a brand slot, navigation links, and an actions slot. The active link receives \`aria-current="page"\` for screen readers.

## Import
\`\`\`tsx
import { Navbar } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        sticky: {
            control: 'boolean',
            description: 'Sticks the navbar to the top of the viewport.',
            table: { defaultValue: { summary: 'false' } },
        },
        items: {
            description: 'Array of `{ label: string; href: string; active?: boolean }` objects.',
            table: { type: { summary: 'NavItem[]' } },
        },
    },
}

export default meta

type Story = StoryObj<typeof Navbar>

const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/components' },
    { label: 'GitHub', href: 'https://github.com' },
]

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Navbar } from '@dhaivick/ui'

const items = [
  { label: 'Home', href: '/', active: true },
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
]

<Navbar brand="djfoundry" items={items} />`,
            },
        },
    },
    args: { brand: 'djfoundry', items: navItems },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('djfoundry')).toBeVisible()
        await expect(canvas.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    },
}

export const WithActions: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Use the `actions` slot to add buttons or any element to the right side of the navbar.' },
            source: {
                code: `import { Navbar, Button } from '@dhaivick/ui'

<Navbar
  brand="djfoundry"
  items={items}
  actions={
    <>
      <Button size="sm">Sign in</Button>
      <Button size="sm">Get started</Button>
    </>
  }
/>`,
            },
        },
    },
    args: {
        brand: 'djfoundry',
        items: navItems,
        actions: (
            <div style={{ display: 'flex', gap: 8 }}>
                <Button size="sm">Sign in</Button>
                <Button size="sm">Get started</Button>
            </div>
        ),
    },
}

export const BrandOnly: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: { code: `import { Navbar } from '@dhaivick/ui'\n\n<Navbar brand="djfoundry" />` },
        },
    },
    args: { brand: 'djfoundry' },
}

export const Sticky: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Add `sticky` to pin the navbar to the top of the viewport as the user scrolls.' },
            source: {
                code: `import { Navbar } from '@dhaivick/ui'\n\n<Navbar brand="djfoundry" items={items} sticky />`,
            },
        },
    },
    args: { brand: 'djfoundry', items: navItems, sticky: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('navigation')).toBeVisible()
        await expect(canvas.getByText('djfoundry')).toBeVisible()
    },
}
