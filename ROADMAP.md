# Molecule UI Roadmap

High-level phases and goals for the project. Updated as priorities shift.

---

## Phase 1 — Foundation (current)

Get the core infrastructure solid before building out the component library.

- [x] Monorepo setup (pnpm workspaces, TypeScript, shared types package)
- [x] React component library (`@molecule-ui/react`) with Emotion + React Aria
- [x] Vue component library (`@molecule-ui/vue`)
- [x] Storybook for React and Vue
- [x] Claude Code tooling (slash commands, CLAUDE.md files, specs, hooks)
- [x] Figma project created (Design Tokens + Component Library files)
- [x] Figma Code Connect config scaffolded
- [ ] Unit testing setup (Vitest for hooks and utilities)
- [ ] Husky + commitlint + lint-staged
- [ ] GitHub Actions CI pipeline (lint → build → test)
- [ ] Changesets for monorepo versioning
- [ ] First npm publish (alpha/beta)

---

## Phase 2 — Token System

Establish the design token pipeline so components are tied to Figma.

- [ ] Design tokens defined in Figma (primitives + semantic)
- [ ] Style Dictionary setup to transform tokens to CSS custom properties and JS
- [ ] `sync-tokens` workflow validated end-to-end
- [ ] Vue package wired to CSS custom properties from token output
- [ ] Token documentation in Storybook

---

## Phase 3 — Core Component Library

Build out the foundational atom and molecule set.

**Atoms**
- [x] Button
- [x] Badge
- [ ] Icon
- [ ] Avatar
- [ ] Input
- [ ] Checkbox
- [ ] Radio
- [ ] Toggle / Switch
- [ ] Select
- [ ] Tag / Chip
- [ ] Spinner / Loader
- [ ] Tooltip
- [ ] Divider

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

- [ ] Chromatic visual regression testing on all stories
- [ ] `@storybook/addon-designs` (Figma frames embedded in Storybook)
- [ ] Figma Code Connect published for all core components
- [ ] Accessibility audit passing at WCAG 2.1 AA for all components
- [ ] `size-limit` bundle size budgets in CI
- [ ] Component specs complete for all Phase 3 components

---

## Phase 5 — Documentation Site

- [ ] Documentation site structure (`packages/website`)
- [ ] Component pages with live examples, props table, usage guidelines
- [ ] Design token reference page
- [ ] Getting started / installation guide
- [ ] Contribution guide
- [ ] Changelog page (driven by Changesets)

---

## Backlog / Ideas

- Organism-level components (data tables, page headers, navigation shells)
- Dark mode token layer
- Motion / animation token category
- Breakpoint tokens for responsive components
- Figma library published for internal design use
- React Native package (`@molecule-ui/native`)
