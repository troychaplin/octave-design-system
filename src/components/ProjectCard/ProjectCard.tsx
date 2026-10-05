'use client';

import { Card, type CardProps } from '../Card/Card';
import { BrandIcon } from '../BrandIcon/BrandIcon';
import { brandIcons, type BrandIconName } from '../BrandIcon/brandIcons';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import './styles.scss';

export interface ProjectCardProps extends Omit<CardProps, 'children' | 'title'> {
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
    const LinkComponent = useLinkContext();
    const Heading = headingLevel;

    const rootClasses = ['parlour-project-card', className].filter(Boolean).join(' ');

    return (
        <Card className={rootClasses} borderRadius="sm" {...rest}>
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

            <Heading className="parlour-project-card__title">
                {href ? (
                    // eslint-disable-next-line react-hooks/static-components -- injected via context, stable across renders
                    <LinkComponent className="parlour-project-card__link" href={href}>
                        {title}
                    </LinkComponent>
                ) : (
                    title
                )}
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
        </Card>
    );
};
