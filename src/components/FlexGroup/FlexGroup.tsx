import {
    elementClasses,
    flexAlignClasses,
    flexJustifyClasses,
    maxWidthClasses,
    spacingClasses,
} from '../../utils/propClasses';
import './styles.scss';

type elementKeys = keyof typeof elementClasses;
type flexJustifyKeys = keyof typeof flexJustifyClasses;
type flexAlignKeys = keyof typeof flexAlignClasses;
type spacingKeys = keyof typeof spacingClasses;
type maxWidthKeys = keyof typeof maxWidthClasses;

export interface FlexGroupProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: elementKeys;
    direction?: 'row' | 'column';
    wrap?: 'wrap' | 'nowrap';
    justify?: flexJustifyKeys;
    align?: flexAlignKeys;
    gap?: spacingKeys;
    padding?: spacingKeys;
    margin?: spacingKeys;
    maxWidth?: maxWidthKeys;
}

export const FlexGroup = ({
    children,
    as = 'div',
    direction = 'row',
    wrap = 'wrap',
    justify,
    align,
    gap,
    padding,
    margin,
    maxWidth,
    className,
    ...rest
}: FlexGroupProps) => {
    const FlexGroupWrapper = as;

    const rootClasses = [
        'parlour-layout parlour-flex-group',
        `parlour-flex-group--${direction}`,
        `parlour-flex-group--${wrap}`,
        maxWidth && maxWidthClasses[maxWidth],
        justify && `parlour-flex-group--justify-${flexJustifyClasses[justify]}`,
        align && `parlour-flex-group--align-${flexAlignClasses[align]}`,
        gap && `parlour-flex-group--gap-${spacingClasses[gap]}`,
        padding && `parlour-flex-group--padding-${spacingClasses[padding]}`,
        margin && `parlour-flex-group--margin-${spacingClasses[margin]}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <FlexGroupWrapper className={rootClasses} {...rest}>
            {children}
        </FlexGroupWrapper>
    );
};
