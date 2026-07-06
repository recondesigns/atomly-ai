# @atomly-ai/types

## 0.2.0

### Minor Changes

- 7e0ca51: Overhauls the primitive color palette for a more modern SaaS/AI look (indigo primary, violet AI accent, coral brand, amber promoted to a full `warning` intent, emerald success) and adds dark mode support to `@atomly-ai/react` — a new `colorScheme` prop on `MoleculeProvider`, a `darkTheme` export, and a Storybook light/dark toggle.

  `warning` is now a full selectable intent on `Button`, `Badge`, and `Chip` (previously theme-color-only). Also fixes several pre-existing WCAG AA contrast failures in `Badge`/`Chip` and a dark-mode contrast bug in `Chip`'s `neutral` intent.

- e768033: Initial alpha release of the Atomly UI packages (`@atomly-ai/react`, `@atomly-ai/vue`, `@atomly-ai/types`), previously scoped under `@molecule-ui`. Includes the Button, Badge, and Chip atoms, the ButtonGroup molecule, the icon set, and the shared prop types.

## 0.2.0-alpha.1

### Minor Changes

- 7e0ca51: Overhauls the primitive color palette for a more modern SaaS/AI look (indigo primary, violet AI accent, coral brand, amber promoted to a full `warning` intent, emerald success) and adds dark mode support to `@atomly-ai/react` — a new `colorScheme` prop on `MoleculeProvider`, a `darkTheme` export, and a Storybook light/dark toggle.

  `warning` is now a full selectable intent on `Button`, `Badge`, and `Chip` (previously theme-color-only). Also fixes several pre-existing WCAG AA contrast failures in `Badge`/`Chip` and a dark-mode contrast bug in `Chip`'s `neutral` intent.

## 0.2.0-alpha.0

### Minor Changes

- e768033: Initial alpha release of the Atomly UI packages (`@atomly-ai/react`, `@atomly-ai/vue`, `@atomly-ai/types`), previously scoped under `@molecule-ui`. Includes the Button, Badge, and Chip atoms, the ButtonGroup molecule, the icon set, and the shared prop types.

## 0.1.0

### Minor Changes

- 5210a3a: Initial release — Button, Badge, Chip atoms and ButtonGroup molecule
