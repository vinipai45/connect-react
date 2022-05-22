import React from 'react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid red',
    },
}));


const ErrorTooltip = ({ children, error }) => {
    return (
        <>
            <HtmlTooltip
                children={children}
                title={
                    <React.Fragment>
                        <Typography color="inherit">Error</Typography>
                        <em style={{ color: 'red' }}>{error}</em>
                    </React.Fragment>
                }
            />
        </>
    )
}

export default ErrorTooltip