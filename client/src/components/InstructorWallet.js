

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useWallet from './CustomHooks/getWallet';

function createData(
    month,
    earning
) {
    return { month, earning };
}

const rows = [
    createData('2022/1', 159),
    createData('2022/1', 159),
];

function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> Month </TableCell>
                        <TableCell align="right">Earning</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.month}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.month}
                            </TableCell>
                            <TableCell align="right">{row.earning}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function InstructorWallet() {
    const wallet = useWallet();
    return (
        <div>
            <h1 className='text-center'>Total Earning: {wallet}</h1>
            <BasicTable></BasicTable>
        </div>
    )
}
