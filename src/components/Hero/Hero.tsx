import React from 'react';

import { Container } from '../Container/Container';
import { FlexGroup } from '../FlexGroup/FlexGroup';

import './styles.scss';

export interface HeroProps {
    children?: React.ReactNode;
    className?: string;
}

export const Hero = ({ className = '', children }: HeroProps) => {
    const rootClasses = ['octave-hero', className].filter(Boolean).join(' ');

    return (
        <Container
            as="header"
            className={rootClasses}
            maxWidth="alignfull"
            contentWidth="alignwide"
        >
            <FlexGroup gap="normal" maxWidth="alignwide" justify="space-between" align="center">
                <div className="octave-hero__content">
                    <p className="octave-hero__prefix">Building for the open web.</p>
                    <h1>
                        Plugins, projects{' '}
                        <span className="italic">& open source contributions</span>
                    </h1>
                    <ul className="octave-hero__stats">
                        <li>7 released plugins</li>
                        <li>5 experimental projects</li>
                        <li>3 active contributions</li>
                    </ul>
                </div>
                <div className="octave-hero__code">{children}</div>
            </FlexGroup>
        </Container>
    );
};
