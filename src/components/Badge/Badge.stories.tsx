import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const colorOptions = [
    'grey',
    'white',
    'black80',
    'white80',
    'green',
    'red',
    'yellow',
    'blue',
    'purple',
    'teal',
] as const;

const radiusOptions = ['sm', 'md', 'lg', 'full', 'none'] as const;

const meta: Meta<typeof Badge> = {
    title: 'Components/Elements/Badge',
    component: Badge,
    tags: ['!autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: colorOptions,
        },
        rounded: {
            control: 'inline-radio',
            options: radiusOptions,
        },
        href: {
            control: 'text',
        },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        text: 'Badge',
        color: 'grey',
        rounded: 'md',
    },
};

export const WithLink: Story = {
    args: {
        text: 'Badge',
        href: 'https://github.com/@troychaplin/octave-design-system',
        color: 'grey',
        rounded: 'full',
    },
};

export const AllColors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {colorOptions.map((color) => (
                <Badge key={color} text={color} color={color} />
            ))}
        </div>
    ),
};

export const AllRadii: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {radiusOptions.map((rounded) => (
                <Badge key={rounded} text={rounded} rounded={rounded} />
            ))}
        </div>
    ),
};
