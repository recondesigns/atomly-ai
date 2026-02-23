import type { BadgeProps } from './Badge.types';
import StyledBadge from './Badge.styles';

const Badge = ({ status = 'primary', content, size = 'md' }: BadgeProps) => {
  return (
    <StyledBadge $status={status} $size={size}>
      {content}
    </StyledBadge>
  );
};

export default Badge;
