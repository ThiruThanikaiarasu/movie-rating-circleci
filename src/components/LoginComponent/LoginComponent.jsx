import { Container, Box, Typography, Toolbar, FormControl, OutlinedInput, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({ email: ''})

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = () => {
        const emailError = validateEmail(email) ? '' : 'Invalid email address'
        
        setErrors({ email: emailError })

        if (!emailError) {
            event.preventDefault()
            
            axios
                .post(
                    // `http://localhost:3500/api/v1/admin/login`, 
                    `https://movie-rating-server.vercel.app/api/v1/admin/login`, 
                    {
                        email, password
                    },
                    {
                        withCredentials: true
                    }
                )
                .then((response) => {
                    if(response.status === 200) {
                        alert(`${response.data.message} !`)
                        window.location.href = '/'
                    }
                })
                .catch((error) => {
                    alert(`Status : ${error.response.data.message}`)
                })
        }
    }

    return (
        <Container
            sx={{
                paddingTop: '3em'
            }}
        >
            <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <Box
                    component="img"
                    sx={{
                        height: 40,
                        mr: 2,
                        display: { xs: 'flex', md: 'flex' },
                    }}
                    alt="Logo"
                    src={logo}
                />
                <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'black',
                    textDecoration: 'none',
                }}
                >
                    Movie Rating
                </Typography>
            </Toolbar>
            <Box>
                <Typography 
                    variant='h4'
                    sx={{ 
                        width: '40%',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        margin: '0 auto',
                        mt: '1em',
                        color: 'black'
                    }}
                >
                    Admin Login
                </Typography>
                <FormControl
                    sx={{
                        width: '100%',
                        mt: '1em',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='Enter your Email'
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            width: '30%',
                            mt: '1em'
                        }}
                    />

                    <TextField
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder='Enter your Password'
                        type='password'
                        sx={{
                            width: '30%',
                            mt: '1em',
                        }}
                    />

                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: '#5d1d63', '&:hover': { backgroundColor: '#5d1d70'}, width: '30%',
                            mt: '1em',
                            // height: '1em',
                            fontSize: '1.25em'
                        }} 
                        onClick={handleSubmit}
                    >
                        Continue 
                    </Button>

                </FormControl>
                
                <Typography
                    sx={{
                        textAlign: 'center',
                        mt: '1em'
                    }}
                >
                    New to Slack?
                </Typography>

                <Link
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        margin: '0 auto',
                        textDecoration: 'none'
                    }}
                    to='/signup'
                >
                    Create an Account here 
                </Link>
            </Box>
        </Container>
    )
}

export default Login