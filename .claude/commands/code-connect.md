Wire up Figma Code Connect for a React component.

Arguments: $ARGUMENTS
Expected format: `<ComponentName>` (e.g. `Button`)

The Figma Component library is at: https://www.figma.com/design/wv7I1q5SbuPS4vozGd1gmR/Component-library

Follow these steps:

1. **Check that `@figma/code-connect` is installed** in `packages/react/package.json`. If it is not listed, note that it needs to be added (`pnpm add -D @figma/code-connect`) before this file can be published — do not install it automatically.

   Also check that `figma/figma.config.json` exists — it should already be present. If not, create it pointing to the Component library URL with `"include": ["packages/react/src/**/*.figma.tsx"]`.

2. **Locate the component** in `packages/react/src/atoms/<lowercase>/` or `packages/react/src/molecules/<lowercase>/`. Read `<Name>.types.ts` to understand the full prop surface.

3. **Use the Figma MCP** (`get_design_context` or `get_metadata`) to find the node ID for the `<ComponentName>` component frame in the Component library file.

4. **Create `<Name>.figma.tsx`** in the same folder as `<Name>.tsx`:
   - Import `figma` from `@figma/code-connect`
   - Import the component from `./index`
   - Call `figma.connect(<Name>, '<figma-url-with-node-id>', { props: { ... }, example: (props) => <Name ... /> })`
   - Map each Figma property to a code prop using:
     - `figma.boolean()` for boolean props
     - `figma.enum()` for variant/size unions
     - `figma.string()` for text content
     - `figma.children()` for nested components/slots

5. **Check for a component spec** at `.claude/specs/<lowercase-name>.md`. If it exists, read it before mapping props — the spec documents which Figma properties map to which code props and may include the correct node ID.

6. Confirm the file is created. Remind the user to run `npx figma connect publish` from the `figma/` directory (with `FIGMA_ACCESS_TOKEN` set in `.env`) when ready to upload mappings to Figma.
