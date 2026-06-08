import { expect, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `A responsive data table with sticky-header-friendly scroll wrapper. Columns are defined declaratively and rows are plain objects — no render props required.

## Import
\`\`\`tsx
import { Table } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
    argTypes: {
        striped: {
            control: 'boolean',
            description: 'Applies alternating row background colors.',
            table: { defaultValue: { summary: 'false' } },
        },
        caption: {
            control: 'text',
            description: 'Accessible caption rendered below the table for screen readers.',
        },
        columns: {
            description: 'Array of `{ key: string; header: string; width?: string }` objects.',
            table: { type: { summary: 'TableColumn[]' } },
        },
        rows: {
            description: 'Array of objects whose keys match column `key` values.',
            table: { type: { summary: 'TableRow[]' } },
        },
    },
}

export default meta

type Story = StoryObj<typeof Table>

const columns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
    { key: 'joined', header: 'Joined' },
]

const rows = [
    { name: 'Alice Martin', role: 'Engineer', status: 'Active', joined: '2023-01-15' },
    { name: 'Bob Chen', role: 'Designer', status: 'Active', joined: '2023-03-22' },
    { name: 'Carol Singh', role: 'Manager', status: 'On leave', joined: '2022-11-08' },
    { name: 'David Kim', role: 'Engineer', status: 'Active', joined: '2024-02-01' },
    { name: 'Eva Rossi', role: 'QA', status: 'Inactive', joined: '2021-07-19' },
]

const tableSource = `const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
  { key: 'joined', header: 'Joined' },
]

const rows = [
  { name: 'Alice Martin', role: 'Engineer', status: 'Active', joined: '2023-01-15' },
  { name: 'Bob Chen',     role: 'Designer', status: 'Active', joined: '2023-03-22' },
]`

export const Default: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            source: {
                code: `import { Table } from '@dhaivick/ui'

${tableSource}

<Table columns={columns} rows={rows} />`,
            },
        },
    },
    args: { columns, rows },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('table')).toBeVisible()
        await expect(canvas.getByText('Alice Martin')).toBeVisible()
    },
}

export const Striped: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Add `striped` for alternating row backgrounds — easier to scan wide tables.' },
            source: {
                code: `import { Table } from '@dhaivick/ui'

${tableSource}

<Table columns={columns} rows={rows} striped />`,
            },
        },
    },
    args: { columns, rows, striped: true },
}

export const WithCaption: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'A `caption` is announced by screen readers before the table contents — use it when the table title is not already in the surrounding page.' },
            source: {
                code: `import { Table } from '@dhaivick/ui'

${tableSource}

<Table columns={columns} rows={rows} caption="Team members" />`,
            },
        },
    },
    args: { columns, rows, caption: 'Team members' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Team members')).toBeVisible()
    },
}

export const WithColumnWidths: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Set `width` on individual columns to pin them to a fixed size — useful when column content varies widely.' },
            source: {
                code: `import { Table } from '@dhaivick/ui'

<Table
  columns={[
    { key: 'name',   header: 'Name',   width: '200px' },
    { key: 'role',   header: 'Role',   width: '120px' },
    { key: 'status', header: 'Status' },
    { key: 'joined', header: 'Joined' },
  ]}
  rows={rows}
/>`,
            },
        },
    },
    args: {
        columns: [
            { key: 'name',   header: 'Name',   width: '200px' },
            { key: 'role',   header: 'Role',   width: '120px' },
            { key: 'status', header: 'Status' },
            { key: 'joined', header: 'Joined' },
        ],
        rows,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('table')).toBeVisible()
        await expect(canvas.getByText('Alice Martin')).toBeVisible()
    },
}
