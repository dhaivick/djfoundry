import { expect, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Row } from './Row'
import { Col } from './Col'

const meta: Meta = {
    title: 'Components/Grid',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `12-column responsive grid built on CSS Grid. \`Row\` defines the grid; \`Col\` sets how many of the 12 columns each cell spans at each breakpoint.

Breakpoints (min-width): **xs** 0 · **sm** 576 · **md** 768 · **lg** 992 · **xl** 1200

Each breakpoint falls back to the next smaller one — only set what changes.

## Import
\`\`\`tsx
import { Row, Col } from '@dhaivick/ui'
\`\`\``,
            },
        },
    },
}

export default meta

type Story = StoryObj

const Cell = ({ label }: { label?: string }) => (
    <div
        style={{
            background: '#e0e7ff',
            borderRadius: 6,
            padding: '10px 0',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: '#3730a3',
        }}
    >
        {label ?? ' '}
    </div>
)

export const EqualColumns: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Four equal columns via `xs={3}` (3 of 12 = 25% each).' },
            source: {
                code: `<Row>
  <Col xs={3}><div>1</div></Col>
  <Col xs={3}><div>2</div></Col>
  <Col xs={3}><div>3</div></Col>
  <Col xs={3}><div>4</div></Col>
</Row>`,
            },
        },
    },
    render: () => (
        <Row>
            {[1, 2, 3, 4].map((n) => <Col key={n} xs={3}><Cell label={String(n)} /></Col>)}
        </Row>
    ),
}

export const Responsive: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: {
                story:
                    'Full width on mobile → 2 columns on tablet → 3 columns on desktop. Resize the viewport to see it switch.',
            },
            source: {
                code: `<Row gutter={16}>
  <Col xs={12} sm={6} lg={4}><div>A</div></Col>
  <Col xs={12} sm={6} lg={4}><div>B</div></Col>
  <Col xs={12} sm={6} lg={4}><div>C</div></Col>
  <Col xs={12} sm={6} lg={4}><div>D</div></Col>
  <Col xs={12} sm={6} lg={4}><div>E</div></Col>
  <Col xs={12} sm={6} lg={4}><div>F</div></Col>
</Row>`,
            },
        },
    },
    render: () => (
        <Row gutter={16}>
            {'ABCDEF'.split('').map((l) => (
                <Col key={l} xs={12} sm={6} lg={4}>
                    <Cell label={l} />
                </Col>
            ))}
        </Row>
    ),
}

export const SidebarLayout: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: {
                story: 'Stacked on mobile, sidebar + main on desktop.',
            },
            source: {
                code: `<Row gutter={24}>
  <Col xs={12} md={3}><nav>Sidebar</nav></Col>
  <Col xs={12} md={9}><main>Main content</main></Col>
</Row>`,
            },
        },
    },
    render: () => (
        <Row gutter={24}>
            <Col xs={12} md={3}>
                <div style={{ background: '#fef9c3', borderRadius: 6, padding: 16, fontSize: 12, color: '#854d0e', fontWeight: 600 }}>
                    Sidebar (xs=12 md=3)
                </div>
            </Col>
            <Col xs={12} md={9}>
                <div style={{ background: '#dcfce7', borderRadius: 6, padding: 16, fontSize: 12, color: '#166534', fontWeight: 600 }}>
                    Main content (xs=12 md=9)
                </div>
            </Col>
        </Row>
    ),
}

export const MixedWidths: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: { story: 'Columns of different widths summing to 12.' },
            source: {
                code: `<Row gutter={12}>
  <Col xs={8}><div>8</div></Col>
  <Col xs={4}><div>4</div></Col>
  <Col xs={4}><div>4</div></Col>
  <Col xs={4}><div>4</div></Col>
  <Col xs={4}><div>4</div></Col>
  <Col xs={6}><div>6</div></Col>
  <Col xs={6}><div>6</div></Col>
</Row>`,
            },
        },
    },
    render: () => (
        <Row gutter={12}>
            {[
                { span: 8, label: '8' },
                { span: 4, label: '4' },
                { span: 4, label: '4' },
                { span: 4, label: '4' },
                { span: 4, label: '4' },
                { span: 6, label: '6' },
                { span: 6, label: '6' },
            ].map(({ span, label }, i) => (
                <Col key={i} xs={span as 1}>
                    <Cell label={label} />
                </Col>
            ))}
        </Row>
    ),
}

export const Gutter: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: {
                story: 'Use a `[colGap, rowGap]` tuple to control gaps independently.',
            },
            source: {
                code: `<Row gutter={[24, 8]}>
  <Col xs={6}><div>A</div></Col>
  <Col xs={6}><div>B</div></Col>
  <Col xs={6}><div>C</div></Col>
  <Col xs={6}><div>D</div></Col>
</Row>`,
            },
        },
    },
    render: () => (
        <Row gutter={[24, 8]}>
            {['A', 'B', 'C', 'D'].map((l) => (
                <Col key={l} xs={6}>
                    <Cell label={l} />
                </Col>
            ))}
        </Row>
    ),
}

export const AlignAndAllBreakpoints: Story = {
    tags: ['!dev'],
    parameters: {
        docs: {
            description: {
                story:
                    'Covers `Row` `align` prop and all five `Col` breakpoints including `xl`. The second column omits `xs` to demonstrate the CSS default (full-width) fallback.',
            },
            source: {
                code: `<Row align="center" gutter={16}>
  <Col xs={6} sm={5} md={4} lg={3} xl={2}>All breakpoints</Col>
  <Col sm={6} md={8} lg={9} xl={10}>No xs — defaults to full-width</Col>
</Row>`,
            },
        },
    },
    render: () => (
        <Row align="center" gutter={16}>
            <Col xs={6} sm={5} md={4} lg={3} xl={2}>
                <Cell label="all bps" />
            </Col>
            <Col sm={6} md={8} lg={9} xl={10}>
                <Cell label="no xs" />
            </Col>
        </Row>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('all bps')).toBeVisible()
        await expect(canvas.getByText('no xs')).toBeVisible()
    },
}
