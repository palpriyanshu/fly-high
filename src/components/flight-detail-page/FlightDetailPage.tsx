import React, {useEffect, useState} from "react";
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
import fetchApis from "../../resources/fetch-api";

const FlightDetailPage: React.FC = () => {
    const {id} = useParams<{id: string}>();

    const [flightDetail, setFlightDetail] = useState<FlightDetail>(null);

    useEffect(() => {
        id && fetchApis.fetchFlightDetail(id).then(
            (response) => {
                setFlightDetail(response);
            }
        );
    }, [id]);

    if (!flightDetail) {
        return <div>Flight not found</div>;
    }

    return (
        <Container className="flight-status-details">
            <Card className="flight-detail-card">
                <FlightStatus status={flightDetail.status} />
                <CardContent>
                    <div className="flight-detail-header">
                        <Typography color="textSecondary">{flightDetail.airline}</Typography>
                        <Typography sx={{ fontSize: "32px", fontWeight: "500" }}>
                            {flightDetail.flightNumber}
                        </Typography>
                    </div>
                    <Container className="flight-detail-status">
                        <Typography>{flightDetail.origin}</Typography>
                        <Divider className="flight-icon">
                            <FlightTakeoffIcon fontSize={"large"} />
                        </Divider>
                        <Typography>{flightDetail.destination}</Typography>
                    </Container>
                    <Typography variant="h4" component="div">
                        {flightDetail.departureTime}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default FlightDetailPage;