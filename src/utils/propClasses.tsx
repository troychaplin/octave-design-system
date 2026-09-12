import { octaveTokenKeys } from '../styles/c2b/octave-tokens';

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
    ul: 'ul',
    ol: 'ol',
};

export const gridColumnClasses = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '1/3': 'one-third',
    '2/3': 'two-thirds',
};

export const spacingClasses = {
    none: 'none',
    ...octaveTokenKeys.spacing,
};

export const borderRadiusClasses = {
    none: 'none',
    ...octaveTokenKeys.radius,
};

export const justifyClasses = {
    start: 'start',
    end: 'end',
    center: 'center',
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
