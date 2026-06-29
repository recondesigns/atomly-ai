import type { ChipVariant, ChipIntent, ChipSize } from '@molecule-ui/types';

export type ChipProps = {
  variant?: ChipVariant;
  intent?: ChipIntent;
  size?: ChipSize;
  isDisabled?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
  'data-testid'?: string;
};
