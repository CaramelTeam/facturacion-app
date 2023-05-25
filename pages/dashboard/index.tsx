import React from 'react'

import { Box, Grid, Typography } from '@mui/material';
import OutlinedCard from '@/components/Card';
import CollapsibleTable from '@/components/table/Table';
import { months } from '../../constants';
import Layout from '../../layouts/Layout';
const drawerWidth = 240
const Dashboard = () => {

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

                <Grid item md={12} mb={5}>
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
                        {/* <CollapsibleTable key='current-month' tableCells={tableCell} tableData={tableData} /> */}
                        <CollapsibleTable />
                    </Box>
                </Grid>
            </Grid>
        </Layout >
    )
}

export default Dashboard;
