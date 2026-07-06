import type { MoleculeUITheme } from './theme.types';
import { defaultTheme } from './defaultTheme';
import {
  ColorDarkPrimary,
  ColorDarkPrimaryHover,
  ColorDarkPrimaryActive,
  ColorDarkPrimaryLight,
  ColorDarkBrand,
  ColorDarkBrandHover,
  ColorDarkBrandActive,
  ColorDarkBrandLight,
  ColorDarkSuccess,
  ColorDarkSuccessHover,
  ColorDarkSuccessActive,
  ColorDarkSuccessLight,
  ColorDarkDanger,
  ColorDarkDangerHover,
  ColorDarkDangerActive,
  ColorDarkDangerLight,
  ColorDarkWarning,
  ColorDarkWarningHover,
  ColorDarkWarningActive,
  ColorDarkWarningLight,
  ColorDarkPrimaryText,
  ColorDarkBrandText,
  ColorDarkSuccessText,
  ColorDarkDangerText,
  ColorDarkWarningText,
  ColorDarkBackground,
  ColorDarkSurface,
  ColorDarkSurfaceHover,
  ColorDarkTextPrimary,
  ColorDarkTextSuccess,
  ColorDarkTextOnPrimary,
  ColorDarkTextOnSecondary,
  ColorDarkTextOnDanger,
  ColorDarkTextOnWarning,
  ColorDarkTextDisabled,
  ColorDarkBorder,
  ColorDarkBorderFocus,
  ColorDarkDisabled,
  ColorDarkFocusRing,
} from './tokens.generated';

// Spacing, typography, radii, and transitions are mode-independent — only
// colors change between light and dark, so everything else is reused as-is.
export const darkTheme: MoleculeUITheme = {
  ...defaultTheme,
  colors: {
    primary: ColorDarkPrimary,
    primaryHover: ColorDarkPrimaryHover,
    primaryActive: ColorDarkPrimaryActive,
    primaryLight: ColorDarkPrimaryLight,

    brand: ColorDarkBrand,
    brandHover: ColorDarkBrandHover,
    brandActive: ColorDarkBrandActive,
    brandLight: ColorDarkBrandLight,

    success: ColorDarkSuccess,
    successHover: ColorDarkSuccessHover,
    successActive: ColorDarkSuccessActive,
    successLight: ColorDarkSuccessLight,

    danger: ColorDarkDanger,
    dangerHover: ColorDarkDangerHover,
    dangerActive: ColorDarkDangerActive,
    dangerLight: ColorDarkDangerLight,

    warning: ColorDarkWarning,
    warningHover: ColorDarkWarningHover,
    warningActive: ColorDarkWarningActive,
    warningLight: ColorDarkWarningLight,

    primaryText: ColorDarkPrimaryText,
    brandText: ColorDarkBrandText,
    successText: ColorDarkSuccessText,
    dangerText: ColorDarkDangerText,
    warningText: ColorDarkWarningText,

    background: ColorDarkBackground,
    surface: ColorDarkSurface,
    surfaceHover: ColorDarkSurfaceHover,

    textPrimary: ColorDarkTextPrimary,
    textSuccess: ColorDarkTextSuccess,
    textOnPrimary: ColorDarkTextOnPrimary,
    textOnSecondary: ColorDarkTextOnSecondary,
    textOnDanger: ColorDarkTextOnDanger,
    textOnWarning: ColorDarkTextOnWarning,
    textDisabled: ColorDarkTextDisabled,

    border: ColorDarkBorder,
    borderFocus: ColorDarkBorderFocus,

    disabled: ColorDarkDisabled,
    focusRing: ColorDarkFocusRing,
  },
};
