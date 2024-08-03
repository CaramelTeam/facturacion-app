import React from 'react'
import { Box, Grid, Typography } from '@mui/material';

export const InternalServerError = () => {
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
                        src='https://66d4335c-6df7-4c6f-8489-1a8bdf3a56ff-em-assets.s3.amazonaws.com/assets/common/500+Internal+Server+Error-cuate.svg'
                        sx={{
                            maxWidth: '35vw',
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}
