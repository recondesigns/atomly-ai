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

const intentColors: Record<BadgeIntent, { background: string; border: string; text: string }> = {
  neutral: { background: '#F8FAFC', border: '#CBD5E1', text: '#475569' },
  primary: { background: '#EFF6FF', border: '#2563EB', text: '#1D4ED8' },
  success: { background: '#F0FDF4', border: '#00A63E', text: '#008236' },
  danger: { background: '#FEF2F2', border: '#DC2626', text: '#B91C1C' },
  brand: { background: '#FFF7ED', border: '#FE9A00', text: '#C27A00' },
};

const StyledBadge = styled.span<{
  $intent: BadgeIntent;
  $size: BadgeSize;
}>(({ theme, $intent, $size }) => {
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
