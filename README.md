# djfoundry

[![CI](https://github.com/dhaivick/djfoundry/actions/workflows/ci.yml/badge.svg)](https://github.com/dhaivick/djfoundry/actions/workflows/ci.yml)

A React 19 component library built with TypeScript and CSS Modules.

**[View Docs →](https://dhaivick.github.io/djfoundry/)**

---

## Components

| Component    | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `Button`     | Primary action element with size variants and loading state              |
| `Input`      | Single-line text field supporting all HTML input types                   |
| `Select`     | Native dropdown with label, placeholder, and per-option disabled support |
| `Checkbox`   | Accessible boolean toggle with hidden native input                       |
| `RadioGroup` | Mutually exclusive option group built on a `<fieldset>`                  |
| `Toggle`     | Switch-style toggle with optional labeled variant                        |
| `Badge`      | Inline label with five semantic color variants                           |
| `Card`       | Surface container with optional header and footer slots                  |
| `Code`       | Inline code or dark block with language label and copy button            |
| `Tooltip`    | Hover/focus overlay with four placement options                          |
| `Modal`      | Portal dialog with backdrop, Escape key, and focus management            |
| `Navbar`     | Horizontal nav with brand, links, and actions slots                      |
| `Table`      | Responsive data table with striped rows and accessible caption           |

Form components (`Button`, `Input`, `Select`, `Checkbox`, `RadioGroup`, `Toggle`) support `sm`, `md`, and `lg` size variants.

## Installation

```bash
npm install @dhaivick/ui
# or
pnpm add @dhaivick/ui
```

## Usage

```tsx
import { Button, Input, Select, Checkbox, RadioGroup, Toggle, Badge, Card, Code, Tooltip, Modal, Navbar, Table } from '@dhaivick/ui'

function App() {
  return <Button>Click me</Button>
}
```

## Development

```bash
pnpm install
pnpm storybook       # start Storybook on localhost:6006
pnpm test            # run interaction + a11y tests (watch)
pnpm test:run        # run once
pnpm test:coverage   # run with coverage report
pnpm build-storybook # build static docs
```

## Stack

- **React 19** + **TypeScript**
- **CSS Modules** for scoped styles
- **Rollup** — ESM + CJS + type declarations
- **Storybook 10** with autodocs
- **Vitest + Playwright** — interaction tests, accessibility (axe), coverage
- **GitHub Actions** — CI on every PR, Storybook deployed to GitHub Pages on merge
