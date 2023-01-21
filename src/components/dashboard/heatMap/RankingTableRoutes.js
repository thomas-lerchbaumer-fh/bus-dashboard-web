import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CircularProgress} from "@mui/material";


const RankingTableRoutes = (props) => {

    const {ranking,loading} = props

    return (
        (loading)?<CircularProgress></CircularProgress>:
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="left">Departure</TableCell>
                            <TableCell align="left">Destination</TableCell>
                            <TableCell align="left">Requests</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ranking.map((row) => (
                            <TableRow
                                key={row.area}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.place}
                                </TableCell>
                                <TableCell align="left">{row.areaDep}</TableCell>
                                <TableCell align="left">{row.areaDest}</TableCell>
                                <TableCell align="left">{row.requests}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )

}


export default RankingTableRoutes