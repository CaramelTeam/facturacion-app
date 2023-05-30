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
import ProductModal from './_creatProductModal';

const ProductsView = () => {

    const [products, setProducts] = useState<CardI[]>([]);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
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
        console.log(resp.data);

        const { rows, count } = resp.data
        setProducts(rows)
        // const newCount = count / 10;
        setCount(count)
    }

    useEffect(() => {
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
                        <ProductModal handleAddProduct={getProducts} />
                    </Grid>
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
                                    id={product.id}
                                    price={product.price}
                                    unitKey={product.unitKey}
                                    handleProduct={getProducts}
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