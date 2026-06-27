# Tooling & Infrastructure Checklist

Granular checklist for tooling, DX, and infrastructure work. Claude updates this as items are completed or added.

---

## Claude Code

- [x] Root `CLAUDE.md` with project overview, commands, architecture, and design system references
- [x] Package-level `CLAUDE.md` for `packages/react`, `packages/vue`, `packages/types`, `packages/website`
- [x] Slash commands — component scaffolding (`create-react-atom`, `create-react-molecule`, `create-vue-atom`, `create-vue-molecule`)
- [x] Slash commands — stories and hooks (`add-story`, `add-hook`, `add-composable`)
- [x] Slash commands — Figma (`code-connect`, `sync-tokens`, `create-spec`)
- [x] Slash commands — quality (`audit-component`, `audit-react-library`, `audit-vue-library`, `accessibility-audit`, `check-breaking-changes`)
- [x] Slash commands — lifecycle (`pr-description`, `deprecate-react-component`, `deprecate-vue-component`)
- [x] `.claude/settings.json` with permission allowlist and PostToolUse hooks (lint on edit, build:types on types edit)
- [x] `.claude/specs/` with component spec template and Button spec
- [x] Memory — Figma file URLs saved for future sessions

---

## Figma

- [x] Figma project created (Design Tokens file + Component Library file)
- [x] Figma MCP authenticated
- [x] `figma/figma.config.json` scaffolded for Code Connect
- [ ] Design tokens defined in Figma (primitives: color, spacing, typography, radii, transitions)
- [ ] Semantic/alias token layer in Figma
- [ ] Component Library frames created for existing components (Button, Badge, ButtonGroup)
- [ ] Figma libraries published (Design Tokens + Component Library)
- [ ] Code Connect published for Button
- [ ] Code Connect published for Badge
- [ ] Code Connect published for ButtonGroup

---

## Token Pipeline

- [x] `tokens/` folder scaffolded
- [ ] Style Dictionary installed and configured
- [ ] `tokens/primitives.json` populated via `/sync-tokens`
- [ ] Style Dictionary outputs CSS custom properties to `packages/vue/src/tokens/`
- [ ] Style Dictionary outputs JS tokens consumed by `defaultTheme.ts`
- [ ] Token sync validated end-to-end (Figma → `tokens/` → theme → components)

---

## Testing

- [ ] Vitest unit test setup for `packages/react/src/hooks/`
- [ ] Vitest unit test setup for `packages/vue/src/composables/`
- [ ] `useButton` unit tests
- [ ] Chromatic installed and configured (`@chromatic-com/storybook` already in devDeps)
- [ ] Chromatic running on PRs via GitHub Actions
- [ ] Storybook a11y switched from `'todo'` to `'error'` for all components

---

## ESLint

- [x] Root `eslint.config.js` (flat config, ESLint 9) covering all packages
- [x] `@typescript-eslint/recommended` rules for `.ts` and `.tsx` files
- [x] `eslint-plugin-react` + `eslint-plugin-react-hooks` for the React package
- [x] `eslint-plugin-vue` with `vue3-recommended` rules for the Vue package
- [x] Update `pnpm lint` script to remove deprecated `--ext` flag (not supported in ESLint 9+)
- [x] Confirm `pnpm lint` catches real errors across `packages/react`, `packages/vue`, and `packages/types`

---

## Git & CI

- [x] Husky installed
- [x] `pre-commit` hook: lint-staged (lint + format on staged files)
- [x] `commit-msg` hook: commitlint with conventional commits
- [x] `pre-push` hook: TypeScript type check (`pnpm typecheck` across all packages)
- [ ] `pre-push` hook: `build:icons` diff-check (wired in during icon pipeline)
- [ ] GitHub Actions workflow: lint → build → test on PRs
- [ ] GitHub Actions workflow: Chromatic on PRs
- [ ] GitHub Actions workflow: publish to npm on release

---

## Versioning & Publishing

- [ ] Changesets installed and configured
- [ ] `.changeset/config.json` set up for the monorepo
- [ ] `syncpack` installed to keep dependency versions consistent
- [ ] First alpha publish of `@molecule-ui/react` and `@molecule-ui/vue`

---

## Bundle Health

- [ ] `size-limit` installed with per-package size budgets (`@molecule-ui/react`, `@molecule-ui/vue`)
- [ ] Size limit check added to GitHub Actions CI (fails PR if budget exceeded)
- [ ] `rollup-plugin-visualizer` added to Vite config for bundle composition inspection
- [ ] Baseline bundle sizes documented after first stable release
- [ ] Tree-shaking validated — confirm per-category imports (`@molecule-ui/react/atoms`) are smaller than full import

---

## Icon Pipeline

Components are named `AlertIcon`, `CloseIcon`, etc. (noun + Icon suffix). SVG source files live in **one place** — `icons/` at the repo root. Both packages generate their own framework-specific components from that shared source. Generated files are committed; a diff-check at pre-push and CI ensures they stay in sync.

- [ ] Create `icons/` folder at repo root — shared SVG source files (e.g. `alert.svg`, `close.svg`)
- [ ] Install `@svgr/cli` in `packages/react` devDependencies
- [ ] Add `build:icons` script to `packages/react` — runs SVGR CLI to generate `AlertIcon.tsx` etc. into `src/atoms/icons/`, with `currentColor`, title prop, and TypeScript output
- [ ] Write `scripts/build-icons-vue.js` — custom Node.js script that reads `icons/*.svg`, optimizes with `svgo`, and wraps each in a `<script lang="ts" setup>` Vue SFC with `inheritAttrs: false`
- [ ] Add `build:icons` script to `packages/vue` that runs `scripts/build-icons-vue.js`
- [ ] Add root `build:icons` script: `pnpm -F @molecule-ui/react build:icons && pnpm -F @molecule-ui/vue build:icons`
- [ ] Generated icon components auto-exported from `packages/react/src/atoms/index.ts` and `packages/vue/src/atoms/index.ts`
- [ ] Add icon types to `packages/types` (shared `IconName` union, size prop, etc.)
- [ ] Add Storybook stories for the icon set (grid view of all icons)
- [ ] Husky `pre-push` hook — runs `pnpm build:icons` then `git diff --exit-code` on generated icon folders; blocks push if committed output is stale
- [ ] CI step — same regenerate + diff-check as pre-push, runs before lint/build as a backstop against `--no-verify`

---

## Storybook Enhancements

- [ ] `@storybook/addon-designs` installed — embeds Figma frames in story panels
- [ ] Figma frame links added to all existing stories
- [ ] Storybook deployed (Chromatic hosting or Vercel)

---

## Documentation Site

- [ ] Site structure defined (`packages/website`)
- [ ] Getting started / installation page
- [ ] Component pages for all stable components
- [ ] Design token reference page
- [ ] Contribution guide
- [ ] Changelog page
