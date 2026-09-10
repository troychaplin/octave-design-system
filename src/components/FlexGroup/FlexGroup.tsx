import {
    flexAlignClasses,
    flexJustifyClasses,
    maxWidthClasses,
    spacingClasses,
} from '../../utils/propClasses';
import './styles.scss';

type flexJustifyKeys = keyof typeof flexJustifyClasses;
type flexAlignKeys = keyof typeof flexAlignClasses;
type spacingKeys = keyof typeof spacingClasses;
type maxWidthKeys = keyof typeof maxWidthClasses;

export interface FlexGroupProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: 'div' | 'header' | 'main' | 'section' | 'article' | 'aside' | 'footer';
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
        'octave-layout octave-flex-group',
        `octave-flex-group--${direction}`,
        `octave-flex-group--${wrap}`,
        justify && `octave-flex-group--justify-${flexJustifyClasses[justify]}`,
        align && `octave-flex-group--align-${flexAlignClasses[align]}`,
        gap && `octave-flex-group--gap-${spacingClasses[gap]}`,
        padding && `octave-flex-group--padding-${spacingClasses[padding]}`,
        margin && `octave-flex-group--margin-${spacingClasses[margin]}`,
        maxWidth && maxWidthClasses[maxWidth],
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
