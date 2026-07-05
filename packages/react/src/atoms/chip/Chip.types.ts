import type { ChipVariant, ChipIntent, ChipSize } from '@atomly-ai/types';

export type ChipProps = {
  variant?: ChipVariant;
  intent?: ChipIntent;
  size?: ChipSize;
  isDisabled?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
  'data-testid'?: string;
};
