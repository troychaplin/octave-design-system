import React from 'react';
import './styles.scss';

export interface MainProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    hasPadding?: boolean;
    className?: string;
}

export const Main = ({ children, hasPadding = true, className, ...rest }: MainProps) => {
    const rootClasses = ['octave-main', hasPadding && 'octave-main--padding', className]
        .filter(Boolean)
        .join(' ');

    return (
        <main className={rootClasses} {...rest}>
            <div className="alignfull has-global-padding is-layout-constrained entry-content">
                {children}
            </div>
        </main>
    );
};
