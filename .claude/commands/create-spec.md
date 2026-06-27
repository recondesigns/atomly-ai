Create a component spec file in `.claude/specs/`.

Arguments: $ARGUMENTS
Expected format: `<ComponentName>` (e.g. `Badge`)

Spec files give Claude design intent and prop mapping context before building or connecting a component. They are read automatically by `/code-connect` and should be consulted when creating or auditing a component.

Follow these steps:

1. **Check if a spec already exists** at `.claude/specs/<lowercase-name>.md`. If it does, read it and report what's there — do not overwrite unless asked.

2. **Read the existing component files** if the component already exists:
   - React: `packages/react/src/atoms/<lowercase>/` or `molecules/<lowercase>/`
   - Types: `packages/types/src/components/atoms/<lowercase>.ts` or `molecules/`
   - Use these to populate props and states accurately rather than guessing

3. **Use the Figma MCP** (`get_design_context` or `get_screenshot`) on the Component library file to find the component frame and its variants:
   - Component library: https://www.figma.com/design/wv7I1q5SbuPS4vozGd1gmR/Component-library
   - Capture the node ID for the component frame and include it in the Figma frame link

4. **Create `.claude/specs/<lowercase-name>.md`** using `.claude/specs/_template.md` as the base. Fill in:
   - Overview and Figma frame link with the correct node ID
   - All props with types, defaults, and notes
   - All visual/interactive states
   - Anatomy (root element, slots, sub-elements)
   - Accessibility (role, keyboard, ARIA, screen reader behavior)
   - Any open questions or unresolved design decisions

5. Confirm the spec file is created and report any sections that could not be filled in from available information.
