Add a new Vue composable to the composables layer in the Vue package.

Arguments: $ARGUMENTS
Expected format: `<ComposableName>` using the `use` prefix (e.g. `useDisclosure`)

Composables in this project encapsulate reactive logic shared across Vue components. They follow the Vue 3 Composition API `use*` convention.

Follow these steps:

1. **Read `packages/vue/src/composables/index.ts`** to understand what composables already exist before writing anything.

2. **Create `packages/vue/src/composables/<composableName>.ts`** with:
   - A `Use<Name>Options` type for the input parameters (if any)
   - A `Use<Name>Return` type for the returned reactive state and methods
   - `export function use<Name>(options?: Use<Name>Options): Use<Name>Return` — uses Vue reactivity primitives (`ref`, `computed`, `watch`, etc.) internally

   Example shape:
   ```ts
   import { ref, computed } from 'vue'

   export type Use<Name>Options = { /* ... */ }
   export type Use<Name>Return = { /* refs, computed, methods */ }

   export function use<Name>(options: Use<Name>Options = {}): Use<Name>Return {
     // reactive logic
     return { ... }
   }
   ```

3. **Export from `packages/vue/src/composables/index.ts`**:
   ```ts
   export { use<Name> } from './<composableName>'
   export type { Use<Name>Options, Use<Name>Return } from './<composableName>'
   ```

4. Confirm the composable file is created and the barrel is updated. Do not create a component that uses it unless asked.
