# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Molecule UI is a monorepo design system that publishes React and Vue component libraries. It uses `pnpm` workspaces and requires Node >=20 and pnpm >=9.

## Common Commands

```bash
# Build all packages (types → react → vue, in dependency order)
pnpm build

# Build only the shared types package
pnpm build:types

# Start Storybook for React (port 6006)
pnpm storybook:react

# Start Storybook for Vue
pnpm storybook:vue

# Run tests (Storybook stories are the test suite, run via Vitest + Playwright)
cd packages/react && pnpm vitest

# Lint
pnpm lint

# Format
pnpm format
```

> Always run `pnpm build:types` before building `@molecule-ui/react` or `@molecule-ui/vue` if you've changed anything in `packages/types`.

## Architecture

### Package Structure

| Package | Name | Role |
|---|---|---|
| `packages/types` | `@molecule-ui/types` | Shared TypeScript prop types — single source of truth for all component APIs |
| `packages/react` | `@molecule-ui/react` | React component library |
| `packages/vue` | `@molecule-ui/vue` | Vue component library |
| `packages/website` | `@molecule-ui/website` | Next.js documentation site |

### Component Organization (Atomic Design)

Components follow atomic design inside `packages/react/src/`:

- `atoms/` — primitive, standalone components (Button, Badge)
- `molecules/` — composed components built from atoms (ButtonGroup)
- `hooks/` — thin wrappers around React Aria primitives consumed by components
- `theme/` — `defaultTheme`, `MoleculeUITheme` type, and `MoleculeProvider`

### Theme System

`MoleculeProvider` (wraps Emotion's `ThemeProvider`) injects the theme into all styled components. Consumers can deep-merge overrides against the default:

```tsx
<MoleculeProvider theme={{ colors: { primary: '#8B5CF6' } }}>
  <App />
</MoleculeProvider>
```

Styled components access tokens via the `theme` prop. Always include a fallback value in case no provider is present:

```ts
font-family: ${({ theme }) => theme.typography?.fontFamily ?? 'inherit'};
```

The Storybook `preview.tsx` wraps all stories in `MoleculeProvider` automatically.

### Type Flow

Prop types are defined in `@molecule-ui/types` and imported into both framework packages. Adding a new prop value means changing it once in `packages/types/src/components/` and it propagates to React and Vue.

### Build & Exports

Vite builds the React package as an ES module library with three entry points (`index`, `atoms/index`, `molecules/index`) so consumers can tree-shake by category. React, React DOM, Emotion, and React Aria packages are all externalized.

## Adding a New React Component

1. **Add types** in `packages/types/src/components/atoms/<name>.ts`, then re-export from `packages/types/src/components/atoms/index.ts`.

2. **Create the component folder** at `packages/react/src/atoms/<name>/` with these five files:
   - `<Name>.tsx` — component using `React.forwardRef`; set `<Name>.displayName`
   - `<Name>.styles.ts` — Emotion `styled` component; use `$`-prefixed transient props to avoid DOM leakage
   - `<Name>.types.ts` — imports from `@molecule-ui/types` and builds the public prop interface
   - `<Name>.stories.tsx` — Storybook stories with `title: 'Atoms/<Name>'` and `tags: ['autodocs']`
   - `index.ts` — barrel: `export { default as <Name> } from './<Name>'` + `export type { <Name>Props }`

3. **Wire up barrel exports**: add `export * from './<name>'` to `packages/react/src/atoms/index.ts`.

4. **Develop** with `pnpm storybook:react`.

The same pattern applies for molecules under `src/molecules/`, and for adding an entry point to `vite.config.ts` if a new top-level category is introduced.

## Key Conventions

- **Transient props**: prefix styled-component-only props with `$` (e.g., `$size`, `$variant`, `$isDisabled`) to prevent them from forwarding to the DOM element.
- **React Aria**: accessibility behavior (keyboard events, press states, ARIA attributes) is handled via hooks in `src/hooks/` that wrap `@react-aria/*`. Add new hooks there rather than importing React Aria directly in components.
- **`useButton` hook**: wraps `@react-aria/button` and returns `{ buttonProps, isPressed, buttonRef }`. The component is responsible for merging `buttonRef` with any `forwardedRef` from consumers.
- **Types package must be built first**: the React and Vue packages import from `@molecule-ui/types` at build time via the `workspace:*` protocol.
