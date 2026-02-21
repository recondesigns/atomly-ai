import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type ButtonStory = StoryObj<typeof meta>;

export const Default: ButtonStory = {
  render: (args) => <Button {...args} />,
  args: {
    label: 'Click me',
    onClick: () => alert('Clicked'),
  },
};
