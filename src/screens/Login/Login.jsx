import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';

import './Login.scss';
import colors from '../../utils/_colors.scss';

import { firebaseExceptionHandler } from '../../services/FirebaseExceptionHandler'
import Authentication from '../../services/Authentication/Auntentication';
import { validateLoginInputs } from '../../validations/login.validations';

import GooglePNG from '../../assets/google.png';

import IconButton from '../../components/IconButton/IconButton';
import ORComponent from '../../components/ORComponent';
import IconTextField from '../../components/IconTextField/IconTextField';
import Footer from '../../components/Footer/Footer';
import { auth_token, auth_user } from '../../utils/constants';
import { isUserLoggedIn } from '../../helper-functions/checkUserLoggedIn';


const Login = () => {


    let initial = {
        email: "",
        password: ""
    }

    const [inputs, setInputs] = useState(initial)
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordResetSelected, setIsPasswordResetSelected] = useState(false)

    let navigate = useNavigate()

    let Toast = useSelector((s) => s.toast);

    let authentication = new Authentication()


    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/')
        }
    }, [])




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

            let errors = await validateLoginInputs(inputs)
            if (!errors.isValid) {
                Toast.fire({
                    icon: 'error',
                    title: `${errors?.error.message}`
                })
                setIsLoading(false)
                return
            }


            let loggedInUser = await authentication.siginWithEmailAndPassword(inputs)

            console.log("loggedInUser", loggedInUser)

            if (loggedInUser) {
                localStorage.setItem(auth_token, loggedInUser.accessToken)
                localStorage.setItem(auth_user, JSON.stringify(loggedInUser))
                navigate('/')
            }


        } catch (error) {
            let errorMessage = firebaseExceptionHandler(error.code)
            Toast.fire({
                icon: 'error',
                title: `${errorMessage}`
            })
            setIsLoading(false)
        }
    }

    const handleLoginWithGoogle = async (e) => {
        try {

            let authUser = await authentication.signinWithGoogle(inputs)

            if (!authUser) {
                Toast.fire({
                    icon: 'error',
                    title: `could not connect with google`
                })
                return
            }

            navigate('/')

        } catch (error) {
            console.error(error, "error")
        }
    }

    const handlePasswordReset = async () => {
        try {
            setIsLoading(true)
            let authEmailSent = await authentication.sendPasswordResetEmail(inputs.email)

            if (authEmailSent) {
                Toast.fire({
                    icon: 'success',
                    title: `success`
                })
                setIsLoading(false)
                setIsPasswordResetSelected(false)
            }

        } catch (error) {
            let errorMessage = firebaseExceptionHandler(error.code)
            Toast.fire({
                icon: 'error',
                title: `${errorMessage}`
            })
            setIsLoading(false)
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
                                style={{
                                    borderRadius: '12px'
                                }}
                                label="Email"
                                type="email"
                                onChange={handleOnChange}
                                iconComponent={<AlternateEmailIcon sx={{ color: `${colors.dark}`, m: 1, fontSize: '30px' }} />}
                            />
                            <IconTextField
                                style={{ marginBottom: '10px', borderRadius: '12px' }}
                                name="password"
                                tooltip="enter password"
                                value={inputs.password && inputs.password}
                                label="Password"
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
                        :
                        <div className='_form_container'>
                            <h4>Forgot your Password ?</h4>
                            <p style={{ color: `${colors.textGrey}` }}>Enter the email associated with your account and we'll send an email with instructions to reset your password</p>
                            <Box sx={{ mt: 10 }}>
                                <IconTextField
                                    name="email"
                                    tooltip="enter email"
                                    value={inputs.email && inputs.email}
                                    style={{
                                        borderRadius: '12px'
                                    }}
                                    label="Enter email"
                                    type="email"
                                    onChange={handleOnChange}
                                    iconComponent={<AlternateEmailIcon sx={{ color: `${colors.dark}`, m: 1, fontSize: '30px' }} />}
                                />
                                <Typography
                                    sx={{
                                        float: 'right',
                                        color: `${colors.primaryColor}`,
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setIsPasswordResetSelected(false)}
                                >
                                    back to login ?
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
                                            onClick={handlePasswordReset}
                                            title="send"
                                            variant="contained"
                                        />
                                }
                            </Box>
                        </div>
                }

                <Footer />

            </Box>
        </Box>
    )
}

export default Login