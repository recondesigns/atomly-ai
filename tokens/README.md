# tokens/

Raw design token exports from the Figma Design Tokens file. This is the source of truth for what came directly from Figma, before any transformation into code.

## Structure

```
tokens/
  primitives.json    ← raw color, spacing, typography, radii, transition values
  semantic.json      ← role-based tokens (e.g. color.action.primary) when added
```

## Workflow

1. `/sync-tokens` fetches variables from Figma and writes raw output here
2. The command then maps the values into `packages/react/src/theme/defaultTheme.ts`
3. If token structure changes in Figma, this file reflects it — diff it to understand what changed

## Do not hand-edit these files

These are generated from Figma. Manual edits will be overwritten on the next sync. If a value looks wrong, fix it in the Figma Design Tokens file and re-sync.
