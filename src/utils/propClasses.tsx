export const maxWidthClasses = {
    alignsmall: 'alignsmall',
    aligncontent: 'aligncontent',
    alignwide: 'alignwide',
    alignfull: 'alignfull',
};

export const elementClasses = {
    div: 'div',
    section: 'section',
    header: 'header',
    main: 'main',
    footer: 'footer',
    article: 'article',
    nav: 'nav',
    aside: 'aside',
};

export const gridColumnClasses = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '1/3': 'one-third',
    '2/3': 'two-thirds',
};

export const borderRadiusClasses = {
    none: 'none',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    full: 'full',
};

export const justifyClasses = {
    start: 'start',
    end: 'end',
    center: 'center',
};

// Spacing scale steps, used by gap/padding/margin props on layout components.
// The scale itself is generated: $octave-spacing-* in
// src/styles/c2b/_octave-variables.scss is the source of truth. Keep this map in
// sync when c2b.config.json changes the scale — a key with no matching token
// compiles to a class with no rule behind it rather than a type error.
export const spacingClasses = {
    none: 'none',
    '3-x-small': '3-x-small',
    '2-x-small': '2-x-small',
    'x-small': 'x-small',
    small: 'small',
    normal: 'normal',
    medium: 'medium',
    large: 'large',
    'x-large': 'x-large',
    '2-x-large': '2-x-large',
    '3-x-large': '3-x-large',
    '4-x-large': '4-x-large',
    '5-x-large': '5-x-large',
};

// Flex main-axis alignment (justify-content). Distinct from justifyClasses, which
// is the narrower {start, end, center} set ButtonGroup uses.
export const flexJustifyClasses = {
    start: 'start',
    center: 'center',
    end: 'end',
    'space-between': 'space-between',
};

// Flex cross-axis alignment (align-items).
export const flexAlignClasses = {
    start: 'start',
    center: 'center',
    end: 'end',
    stretch: 'stretch',
};
