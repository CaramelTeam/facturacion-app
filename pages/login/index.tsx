import React, { FC, ReactElement } from 'react'
import { Box, Grid, TextField, Stack } from '@mui/material'
import LoginForm from './_loginForm';

const Login: FC = (): ReactElement => {
    return (
        <Grid container>
            <Grid
                item
                sm={12}
                display='flex'
                justifyContent='center'
                alignItems='center'
                width='100%'
                height='100vh'
                sx={{
                    backgroundColor: 'background.default'
                }}
            >
                <LoginForm />
            </Grid>
        </Grid>
    )
}

export default Login;
