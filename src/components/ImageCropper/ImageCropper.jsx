import React, { useState, useCallback } from 'react'
import { Box, Slider, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import Cropper from 'react-easy-crop'

import { styles } from './ImageCropper.styles'
import TopBar from '../TopBar/TopBar'

const dogImg =
    'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'


const ImageCropper = ({ screenWidth, classes, image }) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    return (
        <Box sx={{ height: '100%' }}>
            <Box
                className={classes.cropContainer}
                sx={{
                    height: '60%',
                }}
            >
                <Cropper
                    image={image}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />

            </Box>
            <Box sx={{
                p: 1,
                display: screenWidth < 600 ? 'block' : 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Box className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        sx={{
                            minWidth: '65px',
                            fontWeight: 'bold'
                        }}
                    >
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        classes={{ root: classes.slider }}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </Box>
                <Box className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        sx={{
                            minWidth: '65px',
                            fontWeight: 'bold'
                        }}
                    >
                        Rotation
                    </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        classes={{ root: classes.slider }}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </Box>
                {/* <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Show Result
        </Button> */}
            </Box>
        </Box>
    )
}

const StyledImageCropper = withStyles(styles)(ImageCropper)

export default StyledImageCropper