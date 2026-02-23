import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonGroup from './ButtonGroup';
// import type { ButtonGroupProps } from '@molecule-ui/types';
import type { ButtonGroupProps } from './ButtonGroup';

const meta = {
  title: 'Molecules/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type ButtonGroupStory = StoryObj<typeof meta>;

const storyActions: ButtonGroupProps['actions'] = [
  { label: 'Send', action: () => alert('One clicked.') },
  { label: 'Cancel', action: () => alert('Two clicked') },
];

export const Default: ButtonGroupStory = {
  render: (args) => <ButtonGroup {...args} />,
  args: {
    actions: storyActions,
  },
};
