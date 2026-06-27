# packages/vue — @molecule-ui/vue

Vue 3 component library package. See the root `CLAUDE.md` for monorepo-wide conventions. This file covers Vue-specific implementation details.

## Stack

- **Vue 3** with `<script lang="ts" setup>` (Composition API) for all components
- **Plain CSS** (scoped, per-component `.css` files) — no Emotion or CSS-in-JS; design tokens will be wired via CSS custom properties
- **Storybook 10** with `@storybook/vue3-vite`; runs on port **6007**
- **Vite** with `@vitejs/plugin-vue`

## Component pattern

Every component is a Single File Component (`.vue`) using `<script lang="ts" setup>`:

```vue
<template>
  <div :data-testid="dataTestid" class="molecule-name">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { NameProp } from '@molecule-ui/types'

withDefaults(defineProps<{
  variant?: NameVariant
  'data-testid'?: string
}>(), {
  variant: 'default',
})
</script>
```

Rules:
- Always include `<slot />` — Vue's equivalent of `children`
- Always spread `data-testid` onto the root element (use `:data-testid="dataTestid"` after destructuring or bind directly)
- Import prop type unions from `@molecule-ui/types` — do not redeclare them locally
- Use `withDefaults` to document and enforce default prop values

## CSS conventions

Each component has a `<name>.css` file imported in the `.vue` file. Use BEM-style class names prefixed with `molecule-`:

```css
.molecule-button {
  font-family: var(--molecule-font-family, inherit);
  /* other styles */
}
```

CSS custom properties (`--molecule-*`) are placeholders for future design token wiring. Always include a sensible fallback value as the second argument to `var()`.

There is no theme provider in the Vue package yet. Tokens will be injected via CSS custom properties at the root level when the token system is ready.

## Composables

Shared logic lives in `src/composables/`. Follow Vue's `use` prefix convention:

```ts
// src/composables/useExample.ts
export function useExample(options: UseExampleOptions) {
  // reactive logic
  return { ... }
}
```

Export composables from `src/composables/index.ts`.

## Storybook

Stories are `.stories.ts` files (not `.tsx`). Import types from `@storybook/vue3-vite`:

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ComponentName } from '.'

const meta = {
  component: ComponentName,
  title: 'Atoms/ComponentName',
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { ... } }
```

A11y checks are configured as `test: 'todo'` — violations appear in the test UI but don't fail CI yet.

## Build output

Same structure as the React package: ES module, `preserveModules`, three entry points (`index`, `atoms/index`, `molecules/index`). `vue` is externalized as a peer dependency.

Run `pnpm build:types` first if `packages/types` changed, then `pnpm -F @molecule-ui/vue build`.
