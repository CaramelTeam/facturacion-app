import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Grid, Stack } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CardI } from './types/card.interface';



const CardProduct: FC<CardI> = (
    { description, name, productKey, unitName }
): ReactElement => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    Nombre
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h6" component="div">
                    Descripcion
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {description}
                </Typography>
                <Stack direction={'row'} spacing={2} >
                    <Box
                        component='div'
                    >
                        <Typography variant="h6" component="div">
                            Unidad
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {unitName}
                        </Typography>
                    </Box>
                    <Box
                        component='div'
                    >
                        <Typography variant="h6" component="div">
                            Clave
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {productKey}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }} >
                <IconButton>
                    <EditRoundedIcon />
                </IconButton>
                <IconButton color='primary'>
                    <DeleteRoundedIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default CardProduct;