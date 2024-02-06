import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import { Box, Grid, Typography } from '@mui/material';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { BASE_URL } from '../../constants/index';
import ReutilizableTable from '@/components/customers/CustomerTable';
const Customer = () => {
    const tableHeaders = ['Razon Social', 'Email', 'RFC', 'CFDI', 'Codigo Postal', 'Telefono']

    interface dataBodyI {
        razonSocial: string,
        email: string,
        rfc: string,
        cfdi: string,
        cp: string,
        telefono: string
    }

    const [tableData, setTableData] = useState<dataBodyI[]>([])

    let rows: dataBodyI[] = [
        {
            razonSocial: 'Jim Loza',
            email: 'jimloza25@gmail.com',
            rfc: 'RFC',
            cfdi: 'CFDI',
            cp: 'Codigo Postal',
            telefono: 'Telefono'
        }

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
            <Grid container alignItems={'center'} justifyContent={'center'} gap={3} marginTop={10} >

                <Grid item md={12}>
                    <Typography variant='h4' textAlign={'center'} >
                        Clientes
                    </Typography>
                </Grid>

                <Grid item md={12} marginX={10}>
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