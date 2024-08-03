import Layout from "@/layouts/Layout";
import { useGetCustomerByIDQuery } from "@/redux/services/customerApi";
import { Box, Card, CardContent, Chip, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import toast, { Toaster } from "react-hot-toast";
import TableCustomerInvoice from "@/components/customers/TableInvoice";

//icons
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { EmailRounded } from "@mui/icons-material";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

export default function CustomerDetails(): ReactElement {
    const router = useRouter();
    const { data, isError, isLoading, status, isFetching } = useGetCustomerByIDQuery(router.query.id as string);
    console.log("Data", {
        data,
        isError,
        isLoading,
        status,
        isFetching

    });

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copiado al portapapeles', {
            duration: 6000,
            position: 'top-right',
            icon: '📋',
            style: {
                backgroundColor: '#161B22',
                color: '#fff',
            }
        })
    }


    return (
        <Layout title="customer details" >
            <Toaster />
            <Grid
                container
                gap={2}
                alignItems={'center'}
                justifyContent={'center'}
                marginTop={1}
            >

                <Grid
                    item
                    md={3}
                    sx={{
                        backgroundColor: "background.paper",
                        height: "90vh",
                    }}
                >
                    <Box
                        component='div'
                        padding={2}
                    >

                        <Typography
                            variant='h5'
                            textAlign='center'
                            marginTop={2}
                        >
                            Informacion
                        </Typography>

                        <Typography
                            variant='subtitle2'
                            textAlign='center'
                            color={'text.secondary'}
                        >
                            ID: {data?.id}
                        </Typography>


                        <Divider variant="middle" sx={{ marginTop: 1 }} >
                            Contacto
                        </Divider>

                        <Chip
                            icon={<EmailRounded color={'disabled'} />}
                            label="Email:"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />

                        <Box
                            component='article'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left'
                            }}
                        >
                            <Typography
                                variant="body2"
                                textAlign="left"
                                marginLeft={2}
                            >
                                {data?.email}
                            </Typography>
                            <IconButton
                                size="small"
                                sx={{
                                    marginLeft: 2
                                }}
                                onClick={() => handleCopyToClipboard(data?.email as string)}
                            >
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </Box>

                        <Chip
                            icon={<LocalPhoneRoundedIcon color={'disabled'} />}
                            label="Telefono:"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />

                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.phone ?? 'No disponible'}
                        </Typography>

                        <Divider variant="middle" sx={{ marginTop: 1 }} >
                            Facturacion
                        </Divider>
                        <Chip
                            icon={<Person2RoundedIcon color={'disabled'} />}
                            label="Razon social:"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.legal_name ?? 'No disponible'}
                        </Typography>
                        <Chip
                            icon={<FingerprintRoundedIcon color={'disabled'} />}
                            label="RFC:"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />


                        <Box
                            component='article'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left'
                            }}
                        >
                            <Typography
                                variant="body2"
                                textAlign="left"
                                marginLeft={2}
                            >
                                {data?.tax_id ?? 'No disponible'}
                            </Typography>
                            <IconButton
                                size="small"
                                sx={{
                                    marginLeft: 2
                                }}
                                onClick={() => handleCopyToClipboard(data?.tax_id as string)}
                            >
                                <ContentCopyRoundedIcon />
                            </IconButton>
                        </Box>
                        <Divider variant="middle" sx={{ marginTop: 1 }} >
                            Direccion
                        </Divider>
                        <Chip
                            icon={<MapsHomeWorkRoundedIcon color={'disabled'} />}
                            label="Codigo Postal:"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.zip ?? 'No disponible'}
                        </Typography>
                        <Chip
                            icon={<BusinessRoundedIcon color={'disabled'} />}
                            label="Calle"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.street ?? 'No disponible'}
                        </Typography>

                        <Chip
                            icon={<MapsHomeWorkRoundedIcon color={'disabled'} />}
                            label="Estado"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.street ?? 'No disponible'}
                        </Typography>

                        <Chip
                            icon={<MapsHomeWorkRoundedIcon color={'disabled'} />}
                            label="Municipio"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.municipality ?? 'No disponible'}
                        </Typography>

                        <Chip
                            icon={<MapsHomeWorkRoundedIcon color={'disabled'} />}
                            label="Colonia"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.neighborhood ?? 'No disponible'}
                        </Typography>
                        <Chip
                            icon={<NumbersRoundedIcon color={'disabled'} />}
                            label="Numero exterior"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.neighborhood ?? 'No disponible'}
                        </Typography>
                        <Chip
                            icon={<NumbersRoundedIcon color={'disabled'} />}
                            label="Numero interior"
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'text.secondary',
                            }}
                            size="medium"
                        />
                        <Typography
                            variant="body2"
                            textAlign="left"
                            marginLeft={2}
                        >
                            {data?.neighborhood ?? 'No disponible'}
                        </Typography>

                    </Box>

                </Grid>
                <Grid
                    item
                    md={8}
                    sx={{
                        backgroundColor: "background.paper",
                        height: "90vh",
                        width: "100%",
                    }}
                >
                    <Typography
                        variant='h5'
                        textAlign='center'
                        marginTop={2}
                    >
                        Estado de cuenta
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        textAlign='center'
                        color={'text.secondary'}
                    >
                        {data?.legal_name}
                    </Typography>
                    <Divider variant="middle" sx={{ marginTop: 1 }} >
                        Facturas
                    </Divider>

                    <TableCustomerInvoice />
                </Grid>

            </Grid>

        </Layout>
    )

}