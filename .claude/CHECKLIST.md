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
- [x] Design tokens defined in Figma (primitives: color, spacing, typography, radii, transitions)
- [x] Semantic/alias token layer in Figma
- [x] Component Library frames created for existing components (Button, Badge, ButtonGroup)
- [x] Component API aligned with industry conventions (Button + Badge prop rename)
- [x] Figma library published — Design Tokens file
- [x] Figma library published — Component Library file
- [~] Code Connect published for Button — requires paid Figma plan
- [~] Code Connect published for Badge — requires paid Figma plan
- [~] Code Connect published for ButtonGroup — requires paid Figma plan

---

## Token Pipeline

- [x] `tokens/` folder scaffolded
- [x] Style Dictionary installed and configured (`style-dictionary.config.mjs` at root; `pnpm build:tokens`)
- [x] `tokens/primitives.json` populated (seeded from `defaultTheme.ts`; re-sync from Figma when token pipeline is validated)
- [x] Style Dictionary outputs CSS custom properties to `packages/vue/src/tokens/` (imported in Vue `index.ts`)
- [x] Style Dictionary outputs JS tokens consumed by `defaultTheme.ts` (+ `.d.ts` sidecar for TypeScript)
- [x] Token sync validated end-to-end — Token Studio export → `tokens/figma-export.json` → `pnpm sync:tokens` → CSS + JS outputs confirmed clean
- [x] `sync-figma-tokens.mjs` extended to resolve `Space/Value`, `Typography/Value`, and `Shape/Value` Token Studio collections
- [x] Chip component tokens wired from `Component/Value` via three-layer alias chain (component → semantic → primitive)

---

## Color Palette Overhaul (branch: `feat/color-palette-overhaul`)

> AI-native palette redesign. Full design intent, ramp hexes, and migration order in `.claude/specs/color-palette.md`. Working audit notes: sync script only wires `chip/*` component tokens; Badge styles fully hardcoded; Button fallback colors stale.

