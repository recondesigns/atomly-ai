# packages/react — @atomly-ai/react

React component library package. See the root `CLAUDE.md` for monorepo-wide conventions. This file covers React-specific implementation details.

## Stack

- **React 18/19** with `React.forwardRef` for all components that expose a DOM ref
- **Emotion** (`@emotion/react`, `@emotion/styled`) for CSS-in-JS; `jsxImportSource` is set to `@emotion/react` in `vite.config.ts` so the JSX pragma is automatic
- **React Aria** (`@react-aria/*`, `@react-types/*`) for accessible interaction behavior — always consumed through wrappers in `src/hooks/`, never imported directly in components
- **Storybook 10** with `@storybook/react-vite`; all stories are wrapped in `MoleculeProvider` via the global decorator in `.storybook/preview.tsx`

## Hook pattern

Every React Aria behavior lives in `src/hooks/` as a thin wrapper that narrows the API to only what Molecule UI exposes. New hooks follow this shape:

```ts
// src/hooks/useExample.ts
export type UseExampleOptions = { /* curated subset of react-aria options */ }
export type UseExampleReturn = { /* props to spread, state values, ref */ }
export function useExample(options: UseExampleOptions): UseExampleReturn { ... }
```

Export the hook and its types from `src/hooks/index.ts`. Components import from `../../hooks`, never from `@react-aria/*` directly.

### `useButton`

Returns `{ buttonProps, isPressed, buttonRef }`.

The component must merge `buttonRef` (internal, for React Aria) with the consumer's `forwardedRef` manually — React Aria needs its own ref to manage focus and press events:

```tsx
ref={(node) => {
  (buttonRef as React.MutableRefObject<HTMLElement | null>).current = node;
  if (typeof forwardedRef === 'function') forwardedRef(node);
  else if (forwardedRef) forwardedRef.current = node;
}}
```

## Emotion conventions

- Styled components go in `<Name>.styles.ts`, exported as `Styled<Name>`
- Props passed only to the styled component (not forwarded to DOM) must be prefixed with `$` (transient props)
- Always read theme tokens with optional chaining and a hard-coded fallback so the component works without `MoleculeProvider`:
  ```ts
  color: ${({ theme }) => theme.colors?.primary ?? '#2563EB'};
  ```
- The full theme shape is in `src/theme/theme.types.ts`; the default values are in `src/theme/defaultTheme.ts`

## Theme / MoleculeProvider

`MoleculeProvider` deep-merges a partial theme override into `defaultTheme` and passes the result to Emotion's `ThemeProvider`. Consumers only need to wrap once at the app root.

The Storybook `preview.tsx` wraps all stories in `MoleculeProvider` with no overrides so every story gets the default theme.

A11y checks are configured as `test: 'error'` in Storybook — violations fail the Vitest story test run.

## Build output

Vite builds to `dist/` as an ES module with `preserveModules` (one output file per source file). Three entry points are declared in `vite.config.ts`:

- `index` → `src/index.ts`
- `atoms/index` → `src/atoms/index.ts`
- `molecules/index` → `src/molecules/index.ts`

All peer dependencies are externalized: `react`, `react-dom`, `react/jsx-runtime`, all `@emotion/*`, all `@react-aria/*`, all `@react-stately/*`.

Run `pnpm build:types` (from repo root) first if `packages/types` changed, then `pnpm -F @atomly-ai/react build`.
