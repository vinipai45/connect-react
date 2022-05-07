import React from 'react'
import { Box, TextField } from '@mui/material'
import colors from '../../utils/_colors.scss';
import './IconTextField.scss'


const IconTextField = ({ iconComponent, label, value, name, onChange, style, type = "text" }) => {

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
            <TextField
                key={name}
                className="_icon_text_field"
                sx={{ mb: 1, ml: 1, mr: 3, width: '100%' }}
                label={label}
                value={value}
                name={name}
                onChange={onChange}
                type={type}
                variant="standard"
            />
        </Box>
    )
}



export default IconTextField