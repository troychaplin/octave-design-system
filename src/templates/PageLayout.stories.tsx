import type { Meta, StoryObj } from '@storybook/react-vite';

import { Main } from '../components/Main/Main';
import { Container } from '../components/Container/Container';
import { SiteHeader } from '../components/SiteHeader';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { SiteFooter } from '../components/SiteFooter';
import { SkipLink } from '../components/SkipLink';

const meta: Meta = {
    title: 'Overview/Templates',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

export const PageLayout: Story = {
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: false }],
            },
        },
    },
    render: () => (
        <>
            <SkipLink />
            <SiteHeader
                siteTitle="parlour.ui"
                siteTitleAccent="parlour"
                navItems={[
                    { href: '/about', label: 'About' },
                    { href: '/blog', label: 'Blog' },
                    { href: '/resume', label: 'Resume' },
                ]}
            >
                <ButtonGroup>
                    <Button text="Sponsor Me" href="/sponsor" isSmall isOutline />
                </ButtonGroup>
            </SiteHeader>

            <Main>
                <h2>Heading Two</h2>
                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>

                <Container
                    style={{
                        backgroundColor: 'var(--parlour--color-neutral-200)',
                        paddingBlock: 'var(--parlour--spacing-x-large)',
                    }}
                >
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container
                    contentWidth="alignwide"
                    maxWidth="alignwide"

                    style={{
                        backgroundColor: 'var(--parlour--color-white)',
                        paddingBlock: 'var(--parlour--spacing-x-large)',
                    }}
                >
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container
                    contentWidth="alignfull"
                    maxWidth="alignfull"
                    style={{
                        backgroundColor: 'var(--parlour--color-neutral-200)',
                        paddingBlock: 'var(--parlour--spacing-x-large)',
                    }}
                >
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>
            </Main>

            <SiteFooter
                name="Troy Chaplin"
                nameHref="/"
                text={
                    <>
                        Powered by <a href="/projects/octave">Octave Beta</a>, a WordPress block
                        theme
                    </>
                }
                github="https://github.com"
                x="https://x.com"
                bluesky="https://bsky.app"
                linkedin="https://www.linkedin.com"
            />
        </>
    ),
};
