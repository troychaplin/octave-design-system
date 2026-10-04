import React from 'react';
import './styles.scss';

type FigureSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'full';
type FigureAlignType = 'left' | 'right' | 'center' | 'none';

export interface FigureProps {
    children: React.ReactNode;
    caption?: string;
    size?: FigureSizeType;
    align?: FigureAlignType;
}

export const Figure = ({ children, caption, size = 'full', align = 'none' }: FigureProps) => {
    // alignleft / alignright opt the figure out of the is-layout-constrained
    // rule in layout.css that would otherwise force margin-left/right: auto
    // and prevent float margins from applying.
    const layoutAlignClass = align === 'left' ? 'alignleft' : align === 'right' ? 'alignright' : '';

    const rootClasses = [
        'parlour-figure',
        `parlour-figure--${size}`,
        align !== 'none' ? `parlour-figure--${align}` : '',
        layoutAlignClass,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <figure className={rootClasses}>
            <div className="parlour-figure__inner">
                {children}
                {caption && <figcaption className="parlour-figure__caption">{caption}</figcaption>}
            </div>
        </figure>
    );
};
