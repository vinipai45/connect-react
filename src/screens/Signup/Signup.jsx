import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import './Signup.scss';
import colors from '../../utils/_colors.scss';
import { firebaseExceptionHandler } from '../../services/FirebaseExceptionHandler'
import Authentication from '../../services/Authentication/Auntentication';
import { getRandomAvatar } from '../../utils/helper-functions/avatars';
import { validateSignupInputs } from '../../validations/signup.validations';

import IconButton from '../../components/IconButton/IconButton';
import IconTextField from '../../components/IconTextField/IconTextField';
import Footer from '../../components/Footer/Footer';
import { isUserLoggedIn } from '../../utils/helper-functions/checkUserLoggedIn';

const Signup = () => {

    const initial = {
        avatar: "",
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        gender: ""
    }
    const [inputs, setInputs] = useState(initial)
    const [inputErrors, setInputErrors] = useState(initial)
    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate()

    let Toast = useSelector((s) => s.toast);

    let authentication = new Authentication()


    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {

        let avatar = getRandomAvatar(inputs.gender)
        setInputs({
            ...inputs,
            avatar: avatar
        })

    }, [inputs.gender])

    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/home')
        }
    }, [navigate])

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        try {

            let errors = await validateSignupInputs(inputs)

            if (!errors.isValid) {
                setInputErrors(errors.error)
                setIsLoading(false)
                return
            }

            let authUser = await authentication.createUserWithEmailAndPassword(inputs)

            if (!authUser) {
                Toast.fire({
                    icon: 'error',
                    title: `could not save user`
                })
                setIsLoading(false)
            }

            navigate('/login')

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
        <Box style={{ width: '100%', height: '100%', display: 'flex' }} className="_signup_main_container">

            <Box className="_signup_form_container">
                <form className='_form_container' onSubmit={handleSubmit} >
                    <h4>Get started with Connect.</h4>
                    <p style={{ color: `${colors.textGrey}` }}>
                        Already have an account ?
                        <span
                            style={{
                                color: `${colors.secondaryColor}`,
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                            onClick={handleLoginClick}
                        >
                            Login
                        </span>
                    </p>

                    <IconTextField
                        name="name"
                        error={inputErrors.name}
                        value={inputs.name}
                        tooltip="enter atleast 3 characters"
                        label="Name"
                        type="text"
                        onChange={handleInputChange}
                        iconComponent={
                            <PersonIcon
                                sx={{
                                    color: !inputErrors.name ? `${colors.$dark}` : 'red',
                                    m: 1.5,
                                    fontSize: '30px'
                                }}
                            />
                        }
                    />
                    <IconTextField
                        name="username"
                        error={inputErrors.username}
                        value={inputs.username}
                        tooltip="enter atleast 5 characters"
                        label="Username"
                        type="text"
                        onChange={handleInputChange}
                        iconComponent={
                            <FaceIcon
                                sx={{
                                    color: !inputErrors.username ? `${colors.$dark}` : 'red',
                                    m: 1.5,
                                    fontSize: '30px'
                                }}
                            />
                        }
                    />
                    <IconTextField
                        name="email"
                        error={inputErrors.email}
                        value={inputs.email}
                        tooltip="enter email"
                        label="Email"
                        type="email"
                        onChange={handleInputChange}
                        iconComponent={
                            <AlternateEmailIcon
                                sx={{
                                    color: !inputErrors.email ? `${colors.$dark}` : 'red',
                                    m: 1.5,
                                    fontSize: '30px'
                                }}
                            />
                        }
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        name="password"
                        error={inputErrors.password}
                        value={inputs.password}
                        tooltip={<div>at least two letters
                            <br />
                            at least two numbers
                            <br />
                            at least one special character (any special character)
                            <br />
                            at least 8 characters</div>}
                        label="Password"
                        type="password"
                        onChange={handleInputChange}
                        iconComponent={
                            <LockIcon
                                sx={{
                                    color: !inputErrors.password ? `${colors.$dark}` : 'red',
                                    m: 1.5,
                                    fontSize: '30px'
                                }}
                            />
                        }
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        name="confirm_password"
                        error={inputErrors.confirm_password}
                        value={inputs.confirm_password}
                        label="Confirm Password"
                        type="password"
                        onChange={handleInputChange}
                        iconComponent={
                            <LockIcon
                                sx={{
                                    color: !inputErrors.confirm_password ? `${colors.$dark}` : 'red',
                                    m: 1.5,
                                    fontSize: '30px'
                                }}
                            />
                        }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: '20px', color: colors.textGrey }} >
                            I am
                        </Typography>
                        <RadioGroup

                            row
                            name="gender"
                            value={inputs.gender}
                            onClick={handleInputChange}
                        >
                            <FormControlLabel sx={{ color: colors.textGrey }} value="female" control={<Radio className="_radio_button" />} label="Female" />
                            <FormControlLabel sx={{ color: colors.textGrey }} value="male" control={<Radio className="_radio_button" />} label="Male" />
                            <FormControlLabel sx={{ color: colors.textGrey }} value="other" control={<Radio className="_radio_button" />} label="Other" />

                        </RadioGroup>
                    </Box>
                    {inputErrors.gender ? <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px', }} >{inputErrors.gender}</span> : <></>}

                    {
                        isLoading ?
                            <Box
                                sx={{
                                    margin: '40px auto 20px auto',
                                    width: '100%',
                                    textAlign: 'center'
                                }}
                            >
                                <CircularProgress style={{ color: colors.secondaryColor }} />
                            </Box>
                            :
                            <IconButton
                                sx={{ margin: '10px auto 20px auto' }}
                                type="submit"
                                textColor={colors.lightGrey}
                                fontSize="18px"
                                backgroundColor={colors.secondaryColor}
                                hoverBackgroundColor={colors.secondaryColor}
                                title="Signup"
                                variant="contained"
                            />
                    }

                </form>

                <Footer />

            </Box >
            <Box className="_logo_main_container">
                <img
                    src={require('../../assets/logo')}
                    alt="app logo"
                    className='_app_logo'
                />
            </Box>
        </Box >
    )
}

export default Signup