import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
    title: 'Components/Template Parts/Hero',
    component: Hero,
    tags: ['!autodocs'],
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
    args: {},
};
