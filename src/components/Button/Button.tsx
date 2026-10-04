'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import { borderRadiusClasses } from '../../utils/propClasses';
import './styles.scss';

type borderRadiusKeys = keyof typeof borderRadiusClasses;
type colorKeys = 'light' | 'medium' | 'dark' | 'white' | 'link';

interface ButtonBaseProps {
    text: string;
    rounded?: borderRadiusKeys;
    color?: colorKeys;
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
    text = 'Button',
    color = 'medium',
    rounded = 'sm',
    type = 'button',
    isSmall = false,
    isFull = false,
    isOutline = false,
    disabled = false,
    className,
    ...rest
}: ButtonProps) => {
    const LinkComponent = useLinkContext();
    const classes = [
        'parlour-button',
        disabled ? 'parlour-button--disabled' : `parlour-button--${color}`,
        rounded && `parlour-button--radius-${rounded}`,
        isOutline && !disabled && 'parlour-button--outline',
        isSmall && 'parlour-button--small',
        isFull && 'parlour-button--full',
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
