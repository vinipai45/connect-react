import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Box, Fab } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

import AppDrawer from '../../components/AppDrawer/AppDrawer';
import BottomNav from '../../components/BottomNav/BottomNav';
import { Sidenav, SidenavMini } from '../../components/Sidenav/Sidenav'

import { tabBreakpoint, mobileBreakpoint, auth_user } from '../../utils/constants';
import { user } from '../../redux/consts';
import UserDB from '../../services/UserDB/UserDB';
import colors from '../../utils/_colors.scss';
// import { useNavigate } from 'react-router-dom'

import './Layout.scss'
import MobileTopBar from '../../components/MobileTopBar/MobileTopBar';

const Layout = () => {
    let navigate = useNavigate()

    const [active, setActive] = useState('home')
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [openDrawer, setOpenDrawer] = useState(false)

    let dispatch = useDispatch()

    useEffect(() => {
        async function initSetup() {
            const handleWindowResize = () => {
                setHeight(window.innerHeight)
                setWidth(window.innerWidth)
            }
            window.addEventListener("resize", handleWindowResize);
            await getUserDetails()

            return () => window.removeEventListener("resize", handleWindowResize);

        }

        initSetup()
    }, [])

    const getUserDetails = async () => {
        let userDB = new UserDB()
        const { uid } = JSON.parse(localStorage.getItem(auth_user))
        let userDetails = await userDB.getById(uid)
        let connectionCount = await userDB.getConnectionCount(uid)

        let following = connectionCount?.following ? connectionCount.following.users?.length : 0
        let followers = connectionCount?.followers ? connectionCount.followers.users?.length : 0

        if (userDetails) {
            dispatch({
                type: user,
                payLoad: {
                    initial: { ...userDetails, followers, following }
                },
            });
        } else {
            navigate('/logout')
        }
    }

    const handleOpenDrawer = () => {
        setOpenDrawer(true)
    }


    return (
        <>
            <div className='_main_container'>
                {
                    width < mobileBreakpoint ?
                        <>
                            <AppDrawer open={openDrawer} setOpen={setOpenDrawer} />
                            {
                                active != 'profile' ?
                                    <MobileTopBar handleOpenDrawer={handleOpenDrawer} />
                                    : <></>
                            }
                        </> : <></>
                }
                <div style={{
                    width: width > tabBreakpoint ? '25%' : 'auto',
                    display: 'flex',
                    justifyContent: width < mobileBreakpoint ? 'normal' : 'flex-end',
                    boxShadow: `0 0 30px ${colors.lightGrey}`,
                }}>
                    {
                        width < mobileBreakpoint ?
                            <></>
                            :
                            width < tabBreakpoint ?
                                <SidenavMini active={active} setActive={setActive} />
                                :
                                <Sidenav active={active} setActive={setActive} />

                    }
                </div>
                <div style={{
                    height: '100%',
                    width: '100%',
                    // border: '1px solid #000'
                }}>
                    <Outlet context={{ width, height, setActive }} />
                    {
                        width < mobileBreakpoint ?
                            <BottomNav active={active} setActive={setActive} /> : <></>
                    }
                </div>
                {
                    width <= tabBreakpoint ?
                        active == 'home' ?
                            <Box sx={{
                                position: 'absolute',
                                right: 10,
                                bottom: width <= mobileBreakpoint ? 90 : 20

                            }}>
                                <Fab color="secondary" aria-label="edit">
                                    <CreateIcon />
                                </Fab>
                            </Box> : <></>
                        : <></>
                }




            </div>

        </>
    )
}

export default Layout