import React from 'react'

import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import { tabBreakpoint, mobileBreakpoint } from '../../utils/constants';

const View = ({ active, width }) => {

    console.log(width)

    return (
        <div style={{
            height: '100%',
            width: width < tabBreakpoint ? '100%' : '60%',
            border: '1px solid #000'
        }}>
            {
                active === 'profile' ? <Profile width={width} />
                    : active === 'home' ? <Home />
                        :
                        <></>
            }
        </div>
    )
}

export default View