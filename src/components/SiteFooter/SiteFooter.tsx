'use client';

import React from 'react';

import { BrandIcon } from '../BrandIcon/BrandIcon';
import { brandIcons } from '../BrandIcon/brandIcons';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import './styles.scss';

// Rendered in this order
const socialNetworks = [
    'github',
    'x',
    'bluesky',
    'linkedin',
    'facebook',
    'instagram',
    'youtube',
    'tiktok',
] as const;

type SocialNetwork = (typeof socialNetworks)[number];

export interface SiteFooterProps
    extends React.HTMLAttributes<HTMLElement>, Partial<Record<SocialNetwork, string>> {
    name: string;
    nameHref?: string;
    year?: number;
    text?: React.ReactNode;
    className?: string;
}

export const SiteFooter = ({
    name,
    nameHref,
    year = new Date().getFullYear(),
    text,
    className,
    github,
    x,
    bluesky,
    linkedin,
    facebook,
    instagram,
    youtube,
    tiktok,
    ...rest
}: SiteFooterProps) => {
    const LinkComponent = useLinkContext();
    const rootClasses = ['parlour-site-footer', className].filter(Boolean).join(' ');

    const urls: Record<SocialNetwork, string | undefined> = {
        github,
        x,
        bluesky,
        linkedin,
        facebook,
        instagram,
        youtube,
        tiktok,
    };
    const socials = socialNetworks.filter((network) => urls[network]);

    return (
        <footer className={rootClasses} {...rest}>
            <div className="parlour-site-footer__inner">
                <p className="parlour-site-footer__copyright">
                    © {year}{' '}
                    {nameHref ? (
                        // eslint-disable-next-line react-hooks/static-components -- injected via context, stable across renders
                        <LinkComponent href={nameHref}>{name}</LinkComponent>
                    ) : (
                        name
                    )}
                </p>

                {text && <p className="parlour-site-footer__text">{text}</p>}

                {socials.length > 0 && (
                    <ul className="parlour-site-footer__social">
                        {socials.map((network) => (
                            <li key={network}>
                                <LinkComponent
                                    className="parlour-site-footer__social-link"
                                    href={urls[network]}
                                    rel="me"
                                    aria-label={brandIcons[network].title}
                                >
                                    <BrandIcon name={network} />
                                </LinkComponent>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </footer>
    );
};
