import React from 'react';

import { FlexGroup } from '../FlexGroup/FlexGroup';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Button } from '../Button/Button';
import { useLinkContext } from '../LinkProvider';

import './styles.scss';

export interface SiteHeaderProps {
    children?: React.ReactNode;
    siteTitle?: string;
    siteTitleAccent?: string;
    className?: string;
}

const navItems = [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

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
    siteTitle = 'Octave Design System',
    siteTitleAccent,
}: SiteHeaderProps) => {
    const rootClasses = ['octave-site-header', className].filter(Boolean).join(' ');
    const LinkComponent = useLinkContext();
    const [titleStart, titleAccent, titleEnd] = splitTitle(siteTitle, siteTitleAccent);

    return (
        <header className={rootClasses}>
            <FlexGroup gap="normal" maxWidth="alignwide" justify="space-between" align="center">
                <div className="octave-site-header__branding">
                    <p>
                        {/* eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders */}
                        <LinkComponent href="/" rel="home">
                            {titleStart}
                            {titleAccent && (
                                <span className="octave-site-header__title-accent">
                                    {titleAccent}
                                </span>
                            )}
                            {titleEnd}
                        </LinkComponent>
                    </p>
                </div>
                <nav className="octave-site-header__nav" aria-label="Primary">
                    <ul>
                        {navItems.map(({ href, label }) => (
                            <li key={href}>
                                <LinkComponent href={href}>{label}</LinkComponent>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <ButtonGroup>
                        {/* <Button text="Primary" isOutline /> */}
                        <Button text="Primary" isSmall isOutline />
                    </ButtonGroup>
                </div>
                {children}
            </FlexGroup>
        </header>
    );
};
