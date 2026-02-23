import styled from '@emotion/styled'
// import type { ButtonProps } from './Button.types'
import type { ButtonVariant, ButtonSize } from '../../../../types/dist/components/atoms/button';

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
  ${({ theme, $variant, $isPressed, $isDisabled }) => {
        // Fallback colors in case there's no theme provider
        const colors = theme.colors ?? {
            primary: '#2563EB',
            primaryHover: '#1D4ED8',
            primaryActive: '#1E40AF',
            secondary: '#F1F5F9',
            secondaryHover: '#E2E8F0',
            secondaryActive: '#CBD5E1',
            danger: '#DC2626',
            dangerHover: '#B91C1C',
            dangerActive: '#991B1B',
            textPrimary: '#0F172A',
            textOnPrimary: '#FFFFFF',
            textOnSecondary: '#0F172A',
            textOnDanger: '#FFFFFF',
            textDisabled: '#94A3B8',
            disabled: '#F1F5F9',
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

        const variants: Record<ButtonVariant, string> = {
            primary: `
        background-color: ${$isPressed ? colors.primaryActive : colors.primary};
        color: ${colors.textOnPrimary};
        &:hover:not(:disabled) {
          background-color: ${colors.primaryHover};
        }
      `,
            success: `
        background-color: ${$isPressed ? colors.secondaryActive : colors.secondary};
        color: ${colors.textOnSecondary};
        &:hover:not(:disabled) {
          background-color: ${colors.secondaryHover};
        }
      `,
            destructive: `
        background-color: ${$isPressed ? colors.dangerActive : colors.danger};
        color: ${colors.textOnDanger};
        &:hover:not(:disabled) {
          background-color: ${colors.dangerHover};
        }
      `,
            //         ghost: `
            //     background-color: ${$isPressed ? colors.secondaryActive : 'transparent'};
            //     color: ${colors.textPrimary};
            //     &:hover:not(:disabled) {
            //       background-color: ${colors.secondaryHover};
            //     }
            //   `,
        };

        return variants[$variant];
    }}

  /* Focus ring — visible on keyboard focus, not click */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.focusRing ?? 'rgba(37, 99, 235, 0.4)'};
    outline-offset: 2px;
  }
`;