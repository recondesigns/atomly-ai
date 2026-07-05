# molecule-ui

![React](https://img.shields.io/badge/React-18%20%7C%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-11-C865B9?style=for-the-badge&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Node](https://img.shields.io/badge/Node-%3E%3D20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A monorepo design system publishing React and Vue component libraries built on atomic design principles.

## Packages

| Package                                  | Description                                    |
| ---------------------------------------- | ---------------------------------------------- |
| [`@atomly-ai/react`](packages/react)     | React component library (Emotion + React Aria) |
| [`@atomly-ai/vue`](packages/vue)         | Vue 3 component library                        |
| [`@atomly-ai/types`](packages/types)     | Shared TypeScript prop types                   |
| [`@atomly-ai/website`](packages/website) | Documentation site (Next.js)                   |

## Requirements

- Node >= 20
- pnpm >= 9

## Getting started

```bash
pnpm install
```

## Development

```bash
# React component development
pnpm dev:storybook-react        # Storybook on port 6006

# Vue component development
pnpm dev:storybook-vue          # Storybook on port 6007

# Documentation site
pnpm dev:website
```

## Building

```bash
pnpm build                  # Build all packages (types → react → vue)
pnpm build:types            # Build shared types package only
```

> Always run `pnpm build:types` first if you've changed anything in `packages/types`.

## Linting & formatting

```bash
pnpm lint
pnpm format
```

## Project structure

```
packages/
  react/       # @atomly-ai/react — atoms, molecules, hooks, theme
  vue/         # @atomly-ai/vue — atoms, molecules, composables
  types/       # @atomly-ai/types — shared prop type definitions
  website/     # Documentation site
figma/         # Figma Code Connect config
tokens/        # Raw design token exports from Figma
```

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing. All three publishable packages (`@atomly-ai/react`, `@atomly-ai/vue`, `@atomly-ai/types`) are linked — they always release at the same version.

### Workflow for contributors

Every PR that changes package behavior (new component, bug fix, API change) needs a changeset:

```bash
# 1. After making your changes, create a changeset
pnpm changeset

# Follow the interactive prompts:
#   - Select which packages are affected
#   - Choose the bump type: patch (bug fix), minor (new feature), major (breaking change)
#   - Write a short summary of what changed (this becomes the changelog entry)

# 2. Commit the generated .changeset/*.md file alongside your code changes
git add .changeset/
git commit -m "chore: add changeset"
```

The `.changeset/*.md` file that gets generated is human-readable and should be committed with your PR.

### How releases work

When PRs with changesets are merged into `main`, the release GitHub Action automatically opens a **"Version Packages" PR** that:

- Bumps the version in each affected `package.json`
- Updates `CHANGELOG.md` files with the changeset summaries
- Deletes the consumed `.changeset/*.md` files

Merging that PR triggers a second run of the action that **publishes to npm**.

### What does not need a changeset

- Documentation-only changes
- Changes to `packages/website`
- Internal tooling or CI changes (scripts, configs, workflows)
- Test-only changes

## Contributing

See [`CLAUDE.md`](CLAUDE.md) for architecture details and development conventions. See [`ROADMAP.md`](ROADMAP.md) for planned work.

## License

MIT
