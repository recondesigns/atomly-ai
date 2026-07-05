Audit all React components in the library against project conventions.

No arguments needed.

Follow these steps:

1. **Discover all components** by reading `packages/react/src/atoms/index.ts` and `packages/react/src/molecules/index.ts` to get the full list.

2. **For each component**, check the following in `packages/react/src/atoms/<lowercase>/` or `molecules/<lowercase>/`:

   Types (`packages/types/src/components/`):
   - [ ] Type file exists
   - [ ] Includes `children: React.ReactNode` and `'data-testid'?: string`
   - [ ] Re-exported from the category types index

   Component files:
   - [ ] `<Name>.types.ts` imports from `@atomly-ai/types`
   - [ ] `<Name>.styles.ts` uses `$`-prefixed transient props and has at least one theme token with a fallback
   - [ ] `<Name>.tsx` uses `React.forwardRef`, sets `displayName`, has both named and default export
   - [ ] `<Name>.tsx` does not import directly from `@react-aria/*`
   - [ ] `<Name>.tsx` spreads `data-testid` onto the root element
   - [ ] `<Name>.stories.tsx` has correct title, `tags: ['autodocs']`, a `Default` story, and variation stories
   - [ ] `index.ts` exports both the component and its types
   - [ ] Component is in the category barrel (`atoms/index.ts` or `molecules/index.ts`)

3. **Output a report** grouped by component using ✅ / ❌ / ⚠️ per check. End with a summary: total components audited, total issues found, and a consolidated list of all failures.
