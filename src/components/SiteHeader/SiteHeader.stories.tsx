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
        siteTitleAccent: 'Parlour',
    },
};

export const WithoutAccent: Story = {};

export const AccentAtTheEnd: Story = {
    args: {
        siteTitle: 'A palette cleanser for React and WordPress',
        siteTitleAccent: 'React and WordPress',
    },
};

export const WithExtraItem: Story = {
    args: {
        siteTitleAccent: 'Parlour',
        children: <Button text="Search" href="/search" isSmall color="light" />,
    },
};
