import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import './Signup.scss';
import colors from '../../utils/_colors.scss';
import IconButton from '../../components/IconButton/IconButton';
import IconTextField from '../../components/IconTextField/IconTextField';
import Footer from '../../components/Footer/Footer';


const Signup = () => {

    const initial = {
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    const [inputs, setInputs] = useState(initial)

    let history = useHistory()

    const handleLoginClick = () => {
        history.push('/login')
    }

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        console.log(inputs)
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
                        value={inputs.name}
                        label="Name"
                        type="text"
                        onChange={handleInputChange}
                        iconComponent={<PersonIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        name="username"
                        value={inputs.username}
                        label="Username"
                        type="text"
                        onChange={handleInputChange}
                        iconComponent={<FaceIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        name="email"
                        value={inputs.email}
                        label="Email"
                        type="email"
                        onChange={handleInputChange}
                        iconComponent={<AlternateEmailIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        name="password"
                        value={inputs.password}
                        label="Password"
                        type="password"
                        onChange={handleInputChange}
                        iconComponent={<LockIcon sx={{ color: `${colors.textGrey}`, m: 1, fontSize: '30px' }} />}
                    />
                    <IconTextField
                        style={{ marginBottom: '10px' }}
                        name="confirm_password"
                        value={inputs.confirm_password}
                        label="Confirm Password"
                        type="password"
                        onChange={handleInputChange}
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
                        type="submit"
                        textCapital={true}
                        textColor={colors.lightGrey}
                        fontSize="18px"
                        backgroundColor={colors.secondaryColor}
                        hoverBackgroundColor={colors.secondaryColor}
                        title="Signup"
                        variant="contained"
                        onClick={handleSubmit}
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