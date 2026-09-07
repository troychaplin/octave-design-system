import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../Main/Main';
import { Column } from './Column';
import { MultiParagraph } from '../../data/storyContent';

const meta: Meta<typeof Column> = {
    title: 'Components/Layout/Column',
    component: Column,
    tags: ['!autodocs'],
    argTypes: {
        cols: {
            control: 'inline-radio',
            options: ['1', '2', '3', '4', '1/3', '2/3'],
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
type Story = StoryObj<typeof Column>;

export const TwoColumns: Story = {
    render: () => (
        <Main>
            <Column cols="2">
                <Column.Content>
                    <MultiParagraph count={2} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={2} />
                </Column.Content>
            </Column>
        </Main>
    ),
};

export const ThreeColumns: Story = {
    render: () => (
        <Main>
            <Column cols="3">
                <Column.Content>
                    <MultiParagraph count={2} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={2} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={2} />
                </Column.Content>
            </Column>
        </Main>
    ),
};

export const FourColumns: Story = {
    render: () => (
        <Main>
            <Column cols="4">
                <Column.Content>
                    <MultiParagraph count={1} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={1} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={1} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={1} />
                </Column.Content>
            </Column>
        </Main>
    ),
};

export const TwoThirds: Story = {
    name: 'Two thirds / One third',
    render: () => (
        <Main>
            <Column cols="2/3">
                <Column.Content>
                    <MultiParagraph count={3} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={1} />
                </Column.Content>
            </Column>
        </Main>
    ),
};

export const OneThird: Story = {
    name: 'One third / Two thirds',
    render: () => (
        <Main>
            <Column cols="1/3">
                <Column.Content>
                    <MultiParagraph count={1} />
                </Column.Content>
                <Column.Content>
                    <MultiParagraph count={3} />
                </Column.Content>
            </Column>
        </Main>
    ),
};

export const ContentFirst: Story = {
    name: 'Content first (isFirst)',
    render: () => (
        <Main>
            <Column cols="1/3">
                <Column.Content>
                    <p>
                        <strong>Main content</strong> — first in DOM, second visually on desktop.
                    </p>
                    <MultiParagraph count={2} />
                </Column.Content>
                <Column.Content isFirst>
                    <p>
                        <strong>Sidebar</strong> — second in DOM, first visually on desktop via{' '}
                        <code>isFirst</code>.
                    </p>
                    <MultiParagraph count={1} />
                </Column.Content>
            </Column>
        </Main>
    ),
};
