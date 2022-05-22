import React from 'react'
import { Box, TextField, Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom';

import ErrorTooltip from '../ErrorTooltip/ErrorTooltip'

import colors from '../../utils/_colors.scss';
import './IconTextField.scss'


const IconTextField = ({ iconComponent, label, value, name, onChange, style, type = "text", tooltip, error }) => {
    return (
        <>

            <Box
                style={style}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    backgroundColor: !error ? `${colors.lightGrey}` : {},
                    padding: '0px',
                    borderRadius: '30px',
                    border: error ? '2px solid red' : {},
                    my: 1
                }}>
                {
                    error ?
                        <ErrorTooltip
                            children={iconComponent}
                            error={error}
                        >
                        </ErrorTooltip> : <>{iconComponent}</>

                }

                <Tooltip TransitionComponent={Zoom} title={tooltip}>
                    <TextField
                        autoComplete='off'
                        error={error}
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


                </Tooltip>

            </Box>
            {
                error ?
                    <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }} >{error}</span>
                    : <></>
            }
        </>

    )
}



export default IconTextField