import React from 'react';
import './styles.scss';

export interface SiteHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const SiteHeader = ({ className = '' }: SiteHeaderProps) => {
    return (
        <header className={`octave-site-header ${className}`}>
            <p>Brand Name</p>
            <p>Navigation</p>
            <p>Extras</p>
        </header>
    );
};
