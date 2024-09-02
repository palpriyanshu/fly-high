import {render, screen} from "@testing-library/react";
import React from "react";
import App from "./App";
import {MemoryRouter} from "react-router-dom";
import useFetchFlightList from "./hooks/useFetchFlightList";
import useFetchFlightDetail from "./hooks/useFetchFlightDetail";

jest.mock("./hooks/useFetchFlightDetail");
jest.mock("./hooks/useFetchFlightList");

describe("App", () => {
    test("renders app header", () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: true, data: null, error: null});

        render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
        const header = screen.getByTestId("app-header");
        expect(header).toBeVisible();
    });

    test("should render flight dashboard", () => {
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
        ];
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: flightList, error: null});
        render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);

        expect(screen.getByRole("table")).toBeVisible();
    });
    
    test("should render flight detail page", () => {
        const flightDetail = {
            "id": 2,
            "flightNumber": "A1B13",
            "airline": "Airline 1",
            "origin": "Origin 1",
            "destination": "Destination 1",
            "departureTime": "2024-08-31T20:02:44.859Z",
            "status": "On Time"
        };
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<MemoryRouter initialEntries={["/flight-details/2"]}><App /></MemoryRouter>);

        expect(screen.getByTestId("flight-detail-page-2")).toBeVisible();
    });

    test("should render flight detail page", () => {
        render(<MemoryRouter initialEntries={["/random-page"]}><App /></MemoryRouter>);

        expect(screen.getByText("404")).toBeVisible();
    });
});
