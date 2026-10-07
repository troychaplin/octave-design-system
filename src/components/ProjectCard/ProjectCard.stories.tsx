import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';
import { Main } from '../Main/Main';
import { Container } from '../Container/Container';
import { GridGroup } from '../GridGroup/GridGroup';
import { ProjectData } from '../../data/ProjectData';
import { brandIcons } from '../BrandIcon/brandIcons';

const surfaceOptions = ['white', 'light', 'medium', 'dark'] as const;

// One card per background, cycling through the sample projects
const colorCards = surfaceOptions.map((surface, i) => ({
    surface,
    project: ProjectData[i % ProjectData.length],
}));

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
        backgroundColor: {
            control: 'select',
            options: surfaceOptions,
        },
        borderColor: {
            control: 'select',
            options: surfaceOptions,
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
        id: undefined,
    },
};

export const Grid: Story = {
    render: () => (
        <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
            <GridGroup>
                {ProjectData.map(({ id, ...project }) => (
                    <ProjectCard key={id} {...project} />
                ))}
            </GridGroup>
        </Container>
    ),
};

export const Colors: Story = {
    render: () => (
        <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
            <GridGroup columns={2}>
                {colorCards.map(({ surface, project: { id, ...project } }) => (
                    <ProjectCard
                        key={`${surface}-${id}`}
                        {...project}
                        backgroundColor={surface}
                        borderColor={surface}
                    />
                ))}
            </GridGroup>
        </Container>
    ),
};

export const WithoutLink: Story = {
    args: {
        ...ProjectData[1],
        id: undefined,
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
