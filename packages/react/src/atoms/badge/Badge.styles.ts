import styled from "@emotion/styled";
import type { BadgeStatus, BadgeSize } from "@molecule-ui/types";

const sizeStyles: Record<BadgeSize, {
    padding: string;
}> = {
    sm: {
        padding: '4px 8px'
    },
    md: {
        padding: '8px 12px'
    },
    lg: {
        padding: '12px 16px'
    }
}

const statusColors: Record<BadgeStatus, { background: string; border: string; text: string }> = {
    default: { background: '#EFF6FF', border: '#2563EB', text: '#FFFFFF' },
    primary: { background: '#EFF6FF', border: '#2563EB', text: '#FFFFFF' },
    success: { background: '#F0FDF4', border: '#00A63E', text: '#FFFFFF' },
    error: { background: '#FEF2F2', border: '#DC2626', text: '#FFFFFF' },
    info: { background: '#EFF6FF', border: '#2563EB', text: '#FFFFFF' },
};

const StyledBadge = styled.span<{
    $status: BadgeStatus;
    $size: BadgeSize;
}>(({ theme, $status, $size }) => {
    const status = statusColors[$status];
    const size = sizeStyles[$size];

    return {
        fontFamily: theme?.typography?.fontFamily ?? 'inherit',
        backgroundColor: status.background,
        // border: `1px solid ${status.border}`,
        border: 'none',
        color: theme ? theme.colors.primary : status.text,
        padding: size.padding,
        borderRadius: '6px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        cursor: 'default',
        lineHeight: '1.25',
    };
});

export default StyledBadge