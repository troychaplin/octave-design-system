import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Main } from '../Main/Main';
import { Container } from '../Container/Container';
import { GridGroup } from '../GridGroup/GridGroup';
import { SingleParagraph } from '../../data/SampleContent';
import { borderRadiusClasses, spacingClasses } from '../../utils/propClasses';

const surfaceOptions = ['white', 'light', 'medium', 'dark'] as const;
const radiusOptions = Object.keys(borderRadiusClasses);
const spacingOptions = Object.keys(spacingClasses);

const meta: Meta<typeof Card> = {
    title: 'Components/Content/Card',
    component: Card,
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
        as: {
            control: 'select',
            options: ['div', 'article', 'li'],
        },
        backgroundColor: {
            control: 'select',
            options: surfaceOptions,
        },
        borderColor: {
            control: 'select',
            options: surfaceOptions,
        },
        borderRadius: {
            control: 'select',
            options: radiusOptions,
        },
        paddingInline: {
            control: 'select',
            options: spacingOptions,
        },
        paddingBlock: {
            control: 'select',
            options: spacingOptions,
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: <SingleParagraph />,
    },
};

export const WithoutBorder: Story = {
    args: {
        border: false,
        children: <SingleParagraph />,
    },
};

export const Padding: Story = {
    args: {
        paddingInline: 'x-large',
        paddingBlock: 'small',
        children: <SingleParagraph />,
    },
};

export const Rounded: Story = {
    args: {
        borderRadius: 'lg',
        children: <SingleParagraph />,
    },
};

export const Colors: Story = {
    render: () => (
        <GridGroup columns={2} maxWidth="alignwide">
            {surfaceOptions.map((surface) => (
                <Card key={surface} backgroundColor={surface}>
                    <p>backgroundColor=&quot;{surface}&quot;</p>
                </Card>
            ))}
        </GridGroup>
    ),
};

export const InDarkContainer: Story = {
    args: {
        children: (
            <>
                <h2>Card title</h2>
                <SingleParagraph />
            </>
        ),
    },
    render: (args) => (
        <Container color="dark" maxWidth="alignfull" contentWidth="alignwide">
            <Card {...args} />
        </Container>
    ),
};
