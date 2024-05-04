import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Box, Button, Grid, Typography } from '@mui/material';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { BASE_URL } from '../../constants/index';
import ReutilizableTable from '@/components/customers/CustomerTable';
import CustomerModal from '@/components/customers/AddCustomerModal';
const Customer = () => {
    const tableHeaders = ['Razon Social', 'Email', 'Telefono', 'RFC', 'Actions']

    interface dataBodyI {
        razonSocial: string,
        email: string,
        telefono: string
        rfc: string,
    }

    const [tableData, setTableData] = useState<dataBodyI[]>([])

    let rows: dataBodyI[] = [
        {
            razonSocial: 'Jim Loza',
            email: 'jimloza25@gmail.com',
            rfc: 'RFC',
            telefono: 'Telefono'
        },
        {
            razonSocial: 'Carlos',
            email: 'jimloza25@gmail.com',
            rfc: 'RFC',
            telefono: 'Telefono'
        },

    ]

    useEffect((): any => {
        const token = getCookie('token')
        const fetchData = async () => {
            const data = await axios({
                method: 'GET',
                url: `${BASE_URL}/customer?page=1&perPage=1`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const { rows } = data.data

            console.log("Rows: ", data.data);

        }

        fetchData()
    }, [])

    return (
        <Layout title='Customer' >
            <Grid container alignItems={'center'} justifyContent={'center'} marginTop={10} >

                <Grid item md={12}>
                    <Typography variant='h4' textAlign={'center'} >
                        Clientes
                    </Typography>
                </Grid>
                <Grid item md={12} textAlign={'right'} marginX={10}>
                    <CustomerModal />
                </Grid>

                <Grid item md={12} marginX={10} marginY={2}>
                    <Box
                        component={'div'}
                        sx={{ backgroundColor: 'background.paper' }}
                        boxShadow={5}
                    >
                        <ReutilizableTable tableHeaders={tableHeaders} tableRow={rows} />
                    </Box>
                </Grid>
            </Grid>

        </Layout>
    );
}

export default Customer;