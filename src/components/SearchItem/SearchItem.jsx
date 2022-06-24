import React from 'react'
import colors from '../../utils/_colors.scss';
import { Box, Typography } from '@mui/material';

const SearchItem = ({ item, handleProfileVisit, setSelectedUser }) => {


    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="img"
                sx={{
                    border: `1px solid ${colors.white}`,
                    background: `${colors.white}`,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    "&:hover": {
                        cursor: 'pointer',
                    },
                }}
                alt=""
                src={item?.avatar}
                onClick={() => {
                    setSelectedUser(item)
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
                    onClick={() => {
                        setSelectedUser(item)
                    }}
                >{item?.name}</Typography>
                <Typography sx={{
                    fontSize: '12px',
                }}>{item?.username}</Typography>
            </Box>
        </Box>
    )
}

export default SearchItem