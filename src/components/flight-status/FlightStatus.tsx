import React from "react";
import Typography from "@mui/material/Typography";
import "./FlightStatus.css";

const statusColors: { [status: string]: string } = {
    "On Time": "on-time-status",
    Delayed: "delayed-status",
    Boarding: "boarding-status",
    Departed: "departed-status",
};

type Props = {
    status: string
};

const FlightStatus: React.FC<Props> = ({status}) => {
    return (
        <Typography component="div" className={`flight-status ${statusColors[status]}`} sx={{fontSize: "larger"}}>
            {status}
        </Typography>
    );
};

export default FlightStatus;