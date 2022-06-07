import React, { useEffect, useState } from 'react'
import BottomNav from '../../components/BottomNav/BottomNav';
import { Sidenav, SidenavMini } from '../../components/Sidenav/Sidenav'
import View from '../View/View';

import { tabBreakpoint, mobileBreakpoint } from '../../utils/constants';
// import { useNavigate } from 'react-router-dom'

import './Main.scss'
import colors from '../../utils/_colors.scss';

const Main = ({ route }) => {
    // let navigate = useNavigate()

    const [active, setActive] = useState('profile')
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
                <View active={active} width={width} />



            </div>
            {
                width < mobileBreakpoint ?
                    <BottomNav active={active} setActive={setActive} /> : <></>
            }
        </>
    )
}

export default Main