import { useLinkContext } from '../LinkProvider/useLinkContext';
import { borderRadiusClasses } from '../../utils/propClasses';
import './styles.scss';

type borderRadiusKeys = keyof typeof borderRadiusClasses;

export interface BadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    href?: string;
    rounded?: borderRadiusKeys;
    color?:
        | 'neutral'
        | 'light'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'overlay-dark'
        | 'overlay-light';
}

export const Badge = ({ text, href, rounded = 'md', color = 'neutral', ...rest }: BadgeProps) => {
    const LinkComponent = useLinkContext();
    const classes = `octave-badge octave-badge--${color} octave-badge--radius-${rounded}`;

    if (href) {
        return (
            // eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders
            <LinkComponent href={href} className={classes} {...rest}>
                {text}
            </LinkComponent>
        );
    }

    return (
        <span className={classes} {...rest}>
            {text}
        </span>
    );
};
