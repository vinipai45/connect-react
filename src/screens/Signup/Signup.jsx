import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';

import './Signup.scss';
import { firebase } from "../../services/firebase"
import colors from '../../utils/_colors.scss';
import { maleAvatars, femaleAvatars, otherAvatars } from '../../helper-functions/avatars';
import { validateSignupInputs } from './validations';

import IconButton from '../../components/IconButton/IconButton';
import IconTextField from '../../components/IconTextField/IconTextField';
import Footer from '../../components/Footer/Footer';
import AppSnackBar from '../../components/AppSnackBar/AppSnackBar';
import getRandomInt from '../../helper-functions/getRandomNumbers';


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
    const [error, setError] = useState("")
    const [inputErrors, setInputErrors] = useState(initial)
    const [isLoading, setIsLoading] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)

    let navigate = useNavigate()

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
        if (inputs.gender == "male") {
            setInputs({
                ...inputs,
                avatar: maleAvatars[getRandomInt(maleAvatars.length)]
            })
        }
        if (inputs.gender == "female") {
            setInputs({
                ...inputs,
                avatar: femaleAvatars[getRandomInt(femaleAvatars.length)]
            })
        }
        if (inputs.gender == "other") {
            setInputs({
                ...inputs,
                avatar: otherAvatars[getRandomInt(otherAvatars.length)]
            })
        }
    }, [inputs.gender])

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        let validationErrors = validateSignupInputs(inputs)

        if (validationErrors) {
            console.log(validationErrors)
            setInputErrors(validationErrors)
            setIsLoading(false)
            return
        }

        try {

            if (!firebase) {
                setOpenSnackBar(true)
                setError('Firebase Connectivity lost!');
                setIsLoading(false)
            }

            let savedUser = await firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)

            if (savedUser) {
                savedUser = savedUser.user.multiFactor.user
                sessionStorage.setItem('Shambu Auth Token', savedUser.accessToken)
            }

            savedUser = await firebase
                .firestore()
                .collection("users")
                .doc(savedUser.uid)
                .set({
                    bio: "",
                    avatar: "",
                    email: inputs.email,
                    name: inputs.name,
                    username: inputs.username,
                    role: "user",
                    gender: ""
                })

            if (!savedUser) {
                return
            }

            navigate('/')

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('User already exists');
                setOpenSnackBar(true)
            }
            setIsLoading(false)
            console.error("error", error);
        }
    }

    return (
        <Box style={{ width: '100%', height: '100%', display: 'flex' }} className="_signup_main_container">

            <Box className="_signup_form_container">
                <div className='_form_container'>
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
                        iconComponent={<PersonIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        name="username"
                        error={inputErrors.username}
                        value={inputs.username}
                        tooltip="enter atleast 5 characters"
                        label="Username"
                        type="text"
                        onChange={handleInputChange}
                        iconComponent={<FaceIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        name="email"
                        error={inputErrors.email}
                        value={inputs.email}
                        tooltip="enter email"
                        label="Email"
                        type="email"
                        onChange={handleInputChange}
                        iconComponent={<AlternateEmailIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        name="password"
                        error={inputErrors.password}
                        value={inputs.password}
                        tooltip={<div>atleast one uppercase <br /> atleast one special character <br /> atleast one number</div>}
                        label="Password"
                        type="password"
                        onChange={handleInputChange}
                        iconComponent={<LockIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        name="confirm_password"
                        error={inputErrors.confirm_password}
                        value={inputs.confirm_password}
                        label="Confirm Password"
                        type="password"
                        onChange={handleInputChange}
                        iconComponent={<LockIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
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



                    <Typography
                        sx={{
                            float: 'right',
                            color: `${colors.secondaryColor}`,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}>
                        Forgot Password?
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
                                onClick={handleSubmit}
                            />
                    }

                </div>

                <Footer />

            </Box >
            <Box className="_logo_main_container">
                <img
                    src={require('../../assets/logo')}
                    alt="app logo"
                    className='_app_logo'
                />
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
        </Box >
    )
}

export default Signup