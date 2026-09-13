import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

const alignOptions = ['start', 'center', 'end'] as const;

const meta: Meta<typeof ButtonGroup> = {
    title: 'Components/Elements/Button Group',
    component: ButtonGroup,
    tags: ['!autodocs'],
    argTypes: {
        align: {
            control: 'inline-radio',
            options: alignOptions,
        },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
    render: (args) => (
        <ButtonGroup {...args}>
            <Button title="Primary" />
            <Button title="Dark" color="dark" />
            <Button title="Neutral" color="neutral" />
        </ButtonGroup>
    ),
};

export const Centered: Story = {
    args: {
        align: 'center',
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button title="Primary" />
            <Button title="Dark" color="dark" />
            <Button title="Neutral" color="neutral" />
        </ButtonGroup>
    ),
};

export const End: Story = {
    args: {
        align: 'end',
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button title="Cancel" color="neutral" />
            <Button title="Submit" color="primary" />
        </ButtonGroup>
    ),
};
