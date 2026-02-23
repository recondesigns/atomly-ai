import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

/**
 * Button stories — demonstrates all variants, sizes, and states.
 *
 * Each export below is a "story" — a specific configuration of the
 * component. Storybook renders them as interactive examples.
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'brand', 'success', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ----- Individual stories -----

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'md',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'md',
  },
};

export const Brand: Story = {
  args: {
    children: 'Brand',
    variant: 'brand',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'md',
    isDisabled: true,
  },
};

// export const Ghost: Story = {
//   args: {
//     children: 'Cancel',
//     variant: 'ghost',
//     size: 'md',
//   },
// };

// export const Small: Story = {
//   args: {
//     children: 'Small',
//     size: 'sm',
//   },
// };

// export const Large: Story = {
//   args: {
//     children: 'Large Button',
//     size: 'lg',
//   },
// };

// export const Disabled: Story = {
//   args: {
//     children: 'Disabled',
//     isDisabled: true,
//   },
// };

// export const FullWidth: Story = {
//   args: {
//     children: 'Full Width Button',
//     fullWidth: true,
//   },
// };

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

/**
 * All sizes side by side.
 */
// export const AllSizes: Story = {
//   render: () => (
//     <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//       <Button size="sm" onPress={() => {}}>Small</Button>
//       <Button size="md" onPress={() => {}}>Medium</Button>
//       <Button size="lg" onPress={() => {}}>Large</Button>
//     </div>
//   ),
// };

// import type { Meta, StoryObj } from '@storybook/react-vite';
// import Button from './Button';

// const meta = {
//   title: 'Atoms/Button',
//   component: Button,
//   tags: ['autodocs'],
// } satisfies Meta<typeof Button>;

// export default meta;

// type ButtonStory = StoryObj<typeof meta>;

// export const Default: ButtonStory = {
//   render: (args) => <Button {...args} />,
//   args: {
//     label: 'Click me',
//     onClick: () => alert('Clicked'),
//   },
// };
