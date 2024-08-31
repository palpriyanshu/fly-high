import React, {FC, useState} from 'react';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {FlightDetail} from "../../types/flight-details";
import {Paper, TablePagination} from "@mui/material";

const FlightsBoardHeaders = () => {
    return <TableHead>
        <TableRow>
            <TableCell>Flight Number</TableCell>
            <TableCell align="right">Airline</TableCell>
            <TableCell align="right">Origin</TableCell>
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Departure Time</TableCell>
            <TableCell align="right">Status</TableCell>
        </TableRow>
    </TableHead>
};

type FlightRowProps = {
    flightDetail: FlightDetail
}

const FlightRow: FC<FlightRowProps> = ({ flightDetail }) => {
    return <TableRow>
        <TableCell>{flightDetail.flightNumber}</TableCell>
        <TableCell align="right">{flightDetail.airline}</TableCell>
        <TableCell align="right">{flightDetail.origin}</TableCell>
        <TableCell align="right">{flightDetail.destination}</TableCell>
        <TableCell align="right">{flightDetail.departureTime}</TableCell>
        <TableCell align="right">{flightDetail.status}</TableCell>
    </TableRow>
};

type Props = {
    flightList: FlightDetail[]
};
const FlightsBoard: FC<Props> = ({flightList}) => {
    const [currentPage, setPage] = useState(0);
    const rowsPerPage = 10;

    return <Paper>
    <Table>
        <FlightsBoardHeaders/>
        <TableBody>
            {
                flightList
                    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                    .map((flightDetail) => (
                    <FlightRow key={flightDetail.flightNumber} flightDetail={flightDetail} />
                ))
            }
        </TableBody>
    </Table>
    <TablePagination
        component="div"
        count={flightList.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(_: any, newPageIndex: number) => setPage(newPageIndex)}
    />
    </Paper>
}

export default FlightsBoard;