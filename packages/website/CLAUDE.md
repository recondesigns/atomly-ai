# packages/website — @molecule-ui/website

Next.js documentation and playground site for Molecule UI. Currently a dev playground; will become the public-facing component docs site.

## Stack

- **Next.js** (App Router, `src/app/`)
- Imports components from `@molecule-ui/react` via the workspace

## Running

```bash
pnpm dev:website    # from repo root — starts Next.js dev server
```

## Notes

- This package has its own `pnpm-lock.yaml` and `pnpm-workspace.yaml` — it is a nested workspace. Don't confuse it with the root workspace.
- It consumes `@molecule-ui/react` as a dependency. If you change the React package and want to see changes reflected here, run `pnpm -F @molecule-ui/react build` first.
- The site is not yet structured for production docs. When building out documentation pages, look at **Primer** (https://primer.style/) and **Atlassian Design System** (https://atlassian.design/) as references for how to structure component documentation pages.
