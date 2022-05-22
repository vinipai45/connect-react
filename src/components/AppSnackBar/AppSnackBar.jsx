import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AppSnackBar({ type, message, openSnackBar, setOpenSnackBar }) {

    useEffect(() => {
        setTimeout(() => {
            setOpenSnackBar(false)
        }, 3000)
    }, [setOpenSnackBar])

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openSnackBar}
                autoHideDuration={3000}
            >

                <Alert severity={type}>{message}</Alert>

            </Snackbar>
        </div>
    );
}