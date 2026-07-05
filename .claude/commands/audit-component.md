Audit a single component against project conventions.

Arguments: $ARGUMENTS
Expected format: `<ComponentName> [react|vue]` (e.g. `Button react`)

If the framework is not specified, audit both packages if the component exists in both.

---

**React checklist** — `packages/react/src/atoms/<lowercase>/` or `molecules/<lowercase>/`

Types (`packages/types/src/components/`):

- [ ] Type file exists for this component
- [ ] Includes `children: React.ReactNode`
- [ ] Includes `'data-testid'?: string`
- [ ] Re-exported from the category types index (`atoms/index.ts` or `molecules/index.ts`)

Component files:

- [ ] `<Name>.types.ts` imports from `@atomly-ai/types`
- [ ] `<Name>.styles.ts` uses `$`-prefixed transient props for all styled-component-only props
- [ ] `<Name>.styles.ts` has at least one theme token read with a fallback value
- [ ] `<Name>.tsx` uses `React.forwardRef`
- [ ] `<Name>.tsx` sets `<Name>.displayName = '<Name>'`
- [ ] `<Name>.tsx` has both a named export and a default export
- [ ] `<Name>.tsx` does not import directly from `@react-aria/*` (must go through `src/hooks/`)
- [ ] `<Name>.tsx` spreads `data-testid` onto the root element
- [ ] `<Name>.stories.tsx` has `title: 'Atoms/<Name>'` or `'Molecules/<Name>'` and `tags: ['autodocs']`
- [ ] `<Name>.stories.tsx` has a `Default` story and at least one variation story per major prop
- [ ] `index.ts` exports both the component and its prop types
- [ ] Component is re-exported from `packages/react/src/atoms/index.ts` or `molecules/index.ts`

---

**Vue checklist** — `packages/vue/src/atoms/<lowercase>/` or `molecules/<lowercase>/`

- [ ] Type file exists in `packages/types/src/components/` (may be shared with React)
- [ ] `<Name>.vue` uses `<script lang="ts" setup>`
- [ ] `<Name>.vue` uses `defineProps` + `withDefaults` and imports types from `@atomly-ai/types`
- [ ] `<Name>.vue` includes `<slot />` for children
- [ ] `<Name>.vue` spreads `data-testid` onto the root element
- [ ] `<name>.css` exists with at least one CSS custom property placeholder
- [ ] `<Name>.stories.ts` has correct title and `tags: ['autodocs']`
- [ ] `<Name>.stories.ts` has a `Default` story and at least one variation per major prop
- [ ] `index.ts` exports the component
- [ ] Component is re-exported from `packages/vue/src/atoms/index.ts` or `molecules/index.ts`

---

Report findings as a checklist with ✅ pass / ❌ fail / ⚠️ needs attention. Summarize any issues and suggest fixes.
