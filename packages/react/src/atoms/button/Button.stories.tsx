import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'ghost'],
    },
    intent: {
      control: 'inline-radio',
      options: ['primary', 'success', 'danger', 'brand'],
    },
    children: {
      control: 'text',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    isDisabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'solid',
    intent: 'primary',
    size: 'md',
    children: 'Button',
    isLoading: false,
    isDisabled: false,
  },
  parameters: {
    controls: {
      exclude: ['fullWidth', 'aria-label', 'data-testid'],
    },
  },
};

export const Variant: Story = {
  ...Default,
  args: {
    variant: 'solid',
    children: 'Button',
  },
  parameters: {
    controls: {
      exclude: [
        'intent',
        'size',
        'fullWidth',
        'isDisabled',
        'isLoading',
        'aria-label',
        'data-testid',
      ],
    },
  },
};

export const Intent: Story = {
  ...Default,
  args: {
    intent: 'primary',
    children: 'Button',
  },
  parameters: {
    controls: {
      exclude: [
        'variant',
        'size',
        'fullWidth',
        'isDisabled',
        'isLoading',
        'aria-label',
        'data-testid',
      ],
    },
  },
};

export const Size: Story = {
  ...Default,
  args: {
    size: 'sm',
    children: 'Button',
  },
  parameters: {
    controls: {
      exclude: ['fullWidth', 'isDisabled', 'isLoading', 'aria-label', 'data-testid'],
    },
  },
};

export const FullWidth: Story = {
  ...Default,
  args: {
    fullWidth: true,
    children: 'Button',
  },
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['size', 'isDisabled', 'isLoading', 'aria-label', 'data-testid'],
    },
  },
};

export const Loading: Story = {
  ...Default,
  args: {
    isLoading: true,
    children: 'Button',
  },
  parameters: {
    controls: {
      exclude: ['size', 'fullWidth', 'isDisabled', 'aria-label', 'data-testid'],
    },
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    children: 'Button',
    isDisabled: true,
  },
  parameters: {
    controls: {
      exclude: [
        'children',
        'variant',
        'intent',
        'size',
        'fullWidth',
        'isLoading',
        'aria-label',
        'data-testid',
      ],
    },
  },
};
