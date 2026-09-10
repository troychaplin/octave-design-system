import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../Main/Main';
import { FlexGroup } from './FlexGroup';

const justifyOptions = ['start', 'center', 'end', 'space-between'] as const;
const alignOptions = ['start', 'center', 'end', 'stretch'] as const;
const gapOptions = ['none', 'x-small', 'normal', 'large', '3-x-large'] as const;
const spacingOptions = [
    'none',
    '3-x-small',
    '2-x-small',
    'x-small',
    'small',
    'normal',
    'medium',
    'large',
    'x-large',
    '2-x-large',
    '3-x-large',
    '4-x-large',
    '5-x-large',
] as const;

const Item = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            backgroundColor: 'var(--octave--color-neutral-100)',
            color: 'var(--octave--color-neutral-950)',
            padding: 'var(--octave--spacing-x-small) var(--octave--spacing-normal)',
            borderRadius: 'var(--octave--radius-sm)',
        }}
    >
        {children}
    </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <p style={{ margin: 0 }}>
        <code>{children}</code>
    </p>
);

const meta: Meta<typeof FlexGroup> = {
    title: 'Components/Layout/Flex Group',
    component: FlexGroup,
    tags: ['!autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['div', 'header', 'main', 'section', 'article', 'aside', 'footer'],
        },
        direction: {
            control: 'inline-radio',
            options: ['row', 'column'],
        },
        wrap: {
            control: 'inline-radio',
            options: ['wrap', 'nowrap'],
        },
        justify: {
            control: 'select',
            options: justifyOptions,
        },
        align: {
            control: 'select',
            options: alignOptions,
        },
        gap: {
            control: 'select',
            options: spacingOptions,
        },
        padding: {
            control: 'select',
            options: spacingOptions,
        },
        margin: {
            control: 'select',
            options: spacingOptions,
        },
        maxWidth: {
            control: 'select',
            options: ['alignsmall', 'aligncontent', 'alignwide', 'alignfull'],
        },
    },
    decorators: [
        (Story) => (
            <Main>
                <Story />
            </Main>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof FlexGroup>;

export const Default: Story = {
    args: {
        gap: 'normal',
    },
    render: (args) => (
        <FlexGroup {...args}>
            <Item>First</Item>
            <Item>Second</Item>
            <Item>Third</Item>
        </FlexGroup>
    ),
};

export const Row: Story = {
    render: () => (
        <FlexGroup gap="normal">
            <Item>First</Item>
            <Item>Second</Item>
            <Item>Third</Item>
        </FlexGroup>
    ),
};

export const Column: Story = {
    render: () => (
        <FlexGroup direction="column" gap="normal">
            <Item>First</Item>
            <Item>Second</Item>
            <Item>Third</Item>
        </FlexGroup>
    ),
};

export const NoWrap: Story = {
    render: () => (
        <FlexGroup direction="column" gap="large">
            <Label>wrap=&quot;wrap&quot; (default)</Label>
            <FlexGroup gap="normal">
                {Array.from({ length: 12 }, (_, i) => (
                    <Item key={i}>Item {i + 1}</Item>
                ))}
            </FlexGroup>
            <Label>wrap=&quot;nowrap&quot;</Label>
            <FlexGroup gap="normal" wrap="nowrap">
                {Array.from({ length: 12 }, (_, i) => (
                    <Item key={i}>Item {i + 1}</Item>
                ))}
            </FlexGroup>
        </FlexGroup>
    ),
};

export const JustifyInARow: Story = {
    render: () => (
        <FlexGroup direction="column" gap="large">
            {justifyOptions.map((value) => (
                <FlexGroup key={value} direction="column" gap="2-x-small">
                    <Label>justify=&quot;{value}&quot;</Label>
                    <FlexGroup justify={value} gap="normal" padding="x-small">
                        <Item>First</Item>
                        <Item>Second</Item>
                        <Item>Third</Item>
                    </FlexGroup>
                </FlexGroup>
            ))}
        </FlexGroup>
    ),
};

export const JustifyInAColumn: Story = {
    render: () => (
        <FlexGroup gap="large" align="stretch">
            {justifyOptions.map((value) => (
                <FlexGroup key={value} direction="column" gap="2-x-small">
                    <Label>justify=&quot;{value}&quot;</Label>
                    <FlexGroup
                        direction="column"
                        justify={value}
                        gap="normal"
                        padding="x-small"
                        style={{ height: '14rem' }}
                    >
                        <Item>First</Item>
                        <Item>Second</Item>
                    </FlexGroup>
                </FlexGroup>
            ))}
        </FlexGroup>
    ),
};

export const Align: Story = {
    render: () => (
        <FlexGroup direction="column" gap="large">
            {alignOptions.map((value) => (
                <FlexGroup key={value} direction="column" gap="2-x-small">
                    <Label>align=&quot;{value}&quot;</Label>
                    <FlexGroup
                        align={value}
                        gap="normal"
                        padding="x-small"
                        style={{ height: '7rem' }}
                    >
                        <Item>First</Item>
                        <Item>Second</Item>
                        <Item>Third</Item>
                    </FlexGroup>
                </FlexGroup>
            ))}
        </FlexGroup>
    ),
};

export const GapScale: Story = {
    render: () => (
        <FlexGroup direction="column" gap="large">
            {gapOptions.map((value) => (
                <FlexGroup key={value} direction="column" gap="2-x-small">
                    <Label>gap=&quot;{value}&quot;</Label>
                    <FlexGroup gap={value}>
                        <Item>First</Item>
                        <Item>Second</Item>
                        <Item>Third</Item>
                    </FlexGroup>
                </FlexGroup>
            ))}
        </FlexGroup>
    ),
};

export const PaddingAndMargin: Story = {
    render: () => (
        <FlexGroup direction="column" gap="none">
            <Label>padding=&quot;large&quot; margin=&quot;x-large&quot;</Label>
            <FlexGroup
                gap="normal"
                padding="large"
                margin="x-large"
                style={{ backgroundColor: 'var(--octave--color-neutral-50)' }}
            >
                <Item>First</Item>
                <Item>Second</Item>
                <Item>Third</Item>
            </FlexGroup>
            <Label>no padding or margin</Label>
            <FlexGroup gap="normal" style={{ backgroundColor: 'var(--octave--color-neutral-50)' }}>
                <Item>First</Item>
                <Item>Second</Item>
                <Item>Third</Item>
            </FlexGroup>
        </FlexGroup>
    ),
};

export const MaxWidth: Story = {
    render: () => (
        <FlexGroup direction="column" gap="large" maxWidth="alignfull">
            <FlexGroup gap="normal" justify="center" maxWidth="aligncontent" padding="x-small">
                <Item>aligncontent</Item>
            </FlexGroup>
            <FlexGroup gap="normal" justify="center" maxWidth="alignwide" padding="x-small">
                <Item>alignwide</Item>
            </FlexGroup>
            <FlexGroup gap="normal" justify="center" maxWidth="alignfull" padding="x-small">
                <Item>alignfull</Item>
            </FlexGroup>
        </FlexGroup>
    ),
};

export const AsElement: Story = {
    render: () => (
        <FlexGroup as="footer" gap="normal" justify="space-between" padding="normal">
            <Item>Left</Item>
            <Item>Right</Item>
        </FlexGroup>
    ),
};
