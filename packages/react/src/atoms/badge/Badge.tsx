import type { BadgeProps } from './Badge.types';
import StyledBadge from './Badge.styles';

const Badge = ({ intent = 'neutral', content, size = 'md' }: BadgeProps) => {
  return (
    <StyledBadge $intent={intent} $size={size}>
      {content}
    </StyledBadge>
  );
};

export default Badge;
