import type { Meta, StoryObj } from '@storybook/react-vite';

import { Main } from '../components/Main/Main';
import { Container } from '../components/Container/Container';
import { SiteHeader } from '../components/SiteHeader/SiteHeader';
import { Hero } from '../components/Hero/Hero';
import { HeroHeader } from '../components/HeroHeader/HeroHeader';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { CodeBlock } from '../components/CodeBlock/CodeBlock';
import { CodeDataReact } from '../data/CodeData';

const meta: Meta = {
    title: 'Overview/Templates',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

export const WorkLayout: Story = {
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
    render: () => (
        <>
            <SiteHeader siteTitle="troychaplin.work" siteTitleAccent="troychaplin" />

            <Main>
                <Hero>
                    <div className="octave-hero__content">
                        <HeroHeader
                            prefix="Building for the open web."
                            title="Plugins, projects"
                            titleAccent="& open source contributions"
                        >
                            <ul className="octave-hero-header__stats">
                                <li>7 released plugins</li>
                                <li>5 experimental projects</li>
                                <li>3 active contributions</li>
                            </ul>
                        </HeroHeader>
                    </div>
                    <div className="octave-hero__code">
                        <CodeBlock code={CodeDataReact} color="medium" borderRadius="sm" />
                    </div>
                </Hero>

                <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
                    <SectionHeader prefix="Releases · Open source" title="Things I ship." />
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container>

                <Container color="dark" maxWidth="alignfull" contentWidth="alignwide">
                    <SectionHeader prefix="Section Prefix" title="Dark Container" />
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
