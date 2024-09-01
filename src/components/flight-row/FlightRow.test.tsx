import React from "react";
import {render, screen} from "@testing-library/react";
import FlightRow from "./FlightRow";
import {useNavigate} from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom");

(useNavigate as jest.Mock).mockReturnValue(jest.fn())

describe('FlightRow', () => {
    const flightDetail =  {
        id : 1,
        flightNumber: "SW110",
        airline: "Southwest",
        origin: "Las Vegas",
        destination: "Houston",
        departureTime: "2024-08-31T19:13:01.685Z",
        status: "On Time"
    };

    test("should render flight number",  () => {
        render(<FlightRow flightDetail={flightDetail}/>);

        const flightNumber = screen.getByText('SW110');
        expect(flightNumber).toBeVisible();
    });

    test("should render airline",  () => {
        render(<FlightRow  flightDetail={flightDetail}/>);

        const airline = screen.getByText('Southwest');
        expect(airline).toBeVisible();
    });

    test("should render origin",  () => {
        render(<FlightRow  flightDetail={flightDetail}/>);

        const origin = screen.getByText('Las Vegas');
        expect(origin).toBeVisible();
    });

    test("should render destination",  () => {
        render(<FlightRow  flightDetail={flightDetail}/>);

        const destination = screen.getByText('Houston');
        expect(destination).toBeVisible();
    });

    test("should render formatted departure time",  () => {
        render(<FlightRow  flightDetail={flightDetail}/>);

        const departureTime = screen.getByText('01 Sep 2024, 00:43');
        expect(departureTime).toBeVisible();
    });

    test("should render flight status",  () => {
        render(<FlightRow  flightDetail={flightDetail}/>);

        const status = screen.getByText('On Time');
        expect(status).toBeVisible();
    });

    test("should navigate to flight page when click on flight row", () => {
        const navigate = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigate)
        render(<FlightRow  flightDetail={flightDetail}/>);

        const flightNumber = screen.getByText('SW110');

        userEvent.click(flightNumber);

        expect(navigate).toHaveBeenCalledWith('/flights/1');
    })
});