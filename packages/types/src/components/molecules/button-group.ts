type Action = {
    label: string;
    action: () => void;
}

export type ButtonGroupProps = {
    actions: Action[];
}