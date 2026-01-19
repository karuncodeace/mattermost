// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React from 'react';
import type {ReactNode, CSSProperties} from 'react';
import {useIntl} from 'react-intl';

type Props = {
    position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'inherit';
    style?: CSSProperties;
    message?: ReactNode;
    className?: string;
    centered?: boolean;
}

function LoadingScreen({message, position = 'relative', style, className = '', centered = false}: Props) {
    const {formatMessage} = useIntl();

    return (
        <div
            className={classNames('loading-screen', className, {
                'loading-screen--in-middle': centered,
            })}
            style={{position, ...style}}
        >
            <div className='loading__content'>
                <div className='snack-loading-spinner'>
                    <svg
                        width='40'
                        height='40'
                        viewBox='0 0 40 40'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <circle
                            cx='20'
                            cy='20'
                            r='18'
                            stroke='currentColor'
                            strokeWidth='3'
                            strokeLinecap='round'
                            strokeDasharray='113'
                            strokeDashoffset='28'
                            className='snack-loading-spinner__circle'
                        />
                    </svg>
                </div>
                <p>
                    {message || formatMessage({id: 'loading_screen.loading', defaultMessage: 'Loading'})}
                </p>
            </div>
        </div>
    );
}

export default LoadingScreen;
