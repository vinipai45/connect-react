import React from 'react'
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import colors from '../../utils/_colors.scss';
import TopBar from '../TopBar/TopBar'



const MobileTopBar = ({ handleOpenDrawer }) => {

    let reduxUser = useSelector((s) => s.user.initial);

    return (
        <TopBar
            startIcon={
                <Box sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    cursor: 'pointer'
                }}
                    onClick={handleOpenDrawer}
                >
                    <LazyLoadImage
                        src={reduxUser?.avatar}
                        effect='blur'
                        alt='alt'
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                        }}
                    />
                </Box>
            }
            endIcon={<SendIcon color='secondary' />}
        />
    )
}

export default MobileTopBar