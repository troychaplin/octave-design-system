'use client';

import { useLinkContext } from '../LinkProvider/useLinkContext';
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
    paddingInline?: spacingKeys;
    paddingBlock?: spacingKeys;
    href?: string;
    linkProps?: Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'>;
}

export const Card = ({
    children,
    as = 'div',
    backgroundColor = 'light',
    border = true,
    borderColor = 'light',
    borderRadius = 'none',
    paddingInline = 'x-large',
    paddingBlock = 'large',
    href,
    linkProps,
    className,
    ...rest
}: CardProps) => {
    const CardWrapper = as;
    const LinkComponent = useLinkContext();

    const rootClasses = [
        'parlour-card',
        `parlour-card--bg-${backgroundColorClasses[backgroundColor]}`,
        border && 'parlour-card--border',
        border && `parlour-card--border-${backgroundColorClasses[borderColor]}`,
        `parlour-card--radius-${borderRadiusClasses[borderRadius]}`,
        `parlour-card--padding-inline-${spacingClasses[paddingInline]}`,
        `parlour-card--padding-block-${spacingClasses[paddingBlock]}`,
        href && 'parlour-card--linked',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <CardWrapper className={rootClasses} {...rest}>
                {/* eslint-disable-next-line react-hooks/static-components -- injected via context, stable across renders */}
                <LinkComponent className="parlour-card__link" href={href} {...linkProps}>
                    {children}
                </LinkComponent>
            </CardWrapper>
        );
    }

    return (
        <CardWrapper className={rootClasses} {...rest}>
            {children}
        </CardWrapper>
    );
};
