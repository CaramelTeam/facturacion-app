import React, { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material';
import { getCookie } from 'cookies-next'
import BasicTable from '@/components/table/Table';
import OutlinedCard from '@/components/Card';
import CollapsibleTable from '@/components/table/Table';
import { months } from '../../constants';
import Layout from '../../layouts/Layout';
import axios from 'axios';

const drawerWidth = 240


const tableCell: string[] = [
    'Cliente',
    'Cancelación',
    'Fecha',
    'Tipo',
    'Total',
    'Folio',
    'Pago'
]

const tableData: any = [
    {
        cliente: 'Cliente 1',
        cancelacion: 'Cancelación 1',
        fecha: 'Fecha 1',
        tipo: 'Tipo 1',
        total: '300',
        folio: 1,
        pago: 222,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    }
]
const Dashboard = () => {

    useEffect(() => {
        // console.log('useEffect', getCookie('factuToken'));
        const token = getCookie('factuToken');

        const fetchData = async () => {
            const data = await axios({
                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_API_URL}/invoice/current-month`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data.data);
        }

        fetchData();
    }, [])


    return (
        <Layout title='Dashboard'>
            <Grid container alignItems={'center'} justifyContent={'center'} gap={3} marginTop={10} >

                <Grid item md={12} lg={3} sm={12} xs={12} >
                    <Box
                        component='div'
                        sx={{ backgroundColor: 'background.paper' }}
                        boxShadow={5}
                    >
                        <OutlinedCard />
                    </Box>
                </Grid>

                <Grid item md={12} lg={3} sm={12} xs={12}>
                    <Box
                        component='div'
                        sx={{ backgroundColor: 'background.paper' }}
                        boxShadow={5}
                    >
                        <OutlinedCard />
                    </Box>
                </Grid>

                <Grid item md={12} lg={3} sm={12} xs={12}>
                    <Box
                        component='div'
                        sx={{ backgroundColor: 'background.paper' }}
                        boxShadow={5}
                    >
                        <OutlinedCard />
                    </Box>
                </Grid>

                <Grid item md={12}>
                    <Box
                        component='div'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        <Typography variant='h4'>
                            Facturas del mes de {months[new Date().getMonth()]}
                        </Typography>
                    </Box>
                    <Box
                        component='div'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CollapsibleTable key='current-month' tableCells={tableCell} tableData={tableData} />
                    </Box>
                </Grid>
            </Grid>
        </Layout >
    )
}

export default Dashboard;
