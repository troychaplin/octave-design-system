import React from 'react';
import './styles.scss';

export interface MainProps {
    children: React.ReactNode;
    hasPadding?: boolean;
    className?: string;
}

export const Main = ({ children, hasPadding = true, className = '' }: MainProps) => {
    return (
        <main
            className={`${hasPadding ? 'octave-main octave-main--padding' : 'octave-main'} ${className}`}
        >
            <div className="alignfull has-global-padding is-layout-constrained entry-content">
                {children}
            </div>
        </main>
    );
};
