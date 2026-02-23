import type { BadgeProps as BadgePropsType } from "@molecule-ui/types";

export type BadgeProps = {
    status?: BadgePropsType['status'];
    size?: BadgePropsType['size'];
    content: string;
    className?: string;
    testId?: string;
}