import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    intent: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'success', 'danger', 'brand', 'warning'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    content: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    intent: 'neutral',
    size: 'md',
    content: 'Badge',
  },
};

export const Intent: Story = {
  ...Default,
  args: {
    intent: 'primary',
    content: 'Badge',
  },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};

export const Size: Story = {
  ...Default,
  args: {
    size: 'sm',
    content: 'Badge',
  },
  parameters: {
    controls: {
      exclude: ['intent'],
    },
  },
};
