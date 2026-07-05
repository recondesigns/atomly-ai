export type BadgeIntent = 'neutral' | 'primary' | 'success' | 'danger' | 'brand';
export type BadgeSize = 'sm' | 'md' | 'lg';

//TODO: When adding the Vue component, content might need to be changed to using slots
export type BadgeProps = {
  intent?: BadgeIntent;
  size?: BadgeSize;
  content: string;
  className?: string;
  testId?: string;
};
