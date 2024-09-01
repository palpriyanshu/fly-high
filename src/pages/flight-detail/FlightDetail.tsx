import React from "react";
import FlightDetailCard from "../../components/flight-detail-card/FlightDetailCard";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import {useParams} from "react-router-dom";
import NavigationButton from "../../components/button/NavigationButton";

const FlightDetail: React.FC = () => {
    const {id} = useParams<{id: string}>();

    const title = "Oops... Something went wrong!";
    const description = "Unable to retrieve flight information at the moment. Please retry after some time or return to homepage.";

    if (!id) {
        return (
            <ErrorComponent
                title={title}
                description={description}
                ActionComponent={() => <NavigationButton path="/" label="Back to Home"/>}
            />
        );
    }

    return <ErrorBoundary fallback={<ErrorComponent title={title} description={description} ActionComponent={() => <NavigationButton path="/" label="Back to Home"/>}/>} >
        <FlightDetailCard flightId={id}/>
    </ErrorBoundary>;
};

export default FlightDetail;