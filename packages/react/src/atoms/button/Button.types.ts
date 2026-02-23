import type { UseButtonOptions } from "../../hooks";
import type { ButtonVariant, ButtonSize, FullWidth } from '@molecule-ui/types'

export type ButtonProps = Pick<UseButtonOptions, 'onPress' | 'onPressChange' | 'isDisabled'> & {
    variant?: ButtonVariant;
    size: ButtonSize;
    fullWidth?: FullWidth;
    children: React.ReactNode;
    'aria-label'?: string;
    'data-testid'?: string;
}