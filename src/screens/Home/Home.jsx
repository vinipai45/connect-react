import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { isUserLoggedIn } from '../../helper-functions/checkUserLoggedIn'


const Home = () => {
    let navigate = useNavigate()

    useEffect(() => {

        if (!isUserLoggedIn()) {
            navigate('/login')
        }



    }, [])

    return (
        <div>
            Home
        </div>
    )
}

export default Home