import { maxWidthClasses, elementClasses, colorClasses } from '../../utils/propClasses';
import './styles.scss';

type maxWidthKeys = keyof typeof maxWidthClasses;
type elementKeys = keyof typeof elementClasses;
type colorKeys = keyof typeof colorClasses;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    as?: elementKeys;
    maxWidth?: maxWidthKeys;
    contentWidth?: maxWidthKeys;
    color?: colorKeys;
}

export const Container = ({
    children,
    as = 'div',
    maxWidth = 'aligncontent',
    contentWidth = 'aligncontent',
    color,
    className,
    ...rest
}: ContainerProps) => {
    const ContainerWrapper = as;

    const rootClasses = [
        'octave-layout octave-container',
        'is-layout-constrained',
        maxWidth,
        color,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const contentClasses = ['has-global-padding', contentWidth, color && 'has-root-padding']
        .filter(Boolean)
        .join(' ');

    const inlineStyles = {
        ...(color && {
            backgroundColor: `var(--octave--color-${color})`,
            paddingBlock: 'var(--octave--spacing-x-large)',
        }),
    };

    return (
        <ContainerWrapper className={rootClasses} style={inlineStyles} {...rest}>
            <div className={contentClasses}>{children}</div>
        </ContainerWrapper>
    );
};
