import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertIcon, CheckIcon, CloseIcon } from '.';

const meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const allIcons = [
  { name: 'AlertIcon', Component: AlertIcon },
  { name: 'CheckIcon', Component: CheckIcon },
  { name: 'CloseIcon', Component: CloseIcon },
];

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '24px',
      }}
    >
      {allIcons.map(({ name, Component }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Component width={24} height={24} />
          <span style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <AlertIcon width={16} height={16} title="Small alert" />
      <AlertIcon width={24} height={24} title="Medium alert" />
      <AlertIcon width={32} height={32} title="Large alert" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <AlertIcon width={24} height={24} style={{ color: '#2563eb' }} />
      <AlertIcon width={24} height={24} style={{ color: '#16a34a' }} />
      <AlertIcon width={24} height={24} style={{ color: '#dc2626' }} />
    </div>
  ),
};
