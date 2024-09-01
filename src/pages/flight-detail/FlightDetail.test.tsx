import React from "react";
import {render, screen} from "@testing-library/react";
import useFetchFlightDetail from "../../hooks/useFetchFlightDetail";
import FlightDetail from "./FlightDetail";
import {BrowserRouter as Router} from "react-router-dom";

jest.mock("../../hooks/useFetchFlightDetail");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn().mockImplementation(() => jest.fn()),
    useParams: () => ({
        id: "1",
    }),
}));

describe("FlightDetail", () => {
    test("should render loader", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: true, data: null, error: null});
        render(<Router><FlightDetail /></Router>);

        expect(screen.getByTestId("linear-loader")).toBeVisible();
    });

    test("should render flight detail card", () => {
        const flightDetail = {
            id : 1,
            flightNumber: "SW110",
            airline: "Southwest",
            origin: "Las Vegas",
            destination: "Houston",
            departureTime: "2024-08-31T19:13:01.685Z",
            status: "On Time"
        };

        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});
        render(<Router><FlightDetail /></Router>);

        expect(screen.getByTestId("flight-detail-page-1")).toBeVisible();
    });

    test("should render error component when error is present", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: null, error: {errorMessage: "some error"}});
        const spy = jest.spyOn(console, "error").mockImplementation(() => jest.fn() );

        render(<Router><FlightDetail /></Router>);

        expect(screen.getByText("Oops... Something went wrong!")).toBeVisible();
        expect(screen.getByText("Unable to retrieve flight information at the moment. Please retry after some time or return to homepage.")).toBeVisible();
        spy.mockRestore();
    });
});