import type { Meta, StoryObj } from '@storybook/react-vite';
import { Article } from './Article';
import { Main } from '../Main/Main';
import { Container } from '../Container/Container';
import { ArticleData as data } from '../../data/ArticleData';
import { MultiParagraph } from '../../data/SampleContent';

const meta: Meta<typeof Article> = {
    title: 'Components/Template Parts/Article',
    component: Article,
    tags: ['!autodocs'],
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Default: Story = {
    args: {
        children: 'Article HTML5 tag as component',
    },
};

export const WithMainAndSection: Story = {
    render: () => (
        <Main>
            <Container>
                <Article>
                    <MultiParagraph count={2} />
                </Article>
            </Container>
        </Main>
    ),
};

export const ContentProp: Story = {
    name: 'Content as a Prop',
    args: {
        content: data,
    },
    render: (args) => (
        <Main>
            <Container>
                <Article {...args} />
            </Container>
        </Main>
    ),
};
