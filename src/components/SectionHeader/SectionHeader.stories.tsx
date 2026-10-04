import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';
import { Main } from '../Main/Main';
import { Container } from '../Container/Container';

const meta: Meta<typeof SectionHeader> = {
    title: 'Components/Content/Section Header',
    component: SectionHeader,
    tags: ['!autodocs'],
    decorators: [
        (Story) => (
            <Main>
                <Story />
            </Main>
        ),
    ],
    argTypes: {
        level: {
            control: 'inline-radio',
            options: [2, 3, 4],
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
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
    args: {
        prefix: 'Releases · Open source',
        title: 'Things I ship.',
    },
};

export const TitleOnly: Story = {
    args: {
        title: 'Things I ship.',
    },
};

export const InLightContainer: Story = {
    args: {
        prefix: 'Releases · Open source',
        title: 'Things I ship.',
    },
    render: (args) => (
        <Container color="light" maxWidth="alignfull" contentWidth="alignwide">
            <SectionHeader {...args} />
        </Container>
    ),
};

export const InMediumContainer: Story = {
    args: {
        prefix: 'Releases · Open source',
        title: 'Things I ship.',
    },
    render: (args) => (
        <Container color="medium" maxWidth="alignfull" contentWidth="alignwide">
            <SectionHeader {...args} />
        </Container>
    ),
};

export const InDarkContainer: Story = {
    args: {
        prefix: 'Releases · Open source',
        title: 'Things I ship.',
    },
    render: (args) => (
        <Container color="dark" maxWidth="alignfull" contentWidth="alignwide">
            <SectionHeader {...args} />
        </Container>
    ),
};
