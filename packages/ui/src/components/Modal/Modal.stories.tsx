import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A dialog overlay rendered via \`createPortal\` directly into \`document.body\`. Closes on Escape key or backdrop click. The dialog receives focus on open and announces itself to screen readers via \`role="dialog"\` and \`aria-modal\`.

## Import
\`\`\`tsx
import { Modal } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the max-width of the dialog.',
            table: { defaultValue: { summary: 'md' } },
        },
        title: {
            control: 'text',
            description: 'Optional title shown in the dialog header.',
        },
        closeOnBackdrop: {
            control: 'boolean',
            description: 'Closes the modal when clicking the backdrop.',
            table: { defaultValue: { summary: 'true' } },
        },
        open: { table: { disable: true } },
        onClose: { table: { disable: true } },
    },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { useState } from 'react'
import { Modal, Button } from '@dhaivick/ui'

function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
        Modal content goes here.
      </Modal>
    </>
  )
}`,
            },
        },
    },
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
                    Modal content goes here.
                </Modal>
            </>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }))
        await expect(within(document.body).getByRole('dialog')).toBeVisible()
        await userEvent.click(within(document.body).getByRole('button', { name: 'Close dialog' }))
        await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    },
}

export const Sizes: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Three max-width sizes — `sm` (400px), `md` (560px, default), and `lg` (760px).' },
            source: {
                code: `import { Modal, Button } from '@dhaivick/ui'

<Modal open={open} onClose={onClose} title="Small Modal" size="sm">Content</Modal>
<Modal open={open} onClose={onClose} title="Medium Modal" size="md">Content</Modal>
<Modal open={open} onClose={onClose} title="Large Modal" size="lg">Content</Modal>`,
            },
        },
    },
    render: () => {
        const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null)
        return (
            <div style={{ display: 'flex', gap: 12 }}>
                {(['sm', 'md', 'lg'] as const).map((s) => (
                    <Button key={s} onClick={() => setSize(s)}>{s.toUpperCase()}</Button>
                ))}
                <Modal open={size !== null} onClose={() => setSize(null)} title={`${size?.toUpperCase()} Modal`} size={size ?? 'md'}>
                    This is a <strong>{size}</strong> modal.
                </Modal>
            </div>
        )
    },
}

export const WithoutTitle: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Omit `title` when your content already provides its own heading.' },
            source: {
                code: `import { useState } from 'react'
import { Modal, Button } from '@dhaivick/ui'

function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Custom heading inside body</h2>
        <p>Content here.</p>
      </Modal>
    </>
  )
}`,
            },
        },
    },
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open</Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <h2 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Custom heading inside body</h2>
                    <p style={{ margin: 0, fontSize: 14 }}>Content here.</p>
                </Modal>
            </>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
        await expect(within(document.body).getByRole('dialog')).toBeVisible()
        await userEvent.click(within(document.body).getByRole('button', { name: 'Close dialog' }))
        await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    },
}

export const EscapeToClose: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Pressing Escape closes the modal — no need to reach for the close button.' },
            source: {
                code: `import { useState } from 'react'
import { Modal, Button } from '@dhaivick/ui'

function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Press Escape to close">
        Press the Escape key to close this modal.
      </Modal>
    </>
  )
}`,
            },
        },
    },
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal open={open} onClose={() => setOpen(false)} title="Press Escape to close">
                    Press the Escape key to close this modal.
                </Modal>
            </>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }))
        await expect(within(document.body).getByRole('dialog')).toBeVisible()
        await userEvent.keyboard('a')
        await expect(within(document.body).getByRole('dialog')).toBeVisible()
        await userEvent.keyboard('{Escape}')
        await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    },
}

export const BackdropLocked: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Set `closeOnBackdrop={false}` to prevent backdrop clicks from closing — useful for confirmation dialogs that require an explicit action.' },
            source: {
                code: `import { useState } from 'react'
import { Modal, Button } from '@dhaivick/ui'

function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm action" closeOnBackdrop={false}>
        You must use the close button to dismiss this modal.
      </Modal>
    </>
  )
}`,
            },
        },
    },
    render: () => {
        const [open, setOpen] = useState(false)
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal open={open} onClose={() => setOpen(false)} title="Confirm action" closeOnBackdrop={false}>
                    You must use the close button to dismiss this modal.
                </Modal>
            </>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }))
        await expect(within(document.body).getByRole('dialog')).toBeVisible()
        await userEvent.click(within(document.body).getByRole('button', { name: 'Close dialog' }))
        await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    },
}
