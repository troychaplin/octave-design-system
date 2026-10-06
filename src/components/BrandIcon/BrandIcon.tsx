import React from 'react';
import { brandIcons, type BrandIconName } from './brandIcons';

export interface BrandIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
    name: BrandIconName;
    label?: string;
    className?: string;
}

export const BrandIcon = ({ name, label, className, ...rest }: BrandIconProps) => {
    const rootClasses = ['parlour-brand-icon', `parlour-brand-icon--${name}`, className]
        .filter(Boolean)
        .join(' ');

    const a11yProps = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

    return (
        <svg
            className={rootClasses}
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            focusable="false"
            {...a11yProps}
            {...rest}
        >
            <path d={brandIcons[name].path} />
        </svg>
    );
};
