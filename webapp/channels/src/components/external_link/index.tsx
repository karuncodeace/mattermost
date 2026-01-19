// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable @mattermost/use-external-link */

import React, {forwardRef} from 'react';

import type {ExternalLinkQueryParams} from 'components/common/hooks/use_external_link';
import {useExternalLink} from 'components/common/hooks/use_external_link';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    target?: string;
    rel?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    queryParams?: ExternalLinkQueryParams;
    location: string;
    children: React.ReactNode;
}

const ExternalLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
    const [href] = useExternalLink(props.href, props.location, props.queryParams);

    // Disable Mattermost external links
    const isMattermostLink = href && (
        href.includes('mattermost.com') ||
        href.includes('docs.mattermost.com') ||
        href.includes('forum.mattermost.com') ||
        href.includes('translate.mattermost.com') ||
        href.includes('academy.mattermost.com') ||
        href.includes('api.mattermost.com')
    );

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (isMattermostLink) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        if (typeof props.onClick === 'function') {
            props.onClick(e);
        }
    };

    return (
        <a
            {...props}
            ref={ref}
            target={props.target || '_blank'}
            rel={props.rel || 'noopener noreferrer'}
            onClick={handleClick}
            href={isMattermostLink ? '#' : href}
            style={isMattermostLink ? {pointerEvents: 'none', opacity: 0.6, cursor: 'not-allowed', ...props.style} : props.style}
        >
            {props.children}
        </a>
    );
});

export default ExternalLink;
