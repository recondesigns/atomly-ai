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

| Package | Description |
|---|---|
| [`@molecule-ui/react`](packages/react) | React component library (Emotion + React Aria) |
| [`@molecule-ui/vue`](packages/vue) | Vue 3 component library |
| [`@molecule-ui/types`](packages/types) | Shared TypeScript prop types |
| [`@molecule-ui/website`](packages/website) | Documentation site (Next.js) |

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
pnpm storybook:react        # Storybook on port 6006

# Vue component development
pnpm storybook:vue          # Storybook on port 6007

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
  react/       # @molecule-ui/react — atoms, molecules, hooks, theme
  vue/         # @molecule-ui/vue — atoms, molecules, composables
  types/       # @molecule-ui/types — shared prop type definitions
  website/     # Documentation site
figma/         # Figma Code Connect config
tokens/        # Raw design token exports from Figma
```

## Contributing

See [`CLAUDE.md`](CLAUDE.md) for architecture details and development conventions. See [`ROADMAP.md`](ROADMAP.md) for planned work.

## License

MIT
