import React from 'react';
import type { ChipProps } from './Chip.types';
import StyledChip from './Chip.styles';

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      variant = 'filled',
      intent = 'neutral',
      size = 'md',
      isDisabled = false,
      children,
      'aria-label': ariaLabel,
      'data-testid': testId,
    },
    ref
  ) => {
    return (
      <StyledChip
        ref={ref}
        $variant={variant}
        $intent={intent}
        $size={size}
        $isDisabled={isDisabled}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
        data-testid={testId}
      >
        {children}
      </StyledChip>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
