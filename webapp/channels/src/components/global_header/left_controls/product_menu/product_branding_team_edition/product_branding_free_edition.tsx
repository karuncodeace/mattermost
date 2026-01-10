// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import {getLicense} from 'mattermost-redux/selectors/entities/general';

import {LicenseSkus} from 'utils/constants';

const ProductBrandingFreeEditionContainer = styled.span`
    display: flex;
    align-items: center;

    > * + * {
        margin-left: 8px;
    }
`;

const StyledText = styled.span`
    color: rgba(var(--sidebar-text-rgb), 0.75);
    font-family: 'Metropolis', sans-serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
`;

const Badge = styled.span`
    display: none;
    align-self: center;
    padding: 2px 6px;
    border-radius: var(--radius-s);
    margin-left: 12px;
    background: rgba(var(--sidebar-text-rgb), 0.08);
    color: rgba(var(--sidebar-text-rgb), 0.75);
    font-family: 'Open Sans', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.025em;
    line-height: 16px;
`;

const ProductBrandingFreeEdition = (): JSX.Element => {
    const license = useSelector(getLicense);

    let badgeText = '';
    if (license?.SkuShortName === LicenseSkus.Entry) {
        badgeText = 'CODEACE EDITION';
    } else if (license?.IsLicensed === 'false') {
        badgeText = 'TEAM EDITION';
    }

    return (
        <ProductBrandingFreeEditionContainer tabIndex={-1}>
            <StyledText>SNACK</StyledText>
            <Badge>{badgeText}</Badge>
        </ProductBrandingFreeEditionContainer>
    );
};

export default ProductBrandingFreeEdition;
