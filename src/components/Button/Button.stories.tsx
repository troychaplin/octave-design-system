import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const colorOptions = ['primary', 'secondary', 'neutral', 'dark', 'light'] as const;

const meta: Meta<typeof Button> = {
    title: 'Components/Elements/Button',
    component: Button,
    tags: ['!autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: colorOptions,
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
        text: 'Primary',
        color: 'primary',
    },
};

export const Small: Story = {
    args: {
        text: 'Download',
        color: 'dark',
        isSmall: true,
    },
};

export const FullWidth: Story = {
    args: {
        text: 'Submit',
        color: 'primary',
        isFull: true,
    },
};

export const Disabled: Story = {
    args: {
        text: 'Unavailable',
        disabled: true,
    },
};

export const WithLink: Story = {
    args: {
        text: 'View on GitHub',
        href: 'https://github.com/troychaplin/octave-design-system',
    },
};

export const AllColors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {colorOptions.map((color) => (
                <Button key={color} text={color} color={color} />
            ))}
        </div>
    ),
};
