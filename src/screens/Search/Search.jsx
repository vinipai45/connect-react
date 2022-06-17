import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import { Box, Pagination, Stack } from '@mui/material'


import SearchBar from '../../components/SearchBar/SearchBar'
import SearchItem from '../../components/SearchItem/SearchItem'
import TopBar from '../../components/TopBar/TopBar'
import images from '../../utils/helper-functions/images'

import './Search.scss'

const Search = () => {

    const [results, setResults] = useState([1, 2, 3, 1, 2, 3, 1, 2, 3,])

    let { width, setActive } = useOutletContext()

    useEffect(() => {
        setActive('search')
    }, [])


    return (
        <div className='_search_container'
            style={{
                paddingRight: width < 1200 ? 0 : '20%',
            }}
        >
            <TopBar title="Search" />
            <Box style={{ margin: '20px' }}>
                <SearchBar style={{ width: '100%' }} />

            </Box>
            {
                results?.length >= 1 ?
                    <Box style={{ margin: '20px' }} >
                        {
                            results?.map((item, index) => (
                                <>
                                    <SearchItem />
                                    {index == results.length - 1 ? <></> : <hr />}
                                </>
                            ))
                        }

                    </Box> :
                    <Box style={{ margin: '20px' }}>
                        <img style={{ overflow: 'hidden', width: '100%' }} src={images.search_isometric} alt="no result svg" />
                    </Box>
            }

            {/* <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Pagination count={10} color="primary" />
            </Box> */}
        </div>
    )
}

export default Search