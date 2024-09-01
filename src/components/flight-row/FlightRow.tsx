import React from "react";
import {FlightDetail} from "../../types/flight-details";
import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import FlightStatus from "../flight-status/FlightStatus";
import {formatDateTime} from "../../utils/date";

type Props = {
    flightDetail: FlightDetail
}

const FlightRow: React.FC<Props> = ({flightDetail}) => {
    const navigate = useNavigate();

    return <TableRow onClick={() => navigate(`/flights/${flightDetail.id}`)} data-testid={`flight-row-${flightDetail.id}`}>
        <TableCell sx={{fontWeight: "bold"}}>{flightDetail.flightNumber}</TableCell>
        <TableCell>{flightDetail.airline}</TableCell>
        <TableCell>{flightDetail.origin}</TableCell>
        <TableCell>{flightDetail.destination}</TableCell>
        <TableCell>{formatDateTime(flightDetail.departureTime)}</TableCell>
        <TableCell><FlightStatus status={flightDetail.status} /></TableCell>
    </TableRow>;
};

export default FlightRow;
