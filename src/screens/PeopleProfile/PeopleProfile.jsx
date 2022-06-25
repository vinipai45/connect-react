import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import TopBar from '../../components/TopBar/TopBar'

import { tabBreakpoint } from '../../utils/constants'
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
    const [isFollowing, setIsFollowing] = useState(false)


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

    useEffect(() => {

        if (currentUser && user) {
            async function fetchData() {
                if (!(currentUser.id === user?.id)) {
                    setIsLoggedInUser(false)
                }
                console.log(currentUser.id, "currentUser.id")
                console.log(user?.id, "user?.id")
                let followStatus = await userDB.isFollowing(currentUser.id, user?.id)
                console.log(followStatus, "followStatus")
                setIsFollowing(followStatus)
            }
            fetchData()

        }
    }, [user, currentUser])


    const handleFollow = async () => {
        let result = await userDB.sendFollowRequest(reduxUser.id, user.id)
        if (result) {
            Toast.fire({
                icon: 'success',
                title: `success`
            })
        }
    }

    return (
        <div className='_people_profile_container'
            style={{
                paddingRight: width < 1200 ? 0 : '20%',
            }}
        >
            <TopBar title={user?.name ? user?.name : "Back To Home"}
                onBackClick={() => { navigate('/search') }}
            />

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

                {!isLoggedInUser ? <Button
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
                    endIcon={isFollowing ? <CheckIcon /> : <AddIcon />}
                    onClick={handleFollow}

                    variant="contained">
                    {isFollowing ? "Following" : "Follow"}
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


        </div>
    )
}

export default PeopleProfile