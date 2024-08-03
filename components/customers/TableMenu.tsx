import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import { ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDeleteCustomerMutation, useGetCustomersQuery } from '@/redux/services/customerApi';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';


const ITEM_HEIGHT = 48;

export default function CustomerTableMenu({
    id
}: { id: string }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [deleteCustomer, { isError, isLoading, isSuccess }] = useDeleteCustomerMutation();
    const { refetch } = useGetCustomersQuery({ page: 1, perPage: 10 });
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        try {
            await deleteCustomer(id);
            if (!isError) {
                toast.success('Cliente eliminado', {
                    duration: 6000,
                    position: 'top-right',
                    icon: '✔',
                    style: {
                        backgroundColor: '#161B22',
                        color: '#fff',
                    }

                })
                handleClose();
                refetch();
            }
        } catch (error) {
            toast.error('Error al eliminar el cliente', {
                duration: 6000,
                position: 'top-right',
                icon: '❌',
                style: {
                    backgroundColor: '#161B22',
                    color: '#fff',
                }
            })
        }
    }

    const handleOpenDetails = () => {
        router.push(`/customers/${id}`);
    }


    // const handleDownload = () => {
    //     window.open(url, '_blank');
    // }

    return (
        <div>
            <Toaster />
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem key={'edit'} onClick={handleClose}  >
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText >
                        Editar
                    </ListItemText>

                </MenuItem>
                <MenuItem key={'delete'} onClick={handleDelete}  >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText >
                        Eliminar
                    </ListItemText>
                </MenuItem>
                <MenuItem key={'details'} onClick={handleOpenDetails}  >
                    <ListItemIcon>
                        <ReadMoreIcon />
                    </ListItemIcon>
                    <ListItemText >
                        Detalles
                    </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}