import React from 'react';
import Layout from '@/layouts/Layout';
import { Box, Grid, Typography } from '@mui/material';
import CustomerReutilizableTable from '@/components/customers/CustomerTable';
import CustomerModal from '@/components/customers/AddCustomerModal';

const Customer = () => {

    return (
        <Layout title='Customer' >
            <Grid container alignItems={'center'} justifyContent={'center'} marginTop={10} >

                <Grid item md={12}>

                    <Box
                        component='div'
                        sx={{
                            backgroundColor: 'background.paper',
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15
                        }}
                        padding={1}
                        boxShadow={5}
                        marginX={5}
                    // borderRadius={5}
                    >
                        <Typography variant='h4' textAlign={'center'} >
                            Clientes
                        </Typography>
                        <Grid item md={12} textAlign={'right'}>
                            <CustomerModal />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item md={12} marginX={5} marginY={2}>
                    <Box
                        component={'div'}
                        boxShadow={10}
                    >
                        <CustomerReutilizableTable />
                    </Box>
                </Grid>
            </Grid>

        </Layout>
    );
}

export default Customer;