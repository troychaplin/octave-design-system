import type { Meta, StoryObj } from '@storybook/react-vite';
import { Figure } from './Figure';
import { Main } from '../Main/Main';
import { Section } from '../Section/Section';

const meta: Meta<typeof Figure> = {
    title: 'Components/Content/Figure',
    component: Figure,
    tags: ['!autodocs'],
    decorators: [
        (Story) => (
            <Main>
                <Story />
            </Main>
        ),
    ],
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['xs', 'sm', 'md', 'lg', 'full'],
        },
        align: {
            control: 'inline-radio',
            options: ['none', 'left', 'right', 'center'],
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
type Story = StoryObj<typeof Figure>;

const LoremPara = () => (
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam augue turpis, feugiat vitae
        viverra in, egestas vitae nulla. Quisque auctor ultrices mauris, et semper urna aliquam
        quis. Duis sed malesuada metus, et tristique dolor. Suspendisse vestibulum hendrerit.
        Aliquam blandit tellus odio, nec commodo est efficitur sit amet. Proin molestie, risus in
        mollis laoreet, lectus dui egestas augue, eu maximus velit dui sed quam.
    </p>
);

export const Default: Story = {
    args: {
        size: 'full',
        align: 'none',
    },
    render: (args) => (
        <Figure {...args}>
            <img
                src="https://picsum.photos/id/15/1200/600"
                alt="Landscape with trees and mountains"
                width="1200"
                height="600"
            />
        </Figure>
    ),
};

export const WithCaption: Story = {
    args: {
        size: 'full',
        align: 'none',
        caption:
            'A scenic landscape. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at aliquet lorem, id lobortis eros.',
    },
    render: (args) => (
        <Figure {...args}>
            <img
                src="https://picsum.photos/id/15/1200/600"
                alt="Landscape with trees and mountains"
                width="1200"
                height="600"
            />
        </Figure>
    ),
};

export const FloatLeft: Story = {
    args: {
        size: 'md',
        align: 'left',
        caption: 'A scenic landscape with a caption.',
    },
    render: (args) => (
        <Section>
            <Figure {...args}>
                <img
                    src="https://picsum.photos/id/15/400/300"
                    alt="Landscape with trees and mountains"
                    width="400"
                    height="300"
                />
            </Figure>
            <LoremPara />
            <LoremPara />
            <LoremPara />
        </Section>
    ),
};

export const FloatRight: Story = {
    args: {
        size: 'sm',
        align: 'right',
        caption: 'A scenic landscape with a caption.',
    },
    render: (args) => (
        <Section>
            <Figure {...args}>
                <img
                    src="https://picsum.photos/id/15/400/300"
                    alt="Landscape with trees and mountains"
                    width="400"
                    height="300"
                />
            </Figure>
            <LoremPara />
            <LoremPara />
            <LoremPara />
        </Section>
    ),
};

export const Centered: Story = {
    args: {
        size: 'md',
        align: 'center',
    },
    render: (args) => (
        <Section>
            <Figure {...args}>
                <img
                    src="https://picsum.photos/id/15/400/300"
                    alt="Landscape with trees and mountains"
                    width="400"
                    height="300"
                />
            </Figure>
            <LoremPara />
            <LoremPara />
            <LoremPara />
        </Section>
    ),
};
