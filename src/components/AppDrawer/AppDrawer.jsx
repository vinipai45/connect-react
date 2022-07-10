import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import colors from '../../utils/_colors.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AppDrawer = ({ open, setOpen, onClose }) => {

    let reduxUser = useSelector((s) => s.user.initial);
    let navigate = useNavigate();

    const drawerContent = (anchor) => (
        <Box
            sx={{ width: 250, p: 1 }}
            role="presentation"
        // onClick={() => setOpen(false)}   
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{
                    fontWeight: 'bold'
                }}>Account Info</Typography>
                <IconButton
                    sx={{ ml: 'auto', }}
                    onClick={() => setOpen(false)}
                >
                    <CloseOutlinedIcon sx={{ color: `${colors.dark}` }} />
                </IconButton>
            </Box>
            <Box sx={{ margin: '10px auto', display: 'flex' }}>
                <LazyLoadImage
                    src={reduxUser?.avatar}
                    effect='blur'
                    alt='alt'
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                    }}
                />

                <IconButton sx={{ ml: 'auto' }} onClick={() => navigate('/logout')}>
                    <LogoutIcon />
                </IconButton>

            </Box>
            <Box>
                <Typography sx={{
                    textTransform: 'capitalize',
                    fontWeight: 'bold'
                }}>
                    {reduxUser?.name}
                </Typography>
                <Typography sx={{
                    fontSize: '12px',
                    color: `${colors.textGrey}`
                }}>
                    @{reduxUser?.username}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>

                <Typography
                    sx={{
                        fontSize: '14px',
                    }}>
                    <b>{reduxUser?.following}</b>  Following
                </Typography>

                <Typography
                    sx={{
                        fontSize: '14px',
                    }}
                    ml={2}>
                    <b>{reduxUser?.followers}</b> Followers
                </Typography>
            </Box>
        </Box>
    );

    return (

        <Drawer
            anchor='left'
            open={open}
            onClose={() => setOpen(false)}
        >
            {drawerContent()}
        </Drawer>
    )
}

export default AppDrawer