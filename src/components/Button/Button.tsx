import type { ComponentPropsWithoutRef } from 'react';

import { useLinkContext } from '../LinkProvider/useLinkContext';

import './styles.scss';

interface ButtonBaseProps {
    text: string;
    color?: 'primary' | 'secondary' | 'neutral' | 'dark' | 'light';
    isSmall?: boolean;
    isFull?: boolean;
    isOutline?: boolean;
}

type ButtonElementProps = ButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
        href?: never;
    };

type ButtonLinkProps = ButtonBaseProps &
    Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBaseProps | 'type'> & {
        href: string;
        type?: never;
        disabled?: never;
    };

export type ButtonProps = ButtonElementProps | ButtonLinkProps;

export const Button = ({
    text,
    color = 'primary',
    type = 'button',
    isSmall,
    isFull,
    isOutline,
    disabled,
    className,
    ...rest
}: ButtonProps) => {
    const LinkComponent = useLinkContext();
    const classes = [
        'octave-button',
        disabled ? 'octave-button--disabled' : `octave-button--${color}`,
        isOutline && !disabled && 'octave-button--outline',
        isSmall && 'octave-button--small',
        isFull && 'octave-button--full',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (rest.href !== undefined) {
        return (
            // eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders
            <LinkComponent className={classes} {...rest}>
                {text}
            </LinkComponent>
        );
    }

    return (
        <button type={type} className={classes} disabled={disabled} {...rest}>
            {text}
        </button>
    );
};
