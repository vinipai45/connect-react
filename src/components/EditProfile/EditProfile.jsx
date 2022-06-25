import React from 'react'

import { Box, TextField, Tooltip } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import colors from '../../utils/_colors.scss';
import FileUploader from '../FileUploader/FileUploader';

import { fileToBase64 } from '../../utils/helper-functions/converters';


const EditProfile = ({
    user,
    style,
    errors,
    screenWidth,
    updateInputs,
    croppedImage,
    setUpdateInputs,
    setFileType,
    setBase64Image,
    setCropImageInProgress,
    setOpenModal,
    resetImageCropProperties
}) => {




    const handleChange = (e) => {
        setUpdateInputs({
            ...updateInputs,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = async (e) => {

        resetImageCropProperties()

        const fileUploaded = e.target.files[0];

        console.log(fileUploaded)
        setFileType(fileUploaded.type)

        let base64Url = await fileToBase64(fileUploaded)

        setBase64Image(base64Url)

        if (base64Url) {
            setCropImageInProgress(true)
        }




    }


    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                overflow: 'auto'
            }}
            style={style}
        >

            <Box sx={{
                width: '100%',
                height: screenWidth < 480 ? '20%' : '40%',
                backgroundColor: `${colors.primaryColor}`,
            }} />
            <Box sx={{ position: 'relative' }}>
                <img src={updateInputs?.avatar} alt=""
                    style={{
                        border: `1px solid ${colors.white}`,
                        background: `${colors.white}`,
                        borderRadius: '50%',
                        marginTop: '-30px',
                        marginLeft: '20px',
                        width: '80px',
                        height: '80px',
                        filter: 'brightness(80%)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: -15,
                        bottom: 0,
                        left: 35,
                        right: 0,
                        height: '100%',
                        transition: '.3s ease',
                    }}
                >
                    <Tooltip title="Add Photo">
                        <FileUploader
                            icon={<CameraAltIcon fontSize="inherit" />}
                            handleFileChange={handleFileChange}
                        />
                    </Tooltip>
                </Box>

            </Box>
            <Box
                sx={{ p: 2, pb: 10 }}
            >
                <TextField
                    autoComplete='off'
                    label="name"
                    name="name"
                    variant="outlined"
                    sx={{ width: '100%', mt: 2 }}
                    value={updateInputs?.name}
                    error={errors?.name}
                    helperText={errors?.name}
                    onChange={handleChange}
                    inputProps={{ maxLength: 32 }}
                />
                <TextField
                    autoComplete='off'
                    label="username"
                    name="username"
                    error={errors?.username}
                    helperText={errors?.username}
                    variant="outlined"
                    value={updateInputs?.username}
                    onChange={handleChange}
                    sx={{ width: '100%', mt: 2 }}
                    inputProps={{ maxLength: 32 }}
                />
                <TextField
                    autoComplete='off'
                    label="bio"
                    name="bio"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={updateInputs?.bio}
                    onChange={handleChange}
                    sx={{ width: '100%', mt: 2 }}
                    inputProps={{ maxLength: 100 }}
                />
            </Box>
        </Box>
    )
}

export default EditProfile