import Layout from '@/layouts/Layout'
import React from 'react'
import { Grid, Typography } from '@mui/material';
import CardProduct from './_cardProducts';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

const ProductsView = () => {
    return (
        <Layout title='Productos' >
            <Grid
                container
                justifyContent='center'
                sx={{
                    minHeight: '100vh',
                }}
            >
                <Grid
                    item
                    mb={3}
                    md={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant='h3' >
                        Productos
                    </Typography>
                </Grid>
                <Grid item >
                    <Box
                        component='div'
                        sx={{
                            backgroundColor: 'background.paper',
                        }}
                        boxShadow={5}
                    >
                        {/* <CardProduct /> */}
                    </Box>
                </Grid>
            </Grid>

            <Box
                component='div'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}
            >
                <Pagination count={10} color="primary" />
            </Box>
        </Layout>
    )
}

export default ProductsView;