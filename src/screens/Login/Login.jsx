import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';

import './Login.scss';
import colors from '../../utils/_colors.scss';

import { firebaseExceptionHandler } from '../../services/FirebaseExceptionHandler'
import Authentication from '../../services/Authentication/Auntentication';

import GooglePNG from '../../assets/google.png';

import IconButton from '../../components/IconButton/IconButton';
import ORComponent from '../../components/ORComponent';
import IconTextField from '../../components/IconTextField/IconTextField';
import Footer from '../../components/Footer/Footer';
import AppSnackBar from '../../components/AppSnackBar/AppSnackBar';
import { auth_token } from '../../utils/constants';


const Login = () => {


    let initial = {
        email: "",
        password: ""
    }

    const [inputs, setInputs] = useState(initial)
    // const [inputErrors, setInputErrors] = useState(initial)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordResetSelected, setIsPasswordResetSelected] = useState(false)
    const [error, setError] = useState("")

    let navigate = useNavigate()
    let authentication = new Authentication()




    const handleRegisterClick = () => {
        navigate('/signup')
    }

    const handleOnChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (event) => {

        try {

            event.preventDefault();
            setIsLoading(true)

            let loggedInUser = await authentication.siginWithEmailAndPassword(inputs)

            if (loggedInUser) {
                localStorage.setItem(auth_token, loggedInUser.user.multiFactor.user.accessToken)
                navigate('/')
            }


        } catch (error) {
            setOpenSnackBar(true)
            let errorMessage = firebaseExceptionHandler(error.code)
            setError(errorMessage);
            setIsLoading(false)
        }
    }

    const handleLoginWithGoogle = async (e) => {
        try {

            let authUser = await authentication.signinWithGoogle(inputs)

            if (!authUser) {
                setOpenSnackBar(true)
                setError("couldnt signin to google");
                return
            }

            navigate('/')

        } catch (error) {
            console.error(error, "error")
        }
    }


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
                {
                    !isPasswordResetSelected ?
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
                                onClick={handleLoginWithGoogle}
                            />
                            <ORComponent />
                            <IconTextField
                                name="email"
                                tooltip="enter email"
                                value={inputs.email && inputs.email}
                                label="email"
                                type="email"
                                onChange={handleOnChange}
                                iconComponent={<AlternateEmailIcon sx={{ color: `${colors.dark}`, m: 1, fontSize: '30px' }} />}
                            />
                            <IconTextField
                                style={{ marginBottom: '10px' }}
                                name="password"
                                tooltip="enter password"
                                value={inputs.password && inputs.password}
                                label="password"
                                type="password"
                                onChange={handleOnChange}
                                iconComponent={<LockIcon sx={{ color: `${colors.dark}`, m: 1, fontSize: '30px' }} />}
                            />
                            <Typography
                                sx={{
                                    float: 'right',
                                    color: `${colors.primaryColor}`,
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setIsPasswordResetSelected(true)}
                            >
                                forgot password ?
                            </Typography>
                            {
                                isLoading ?
                                    <Box
                                        sx={{
                                            margin: '40px auto 20px auto',
                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <CircularProgress style={{ color: colors.primaryColor }} />
                                    </Box>
                                    : <IconButton
                                        sx={{ margin: '40px auto 20px auto' }}
                                        textColor={colors.lightGrey}
                                        fontSize="18px"
                                        backgroundColor={colors.primaryColor}
                                        hoverBackgroundColor={colors.primaryColor}
                                        onClick={handleLogin}
                                        title="Login"
                                        variant="contained"
                                    />
                            }

                            <Box>
                                <Typography
                                    sx={{ float: 'right' }}>
                                    Don't have an account?
                                    <span
                                        style={{
                                            marginLeft: '10px',
                                            color: `${colors.primaryColor}`,
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleRegisterClick}
                                    >
                                        Register
                                    </span>
                                </Typography>
                            </Box>
                        </div>
                        : <></>
                }

                <Footer />

            </Box>
            {
                openSnackBar ?
                    <AppSnackBar
                        type="error"
                        message={error}
                        openSnackBar={openSnackBar}
                        setOpenSnackBar={setOpenSnackBar}
                    />
                    : <></>
            }
        </Box>
    )
}

export default Login