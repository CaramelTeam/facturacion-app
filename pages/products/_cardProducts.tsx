import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Grid, Stack } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CardI } from '../../types/card.interface';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getCookie } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast';
import EditCardProductModal from './_CardEditProductModal';



const CardProduct: FC<CardI> = (
    { description, name, productKey, unitName, id, handleProduct, price, unitKey }
): ReactElement => {


    const token = getCookie('factuToken');
    const deleteProduct = async () => {
        axios({
            method: 'DELETE',
            url: `${BASE_URL}/products/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            toast.success('Producto eliminado', {
                duration: 6000,
                position: 'top-right',
                icon: '✔',
                style: {
                    backgroundColor: '#161B22',
                    color: '#fff',
                }
            })
            handleProduct()
        }).catch(err => {
            toast.error('Error al eliminar el producto', {
                duration: 6000,
                position: 'top-right',
                icon: '❌',
                style: {
                    backgroundColor: '#161B22',
                    color: '#fff',
                }
            })
            handleProduct()
        })
    }

    return (
        <>
            <Toaster />
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Nombre
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Descripcion
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {description}
                    </Typography>
                    <Stack direction={'row'} spacing={2} >
                        <Box
                            component='div'
                        >
                            <Typography variant="h6" component="div">
                                Unidad
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {unitName}
                            </Typography>
                        </Box>
                        <Box
                            component='div'
                        >
                            <Typography variant="h6" component="div">
                                Clave
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {productKey}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }} >
                    {/* <IconButton >
                        <EditRoundedIcon />
                    </IconButton> */}
                    <EditCardProductModal
                        description={description}
                        name={name}
                        productKey={productKey}
                        unitName={unitName}
                        id={id}
                        handleProduct={handleProduct}
                        price={price}
                        unitKey={unitKey}
                    />
                    <IconButton color='primary' onClick={deleteProduct} >
                        <DeleteRoundedIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}

export default CardProduct;