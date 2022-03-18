import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {

    const history = useHistory()

    useEffect(() => {
        history.push('/login')
    }, [history])

    return (
        <div>
            Home
        </div>
    )
}

export default Home