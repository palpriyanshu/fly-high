import React from "react";
import { render, screen } from "@testing-library/react";
import FlightDetailPage from "./FlightDetailPage";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom");

(useParams as jest.Mock).mockReturnValue({id: "SW110"});

test.skip("should render flight detail", () => {
    const flightList = [
        {
            "flightNumber": "SW110",
            "airline": "Southwest",
            "origin": "Las Vegas",
            "destination": "Houston",
            "departureTime": "08:00 AM",
            "status": "On Time"
        }
    ];
    render(<FlightDetailPage flightList={flightList} />);
    const flightNumber = screen.getByText('SW110');
    const airline = screen.getByText('Southwest');
    const origin = screen.getByText('Las Vegas');
    const destination = screen.getByText('Houston');
    const departureTime = screen.getByText('08:00 AM');
    const status = screen.getByText('On Time');
    expect(flightNumber).toBeVisible();
    expect(airline).toBeVisible();
    expect(origin).toBeVisible();
    expect(destination).toBeVisible();
    expect(departureTime).toBeVisible();
    expect(status).toBeVisible();
});

test.skip("should render error message when flight details are not available", () => {
    const flightList = [
        {
            "flightNumber": "SW111",
            "airline": "Southwest",
            "origin": "Las Vegas",
            "destination": "Houston",
            "departureTime": "08:00 AM",
            "status": "On Time"
        }
    ];
    render(<FlightDetailPage flightList={flightList} />);
    const detailsNotFoundMessage = screen.getByText('Flight not found');
    expect(detailsNotFoundMessage).toBeVisible();
});