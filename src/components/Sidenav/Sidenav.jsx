import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import SidenavLink from '../SidenavLink/SidenavLink'
import { sideMenuItems } from '../../utils/side-menu-items'

import { Box, Typography } from '@mui/material'

import './Sidenav.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Sidenav = ({ active, setActive }) => {

    const navigate = useNavigate()
    let reduxUser = useSelector((s) => s.user.initial);


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

            <Box sx={{
                marginTop: 'auto',
                display: 'flex'
            }}>
                <LazyLoadImage
                    src={reduxUser?.avatar}
                    effect='blur'
                    alt='alt'
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                    }}
                />
                <Box sx={{ display: 'block', ml: 2 }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    }}>
                        {reduxUser?.name}</Typography>
                    <Typography sx={{ fontSize: '12px' }}>@ {reduxUser?.username}</Typography>

                </Box>
            </Box>


        </div>
    )
}

const SidenavMini = ({ active, setActive }) => {

    const navigate = useNavigate()
    let reduxUser = useSelector((s) => s.user.initial);


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

            <Box sx={{
                marginTop: 'auto',
                display: 'flex'
            }}>
                <LazyLoadImage
                    src={reduxUser?.avatar}
                    effect='blur'
                    alt='alt'
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                    }}
                />
            </Box>
        </div>
    )
}

export { Sidenav, SidenavMini }