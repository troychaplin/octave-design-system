import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';
import { Main } from '../Main/Main';
import { CodeDataPhp, CodeDataReact } from '../../data/CodeData';

const colorOptions = ['light', 'medium', 'dark', 'white'] as const;
const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

const meta: Meta<typeof CodeBlock> = {
    title: 'Components/Content/Code Block',
    component: CodeBlock,
    tags: ['!autodocs'],
    argTypes: {
        color: {
            control: 'inline-radio',
            options: colorOptions,
        },
        hasBorder: {
            control: 'boolean',
            options: [true, false],
        },
        borderRadius: {
            control: 'inline-radio',
            options: radiusOptions,
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
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
    args: {
        code: CodeDataPhp,
    },
};

export const Colors: Story = {
    render: () => (
        <>
            {colorOptions.map((color) => (
                <CodeBlock
                    key={color}
                    color={color}
                    code={`<CodeBlock color="${color}" code={snippet} />`}
                />
            ))}
        </>
    ),
};

export const WithBorder: Story = {
    render: () => (
        <>
            {colorOptions.map((color) => (
                <CodeBlock
                    key={color}
                    color={color}
                    hasBorder
                    code={`<CodeBlock color="${color}" hasBorder code={snippet} />`}
                />
            ))}
        </>
    ),
};

export const BorderRadius: Story = {
    render: () => (
        <>
            {radiusOptions.map((radius) => (
                <CodeBlock
                    key={radius}
                    borderRadius={radius}
                    code={`<CodeBlock borderRadius="${radius}" code={snippet} />`}
                />
            ))}
        </>
    ),
};

export const LongLines: Story = {
    args: {
        code: CodeDataReact,
    },
};
