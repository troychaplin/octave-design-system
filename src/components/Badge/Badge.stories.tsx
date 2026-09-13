import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { borderRadiusClasses, colorClasses } from '../../utils/propClasses';

const meta: Meta<typeof Badge> = {
    title: 'Components/Elements/Badge',
    component: Badge,
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
        color: 'neutral-50',
        rounded: 'md',
    },
};

export const WithLink: Story = {
    args: {
        text: 'Badge',
        href: 'https://github.com/@troychaplin/octave-design-system',
        color: 'neutral-50',
        rounded: 'full',
    },
};

export const AllColors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.keys(colorClasses).map((color) => (
                <Badge key={color} text={color} />
            ))}
        </div>
    ),
};

export const AllRadii: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.keys(borderRadiusClasses).map((rounded) => (
                <Badge key={rounded} text={rounded} />
            ))}
        </div>
    ),
};
