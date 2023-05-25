import React, { FC, ReactElement } from 'react'
import { LayoutI } from './types/layout.interface';
import Sidebar from '@/components/Sidebar';
import { Box } from '@mui/material';

const drawerWidth = 240;

const Layout: FC<LayoutI> = (
    { children, title }
): ReactElement => {
    return (
        <>
            <Sidebar />
            <Box component='main' sx={{
                width: `calc(100%) - ${drawerWidth}px`,
                marginLeft: `+${drawerWidth}px`,
                flexGrow: 1,
                padding: '10px 10px 10px 0px',
                // backgroundColor: 'red',
                minHeight: '100vh'
            }}>
                {children}
            </Box>
        </>
    )

}

export default Layout;