import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Label',
    variant: 'filled',
    intent: 'neutral',
    size: 'md',
    isDisabled: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['filled', 'outlined', 'ghost'],
    },
    intent: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'success', 'danger', 'warning'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip variant="filled">Filled</Chip>
      <Chip variant="outlined">Outlined</Chip>
      <Chip variant="ghost">Ghost</Chip>
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip intent="neutral">Neutral</Chip>
      <Chip intent="primary">Primary</Chip>
      <Chip intent="success">Success</Chip>
      <Chip intent="danger">Danger</Chip>
      <Chip intent="warning">Warning</Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const AllVariantsAndIntents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(['filled', 'outlined', 'ghost'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['neutral', 'primary', 'success', 'danger', 'warning'] as const).map((intent) => (
            <Chip key={intent} variant={variant} intent={intent}>
              {intent}
            </Chip>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip variant="filled" isDisabled>
        Filled
      </Chip>
      <Chip variant="outlined" isDisabled>
        Outlined
      </Chip>
      <Chip variant="ghost" isDisabled>
        Ghost
      </Chip>
    </div>
  ),
};
