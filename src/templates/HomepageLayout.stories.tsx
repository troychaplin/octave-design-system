import type { Meta, StoryObj } from '@storybook/react-vite';

import { Main } from '../components/Main/Main';
import { Container } from '../components/Container/Container';
import { SiteHeader } from '../components/SiteHeader/SiteHeader';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { Button } from '../components/Button/Button';

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
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
    render: () => (
        <>
            <SiteHeader siteTitle="Troy Chaplin" />

            <Main>
                <h1>Heading Two</h1>
                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>
                <p>
                    Most people start with an About page that introduces them to potential site
                    visitors. It might say something like this:
                </p>
                <ButtonGroup>
                    <Button text="Button One" href="#" />
                    <Button text="Button Two" href="#" />
                    <Button text="Button Three" href="#" isOutline />
                </ButtonGroup>
                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>
                <ButtonGroup>
                    <Button text="Button One" href="#" isSmall />
                    <Button text="Button Two" href="#" isSmall />
                    <Button text="Button Three" href="#" isSmall isOutline />
                </ButtonGroup>

                <Container color="white" maxWidth="alignfull">
                    <h2>White Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
                    <h2>Light Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="medium" maxWidth="alignfull">
                    <h2>Medium Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="dark" maxWidth="alignfull" contentWidth="alignwide">
                    <h2>Dark Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <h2>Heading Two</h2>
                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>
                <p>
                    Most people start with an About page that introduces them to potential site
                    visitors. It might say something like this:
                </p>

                <Container color="white" maxWidth="alignwide">
                    <h2>White Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="light" maxWidth="alignwide" contentWidth="alignwide">
                    <h2>Light Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="medium" maxWidth="alignwide">
                    <h2>Medium Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="dark" maxWidth="alignwide" contentWidth="alignwide">
                    <h2>Dark Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <h2>Heading Two</h2>
                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>
                <p>
                    Most people start with an About page that introduces them to potential site
                    visitors. It might say something like this:
                </p>

                <Container color="white">
                    <h2>White Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="light">
                    <h2>Light Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="medium">
                    <h2>Medium Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="dark">
                    <h2>Dark Container</h2>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <h2>Heading Two</h2>
                <p>
                    This is an example page. It is different from a blog post because it will stay
                    in one place and will show up in your site navigation (in most themes). Most
                    people start with an About page that introduces them to potential site visitors.
                    It might say something like this:
                </p>
                <p>
                    Most people start with an About page that introduces them to potential site
                    visitors. It might say something like this:
                </p>
            </Main>
        </>
    ),
};
