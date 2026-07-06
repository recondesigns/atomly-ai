export type MoleculeUITheme = {
  colors: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    primaryLight: string;

    brand: string;
    brandHover: string;
    brandActive: string;
    brandLight: string;

    success: string;
    successHover: string;
    successActive: string;
    successLight: string;

    danger: string;
    dangerHover: string;
    dangerActive: string;
    dangerLight: string;

    warning: string;
    warningHover: string;
    warningActive: string;
    warningLight: string;

    // Text-safe step per intent — for text/icon color on outline/ghost
    // variants, where the base fill color doesn't always hit 4.5:1 contrast.
    primaryText: string;
    brandText: string;
    successText: string;
    dangerText: string;
    warningText: string;

    background: string;
    surface: string;
    surfaceHover: string;

    textPrimary: string;
    textSuccess: string;
    textOnPrimary: string;
    textOnSecondary: string;
    textOnDanger: string;
    textOnWarning: string;
    textDisabled: string;

    border: string;
    borderFocus: string;

    disabled: string;
    focusRing: string;
  };
  spacing: {
    xs: string; // 4px
    sm: string; // 8px
    md: string; // 12px
    lg: string; // 16px
    xl: string; // 24px
    xxl: string; // 32px
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
      tight: number;
      normal: number;
      relaxed: number;
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
};
