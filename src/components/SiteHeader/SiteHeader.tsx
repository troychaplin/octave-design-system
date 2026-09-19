import React from 'react';

import { FlexGroup } from '../FlexGroup/FlexGroup';
import { useLinkContext } from '../LinkProvider';

import './styles.scss';

export interface SiteHeaderProps {
    children?: React.ReactNode;
    className?: string;
}

export const SiteHeader = ({ className = '', children }: SiteHeaderProps) => {
    const rootClasses = ['octave-site-header', className].filter(Boolean).join(' ');
    const LinkComponent = useLinkContext();

    return (
        <header className={rootClasses}>
            <FlexGroup gap="normal" maxWidth="alignwide" justify="space-between">
                <div>
                    <p>
                        {/* eslint-disable-next-line react-hooks/static-components -- LinkComponent is injected via context, stable across renders */}
                        <LinkComponent href="/" rel="home">
                            Troy Chaplin
                        </LinkComponent>
                    </p>
                </div>
                <nav aria-label="Primary">Meh</nav>
                <div>Pfft</div>
                {children}
            </FlexGroup>
        </header>
    );
};
