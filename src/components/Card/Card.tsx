import {
    backgroundColorClasses,
    borderRadiusClasses,
    spacingClasses,
} from '../../utils/propClasses';
import './styles.scss';

type surfaceKeys = keyof typeof backgroundColorClasses;
type borderRadiusKeys = keyof typeof borderRadiusClasses;
type spacingKeys = keyof typeof spacingClasses;

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: 'div' | 'article' | 'li';
    backgroundColor?: surfaceKeys;
    border?: boolean;
    borderColor?: surfaceKeys;
    borderRadius?: borderRadiusKeys;
    paddingInline?: spacingKeys;
    paddingBlock?: spacingKeys;
}

export const Card = ({
    children,
    as = 'div',
    backgroundColor = 'light',
    border = true,
    borderColor = 'light',
    borderRadius = 'none',
    paddingInline = 'x-large',
    paddingBlock = 'large',
    className,
    ...rest
}: CardProps) => {
    const CardWrapper = as;

    const rootClasses = [
        'parlour-card',
        `parlour-card--bg-${backgroundColorClasses[backgroundColor]}`,
        border && 'parlour-card--border',
        border && `parlour-card--border-${backgroundColorClasses[borderColor]}`,
        `parlour-card--radius-${borderRadiusClasses[borderRadius]}`,
        `parlour-card--padding-inline-${spacingClasses[paddingInline]}`,
        `parlour-card--padding-block-${spacingClasses[paddingBlock]}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <CardWrapper className={rootClasses} {...rest}>
            {children}
        </CardWrapper>
    );
};
