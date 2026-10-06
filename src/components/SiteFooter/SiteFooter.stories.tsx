import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from './SiteFooter';

const meta: Meta<typeof SiteFooter> = {
    title: 'Components/Template Parts/Site Footer',
    component: SiteFooter,
    tags: ['!autodocs'],
    argTypes: {
        // JSX, which the object control can only show as a raw React element
        text: {
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
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
    args: {
        name: 'Troy Chaplin',
        nameHref: '/',
        text: (
            <>
                Powered by <a href="https://troychaplin.github.io/parlour-ui/">Parlour UI</a>, a
                React and WordPress cleanser
            </>
        ),
        github: 'https://github.com',
        wordpress: 'https://profiles.wordpress.org',
        x: 'https://x.com',
        bluesky: 'https://bsky.app',
        linkedin: 'https://www.linkedin.com',
    },
};

export const AllNetworks: Story = {
    args: {
        name: 'Troy Chaplin',
        nameHref: '/',
        github: 'https://github.com',
        wordpress: 'https://profiles.wordpress.org',
        x: 'https://x.com',
        bluesky: 'https://bsky.app',
        linkedin: 'https://www.linkedin.com',
        facebook: 'https://www.facebook.com',
        instagram: 'https://www.instagram.com',
        youtube: 'https://www.youtube.com',
        tiktok: 'https://www.tiktok.com',
    },
};

export const NameOnly: Story = {
    args: {
        name: 'Troy Chaplin',
    },
};
