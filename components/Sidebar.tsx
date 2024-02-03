import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
//icons
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { useRouter } from 'next/router';


const drawerWidth = 240;

const categories = [
    {
        id: 'General',
        children: [
            {
                id: 'Facturas',
                icon: <ReceiptRoundedIcon />,
                active: true,
                url: 'facturas'
            },
            { id: 'Clientes', icon: <AccountBoxRoundedIcon />, url: 'customers' },
            { id: 'Productos', icon: <Inventory2RoundedIcon />, url: 'products' },
            // { id: 'Hosting', icon: <PublicIcon /> },
            // { id: 'Functions', icon: <SettingsEthernetIcon /> },
            // // {
            // //     id: 'Machine learning',
            // //     icon: <SettingsInputComponentIcon />,
            // // },
        ],
    },
    {
        id: 'Configuracion',
        children: [
            { id: 'Usuario', icon: <SettingsIcon />, url: 'usuario' },
            { id: 'Cerrar sesion', icon: <TimerIcon />, url: 'logout' },
            // { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Sidebar(props: DrawerProps) {
    const { ...other } = props;
    const router = useRouter();

    const handleClick = (url: string) => {
        router.push(`/${url}`);
    }

    return (
        <Drawer variant="permanent" sx={{ width: drawerWidth }} {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    EM - Facturacion
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }} onClick={() => handleClick('dashboard')}  >
                    <ListItemIcon >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    // <Box key={id} sx={{ bgcolor: '#101F33' }}>
                    <Box key={id} sx={{ bgcolor: 'background.paper' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, url }) => (
                            <ListItem disablePadding key={childId} onClick={() => handleClick(url)}>
                                <ListItemButton sx={item}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}