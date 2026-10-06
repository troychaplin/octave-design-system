'use client';

import React from 'react';

import { BrandIcon } from '../BrandIcon/BrandIcon';
import { brandIcons } from '../BrandIcon/brandIcons';
import { useLinkContext } from '../LinkProvider/useLinkContext';
import './styles.scss';

// Rendered in this order. Each network's colour comes from its --parlour--color-{token}; X uses the
// twitter token.
const socialNetworks = [
    { prop: 'github', token: 'github' },
    { prop: 'x', token: 'twitter' },
    { prop: 'bluesky', token: 'bluesky' },
    { prop: 'linkedin', token: 'linkedin' },
    { prop: 'facebook', token: 'facebook' },
    { prop: 'instagram', token: 'instagram' },
    { prop: 'youtube', token: 'youtube' },
    { prop: 'tiktok', token: 'tiktok' },
] as const;

type SocialNetwork = (typeof socialNetworks)[number]['prop'];

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
    const socials = socialNetworks.filter(({ prop }) => urls[prop]);

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
                        {socials.map(({ prop, token }) => (
                            <li key={prop}>
                                <LinkComponent
                                    className={`parlour-site-footer__social-link parlour-site-footer__social-link--${token}`}
                                    href={urls[prop]}
                                    rel="me"
                                    aria-label={brandIcons[prop].title}
                                >
                                    <BrandIcon name={prop} />
                                </LinkComponent>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </footer>
    );
};
