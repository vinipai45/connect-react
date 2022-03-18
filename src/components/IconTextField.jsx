import React from 'react'
import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material'
import colors from '../utils/_colors.scss';

const IconTextField = ({ iconComponent, label, style, type = "text" }) => {

    const CssTextField = styled(TextField)({
        '& label': {
            color: `${colors.textGrey}`,
            fontFamily: 'Work Sans',
            fontWeight: 'bold',
        },
        '& label.Mui-focused': {
            color: `${colors.textGrey}`,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: `${colors.textGrey}`,
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: `${colors.textGrey}`,
            },
        },
    });

    return (
        <Box
            style={style}
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                backgroundColor: `${colors.lightGrey}`,
                padding: '5px',
                borderRadius: '10px',
                my: 4
            }}>
            {iconComponent}
            <CssTextField label={label} type={type} variant="standard" sx={{ mb: 1, ml: 1, mr: 3, width: '100%' }} />
        </Box>
    )
}



export default IconTextField