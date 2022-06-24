import React from 'react'
import colors from '../../utils/_colors.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box, Typography } from '@mui/material';

import './SearchItem.scss'

const SearchItem = ({ item, handleProfileVisit, setSelectedUser }) => {


    return (
        <Box sx={{ display: 'flex' }} className="_search_item_container">
            <LazyLoadImage
                className='_search_item_img'
                src={item?.avatar} // use normal <img> attributes as props
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
            {/* <Box
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
            /> */}
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