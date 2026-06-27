Sync design tokens from the Figma Design Tokens file into the codebase.

No arguments needed.

The Figma Design Tokens file is at: https://www.figma.com/design/GFCI1ypTw7ZXlKJzrfGKdz/Design-tokens

The token values live in two files:
- `packages/react/src/theme/defaultTheme.ts` — runtime token values
- `packages/react/src/theme/theme.types.ts` — TypeScript shape of the theme

Follow these steps:

1. **Fetch token variables** from Figma using the MCP tool `get_variable_defs` on the Design Tokens file URL.

2. **Write the raw Figma output to `tokens/primitives.json`** before making any other changes. This creates an auditable snapshot of exactly what came from Figma. If semantic/alias tokens exist as a separate collection, write those to `tokens/semantic.json`.

3. **Read `defaultTheme.ts` and `theme.types.ts`** in full before making any changes.

4. **Map Figma variable collections to theme keys** using this structure:
   - Color variables → `defaultTheme.colors`
   - Spacing variables → `defaultTheme.spacing`
   - Typography variables → `defaultTheme.typography`
   - Border radius variables → `defaultTheme.radii`
   - Transition/duration variables → `defaultTheme.transitions`

5. **Update `defaultTheme.ts`** with new or changed values. Rules:
   - Do not remove existing keys — they may be referenced by components
   - Add new keys if Figma introduces tokens that don't yet exist in the theme
   - Flag any value changes to existing keys explicitly (these affect all components using that token)

6. **Update `theme.types.ts`** only if new token categories or keys were added. Do not remove or rename existing type properties.

7. **Report a diff summary**:
   - New tokens added
   - Existing token values changed (list old → new)
   - Figma variables that could not be mapped to an existing theme key (flag for manual review)
