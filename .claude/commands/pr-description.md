Generate a pull request title and body for the current branch.

No arguments needed.

Follow these steps:

1. Run `git log main..HEAD --oneline` to see all commits on this branch.
2. Run `git diff main..HEAD --stat` to see which files changed.
3. Run `git diff main..HEAD` to read the full diff.

4. Draft a PR **title** under 70 characters that describes the change type and scope, e.g.:
   - `feat(Button): add isLoading prop and spinner`
   - `chore: add Claude Code slash commands for component scaffolding`
   - `fix(Badge): correct border-radius token fallback`

5. Draft a PR **body** using this structure:

```
## Summary
- <bullet summarizing what changed and why>
- <bullet for any notable decisions or trade-offs, if applicable>

## Changes
- `<file or package>`: <what changed>

## Test plan
- [ ] `pnpm storybook:react` — verify affected stories render correctly
- [ ] Check Controls panel for any new or changed props
- [ ] <any other specific checks relevant to the diff>
```

6. Output the title and body so the user can copy them, and offer to run `gh pr create --title "..." --body "..."` if they want to open the PR immediately.
