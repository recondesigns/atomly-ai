import styled from '@emotion/styled';
import type { BadgeIntent, BadgeSize } from '@atomly-ai/types';

const sizeStyles: Record<
  BadgeSize,
  {
    padding: string;
  }
> = {
  sm: {
    padding: '4px 8px',
  },
  md: {
    padding: '8px 12px',
  },
  lg: {
    padding: '12px 16px',
  },
};

const StyledBadge = styled.span<{
  $intent: BadgeIntent;
  $size: BadgeSize;
}>(({ theme, $intent, $size }) => {
  const colors = theme.colors ?? {
    primary: '#4F46E5',
    primaryLight: '#EEF2FF',
    success: '#059669',
    successLight: '#ECFDF5',
    danger: '#DC2626',
    dangerLight: '#FEF2F2',
    brand: '#F97316',
    brandLight: '#FFF7ED',
    warningActive: '#B45309',
    warningLight: '#FFFBEB',
    primaryText: '#4F46E5',
    successText: '#047857',
    dangerText: '#DC2626',
    brandText: '#C2410C',
    warningText: '#B45309',
  };

  // Text/border for each intent uses the theme's `<intent>Text` step — dark
  // enough for 4.5:1 text contrast against the paired light background in
  // both light and dark themes. See color-palette spec / Button.styles.ts.
  const intentColors: Record<BadgeIntent, { background: string; border: string; text: string }> = {
    neutral: { background: '#F8FAFC', border: '#CBD5E1', text: '#475569' },
    primary: { background: colors.primaryLight, border: colors.primary, text: colors.primaryText },
    success: { background: colors.successLight, border: colors.success, text: colors.successText },
    danger: { background: colors.dangerLight, border: colors.danger, text: colors.dangerText },
    brand: { background: colors.brandLight, border: colors.brand, text: colors.brandText },
    warning: {
      background: colors.warningLight,
      border: colors.warningActive,
      text: colors.warningText,
    },
  };

  const intent = intentColors[$intent];
  const size = sizeStyles[$size];

  return {
    fontFamily: theme?.typography?.fontFamily ?? 'inherit',
    backgroundColor: intent.background,
    border: 'none',
    color: intent.text,
    padding: size.padding,
    borderRadius: '6px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'default',
    lineHeight: '1.25',
  };
});

export default StyledBadge;
