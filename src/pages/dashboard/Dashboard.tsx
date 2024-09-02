import React from "react";

import FlightsTable from "../../components/flightsTable/FlightsTable";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import locale from "../../locale/en.json";

const Dashboard: React.FC = () => {
    return <ErrorBoundary fallback={<ErrorComponent title={locale.API_ERROR_MESSAGE_TITLE} description={locale.FLIGHT_LIST_FETCH_ERROR} />} >
        <FlightsTable/>
    </ErrorBoundary>;
};

export default Dashboard;