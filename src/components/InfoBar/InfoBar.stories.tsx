import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoBar } from './InfoBar';

const meta: Meta<typeof InfoBar> = {
    title: 'Components/Template Parts/InfoBar',
    component: InfoBar,
    tags: ['!autodocs'],
    argTypes: {
        // The date control hands the story a timestamp number, not the Date this prop expects
        date: {
            control: false,
        },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof InfoBar>;

export const Default: Story = {};

export const FixedDate: Story = {
    args: {
        date: new Date(2026, 8, 26),
    },
};
