import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroHeader } from './HeroHeader';
import { Main } from '../Main/Main';
import { Container } from '../Container/Container';
import { SingleParagraph } from '../../data/SampleContent';

const stats = (
    <ul className="octave-hero-header__stats">
        <li>7 released plugins</li>
        <li>5 experimental projects</li>
        <li>3 active contributions</li>
    </ul>
);

const meta: Meta<typeof HeroHeader> = {
    title: 'Components/Content/Hero Header',
    component: HeroHeader,
    tags: ['!autodocs'],
    decorators: [
        (Story) => (
            <Main>
                <Story />
            </Main>
        ),
    ],
    argTypes: {
        // Children are JSX, which the object control can only show as a raw React element
        children: {
            control: false,
        },
        level: {
            control: 'inline-radio',
            options: [1, 2, 3],
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
type Story = StoryObj<typeof HeroHeader>;

export const Default: Story = {
    args: {
        prefix: 'Section Prefix',
        title: 'Section Title',
        titleAccent: 'Highlight',
        children: stats,
    },
};

export const TitleOnly: Story = {
    args: {
        title: 'Section Title',
    },
};

export const WithParagraph: Story = {
    args: {
        prefix: 'Section Prefix',
        title: 'Section Title',
        children: <SingleParagraph />,
    },
};

export const InLightContainer: Story = {
    args: {
        prefix: 'Section Prefix',
        title: 'Section Title',
        titleAccent: 'Highlight',
        children: stats,
    },
    render: (args) => (
        <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
            <HeroHeader {...args} />
        </Container>
    ),
};

export const InMediumContainer: Story = {
    args: {
        prefix: 'Section Prefix',
        title: 'Section Title',
        titleAccent: 'Highlight',
        children: stats,
    },
    render: (args) => (
        <Container color="medium" maxWidth="alignfull" contentWidth="alignwide">
            <HeroHeader {...args} />
        </Container>
    ),
};

export const InDarkContainer: Story = {
    args: {
        prefix: 'Section Prefix',
        title: 'Section Title',
        titleAccent: 'Highlight',
        children: stats,
    },
    render: (args) => (
        <Container color="dark" maxWidth="alignfull" contentWidth="alignwide">
            <HeroHeader {...args} />
        </Container>
    ),
};
