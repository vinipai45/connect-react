import React from 'react'
import { useNavigate } from 'react-router-dom'

import SidenavLink from '../SidenavLink/SidenavLink'
import { sideMenuItems } from '../../utils/side-menu-items'

import './Sidenav.scss'

const Sidenav = ({ active, setActive }) => {

    const navigate = useNavigate()

    const handleActive = (key) => {
        setActive(key)
    }

    return (
        <div className='_sidenav'>
            {
                sideMenuItems.map((item) => (
                    <SidenavLink
                        key={item.key}
                        className={
                            active === item.key ? '_sidenav_active_item' : ''
                        }
                        label={item.label}
                        Icon={item.icon}
                        onClick={() => {
                            handleActive(item.key)
                            navigate(`/${item.key}`)
                        }} />
                ))
            }
        </div>
    )
}

const SidenavMini = ({ active, setActive }) => {

    const navigate = useNavigate()

    const handleActive = (key) => {
        setActive(key)
    }

    return (
        <div className='_sidenav_mini'>
            {
                sideMenuItems.map((item) => (
                    <SidenavLink
                        key={item.key}
                        className={
                            active === item.key ? '_sidenav_active_item' : ''
                        }
                        Icon={item.icon}
                        onClick={() => {
                            handleActive(item.key)
                            navigate(`/${item.key}`)
                        }} />
                ))
            }
        </div>
    )
}

export { Sidenav, SidenavMini }