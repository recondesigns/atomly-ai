Add a new story variation to an existing component.

Arguments: $ARGUMENTS
Expected format: `<ComponentName> <StoryName> [react|vue]` (e.g. `Button Outlined react`)

If the framework is not specified, check both packages and ask if the component exists in both.

Follow these steps:

1. **Locate the stories file** based on the framework:
   - React: `packages/react/src/atoms/<lowercase>/` or `packages/react/src/molecules/<lowercase>/` → `<Name>.stories.tsx`
   - Vue: `packages/vue/src/atoms/<lowercase>/` or `packages/vue/src/molecules/<lowercase>/` → `<Name>.stories.ts`

2. **Read the existing stories file** to understand the meta definition, existing arg shapes, and which props are already covered by existing stories.

3. **Add a new named export** for `<StoryName>`:
   - React: follow the `Story = { ...Default, args: { ... }, parameters: { controls: { exclude: [...] } } }` pattern used in the file; exclude props not relevant to this variation from controls
   - Vue: follow the `StoryObj<typeof meta>` pattern used in the file
   - Set `args` that highlight the props most relevant to this variation

4. Confirm the story is added and no existing stories were modified.
