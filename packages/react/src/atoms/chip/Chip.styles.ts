import styled from '@emotion/styled';
import type { ChipVariant, ChipIntent, ChipSize } from '@atomly-ai/types';

type ChipColors = { bg: string; border: string; text: string };

const filledColors: Record<ChipIntent, ChipColors> = {
  neutral: { bg: '#f1f5f9', border: '#e2e8f0', text: '#0f172a' },
  primary: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
  success: { bg: '#f0fdf4', border: '#dcfce7', text: '#00a63e' },
  danger: { bg: '#fef2f2', border: '#fee2e2', text: '#dc2626' },
};

const outlinedColors: Record<ChipIntent, ChipColors> = {
  neutral: { bg: 'transparent', border: '#e2e8f0', text: '#0f172a' },
  primary: { bg: 'transparent', border: '#2563eb', text: '#2563eb' },
  success: { bg: 'transparent', border: '#00a63e', text: '#00a63e' },
  danger: { bg: 'transparent', border: '#dc2626', text: '#dc2626' },
};

const ghostColors: Record<ChipIntent, ChipColors> = {
  neutral: { bg: 'transparent', border: 'transparent', text: '#0f172a' },
  primary: { bg: 'transparent', border: 'transparent', text: '#2563eb' },
  success: { bg: 'transparent', border: 'transparent', text: '#00a63e' },
  danger: { bg: 'transparent', border: 'transparent', text: '#dc2626' },
};

const variantColors: Record<ChipVariant, Record<ChipIntent, ChipColors>> = {
  filled: filledColors,
  outlined: outlinedColors,
  ghost: ghostColors,
};

const disabledColors: Record<ChipVariant, ChipColors> = {
  filled: { bg: '#f8fafc', border: '#e2e8f0', text: '#94a3b8' },
  outlined: { bg: 'transparent', border: '#e2e8f0', text: '#94a3b8' },
  ghost: { bg: 'transparent', border: 'transparent', text: '#94a3b8' },
};

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
