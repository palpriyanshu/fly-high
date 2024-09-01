import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import "./FlightDetailCard.css";
import {Container} from "@mui/material";
import FlightStatus from "../flight-status/FlightStatus";
import {formatDateTime} from "../../utils/date";
import useFetchFlightDetail from "../../hooks/useFetchFlightDetail";
import Loader from "../loader/Loader";

type Props = {
    flightId: string;
}

const FlightDetailCard: React.FC<Props> = ({flightId}) => {
    const {data: flightDetail, loading, error} = useFetchFlightDetail(flightId);

    if (loading && !flightDetail) {
        return <Loader />;
    }

    if(error) {
        throw new Error(error.errorMessage);
    }

    return flightDetail && <Container className="flight-status-details" data-testid={`flight-detail-page-${flightDetail.id}`}>
        <Card className="flight-detail-card">
            <FlightStatus status={flightDetail.status} />
            <CardContent>
                <div className="flight-detail-header">
                    <Typography color="textSecondary">{flightDetail.airline}</Typography>
                    <Typography sx={{fontSize: "32px", fontWeight: "500"}}>
                        {flightDetail.flightNumber}
                    </Typography>
                </div>
                <Container className="flight-detail-status">
                    <div>
                        <Typography component="div" >From</Typography>
                        <Typography>{flightDetail.origin}</Typography>
                    </div>
                    <Divider className="flight-icon">
                        <FlightTakeoffIcon fontSize={"large"} />
                    </Divider>
                    <div>
                        <Typography component="div" >To</Typography>
                        <Typography>{flightDetail.destination}</Typography>
                    </div>
                </Container>
                <Typography variant="h6">Departure</Typography>
                <Typography variant="h4" component="div">
                    {formatDateTime(flightDetail.departureTime)}
                </Typography>
            </CardContent>
        </Card>
    </Container>;
};

export default FlightDetailCard;