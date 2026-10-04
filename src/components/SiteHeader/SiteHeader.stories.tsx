import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from './SiteHeader';
import { Button } from '../Button/Button';

const meta: Meta<typeof SiteHeader> = {
    title: 'Components/Template Parts/Site Header',
    component: SiteHeader,
    tags: ['!autodocs'],
    argTypes: {
        // Children are JSX, which the object control can only show as a raw React element
        children: {
            control: false,
        },
    },
    parameters: {
        layout: 'fullscreen',
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
    args: {
        siteTitleAccent: 'Octave',
    },
};

export const WithoutAccent: Story = {};

export const AccentAtTheEnd: Story = {
    args: {
        siteTitleAccent: 'Design System',
    },
};

export const WithExtraItem: Story = {
    args: {
        siteTitleAccent: 'Octave',
        children: <Button text="Search" href="/search" isSmall color="light" />,
    },
};
