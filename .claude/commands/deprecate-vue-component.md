Mark a Vue component as deprecated.

Arguments: $ARGUMENTS
Expected format: `<ComponentName> <ReplacementComponentName>` (e.g. `OldButton NewButton`)
If there is no replacement, use: `<ComponentName> none`

Follow these steps:

1. **Types** — In `packages/types/src/components/atoms/<lowercase>.ts` (or `molecules/`), add a `@deprecated` JSDoc above the relevant type exports:
   ```ts
   /**
    * @deprecated Use <ReplacementComponentName> instead.
    */
   ```
   Skip if the type file is shared with React and was already updated there.

2. **`<Name>.vue`** — In the `<script lang="ts" setup>` block, add a dev-only deprecation warning using `onMounted`:
   ```ts
   import { onMounted } from 'vue'

   onMounted(() => {
     if (import.meta.env.DEV) {
       console.warn('[molecule-ui] <Name> is deprecated. Use <ReplacementComponentName> instead.')
     }
   })
   ```

3. **`<Name>.stories.ts`** — Add `'deprecated'` to the `tags` array in the meta object. Add a deprecation notice to `parameters`:
   ```ts
   parameters: {
     docs: {
       description: {
         component: '⚠️ **Deprecated.** Use `<ReplacementComponentName>` instead.',
       },
     },
   },
   ```

4. **`index.ts`** — Add a `@deprecated` JSDoc above the component export line.

5. Confirm all four locations are updated. Do not remove any files or exports — deprecated components remain in the package until the next major version.
