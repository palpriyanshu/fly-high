import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {FlightDetail} from "../../types/flight-details";

import "./FlightTableHead.css";

type column = {
    id: keyof FlightDetail;
    label: string;
}

const columns: column[] = [
    {
        id: "flightNumber",
        label: "Flight Number",
    },
    {
        id: "airline",
        label: "Airline",
    },
    {
        id: "origin",
        label: "Origin",
    },
    {
        id: "destination",
        label: "Destination",
    },
    {
        id: "departureTime",
        label: "Departure Time",
    },
    {
        id: "status",
        label: "Status",
    },
];
const FlightTableHead = () => {
    return <TableHead className='flight-board-header' data-testid='flight-board-header'>
        <TableRow>
            {
                columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                ))
            }
        </TableRow>
    </TableHead>
};

export default FlightTableHead
