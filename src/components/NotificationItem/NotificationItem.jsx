import React from 'react'
import colors from '../../utils/_colors.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './NotificationItem.scss'

const NotificationItem = ({ item, handleAcceptRequest, handleRejectRequest }) => {


    return (
        <Box sx={{ display: 'flex' }} className="_notification_item_container">
            <LazyLoadImage
                className='_notification_item_img'
                src={item?.avatar}// use normal <img> attributes as props
                alt="alt"
                effect="blur"
                style={{
                    border: `1px solid ${colors.white}`,
                    background: `${colors.white}`,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                }}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '10px',
                justifyContent: 'center',

            }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        textTransform: 'capitalize',
                        "&:hover": {
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        },
                    }}
                >{item?.name}</Typography>
                <Typography sx={{
                    fontSize: '12px',
                }}>{item?.username}</Typography>
            </Box>

            <Box sx={{ display: 'flex', ml: 'auto' }}>
                <Tooltip title="Accept">
                    <IconButton
                        size='large'
                        sx={{ color: `${colors.success}` }}
                        onClick={() => handleAcceptRequest(item)}
                    >
                        <CheckCircleIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                    <IconButton
                        size='large'
                        sx={{ color: `${colors.danger}` }}
                        onClick={() => handleRejectRequest(item)}
                    >
                        <CancelIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Box>

        </Box>
    )
}

export default NotificationItem