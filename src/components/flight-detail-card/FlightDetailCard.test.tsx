import React from "react";
import {render, screen} from "@testing-library/react";
import FlightDetailCard from "./FlightDetailCard";
import useFetchFlightDetail from "../../hooks/useFetchFlightDetail";
import {useNavigate} from "react-router-dom";

jest.mock("../../hooks/useFetchFlightDetail");

jest.mock("react-router-dom");

(useNavigate as jest.Mock).mockReturnValue(jest.fn());

const flightDetail = {
    id : 1,
    flightNumber: "SW110",
    airline: "Southwest",
    origin: "Las Vegas",
    destination: "Houston",
    departureTime: "2024-09-01T11:45:58.043Z",
    status: "On Time"
};

describe("FlightDetailCard", () => {
    test("should render loader for loading state", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: true, data: null, error: null});
        render(<FlightDetailCard flightId="1"/>);

        expect(screen.getByTestId("linear-loader")).toBeVisible();
    });

    test("should throw error when error is present", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: null, error: {errorMessage: "some error"}});
        const spy = jest.spyOn(console, "error").mockImplementation(() => jest.fn() );

        expect(() => render(<FlightDetailCard flightId="1"/>)).toThrow("some error");
        spy.mockRestore();
    });

    test("should render flight number", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const flightNumber = screen.getByText("SW110");
        expect(flightNumber).toBeVisible();
    });

    test("should render airline", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const airline = screen.getByText("Southwest");
        expect(airline).toBeVisible();
    });

    test("should render origin", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const origin = screen.getByText("Las Vegas");
        expect(origin).toBeVisible();
    });

    test("should render destination", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const destination = screen.getByText("Houston");
        expect(destination).toBeVisible();
    });

    test("should render departure time label", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const departureText = screen.getByText("Departure");
        expect(departureText).toBeVisible();
    });

    test("should render departure time", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const departureTime = screen.getByText("01 Sep 2024, 17:15");
        expect(departureTime).toBeVisible();
    });

    test("should render flight status", () => {
        (useFetchFlightDetail as jest.Mock).mockReturnValue({loading: false, data: flightDetail, error: null});

        render(<FlightDetailCard flightId="1"/>);

        const status = screen.getByText("On Time");
        expect(status).toBeVisible();
    });
});

