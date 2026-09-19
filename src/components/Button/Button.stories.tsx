import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { borderRadiusClasses, colorClasses } from '../../utils/propClasses';

const meta: Meta<typeof Button> = {
    title: 'Components/Elements/Button',
    component: Button,
    tags: ['!autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: Object.keys(colorClasses),
        },
        rounded: {
            control: 'inline-radio',
            options: Object.keys(borderRadiusClasses),
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
        color: 'accent-primary',
    },
};

export const Small: Story = {
    args: {
        text: 'Download',
        color: 'neutral-800',
        isSmall: true,
    },
};

export const FullWidth: Story = {
    args: {
        text: 'Submit',
        color: 'accent-primary',
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
            {Object.keys(colorClasses).map((color) => (
                <Button key={color} text={color} />
            ))}
        </div>
    ),
};
