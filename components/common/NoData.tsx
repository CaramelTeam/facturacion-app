import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const NoData = () => {
    return (
        <Grid container alignItems={'center'} >
            <Grid item md={12} >
                <Box
                    component={'div'}
                    textAlign={'center'}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        // minWidth: '80vw',
                        minHeight: '50vh'
                    }}
                >
                    <Box
                        component={'img'}
                        src='https://66d4335c-6df7-4c6f-8489-1a8bdf3a56ff-em-assets.s3.amazonaws.com/assets/common/No+data-amico.svg'
                        sx={{
                            maxWidth: '30%',
                        }}
                    />
                </Box>
                <Box
                    component={'div'}
                    textAlign={'center'}

                >
                    <Typography
                        variant='h4'
                        sx={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        No hay datos para mostrar.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}
