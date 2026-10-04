import React from 'react';
import './styles.scss';

export interface AsideProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    isSticky?: boolean;
    topSpace?: number;
    className?: string;
}

export const Aside = ({ children, isSticky, topSpace = 0, className, ...rest }: AsideProps) => {
    const rootClasses = ['relative', 'parlour-aside', 'parlour-prose', className]
        .filter(Boolean)
        .join(' ');

    return (
        <aside className={rootClasses} {...rest}>
            {isSticky ? (
                <div className="sticky" style={{ top: `${topSpace}px` }}>
                    {children}
                </div>
            ) : (
                children
            )}
        </aside>
    );
};
