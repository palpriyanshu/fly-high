import React, {FC, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";

import {FlightDetail} from "../../types/flight-details";
import {Box, TablePagination} from "@mui/material";
import "./FlightsBoard.css"
import fetchApis from "../../resources/fetch-api";

const FlightsBoardHeaders = () => {
    return <TableHead className='flight-board-header'>
        <TableRow>
            <TableCell>Flight Number</TableCell>
            <TableCell>Airline</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Status</TableCell>
        </TableRow>
    </TableHead>
};

type FlightRowProps = {
    flightDetail: FlightDetail
}

const FlightRow: FC<FlightRowProps> = ({ flightDetail }) => {
    const navigate = useNavigate();

    return <TableRow onClick={() => navigate(`/flight/${flightDetail.flightNumber}`)} data-testid={`flight-row-${flightDetail.flightNumber}`}>
        <TableCell>{flightDetail.flightNumber}</TableCell>
        <TableCell>{flightDetail.airline}</TableCell>
        <TableCell>{flightDetail.origin}</TableCell>
        <TableCell>{flightDetail.destination}</TableCell>
        <TableCell>{flightDetail.departureTime}</TableCell>
        <TableCell>{flightDetail.status}</TableCell>
    </TableRow>
};

const FlightsBoard: FC = () => {
    const [currentPage, setPage] = useState(0);
    const [flightData, setFlightData] = useState<FlightDetail[]>([])

    useEffect(() => {
        fetchApis.fetchFlightList().then(
            (response: FlightDetail[]) => {
                setFlightData(response);
            }
        );
    }, []);


    const rowsPerPage = 10;

    return <Box className='flight-board'>
        <TableContainer className='flight-board-container' sx={{width: '80%'}}>
    <Table>
        <FlightsBoardHeaders/>
        {
            flightData.length > 0 ? <TableBody className='flight-board-body'>
                {
                    flightData
                        .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                        .map((flightDetail) => (
                            <FlightRow key={flightDetail.flightNumber} flightDetail={flightDetail} />
                        ))
                }
            </TableBody> : <p>No Flight Detail is available</p>
        }

    </Table>
    <TablePagination
        className='flight-board-pagination'
        component="div"
        count={flightData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(_: any, newPageIndex: number) => setPage(newPageIndex)}
    />
        </TableContainer>
    </Box>
}

export default FlightsBoard;