import React from 'react'
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

const View = ({ active }) => {

    return (
        <>
            {
                active === 'profile' ? <Profile />
                    : active === 'home' ? <Home />
                        :
                        <></>
            }
        </>
    )
}

export default View