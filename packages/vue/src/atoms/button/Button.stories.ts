
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '.'

const meta = {
    component: Button,
    title: 'Test/Button',
    tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type ButtonStory = StoryObj<typeof meta>

export const Default: ButtonStory = {
    args: {
        label: 'Vue button',
    },
}