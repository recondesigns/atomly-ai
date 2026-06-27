# packages/types — @molecule-ui/types

Shared TypeScript types package. This is the single source of truth for all component prop types — both `@molecule-ui/react` and `@molecule-ui/vue` import from here.

## Purpose

Centralizing types here means:
- A prop value (e.g. a new `ButtonVariant`) is added once and propagates to both framework packages automatically
- The type surface is auditable in one place
- Consumers who use both packages get consistent types

## File conventions

One file per component, named lowercase, matching the component name:

```
src/components/
  atoms/
    button.ts      ← ButtonType, ButtonVariant, ButtonSize, etc.
    badge.ts
    index.ts       ← re-exports all atom types
  molecules/
    button-group.ts
    index.ts
  index.ts         ← re-exports atoms + molecules
```

## Adding types for a new component

1. Create `src/components/atoms/<name>.ts` (or `molecules/`)
2. Export all union types and standalone types needed by the component
3. Add `export * from './<name>'` to the category `index.ts`
4. Run `pnpm build:types` from the repo root before building `@molecule-ui/react` or `@molecule-ui/vue`

## Build order

This package **must be built first**. Both `@molecule-ui/react` and `@molecule-ui/vue` reference it via `workspace:*` and resolve the built `dist/` at build time. If you skip this step, downstream builds will fail with missing type errors.

```bash
pnpm build:types          # build this package
pnpm build                # builds types → react → vue in order
```

## What does NOT belong here

- Component implementation logic
- React or Vue-specific types (e.g. `React.ReactNode`) — those are declared in the framework package's `.types.ts` file, which imports the shared unions from here and extends them
- Theme types — those live in `packages/react/src/theme/theme.types.ts`
