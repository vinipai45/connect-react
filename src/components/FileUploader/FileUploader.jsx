import React, { useRef } from 'react';
import { IconButton } from '@mui/material';

const FileUploader = ({ icon, handleFileChange }) => {

    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            <IconButton size='large' sx={{ color: '#fff', background: 'transparent' }} onClick={handleClick} >
                {icon}
            </IconButton>
            <input
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={handleFileChange}

            />
        </>
    );
};
export default FileUploader;