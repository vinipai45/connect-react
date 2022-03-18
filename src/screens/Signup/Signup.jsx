import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import './Signup.scss';
import GooglePNG from '../../assets/google.png';
import colors from '../../utils/_colors.scss';
import IconButton from '../../components/IconButton';
import ORComponent from '../../components/ORComponent';
import IconTextField from '../../components/IconTextField';
import Footer from '../../components/Footer/Footer';


const Signup = () => {

    return (
        <Box style={{ width: '100%', height: '100%', display: 'flex' }} className="_signup_main_container">

            <Box className="_signup_form_container">
                <div className='_form_container'>
                    <h4>Get started with Connect.</h4>
                    <p style={{ color: `${colors.textGrey}` }}>Already have an account ? <Link to="/login">Login</Link></p>
                    <IconTextField
                        label="Name"
                        type="text"
                        iconComponent={<PersonIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        label="Username"
                        type="text"
                        iconComponent={<FaceIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
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
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        label="Confirm Password"
                        type="password"
                        iconComponent={<LockIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <Typography
                        sx={{
                            float: 'right',
                            color: `${colors.secondaryColor}`,
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
                        backgroundColor={colors.secondaryColor}
                        hoverBackgroundColor={colors.secondaryColor}
                        title="Signup"
                        variant="contained"
                    />
                </div>

                <Footer />

            </Box>
            <Box className="_logo_main_container">
                <img
                    src={require('../../assets/logo')}
                    alt="app logo"
                    className='_app_logo'
                />
            </Box>
        </Box>
    )
}

export default Signup