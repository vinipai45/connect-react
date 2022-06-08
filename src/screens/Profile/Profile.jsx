import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import './Profile.scss'
import colors from '../../utils/_colors.scss';

import { maleAvatars } from '../../utils/helper-functions/avatars';
import { tabBreakpoint } from '../../utils/constants'

const Profile = () => {
  const { width } = useOutletContext();

  return (
    <div className='_profile_container'
      style={{
        paddingRight: width < 1200 ? 0 : '20%',
      }}
    >
      <Box sx={{
        width: '100%',
        height: '25%',
        backgroundColor: `${colors.primaryColor}`,
      }} />

      <Box sx={{ display: 'flex' }} >

        <img src={maleAvatars[0]} alt=""
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

          variant="outlined">
          Edit Profile
        </Button>
      </Box>

      <Box sx={{ margin: '0px 20px', }}>
        <Typography sx={{
          fontWeight: 600,
          fontSize: '19px',

        }} >
          Shambu Doe
        </Typography>

        <Typography sx={{
          fontSize: '14px',
        }} >
          @shambu_doe
        </Typography>

        <Typography sx={{
          fontSize: '14px',
          margin: '20px auto'
        }} >Lorem ipsum, dolor sit amet consectetur adipisicing elit</Typography>

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


    </div >
  )
}

export default Profile