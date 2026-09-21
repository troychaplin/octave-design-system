import { maxWidthClasses, elementClasses, borderRadiusClasses } from '../../utils/propClasses';
import './styles.scss';

type maxWidthKeys = keyof typeof maxWidthClasses;
type elementKeys = keyof typeof elementClasses;
type borderRadiusKeys = keyof typeof borderRadiusClasses;
type colorKeys = 'light' | 'medium' | 'dark' | 'white';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    as?: elementKeys;
    maxWidth?: maxWidthKeys;
    contentWidth?: maxWidthKeys;
    color?: colorKeys;
    borderRadius?: borderRadiusKeys;
}

export const Container = ({
    children,
    as = 'div',
    maxWidth = 'aligncontent',
    contentWidth = 'aligncontent',
    color,
    className,
    borderRadius = 'md',
    ...rest
}: ContainerProps) => {
    const ContainerWrapper = as;

    const rootClasses = [
        'octave-layout octave-container',
        'is-layout-constrained',
        maxWidth,
        color && `octave-container--no-gap octave-container--${color}`,
        borderRadius && `octave-container--radius-${borderRadius}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const contentClasses = ['has-global-padding', contentWidth, color && 'has-root-padding']
        .filter(Boolean)
        .join(' ');

    return (
        <ContainerWrapper className={rootClasses} {...rest}>
            <div className={contentClasses}>{children}</div>
        </ContainerWrapper>
    );
};
