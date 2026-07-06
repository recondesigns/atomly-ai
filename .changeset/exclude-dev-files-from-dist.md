---
'@atomly-ai/react': patch
'@atomly-ai/vue': patch
---

Excludes Storybook story files and unit test files from the published package's type declarations. `tsconfig.build.json` was compiling every file under `src` — including `*.stories.tsx` and `*.test.ts` — into `dist/**/*.d.ts`, leaking dev-only build artifacts (e.g. `dist/atoms/button/Button.stories.d.ts`) into the npm tarball. No runtime behavior changes; this only trims unnecessary files from the published package.
