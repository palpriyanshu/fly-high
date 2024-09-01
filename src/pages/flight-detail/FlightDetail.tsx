import React from "react";
import FlightDetailCard from "../../components/flight-detail-card/FlightDetailCard";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";

const FlightDetail: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const title = "Oops... Something went wrong!";
    const description = "Unable to retrieve flight information at the moment. Please retry after some time or return to homepage.";

    const BackButton = () => {
        return <Button variant={"contained"} sx={{ background: "#319795" }} onClick={() => navigate("/")}>Back to Home</Button>
    };

    if (!id) {
        return (
            <ErrorComponent
                title={title}
                description={description}
                ActionComponent={() => <BackButton/>}
            />
        );
    }

    return <ErrorBoundary fallback={<ErrorComponent title={title} description={description} ActionComponent={() => <BackButton/>}/>} >
       <FlightDetailCard flightId={id}/>
    </ErrorBoundary>
};

export default FlightDetail;