import { useGetCustomersQuery } from '@/redux/services/customerApi'
import { Box, MenuItem, Stack, TextField } from '@mui/material';
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { CustomerType, TaxSystemOption } from '../customers/AddCustomerModal';
import CfdiTypes from '@/constants/cfdi.json';
import { CustomerQuiotationType } from '@/pages/quotations';


export const SelectCustomerQuotation: FC<{
    customerInfo: CustomerQuiotationType,
    setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerQuiotationType>>
}> = ({ customerInfo, setCustomerInfo }): ReactElement => {
    const [taxSystemOptions, setTaxSystemOptions] = useState<TaxSystemOption>()
    // const [customerInfo, setCustomerInfo] = useState({
    //     id: '',
    //     legal_name: '',
    //     tax_id: '',
    //     zip: '',
    //     tax_system: '',
    //     preferred_cfdi: ''
    // })
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        const taxSystems = CfdiTypes.filter(key => key.clave === customerInfo.preferred_cfdi)[0]
        setTaxSystemOptions(taxSystems)

    }, [customerInfo.preferred_cfdi])
    const handleLegalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        data?.data?.filter((customer) => {
            if (customer.legal_name === e.target.value) {
                setCustomerInfo({
                    id: customer.id,
                    legal_name: customer.legal_name,
                    tax_id: customer.tax_id,
                    zip: customer.zip,
                    tax_system: customer.tax_system,
                    preferred_cfdi: customer.preferred_cfdi
                })
                console.log('Customer info: ', customerInfo);

            }
        })


    }
    const {
        isLoading,
        data,
        error
    } = useGetCustomersQuery({ page: 1, perPage: 10 });
    return (
        <Box
            component='div'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                padding: 2,
            }}
        >

            <h2>Selecciona el cliente</h2>

            <TextField
                id="legal_name"
                name='legal_name'
                label='Razon Social'
                value={customerInfo.legal_name}
                onChange={handleLegalNameChange}
                select
                required
                sx={{
                    width: '80%'
                }}
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
            <Box
                component='div'
                sx={{
                    width: '80%',
                    marginTop: 2
                }}
            >
                <Stack
                    direction='row'
                    spacing={2}
                >
                    <TextField
                        id='tax_id'
                        name='tax_id'
                        label='RFC'
                        // disabled
                        fullWidth
                        required
                        // disabled={customerInfo.legal_name ? false : true}
                        disabled
                        value={customerInfo.tax_id}
                        onChange={handleOnChange}
                    >
                    </TextField>
                    <TextField
                        fullWidth
                        id='zip'
                        name='zip'
                        label='Codigo Postal'
                        required
                        // disabled={customerInfo.legal_name ? false : true}
                        disabled
                        value={customerInfo.zip}
                        onChange={handleOnChange}
                    >
                        {
                            customerInfo.zip
                        }

                    </TextField>
                </Stack>
            </Box>
            <TextField
                id="tax_system"
                name="tax_system"
                label="Regimen fiscal"
                onChange={handleOnChange}
                value={taxSystemOptions?.regimen_options.filter((option) => option.clave === customerInfo.tax_system)[0]?.description || ''}
                required
                disabled
                sx={{
                    width: '80%',
                    marginTop: 2
                }}
            />

            <TextField
                id="preferred_cfdi"
                name="preferred_cfdi"
                label="Uso de CFDI"
                // defaultValue={""}
                onChange={handleOnChange}
                select
                required
                disabled={customerInfo.legal_name ? false : true}
                value={customerInfo.preferred_cfdi}
                sx={{
                    width: '80%',
                    marginTop: 2
                }}
            >
                {
                    CfdiTypes.map(cfdi => (
                        <MenuItem key={cfdi.id} value={cfdi.clave}>{cfdi.description}</MenuItem>
                    ))
                    // CfdiTypes.filter((cfdi) => cfdi.regimen_options.filter((option) => option.clave === customerInfo.tax_system))[0].regimen_options.map((cfdi) => (
                    //     <MenuItem key={cfdi.clave} value={cfdi.clave}>{cfdi.description}</MenuItem>
                    // ))
                }
            </TextField>

        </Box>
    )
}
