Audit all Vue components in the library against project conventions.

No arguments needed.

Follow these steps:

1. **Discover all components** by reading `packages/vue/src/atoms/index.ts` and `packages/vue/src/molecules/index.ts` to get the full list.

2. **For each component**, check the following in `packages/vue/src/atoms/<lowercase>/` or `molecules/<lowercase>/`:
   - [ ] Type file exists in `packages/types/src/components/` (may be shared with React)
   - [ ] `<Name>.vue` uses `<script lang="ts" setup>`
   - [ ] `<Name>.vue` uses `defineProps` + `withDefaults` and imports types from `@atomly-ai/types`
   - [ ] `<Name>.vue` includes `<slot />` for children
   - [ ] `<Name>.vue` spreads `data-testid` onto the root element
   - [ ] `<name>.css` exists with at least one CSS custom property placeholder
   - [ ] `<Name>.stories.ts` has correct title (`Atoms/<Name>` or `Molecules/<Name>`), `tags: ['autodocs']`, a `Default` story, and at least one variation story per major prop
   - [ ] `index.ts` exports the component
   - [ ] Component is re-exported from `packages/vue/src/atoms/index.ts` or `molecules/index.ts`

3. **Output a report** grouped by component using ✅ / ❌ / ⚠️ per check. End with a summary: total components audited, total issues found, and a consolidated list of all failures.
