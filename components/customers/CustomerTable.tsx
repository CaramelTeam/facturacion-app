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
import { getCookie } from 'cookies-next';
import { BASE_URL } from '@/constants';
import axios from 'axios';
import { TableSkeleton } from './TableSkeleton';

interface dataBodyI {
    id: string,
    legal_name: string,
    email: string,
    phone: string
    tax_id: string,
}

export interface customerDataI {
    data: dataBodyI[],
    metadata: {
        page: number,
        total: number
    }
}

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

export default function CustomerTable() {
    // console.log("Table rows:", tableRow.map(row => console.log("rowin", row.razonSocial)));

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [tableData, setTableData] = useState<customerDataI>()
    const [loading, setLoading] = useState(true)

    useEffect((): any => {
        const token = getCookie('token')
        const fetchData = async () => {
            const data = await axios({
                method: 'GET',
                url: `${BASE_URL}/customer?page=1&perPage=1`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            setTableData(data.data)
            setCount(data.data.metadata.total)
            setLoading(false)

        }
        fetchData()
    }, [rowsPerPage, page])

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
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* {
                            tableHeaders.map((header, index) => (
                                <TableCell align='center' key={index}>{header}</TableCell>
                            ))
                        } */}
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
                        loading ?
                            <TableSkeleton />
                            :
                            tableData?.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" align='center'>
                                        {row.legal_name}
                                    </TableCell>
                                    <TableCell align="right">{row.tax_id}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
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