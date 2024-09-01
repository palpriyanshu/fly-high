import React from "react";

import FlightsTable from "../../components/flightsTable/FlightsTable";
import ErrorComponent from "../../components/error-component/ErrorComponent";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";

const Dashboard: React.FC = () => {
    const title = "Oops... Something went wrong!";
    const description = "Unable to retrieve flights information at the moment. Please retry after some time.";

    return <ErrorBoundary fallback={<ErrorComponent title={title} description={description} />} >
        <FlightsTable/>
    </ErrorBoundary>;
};

export default Dashboard;