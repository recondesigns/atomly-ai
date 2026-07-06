import styled from '@emotion/styled';
import type { ButtonVariant, ButtonIntent, ButtonSize } from '@atomly-ai/types';

const sizeStyles: Record<
  ButtonSize,
  {
    padding: string;
    fontSize: string;
    minHeight: string;
  }
> = {
  sm: {
    padding: '6px 12px',
    fontSize: '0.875rem',
    minHeight: '32px',
  },
  md: {
    padding: '8px 16px',
    fontSize: '1rem',
    minHeight: '40px',
  },
  lg: {
    padding: '12px 24px',
    fontSize: '1.125rem',
    minHeight: '48px',
  },
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $intent: ButtonIntent;
  $size: ButtonSize;
  $isPressed: boolean;
  $isDisabled: boolean;
  $fullWidth: boolean;
}>`
  /* Reset */
  appearance: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.typography?.fontFamily ?? 'inherit'};
  font-weight: ${({ theme }) => theme.typography?.fontWeight?.medium ?? 500};
  line-height: ${({ theme }) => theme.typography?.lineHeight?.tight ?? '1.25'};
  border-radius: ${({ theme }) => theme.radii?.md ?? '6px'};
  transition:
    background-color ${({ theme }) => theme.transitions?.fast ?? '120ms ease'},
    box-shadow ${({ theme }) => theme.transitions?.fast ?? '120ms ease'},
    opacity ${({ theme }) => theme.transitions?.fast ?? '120ms ease'};

  /* Size */
  padding: ${({ $size }) => sizeStyles[$size].padding};
  font-size: ${({ $size }) => sizeStyles[$size].fontSize};
  min-height: ${({ $size }) => sizeStyles[$size].minHeight};

  /* Full width */
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Intent + variant colors */
  ${({ theme, $variant, $intent, $isPressed, $isDisabled }) => {
    const colors = theme.colors ?? {
      primary: '#4F46E5',
      primaryHover: '#4338CA',
      primaryActive: '#3730A3',
      primaryLight: '#EEF2FF',
      success: '#059669',
      successHover: '#047857',
      successActive: '#065F46',
      successLight: '#ECFDF5',
      danger: '#DC2626',
      dangerHover: '#B91C1C',
      dangerActive: '#991B1B',
      dangerLight: '#FEF2F2',
      brand: '#F97316',
      brandHover: '#EA580C',
      brandActive: '#C2410C',
      brandLight: '#FFF7ED',
      warning: '#F59E0B',
      warningHover: '#D97706',
      warningActive: '#B45309',
      warningLight: '#FFFBEB',
      primaryText: '#4F46E5',
      brandText: '#C2410C',
      successText: '#047857',
      dangerText: '#DC2626',
      warningText: '#B45309',
      textOnPrimary: '#FFFFFF',
      textOnWarning: '#0F172A',
      textDisabled: '#94A3B8',
      disabled: '#CBD5E1',
      focusRing: 'rgba(79, 70, 229, 0.4)',
    };

    if ($isDisabled) {
      return `
        background-color: ${colors.disabled};
        color: ${colors.textDisabled};
        cursor: not-allowed;
      `;
    }

    const intentColors: Record<
      ButtonIntent,
      {
        base: string;
        hover: string;
        active: string;
        light: string;
        contrastText: string;
        // Text/border color for outline & ghost variants (rendered directly on the
        // page background). Uses the theme's `<intent>Text` step, which is
        // independently WCAG-verified against the page background for both
        // light and dark themes — the base fill color isn't always dark/light
        // enough on its own (e.g. brand/success base colors fail against white).
        outlineText: string;
      }
    > = {
      primary: {
        base: colors.primary,
        hover: colors.primaryHover,
        active: colors.primaryActive,
        light: colors.primaryLight,
        contrastText: colors.textOnPrimary,
        outlineText: colors.primaryText,
      },
      success: {
        base: colors.success,
        hover: colors.successHover,
        active: colors.successActive,
        light: colors.successLight,
        contrastText: colors.textOnPrimary,
        outlineText: colors.successText,
      },
      danger: {
        base: colors.danger,
        hover: colors.dangerHover,
        active: colors.dangerActive,
        light: colors.dangerLight,
        contrastText: colors.textOnPrimary,
        outlineText: colors.dangerText,
      },
      brand: {
        base: colors.brand,
        hover: colors.brandHover,
        active: colors.brandActive,
        light: colors.brandLight,
        contrastText: colors.textOnPrimary,
        outlineText: colors.brandText,
      },
      warning: {
        base: colors.warning,
        hover: colors.warningHover,
        active: colors.warningActive,
        light: colors.warningLight,
        contrastText: colors.textOnWarning,
        outlineText: colors.warningText,
      },
    };

    const c = intentColors[$intent];

    const variantStyles: Record<ButtonVariant, string> = {
      solid: `
        background: ${$isPressed ? c.active : c.base};
        color: ${c.contrastText};
        &:hover:not(:disabled) {
          background: ${c.hover};
        }
      `,
      outline: `
        background: ${$isPressed ? `${c.light}` : 'transparent'};
        color: ${c.outlineText};
        border: 1px solid ${c.outlineText};
        &:hover:not(:disabled) {
          background: ${c.light};
          border-color: ${c.hover};
          color: ${c.hover};
        }
      `,
      ghost: `
        background: ${$isPressed ? `${c.outlineText}14` : 'transparent'};
        color: ${c.outlineText};
        &:hover:not(:disabled) {
          background: ${c.outlineText}0A;
        }
      `,
    };

    return variantStyles[$variant];
  }}

  /* Focus ring — visible on keyboard focus, not click */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.focusRing ?? 'rgba(79, 70, 229, 0.4)'};
    outline-offset: 2px;
  }
`;
