import React from 'react'
import colors from '../../utils/_colors.scss';
import { Box, Typography } from '@mui/material';

const SearchItem = ({ item }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <img src={item?.avatar} alt=""
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
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: '15px',
                    textTransform: 'capitalize',
                    "&:hover": {
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    },
                }}>{item?.name}</Typography>
                <Typography sx={{
                    fontSize: '12px',
                }}>{item?.username}</Typography>
            </Box>
        </Box>
    )
}

export default SearchItem