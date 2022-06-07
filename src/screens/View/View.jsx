import React from 'react'
import Home from '../Home/Home';
import Profile from '../Profile/Profile';

const View = ({ active }) => {

    return (
        <div style={{
            height: '100%'
        }}>
            {
                active === 'profile' ? <Profile />
                    : active === 'home' ? <Home />
                        :
                        <></>
            }
        </div>
    )
}

export default View