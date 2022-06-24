import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TopBar from '../../components/TopBar/TopBar'

import { auth_user, tabBreakpoint } from '../../utils/constants'
import UserDB from '../../services/UserDB/UserDB';

import './PeopleProfile.scss'
import colors from '../../utils/_colors.scss';

const PeopleProfile = () => {

    const { width, setActive } = useOutletContext();
    const userDB = new UserDB();

    let { username } = useParams()
    let navigate = useNavigate()
    const { uid } = JSON.parse(localStorage.getItem(auth_user))

    const [user, setUser] = useState()
    const [isLoggedInUser, setIsLoggedInUser] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            let result = await userDB.getByUsername(username)
            let user = await userDB.getById(uid)
            if (!user) {
                navigate('/logout')
            }

            if (result.length > 0) {
                if (!(user.username === result[0].username)) {
                    setIsLoggedInUser(false)
                }
                setUser(result[0])
            }
        };
        fetchUser()

    }, [])

    useEffect(() => {
        setActive('profile')
    })

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

                <img src={user?.avatar} alt=""
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
                    endIcon={<AddIcon />}
                    // onClick={handleEditProfileClick}

                    variant="contained">
                    Follow
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