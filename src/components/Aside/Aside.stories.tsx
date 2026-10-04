import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../Main/Main';
import { Column } from '../Column/Column';
import { Aside } from './Aside';
import { MultiParagraph, SingleParagraph } from '../../data/SampleContent';

const meta: Meta<typeof Aside> = {
    title: 'Components/Template Parts/Aside',
    component: Aside,
    tags: ['!autodocs'],
    argTypes: {
        topSpace: {
            control: { type: 'number', min: 0 },
        },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Aside>;

export const Default: Story = {
    args: {
        children: 'Aside HTML5 tag as component',
    },
};

export const RightSidebar: Story = {
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
            },
        },
    },
    render: () => (
        <Main>
            <Column cols="2/3" maxWidth="alignwide">
                <Column.Content isFirst>
                    <MultiParagraph count={4} />
                </Column.Content>
                <Aside>
                    <SingleParagraph />
                </Aside>
            </Column>
        </Main>
    ),
};

export const LeftSidebarSticky: Story = {
    args: {
        isSticky: true,
        topSpace: 16,
    },
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'landmark-complementary-is-top-level', enabled: false }],
            },
        },
        // An inline docs canvas never scrolls, so the story needs its own frame to show sticky
        docs: {
            story: {
                inline: false,
                height: '480px',
            },
        },
    },
    render: (args) => (
        <Main>
            <Column cols="1/3" maxWidth="alignwide">
                <Aside {...args}>
                    <nav aria-label="On this page">
                        <ul>
                            <li>
                                <a href="#introduction">Introduction</a>
                            </li>
                            <li>
                                <a href="#getting-started">Getting started</a>
                            </li>
                            <li>
                                <a href="#configuration">Configuration</a>
                            </li>
                        </ul>
                    </nav>
                </Aside>
                <Column.Content>
                    <h2 id="introduction">Introduction</h2>
                    <MultiParagraph count={3} />
                    <h2 id="getting-started">Getting started</h2>
                    <MultiParagraph count={3} />
                    <h2 id="configuration">Configuration</h2>
                    <MultiParagraph count={3} />
                </Column.Content>
            </Column>
        </Main>
    ),
};
