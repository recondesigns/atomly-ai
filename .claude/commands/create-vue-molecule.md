Create a new molecule component in the Vue package.

Arguments: $ARGUMENTS
Expected format: `<ComponentName>` (e.g. `Modal`)

Molecules are composed components built from atoms. Follow these steps in order:

1. **Types** — If props for this component don't already exist in `packages/types/src/components/molecules/<lowercase-name>.ts`, create the file. Always include at minimum:
   - A `'data-testid'?: string` prop
   - Any relevant variant/size/boolean unions for the component

   Then add `export * from './<lowercase-name>'` to `packages/types/src/components/molecules/index.ts`. Skip this step if the React molecule was already created and types exist.

2. **Component folder** — Create `packages/vue/src/molecules/<lowercase-name>/` with these four files:

   - `<Name>.vue` — Single File Component using `<script lang="ts" setup>`. Import and compose atom components from `../../atoms`. Define props with `defineProps` + `withDefaults`, importing prop types from `@molecule-ui/types`. Always include a default slot (`<slot />`) so the component accepts children. Spread `data-testid` onto the root element. Apply scoped CSS classes for styling.

   - `<name>.css` — scoped styles for the component. Always include at least one placeholder rule using a CSS custom property where a design token will eventually be wired in, e.g.:
     ```css
     .molecule-<name> {
       font-family: var(--molecule-font-family, inherit);
     }
     ```

   - `<Name>.stories.ts` — Storybook stories using `@storybook/vue3-vite`:
     - `title: 'Molecules/<Name>'`, `tags: ['autodocs']`
     - A `Default` story
     - One additional story per major prop variation (e.g. each variant, each size)

   - `index.ts` — barrel: `export { default as <Name> } from './<Name>.vue'`

3. **Barrel export** — Add `export * from './<lowercase-name>'` to `packages/vue/src/molecules/index.ts`.

4. Confirm all four files are created and the barrel is wired up. Do not run a build unless asked.
