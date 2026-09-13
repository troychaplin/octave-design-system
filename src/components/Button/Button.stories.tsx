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
        title: 'Primary',
        color: 'primary',
    },
};

export const Small: Story = {
    args: {
        title: 'Download',
        color: 'dark',
        isSmall: true,
    },
};

export const FullWidth: Story = {
    args: {
        title: 'Submit',
        color: 'primary',
        isFull: true,
    },
};

export const Disabled: Story = {
    args: {
        title: 'Unavailable',
        isDisabled: true,
    },
};

export const AllColors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {colorOptions.map((color) => (
                <Button key={color} title={color} color={color} />
            ))}
        </div>
    ),
};
