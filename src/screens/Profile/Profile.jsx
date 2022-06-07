import React from 'react'
import { Box } from '@mui/material';

import './Profile.scss'
import colors from '../../utils/_colors.scss';

import { maleAvatars } from '../../utils/helper-functions/avatars';

const Profile = ({ width }) => {
  return (
    <div className='_profile_container'>
      <Box sx={{
        width: '100%',
        height: '25%',
        backgroundColor: `${colors.primaryColor}`,
      }} />

      <img src={maleAvatars[0]} alt=""
        style={{
          border: `1px solid ${colors.white}`,
          background: `${colors.white}`,
          borderRadius: '50%',
          marginTop: '-70px',
          marginLeft: '20px',
          width: '150px'
        }}
      />


    </div>
  )
}

export default Profile