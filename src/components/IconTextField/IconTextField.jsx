import React from 'react'
import { Box, TextField, Tooltip } from '@mui/material'
import colors from '../../utils/_colors.scss';
import './IconTextField.scss'


const IconTextField = ({ iconComponent, label, value, name, onChange, style, type = "text", tooltip, error }) => {

    return (
        <>
            <Tooltip title={tooltip}>
                <Box
                    style={style}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        backgroundColor: `${colors.lightGrey}`,
                        padding: '0px',
                        borderRadius: '10px',
                        border: error ? '1px solid red' : {},
                        my: 1
                    }}>
                    {iconComponent}
                    <TextField
                        key={name}
                        className="_icon_text_field"
                        sx={{
                            mb: 1, ml: 1, mr: 3, width: '100%',
                        }}
                        label={label}
                        value={value}
                        name={name}
                        onChange={onChange}
                        type={type}
                        variant="standard"
                    />

                </Box>
            </Tooltip>
            {error ? <span style={{ color: 'red', fontSize: '12px' }}>{error && error}</span> : <></>}
        </>

    )
}



export default IconTextField