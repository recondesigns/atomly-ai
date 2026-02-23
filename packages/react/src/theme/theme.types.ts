/**
 * Theme type definitions for Molecule UI.
 *
 * These types define the shape of the theme object. Every component
 * reads from this structure, so changing it affects the entire system.
 *
 * For a junior engineer: Think of this as the "contract" between
 * the theme and the components. Components trust that these properties
 * exist. TypeScript enforces that trust at compile time.
 */

export type MoleculeUITheme = {
    colors: {
        primary: string;
        primaryHover: string;
        primaryActive: string;

        brand: string;
        brandHover: string;
        brandActive: string;

        success: string;
        successHover: string;
        successActive: string;

        danger: string;
        dangerHover: string;
        dangerActive: string;

        background: string;
        surface: string;
        surfaceHover: string;

        textPrimary: string;
        textSuccess: string;
        textOnPrimary: string;
        textOnSecondary: string;
        textOnDanger: string;
        textDisabled: string;

        border: string;
        borderFocus: string;

        disabled: string;
        focusRing: string;

        // textPrimary: string;
        // textPrimaryInverse: string;

        // border: string;
        // borderFocus: string;
    };
    spacing: {
        xs: string;   // 4px
        sm: string;   // 8px
        md: string;   // 12px
        lg: string;   // 16px
        xl: string;   // 24px
        xxl: string;  // 32px
    };
    typography: {
        fontFamily: string;
        fontSize: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
        };
        fontWeight: {
            normal: number;
            medium: number;
            semibold: number;
            bold: number;
        };
        lineHeight: {
            tight: string;
            normal: string;
            relaxed: string;
        };
    };
    radii: {
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    transitions: {
        fast: string;
        normal: string;
    };
}