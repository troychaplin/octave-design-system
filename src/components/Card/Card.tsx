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
    padding?: spacingKeys;
}

export const Card = ({
    children,
    as = 'div',
    backgroundColor = 'light',
    border = true,
    borderColor = 'light',
    borderRadius = 'none',
    padding = 'large',
    className,
    ...rest
}: CardProps) => {
    const CardWrapper = as;

    const rootClasses = [
        'octave-card',
        `octave-card--bg-${backgroundColorClasses[backgroundColor]}`,
        border && 'octave-card--border',
        border && `octave-card--border-${backgroundColorClasses[borderColor]}`,
        `octave-card--radius-${borderRadiusClasses[borderRadius]}`,
        `octave-card--padding-${spacingClasses[padding]}`,
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
