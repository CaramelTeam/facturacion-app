import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomerTableMenu from './TableMenu';
import { TablePagination } from '@mui/material';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomerTable({ tableHeaders, tableRow }: { tableHeaders: string[], tableRow: any[] }) {
    console.log("Table rows:", tableRow.map(row => console.log("rowin", row.razonSocial)));
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* {
                            tableHeaders.map((header, index) => (
                                <TableCell align='center' key={index}>{header}</TableCell>
                            ))
                        } */}
                        <TableCell component="th" scope="row">
                            Razon Social
                        </TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">RFC</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableRow.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" align='center'>
                                    {row.razonSocial}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.telefono}</TableCell>
                                <TableCell align="right">{row.rfc}</TableCell>
                                <TableCell align="right"> <CustomerTableMenu /> </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            <TablePagination
                rowsPerPage={rowsPerPage}
                component="div"
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                count={count}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                labelRowsPerPage='Elementos por pagina'
            />
        </TableContainer>
    );
}