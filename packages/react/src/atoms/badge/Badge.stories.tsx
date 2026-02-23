import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  //   argTypes: {
  //     buttonType: {
  //       control: 'inline-radio',
  //       options: ['contained', 'outlined', 'ghost'],
  //     },
  //     variant: {
  //       control: 'inline-radio',
  //       options: ['primary', 'brand', 'success', 'destructive'],
  //     },
  //     children: {
  //       control: 'text',
  //     },
  //     size: {
  //       control: 'inline-radio',
  //       options: ['sm', 'md', 'lg'],
  //     },
  //     isLoading: {
  //       control: 'boolean',
  //     },
  //     isDisabled: { control: 'boolean' },
  //     fullWidth: { control: 'boolean' },
  //     // onPress: { action: 'pressed' },
  //   },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    status: 'primary',
    size: 'md',
    content: 'Weeee',
  },
  //   parameters: {
  //     controls: {
  //       exclude: ['fullWidth', 'aria-label', 'data-testid'],
  //     },
  //   },
};
