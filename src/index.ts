import './styles/main.scss';

// Template Parts
export { Article } from './components/Article/Article';
export { Aside } from './components/Aside/Aside';
export { Body } from './components/Body/Body';
export { Main } from './components/Main/Main';
export { SiteHeader } from './components/SiteHeader/SiteHeader';
export { InfoBar } from './components/InfoBar/InfoBar';
export { SkipLink, type SkipLinkProps } from './components/SkipLink/SkipLink';

// Layout
export { Column } from './components/Column/Column';
export { FlexGroup, type FlexGroupProps } from './components/FlexGroup/FlexGroup';
export { GridGroup, type GridGroupProps } from './components/GridGroup/GridGroup';
export { Container, type ContainerProps } from './components/Container/Container';

// Elements
export { BrandIcon, type BrandIconProps } from './components/BrandIcon/BrandIcon';
export { brandIcons, type BrandIconName } from './components/BrandIcon/brandIcons';
export { Button, type ButtonProps } from './components/Button/Button';
export { ButtonGroup } from './components/ButtonGroup/ButtonGroup';

// Cards
export { Card, type CardProps } from './components/Card/Card';
export { ProjectCard, type ProjectCardProps } from './components/ProjectCard/ProjectCard';

// Content
export { CodeBlock, type CodeBlockProps } from './components/CodeBlock/CodeBlock';
export { Figure, type FigureProps } from './components/Figure/Figure';
export { Hero, type HeroProps } from './components/Hero/Hero';
export { HeroHeader, type HeroHeaderProps } from './components/HeroHeader/HeroHeader';
export { SectionHeader, type SectionHeaderProps } from './components/SectionHeader/SectionHeader';

// Utilities
export { LinkProvider } from './components/LinkProvider/index';
