import React from 'react';
import './styles.scss';

export interface SiteHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const SiteHeader = ({ className = '', children }: SiteHeaderProps) => {
    return <header className={`octave-site-header ${className}`}>{children}</header>;
};
