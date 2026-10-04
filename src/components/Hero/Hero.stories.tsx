import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import { HeroHeader } from '../HeroHeader/HeroHeader';
import { CodeBlock } from '../CodeBlock/CodeBlock';
import { CodeDataPhp } from '../../data/CodeData';

const meta: Meta<typeof Hero> = {
    title: 'Components/Content/Hero',
    component: Hero,
    tags: ['!autodocs'],
    argTypes: {
        // Children are JSX, which the object control can only show as a raw React element
        children: {
            control: false,
        },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
    args: {
        children: (
            <>
                <div className="octave-hero__content">
                    <HeroHeader
                        prefix="Building for the open web."
                        title="Plugins, projects"
                        titleAccent="& open source contributions"
                    >
                        <ul className="octave-hero-header__stats">
                            <li>7 released plugins</li>
                            <li>5 experimental projects</li>
                            <li>3 active contributions</li>
                        </ul>
                    </HeroHeader>
                </div>
                <div className="octave-hero__code">
                    <CodeBlock code={CodeDataPhp} />
                </div>
            </>
        ),
    },
};
