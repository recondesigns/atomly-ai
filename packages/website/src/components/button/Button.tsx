'use client';

import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Site-only Button — built from the Figma "Website" file's Button component
 * set (node 43:538). Not part of @atomly-ai/react; used for this site's own
 * chrome (CTAs, nav, copy-code actions, etc).
 *
 * Figma variant -> prop mapping:
 * - "type" (contained | outlined | ghost) -> `variant`, renamed to avoid
 *   colliding with the native HTML button `type` attribute (button/submit/reset).
 * - "size" (sm | md | lg) -> `size`.
 * - "icon" (no-icon | icon) -> `icon` boolean.
 * - "state" (default | hover | pressed) -> NOT a prop; implemented as CSS
 *   :hover/:active, per the component's own Figma description.
 */
export type ButtonVariant = 'contained' | 'outlined' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  children: ReactNode;
}

const sizeStyles: Record<
  ButtonSize,
  { height: string; paddingX: string; outlinedPaddingX: string; fontSize: string; iconSize: string }
> = {
  sm: {
    height: '32px',
    paddingX: '12px',
    outlinedPaddingX: '13px',
    fontSize: '12px',
    iconSize: '13px',
  },
  md: {
    height: '40px',
    paddingX: '20px',
    outlinedPaddingX: '21px',
    fontSize: '14px',
    iconSize: '16px',
  },
  lg: {
    height: '48px',
    paddingX: '28px',
    outlinedPaddingX: '29px',
    fontSize: '16px',
    iconSize: '20px',
  },
};

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: ${({ $size }) => sizeStyles[$size].height};
  padding: 0
    ${({ $variant, $size }) =>
      $variant === 'outlined' ? sizeStyles[$size].outlinedPaddingX : sizeStyles[$size].paddingX};
  border-radius: 0;
  border: none;
  cursor: pointer;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    sans-serif;
  font-weight: 400;
  font-size: ${({ $size }) => sizeStyles[$size].fontSize};
  line-height: 20px;
  letter-spacing: -0.1504px;
  white-space: nowrap;
  transition: background-color 120ms ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'contained':
        return `
          background: #000000;
          color: #ffffff;
          &:hover:not(:disabled) { background: #27272a; }
          &:active:not(:disabled) { background: #3f3f47; }
        `;
      case 'outlined':
        return `
          background: transparent;
          color: #0f172a;
          border: 1px solid #0f172a;
          &:hover:not(:disabled) { background: rgba(0, 0, 0, 0.05); }
          &:active:not(:disabled) { background: rgba(0, 0, 0, 0.1); }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #0f172a;
          &:hover:not(:disabled) { background: rgba(0, 0, 0, 0.05); }
          &:active:not(:disabled) { background: rgba(0, 0, 0, 0.1); }
        `;
      default:
        return '';
    }
  }}
`;

const IconWrapper = styled.span<{ $size: ButtonSize }>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => sizeStyles[$size].iconSize};
  height: ${({ $size }) => sizeStyles[$size].iconSize};

  svg {
    width: 100%;
    height: 100%;
  }
`;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  variant = 'contained',
  size = 'md',
  icon = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} {...rest}>
      {children}
      {icon && (
        <IconWrapper $size={size} aria-hidden="true">
          <ArrowIcon />
        </IconWrapper>
      )}
    </StyledButton>
  );
}

Button.displayName = 'Button';

export default Button;
