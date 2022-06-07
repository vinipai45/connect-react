import React from 'react'
import './BottomNav.scss'
import { bottomNavItems } from '../../utils/side-menu-items'
import BottomNavLink from '../BottomNavLink/BottomNavLink'

const BottomNav = ({ active, setActive }) => {

    const handleActive = (key) => {
        setActive(key)
    }

    return (
        <div className='_bottom_nav'>
            {
                bottomNavItems.map((item) => (
                    <BottomNavLink
                        key={item.key}
                        className={
                            active == item.key ? '_bottom_nav_active_item' : ''
                        }
                        Icon={item.icon}
                        onClick={() => handleActive(item.key)} />
                ))
            }
        </div>
    )
}

export default BottomNav