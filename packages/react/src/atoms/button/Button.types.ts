import type { UseButtonOptions } from '../../hooks';
import type {
  ButtonVariant,
  ButtonIntent,
  ButtonSize,
  FullWidth,
  IsLoading,
} from '@atomly-ai/types';

export type ButtonProps = Pick<UseButtonOptions, 'onPress' | 'onPressChange' | 'isDisabled'> & {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  fullWidth?: FullWidth;
  children: React.ReactNode;
  isLoading?: IsLoading;
  'aria-label'?: string;
  'data-testid'?: string;
};
