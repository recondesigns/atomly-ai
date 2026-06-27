Audit a component for accessibility against WCAG 2.1 AA.

Arguments: $ARGUMENTS
Expected format: `<ComponentName> [react|vue]` (e.g. `Button react`)

If framework is not specified, audit both if the component exists in both packages.

Use Radix UI (https://www.radix-ui.com/) and the React Aria documentation (https://react-spectrum.adobe.com/react-aria/) as references for correct accessibility patterns. Cross-reference with the WAI-ARIA Authoring Practices Guide (https://www.w3.org/WAI/ARIA/apg/) for the relevant pattern (button, checkbox, dialog, etc.).

---

**React audit checklist**

Read `<Name>.tsx`, `<Name>.types.ts`, `<Name>.styles.ts`, and `<Name>.stories.tsx` before evaluating.

Semantics & ARIA:
- [ ] Uses a semantically correct HTML element OR applies the correct `role` attribute
- [ ] Interactive elements managed through `useButton` or the appropriate hook (not raw DOM event handlers)
- [ ] `aria-label` or `aria-labelledby` is supported as a prop for elements without visible text
- [ ] `aria-disabled` is set correctly when `isDisabled` is true (React Aria handles this via `buttonProps`)
- [ ] No `aria-*` attributes hard-coded in the component that should be dynamic

Keyboard:
- [ ] All interactive functionality is reachable and operable via keyboard
- [ ] Focus is managed correctly (React Aria hooks handle this for standard patterns)
- [ ] Focus is not trapped unintentionally

Visual:
- [ ] Focus ring is visible on `:focus-visible` (not just `:focus`)
- [ ] The component does not rely on color alone to convey state
- [ ] Disabled state is visually distinct and not just color-based

Props & stories:
- [ ] `aria-label` prop is defined in types and accepted by the component
- [ ] `data-testid` prop is defined and spread onto the root element
- [ ] At least one story demonstrates the disabled state
- [ ] At least one story demonstrates keyboard-accessible usage

---

**Vue audit checklist**

Read `<Name>.vue` and `<Name>.stories.ts` before evaluating.

- [ ] Uses a semantically correct HTML element OR correct `role`
- [ ] Interactive elements use native elements (`<button>`, `<input>`) rather than `div` with click handlers
- [ ] `aria-label` is accepted as a prop and bound to the root element
- [ ] `aria-disabled` is set when a disabled prop is true
- [ ] `:data-testid` is bound to the root element
- [ ] Focus ring visible on `:focus-visible`
- [ ] No color-only state communication
- [ ] Stories cover disabled and interactive states

---

Report findings as ✅ / ❌ / ⚠️ per check. For each failure, cite the relevant WCAG 2.1 AA criterion and suggest a specific fix. Reference how Radix UI or React Aria handles the same pattern when recommending a solution.
