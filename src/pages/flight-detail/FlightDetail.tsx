import React from "react";
import FlightDetailCard from "../../components/flight-detail-card/FlightDetailCard";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import {useParams} from "react-router-dom";
import NavigationButton from "../../components/button/NavigationButton";
import locale from "../../locale/en.json";

const FlightDetail: React.FC = () => {
    const {id} = useParams<{id: string}>();

    if (!id) {
        return (
            <ErrorComponent
                title={locale.API_ERROR_MESSAGE_TITLE}
                description={locale.FLIGHT_DETAIL_FETCH_ERROR}
                ActionComponent={() => <NavigationButton path="/" label={locale.BACK_TO_HOME}/>}
            />
        );
    }

    return <ErrorBoundary fallback={<ErrorComponent title={locale.API_ERROR_MESSAGE_TITLE} description={locale.FLIGHT_DETAIL_FETCH_ERROR} ActionComponent={() => <NavigationButton path="/" label={locale.BACK_TO_HOME}/>}/>} >
        <FlightDetailCard flightId={id}/>
    </ErrorBoundary>;
};

export default FlightDetail;