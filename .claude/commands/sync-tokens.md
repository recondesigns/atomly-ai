Sync design tokens from Figma into the codebase via a Token Studio export.

No arguments needed.

## Workflow

1. **Export from Token Studio** — in Figma, open the Token Studio plugin, export all tokens, and save the file as `tokens/figma-export.json` (overwrite the existing file)

2. **Run `pnpm sync:tokens`** — this does two things in sequence:
   - `scripts/sync-figma-tokens.mjs` reads `tokens/figma-export.json`, maps the primitive values to the theme structure, and writes `tokens/primitives.json`
   - `style-dictionary.config.mjs` reads `tokens/primitives.json` and regenerates all outputs

3. **Verify the outputs** — confirm the following files were updated:
   - `tokens/primitives.json` — source token values in DTCG format
   - `packages/vue/src/tokens/primitives.css` — CSS custom properties
   - `packages/react/src/theme/tokens.generated.js` — ES6 named exports
   - `packages/react/src/theme/tokens.generated.d.ts` — TypeScript declarations

4. **Run `pnpm typecheck`** to confirm the generated output still satisfies the `MoleculeUITheme` type shape.

5. **Report a diff summary**:
   - Token values changed (list old → new)
   - Any new tokens that were added
   - Any tokens that fell back to hardcoded defaults (means the Figma variable name doesn't match the mapping in `scripts/sync-figma-tokens.mjs`)

## Updating the mapping

The script in `scripts/sync-figma-tokens.mjs` maps Figma primitive names (e.g. `blue/600`) to theme keys (e.g. `color.primary`). If new token categories are added in Figma that don't exist in the mapping, update the script and add the new entries to `tokens/primitives.json` and `packages/react/src/theme/theme.types.ts` as needed.

## Files committed after a sync

Commit all four generated files together with `tokens/figma-export.json`:

- `tokens/figma-export.json`
- `tokens/primitives.json`
- `packages/vue/src/tokens/primitives.css`
- `packages/react/src/theme/tokens.generated.js`
- `packages/react/src/theme/tokens.generated.d.ts`
