import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import TopBar from '../../components/TopBar/TopBar'

const Search = () => {

    let { setActive } = useOutletContext()

    useEffect(() => {
        setActive('search')
    }, [])


    return (
        <>
            <TopBar title="Search" />

        </>
    )
}

export default Search