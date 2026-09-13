import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { BadgeGroup } from './BadgeGroup';

const meta: Meta<typeof BadgeGroup> = {
    title: 'Components/Elements/Badge Group',
    component: BadgeGroup,
    tags: ['!autodocs'],
    argTypes: {
        top: { control: { type: 'number', min: 0 } },
        right: { control: { type: 'number', min: 0 } },
        bottom: { control: { type: 'number', min: 0 } },
        left: { control: { type: 'number', min: 0 } },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof BadgeGroup>;

export const Default: Story = {
    render: (args) => (
        <BadgeGroup {...args}>
            <Badge text="Neutral" />
            <Badge text="Info" />
            <Badge text="Success" />
            <Badge text="Warning" />
            <Badge text="Error" />
        </BadgeGroup>
    ),
};
