import React from 'react';

export interface ColumnContentProps {
    children: React.ReactNode;
    isFirst?: boolean;
}

export const ColumnContent = ({ children, isFirst = false }: ColumnContentProps) => {
    return <div className={`octave-column__content ${isFirst ? 'is-first' : ''}`}>{children}</div>;
};

ColumnContent.displayName = 'Column.Content';
