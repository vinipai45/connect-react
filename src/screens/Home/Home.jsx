import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { Typography } from '@mui/material'

const Home = () => {
    let { setActive } = useOutletContext()

    useEffect(() => {
        setActive('home')
    }, [])

    return (
        <div style={{
            height: '80%'
        }}>
            <Typography>Home</Typography>
        </div>
    )
}

export default Home