import React from 'react';
import './styles.scss';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    color?: 'primary' | 'secondary' | 'neutral' | 'dark' | 'light';
    type?: 'button' | 'submit' | 'reset';
    isSmall?: boolean;
    isFull?: boolean;
    isDisabled?: boolean;
    isOutline?: boolean;
}

export interface ButtonTitleProps extends ButtonProps {
    title: string;
    ariaLabel?: string;
}

export interface ButtonNoTitleProps extends ButtonProps {
    title?: string;
    ariaLabel: string;
}

export const Button = ({
    color = 'primary',
    title,
    type = 'button',
    isSmall,
    isFull,
    isDisabled,
    isOutline,
    ariaLabel,
    ...rest
}: ButtonNoTitleProps | ButtonTitleProps) => {
    const variantClass = isDisabled ? 'octave-button--disabled' : `octave-button--${color}`;
    const outlineClass = isOutline && !isDisabled ? 'octave-button--outline' : '';
    const sizeClass = isSmall ? 'octave-button--small' : '';
    const widthClass = isFull ? 'octave-button--full' : '';

    return (
        <button
            type={type}
            aria-label={ariaLabel}
            className={`octave-button ${variantClass} ${outlineClass} ${sizeClass} ${widthClass}`.trim()}
            disabled={isDisabled}
            {...rest}
        >
            {title}
        </button>
    );
};
