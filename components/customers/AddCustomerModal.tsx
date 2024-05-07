import { Box, Button, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
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
    const [error, setError] = useState({
        legal_name: false,
        tax_id: false,
        email: false,
        preferred_cfdi: false,
        tax_system: false,
        zip: false,
        phone: false
    });
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
        const taxSystems = CfdiTypes.filter(key => key.clave === values.preferred_cfdi)[0]
        setTaxSystemOptions(taxSystems)

    }, [values.preferred_cfdi])

    const handleClose = (): void => {
        setOpen(false);
        setError({
            legal_name: false,
            tax_id: false,
            email: false,
            preferred_cfdi: false,
            tax_system: false,
            zip: false,
            phone: false
        });
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

    const validateDataInputs = (inputName: string, inputValue: string) => {
        switch (inputName) {
            case 'tax_id':
                const re_rfc = /^(?=\S+$)[A-Za-z0-9]{12,13}$/;
                const isValidRfc: boolean = re_rfc.test(inputValue);
                return isValidRfc;

            case 'email':
                const re_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValidEmail: boolean = re_email.test(inputValue);
                return isValidEmail;
            case 'legal_name':
                const re_legalName = /^[a-zA-Z\s]{6,}$/;
                const isValidLegalName: boolean = re_legalName.test(inputValue.trim())
                return isValidLegalName;
            case 'phone':
                const re_phone = /^\d{10}$/;
                const isValidPhone: boolean = re_phone.test(inputValue.trim())
                return isValidPhone;
            case 'zip':
                const re_zip = /^\d{5}$/;
                const isZip: boolean = re_zip.test(inputValue.trim())
                return isZip;
            default:
                return false
        }

    }


    const handleOnblurInputs = (e: React.FocusEvent<HTMLInputElement>) => {
        const hasError = validateDataInputs(e.target.name, e.target.value);
        setError({
            ...error,
            [e.target?.name]: !hasError
        })
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
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.toUpperCase()
                            }}
                            autoComplete="off"
                            onChange={handleInputChange}
                            onBlur={handleOnblurInputs}
                            error={error.legal_name}
                            helperText={error.legal_name ? 'Razon Social invalida' : ''}
                            required
                            fullWidth
                        />
                        <TextField
                            id="tax_id"
                            name="tax_id"
                            label="RFC"
                            type="text"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.toUpperCase()
                            }}
                            autoComplete="off"
                            onChange={handleInputChange}
                            onBlur={handleOnblurInputs}
                            error={error.tax_id}
                            helperText={error.tax_id ? 'RFC invalido' : ''}
                            required
                            fullWidth
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            error={error.email}
                            autoComplete="off"
                            onChange={handleInputChange}
                            onBlur={handleOnblurInputs}
                            helperText={error.email ? 'Email invalido' : ''}
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
                            onBlur={handleOnblurInputs}
                            error={error.phone}
                            helperText={error.phone ? 'Ingresa un numero de telefono valido' : ''}
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
                                    onBlur={handleOnblurInputs}
                                    error={error.zip}
                                    helperText={error.zip ? 'Codigo postal invalido' : ''}
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