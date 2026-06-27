# figma/

Figma-related configuration and assets for this project.

## Files

- `figma.config.json` — Figma Code Connect configuration; tells the CLI where to find `.figma.tsx` mapping files and which Figma file to publish to
- `assets/` — any Figma-exported static assets (icons, illustrations) if needed in the future

## Code Connect

Code Connect files (`<Name>.figma.tsx`) live alongside their component in the source tree, not here. This directory holds only the config.

To publish mappings to Figma after creating Code Connect files:
```bash
FIGMA_ACCESS_TOKEN=your_token npx figma connect publish
```

The token should be set in `.env` (already gitignored) — never commit it.
