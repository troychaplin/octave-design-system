import React from 'react';

import './styles.scss';

export interface SectionHeaderProps extends Omit<
    React.HTMLAttributes<HTMLElement>,
    'title' | 'prefix'
> {
    className?: string;
    prefix?: string;
    title?: string;
    level?: 2 | 3 | 4;
}

export const SectionHeader = ({
    className,
    prefix,
    title,
    level = 2,
    ...rest
}: SectionHeaderProps) => {
    const rootClasses = ['parlour-section-header', className].filter(Boolean).join(' ');
    const Heading = `h${level}` as const;

    return (
        <header className={rootClasses} {...rest}>
            {prefix && <p className="parlour-section-header__prefix">{prefix}</p>}
            {title && <Heading className="parlour-section-header__title">{title}</Heading>}
        </header>
    );
};
