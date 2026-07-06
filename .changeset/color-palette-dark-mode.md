---
'@atomly-ai/react': minor
'@atomly-ai/types': minor
'@atomly-ai/vue': patch
---

Overhauls the primitive color palette for a more modern SaaS/AI look (indigo primary, violet AI accent, coral brand, amber promoted to a full `warning` intent, emerald success) and adds dark mode support to `@atomly-ai/react` — a new `colorScheme` prop on `MoleculeProvider`, a `darkTheme` export, and a Storybook light/dark toggle.

`warning` is now a full selectable intent on `Button`, `Badge`, and `Chip` (previously theme-color-only). Also fixes several pre-existing WCAG AA contrast failures in `Badge`/`Chip` and a dark-mode contrast bug in `Chip`'s `neutral` intent.
