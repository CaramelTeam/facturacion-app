import { Skeleton, TableCell, TableRow } from '@mui/material'
import React from 'react'

export const TableSkeleton = () => {
    return (
        <>
            <TableRow key={0}>
                <TableCell component="th" scope="row" align='center'>
                    <Skeleton animation="wave" />

                </TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right"> <Skeleton animation="wave" /> </TableCell>
            </TableRow>
            <TableRow key={1}>
                <TableCell component="th" scope="row" align='center'>
                    <Skeleton animation="wave" />

                </TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right"> <Skeleton animation="wave" /> </TableCell>
            </TableRow>
            <TableRow key={2}>
                <TableCell component="th" scope="row" align='center'>
                    <Skeleton animation="wave" />

                </TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right"> <Skeleton animation="wave" /> </TableCell>
            </TableRow>
            <TableRow key={3}>
                <TableCell component="th" scope="row" align='center'>
                    <Skeleton animation="wave" />

                </TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right"> <Skeleton animation="wave" /> </TableCell>
            </TableRow>
            <TableRow key={4}>
                <TableCell component="th" scope="row" align='center'>
                    <Skeleton animation="wave" />

                </TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right"> <Skeleton animation="wave" /> </TableCell>
            </TableRow>
            <TableRow key={5}>
                <TableCell component="th" scope="row" align='center'>
                    <Skeleton animation="wave" />

                </TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right">{<Skeleton animation="wave" />}</TableCell>
                <TableCell align="right"> <Skeleton animation="wave" /> </TableCell>
            </TableRow>


        </>
    )
}
