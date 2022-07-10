import React from 'react'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton, Typography } from '@mui/material';

import colors from '../../utils/_colors.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AppDrawer = ({ open, setOpen, onClose }) => {

    let reduxUser = useSelector((s) => s.user.initial);

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
            <Box sx={{ margin: '20px auto', display: 'flex' }}>
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