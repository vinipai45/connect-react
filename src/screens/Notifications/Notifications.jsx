import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const Notifications = () => {

    let { setActive } = useOutletContext()

    useEffect(() => {
        setActive('notifications')
    }, [])



    return (
        <div>Notifications</div>
    )
}

export default Notifications