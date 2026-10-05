import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandIcon } from './BrandIcon';
import { brandIcons, type BrandIconName } from './brandIcons';

const iconNames = Object.keys(brandIcons) as BrandIconName[];

const meta: Meta<typeof BrandIcon> = {
    title: 'Components/Elements/Brand Icon',
    component: BrandIcon,
    tags: ['!autodocs'],
    argTypes: {
        name: {
            control: 'select',
            options: iconNames,
        },
    },
    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
    },
};

export default meta;
type Story = StoryObj<typeof BrandIcon>;

export const Default: Story = {
    args: {
        name: 'react',
        label: 'React',
        style: { fontSize: 'var(--parlour--font-size-2-x-large)' },
    },
};

export const AllIcons: Story = {
    render: () => (
        <ul
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
                gap: 'var(--parlour--spacing-large)',
                padding: 0,
                listStyle: 'none',
                fontSize: 'var(--parlour--font-size-x-large)',
            }}
        >
            {iconNames.map((name) => (
                <li
                    key={name}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--parlour--spacing-x-small)',
                    }}
                >
                    <BrandIcon name={name} />
                    <code style={{ fontSize: 'var(--parlour--font-size-x-small)' }}>{name}</code>
                </li>
            ))}
        </ul>
    ),
};

export const InheritsColor: Story = {
    render: () => (
        <p
            style={{
                color: 'var(--parlour--color-accent-primary)',
                fontSize: 'var(--parlour--font-size-large)',
            }}
        >
            <BrandIcon name="wordpress" /> Built for WordPress
        </p>
    ),
};
