import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Tooltip } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

import TopBar from '../../components/TopBar/TopBar';
import AppModal from '../../components/AppModal/AppModal';
import EditProfile from '../../components/EditProfile/EditProfile';

import './Profile.scss'
import colors from '../../utils/_colors.scss';

import UserDB from '../../services/UserDB/UserDB';
import { auth_user, tabBreakpoint } from '../../utils/constants'

const Profile = () => {
  const { width, setActive } = useOutletContext();
  const { uid } = JSON.parse(localStorage.getItem(auth_user))

  let navigate = useNavigate()
  const userDB = new UserDB();

  const [user, setUser] = useState()
  const [updateInputs, setUpdateInputs] = useState()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setActive('profile')
  }, [])

  useEffect(() => {
    async function getUserDetail() {
      let user = await userDB.getById(uid)
      if (user) {
        setUser(user)
      } else {
        navigate('/logout')
      }
    }
    getUserDetail()

  }, [])

  useEffect(() => {
    setUpdateInputs({
      avatar: user?.avatar,
      name: user?.name,
      username: user?.username,
      bio: user?.bio
    })
  }, [user])

  return (
    <div className='_profile_container'
      style={{
        paddingRight: width < 1200 ? 0 : '20%',
      }}
    >
      <TopBar title={user?.name} />
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
            height: '130px'
          }}
        />

        <Button
          sx={{
            marginLeft: 'auto',
            marginRight: width < 1200 ? '10px' : '',
            marginTop: '20px',
            marginBottom: width < tabBreakpoint ? '30px' : '20px',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            borderRadius: '20px',
            color: `${colors.dark}`,
            borderColor: `${colors.mediumGrey}`,
            '&:hover': {
              borderColor: `${colors.dark}`,
            },
          }}
          onClick={() => setOpenModal(true)}

          variant="outlined">
          Edit Profile
        </Button>
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
            "&:hover": {
              cursor: 'pointer',
              textDecoration: 'underline'
            },
          }}> <b>60</b>  Following
          </Typography>

          <Typography sx={{
            fontSize: '16px',
            "&:hover": {
              cursor: 'pointer',
              textDecoration: 'underline'
            },
          }} ml={2}><b>73</b> Follower
          </Typography>
        </Box>



      </Box>

      {
        openModal ?
          <AppModal
            open={openModal}
            screenWidth={width}
            onClose={() => setOpenModal(false)}
          >
            <TopBar
              title="Edit Profile"
              onBackClick={() => setOpenModal(false)}
              startIcon={
                <IconButton size='large' onClick={() => setOpenModal(false)} >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              endIcon={
                <Tooltip title="Save">
                  <IconButton size='large' sx={{ color: '#388e3c' }}>
                    <CheckCircleIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              }
            />

            <EditProfile screenWidth={width} data={user} updateInputs={updateInputs} setUpdateInputs={setUpdateInputs} />
          </AppModal> : <></>
      }

    </div >
  )
}

export default Profile