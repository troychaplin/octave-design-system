'use client';

import React from 'react';

import { FlexGroup } from '../FlexGroup/FlexGroup';
import { useLinkContext } from '../LinkProvider';

import './styles.scss';

export interface SiteHeaderNavItem {
    href: string;
    label: string;
}

export interface SiteHeaderProps {
    children?: React.ReactNode;
    siteTitle?: string;
    siteTitleAccent?: string;
    navItems?: SiteHeaderNavItem[];
    className?: string;
}

// Splits the title around the first match of `accent`. With no match, the whole title comes back
// as the only part.
const splitTitle = (title: string, accent?: string): [string, string?, string?] => {
    const start = accent ? title.indexOf(accent) : -1;

    if (!accent || start === -1) {
        return [title];
    }

    return [title.slice(0, start), accent, title.slice(start + accent.length)];
};

export const SiteHeader = ({
    className = '',
    children,
    siteTitle = 'Parlour',
    siteTitleAccent,
    navItems,
}: SiteHeaderProps) => {
    const rootClasses = ['parlour-site-header', className].filter(Boolean).join(' ');
    const LinkComponent = useLinkContext();
    const [titleStart, titleAccent, titleEnd] = splitTitle(siteTitle, siteTitleAccent);

    return (
        <header className={rootClasses}>
            <FlexGroup gap="normal" maxWidth="alignwide" justify="space-between" align="center">
                <div className="parlour-site-header__branding">
                    <p>
                        {/* eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders */}
                        <LinkComponent href="/" rel="home">
                            {titleStart}
                            {titleAccent && (
                                <span className="parlour-site-header__title-accent">
                                    {titleAccent}
                                </span>
                            )}
                            {titleEnd}
                        </LinkComponent>
                    </p>
                </div>
                {navItems && navItems.length > 0 && (
                    <nav className="parlour-site-header__nav" aria-label="Primary">
                        <ul>
                            {navItems.map(({ href, label }) => (
                                <li key={href}>
                                    <LinkComponent href={href}>{label}</LinkComponent>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
                {children && <div className="parlour-site-header__actions">{children}</div>}
            </FlexGroup>
        </header>
    );
};
