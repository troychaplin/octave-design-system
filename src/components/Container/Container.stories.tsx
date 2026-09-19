import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../Main/Main';
import { Container } from './Container';
import { colorClasses } from '../../utils/propClasses';
import { MultiParagraph } from '../../data/SampleContent';

const meta: Meta<typeof Container> = {
    title: 'Components/Layout/Container',
    component: Container,
    tags: ['!autodocs'],
    argTypes: {
        as: {
            control: 'inline-radio',
            options: ['section', 'div'],
        },
        maxWidth: {
            control: 'select',
            options: ['aligncontent', 'alignwide', 'alignfull'],
        },
        contentWidth: {
            control: 'select',
            options: ['aligncontent', 'alignwide', 'alignfull'],
        },
        color: {
            control: 'select',
            options: Object.keys(colorClasses),
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
type Story = StoryObj<typeof Container>;

export const Default: Story = {
    render: (args) => (
        <Main>
            <Container {...args}>
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const Grey: Story = {
    render: () => (
        <Main>
            <Container>
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const Black: Story = {
    render: () => (
        <Main>
            <Container>
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const LightGradient: Story = {
    render: () => (
        <Main>
            <Container>
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const Wide: Story = {
    render: () => (
        <Main>
            <Container maxWidth="alignwide">
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const FullWidth: Story = {
    render: () => (
        <Main>
            <Container maxWidth="alignfull">
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const FullWidthConstrained: Story = {
    render: () => (
        <Main>
            <Container maxWidth="alignfull" contentWidth="aligncontent">
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const FullWidthConstrainedWide: Story = {
    render: () => (
        <Main>
            <Container maxWidth="alignfull" contentWidth="alignwide">
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const AlternatingGreyContainers: Story = {
    render: () => (
        <Main>
            <Container>
                <MultiParagraph count={2} />
            </Container>
            <Container>
                <MultiParagraph count={2} />
            </Container>
            <Container>
                <MultiParagraph count={2} />
            </Container>
            <Container>
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};

export const WithInlineStyles: Story = {
    render: () => (
        <Main>
            <Container
                style={{
                    backgroundColor: 'var(--octave--color-neutral-200)',
                    paddingBlock: 'var(--octave--spacing-large)',
                }}
            >
                <MultiParagraph count={2} />
            </Container>
        </Main>
    ),
};
