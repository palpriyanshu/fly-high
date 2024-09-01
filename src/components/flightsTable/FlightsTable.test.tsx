import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import FlightsTable from "./FlightsTable";
import useFetchFlightList from "../../hooks/useFetchFlightList";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn().mockImplementation(() => jest.fn())
}));


const flightList = [
    {
        "id": 1,
        "flightNumber": "A1B13",
        "airline": "Airline 1",
        "origin": "Origin 1",
        "destination": "Destination 1",
        "departureTime": "2024-08-31T20:02:44.859Z",
        "status": "On Time"
    },
    {
        "id": 2,
        "flightNumber": "A2B64",
        "airline": "Airline 2",
        "origin": "Origin 2",
        "destination": "Destination 2",
        "departureTime": "2024-08-31T20:19:24.859Z",
        "status": "Departed"
    },
    {
        "id": 3,
        "flightNumber": "A3B40",
        "airline": "Airline 3",
        "origin": "Origin 3",
        "destination": "Destination 3",
        "departureTime": "2024-08-31T20:36:04.859Z",
        "status": "Boarding"
    },
    {
        "id": 4,
        "flightNumber": "A4B5",
        "airline": "Airline 4",
        "origin": "Origin 4",
        "destination": "Destination 4",
        "departureTime": "2024-08-31T20:52:44.859Z",
        "status": "Delayed"
    },
    {
        "id": 5,
        "flightNumber": "A5B15",
        "airline": "Airline 5",
        "origin": "Origin 5",
        "destination": "Destination 5",
        "departureTime": "2024-08-31T21:09:24.859Z",
        "status": "Delayed"
    },
    {
        "id": 6,
        "flightNumber": "A6B5",
        "airline": "Airline 6",
        "origin": "Origin 6",
        "destination": "Destination 6",
        "departureTime": "2024-08-31T21:26:04.859Z",
        "status": "Departed"
    },
    {
        "id": 7,
        "flightNumber": "A7B65",
        "airline": "Airline 7",
        "origin": "Origin 7",
        "destination": "Destination 7",
        "departureTime": "2024-08-31T21:42:44.859Z",
        "status": "Departed"
    },
    {
        "id": 8,
        "flightNumber": "A8B35",
        "airline": "Airline 8",
        "origin": "Origin 8",
        "destination": "Destination 8",
        "departureTime": "2024-08-31T21:59:24.859Z",
        "status": "Delayed"
    },
    {
        "id": 9,
        "flightNumber": "A9B71",
        "airline": "Airline 9",
        "origin": "Origin 9",
        "destination": "Destination 9",
        "departureTime": "2024-08-31T22:16:04.859Z",
        "status": "On Time"
    },
    {
        "id": 10,
        "flightNumber": "A10B44",
        "airline": "Airline 10",
        "origin": "Origin 10",
        "destination": "Destination 10",
        "departureTime": "2024-08-31T22:32:44.859Z",
        "status": "On Time"
    },
    {
        "id": 11,
        "flightNumber": "A11B10",
        "airline": "Airline 11",
        "origin": "Origin 11",
        "destination": "Destination 11",
        "departureTime": "2024-08-31T22:49:24.859Z",
        "status": "On Time"
    },
    {
        "id": 12,
        "flightNumber": "A12B28",
        "airline": "Airline 12",
        "origin": "Origin 12",
        "destination": "Destination 12",
        "departureTime": "2024-08-31T23:06:04.859Z",
        "status": "Delayed"
    },
    {
        "id": 13,
        "flightNumber": "A13B61",
        "airline": "Airline 13",
        "origin": "Origin 13",
        "destination": "Destination 13",
        "departureTime": "2024-08-31T23:22:44.859Z",
        "status": "Departed"
    },
    {
        "id": 14,
        "flightNumber": "A14B49",
        "airline": "Airline 14",
        "origin": "Origin 14",
        "destination": "Destination 14",
        "departureTime": "2024-08-31T23:39:24.859Z",
        "status": "Boarding"
    },
    {
        "id": 15,
        "flightNumber": "A15B28",
        "airline": "Airline 15",
        "origin": "Origin 15",
        "destination": "Destination 15",
        "departureTime": "2024-08-31T23:56:04.859Z",
        "status": "Departed"
    }
];

jest.mock("../../hooks/useFetchFlightList");

describe('FlightsTable', () => {
    test("should render loader during flight information loading state",  () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: true, data: null, error: null})
        render(<FlightsTable />);

        expect(screen.getByTestId("linear-loader")).toBeVisible()
    });

    test("should throw error when error is present",  () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: null, error: {errorMessage: "some error"}})

        expect(() => render(<FlightsTable />)).toThrow("some error");
    });

   test("should render flight table", () => {
       (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: flightList, error: null})
       render(<FlightsTable />);
       const flightTable = screen.getByRole('table');
       expect(flightTable).toBeVisible();
    });

    test("should render table head", () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: flightList, error: null})
        render(<FlightsTable />);
        const tableHead = screen.getByTestId('flight-board-header');
        expect(tableHead).toBeVisible();
    });

    test("should render flight details", () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: flightList, error: null})
        render(<FlightsTable />);

        const flightRow = screen.getByTestId('flight-row-1');
        expect(flightRow).toBeVisible();
    });

    test("should render maximum 10 flight details on one page",  () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: flightList, error: null})
        render(<FlightsTable />);

        const [, ...flightDetailRows] = screen.getAllByRole('row');
        expect(flightDetailRows.length).toBe(10);
    });

    test("should show next page on changing pagination",  async () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: flightList, error: null})
        render(<FlightsTable />);

        const [, ...flightDetailRows] = screen.getAllByRole('row');
        expect(flightDetailRows.length).toBe(10);

        const nextPageButton = screen.getByRole('button', {name: 'Go to next page'});
        fireEvent.click(nextPageButton)

        const [, ...updatedFlightDetailRows] = screen.getAllByRole('row');
        expect(updatedFlightDetailRows.length).toBe(5);
    });
});
