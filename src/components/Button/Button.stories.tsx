import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Elements/Button',
    component: Button,
    tags: ['!autodocs'],
    argTypes: {
        color: {
            control: 'select',
        },
        rounded: {
            control: 'inline-radio',
        },
        type: {
            control: 'inline-radio',
            options: ['button', 'submit', 'reset'],
            table: {
                type: { summary: '"button" | "submit" | "reset"' },
                defaultValue: { summary: '"button"' },
            },
        },
        disabled: {
            control: 'boolean',
            table: { type: { summary: 'boolean' } },
        },
        onClick: { action: 'clicked' },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        text: 'Dark Button',
        color: 'dark',
    },
};

export const Small: Story = {
    args: {
        text: 'Small Size',
        color: 'medium',
        isSmall: true,
    },
};

export const WithLink: Story = {
    args: {
        color: 'light',
        text: 'View on GitHub',
        href: 'https://github.com/troychaplin/octave-design-system',
    },
};

export const Disabled: Story = {
    args: {
        text: 'Unavailable',
        disabled: true,
    },
};
