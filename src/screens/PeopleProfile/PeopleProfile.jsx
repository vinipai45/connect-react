import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TopBar from '../../components/TopBar/TopBar'

import { FOLLOW_STATUS, mobileBreakpoint, tabBreakpoint } from '../../utils/constants'
import UserDB from '../../services/UserDB/UserDB';

import './PeopleProfile.scss'
import colors from '../../utils/_colors.scss';


const PeopleProfile = () => {

    const { width, setActive } = useOutletContext();
    let { username } = useParams()

    const userDB = new UserDB();
    let navigate = useNavigate()


    let Toast = useSelector((s) => s.toast);
    let reduxUser = useSelector((s) => s.user.initial);

    const [user, setUser] = useState()
    const [currentUser, setCurrentUser] = useState()
    const [isLoggedInUser, setIsLoggedInUser] = useState(true)
    const [isFollowing, setIsFollowing] = useState("")


    const fetchUser = () => {
        userDB.getByUsername(username).then(result => {
            if (result.length > 0) {
                setUser(result[0])
            }
        })
    };

    useEffect(() => {
        setActive('profile')
        fetchUser()
    }, [])

    useEffect(() => {
        if (reduxUser.id.length > 0) {
            setCurrentUser(reduxUser)
        }
    }, [reduxUser])

    const checkFollowStatus = async (currentUser, user) => {
        let followStatus = await userDB.isFollowing(currentUser.id, user?.id)
        setIsFollowing(followStatus)
    }

    useEffect(() => {

        if (currentUser && user) {
            async function fetchData() {
                if (!(currentUser.id === user?.id)) {
                    setIsLoggedInUser(false)
                }
                await checkFollowStatus(currentUser, user)
            }
            fetchData()

        }
    }, [user, currentUser])

    useEffect(() => {
        console.log(isFollowing)
    }, [isFollowing])


    const handleFollow = async () => {
        try {

            let result = null

            if (isFollowing === FOLLOW_STATUS.FOLLOW) {

                await userDB.sendFollowRequest(reduxUser.id, user.id)

                Toast.fire({
                    icon: 'info',
                    title: `sent request`
                })
            }

            if (isFollowing === FOLLOW_STATUS.REQUESTED) {

                await userDB.cancelFollowRequest(reduxUser.id, user.id)
            }

            if (isFollowing === FOLLOW_STATUS.FOLLOWING) {

                await userDB.unfollow(reduxUser.id, user.id)
            }

            result = await checkFollowStatus(reduxUser, user)

        } catch (err) {
            console.log('PeopleProfile -> handleFollow', err)
        }

    }

    return (
        <div className='_people_profile_container'
            style={{
                paddingRight: width < 1200 ? 0 : '20%',
            }}
        >
            {
                width > mobileBreakpoint ?
                    <TopBar title={user?.name ? user?.name : "Back To Home"}
                        onBackClick={() => { navigate('/search') }}
                    />
                    : <></>
            }

            <Box sx={{
                width: '100%',
                height: '25%',
                backgroundColor: `${colors.primaryColor}`,
            }} />

            <Box sx={{ display: 'flex' }} >

                <LazyLoadImage
                    src={user?.avatar} // use normal <img> attributes as props
                    alt="alt"
                    effect="blur"
                    style={{
                        border: `1px solid ${colors.white}`,
                        background: `${colors.white}`,
                        borderRadius: '50%',
                        marginTop: '-70px',
                        marginLeft: '20px',
                        width: '130px',
                        height: '130px',
                        objectFit: 'cover',
                    }}
                />

                {
                    !isLoggedInUser ?
                        <Button
                            sx={{
                                marginLeft: 'auto',
                                marginRight: width < 1200 ? '10px' : '',
                                marginTop: '20px',
                                marginBottom: width < tabBreakpoint ? '30px' : '20px',
                                textTransform: 'capitalize',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                color: `${colors.white}`,
                                borderColor: `${colors.mediumGrey}`,
                                '&:hover': {
                                    borderColor: `${colors.dark}`,
                                },
                            }}
                            // disabled={isFollowing === FOLLOW_STATUS.REQUESTED}
                            endIcon={
                                isFollowing === FOLLOW_STATUS.FOLLOWING ? <CheckIcon />
                                    :
                                    isFollowing === FOLLOW_STATUS.FOLLOW ?
                                        <AddIcon />
                                        : <CloseIcon />
                            }
                            onClick={handleFollow}

                            variant="contained">
                            {
                                isFollowing === FOLLOW_STATUS.REQUESTED ? 'Requested'
                                    : isFollowing === FOLLOW_STATUS.FOLLOWING ? "Following"
                                        : "Follow"
                            }
                        </Button> : <></>}
            </Box>

            <Box sx={{ margin: '0px 20px', }}>
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: '19px',
                    textTransform: 'capitalize'
                }} >
                    {user?.name}
                </Typography>

                <Typography sx={{
                    fontSize: '14px',
                }} >
                    {user?.username}
                </Typography>

                <Typography sx={{
                    fontSize: '14px',
                    margin: '20px auto'
                }} >{user?.bio}</Typography>

                <Box sx={{ display: 'flex' }}>

                    <Typography sx={{
                        fontSize: '16px',
                    }}> <b>60</b>  Following
                    </Typography>

                    <Typography sx={{
                        fontSize: '16px'
                    }} ml={2}><b>73</b> Follower
                    </Typography>
                </Box>



            </Box>


        </div >
    )
}

export default PeopleProfile