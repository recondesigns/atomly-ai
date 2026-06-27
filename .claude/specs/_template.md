# [ComponentName] — Component Spec

> Copy this file to `.claude/specs/<component-name>.md` when speccing a new component.

## Overview

Brief description of what this component does and when to use it.

**Figma frame:** [Component library → Atoms/ComponentName](https://www.figma.com/design/wv7I1q5SbuPS4vozGd1gmR/Component-library?node-id=REPLACE_WITH_NODE_ID)

## Variants & props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `isDisabled` | `boolean` | `false` | |
| `children` | `React.ReactNode` | — | Required |
| `data-testid` | `string` | — | Optional |

## States

- **Default** — resting state
- **Hover** — visual feedback on cursor enter
- **Active / Pressed** — visual feedback while held
- **Disabled** — non-interactive, reduced opacity or muted colors
- **Focus** — visible focus ring on keyboard navigation

## Anatomy

Describe the internal structure (e.g. root element, icon slot, label, etc.).

## Accessibility

- Role / element:
- Keyboard interaction:
- ARIA attributes:
- Screen reader behavior:

## Usage notes

Any constraints, dos/don'ts, or composition rules (e.g. "never nest inside another X").

## Open questions

Things not yet decided or pending design clarification.
