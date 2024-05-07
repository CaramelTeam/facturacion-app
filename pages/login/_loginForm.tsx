import React, { FC, ReactElement } from 'react'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios';
import { setCookie } from 'cookies-next';

import { Box, Typography, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from 'react-hot-toast'
import { BASE_URL } from '@/constants';

const LoginForm: FC = (): ReactElement => {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [disabled, setDisabled] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        axios.post(`${BASE_URL}/auth/login`, values)
            .then((res) => {
                setCookie('factuToken', res.data.token, {
                    path: '/',
                    maxAge: 24 * 60 * 60, // 24 hours
                })
                //redirect to dashboard
                toast.success(`Bienvenido ${res.data.name}`, {
                    duration: 6000,
                    position: 'top-right',
                    icon: '👏',
                    style: {
                        backgroundColor: '#161B22',
                        color: '#fff',
                    }
                })
                router.push(`/dashboard`);
            })
            .catch((err) => {
                console.log(err);
                toast.error((err.response?.data.message ?? 'Ocurrio un error'), {
                    duration: 6000,
                    position: 'top-right',
                    icon: '❌',
                    style: {
                        backgroundColor: '#161B22',
                        color: '#fff',
                    }
                });
                setError(true);
                setDisabled(false);
            })
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            sx={{
                backgroundColor: 'background.paper',
                borderRadius: '10px'
            }}
            height='50vh'
            width='30vw'
            boxShadow={3}
            component='form'
            onSubmit={handleFormSubmit}
        >
            <Toaster />
            <Typography variant="h6" component='h2' mb={5} mt={5}  >
                Iniciar Sesion
            </Typography>

            <TextField
                id="email"
                name='email'
                label="Correo"
                type='email'
                error={error}
                helperText={error ? 'Correo o contraseña incorrectos' : ''}
                sx={{
                    width: '80%',
                    marginBottom: '50px'
                }}
                onChange={handleInputChange}
                autoComplete='off'
            />
            <TextField
                id="password"
                name='password'
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end' >
                            <IconButton onClick={handleClickShowPassword} >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={{
                    width: '80%',
                    marginBottom: '50px'
                }}
                onChange={handleInputChange}
            />
            <Button variant='contained' sx={{ width: '80%' }} type='submit' disabled={disabled} >
                Entrar
            </Button>
        </Box>
    )
}

export default LoginForm;
