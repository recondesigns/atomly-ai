# Molecule UI Roadmap

High-level phases and goals for the project. Updated as priorities shift.

---

## Phase 1 — Foundation (complete)

Get the core infrastructure solid before building out the component library.

- [x] Monorepo setup (pnpm workspaces, TypeScript, shared types package)
- [x] React component library (`@atomly-ai/react`) with Emotion + React Aria
- [x] Vue component library (`@atomly-ai/vue`)
- [x] Storybook for React and Vue
- [x] Claude Code tooling (slash commands, CLAUDE.md files, specs, hooks)
- [x] Figma project created (Design Tokens + Component Library files)
- [x] Figma Code Connect config scaffolded
- [x] Unit testing setup (Vitest for hooks and utilities)
- [x] Husky + commitlint + lint-staged
- [x] GitHub Actions CI pipeline (lint → build → test)
- [x] Changesets for monorepo versioning
- [x] First npm publish (alpha, later exited pre-release mode for a clean `0.2.0`, re-entered alpha while Phase 3 buildout continues)

---

## Phase 2 — Token System (complete)

Establish the design token pipeline so components are tied to Figma.

- [x] Design tokens defined in Figma (primitives + semantic)
- [x] Style Dictionary setup to transform tokens to CSS custom properties and JS
- [x] `sync-tokens` workflow validated end-to-end
- [x] Vue package wired to CSS custom properties from token output
- [ ] Token documentation in Storybook
- [x] AI-native color palette redesign — indigo primary, violet AI accent, coral brand, amber promoted to a full `warning` intent, emerald success (see `.claude/specs/color-palette.md`)
- [x] Dark mode theming layer — `colorDark` token block sourced from Figma's `Color/Dark` collection, `darkTheme` export, `MoleculeProvider` `colorScheme` prop, Storybook light/dark toggle

---

## Phase 3 — Core Component Library (current)

Build out the foundational atom and molecule set.

**Atoms**

- [x] Button (`solid`/`outline`/`ghost`; `primary`/`success`/`danger`/`brand`/`warning` intents)
- [x] Badge (`filled`; `neutral`/`primary`/`success`/`danger`/`brand`/`warning` intents)
- [x] Icon (`AlertIcon`, `CheckIcon`, `CloseIcon` — shared SVG source, generated per-framework)
- [ ] Avatar
- [ ] Input
- [ ] Checkbox
- [ ] Radio
- [ ] Toggle / Switch
- [ ] Select
- [x] Tag / Chip (`filled`/`outlined`/`ghost`; `neutral`/`primary`/`success`/`danger`/`warning` intents)
- [ ] Spinner / Loader
- [ ] Tooltip
- [ ] Divider
- [ ] StatusDot

**Molecules**

- [x] ButtonGroup
- [ ] FormField (label + input + error)
- [ ] Modal / Dialog
- [ ] Drawer
- [ ] Dropdown Menu
- [ ] Popover
- [ ] Toast / Notification
- [ ] Tabs
- [ ] Accordion
- [ ] Card
- [ ] Pagination
- [ ] Breadcrumb

---

## Phase 4 — Quality & Design Collaboration

- [x] Chromatic visual regression testing on all stories
- [x] `@storybook/addon-designs` (Figma frames embedded in Storybook) — installed in both React and Vue. Frame links added to React's Button/Badge/Chip and Vue's Button; still missing on ButtonGroup and Icons (no Figma frames exist for them yet — a content gap, not a code one)
- [ ] Figma Code Connect published for all core components (blocked — requires a paid Figma plan)
- [x] Accessibility audit passing at WCAG 2.1 AA for all components (Vitest + Playwright + `@storybook/addon-a11y` set to `error`, 26/26 tests passing; a handful of pre-existing contrast bugs found and fixed along the way)
- [ ] `size-limit` bundle size budgets in CI
- [ ] Component specs complete for all Phase 3 components (only Button has one so far)

---

## Phase 5 — Documentation Site

- [x] Site-only `Button` component for website chrome (built from Figma "Website" file, node 43:538) — not part of `@atomly-ai/react`
- [x] Emotion SSR cache registry (`EmotionRegistry`) wired into the root layout — fixes a hydration mismatch from missing `useServerInsertedHTML` setup
- [ ] Documentation site structure (`packages/website`)
- [ ] Component pages with live examples, props table, usage guidelines
- [ ] Design token reference page
- [ ] Getting started / installation guide
- [ ] Contribution guide
- [ ] Changelog page (driven by Changesets)

---

## Backlog / Ideas

- Organism-level components (data tables, page headers, navigation shells)
- Motion / animation token category
- Breakpoint tokens for responsive components
- Figma library published for internal design use
- React Native package (`@atomly-ai/native`)
