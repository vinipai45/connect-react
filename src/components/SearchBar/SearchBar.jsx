import React from 'react'
import { TextField, styled, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const CssTextField = styled(TextField)({
    '& .MuiInputLabel-outlined': {
        // color: '#888888',
        // transform: 'translate(14px, 10px) scale(0.93)',
        fontFamily: 'Work Sans'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        // color: '#373a3c',
        paddding: 'auto 10px',
        transform: 'translate(12px, -10px) scale(0.75)'
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: '#252837'
    },
    '& .MuiOutlinedInput-root': {
        fontSize: 14,
        // marginRight: '0px',
        // '& fieldset': {
        //     border: '1px solid #dedede'
        // },
        '&:hover fieldset': {
            borderColor: '#4ECDC4'
        },
        '&.Mui-focused fieldset': {
            // borderColor: '#888'
        }
    },
    // '& .MuiOutlinedInput-input': {
    //     padding: '10px 14px',
    //     fontFamily: 'Work Sans'
    // }
});

const SearchBar = ({ style, searchText, setSearchText, onChange }) => {
    return (
        <>
            <div className="_searchbar">
                <CssTextField
                    autoComplete='off'
                    style={style}
                    variant='outlined'
                    value={searchText}
                    label="Search People"
                    placeholder='type here'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {
                                    searchText ?
                                        <IconButton onClick={() => setSearchText('')}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                        :
                                        <IconButton>
                                            <SearchIcon color='dark' />
                                        </IconButton>
                                }
                            </InputAdornment>
                        ),
                    }}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default SearchBar