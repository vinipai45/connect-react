import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom'

import InfiniteScroll from "react-infinite-scroll-component";
import TopBar from '../../components/TopBar/TopBar'

import './Notifications.scss'
import { Box, Typography } from '@mui/material';
import NotificationItem from '../../components/NotificationItem/NotificationItem';

import UserDB from '../../services/UserDB/UserDB';

const Notifications = () => {

    let { setActive, height, width } = useOutletContext()
    const userDB = new UserDB()

    let reduxUser = useSelector((s) => s.user.initial);
    let Toast = useSelector((s) => s.toast);

    const [results, setResults] = useState([])


    useEffect(() => {
        setActive('notifications')
    }, [])

    const fetchPendingList = async (reduxUser) => {
        if (reduxUser?.id?.length > 0) {
            let userResults = []

            let userIds = await userDB.listPendingRequests(reduxUser.id)

            for (let i = 0; i < userIds.length; i++) {

                let res = await userDB.getById(userIds[i])
                if (res) {
                    userResults.push(res)
                }

            }

            setResults(userResults)

        }
    }



    useEffect(() => {
        async function fetchData() {
            await fetchPendingList(reduxUser)
        }
        fetchData()
    }, [reduxUser])


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

    const handleAcceptRequest = (sender) => {
        userDB.acceptFollowRequest(sender.id, reduxUser.id).then((res) => {
            fetchPendingList(reduxUser).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: `${sender.name} is following you now`
                })
            })
        })
    }

    return (
        <InfiniteScroll
            dataLength={results.length}
            next={fetchMoreData}
            hasMore={true}
            height={height}

        >
            <div className='_notification_container'
                style={{
                    paddingRight: width < 1200 ? 0 : '20%',
                }}
            >
                <TopBar title="Notifications" />


                {
                    results?.length >= 1 ?
                        <Box style={{ margin: '20px' }} >
                            <Typography sx={{
                                mt: 2,
                                mb: 2,
                                fontWeight: 'bold',

                            }}>
                                Follow Requests
                            </Typography>
                            {
                                results.map((item, index) => (
                                    <div key={item?.username}>
                                        <NotificationItem item={item} handleAcceptRequest={handleAcceptRequest} />
                                        {index === results?.length - 1 ? <></> : <hr />}
                                    </div>
                                ))
                            }
                        </Box>

                        :
                        <Box style={{ margin: '20px' }}>
                            No notifications to show
                        </Box>
                }
            </div>

        </InfiniteScroll>
    )
}

export default Notifications