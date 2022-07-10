import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';

import { Button, IconButton, Tooltip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AppModal from '../../components/AppModal/AppModal'
import TopBar from '../../components/TopBar/TopBar'

const CreatePost = () => {

    let navigate = useNavigate()

    return (
        <AppModal
            open={true}
            // screenWidth={width}
            onClose={() => navigate(-1)}
        >
            hello

        </AppModal>
    )
}

export default CreatePost