import React, { FC, ReactElement, useEffect, useState } from "react";
import { Autocomplete, Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useGetProductsQuery } from "@/redux/services/productsApi";
import { ProductQuotationInfoI, QuotationItemsI } from "./types/quotations.types";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { getCookie } from "cookies-next";


/*
Custom component to format the price of the product in the quotation form 
*/
interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                thousandSeparator
                valueIsNumericString
                prefix="$"
            />
        );
    },
);

const NumericFormatQuantity = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatQuantity(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                decimalSeparator="."
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                thousandSeparator
                valueIsNumericString
            />
        );
    },
);

/*
***********************
*/

export const SelectProductQuotation: FC<{
    productInfo: ProductQuotationInfoI,
    setProductInfo: React.Dispatch<React.SetStateAction<ProductQuotationInfoI>>
}> = (
    { productInfo, setProductInfo }
): ReactElement => {
        const [unitNames, setUnitNames] = useState([{
            key: '',
            description: ''
        }])
        const [items, setItems] = useState<QuotationItemsI[]>([])
        const [values, setValues] = useState({
            quantity: 0,
            product: {
                id: 0,
                name: '',
                description: '',
                price: 0,
                productKey: 0,
                unitKey: '',
                unitName: ''
            }
        })
        const fetchUnitNames = async (unitName: string) => {
            const token = getCookie('factuToken');
            try {
                const data = await axios({
                    method: 'GET',
                    url: `${BASE_URL}/products/catalog/units`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        search: unitName
                    }
                })
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
        useEffect(() => {
            fetchUnitNames(values.product.unitName).then((data) => {
                setUnitNames(data?.data)
            })
                .catch((error) => {
                    console.log(error);
                })
        }, [values.product.unitName])


        const { data } = useGetProductsQuery({ page: 1, perPage: 10 });
        const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            data?.data?.filter((product) => {
                if (product.name === e.target.value) {
                    // setProductInfo({
                    //     ...productInfo,
                    //     id: product.id,
                    //     name: product.name,
                    //     description: product.description,
                    //     price: product.price,
                    //     productKey: product.productKey,
                    //     unitKey: product.unitKey,
                    //     unitName: product.unitName
                    // })
                    setValues({
                        ...values,
                        product: {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            productKey: product.productKey,
                            unitKey: product.unitKey,
                            unitName: product.unitName
                        }
                    })
                }
            })
        }
        const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setItems([
                ...items,
                {
                    quantity: productInfo.quantity ?? 0,
                    product: productInfo
                }
            ])
            setValues({
                quantity: 0,
                product: {
                    id: 0,
                    name: '',
                    description: '',
                    price: 0,
                    productKey: 0,
                    unitKey: '',
                    unitName: ''
                }
            })
            setUnitNames([{
                key: '',
                description: ''
            }])

            console.log('items: ', items);

        }
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }

        const handleUnitNameChange = ({ event, value }: any) => {
            // setProductInfo({
            //     ...productInfo,
            //     unitName: value?.key
            // })

            setValues({
                ...values,
                product: {
                    ...values.product,
                    unitName: value?.key
                }
            })
        }
        // const handleInputChange = ({ event, value }: any) => {
        //     setProductInfo({
        //         ...productInfo,
        //         [event.target.name]: value
        //     })
        // }

        return (
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'center',
                    padding: 2
                }}
                onSubmit={handleOnSubmit}
            >
                <h2>Agrega los productos</h2>
                <TextField
                    id="name"
                    name='name'
                    label='Nombre del producto'
                    select
                    required
                    value={values.product.name ?? ''}
                    onChange={handleProductNameChange}
                    sx={{
                        width: '80%'
                    }}

                >
                    {/* <MenuItem key={0} value={0}>Seleccione un producto</MenuItem> */}
                    {

                        data?.data ?
                            data?.data.map((product) => (
                                <MenuItem
                                    key={product.id}
                                    value={product.name}
                                >
                                    {
                                        product.name
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
                        // spacing={1}
                        justifyContent='space-between'
                    >
                        <TextField
                            id='description'
                            name='description'
                            label='Descripcion'
                            value={values.product.description ?? ''}
                            onChange={handleInputChange}
                            disabled
                            sx={{
                                marginRight: 2
                            }}
                        />
                        <TextField
                            id='productKey'
                            name='productKey'
                            label='Clave de producto'
                            value={values.product.productKey ?? ''}
                            onChange={handleInputChange}
                            disabled
                            sx={{
                                marginRight: 2
                            }}
                        />
                        {/* <TextField
                            id='unitName'
                            name='unitName'
                            label='Clave de unidad'
                            onChange={handleInputChange}
                            select
                            sx={{
                                width: '80%'
                            }}
                            value={unitNames?.filter((unit) => unit.key === productInfo.unitName)[0]?.description ?? ''}
                        >
                            {
                                unitNames?.map((unit) => (
                                    <MenuItem
                                        key={unit.key}
                                        value={unit.description}
                                    >
                                        {
                                            unit.description
                                        }
                                    </MenuItem>
                                ))
                            }
                        </TextField> */}
                        <Autocomplete
                            id="unitName"
                            disablePortal
                            options={unitNames}
                            getOptionLabel={(option) => `${option.key} - ${option.description}`}
                            // onChange={handleUnitNameChange}
                            clearText="Limpiar"
                            sx={{
                                width: '80%'
                            }}
                            onInputChange={(event, value) => {
                                setValues({
                                    ...values,
                                    product: {
                                        ...values.product,
                                        unitName: value
                                    }
                                })
                            }}
                            renderInput={(params) => <TextField {...params} label="Clave de unidad" />}

                        />

                    </Stack>
                </Box>

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
                        justifyContent='space-between'
                    >
                        <TextField
                            id='quantity'
                            name='quantity'
                            label='Cantidad'
                            required
                            fullWidth
                            onChange={handleInputChange}
                            defaultValue={0}
                            value={values.quantity ?? 0}
                            InputProps={{
                                inputComponent: NumericFormatQuantity as any,
                            }}
                        />
                        <TextField
                            label="Valor unitario"
                            id="price"
                            name="price"
                            value={values.product.price ?? 0}
                            autoComplete="off"
                            onChange={handleInputChange}
                            required
                            fullWidth
                            InputProps={{
                                inputComponent: NumericFormatCustom as any,
                            }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            type='submit'
                        >
                            Agregar
                        </Button>

                    </Stack>

                </Box>

            </Box>
        )

    }