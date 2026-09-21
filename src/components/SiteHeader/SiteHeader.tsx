import React from 'react';

import { FlexGroup } from '../FlexGroup/FlexGroup';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Button } from '../Button/Button';
import { useLinkContext } from '../LinkProvider';

import './styles.scss';

export interface SiteHeaderProps {
    children?: React.ReactNode;
    siteTitle?: string;
    className?: string;
}

const navItems = [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export const SiteHeader = ({ className = '', children, siteTitle }: SiteHeaderProps) => {
    const rootClasses = ['octave-site-header', className].filter(Boolean).join(' ');
    const LinkComponent = useLinkContext();

    return (
        <header className={rootClasses}>
            <FlexGroup gap="normal" maxWidth="alignwide" justify="space-between" align="center">
                <div className="octave-site-header__branding">
                    <p>
                        {/* eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders */}
                        <LinkComponent href="/" rel="home">
                            {siteTitle ?? 'Octave Design System'}
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
