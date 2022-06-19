import React, { useState } from 'react'
import { Box, TextField, IconButton, Tooltip } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import colors from '../../utils/_colors.scss';


const EditProfile = ({ data, style, screenWidth, updateInputs, setUpdateInputs }) => {


    const handleChange = (e) => {

    }


    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                overflow: 'auto'
            }}
            style={style}
        >

            <Box sx={{
                width: '100%',
                height: screenWidth < 480 ? '20%' : '40%',
                backgroundColor: `${colors.primaryColor}`,
            }} />
            <Box sx={{ position: 'relative' }}>
                <img src={updateInputs?.avatar} alt=""
                    style={{
                        border: `1px solid ${colors.white}`,
                        background: `${colors.white}`,
                        borderRadius: '50%',
                        marginTop: '-30px',
                        marginLeft: '20px',
                        width: '80px',
                        height: '80px',
                        filter: 'brightness(80%)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: -15,
                        bottom: 0,
                        left: 35,
                        right: 0,
                        height: '100%',
                        transition: '.3s ease',
                    }}
                >
                    <Tooltip title="Add Photo">
                        <IconButton size='large' sx={{ color: '#fff', background: 'transparent' }}>
                            <CameraAltIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Box>

            </Box>
            <Box
                sx={{ p: 2, pb: 10 }}
            >
                <TextField
                    autoComplete='off'
                    label="name"
                    variant="outlined"
                    sx={{ width: '100%', mt: 2 }}
                    value={updateInputs?.name}
                    inputProps={{ maxLength: 32 }}
                />
                <TextField
                    autoComplete='off'
                    label="username"
                    variant="outlined"
                    value={updateInputs?.username}
                    sx={{ width: '100%', mt: 2 }}
                    inputProps={{ maxLength: 32 }}
                />
                <TextField
                    autoComplete='off'
                    label="bio"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={updateInputs?.bio}
                    sx={{ width: '100%', mt: 2 }}
                    inputProps={{ maxLength: 100 }}
                />
            </Box>
        </Box>
    )
}

export default EditProfile