import React from 'react';

import './styles.scss';

export interface HeroHeaderProps extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'title' | 'prefix'
> {
    className?: string;
    prefix?: string;
    title?: string;
    titleAccent?: string;
    level?: 1 | 2 | 3;
    children?: React.ReactNode;
}

export const HeroHeader = ({
    className,
    prefix,
    title,
    titleAccent,
    level = 1,
    children,
    ...rest
}: HeroHeaderProps) => {
    const rootClasses = ['parlour-hero-header', className].filter(Boolean).join(' ');
    const Heading = `h${level}` as const;

    return (
        <header className={rootClasses} {...rest}>
            {prefix && <p className="parlour-hero-header__prefix">{prefix}</p>}
            {title && (
                <Heading className="parlour-hero-header__title">
                    {title}{' '}
                    {titleAccent && (
                        <span className="parlour-hero-header__title-accent">{titleAccent}</span>
                    )}
                </Heading>
            )}
            {children}
        </header>
    );
};
