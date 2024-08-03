import { useGetCustomersQuery } from '@/redux/services/customerApi'
import { Box, MenuItem, TextField } from '@mui/material';
import React, { FC, ReactElement, useEffect } from 'react'
import { CustomerType } from '../customers/AddCustomerModal';

export const SelectCustomerQuotation: FC = (): ReactElement => {
    const {
        isFetching,
        isLoading,
        data,
        error
    } = useGetCustomersQuery({ page: 1, perPage: 10 });
    console.log('Data:', data);
    return (
        <div>
            <Box
                component='form'
            >
                <h3>Selecciona el cliente</h3>
                <TextField
                    id="legal_name"
                    name='legal_name'
                    label='Razon Social'
                    defaultValue={''}
                    select
                    required
                    fullWidth
                >
                    {
                        data?.data
                            ?
                            data?.data?.map((customer) => (
                                <MenuItem
                                    key={customer.id}
                                    value={customer.legal_name}
                                >
                                    {
                                        customer.legal_name
                                    }

                                </MenuItem>
                            ))
                            :
                            <MenuItem key={0} value={0}>Cargando...</MenuItem>
                    }

                </TextField>

            </Box>
        </div>
    )
}
