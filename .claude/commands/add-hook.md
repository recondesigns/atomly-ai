Add a new React hook to the hooks layer in the React package.

Arguments: $ARGUMENTS
Expected format: `<HookName> [react-aria-package]` (e.g. `useCheckbox @react-aria/checkbox`)

Hooks in this project are thin wrappers around React Aria primitives that expose a curated, Molecule-UI-specific API. New hooks follow the same pattern as `useButton`.

Follow these steps:

1. **Read `packages/react/src/hooks/useButton.ts`** to understand the established pattern before writing anything.

2. **If a React Aria package is specified**, check whether it is already listed in `packages/react/package.json` dependencies. If not, note that it needs to be added — do not install it automatically.

3. **Create `packages/react/src/hooks/<hookName>.ts`** with:
   - `Use<Name>Options` type — a curated subset of the React Aria hook's options, only including what Molecule UI components will actually use
   - `Use<Name>Return` type — the props object to spread, any state values, and the ref
   - `export function use<Name>(options: Use<Name>Options): Use<Name>Return` — calls the React Aria hook internally, maps `options` to the aria hook's expected shape, and returns the simplified result

4. **Export from `packages/react/src/hooks/index.ts`**:
   ```ts
   export { use<Name> } from './<hookName>'
   export type { Use<Name>Options, Use<Name>Return } from './<hookName>'
   ```

5. Confirm the hook file is created and the barrel is updated. Do not create a component that uses it unless asked.
