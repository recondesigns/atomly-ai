/**
 * Module augmentation — tells Emotion "when someone accesses
 * `theme` inside a styled component or css prop, the type is
 * MoleculeTheme, not the default empty object."
 *
 * Without this, you'd get no autocomplete inside:
 *   styled.button`color: ${props => props.theme.colors.primary}`
 *
 * This file doesn't produce any JavaScript. It only affects
 * the TypeScript compiler.
 */

import type { MoleculeUITheme } from './theme.types'

declare module '@emotion/react' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Theme extends MoleculeUITheme { }
}