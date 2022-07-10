import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Box, Typography, IconButton as MuiIconButton } from '@mui/material'

import SidenavLink from '../SidenavLink/SidenavLink'
import IconButton from '../IconButton/IconButton'

import './Sidenav.scss'
import colors from '../../utils/_colors.scss'
import { sideMenuItems } from '../../utils/side-menu-items'
import Logo from '../../assets/logo-primary.svg'



const Sidenav = ({ active, setActive, width }) => {

    const navigate = useNavigate()
    const location = useLocation();

    let reduxUser = useSelector((s) => s.user.initial);

    const handleActive = (key) => {
        setActive(key)
    }

    return (
        <div className='_sidenav'>
            <Box sx={{ ml: 1 }}>
                <MuiIconButton>
                    <img src={Logo} width={30} height={30} />
                </MuiIconButton>
            </Box>
            {
                sideMenuItems.map((item) => (
                    <SidenavLink
                        key={item.key}
                        className={
                            active === item.key ? '_sidenav_active_item' : ''
                        }
                        label={item.label}
                        Icon={active === item.key ? item.activeIcon : item.icon}
                        onClick={() => {
                            handleActive(item.key)
                            navigate(`/${item.key}`)
                        }} />
                ))
            }
            <IconButton
                sx={{ margin: '40px auto 20px auto', borderRadius: '20px', }}
                type="submit"
                textColor={colors.lightGrey}
                fontSize="18px"
                backgroundColor={colors.primaryColor}
                hoverBackgroundColor={colors.primaryColor}
                textCapital
                onClick={() => navigate('/compose/create-post', { state: { background: location } })}
                title="Create Post"
                variant="contained"
            />

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

const SidenavMini = ({ active, setActive, width }) => {

    const navigate = useNavigate()
    let reduxUser = useSelector((s) => s.user.initial);
    const [showPostModal, setShowPostModal] = useState(true)


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
                            active === item.key ? '_sidenav_mini_active_item' : ''
                        }
                        Icon={active === item.key ? item.activeIcon : item.icon}
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