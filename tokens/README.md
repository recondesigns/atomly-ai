# tokens/

Raw design token exports from the Figma Design Tokens file. This is the source of truth for what came directly from Figma, before any transformation into code.

## Structure

```
tokens/
  figma-export.json  ← raw Token Studio export from Figma (all collections, all modes)
  primitives.json    ← mapped DTCG-format values consumed by Style Dictionary
```

## Workflow

The export from Figma is **manual** — nothing here talks to the Figma API.

1. In Figma, open the **Token Studio** plugin → export all tokens → save the file as `tokens/figma-export.json` (overwrite the existing file)
2. Run `pnpm sync:tokens`, which does two things in sequence:
   - `scripts/sync-figma-tokens.mjs` reads `figma-export.json`, maps primitive names (e.g. `blue/600`) to the theme structure, and writes `primitives.json`
   - `style-dictionary.config.mjs` reads `primitives.json` and regenerates the consumer outputs: `packages/vue/src/tokens/primitives.css`, `packages/react/src/theme/tokens.generated.js`, and its `.d.ts`
3. Diff `figma-export.json` to understand what changed in Figma

See `.claude/commands/sync-tokens.md` for the full checklist (verification, typecheck, which files to commit together).

## If token names change in Figma

`sync-figma-tokens.mjs` looks up primitives **by name** (e.g. `get('blue/600', fallback)`). If a ramp is renamed or restructured in Figma, update the lookup keys in the script in the same pass — otherwise the sync succeeds but silently falls back to hardcoded (stale) values.

## Do not hand-edit these files

These are generated from Figma. Manual edits will be overwritten on the next sync. If a value looks wrong, fix it in the Figma Design Tokens file and re-sync.
