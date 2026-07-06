import styled from '@emotion/styled';
import type { ChipVariant, ChipIntent, ChipSize } from '@atomly-ai/types';

type ChipColors = { bg: string; border: string; text: string };

type ChipThemeColors = {
  primary: string;
  success: string;
  danger: string;
  // Text uses the theme's `<intent>Text` step — a step darker (light theme) or
  // lighter (dark theme) than the intent's base fill, independently WCAG-verified
  // to hit 4.5:1 against both white/neutral-900 and the intent's own light/dark
  // background. Border/bg keep using the base color — only text needs the shift.
  primaryText: string;
  successText: string;
  dangerText: string;
  warningText: string;
  warningActive: string;
  primaryLight: string;
  successLight: string;
  dangerLight: string;
  warningLight: string;
  // Neutral intent (and the disabled state) has no dedicated palette — it
  // rides the theme's generic text/border/surface tokens so it flips
  // correctly between light and dark (a hardcoded near-black text color
  // would be invisible against a dark page background on the outlined/ghost
  // variants' transparent bg).
  textPrimary: string;
  textDisabled: string;
  border: string;
  surfaceHover: string;
  disabled: string;
};

const defaultColors: ChipThemeColors = {
  primary: '#4F46E5',
  success: '#059669',
  danger: '#DC2626',
  primaryText: '#4F46E5',
  successText: '#047857',
  dangerText: '#DC2626',
  warningText: '#B45309',
  warningActive: '#B45309',
  primaryLight: '#EEF2FF',
  successLight: '#ECFDF5',
  dangerLight: '#FEF2F2',
  warningLight: '#FFFBEB',
  textPrimary: '#0F172A',
  textDisabled: '#94A3B8',
  border: '#E2E8F0',
  surfaceHover: '#F1F5F9',
  disabled: '#F1F5F9',
};

function buildVariantColors(
  colors: ChipThemeColors
): Record<ChipVariant, Record<ChipIntent, ChipColors>> {
  return {
    filled: {
      neutral: { bg: colors.surfaceHover, border: colors.border, text: colors.textPrimary },
      primary: { bg: colors.primaryLight, border: colors.primary, text: colors.primaryText },
      success: { bg: colors.successLight, border: colors.success, text: colors.successText },
      danger: { bg: colors.dangerLight, border: colors.danger, text: colors.dangerText },
      warning: { bg: colors.warningLight, border: colors.warningActive, text: colors.warningText },
    },
    outlined: {
      neutral: { bg: 'transparent', border: colors.border, text: colors.textPrimary },
      primary: { bg: 'transparent', border: colors.primary, text: colors.primaryText },
      success: { bg: 'transparent', border: colors.success, text: colors.successText },
      danger: { bg: 'transparent', border: colors.danger, text: colors.dangerText },
      warning: { bg: 'transparent', border: colors.warningActive, text: colors.warningText },
    },
    ghost: {
      neutral: { bg: 'transparent', border: 'transparent', text: colors.textPrimary },
      primary: { bg: 'transparent', border: 'transparent', text: colors.primaryText },
      success: { bg: 'transparent', border: 'transparent', text: colors.successText },
      danger: { bg: 'transparent', border: 'transparent', text: colors.dangerText },
      warning: { bg: 'transparent', border: 'transparent', text: colors.warningText },
    },
  };
}

function buildDisabledColors(colors: ChipThemeColors): Record<ChipVariant, ChipColors> {
  return {
    filled: { bg: colors.disabled, border: colors.border, text: colors.textDisabled },
    outlined: { bg: 'transparent', border: colors.border, text: colors.textDisabled },
    ghost: { bg: 'transparent', border: 'transparent', text: colors.textDisabled },
  };
}

type SizeStyle = { paddingX: string; paddingY: string; fontSize: string };

const sizeStyles: Record<ChipSize, SizeStyle> = {
  sm: { paddingX: '8px', paddingY: '4px', fontSize: '0.75rem' },
  md: { paddingX: '12px', paddingY: '6px', fontSize: '0.875rem' },
  lg: { paddingX: '16px', paddingY: '8px', fontSize: '1rem' },
};

type StyledChipProps = {
  $variant: ChipVariant;
  $intent: ChipIntent;
  $size: ChipSize;
  $isDisabled: boolean;
};

const StyledChip = styled.span<StyledChipProps>(
  ({ theme, $variant, $intent, $size, $isDisabled }) => {
    const themeColors = theme.colors ?? defaultColors;
    const variantColors = buildVariantColors(themeColors);
    const disabledColors = buildDisabledColors(themeColors);
    const colors = $isDisabled ? disabledColors[$variant] : variantColors[$variant][$intent];
    const size = sizeStyles[$size];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${size.paddingY} ${size.paddingX}`,
      borderRadius: theme?.radii?.full ?? '9999px',
      border: `1px solid ${colors.border}`,
      backgroundColor: colors.bg,
      color: colors.text,
      fontFamily: theme?.typography?.fontFamily ?? 'inherit',
      fontSize: size.fontSize,
      fontWeight: theme?.typography?.fontWeight?.medium ?? 500,
      lineHeight: theme?.typography?.lineHeight?.normal ?? 1.5,
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    };
  }
);

export default StyledChip;
