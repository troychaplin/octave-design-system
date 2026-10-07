import type { ProjectCardProps } from '../components/ProjectCard/ProjectCard';

// `id` is the data's own key, not the card's HTML id, so it replaces that prop's type here.
// Typing the array also keeps `icon` to the BrandIcon names rather than any string.
export interface ProjectItem extends Omit<ProjectCardProps, 'id'> {
    id: number;
}

export const ProjectData: ProjectItem[] = [
    {
        id: 1,
        title: 'Block Accessibility Checks',
        href: 'https://wordpress.org/plugins/block-accessibility-checks/',
        type: 'WordPress Plugin',
        icon: 'wordpress',
        version: 'version 4.2.2',
        description: 'A WordPress plugin that checks the accessibility of blocks.',
        footer: 'download it here',
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
        title: 'Veils of Fate',
        href: 'https://veilsoffate.com',
        type: 'Interactive Story',
        icon: 'wordpress',
        version: 'beta 1.0',
        description:
            'The heroes of Eldermoor were never what they seemed. The gem chose you to learn the truth.',
        footer: 'play it here',
    },
    {
        id: 4,
        title: 'Comma Sense — Sync CSV to Table',
        href: 'https://wordpress.org/plugins/comma-sense/',
        type: 'WordPress Plugin',
        icon: 'wordpress',
        version: 'version 1.0.0',
        description:
            'Hand-building tables cell by cell is the final boss nobody asked for. Comma Sense plugs a CSV from your site into a core table block.',
        footer: 'download it here',
    },
    {
        id: 5,
        title: 'Planned Outage',
        href: 'https://wordpress.org/plugins/planned-outage/',
        type: 'WordPress Plugin',
        icon: 'wordpress',
        version: 'version 1.4.0',
        description:
            'Simple maintenance mode for block themes. Shows a maintenance template to logged-out visitors while allowing logged-in users to browse normally.',
        footer: 'download it here',
    },
    {
        id: 6,
        title: 'Priority Plus Navigation',
        href: 'https://wordpress.org/plugins/priority-plus-navigation/',
        type: 'WordPress Plugin',
        icon: 'wordpress',
        version: 'version 1.1.0',
        description:
            'A WordPress block plugin that adds Priority Plus pattern functionality to core WordPress navigation block.',
        footer: 'download it here',
    },
];
