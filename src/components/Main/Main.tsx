import React from 'react';
import './styles.scss';

export interface MainProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    hasPadding?: boolean;
    className?: string;
}

export const Main = ({
    children,
    hasPadding = true,
    className,
    id = 'main',
    tabIndex = -1,
    ...rest
}: MainProps) => {
    const rootClasses = ['parlour-main', hasPadding && 'parlour-main--padding', className]
        .filter(Boolean)
        .join(' ');

    return (
        <main className={rootClasses} id={id} tabIndex={tabIndex} {...rest}>
            <div className="alignfull has-global-padding is-layout-constrained entry-content">
                {children}
            </div>
        </main>
    );
};
