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
    buttonType: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'ghost'],
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'brand', 'success', 'destructive'],
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
    // onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Button {...args} />,
  args: {
    buttonType: 'contained',
    variant: 'primary',
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

export const Type: Story = {
  ...Default,
  args: {
    buttonType: 'contained',
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

export const Variant: Story = {
  ...Default,
  args: {
    variant: 'primary',
    children: 'Button',
  },
  parameters: {
    controls: {
      exclude: [
        'buttonType',
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
        'buttonType',
        'variant',
        'size',
        'fullWidth',
        'isLoading',
        'aria-label',
        'data-testid',
      ],
    },
  },
};

/**
 * All variants side by side — useful for visual comparison.
 */
// export const AllVariants: Story = {
//   render: () => (
//     <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//       <Button variant="primary" onPress={() => {}}>Primary</Button>
//       <Button variant="secondary" onPress={() => {}}>Secondary</Button>
//       <Button variant="danger" onPress={() => {}}>Danger</Button>
//       <Button variant="ghost" onPress={() => {}}>Ghost</Button>
//     </div>
//   ),
// };
