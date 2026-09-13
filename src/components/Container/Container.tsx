import { maxWidthClasses, elementClasses } from '../../utils/propClasses';
import './styles.scss';

type maxWidthKeys = keyof typeof maxWidthClasses;
type elementKeys = keyof typeof elementClasses;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    as?: elementKeys;
    maxWidth?: maxWidthKeys;
    contentWidth?: maxWidthKeys;
    useRootPadding?: boolean;
}

export const Container = ({
    children,
    as = 'div',
    maxWidth = 'aligncontent',
    contentWidth = 'aligncontent',
    useRootPadding = false,
    className,
    ...rest
}: ContainerProps) => {
    const ContainerWrapper = as;

    const rootClasses = [
        'octave-layout octave-container',
        'is-layout-constrained',
        maxWidth,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const contentClasses = [
        'has-global-padding',
        contentWidth,
        useRootPadding && 'has-root-padding',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <ContainerWrapper className={rootClasses} {...rest}>
            <div className={contentClasses}>{children}</div>
        </ContainerWrapper>
    );
};
