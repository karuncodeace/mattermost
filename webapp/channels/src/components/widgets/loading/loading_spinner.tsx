// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React from 'react';
import type {MessageDescriptor} from 'react-intl';
import {useIntl} from 'react-intl';

import {formatAsComponent} from 'utils/i18n';

type Props = {
    text?: React.ReactNode | MessageDescriptor;
    style?: React.CSSProperties;
}
const LoadingSpinner = ({text, style}: Props) => {
    const {formatMessage} = useIntl();

    return (
        <span
            id='loadingSpinner'
            className={classNames('LoadingSpinner', {'with-text': Boolean(text)})}
            style={style}
            data-testid='loadingSpinner'
        >
            <span
                className='snack-spinner'
                title={formatMessage({id: 'generic_icons.loading', defaultMessage: 'Loading Icon'})}
                aria-label={formatMessage({id: 'generic_icons.loading', defaultMessage: 'Loading Icon'})}
            >
                <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle
                        cx='8'
                        cy='8'
                        r='7'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeDasharray='44'
                        strokeDashoffset='11'
                        className='snack-spinner__circle'
                    />
                </svg>
            </span>
            {formatAsComponent(text)}
        </span>
    );
};

export default React.memo(LoadingSpinner);
