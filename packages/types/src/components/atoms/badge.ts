export type BadgeStatus = 'default' | 'primary' | 'success' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

//TODO: When adding the Vue component, content might need to be changed to using slots
export type BadgeProps = {
    status?: BadgeStatus;
    size?: BadgeSize;
    content: string;
    className?: string;
    testId?: string;
}