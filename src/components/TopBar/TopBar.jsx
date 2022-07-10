import React from 'react'
import { useNavigate } from 'react-router-dom';

import './TopBar.scss'
import colors from '../../utils/_colors.scss';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';

const TopBar = ({ title, style, onBackClick, startIcon, endIcon }) => {

    const navigate = useNavigate()

    return (
        <>
            <Box className="_topbar" style={style}>
                {
                    startIcon ? startIcon :
                        <IconButton
                            sx={{ color: `${colors.dark}` }}
                            onClick={onBackClick ? onBackClick : () => navigate('/home')}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                }
                <Typography sx={{
                    marginLeft: '5px',
                    fontWeight: 700,
                    fontSize: '18px',
                    textTransform: 'capitalize'
                }} >{title}</Typography>
                <Box sx={{ ml: 'auto' }}>
                    <IconButton>
                        {
                            endIcon ? endIcon : <></>
                        }
                    </IconButton>
                </Box>

            </Box>
        </>
    )
}

export default TopBar