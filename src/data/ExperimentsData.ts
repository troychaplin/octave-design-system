import type { ProjectCardProps } from '../components/ProjectCard/ProjectCard';

// `id` is the data's own key, not the card's HTML id, so it replaces that prop's type here.
// Typing the array also keeps `icon` to the BrandIcon names rather than any string.
export interface ProjectItem extends Omit<ProjectCardProps, 'id'> {
    id: number;
}

export const ExperimentsData: ProjectItem[] = [
    {
        id: 1,
        title: 'Parlour UI',
        href: 'https://troychaplin.github.io/parlour-ui/',
        type: 'Component Library',
        icon: 'typescript',
        version: 'beta 0.1.0',
        description:
            'A zero-config bundler for WordPress plugin and theme assets, built on esbuild.',
        footer: 'browse the library',
    },
    {
        id: 2,
        title: 'component2block',
        href: 'https://github.com/troychaplin/component2block',
        type: 'Storybook.js Addon',
        icon: 'storybook',
        version: 'version 0.8.0',
        description:
            'An editorial block theme for writers. Quiet, restrained, theme.json all the way down.',
        footer: 'install via npm',
    },
    {
        id: 3,
        title: 'Template Parts Language Router',
        href: 'https://github.com/troychaplin/template-parts-language-router',
        type: 'Storybook.js Addon',
        icon: 'storybook',
        version: 'version 0.8.0',
        description:
            'A plugin to route template parts to the appropriate template file based on the current context. Supports WPML, Polylang, and WordPress locale.',
        footer: 'install via npm',
    },
];
