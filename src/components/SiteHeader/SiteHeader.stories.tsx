import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from './SiteHeader';
import { MultiParagraph } from '../../data/SampleContent';

const meta: Meta<typeof SiteHeader> = {
    title: 'Components/Template Parts/SiteHeader',
    component: SiteHeader,
    tags: ['!autodocs'],
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
    args: {
        children: <MultiParagraph count={2} />,
    },
};
