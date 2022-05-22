import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth_token, auth_user } from '../../utils/constants'

const Logout = () => {

    let navigate = useNavigate()


    useEffect(() => {
        localStorage.removeItem(auth_token)
        localStorage.removeItem(auth_user)
        navigate('/')
    }, [navigate])

    return (
        <></>
    )
}
export default Logout