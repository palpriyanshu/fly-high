import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import FlightDetailPage from "./FlightDetailPage";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "2",
    }),
}));

const flightDetail = {
    "flightNumber": "SW110",
    "airline": "Southwest",
    "origin": "Las Vegas",
    "destination": "Houston",
    "departureTime": "08:00 AM",
    "status": "On Time"
};
jest.mock("../../resources/fetch-api", () => {
    return {
        fetchFlightList: jest.fn(),
        fetchFlightDetail: () => Promise.resolve(flightDetail)
    }
});

test("should render flight number", async () => {
    render(<FlightDetailPage  />);

    await waitFor(() => {
        const flightNumber = screen.getByText('SW110');
        expect(flightNumber).toBeVisible();
    });
});

test("should render airline", async () => {
    render(<FlightDetailPage  />);

    await waitFor(() => {
        const airline = screen.getByText('Southwest');
        expect(airline).toBeVisible();
    });
});

test("should render origin", async () => {
    render(<FlightDetailPage  />);

    await waitFor(() => {
        const origin = screen.getByText('Las Vegas');
        expect(origin).toBeVisible();
    });
});

test("should render destination", async () => {
    render(<FlightDetailPage  />);

    await waitFor(() => {
        const destination = screen.getByText('Houston');
        expect(destination).toBeVisible();
    });
});

test("should render departure time", async () => {
    render(<FlightDetailPage  />);

    await waitFor(() => {
        const departureTime = screen.getByText('08:00 AM');
        expect(departureTime).toBeVisible();
    });
});

test("should render flight status", async () => {
    render(<FlightDetailPage  />);

    await waitFor(() => {
        const status = screen.getByText('On Time');
        expect(status).toBeVisible();
    });
});

test("should render error message when flight details are not available", async () => {
    jest.mock("../../resources/fetch-api", () => {
        return {
            fetchFlightList: jest.fn(),
            fetchFlightDetail: () => Promise.resolve(null)
        }
    });

    render(<FlightDetailPage />);

    await waitFor(() => {
        const detailsNotFoundMessage = screen.getByText('Flight not found');
        expect(detailsNotFoundMessage).toBeVisible();
    });
});