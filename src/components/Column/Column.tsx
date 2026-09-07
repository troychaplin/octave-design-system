import React from 'react';
import { ColumnContent } from './ColumnContent';
import { gridColumnClasses } from '../../utils/propClasses';
import './styles.scss';

type gridColumnKeys = keyof typeof gridColumnClasses;

export interface ColumnProps {
    children: React.ReactNode;
    cols?: gridColumnKeys;
    maxWidth?: 'aligncontent' | 'alignwide' | 'alignfull';
}

export const ColumnWrapper = ({ children, cols = '2', maxWidth = 'aligncontent' }: ColumnProps) => {
    const rootClasses = [
        `octave-layout octave-column octave-column--${gridColumnClasses[cols]}`,
        maxWidth,
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={rootClasses}>{children}</div>;
};

export const Column = Object.assign(ColumnWrapper, {
    Content: ColumnContent,
});

ColumnWrapper.displayName = 'Column';
