import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import TopBar from '../../components/TopBar/TopBar'

const Notifications = () => {

    let { setActive } = useOutletContext()

    useEffect(() => {
        setActive('notifications')
    }, [])



    return (
        <>
            <TopBar title="Notifications" />

        </>
    )
}

export default Notifications