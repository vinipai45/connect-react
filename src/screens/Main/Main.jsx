import React, { useEffect, useState } from 'react'
import { Sidenav, SidenavMini } from '../../components/Sidenav/Sidenav'
import colors from '../../utils/_colors.scss';
import View from '../View/View';
// import { useNavigate } from 'react-router-dom'


const Main = ({ route }) => {
    // let navigate = useNavigate()

    const [active, setActive] = useState('profile')
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 960;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, [])


    return (
        <div style={{
            display: 'flex',
        }}>
            <div style={{
                width: width > breakpoint ? '25%' : 'auto',
                display: 'flex',
                justifyContent: 'flex-end',
                boxShadow: `0 0 30px ${colors.lightGrey}`,
            }}>
                {
                    width > breakpoint ?
                        <Sidenav active={active} setActive={setActive} />
                        :
                        <SidenavMini active={active} setActive={setActive} />

                }
            </div>
            <View active={active} />


        </div>
    )
}

export default Main