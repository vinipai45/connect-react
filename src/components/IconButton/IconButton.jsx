import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import './IconButton.scss'

const IconButton = ({ textColor, type, fontSize, textCapital, backgroundColor, hoverBackgroundColor, startIcon, title, sx, variant, onClick }) => {

    const ColorButton = styled(Button)(({ theme }) => ({
        fontSize: fontSize,
        fontFamily: 'Work Sans',
        fontWeight: 'bolder',
        color: textColor,
        backgroundColor: backgroundColor,
        textTransform: textCapital ? 'uppercase' : 'lowercase',
        width: "100%",
        '&:hover': {
            backgroundColor: hoverBackgroundColor,
        },
    }));


    return (
        <ColorButton
            sx={sx}
            type={type}
            variant={variant}
            startIcon={startIcon}
            onClick={onClick}
        >
            {title}
        </ColorButton>
    )
}

export default IconButton