import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import { Box } from '@mui/material'
import InfiniteScroll from "react-infinite-scroll-component";

import SearchBar from '../../components/SearchBar/SearchBar'
import SearchItem from '../../components/SearchItem/SearchItem'
import TopBar from '../../components/TopBar/TopBar'
import images from '../../utils/helper-functions/images'

import './Search.scss'

import UserDB from '../../services/UserDB/UserDB';
import { mobileBreakpoint } from '../../utils/constants';

const Search = () => {

    const [searchText, setSearchText] = useState("")
    const [results, setResults] = useState([])
    const [selectedUser, setSelectedUser] = useState()

    let navigate = useNavigate()

    let userDB = new UserDB()
    let { width, height, setActive } = useOutletContext()

    useEffect(() => {
        setActive('search')
    }, [setActive])

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        async function getSearchUsers() {
            let userResults = await userDB.search(searchText)
            setResults(userResults)
        }
        getSearchUsers()
    }, [searchText])

    const fetchMoreData = () => {
        // if (results.length >= 100) {
        //     this.setState({ hasMore: false });
        //     return;
        // }
        // // a fake async api call like which sends
        // // 20 more records in .5 secs
        // setTimeout(() => {
        //     setResults(
        //         results.concat(Array.from({ length: 10 }))
        //     );
        // }, 500);
    };


    useEffect(() => {
        if (selectedUser) {
            navigate(`/profile/${selectedUser?.username}`)
        }
    }, [selectedUser])

    return (
        <InfiniteScroll
            dataLength={results.length}
            next={fetchMoreData}
            hasMore={true}
            height={height}

        >
            <div className='_search_container'
                style={{
                    paddingRight: width < 1200 ? 0 : '20%',
                }}
            >
                {
                    width > mobileBreakpoint ?
                        <TopBar title="Search" />
                        : <></>
                }
                <Box style={{ margin: '20px' }}>
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        style={{ width: '100%' }}
                        onChange={handleSearchTextChange}
                    />
                </Box>
                {
                    results?.length >= 1 ?
                        <Box style={{ margin: '20px' }} >

                            {
                                results.map((item, index) => (
                                    <div key={item?.username}>
                                        <SearchItem item={item} setSelectedUser={setSelectedUser} />
                                        {index === results?.length - 1 ? <></> : <hr />}
                                    </div>
                                ))
                            }
                        </Box>

                        :
                        <Box >
                            <img style={{ overflow: 'hidden', width: '100%' }} src={images.search_isometric} alt="no result svg" />
                        </Box>
                }

                {/* <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Pagination count={10} color="primary" />
            </Box> */}
            </div>
        </InfiniteScroll>
    )
}

export default Search