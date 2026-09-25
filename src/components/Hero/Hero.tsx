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
                    <h1>
                        Things I build, <span className="italic">and I help build</span>
                    </h1>
                    <p>
                        This is an example page. It is different from a blog post because it will
                        stay in one place and will show up in your site navigation (in most themes).
                        Most people start with an About page that introduces them to potential site
                        visitors. It might say something like this:
                    </p>
                </div>
                <div className="octave-hero__code">{children}</div>
            </FlexGroup>
        </Container>
    );
};
