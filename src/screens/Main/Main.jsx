import React from 'react'
import Sidenav from '../../components/Sidenav/Sidenav'
import colors from '../../utils/_colors.scss';
// import { useNavigate } from 'react-router-dom'


const Main = ({ route }) => {
    // let navigate = useNavigate()

    return (
        <>
            <div style={{
                width: '25%',
                display: 'flex',
                justifyContent: 'flex-end',
                boxShadow: `0 0 30px ${colors.lightGrey}`,
            }}>
                <Sidenav />
            </div>
        </>
    )
}

export default Main