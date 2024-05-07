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

const ITEM_HEIGHT = 48;

export default function CustomerTableMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleDownload = () => {
    //     window.open(url, '_blank');
    // }

    return (
        <div>
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
                <MenuItem key={'delete'} onClick={handleClose}  >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText >
                        Eliminar
                    </ListItemText>
                </MenuItem>
                <MenuItem key={'details'} onClick={handleClose}  >
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