- [x] Spec written — `.claude/specs/color-palette.md` (indigo primary, violet AI accent, coral brand, amber→warning, emerald success, 50–950 ramps, gradient token)
- [x] `tokens/README.md` corrected (manual Token Studio export, real file structure, rename gotcha)
- [x] Figma: primitive ramps updated — Primitive collection 55 → 94 vars (blue→indigo + green→emerald renamed/revalued, amber revalued as warning, red gaps filled, coral + violet created; all ramps 50–950)
- [x] Figma: semantic layer re-aliased — Color collection 52 → 58 vars (brand→coral, thinking→violet, focus-ring→indigo@40%, surface/user→indigo, dark `*-subtle`→950 steps; new: `background/brand-active` + 5 `warning` tokens)
- [x] Figma: `gradient/ai` paint style created (indigo→purple 135°; gradients can't be variables)
- [x] Figma: descriptions + code syntax updated across all changed variables (61 primitive + 28 semantic + 3 component descriptions)
- [x] USER: Token Studio export → `tokens/figma-export.json` (stale duplicate `blue`/`green` primitive groups stripped on write — Token Studio's own store still has them; delete inside Token Studio next time you're in there so future exports come out clean)
- [x] `scripts/sync-figma-tokens.mjs` lookup keys updated (`blue/*`→`indigo/*`, `green/*`→`emerald/*`, brand→`coral/*`); new `warning` color group added (base/hover/active/light from `amber/*`); `pnpm sync:tokens` run, 34 color tokens generated and verified against spec
- [x] `warning*` + `textOnWarning` added to `theme.types.ts` / `defaultTheme.ts`; `pnpm typecheck` clean
- [x] **Open question resolved — white-on-amber contrast:** white on amber-500 is 2.15:1 (fails WCAG AA); `textOnWarning` = neutral-900 (8.31:1). Added matching `color/text/on-warning` Figma semantic variable (aliases neutral/900 light, neutral/0 dark).
- [x] **Open question resolved — warning as a full component intent:** added to `ButtonIntent`/`BadgeIntent`/chip intent unions in `@atomly-ai/types`, wired into Button/Badge/Chip styles (Badge and Chip converted from fully-hardcoded to theme-driven in the process — the original task #6 fix). **Real finding along the way:** amber is lighter at every step than the other ramps, so the "base=600 doubles as solid-fill AND text-safe color" trick that works for primary/success/danger/brand breaks for warning — amber-500/600 both fail 4.5:1 as text/border on light backgrounds. Resolved by using amber-700 (`warningActive`, ~5:1) for warning's text/border everywhere, reserving amber-500/600 for solid fills only. Button gained a dedicated `outlineText` field to carry this distinction. Known minor residual: Button's warning _outline/ghost hover_ state still uses `warningHover` (amber-600, ~3.2:1) — passes the 3:1 UI-component minimum but not the 4.5:1 text minimum; flagged, not silently fixed, since it's a transient hover-only state.
- [x] Storybook story option lists updated (Button/Badge/Chip `intent` controls + Chip's hardcoded story arrays) to include `warning`
- [x] Storybook test suite run for real (Vitest + Playwright — Playwright's Chromium binary wasn't installed locally; installed it to get a genuine result instead of a skipped/false-pass). **Found 2 real a11y contrast failures on Chip** (`success`/`danger` intents, `color-contrast` axe rule) — confirmed via manual WCAG math these were **pre-existing bugs predating the rebrand**, not a regression: red's contrast is byte-identical before/after (4.41:1, untouched by the palette work) and old green-600 was already failing too (3.22:1 vs the new emerald-600's 3.77:1, both fail). Root cause: Chip used the intent's base `-600` fill color directly as text, the same "base color isn't always text-safe" issue we'd already found for `warning` — just less obviously, since red/green were only marginally below 4.5:1 rather than badly (like amber). Fixed by having Chip's text use `successHover`/`dangerHover` (emerald-700/red-700, ~5.2–6.5:1) instead of the base color, mirroring how Badge already did it correctly. All 26 tests pass now; `pnpm typecheck` and `pnpm lint` both clean. Manual light/dark eyeball pass in a running Storybook still open for the user.
- [ ] Deferred: Figma `Component/Value` collection has no `warning` tokens for button/badge/chip yet (e.g. `component/badge/background/warning`). Not blocking — none of the three React components actually consume `Component/Value` today (confirmed: all three read `theme.colors` directly), so this is a design-file completeness gap, not a functional one. Worth adding whenever there's a reason to also touch Figma again (avoids a low-value Token Studio round-trip right now).
- [x] Component Library file: confirmed variable bindings are correct (not hardcoded) — Button/Badge refreshed to the new palette after the library was republished + update accepted. **Chip did not refresh** — traced to a stale cached `blue/100` primitive import specific to that file (Figma library-sync quirk, not fixable via the plugin API; no local hardcoded value to fix on our end). Revisit if it's still stale next time the file is opened.
- [x] Color-page swatch artboard (node 20:2) — **full rebuild**, not just relabel: renamed Blue→Indigo and Green→Emerald, rebuilt all 6 changed ramps to their live 50–950 steps (11 each), added new Coral and Violet ramp rows, added the 7 missing semantic rows (`background/brand-active`, `background/warning`, `background/warning-subtle`, `text/on-warning`, `text/warning`, `border/warning`, `icon/warning`). Auto-layout throughout meant no manual position math — verified via screenshot, height grew exactly as predicted (4788→5474, +686px).
- [x] Component-tokens artboard (node 27:2): fixed the only two stale references — Chip card's `border/primary`/`border/success` rows said `→ blue/300`/`→ green/100`, now `→ indigo/300`/`→ emerald/100`. Full-page sweep (198 text nodes) confirmed no other stale primitive names remain.
- [ ] Still cosmetic/optional: Cover page stats ("186 Tokens") are now even more stale than before (real count is higher) — low priority, no functional impact.
- [x] **Dark mode added to `@atomly-ai/react`** (previously didn't exist in code at all — user caught this while checking Storybook). `sync-figma-tokens.mjs` now also reads Figma's `Color/Dark` collection into a parallel `colorDark` block in `primitives.json` (auto-flattens to `ColorDark*` constants via style-dictionary, zero config changes needed); new `darkTheme.ts` mirrors `defaultTheme.ts`, reusing light's spacing/typography/radii/transitions (mode-independent) and only swapping `colors`. `MoleculeProvider` gained a `colorScheme?: 'light' | 'dark'` prop (default `'light'`) selecting the base theme before applying overrides. Storybook toolbar has a light/dark toggle (`globalTypes.colorScheme`) wired through the preview decorator, plus a background wrapper so the canvas itself flips dark.
- [x] **Introduced 5 new canonical theme fields** (`primaryText`/`brandText`/`successText`/`dangerText`/`warningText`) to replace the ad-hoc "reuse base/hover color as text" pattern in Button/Badge/Chip. Each is independently WCAG-verified per theme against both white/neutral-900 and the intent's own light/dark subtle background.
- [x] **Found and fixed 3 more pre-existing WCAG contrast bugs** while doing this consolidation (on top of the 2 found earlier in Chip, see above) — never caught before because only Chip has an "all variants × all intents" story; Button/Badge don't, so these slipped through the a11y test suite: Button's `brand` outline/ghost text (coral-500 vs white = 2.8:1) and `success` outline/ghost text (emerald-600 vs white = 3.77:1); Badge's `brand` text (coral-600/`brandHover` vs white = 3.56:1). Fixed via the new `brandText`=coral-700 (5.18:1) and `successText`=emerald-700 (5.48:1).
- [x] **Own bug caught before shipping:** while writing the sync-script edit, initially set light-mode `danger-text` to red-600 (unchanged from base) instead of the already-verified red-700 — would have reintroduced the exact Chip `danger` contrast failure fixed earlier (4.41:1, fails). Caught by the a11y test suite immediately (`pnpm vitest run` failed 2 tests), fixed, tests green again.
- [x] **Visual dark-mode bug found via manual Storybook check** (not caught by the automated a11y suite, since it only runs against the light-theme default): Chip's `neutral` intent had hardcoded text (`#0f172a`) and border/bg colors, unaware of theme at all. In dark mode, the `outlined`/`ghost` variants (transparent background) rendered `#0f172a` text directly on the dark page background (`neutral-900` = `#0f172a`) — invisible, same color as its background. Fixed by wiring Chip's neutral intent (and its disabled state, same issue) to theme's generic `textPrimary`/`border`/`surfaceHover`/`disabled`/`textDisabled` tokens instead of hardcoded hex, so it flips correctly with the theme. Confirmed via Playwright screenshot before/after. Button has no `neutral` intent and Badge has no variant/transparent-bg concept, so neither was affected.
- [x] Verified end-to-end: `pnpm sync:tokens`, `pnpm typecheck` (react package), `pnpm lint` (root), `pnpm vitest run` (26/26 pass) all clean; manual Playwright screenshot pass of Chip (`AllVariantsAndIntents`) and Button (ad-hoc outline/ghost × all-intents grid) in both light and dark confirms correct rendering.

> **Model guidance:** Fable is **not needed** for any remaining step. Everything left is either a live browser check (Sonnet) or cosmetic Figma cleanup (Sonnet, Opus only if redesigning the artboard layout).

---

## Testing

- [x] Vitest unit test setup for `packages/react/src/hooks/`
- [x] Vitest unit test setup for `packages/vue/src/composables/`
- [x] `useButton` unit tests
- [x] Chromatic installed and configured (`@chromatic-com/storybook` already in devDeps)
- [x] Chromatic running on PRs via GitHub Actions
- [x] Storybook a11y switched from `'todo'` to `'error'` for all components

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
- [x] `pre-push` hook: `build:icons` diff-check (wired in during icon pipeline)
- [x] GitHub Actions workflow: lint → build → test on PRs
- [x] GitHub Actions workflow: Chromatic on PRs
- [x] GitHub Actions workflow: publish to npm on release (changesets Release workflow — first publish succeeded)

---

## Rename: molecule-ui → @atomly-ai

> Name history: `molecule-ai` and `ai-atoms` scopes were already taken on npm. Final name is `@atomly-ai`.

- [x] Create npm org `atomly-ai` (Free plan, public packages)
- [x] Rename all package names in `package.json` files (`@molecule-ui/*` → `@atomly-ai/*`) + `workspace:*` deps
- [x] Update all import statements across the codebase (~11 React source files + website)
- [x] Update all references in `CLAUDE.md`, `README.md`, `ROADMAP.md`, `.claude/` docs, config files, and workflows
- [x] Update `.changeset/config.json` linked packages array
- [x] Regenerate `pnpm-lock.yaml` (`pnpm install`) and verify build (`pnpm build:types && pnpm build` — ✅ passes)
- [x] Rename GitHub repo to `atomly-ai`
- [x] Update remote URL locally after GitHub rename

---

## Versioning & Publishing

- [x] Changesets installed and configured (`@changesets/cli` at workspace root)
- [x] `.changeset/config.json` — `access: public`, packages linked, `baseBranch: main`
- [x] `changeset`, `version-packages`, and `release` scripts added to root `package.json`
- [x] GitHub Actions release workflow — `changesets/action` creates version PR or publishes on merge to `main`
- [x] `NPM_TOKEN` secret added to GitHub repo settings
- [ ] `syncpack` installed to keep dependency versions consistent
- [x] First alpha publish of `@atomly-ai/react` and `@atomly-ai/vue` (`0.2.0-alpha.0`, `alpha` dist-tag)
- [x] Second alpha publish (`0.2.0-alpha.1`, color palette + dark mode). **Found a real npm dist-tag bug while verifying it published correctly:** `latest` pointed at `0.2.0-alpha.1` while `alpha` was frozen at `0.2.0-alpha.0` — backwards from intended. Root-caused to `@changesets/cli`'s own publish logic (`getReleaseTag`/`getUnpublishedPackages` in `changesets-cli.cjs.js`): while a package's `publishedState` is `"only-pre"` (every published version so far shares the pre-release tag, i.e. no "regular" release has ever happened), changesets deliberately publishes to `latest` instead of the configured tag — intentional, so `npm install` isn't stuck on the very first alpha forever. Consequence: the `alpha` tag can never move again, and every future alpha release would repeat the same "latest = newest alpha" pattern, for as long as pre-release mode continues.
- [ ] Migrate release to npm Trusted Publishing (OIDC) — add `id-token: write` + npm ≥ 11.5.1 in `release.yml`, configure trusted publisher, then delete `NPM_TOKEN` secret
- [x] Exit changesets alpha pre-release mode (`pnpm changeset pre exit`, PR #51) — the actual fix for the dist-tag issue above, not a workaround: collapses the two accumulated alpha changesets into a single clean `0.2.0` (no prerelease suffix) on the next release, which correctly publishes to `latest` since it's a real release. Pre-release mode can be safely re-entered later (`pnpm changeset pre enter <tag>`, e.g. a `beta` phase before a future major) without hitting this same issue, since the `only-pre` condition only triggers when a package has _never_ had a regular release.

---

## Bundle Health

- [x] Excluded `*.stories.tsx`/`*.test.ts` from `tsconfig.build.json` in React and Vue — these were leaking into the published npm tarball as `dist/**/*.stories.d.ts` / `dist/**/*.test.d.ts` (caught while explaining why recent Storybook-only PRs didn't need changesets). `tsconfig.build.json`'s `include: ["src"]` compiled every file under `src`, including dev-only ones; the base `tsconfig.json` used by `pnpm typecheck` is unaffected, so type-checking of stories/tests is unchanged. Verified via `npm pack --dry-run` before/after on both packages.
- [ ] `size-limit` installed with per-package size budgets (`@atomly-ai/react`, `@atomly-ai/vue`)
- [ ] Size limit check added to GitHub Actions CI (fails PR if budget exceeded)
- [ ] `rollup-plugin-visualizer` added to Vite config for bundle composition inspection
- [ ] Baseline bundle sizes documented after first stable release
- [ ] Tree-shaking validated — confirm per-category imports (`@atomly-ai/react/atoms`) are smaller than full import

---

## Icon Pipeline

Components are named `AlertIcon`, `CloseIcon`, etc. (noun + Icon suffix). SVG source files live in **one place** — `icons/` at the repo root. Both packages generate their own framework-specific components from that shared source. Generated files are committed; a diff-check at pre-push and CI ensures they stay in sync.

- [x] Create `icons/` folder at repo root — shared SVG source files (`alert.svg`, `close.svg`, `check.svg`)
- [x] Install `@svgr/core` + `@svgr/cli` in `packages/react` devDependencies
- [x] Add `build:icons` script to `packages/react` — Node.js script using `@svgr/core` to generate `AlertIcon.tsx` etc. into `src/atoms/icons/`, with `currentColor`, title prop, TypeScript output, and auto-generated `index.ts`
- [x] Write `packages/vue/scripts/build-icons.mjs` — Node.js script that reads `icons/*.svg`, optimizes with `svgo`, and wraps each in a `<script lang="ts" setup>` Vue SFC with `inheritAttrs: false`
- [x] Add `build:icons` script to `packages/vue`
- [x] Add root `build:icons` script: `pnpm -F @atomly-ai/react build:icons && pnpm -F @atomly-ai/vue build:icons`
- [x] Generated icon components auto-exported from `packages/react/src/atoms/index.ts` and `packages/vue/src/atoms/index.ts`
- [x] Add icon types to `packages/types` (`IconName` union, `IconSize`)
- [x] Add Storybook stories for the icon set (AllIcons grid, Sizes, Colors — in both React and Vue)
- [x] Husky `pre-push` hook — runs `pnpm build:icons` then `git diff --exit-code` on generated icon folders; blocks push if committed output is stale
- [x] CI step — same regenerate + diff-check as pre-push, runs before lint/build as a backstop against `--no-verify`

---

## Components

### Atoms

- [x] Button — `solid`, `outline`, `ghost` variants; `primary`, `success`, `danger`, `brand`, `warning` intents; `sm`/`md`/`lg` sizes; loading state; React Aria keyboard/press handling; light + dark theme support
- [x] Badge — `filled` variant; `neutral`, `primary`, `success`, `danger`, `brand`, `warning` intents; `sm`/`md`/`lg` sizes; light + dark theme support
- [x] Chip — `filled`, `outlined`, `ghost` variants; `neutral`, `primary`, `success`, `danger`, `warning` intents; `sm`/`md`/`lg` sizes; disabled state; token-backed colors from Token Studio; light + dark theme support

### Molecules

- [x] ButtonGroup — horizontal group wrapper for Button atoms

### Planned

- [ ] Input — text field with label, helper text, error state
- [ ] Select — dropdown with intent and size variants
- [ ] Toggle / Switch
- [ ] Checkbox
- [ ] Avatar

---

## Storybook Enhancements

- [x] `@storybook/addon-designs` installed — embeds Figma frames in story panels. Added to both React and Vue Storybook configs (`addon-designs@11.1.3`, peer-compatible with our Storybook 10.2.10). Wired a `design` parameter on Button's story meta (using the Component Library file link from `.claude/specs/button.md`) as a working example — confirmed via Playwright screenshot that the "Design" tab appears and routes correctly in the addon panel. The embedded Figma iframe itself 403'd in the headless test browser (no Figma session/auth) — expected, since the file likely isn't set to public sharing; should render fine in an authenticated browser.
- [ ] Figma frame links added to all existing stories — React: USER added node-scoped links (`?node-id=...`) to Button, Badge, and Chip. Vue: Button now has one too (reuses the same React Button frame — same component conceptually). Blocked on **ButtonGroup** and **Icons** — no Figma frames exist for them yet, so there's nothing to link to (a Figma-content gap, not a code gap). Vue's Badge/Chip don't exist yet either — only Button is built in `@atomly-ai/vue` so far.
- [ ] Storybook deployed (Chromatic hosting or Vercel)

---

## Documentation Site

- [ ] Site structure defined (`packages/website`)
- [ ] Getting started / installation page
- [ ] Component pages for all stable components
- [ ] Design token reference page
- [ ] Contribution guide
- [ ] Changelog page
