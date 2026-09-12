import { maxWidthClasses, elementClasses } from '../../utils/propClasses';
import './styles.scss';

type maxWidthKeys = keyof typeof maxWidthClasses;
type elementKeys = keyof typeof elementClasses;

export interface ContainerProps {
    children?: React.ReactNode;
    as?: elementKeys;
    maxWidth?: maxWidthKeys;
    contentWidth?: maxWidthKeys;
    className?: string;
}

export const Container = ({
    children,
    as = 'div',
    maxWidth = 'alignfull',
    contentWidth = 'aligncontent',
    className = '',
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

    return (
        <ContainerWrapper className={rootClasses}>
            <div className={`has-global-padding ${contentWidth}`}>{children}</div>
        </ContainerWrapper>
    );
};
