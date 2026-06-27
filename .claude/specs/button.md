# Button — Component Spec

## Overview

The primary interactive element. Used for actions, form submissions, and navigation triggers. Renders as a `<button>` element managed through the `useButton` React Aria hook.

**Figma frame:** [Component library → Atoms/Button](https://www.figma.com/design/wv7I1q5SbuPS4vozGd1gmR/Component-library)

## Variants & props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `buttonType` | `'contained' \| 'outlined' \| 'ghost'` | `'contained'` | Visual treatment |
| `variant` | `'primary' \| 'brand' \| 'success' \| 'destructive'` | `'primary'` | Color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `isDisabled` | `boolean` | `false` | Uses React Aria — sets `aria-disabled`, not HTML `disabled` |
| `isLoading` | `boolean` | `false` | Shows a loading indicator; content remains rendered |
| `fullWidth` | `boolean` | `false` | Stretches to fill container width |
| `onPress` | `(e: PressEvent) => void` | — | React Aria press event (covers click, Enter, Space) |
| `onPressChange` | `(isPressed: boolean) => void` | — | Called when pressed state changes |
| `aria-label` | `string` | — | Required when button has no visible text |
| `children` | `React.ReactNode` | — | Button label / content |
| `data-testid` | `string` | — | |

## States

- **Default** — resting
- **Hover** — background shifts to `*Hover` color token
- **Pressed** — background shifts to `*Active` color token; tracked via `isPressed` from `useButton`
- **Disabled** — `aria-disabled` set; cursor `not-allowed`; muted background
- **Loading** — shows inline loading indicator alongside children
- **Focus** — 2px `focusRing` outline, `outline-offset: 2px`, visible only on `:focus-visible`

## Anatomy

```
<StyledButton>           ← <button> element
  [loading indicator]    ← rendered when isLoading=true
  {children}             ← button label
</StyledButton>
```

## Accessibility

- **Element:** native `<button>` — no role override needed
- **Keyboard:** Enter and Space trigger `onPress` via React Aria
- **Disabled:** `aria-disabled="true"` rather than HTML `disabled` — keeps element focusable for screen readers
- **Focus ring:** visible on keyboard focus only (`:focus-visible`)
- **Loading:** no ARIA live region yet — open question

## Open questions

- Should `isLoading` announce to screen readers via `aria-live`?
- Loading indicator is currently an unstyled placeholder div — needs a real spinner component
