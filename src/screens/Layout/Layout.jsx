import React, { useEffect, useState } from 'react'
import BottomNav from '../../components/BottomNav/BottomNav';
import { Sidenav, SidenavMini } from '../../components/Sidenav/Sidenav'
import { Outlet } from 'react-router-dom';

import { tabBreakpoint, mobileBreakpoint } from '../../utils/constants';
// import { useNavigate } from 'react-router-dom'

import './Layout.scss'
import colors from '../../utils/_colors.scss';

const Layout = ({ route }) => {
    // let navigate = useNavigate()

    const [active, setActive] = useState('home')
    const [width, setWidth] = React.useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, [])


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
                    width: width < tabBreakpoint ? '100%' : '60%',
                    // border: '1px solid #000'
                }}>
                    <Outlet />

                </div>



            </div>
            {
                width < mobileBreakpoint ?
                    <BottomNav active={active} setActive={setActive} /> : <></>
            }
        </>
    )
}

export default Layout