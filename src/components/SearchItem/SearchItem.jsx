import React from 'react'
import colors from '../../utils/_colors.scss';
import { maleAvatars } from '../../utils/helper-functions/avatars'
import { Box, Typography } from '@mui/material';

const SearchItem = ({ item }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <img src={maleAvatars[0]} alt=""
                style={{
                    border: `1px solid ${colors.white}`,
                    background: `${colors.white}`,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px'
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
                    "&:hover": {
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    },
                }}>Shambu Doe {item}</Typography>
                <Typography sx={{
                    fontSize: '12px'
                }}>shambu_doe</Typography>
            </Box>
        </Box>
    )
}

export default SearchItem