import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

//icons
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getCookie } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};


interface ProductModalProps {
    handleAddProduct: () => void;
}

const ProductModal: React.FC<ProductModalProps> = (
    { handleAddProduct }
): React.ReactElement => {
    const [open, setOpen] = React.useState(false);
    const [showHelperText, setShowHelperText] = React.useState({
        unitKey: false,
        unitName: false,
    })
    const [values, setValues] = React.useState({
        name: '',
        description: '',
        productKey: '',
        price: '',
        unitKey: '',
        unitName: '',
    })

    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = getCookie('factuToken');


        setLoading(true);
        const newValues = {
            ...values,
            price: parseFloat(values.price),
            productKey: parseInt(values.productKey),
        }
        axios({
            method: 'POST',
            url: `${BASE_URL}/products`,
            data: newValues,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            toast.success(`Producto creado exitosamente`, {
                duration: 6000,
                position: 'top-right',
                icon: '✔',
                style: {
                    backgroundColor: '#161B22',
                    color: '#fff',
                }
            })
            setLoading(false);
            setValues({
                name: '',
                description: '',
                productKey: '',
                price: '',
                unitKey: '',
                unitName: '',
            })
            handleAddProduct();
            handleClose();
        }).catch((err) => {
            console.log(err);
            toast.error(err.response?.data.message ?? 'Ocurrio un error', {
                duration: 6000,
                position: 'top-right',
                icon: '❌',
                style: {
                    backgroundColor: '#161B22',
                    color: '#fff',
                }
            })
            setLoading(false);
        })
    }

    const handleCancel = () => {
        handleClose();
        setValues({
            name: '',
            description: '',
            productKey: '',
            price: '',
            unitKey: '',
            unitName: '',
        })
    }


    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setShowHelperText({
            ...showHelperText,
            [e.target.name]: true
        })
    }

    return (
        <div>
            <Toaster />
            <Button
                variant='contained'
                startIcon={<AddCircleRoundedIcon />}
                onClick={handleOpen}
            >
                Nuevo
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h4' mb={4}>
                        Nuevo producto
                    </Typography>
                    <Box
                        component='form'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        sx={{
                            backgroundColor: 'background.paper',
                            borderRadius: '10px'
                        }}
                        gap={4}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            id='name'
                            name='name'
                            label='Nombre del producto'
                            type='text'
                            sx={{
                                width: '100%',
                            }}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <TextField
                            id='description'
                            name='description'
                            label='Descripcion del producto'
                            type='text'
                            sx={{
                                width: '100%',
                            }}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <TextField
                            id='productKey'
                            name='productKey'
                            label='Clave del producto'
                            type='text'
                            sx={{
                                width: '100%',
                            }}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <TextField
                            id='price'
                            name='price'
                            label='Precio del producto'
                            sx={{
                                width: '100%',
                            }}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                //Permite ingresar mas de un punto
                                // const regex = /[^0-9.](\.\d{1,2})?|(\.\d{3,})/g;
                                const regex = /[^0-9.](\.\d{1,2})?|(\.\d{3,})|(?<=\..*)\./g;
                                e.target.value = e.target.value.replace(regex, '')
                            }}
                            autoComplete='off'
                            onChange={handleInputChange}
                        />
                        <Stack direction='row' spacing={2} >
                            <TextField
                                id='unitKey'
                                name='unitKey'
                                label='Clave medida'
                                helperText={showHelperText.unitKey ? 'Ejemplo: KGM, H87, etc.' : ''}
                                type='text'
                                autoComplete='off'
                                onFocus={handleFocus}
                                onBlur={() => setShowHelperText(
                                    {
                                        ...showHelperText,
                                        unitKey: false
                                    }
                                )}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id='unitName'
                                name='unitName'
                                label='Unidad de medida'
                                helperText={showHelperText.unitName ? 'Ejemplo: Kilogramo, Pieza, etc.' : ''}
                                type='text'
                                autoComplete='off'
                                onFocus={handleFocus}
                                onBlur={() => setShowHelperText(
                                    {
                                        ...showHelperText,
                                        unitName: false
                                    }
                                )}
                                onChange={handleInputChange}
                            />
                        </Stack>
                        <Stack direction='row' spacing={2} >
                            {
                                loading ? (
                                    <CircularProgress color="primary" />
                                ) : (
                                    <>
                                        <Button
                                            variant='outlined'
                                            startIcon={<CancelRoundedIcon />}
                                            onClick={handleCancel}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant='contained'
                                            startIcon={<SaveRoundedIcon />}
                                            type='submit'
                                        >
                                            Guardar
                                        </Button>
                                    </>
                                )
                            }
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ProductModal;