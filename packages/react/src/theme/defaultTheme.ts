/**
 * Default light theme for Molecule UI.
 *
 * Every value here is a design token. When a consumer wants to
 * customize the look, they override values in this object rather
 * than writing CSS overrides. This keeps everything traceable.
 */

import type { MoleculeUITheme } from "./theme.types"

export const defaultTheme: MoleculeUITheme = {
    colors: {
        primary: '#2563EB',
        primaryHover: '#1D4ED8',
        primaryActive: '#1E40AF',

        brand: '#FE9A00',
        brandHover: '#E17100',
        brandActive: '#E17100',

        success: '#00A63E',
        successHover: '#008236',
        successActive: '#016630',

        danger: '#DC2626',
        dangerHover: '#B91C1C',
        dangerActive: '#991B1B',

        background: '#FFFFFF',
        surface: '#F8FAFC',
        surfaceHover: '#F1F5F9',

        textPrimary: '#0F172A',
        textSuccess: '#FFFFFF',
        textOnPrimary: '#FFFFFF',
        textOnSecondary: '#0F172A',
        textOnDanger: '#FFFFFF',
        textDisabled: '#94A3B8',

        border: '#E2E8F0',
        borderFocus: '#2563EB',

        disabled: '#F1F5F9',
        focusRing: 'rgba(37, 99, 235, 0.4)',

    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
    },
    typography: {
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
        },
    },
    radii: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        full: '9999px',
    },
    transitions: {
        fast: '120ms ease',
        normal: '200ms ease',
    },
}