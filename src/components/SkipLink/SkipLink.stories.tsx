import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { SkipLink } from './SkipLink';
import { Main } from '../Main/Main';
import { MultiParagraph } from '../../data/SampleContent';

const meta: Meta<typeof SkipLink> = {
    title: 'Components/Template Parts/Skip Link',
    component: SkipLink,
    tags: ['!autodocs'],
    decorators: [
        (Story) => (
            <div style={{ position: 'relative', transform: 'translateZ(0)', overflow: 'hidden' }}>
                <Story />
            </div>
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
type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
    render: (args) => (
        <>
            <SkipLink {...args} />
            <Main>
                <MultiParagraph count={2} />
            </Main>
        </>
    ),
};

export const CustomTarget: Story = {
    args: {
        href: '#content',
        children: 'Skip to main content',
    },
    render: (args) => (
        <>
            <SkipLink {...args} />
            <Main id="content">
                <MultiParagraph count={2} />
            </Main>
        </>
    ),
};

export const KeyboardFocus: Story = {
    render: (args) => (
        <>
            <SkipLink {...args} />
            <Main>
                <MultiParagraph count={2} />
            </Main>
        </>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const link = canvas.getByRole('link', { name: 'Skip to content' });
        const main = canvas.getByRole('main');

        await userEvent.tab();
        await expect(link).toHaveFocus();

        await waitFor(() => expect(link.getBoundingClientRect().top).toBeGreaterThanOrEqual(0));

        await expect(main).toHaveAttribute('id', 'main');
        await expect(main).toHaveAttribute('tabindex', '-1');
    },
};
