import type { BadgeProps as BadgePropsType } from '@molecule-ui/types';

export type BadgeProps = {
  intent?: BadgePropsType['intent'];
  size?: BadgePropsType['size'];
  content: string;
  className?: string;
  testId?: string;
};
