import { useLinkContext } from '../LinkProvider/useLinkContext';
import { borderRadiusClasses, colorClasses } from '../../utils/propClasses';
import './styles.scss';

type borderRadiusKeys = keyof typeof borderRadiusClasses;
type colorKeys = keyof typeof colorClasses;

export interface BadgeProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    href?: string;
    rounded?: borderRadiusKeys;
    color?: colorKeys;
}

export const Badge = ({ text, href, rounded = 'sm', color, ...rest }: BadgeProps) => {
    const LinkComponent = useLinkContext();
    const classes = `octave-badge octave-badge--radius-${rounded}`;
    const inlineStyles = {
        ...(color && { backgroundColor: `var(--octave--color-${color})` }),
    };

    if (href) {
        return (
            // eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders
            <LinkComponent href={href} className={classes} {...rest}>
                {text}
            </LinkComponent>
        );
    }

    return (
        <span className={classes} style={inlineStyles && inlineStyles} {...rest}>
            {text}
        </span>
    );
};
