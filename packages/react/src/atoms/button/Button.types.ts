import type { UseButtonOptions } from "../../hooks";
import type { ButtonType, ButtonVariant, ButtonSize, FullWidth } from '@molecule-ui/types'

export type ButtonProps = Pick<UseButtonOptions, 'onPress' | 'onPressChange' | 'isDisabled'> & {
    buttonType?: ButtonType;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: FullWidth;
    children: React.ReactNode;
    'aria-label'?: string;
    'data-testid'?: string;
}