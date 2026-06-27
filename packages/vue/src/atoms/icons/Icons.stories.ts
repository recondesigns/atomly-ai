import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, h } from 'vue';
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
  { name: 'AlertIcon', component: AlertIcon },
  { name: 'CheckIcon', component: CheckIcon },
  { name: 'CloseIcon', component: CloseIcon },
];

export const AllIcons: Story = {
  render: () =>
    defineComponent({
      setup() {
        return () =>
          h(
            'div',
            {
              style:
                'display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:24px',
            },
            allIcons.map(({ name, component }) =>
              h(
                'div',
                {
                  key: name,
                  style: 'display:flex;flex-direction:column;align-items:center;gap:8px',
                },
                [
                  h(component, { width: 24, height: 24 }),
                  h('span', { style: 'font-size:11px;color:#6b7280;text-align:center' }, name),
                ]
              )
            )
          );
      },
    }),
};

export const Sizes: Story = {
  render: () =>
    defineComponent({
      setup() {
        return () =>
          h('div', { style: 'display:flex;align-items:center;gap:24px' }, [
            h(AlertIcon, { width: 16, height: 16 }),
            h(AlertIcon, { width: 24, height: 24 }),
            h(AlertIcon, { width: 32, height: 32 }),
          ]);
      },
    }),
};

export const Colors: Story = {
  render: () =>
    defineComponent({
      setup() {
        return () =>
          h('div', { style: 'display:flex;align-items:center;gap:24px' }, [
            h(AlertIcon, { width: 24, height: 24, style: 'color:#2563eb' }),
            h(AlertIcon, { width: 24, height: 24, style: 'color:#16a34a' }),
            h(AlertIcon, { width: 24, height: 24, style: 'color:#dc2626' }),
          ]);
      },
    }),
};
