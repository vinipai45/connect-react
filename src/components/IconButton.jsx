import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';

const IconButton = ({ textColor, fontSize, textCapital, backgroundColor, hoverBackgroundColor, startIcon, title, sx, variant }) => {

    const ColorButton = styled(Button)(({ theme }) => ({
        fontSize: fontSize,
        fontFamily: 'Work Sans',
        fontWeight: 'bolder',
        color: textColor,
        backgroundColor: backgroundColor,
        textTransform: textCapital ? 'uppercase' : 'capitalize',
        width: "100%",
        '&:hover': {
            backgroundColor: hoverBackgroundColor,
        },
    }));


    return (
        <ColorButton
            sx={sx}
            variant={variant}
            startIcon={startIcon}
        >
            {title}
        </ColorButton>
    )
}

export default IconButton