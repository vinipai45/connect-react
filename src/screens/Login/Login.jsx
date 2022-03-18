import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';

import './Login.scss';
import GooglePNG from '../../assets/google.png';
import colors from '../../utils/_colors.scss';
import IconButton from '../../components/IconButton';
import ORComponent from '../../components/ORComponent';
import IconTextField from '../../components/IconTextField';
import Footer from '../../components/Footer/Footer';


const Login = () => {

    return (
        <Box style={{ width: '100%', height: '100%', display: 'flex' }} className="_login_main_container">
            <Box className="_logo_main_container">
                <img
                    src={require('../../assets/logo')}
                    alt="app logo"
                    className='_app_logo'
                />
            </Box>
            <Box className="_login_form_container">
                <div className='_form_container'>
                    <h4>Log in to Connect.</h4>
                    <p style={{ color: `${colors.textGrey}` }}>Welcome Back! login with your data that you entered during registration</p>
                    <IconButton
                        sx={{ margin: '40px auto' }}
                        textColor={colors.dark}
                        backgroundColor={colors.lightGrey}
                        hoverBackgroundColor={colors.lightGrey}
                        title="Connect With Google"
                        variant="contained"
                        startIcon={<img src={GooglePNG} style={{ height: '30px', width: '30px' }} alt="google png" />}
                    />
                    <ORComponent />
                    <IconTextField
                        label="Email"
                        type="email"
                        iconComponent={<AlternateEmailIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        label="Password"
                        type="password"
                        iconComponent={<LockIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <Typography
                        sx={{
                            float: 'right',
                            color: `${colors.primaryColor}`,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}>
                        Forgot Password?
                    </Typography>
                    <IconButton
                        sx={{ margin: '40px auto 20px auto' }}
                        textCapital={true}
                        textColor={colors.lightGrey}
                        fontSize="18px"
                        backgroundColor={colors.primaryColor}
                        hoverBackgroundColor={colors.primaryColor}
                        title="Login"
                        variant="contained"
                    />
                    <Box>
                        <Typography
                            sx={{ float: 'right' }}>
                            Don't have an account?
                            <span style={{
                                color: `${colors.primaryColor}`,
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}> Register
                            </span>
                        </Typography>
                    </Box>
                </div>

                <Footer />

            </Box>
        </Box>
    )
}

export default Login