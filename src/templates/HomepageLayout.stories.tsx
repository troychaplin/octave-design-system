import type { Meta, StoryObj } from '@storybook/react-vite';

import { Main } from '../components/Main/Main';
import { Container } from '../components/Container/Container';
import { SiteHeader } from '../components/SiteHeader';

const meta: Meta = {
    title: 'Overview/Templates',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

export const HomepageLayout: Story = {
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: false }],
            },
        },
    },
    render: () => (
        <>
            <SiteHeader />
            {/* <SiteHeader>
                <FlexGroup gap="normal" maxWidth="alignfull" justify="space-between">
                    <div>
                        <p>
                            <LinkComponent href="/">Troy Chaplin</LinkComponent>
                        </p>
                    </div>
                    <div>Meh</div>
                    <div>Pfft</div>
                </FlexGroup>
            </SiteHeader> */}

            <Main>
                <Container color="neutral-200">
                    <h2>Heading Two</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container
                    style={{
                        backgroundColor: 'var(--octave--color-neutral-50)',
                        paddingBlock: 'var(--octave--spacing-x-large)',
                    }}
                >
                    <h2>Heading Two</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container
                    style={{
                        backgroundColor: 'var(--octave--color-neutral-200)',
                        paddingBlock: 'var(--octave--spacing-x-large)',
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
                        backgroundColor: 'var(--octave--color-white)',
                        paddingBlock: 'var(--octave--spacing-x-large)',
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
                        backgroundColor: 'var(--octave--color-neutral-200)',
                        paddingBlock: 'var(--octave--spacing-x-large)',
                    }}
                >
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>
            </Main>
        </>
    ),
};
