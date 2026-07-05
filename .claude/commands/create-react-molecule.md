Create a new molecule component in the React package.

Arguments: $ARGUMENTS
Expected format: `<ComponentName>` (e.g. `Modal`)

Molecules are composed components built from atoms. Follow these steps in order:

1. **Types** — Create `packages/types/src/components/molecules/<lowercase-name>.ts`. Always include at minimum:
   - A `children` prop typed as `React.ReactNode`
   - A `'data-testid'?: string` prop
   - Any relevant variant/size/boolean unions for the component

   Then add `export * from './<lowercase-name>'` to `packages/types/src/components/molecules/index.ts`.

2. **Component folder** — Create `packages/react/src/molecules/<lowercase-name>/` with these five files:
   - `<Name>.types.ts` — import the base types from `@atomly-ai/types` and extend them into the public `<Name>Props` interface. Include `React.RefAttributes<HTMLElement>` if using forwardRef.

   - `<Name>.styles.ts` — Emotion `styled` wrapper component(s). Use `$`-prefixed transient props. Always include at least one token-backed style with a fallback, e.g.:

     ```ts
     font-family: ${({ theme }) => theme.typography?.fontFamily ?? 'inherit'};
     ```

   - `<Name>.tsx` — import and compose atom components from `../../atoms`; use `React.forwardRef` if the component has a single root DOM node. Destructure all props with sensible defaults. Pass `children` through and spread `data-testid` onto the root element. Set `<Name>.displayName = '<Name>'` at the bottom. Export as both named and default export.

   - `<Name>.stories.tsx` — Storybook stories:
     - `title: 'Molecules/<Name>'`, `tags: ['autodocs']`
     - A `Default` story
     - One additional story per major prop variation (e.g. each variant, each size)

   - `index.ts` — barrel:
     ```ts
     export { default as <Name>, <Name> } from './<Name>'
     export type { <Name>Props } from './<Name>.types'
     ```

3. **Barrel export** — Add `export * from './<lowercase-name>'` to `packages/react/src/molecules/index.ts`.

4. Confirm all five files are created and the barrel is wired up. Do not run a build unless asked.
