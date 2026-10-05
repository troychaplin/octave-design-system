import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';
import { Main } from '../Main/Main';
import { Container } from '../Container/Container';
import { GridGroup } from '../GridGroup/GridGroup';
import { ProjectData } from '../../data/ProjectData';
import { brandIcons } from '../BrandIcon/brandIcons';

const meta: Meta<typeof ProjectCard> = {
    title: 'Components/Cards/Project Card',
    component: ProjectCard,
    tags: ['!autodocs'],
    decorators: [
        (Story) => (
            <Main>
                <Story />
            </Main>
        ),
    ],
    argTypes: {
        icon: {
            control: 'select',
            options: Object.keys(brandIcons),
        },
        headingLevel: {
            control: 'inline-radio',
            options: ['h2', 'h3', 'h4'],
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
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
    args: {
        ...ProjectData[0],
    },
};

export const Grid: Story = {
    render: () => (
        <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
            <GridGroup>
                {ProjectData.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </GridGroup>
        </Container>
    ),
};

export const WithoutLink: Story = {
    args: {
        ...ProjectData[1],
        href: undefined,
    },
};

export const Minimal: Story = {
    args: {
        title: 'wp-bundle',
        description:
            'A zero-config bundler for WordPress plugin and theme assets, built on esbuild.',
    },
};
