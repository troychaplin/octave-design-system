import React from 'react';
import './styles.scss';

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
    href?: string;
    className?: string;
}

export const SkipLink = ({
    children = 'Skip to content',
    href = '#main',
    className,
    ...rest
}: SkipLinkProps) => {
    const rootClasses = ['parlour-skip-link', className].filter(Boolean).join(' ');

    return (
        <a className={rootClasses} href={href} {...rest}>
            {children}
        </a>
    );
};
