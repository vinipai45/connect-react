import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import BottomNav from '../../components/BottomNav/BottomNav';
import { Sidenav, SidenavMini } from '../../components/Sidenav/Sidenav'

import { tabBreakpoint, mobileBreakpoint, auth_user } from '../../utils/constants';
import { user } from '../../redux/consts';
import UserDB from '../../services/UserDB/UserDB';
// import { useNavigate } from 'react-router-dom'

import './Layout.scss'
import colors from '../../utils/_colors.scss';

const Layout = () => {
    let navigate = useNavigate()

    const [active, setActive] = useState('home')
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    let dispatch = useDispatch()

    useEffect(async () => {

        const handleWindowResize = () => {
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleWindowResize);
        await getUserDetails()

        return () => window.removeEventListener("resize", handleWindowResize);


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


    return (
        <>
            <div className='_main_container'>
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