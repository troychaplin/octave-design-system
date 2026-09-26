import { borderRadiusClasses, backgroundColorClasses } from '../../utils/propClasses';
import './styles.scss';

type borderRadiusKeys = keyof typeof borderRadiusClasses;
type backgroundColorKeys = keyof typeof backgroundColorClasses;

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLPreElement>, 'children'> {
    code: string;
    color?: backgroundColorKeys;
    hasBorder?: boolean;
    borderRadius?: borderRadiusKeys;
}

export const CodeBlock = ({
    code,
    color,
    className,
    hasBorder,
    borderRadius,
    ...rest
}: CodeBlockProps) => {
    const rootClasses = [
        'octave-code-block',
        color && `octave-code-block--${backgroundColorClasses[color]}`,
        hasBorder && 'octave-code-block--has-border',
        borderRadius && `octave-code-block--radius-${borderRadiusClasses[borderRadius]}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a pre that scrolls must take keyboard focus, or its long lines can't be scrolled without a mouse
        <pre className={rootClasses} tabIndex={0} {...rest}>
            <code>{code}</code>
        </pre>
    );
};
