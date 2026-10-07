import React from 'react';

import { FlexGroup } from '../FlexGroup/FlexGroup';

import './styles.scss';

export interface HeroProps {
    children?: React.ReactNode;
    className?: string;
}

export const Hero = ({ className = '', children }: HeroProps) => {
    const rootClasses = ['parlour-hero', className].filter(Boolean).join(' ');

    return (
        <FlexGroup
            className={rootClasses}
            gap="normal"
            maxWidth="alignwide"
            justify="space-between"
            align="center"
        >
            {children}
        </FlexGroup>
    );
};
