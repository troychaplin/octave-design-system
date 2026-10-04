import React from 'react';
import { FlexGroup } from '../FlexGroup/FlexGroup';
import './styles.scss';

export interface InfoBarProps {
    children?: React.ReactNode;
    className?: string;
    date?: Date;
}

const MS_PER_DAY = 86_400_000;

// Counts calendar days in UTC, so a daylight saving change can't knock the count off by one
const getDayOfYear = (date: Date) =>
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(date.getFullYear(), 0, 0)) /
    MS_PER_DAY;

const toIsoDate = (date: Date) =>
    [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        .map((part) => String(part).padStart(2, '0'))
        .join('-');

export const InfoBar = ({ className = '', children, date = new Date() }: InfoBarProps) => {
    const rootClasses = ['parlour-infobar', className].filter(Boolean).join(' ');
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className={rootClasses}>
            <FlexGroup gap="normal" maxWidth="alignwide" justify="space-between" align="center">
                <p>Building since 2005</p>
                <p>
                    Day {getDayOfYear(date)} <span aria-hidden="true">•</span>{' '}
                    <time dateTime={toIsoDate(date)}>{formattedDate}</time>
                </p>
                {children}
            </FlexGroup>
        </div>
    );
};
