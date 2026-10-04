import React from 'react';
import { justifyClasses } from '../../utils/propClasses';
import './styles.scss';

type ButtonGroupAlign = keyof typeof justifyClasses;

export interface ButtonGroupProps {
    children: React.ReactNode;
    align?: ButtonGroupAlign;
}

export const ButtonGroup = ({ children, align = 'start' }: ButtonGroupProps) => (
    <div className={`parlour-buttongroup parlour-buttongroup--justify-${align}`}>{children}</div>
);
