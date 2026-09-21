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
            <Button text="Dark" />
            <Button text="Neutral" color="medium" />
            <Button text="Light" color="light" />
        </ButtonGroup>
    ),
};

export const Centered: Story = {
    args: {
        align: 'center',
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button text="Dark" />
            <Button text="Neutral" color="medium" />
            <Button text="Light" color="light" />
        </ButtonGroup>
    ),
};

export const End: Story = {
    args: {
        align: 'end',
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button text="Dark" />
            <Button text="Neutral" color="medium" />
            <Button text="Light" color="light" />
        </ButtonGroup>
    ),
};
