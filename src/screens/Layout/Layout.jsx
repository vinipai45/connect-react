import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { LazyLoadImage } from 'react-lazy-load-image-component';


import AppDrawer from '../../components/AppDrawer/AppDrawer';
import BottomNav from '../../components/BottomNav/BottomNav';
import { Sidenav, SidenavMini } from '../../components/Sidenav/Sidenav'
import TopBar from '../../components/TopBar/TopBar';

import { tabBreakpoint, mobileBreakpoint, auth_user } from '../../utils/constants';
import { user } from '../../redux/consts';
import UserDB from '../../services/UserDB/UserDB';
import colors from '../../utils/_colors.scss';
// import { useNavigate } from 'react-router-dom'

import './Layout.scss'

const Layout = () => {
    let navigate = useNavigate()

    const [active, setActive] = useState('home')
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [openDrawer, setOpenDrawer] = useState(false)

    let dispatch = useDispatch()
    let reduxUser = useSelector((s) => s.user.initial);

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

        if (userDetails) {
            dispatch({
                type: user,
                payLoad: {
                    initial: { ...userDetails }
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
                                    <TopBar
                                        startIcon={
                                            <Box sx={{
                                                marginTop: 'auto',
                                                display: 'flex',
                                                cursor: 'pointer'
                                            }}
                                                onClick={handleOpenDrawer}
                                            >
                                                <LazyLoadImage
                                                    src={reduxUser?.avatar}
                                                    effect='blur'
                                                    alt='alt'
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                            </Box>
                                        }
                                        endIcon={<MailOutlinedIcon />}
                                    />
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



            </div>

        </>
    )
}

export default Layout