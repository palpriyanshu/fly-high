import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import FlightsBoard from "./FlightsBoard";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn().mockImplementation(() => jest.fn())
}));

const flightList = [
    {
        "flightNumber": "SW110",
        "airline": "Southwest",
        "origin": "Las Vegas",
        "destination": "Houston",
        "departureTime": "08:00 AM",
        "status": "On Time"
    },
    {
        "flightNumber": "AA102",
        "airline": "American Airlines",
        "origin": "New York (JFK)",
        "destination": "Los Angeles",
        "departureTime": "08:15 AM",
        "status": "On Time"
    },
    {
        "flightNumber": "UA453",
        "airline": "United Airlines",
        "origin": "Chicago (ORD)",
        "destination": "San Francisco",
        "departureTime": "09:30 AM",
        "status": "Delayed"
    },
    {
        "flightNumber": "DL789",
        "airline": "Delta Airlines",
        "origin": "Atlanta (ATL)",
        "destination": "Miami",
        "departureTime": "10:00 AM",
        "status": "Boarding"
    },
    {
        "flightNumber": "SW232",
        "airline": "Southwest",
        "origin": "Dallas (DAL)",
        "destination": "Houston",
        "departureTime": "11:05 AM",
        "status": "On Time"
    },
    {
        "flightNumber": "B6209",
        "airline": "JetBlue",
        "origin": "Boston (BOS)",
        "destination": "Orlando",
        "departureTime": "12:30 PM",
        "status": "On Time"
    },
    {
        "flightNumber": "AA304",
        "airline": "American Airlines",
        "origin": "Seattle (SEA)",
        "destination": "Denver",
        "departureTime": "01:45 PM",
        "status": "Departed"
    },
    {
        "flightNumber": "UA897",
        "airline": "United Airlines",
        "origin": "San Diego",
        "destination": "Las Vegas",
        "departureTime": "02:00 PM",
        "status": "On Time"
    },
    {
        "flightNumber": "DL321",
        "airline": "Delta Airlines",
        "origin": "Minneapolis",
        "destination": "Detroit",
        "departureTime": "02:30 PM",
        "status": "Boarding"
    },
    {
        "flightNumber": "SW178",
        "airline": "Southwest",
        "origin": "Phoenix",
        "destination": "Kansas City",
        "departureTime": "03:00 PM",
        "status": "On Time"
    },
    {
        "flightNumber": "B6214",
        "airline": "JetBlue",
        "origin": "Fort Lauderdale",
        "destination": "New York (JFK)",
        "departureTime": "03:45 PM",
        "status": "Delayed"
    },
    {
        "flightNumber": "AA503",
        "airline": "American Airlines",
        "origin": "Los Angeles",
        "destination": "Chicago (ORD)",
        "departureTime": "04:00 PM",
        "status": "On Time"
    },
    {
        "flightNumber": "UA234",
        "airline": "United Airlines",
        "origin": "Newark",
        "destination": "Houston",
        "departureTime": "05:10 PM",
        "status": "Departed"
    },
    {
        "flightNumber": "DL654",
        "airline": "Delta Airlines",
        "origin": "Salt Lake City",
        "destination": "San Diego",
        "departureTime": "05:30 PM",
        "status": "On Time"
    },
    {
        "flightNumber": "SW398",
        "airline": "Southwest",
        "origin": "Denver",
        "destination": "Phoenix",
        "departureTime": "06:00 PM",
        "status": "On Time"
    },
    {
        "flightNumber": "B6221",
        "airline": "JetBlue",
        "origin": "Orlando",
        "destination": "Boston (BOS)",
        "departureTime": "06:15 PM",
        "status": "Boarding"
    },
];
jest.mock("../../resources/fetch-api", () => {
    return {
        fetchFlightList: () => Promise.resolve(flightList),
        fetchFlightDetail: jest.fn()
    }
});

test("should render all columns", () => {
    render(<FlightsBoard />);
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders.length).toBe(6);
});

test("should render column names",  () => {
    render(<FlightsBoard />);

        const flightNumber = screen.getByRole('columnheader', {name: 'Flight Number'});
        const airline = screen.getByRole('columnheader', {name: 'Airline'});
        const origin = screen.getByRole('columnheader', {name: 'Origin'});
        const destination = screen.getByRole('columnheader', {name: 'Destination'});
        const departureTime = screen.getByRole('columnheader', {name: 'Departure Time'});
        const status = screen.getByRole('columnheader', {name: 'Status'});
        expect(flightNumber).toBeVisible();
        expect(airline).toBeVisible();
        expect(origin).toBeVisible();
        expect(destination).toBeVisible();
        expect(departureTime).toBeVisible();
        expect(status).toBeVisible();
});

test("should render flight details", async() => {
    render(<FlightsBoard />);

    await waitFor(() => {
            const flightRow = screen.getByTestId('flight-row-SW110');
            expect(flightRow).toBeVisible();
        }
    );
});

test("should render maximum 10 flight details on one page", async () => {
    render(<FlightsBoard />);

    await waitFor(() => {
        const [, ...flightDetailRows] = screen.getAllByRole('row');
        expect(flightDetailRows.length).toBe(10);
    });
});

test("should show next page on changing pagination",  async () => {
    render(<FlightsBoard />);

    await waitFor(() => {
        const [, ...flightDetailRows] = screen.getAllByRole('row');
        expect(flightDetailRows.length).toBe(10);
    });

    const nextPageButton = screen.getByRole('button', {name: 'Go to next page'});
    fireEvent.click(nextPageButton)

    await waitFor(() => {
        const [, ...updatedFlightDetailRows] = screen.getAllByRole('row');
        expect(updatedFlightDetailRows.length).toBe(6);
    });
});

test("should render error message when flight list are not available", async () => {
    jest.mock("../../resources/fetch-api", () => {
        return {
            fetchFlightList: () => Promise.resolve([]),
            fetchFlightDetail: jest.fn()
        }
    });

    render(<FlightsBoard />);

    await waitFor(() => {
        const flightNotFoundMessage = screen.getByText('No Flight Detail is available');
        expect(flightNotFoundMessage).toBeVisible();
    });
});