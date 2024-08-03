import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomerTableMenu from './TableMenu';
import { TablePagination } from '@mui/material';
import { TableSkeleton } from './TableSkeleton';

import { useGetCustomersQuery } from '@/redux/services/customerApi'
import { NoData } from '../common/NoData';
import { InternalServerError } from '../common/InternalServerError';
import { ErrorI } from '@/types/error/error.interface';

interface dataBodyI {
    id: string,
    legal_name: string,
    email: string,
    phone: string
    tax_id: string,
}

export interface CustomerDataI {
    data: dataBodyI[],
    metadata: {
        page: number,
        total: number
    }
}




export default function CustomerTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { data, error, isLoading, isFetching } = useGetCustomersQuery({ page: page + 1, perPage: rowsPerPage });
    console.log("Datos: ", {
        data,
        error,
        isLoading,
        isFetching
    });

    // if ((error as ErrorI)?.status === 500) {
    //     return <InternalServerError />
    // }
    if (error) {
        return <InternalServerError />
    }

    // if (!data?.data.length) {
    //     return <NoData />
    // }



    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: 'background.default',
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
                boxShadow: 15,
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row" align='center'>
                            Razon Social
                        </TableCell>
                        <TableCell align="right">RFC</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        isLoading ?
                            <TableSkeleton />
                            :
                            data?.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" align='center'>
                                        {row.legal_name}
                                    </TableCell>
                                    <TableCell align="right">{row.tax_id}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right"> <CustomerTableMenu id={row.id} /> </TableCell>
                                </TableRow>
                            ))
                    }

                </TableBody>
            </Table>
            <TablePagination
                rowsPerPage={rowsPerPage}
                component="div"
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                count={data?.metadata.total || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                labelRowsPerPage='Elementos por pagina'
            />
        </TableContainer>
    );
}