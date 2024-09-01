import {render, screen} from "@testing-library/react";
import React from "react";
import Dashboard from "./Dashboard";
import useFetchFlightList from "../../hooks/useFetchFlightList";
import {BrowserRouter as Router} from "react-router-dom";

jest.mock("../../hooks/useFetchFlightList");

describe("Dashboard", () => {
    test("should render loader while fetching flight list", () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: true, data: null, error: null});
        render(<Router><Dashboard /></Router>);

        expect(screen.getByTestId("linear-loader")).toBeVisible();
    });

    test("should render error component when flight list is not available", () => {
        (useFetchFlightList as jest.Mock).mockReturnValue({loading: false, data: null, error: {errorMessage: "some error"}});
        const spy = jest.spyOn(console, "error").mockImplementation(() => jest.fn() );
        render(<Router><Dashboard /></Router>);

        expect(screen.getByText("Oops... Something went wrong!")).toBeVisible();
        expect(screen.getByText("Unable to retrieve flights information at the moment. Please retry after some time.")).toBeVisible();

        spy.mockRestore();
    });

    test("should render flight table when flight list is available", () => {
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
        render(<Router><Dashboard /></Router>);

        expect(screen.getByRole("table")).toBeVisible();
    });
});
