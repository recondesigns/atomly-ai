import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Button } from '.';

const meta = {
  component: Button,
  title: 'Test/Button',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wv7I1q5SbuPS4vozGd1gmR/Component-library?node-id=15-116&m=dev',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type ButtonStory = StoryObj<typeof meta>;

export const Default: ButtonStory = {
  args: {
    label: 'Vue button',
  },
};
