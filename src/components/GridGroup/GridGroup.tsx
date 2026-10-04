import { flexAlignClasses, maxWidthClasses, spacingClasses } from '../../utils/propClasses';
import './styles.scss';

type alignKeys = keyof typeof flexAlignClasses;
type spacingKeys = keyof typeof spacingClasses;
type maxWidthKeys = keyof typeof maxWidthClasses;

export interface GridGroupProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: 'div' | 'section' | 'ul' | 'ol';
    columns?: 1 | 2 | 3;
    gap?: spacingKeys;
    rowGap?: spacingKeys;
    align?: alignKeys;
    maxWidth?: maxWidthKeys;
}

export const GridGroup = ({
    children,
    as = 'div',
    columns = 3,
    gap = 'medium',
    rowGap,
    align,
    maxWidth,
    className,
    ...rest
}: GridGroupProps) => {
    const GridGroupWrapper = as;

    const rootClasses = [
        'parlour-layout parlour-grid-group',
        `parlour-grid-group--columns-${columns}`,
        `parlour-grid-group--gap-${spacingClasses[gap]}`,
        rowGap && `parlour-grid-group--row-gap-${spacingClasses[rowGap]}`,
        align && `parlour-grid-group--align-${flexAlignClasses[align]}`,
        maxWidth && maxWidthClasses[maxWidth],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // list-style: none drops list semantics in Safari/VoiceOver, so restore them explicitly.
    const listRole = as === 'ul' || as === 'ol' ? 'list' : undefined;

    return (
        <GridGroupWrapper className={rootClasses} role={listRole} {...rest}>
            {children}
        </GridGroupWrapper>
    );
};
