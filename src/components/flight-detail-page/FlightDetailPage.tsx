import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import "./FlightDetailPage.css";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import FlightStatus from "../flight-status/FlightStatus";
import {FlightDetail} from "../../types/flight-details";

type Props = {
    flightList: FlightDetail[]
};
const FlightDetailPage: React.FC<Props> = ({flightList}) => {
    const { id } = useParams();

    const flight: FlightDetail | undefined = flightList.find(
        (f) => f.flightNumber === id
    );

    if (!flight) {
        return <div>Flight not found</div>;
    }

    return (
        <Container className="flight-status-details">

            <Card className="flight-detail-card">
                <FlightStatus status={flight.status} />
                <CardContent>
                    <div className="flight-detail-header">
                        <Typography color="textSecondary">{flight.airline}</Typography>
                        <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>
                            {flight.flightNumber}
                        </Typography>
                    </div>
                    <Container className="flight-detail-status">
                        <Typography>{flight.origin}</Typography>
                        <Divider className="flight-icon">
                            <FlightTakeoffIcon fontSize={"large"} />
                        </Divider>
                        <Typography>{flight.destination}</Typography>
                    </Container>
                    <Typography component="div">
                        {flight.departureTime}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {flight.departureTime}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default FlightDetailPage;