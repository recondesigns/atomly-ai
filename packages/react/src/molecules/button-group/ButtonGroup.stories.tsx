import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonGroup from './ButtonGroup';

const meta = {
  title: 'Molecules/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type ButtonGroupStory = StoryObj<typeof meta>;

export const Default: ButtonGroupStory = {
  render: (args) => <ButtonGroup {...args} />,
  //   args: {
  //     label: 'Click me',
  //   },
};
