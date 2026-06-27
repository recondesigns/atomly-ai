Mark a React component as deprecated.

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

2. **`<Name>.types.ts`** — Add the same `@deprecated` JSDoc above the `<Name>Props` interface.

3. **`<Name>.tsx`** — Add a dev-only deprecation warning at the top of the render function, before the return:
   ```ts
   if (process.env.NODE_ENV !== 'production') {
     console.warn('[molecule-ui] <Name> is deprecated. Use <ReplacementComponentName> instead.');
   }
   ```

4. **`<Name>.stories.tsx`** — Add `'deprecated'` to the `tags` array in the meta object. Add a deprecation notice to `parameters`:
   ```ts
   parameters: {
     docs: {
       description: {
         component: '⚠️ **Deprecated.** Use `<ReplacementComponentName>` instead.',
       },
     },
   },
   ```

5. **`index.ts`** — Add a `@deprecated` JSDoc above the component export line.

6. Confirm all five locations are updated. Do not remove any files or exports — deprecated components remain in the package until the next major version.
