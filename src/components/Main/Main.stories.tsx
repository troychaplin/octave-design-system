import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from './Main';
import { MultiParagraph } from '../../data/storyContent';

const meta: Meta<typeof Main> = {
    title: 'Components/Template Parts/Main',
    component: Main,
    tags: ['!autodocs'],
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Main>;

export const Default: Story = {
    args: {
        children: <MultiParagraph count={2} />,
    },
};

export const NoPadding: Story = {
    args: {
        hasPadding: false,
        children: <MultiParagraph count={2} />,
    },
};
