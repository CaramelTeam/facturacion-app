import React, { FC, ReactElement, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ItemI, TableProps, dataBody } from './types';
import LongMenu from '../buttons/MenuButton';
import Badge from '@mui/material/Badge';
import { TablePagination } from '@mui/material';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { BASE_URL } from '@/constants';

function createData(
    cliente: string,
    fecha: string,
    tipo: string,
    total: string,
    folio: number,
    pago: ReactElement,
    actions: ReactElement,
    status: string,
    history: ItemI[] | undefined
) {
    return {
        cliente,
        fecha,
        tipo,
        total,
        folio,
        pago,
        actions,
        status,
        history
    };
}

const tableCells: string[] = [
    'Cliente',
    'Fecha',
    'Tipo',
    'Total',
    'Folio',
    'Pago',
    'Status',
]

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.cliente}
                </TableCell>
                <TableCell align="right">{row.fecha}</TableCell>
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.folio}</TableCell>
                <TableCell align="right">{row.pago}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalles
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Clave producto</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                        <TableCell align="right">Total ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history?.map((historyRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{historyRow.productKey}</TableCell>
                                            <TableCell>{historyRow.product}</TableCell>
                                            <TableCell align="right">{historyRow.quantity}</TableCell>
                                            <TableCell align="right">{historyRow.price}</TableCell>
                                            <TableCell align="right">{(historyRow.price * historyRow.quantity)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const CollapsibleTable: FC = (): ReactElement => {
    // const CollapsibleTable: FC<TableProps> = ({
    //     tableCells,
    //     tableData
    // }): ReactElement => {


    const [tableData, setTableData] = useState<dataBody[]>([])
    const [count, setCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    useEffect((): any => {
        const token = getCookie('factuToken');
        const fetchData = async () => {
            const data = await axios({
                method: 'GET',
                url: `${BASE_URL}/invoice/current-month?page=${(page) + 1}&perPage=${rowsPerPage}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const { rows, count } = data.data
            setTableData(rows)
            setCount(count)
        }
        fetchData()
    }, [page, rowsPerPage])

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(newPage + 1);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper} sx={{ width: '80%' }} >
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {
                            tableCells.map((cell, index) => (
                                <TableCell align={index === 0 ? 'left' : 'right'} key={index}>{cell}</TableCell>
                            ))
                        }
                        <TableCell align='right' > Acciones </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData.map((data, index) => (
                            //     // createData(cliente, cancelacion, fecha, tipo, total, folio, pago),
                            <Row key={index} row={{
                                cliente: tableData[index].cliente,
                                fecha: tableData[index].expidition_date.split(',')[0],
                                tipo: tableData[index].type === 'I' ? 'Ingreso' : 'Egreso',
                                total: `$${tableData[index].total}`,
                                folio: tableData[index].folio_number,
                                pago: tableData[index].payment_status === 'pending' ? <Badge color='warning' variant='dot' /> : <Badge color='success' variant='dot' />,
                                status: tableData[index].cancellation_status === 'none' ? 'Activo' : tableData[index].cancellation_status,
                                history: tableData[index].items,
                                // actions: <LongMenu options={{ actions: ['1', '2'] }} />
                                actions: <LongMenu url={tableData[index].url_files} />
                            }} />
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

export default CollapsibleTable;