import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { FC, ReactElement, useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { getCookie } from "cookies-next";


import axios from "axios";
import { BASE_URL } from "@/constants";
import RegimenTypes from '../../constants/regimen.json'
import CfdiTypes from '../../constants/cfdi.json'

const CustomerModal: FC = (): ReactElement => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    };

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [values, setValues] = React.useState({
        legal_name: '',
        tax_id: '',
        email: '',
        phone: '',
        preferred_cfdi: '',
        tax_system: '',
        zip: '',
    })

    type regimenOptions = {
        id: number,
        clave: string
        description: string
    }
    type TaxSystemOption = {
        id: number
        clave: string
        description: string
        regimen_options: regimenOptions[]
    }

    const [taxSystemOptions, setTaxSystemOptions] = useState<TaxSystemOption>()


    useEffect(() => {
        console.log('Ejecutando y cambiando el estado');
        const taxSystems = CfdiTypes.filter(key => key.clave === values.preferred_cfdi)[0]
        setTaxSystemOptions(taxSystems)

    }, [values.preferred_cfdi])


    const handleClose = (): void => {
        setOpen(false);
        setError(false);
        setValues({
            legal_name: '',
            tax_id: '',
            email: '',
            phone: '',
            preferred_cfdi: '',
            tax_system: '',
            zip: '',
        })
    };
    const handleOpen = (): void => setOpen(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleOnBlurCheckEmail = (e: React.FocusEvent<HTMLInputElement>) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail: boolean = re.test(e.target.value);
        setError(!isValidEmail);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit', values);
        const token = getCookie('factuToken');

        // try {
        //     await axios({
        //         method: 'post',
        //         url: `${BASE_URL}/customer`,
        //         data: values,
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        // } catch (error) {
        //     console.log('error', error);
        // }
    }

    // const handleOnBlurCheckRFC = (e: React.FocusEvent<HTMLInputElement>) => {

    //     console.log('focus', e.target.value);
    //     console.log('focus', e);

    // }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Agregar
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={style}

                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
                        Cliente
                    </Typography>

                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { mt: 2 } }}
                        onSubmit={handleSubmit}

                    // sx={{ marginTop: 2 }}
                    >
                        <TextField
                            id="legal_name"
                            name="legal_name"
                            label="Razon Social"
                            autoComplete="off"
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            id="tax_id"
                            name="tax_id"
                            label="RFC"
                            type="text"
                            autoComplete="off"
                            onChange={handleInputChange}
                            // onBlur={handleFocusCheckRFC}
                            required
                            fullWidth
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            error={error}
                            autoComplete="off"
                            onChange={handleInputChange}
                            onBlur={handleOnBlurCheckEmail}
                            helperText={error ? 'Email invalido' : ''}
                            required
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
                            onChange={handleInputChange}
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
                            <Stack direction={'row'} spacing={2}>
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
                                <TextField
                                    id="zip"
                                    name="zip"
                                    type="text"
                                    label="Codigo postal"
                                    onChange={handleInputChange}
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                    }}
                                    inputProps={{ maxLength: 5 }}
                                    required
                                />

                            </Stack>

                        }

                        <Button variant="contained" startIcon={<SaveIcon />} fullWidth type="submit" disabled={values.preferred_cfdi ? false : true} >
                            Guardar
                        </Button>
                        <Button variant="outlined" fullWidth onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </>


    );
}

export default CustomerModal;