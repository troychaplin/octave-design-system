import type { Meta, StoryObj } from '@storybook/react-vite';

import { Main } from '../components/Main/Main';
import { Container } from '../components/Container/Container';
import { SkipLink } from '../components/SkipLink';
import { SiteHeader } from '../components/SiteHeader/SiteHeader';
import { SiteFooter } from '../components/SiteFooter/SiteFooter';
import { InfoBar } from '../components/InfoBar/InfoBar';
import { Hero } from '../components/Hero/Hero';
import { HeroHeader } from '../components/HeroHeader/HeroHeader';
import { SectionHeader } from '../components/SectionHeader/SectionHeader';
import { GridGroup } from '../components/GridGroup/GridGroup';
import { ProjectCard } from '../components/ProjectCard/ProjectCard';
import { CodeBlock } from '../components/CodeBlock/CodeBlock';
import { CodeDataReact } from '../data/CodeData';
import { ProjectData } from '../data/ProjectData';

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
            <SkipLink />
            <SiteHeader siteTitle="troychaplin.work" siteTitleAccent="troychaplin" />
            <InfoBar />

            <Main hasPadding={false}>
                <Container color="pale" maxWidth="alignfull" contentWidth="alignwide">
                    <Hero>
                        <div className="parlour-hero__content">
                            <HeroHeader
                                prefix="Building for the open web."
                                title="Plugins, projects"
                                titleAccent="& open source contributions"
                            >
                                <ul className="parlour-hero-header__stats">
                                    <li>7 released plugins</li>
                                    <li>5 experimental projects</li>
                                    <li>3 active contributions</li>
                                </ul>
                            </HeroHeader>
                        </div>
                        <div className="parlour-hero__code">
                            <CodeBlock code={CodeDataReact} color="medium" borderRadius="sm" />
                        </div>
                    </Hero>
                </Container>

                <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
                    <SectionHeader prefix="Releases · Open source" title="Things I ship." />
                    <GridGroup>
                        {ProjectData.map((project) => (
                            <ProjectCard key={project.title} {...project} />
                        ))}
                    </GridGroup>
                </Container>

                {/* <Container color="dark" maxWidth="alignfull" contentWidth="alignwide">
                    <SectionHeader prefix="Section Prefix" title="Dark Container" />
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </Container> */}
            </Main>

            <SiteFooter
                name="Troy Chaplin"
                nameHref="/"
                text={
                    <>
                        Powered by{' '}
                        <a href="https://troychaplin.github.io/parlour-ui/">Parlour UI</a>, a React
                        and WordPress framework
                    </>
                }
                github="https://github.com"
                wordpress="https://profiles.wordpress.org/areziaal"
                x="https://x.com"
                bluesky="https://bsky.app"
                linkedin="https://www.linkedin.com"
            />
        </>
    ),
};
