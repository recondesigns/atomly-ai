Create a new atom component in the React package.

Arguments: $ARGUMENTS
Expected format: `<ComponentName>` (e.g. `Avatar`)

Follow these steps in order:

1. **Types** — Create `packages/types/src/components/atoms/<lowercase-name>.ts`. Always include at minimum:
   - A `children` prop typed as `React.ReactNode`
   - A `'data-testid'?: string` prop
   - Any relevant variant/size/boolean unions for the component

   Then add `export * from './<lowercase-name>'` to `packages/types/src/components/atoms/index.ts`.

2. **Component folder** — Create `packages/react/src/atoms/<lowercase-name>/` with these five files:

   - `<Name>.types.ts` — import the base types from `@molecule-ui/types` and extend them into the public `<Name>Props` interface. Include `React.RefAttributes<HTMLElement>` if using forwardRef.

   - `<Name>.styles.ts` — a single `Styled<Name>` Emotion `styled` component. Use `$`-prefixed transient props. Always include at least one token-backed style with a fallback, e.g.:
     ```ts
     font-family: ${({ theme }) => theme.typography?.fontFamily ?? 'inherit'};
     ```

   - `<Name>.tsx` — use `React.forwardRef`. Destructure all props with sensible defaults. Render a semantically appropriate HTML element (e.g. `<div>` for layout/display atoms, `<button>` for interactive ones) that passes `children` through and spreads `data-testid`. Set `<Name>.displayName = '<Name>'` at the bottom. Export as both named and default export.

   - `<Name>.stories.tsx` — Storybook stories:
     - `title: 'Atoms/<Name>'`, `tags: ['autodocs']`
     - A `Default` story
     - One additional story per major prop variation (e.g. each variant, each size)

   - `index.ts` — barrel:
     ```ts
     export { default as <Name>, <Name> } from './<Name>'
     export type { <Name>Props } from './<Name>.types'
     ```

3. **Barrel export** — Add `export * from './<lowercase-name>'` to `packages/react/src/atoms/index.ts`.

4. Confirm all five files are created and the barrel is wired up. Do not run a build unless asked.
