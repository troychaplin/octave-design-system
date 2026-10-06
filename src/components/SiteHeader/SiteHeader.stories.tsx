import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from './SiteHeader';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';

const navItems = [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/resume', label: 'Resume' },
];

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
        navItems,
        children: (
            <ButtonGroup>
                <Button text="Sponsor Me" href="/sponsor" isSmall isOutline />
            </ButtonGroup>
        ),
    },
};

export const WithoutAccent: Story = {
    args: {
        navItems,
        children: (
            <ButtonGroup>
                <Button text="Sponsor Me" href="/sponsor" isSmall isOutline />
            </ButtonGroup>
        ),
    },
};

export const AccentAtTheEnd: Story = {
    args: {
        siteTitle: 'A palette cleanser for React and WordPress',
        siteTitleAccent: 'React and WordPress',
        navItems,
        children: (
            <ButtonGroup>
                <Button text="Sponsor Me" href="/sponsor" isSmall isOutline />
            </ButtonGroup>
        ),
    },
};

export const TwoButtons: Story = {
    args: {
        siteTitleAccent: 'Parlour',
        navItems,
        children: (
            <ButtonGroup>
                <Button text="Search" href="/search" isSmall color="light" />
                <Button text="Sponsor Me" href="/sponsor" isSmall isOutline />
            </ButtonGroup>
        ),
    },
};

export const TitleOnly: Story = {
    args: {
        siteTitleAccent: 'Parlour',
    },
};
