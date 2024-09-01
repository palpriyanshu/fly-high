import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
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

type Props = {
    order: "asc" | "desc",
    orderBy: keyof FlightDetail;
    onSortOrderChange: (_: keyof FlightDetail) => void;
};

const FlightTableHead: React.FC<Props> = ({order, orderBy, onSortOrderChange}) => {
    return <TableHead className='flight-board-header' data-testid='flight-board-header'>
        <TableRow>
            {
                columns.map((column) => (
                    <TableCell key={column.id}>
                        <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : "asc"}
                            onClick={() => onSortOrderChange(column.id)}
                        >
                            {column.label}
                        </TableSortLabel>
                    </TableCell>
                ))
            }
        </TableRow>
    </TableHead>;
};

export default FlightTableHead;
