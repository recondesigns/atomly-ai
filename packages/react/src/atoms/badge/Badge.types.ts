import type { BadgeProps as BadgePropsType } from '@atomly-ai/types';

export type BadgeProps = {
  intent?: BadgePropsType['intent'];
  size?: BadgePropsType['size'];
  content: string;
  className?: string;
  testId?: string;
};
