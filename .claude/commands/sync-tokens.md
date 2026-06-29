Sync design tokens from the Figma Design Tokens file into the codebase.

No arguments needed.

The Figma Design Tokens file is at: https://www.figma.com/design/GFCI1ypTw7ZXlKJzrfGKdz/Design-tokens

Follow these steps:

1. **Fetch token variables** from Figma using the MCP tool `get_variable_defs` on the Design Tokens file URL.

2. **Write the raw Figma output to `tokens/primitives.json`** in DTCG format (`$value`, `$type`). This is the only file you edit manually. If semantic/alias tokens exist as a separate collection, write those to `tokens/semantic.json`.

   Use this token structure (match existing key names exactly to avoid breaking the pipeline):
   - Color variables → `color.*`
   - Spacing variables → `spacing.*`
   - Font family → `font-family.*`
   - Font size → `font-size.*`
   - Font weight → `font-weight.*` (use `$type: "number"` and numeric `$value`)
   - Line height → `line-height.*` (use `$type: "number"`)
   - Border radius → `border-radius.*`
   - Transition/duration → `transition.*`

   Special case: `color.focus-ring` uses no `$type` so its rgba value is preserved as-is across both CSS and JS outputs.

3. **Run `pnpm build:tokens`** to regenerate all outputs via Style Dictionary:
   - `packages/vue/src/tokens/primitives.css` — CSS custom properties (`--molecule-*`)
   - `packages/react/src/theme/tokens.generated.js` — ES6 named exports
   - `packages/react/src/theme/tokens.generated.d.ts` — TypeScript declarations

   `packages/react/src/theme/defaultTheme.ts` picks up the new values automatically — do not edit it manually.

4. **Run `pnpm typecheck`** to confirm the generated output satisfies the `MoleculeUITheme` type shape.

5. **Report a diff summary**:
   - New tokens added
   - Existing token values changed (list old → new)
   - Figma variables that could not be mapped to an existing key (flag for manual review)
