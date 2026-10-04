import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GridGroup } from './GridGroup';
import { Card } from '../Card/Card';
import { Main } from '../Main/Main';
import { SingleParagraph } from '../../data/SampleContent';
import { elementClasses, maxWidthClasses, spacingClasses } from '../../utils/propClasses';

const columnOptions = [1, 2, 3] as const;
const alignOptions = ['start', 'center', 'end', 'stretch'] as const;
const spacingOptions = Object.keys(spacingClasses);

const cards = (count: number, as?: 'li') =>
    Array.from({ length: count }, (_, i) => (
        <Card key={i} as={as}>
            <SingleParagraph index={i} />
        </Card>
    ));

const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="alignwide" style={{ marginBottom: 'var(--parlour--spacing-x-small)' }}>
        <code>{children}</code>
    </p>
);

const meta: Meta<typeof GridGroup> = {
    title: 'Components/Layout/Grid Group',
    component: GridGroup,
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
            options: Object.keys(elementClasses),
        },
        columns: {
            control: 'inline-radio',
            options: columnOptions,
        },
        gap: {
            control: 'select',
            options: spacingOptions,
        },
        rowGap: {
            control: 'select',
            options: spacingOptions,
        },
        align: {
            control: 'inline-radio',
            options: alignOptions,
        },
        maxWidth: {
            control: 'select',
            options: Object.keys(maxWidthClasses),
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
type Story = StoryObj<typeof GridGroup>;

export const Default: Story = {
    args: {
        maxWidth: 'alignwide',
        children: cards(3),
    },
};

export const ColumnCounts: Story = {
    render: () => (
        <>
            {([2, 3] as const).map((columns) => (
                <Fragment key={columns}>
                    <Label>columns={columns}</Label>
                    <GridGroup columns={columns} maxWidth="alignwide">
                        {cards(columns)}
                    </GridGroup>
                </Fragment>
            ))}
        </>
    ),
};

export const AsList: Story = {
    args: {
        as: 'ul',
        maxWidth: 'alignwide',
        children: cards(3, 'li'),
    },
};
