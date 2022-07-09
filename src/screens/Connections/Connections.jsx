import React, { useState, useEffect } from 'react'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Box, Tab, Tabs, Typography } from '@mui/material'

import TopBar from '../../components/TopBar/TopBar'
import TabPanel from '../../components/TabPanel/TabPanel'

import { CONNECTIONS } from '../../utils/constants'
import UserDB from '../../services/UserDB/UserDB'
import SearchItem from '../../components/SearchItem/SearchItem'



const Connections = () => {

    let navigate = useNavigate()
    let userDB = new UserDB()
    let reduxUser = useSelector((s) => s.user.initial);
    const { width, setActive } = useOutletContext();

    const [queryParams, setQueryParams] = useSearchParams();
    const [value, setValue] = useState();
    const [followingList, setFollowingList] = useState([])
    const [followersList, setFollowersList] = useState([])

    useEffect(() => {
        let query = queryParams.get("section")
        if (!query) {
            navigate('/profile')
        }
        if (query === CONNECTIONS.FOLLOWERS) {
            setValue(0)
        }
        if (query === CONNECTIONS.FOLLOWING) {
            setValue(1)
        }
    }, [])

    useEffect(() => {
        if (value === 0) {
            getFollowersList()
        }
        if (value === 1) {
            getFollowingList()
        }
    }, [value])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleBackClick = () => {
        navigate('/profile')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getFollowersList = () => {
        userDB.getFollowersDetails(reduxUser.id).then(res => {
            if (res) {
                setFollowersList(res)
                return
            }
            setFollowersList([])
        })
    }

    const getFollowingList = () => {
        userDB.getFollowingDetails(reduxUser.id).then(res => {
            if (res) {
                setFollowingList(res)
                return
            }
            setFollowingList([])
        })
    }


    return (
        <div className='_connection_container'
            style={{
                paddingRight: width < 1200 ? 0 : '20%',
            }}
        >
            <TopBar title="Connections" onBackClick={handleBackClick} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Followers" {...a11yProps(0)} />
                    <Tab label="Following" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                {
                    followersList.length > 0 ?
                        followersList.map((item, index) => (
                            <div key={item?.username}>
                                <SearchItem item={item} />
                                {index === followersList?.length - 1 ? <></> : <hr />}
                            </div>
                        ))
                        : <Typography>you dont have any followers right now!</Typography>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    followingList.length > 0 ?
                        followingList.map((item, index) => (
                            <div key={item?.username}>
                                <SearchItem item={item} />
                                {index === followingList?.length - 1 ? <></> : <hr />}
                            </div>
                        ))
                        : <Typography>you are not following anyone right now!</Typography>
                }
            </TabPanel>
        </div>
    )
}

export default Connections