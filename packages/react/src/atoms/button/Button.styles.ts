import styled from '@emotion/styled'
import type { ButtonType, ButtonVariant, ButtonSize } from '@molecule-ui/types'

const sizeStyles: Record<ButtonSize, {
  padding: string;
  fontSize: string;
  minHeight: string;
}> = {
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
  $buttonType: ButtonType;
  $variant: ButtonVariant;
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
  transition: background-color ${({ theme }) => theme.transitions?.fast ?? '120ms ease'},
              box-shadow ${({ theme }) => theme.transitions?.fast ?? '120ms ease'},
              opacity ${({ theme }) => theme.transitions?.fast ?? '120ms ease'};

  /* Size */
  padding: ${({ $size }) => sizeStyles[$size].padding};
  font-size: ${({ $size }) => sizeStyles[$size].fontSize};
  min-height: ${({ $size }) => sizeStyles[$size].minHeight};

  /* Full width */
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  /* Variant colors */
  ${({ theme, $variant, $isPressed, $isDisabled, $buttonType }) => {
    // Fallback colors in case there's no theme provider
    const colors = theme.colors ?? {
      primary: '#2563EB',
      primaryHover: '#1D4ED8',
      primaryActive: '#1E40AF',
      primaryLight: '#EFF6FF',
      success: '#00A63E',
      successHover: '#008236',
      successActive: '#016630',
      destructive: '#DC2626',
      destructiveHover: '#B91C1C',
      destructiveActive: '#991B1B',
      textPrimary: '#0F172A',
      textOnPrimary: '#FFFFFF',
      textSuccess: '#00A63E',
      textOnDanger: '#FFFFFF',
      textDisabled: '#94A3B8',
      disabled: '#2188ef',
      border: '#E2E8F0',
      focusRing: 'rgba(37, 99, 235, 0.4)',
    };

    if ($isDisabled) {
      return `
        background-color: ${colors.disabled};
        color: ${colors.textDisabled};
        cursor: not-allowed;
      `;
    }

    const variantColors: Record<ButtonVariant, {
      base: string;
      hover: string;
      active: string;
      light: string;
      contrastText: string;
    }> = {
      primary: {
        base: colors.primary,
        hover: colors.primaryHover,
        active: colors.primaryActive,
        light: colors.primaryLight,
        contrastText: colors.textOnPrimary
      },
      success: {
        base: colors.success,
        hover: colors.successHover,
        active: colors.successActive,
        light: colors.successLight,
        contrastText: colors.textOnPrimary
      },
      destructive: {
        base: colors.danger,
        hover: colors.dangerHover,
        active: colors.dangerActive,
        light: colors.dangerLight,
        contrastText: colors.textOnPrimary
      },
      brand: {
        base: colors.brand,
        hover: colors.brandHover,
        active: colors.brandActive,
        light: colors.brandLight,
        contrastText: colors.textOnPrimary
      }
    }

    const c = variantColors[$variant]

    const typeStyles: Record<ButtonType, string> = {
      contained: `
        background: ${$isPressed ? c.active : c.base};
        color: ${c.contrastText};
        &:hover:not(:disabled) {
          background: ${c.hover}
        }
      `,
      outlined: `
        background: ${$isPressed ? `${c.light}14` : `${c.light}`};
        color: ${c.base};
        border: 1px soild ${c.base};
        &:hover:not(:disabled) {
          background: ${c.base}0A;
          border-color: ${c.hover};
          color: ${c.hover};
        }
      `,
      ghost: `
        background: ${$isPressed ? `${c.base}14` : 'transparent'};
        color: ${c.base};
        &:hover:not(:disabled): {
          background: ${c.base}0A;
        }
      `
    }

    return typeStyles[$buttonType]
  }}

  /* Focus ring — visible on keyboard focus, not click */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.focusRing ?? 'rgba(37, 99, 235, 0.4)'};
    outline-offset: 2px;
  }
`;