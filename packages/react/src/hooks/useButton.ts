import React from 'react'
import { useButton as useAriaButton } from '@react-aria/button'
import type { AriaButtonProps } from '@react-types/button'
import type { PressEvent } from '@react-types/shared'

export type UseButtonOptions = {
    /** Called when the button is pressed (click, Enter, Space) */
    onPress?: (e: PressEvent) => void;
    /** Called when pressed state changes (for visual feedback) */
    onPressChange?: (isPressed: boolean) => void;
    /** Whether the button is disabled */
    isDisabled?: boolean;
    /** The underlying element type, for correct ARIA behavior */
    elementType?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
}

export type UseButtonReturn = {
    /** Props to spread onto the button element */
    buttonProps: React.HTMLAttributes<HTMLElement>;
    /** Whether the button is currently being pressed */
    isPressed: boolean;
    /** Ref to attach to the button element */
    buttonRef: React.RefObject<HTMLElement | null>;
}

export function useButton(options: UseButtonOptions): UseButtonReturn {
    const ref = React.useRef<HTMLElement | null>(null);

    // Map our curated options to react-aria's expected shape.
    // @ts-expect-error blah
    const ariaProps: AriaButtonProps<typeof options.elementType> = {
        onPress: options.onPress,
        onPressChange: options.onPressChange,
        isDisabled: options.isDisabled,
        elementType: options.elementType ?? 'button',
        'aria-label': options['aria-label'],
    };
    // @ts-expect-error blah
    const { buttonProps, isPressed } = useAriaButton(ariaProps, ref);

    return {
        buttonProps,
        isPressed,
        buttonRef: ref,
    };
}