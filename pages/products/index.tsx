import Layout from '@/layouts/Layout'
import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Divider, IconButton, Button } from '@mui/material';
import CardProduct from './_cardProducts';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { BASE_URL } from '../../constants/index';
import { getCookie } from 'cookies-next';
import { CardI } from './types/card.interface';

//icons
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

const ProductsView = () => {

    const [products, setProducts] = useState<CardI[]>([]);

    useEffect(() => {
        const token = getCookie('factuToken');
        const getProducts = async () => {
            const resp = await axios({
                method: 'GET',
                url: `${BASE_URL}/products`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            setProducts(resp.data)
        }
        getProducts()
    }, [])


    return (
        <Layout title='Productos' >
            <Box
                component='div'
                sx={{
                    minHeight: '100vh'
                }}
            >

                <Grid
                    container
                    justifyContent={'center'}
                    gap={3}
                >
                    <Grid item md={12}
                        display='flex'
                        justifyContent='center'
                    >
                        <Typography variant="h4">
                            Catalogo de productos
                        </Typography>

                    </Grid>
                    <Grid
                        item
                        md={12}
                        display='flex'
                        justifyContent='end'

                    >
                        <Button
                            variant='contained'
                            startIcon={<AddCircleRoundedIcon />}
                        >
                            Nuevo
                        </Button>
                    </Grid>
                    <Divider />
                    {
                        products.map((product, index) => (
                            <Grid
                                item
                                md={3}
                                lg={3}
                                sm={12}
                                xs={12}
                                key={index}
                                marginX={2}
                            >
                                <CardProduct
                                    key={product.id}
                                    productKey={product.productKey}
                                    description={product.description}
                                    name={product.name}
                                    unitName={product.unitName}
                                />

                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <Pagination count={10} color="primary" sx={{
                display: 'flex',
                justifyContent: 'center',
            }} />

        </Layout>
    )
}

export default ProductsView;