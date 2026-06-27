Check the current branch for semver-breaking changes against main.

No arguments needed.

A breaking change is anything that would require consumers to update their code after upgrading. This command identifies them so the correct semver bump (major) can be applied.

Follow these steps:

1. Run `git diff main..HEAD --name-only` to see which files changed.
2. Run `git diff main..HEAD -- packages/types/src packages/react/src/index.ts packages/react/src/atoms/index.ts packages/react/src/molecules/index.ts packages/vue/src/index.ts packages/vue/src/atoms/index.ts packages/vue/src/molecules/index.ts` to see the public API diff.
3. Run `git diff main..HEAD -- packages/react/package.json packages/vue/package.json packages/types/package.json` to check for dependency changes.

**Evaluate for breaking changes in these categories:**

Exports:
- [ ] Any component, hook, composable, or type removed from a barrel export?
- [ ] Any component renamed or moved to a different entry point?

Props / types:
- [ ] Any required prop added to an existing component? (consumers must update all usages)
- [ ] Any existing prop removed?
- [ ] Any prop type narrowed (e.g. `string` → `'a' | 'b'`)?
- [ ] Any prop renamed?
- [ ] Any token key removed or renamed in `MoleculeUITheme`?

Behavior:
- [ ] Any default prop value changed in a way that alters visual output?
- [ ] Any change to which HTML element is rendered (affects styling and semantic expectations)?

Dependencies:
- [ ] Any peer dependency version range narrowed or bumped to a new major?
- [ ] Any previously-optional peer dependency made required?

**Output:**

List every breaking change found with:
- The file and line where the change occurs
- Why it is breaking (what consumer code would need to change)
- Whether it could be made non-breaking with a deprecation path instead

End with a recommendation: **patch**, **minor**, or **major** bump, with a one-line justification.
