import React from 'react';
import type { ButtonProps } from './Button.types';
import { useButton } from '../../hooks';
import { StyledButton } from './Button.styles';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, forwardedRef) {
    const {
      buttonType = 'contained',
      variant = 'primary',
      size = 'md',
      isDisabled = false,
      fullWidth = false,
      onPress,
      onPressChange,
      children,
      'aria-label': ariaLabel,
      'data-testid': testId,
    } = props;

    const { buttonProps, isPressed, buttonRef } = useButton({
      onPress,
      onPressChange,
      isDisabled,
      elementType: 'button',
      'aria-label': ariaLabel,
    });

    return (
      <StyledButton
        {...buttonProps}
        ref={(node) => {
          // Assign to both the internal ref (for react-aria)
          // and the forwarded ref (for the consumer).
          (buttonRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        $buttonType={buttonType}
        $variant={variant}
        $size={size}
        $isPressed={isPressed}
        $isDisabled={isDisabled}
        $fullWidth={fullWidth}
        data-testid={testId}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
