import React from 'react'
import { useNavigate } from 'react-router-dom';

import './TopBar.scss'
import colors from '../../utils/_colors.scss';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';

const TopBar = ({ title }) => {

    const navigate = useNavigate()

    return (
        <>
            <Box className="_topbar">
                <IconButton
                    sx={{ color: `${colors.dark}` }}
                    onClick={() => navigate('/home')}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography sx={{
                    marginLeft: '5px',
                    fontWeight: 700,
                    fontSize: '18px'
                }} >{title}</Typography>
            </Box>
        </>
    )
}

export default TopBar