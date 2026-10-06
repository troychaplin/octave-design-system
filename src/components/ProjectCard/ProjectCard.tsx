import { useId } from 'react';

import { Card, type CardProps } from '../Card/Card';
import { BrandIcon } from '../BrandIcon/BrandIcon';
import { brandIcons, type BrandIconName } from '../BrandIcon/brandIcons';
import './styles.scss';

export interface ProjectCardProps extends Omit<CardProps, 'children' | 'title' | 'linkProps'> {
    title: string;
    href?: string;
    type?: string;
    icon?: BrandIconName;
    version?: string;
    description?: string;
    footer?: string;
    headingLevel?: 'h2' | 'h3' | 'h4';
}

export const ProjectCard = ({
    title,
    href,
    type,
    icon,
    version,
    description,
    footer,
    headingLevel = 'h3',
    className,
    ...rest
}: ProjectCardProps) => {
    const Heading = headingLevel;
    const titleId = useId();

    const rootClasses = ['parlour-project-card', className].filter(Boolean).join(' ');

    const content = (
        <>
            {(type || icon) && (
                <div className="parlour-project-card__meta">
                    {type && <p className="parlour-project-card__type">{type}</p>}
                    {icon && (
                        <BrandIcon
                            className="parlour-project-card__icon"
                            name={icon}
                            label={brandIcons[icon].title}
                        />
                    )}
                </div>
            )}

            <Heading className="parlour-project-card__title" id={titleId}>
                {title}
            </Heading>

            {version && <p className="parlour-project-card__version">{version}</p>}

            {description && <p className="parlour-project-card__description">{description}</p>}

            {(footer || href) && (
                <div className="parlour-project-card__footer">
                    <span>{footer}</span>
                    {href && (
                        <span className="parlour-project-card__arrow" aria-hidden="true">
                            →
                        </span>
                    )}
                </div>
            )}
        </>
    );

    return (
        <Card
            className={rootClasses}
            borderRadius="sm"
            href={href}
            linkProps={{ 'aria-labelledby': titleId }}
            {...rest}
        >
            {content}
        </Card>
    );
};
