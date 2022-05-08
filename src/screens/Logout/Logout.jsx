import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    let navigate = useNavigate()


    useEffect(() => {
        sessionStorage.removeItem("Shambu Auth Token")
        sessionStorage.removeItem("Shambu User")
        navigate('/')
    }, [])

    return (
        <></>
    )
}
export default Logout