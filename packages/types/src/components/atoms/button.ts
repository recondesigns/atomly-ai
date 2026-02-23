export type ButtonProps = {
    onClick: () => void;
    label: string;
};

export type ButtonVariant = 'primary' | 'brand' | 'success' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type FullWidth = boolean;
