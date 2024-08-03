import Layout from '@/layouts/Layout';
import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import CfdiTypes from '@/constants/cfdi.json';
import MexicoStates from '@/constants/states.json';
import Municipalities from '@/constants/municipality-states.json';
import { TaxSystemOption } from '@/components/customers/AddCustomerModal';


type Municipality = {
    [key: string]: string[]
}


const EditCustomer = () => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            state: capitalizeFirstLetter(e.target.value)
        })
    }

    const [values, setValues] = useState({
        legal_name: '',
        tax_id: '',
        email: '',
        phone: '',
        preferred_cfdi: '',
        tax_system: '',
        zip: '',
        street: '',
        exterior: '',
        interior: '',
        neighborhood: '',
        city: '',
        municipality: '',
        state: '',
        country: 'Mexico'
    })
    const [taxSystemOptions, setTaxSystemOptions] = useState<TaxSystemOption>()

    useEffect(() => {
        const taxSystems = CfdiTypes.filter(key => key.clave === values.preferred_cfdi)[0]
        setTaxSystemOptions(taxSystems)

    }, [values.preferred_cfdi])

    function capitalizeFirstLetter(sentence: string): string {
        return sentence
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }


    return (
        <Layout
            title='Edit Customer'
        >
            <Paper
                sx={{
                    padding: 2,
                }}
                component={'form'}
            >
                <Grid
                    container
                >
                    <Grid
                        item
                        md={6}
                        sx={{
                            '& > :not(style)': { mt: 2, width: '80%' }
                        }}
                        textAlign={'center'}
                    >
                        <Typography
                            variant='h6'
                            textAlign='center'
                        >
                            Datos Generales
                        </Typography>
                        <TextField
                            id="legal_name"
                            name="legal_name"
                            label="Razon Social"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/^[^a-zA-Z0-9]+$/, '').toUpperCase()
                            }}
                            autoComplete="off"
                            // onChange={handleInputChange}
                            // onBlur={handleOnblurInputs}
                            // error={error.legal_name}
                            // helperText={error.legal_name ? 'Razon Social invalida' : ''}
                            required

                        />
                        <TextField
                            id="tax_id"
                            name="tax_id"
                            label="RFC"
                            type="text"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/^[^a-zA-Z0-9]+$/, '').toUpperCase()
                            }}
                            autoComplete="off"
                            // onChange={handleInputChange}
                            // onBlur={handleOnblurInputs}
                            // error={error.tax_id}
                            // helperText={error.tax_id ? 'RFC invalido' : ''}
                            required
                            fullWidth
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            // error={error.email}
                            // autoComplete="off"
                            // onChange={handleInputChange}
                            // onBlur={handleOnblurInputs}
                            // helperText={error.email ? 'Email invalido' : ''}
                            fullWidth
                        />

                        <TextField
                            id="phone"
                            name="phone"
                            type="tel"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                            label="Telefono"
                            autoComplete="off"
                            // onChange={handleInputChange}
                            // onBlur={handleOnblurInputs}
                            // error={error.phone}
                            // helperText={error.phone ? 'Ingresa un numero de telefono valido' : ''}
                            fullWidth
                        />

                        <TextField
                            id="preferred_cfdi"
                            name="preferred_cfdi"
                            label="Uso de CFDI"
                            defaultValue={""}
                            onChange={handleInputChange}
                            select
                            required
                            fullWidth
                        >
                            {
                                CfdiTypes.map(cfdi => (
                                    <MenuItem key={cfdi.id} value={cfdi.clave}>{cfdi.description}</MenuItem>
                                ))
                            }
                        </TextField>
                        {
                            values.preferred_cfdi &&
                            <TextField
                                id="tax_system"
                                name="tax_system"
                                label="Regimen fiscal"
                                defaultValue={""}
                                onChange={handleInputChange}
                                select
                                required
                                fullWidth
                            >
                                {
                                    taxSystemOptions ?
                                        taxSystemOptions?.regimen_options.map(regimen => (
                                            <MenuItem key={regimen.id} value={regimen.clave}>{regimen.description}</MenuItem>
                                        )) :

                                        <MenuItem key={0} value={0}>Cargando...</MenuItem>
                                }
                            </TextField>
                        }
                        <TextField
                            id="zip"
                            name="zip"
                            type="text"
                            label="Codigo postal"
                            onChange={handleInputChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                            // onBlur={handleOnblurInputs}
                            // error={error.zip}
                            // helperText={error.zip ? 'Codigo postal invalido' : ''}
                            inputProps={{ maxLength: 5 }}
                            required
                        />
                        <TextField
                            id="tax_system"
                            name="tax_system"
                            label="Regimen fiscal"
                            defaultValue={""}
                            onChange={handleInputChange}
                            select
                            required
                            fullWidth
                        >
                            {
                                taxSystemOptions ?
                                    taxSystemOptions?.regimen_options.map(regimen => (
                                        <MenuItem key={regimen.id} value={regimen.clave}>{regimen.description}</MenuItem>
                                    )) :

                                    <MenuItem key={0} value={0}>Cargando...</MenuItem>
                            }
                        </TextField>

                    </Grid>
                    <Grid
                        item
                        md={6}
                        sx={{
                            '& > :not(style)': {
                                mt: 2,
                                width: '80%'
                            }
                        }}
                        textAlign={'center'}
                    >
                        <Typography
                            variant='h6'
                            textAlign='center'
                        >
                            Datos de la empresa
                        </Typography>
                        <TextField
                            id="street"
                            name="street"
                            label="Calle"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/^[^a-zA-Z0-9]+$/, '')
                            }}
                            autoComplete="off"
                            onChange={handleInputChange}
                            // onBlur={handleOnblurInputs}
                            // error={error.legal_name}
                            // helperText={error.legal_name ? 'Razon Social invalida' : ''}
                            fullWidth
                        />
                        <TextField
                            id="exterior"
                            name="exterior"
                            type="text"
                            label="Numero exterior"
                            onChange={handleInputChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                            // onBlur={handleOnblurInputs}
                            // error={error.zip}
                            // helperText={error.zip ? 'Codigo postal invalido' : ''}
                            inputProps={{ maxLength: 8 }}
                        />
                        <TextField
                            id="interior"
                            name="interior"
                            type="text"
                            label="Numero interior"
                            onChange={handleInputChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                            // onBlur={handleOnblurInputs}
                            // error={error.zip}
                            // helperText={error.zip ? 'Codigo postal invalido' : ''}
                            inputProps={{ maxLength: 8 }}
                        />
                        <TextField
                            id="state"
                            name="state"
                            label="Estado"
                            defaultValue={""}
                            onChange={handleStateChange}
                            select
                            fullWidth
                        >
                            {
                                MexicoStates.map(mexicoStates => (
                                    <MenuItem key={mexicoStates.clave} value={mexicoStates.nombre}>{mexicoStates.nombre}</MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField
                            id="city"
                            name="city"
                            type="text"
                            label="Ciudad"
                            onChange={handleInputChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/^[^a-zA-Z0-9]+$/, '')
                            }}
                            // onBlur={handleOnblurInputs}
                            // error={error.zip}
                            // helperText={error.zip ? 'Codigo postal invalido' : ''}
                            inputProps={{ maxLength: 8 }}
                        />
                        {
                            values.state &&
                            <TextField
                                id="municipality"
                                name="municipality"
                                label="Municipio"
                                defaultValue={""}
                                onChange={handleInputChange}
                                select
                                fullWidth
                            >
                                {
                                    (Municipalities as Municipality)[capitalizeFirstLetter(values.state) as string].map((municipality) => (
                                        <MenuItem key={municipality} value={municipality}>{capitalizeFirstLetter(municipality)}</MenuItem>
                                    ))
                                }
                            </TextField>
                        }
                        <TextField
                            id="neighborhood"
                            name="neighborhood"
                            type="text"
                            label="Colonia"
                            onChange={handleInputChange}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/^[^a-zA-Z0-9]+$/, '')
                            }}
                            // onBlur={handleOnblurInputs}
                            // error={error.zip}
                            // helperText={error.zip ? 'Codigo postal invalido' : ''}
                            inputProps={{ maxLength: 8 }}
                        />

                    </Grid>
                    <Grid
                        item
                        md={12}
                        sx={{
                            '& > :not(style)': {
                                mt: 2,
                                width: '80%'
                            }
                        }}
                        textAlign={'center'}
                    >
                        <Button
                            color='primary'
                            variant='contained'
                        >
                            Guardar
                        </Button>
                        <Button
                            color='primary'
                            variant='outlined'
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>

            </Paper>
        </Layout>
    )
}

export default EditCustomer;