import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import FlightRow from "./FlightRow";
import {useNavigate} from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom");

(useNavigate as jest.Mock).mockReturnValue(jest.fn());

describe("FlightRow", () => {
    const flightDetail = {
        id : 1,
        flightNumber: "SW110",
        airline: "Southwest",
        origin: "Las Vegas",
        destination: "Houston",
        departureTime: "2024-09-01T11:45:58.043Z",
        status: "On Time"
    };

    const renderFlightRow = () => {
        return render(<table><tbody><FlightRow flightDetail={flightDetail}/></tbody></table>);
    };

    test("should render flight number", () => {
        renderFlightRow();

        const flightNumber = screen.getByText("SW110");
        expect(flightNumber).toBeVisible();
    });

    test("should render airline", () => {
        renderFlightRow();

        const airline = screen.getByText("Southwest");
        expect(airline).toBeVisible();
    });

    test("should render origin", () => {
        renderFlightRow();

        const origin = screen.getByText("Las Vegas");
        expect(origin).toBeVisible();
    });

    test("should render destination", () => {
        renderFlightRow();

        const destination = screen.getByText("Houston");
        expect(destination).toBeVisible();
    });

    test("should render formatted departure time", () => {
        renderFlightRow();

        const departureTime = screen.getByText("01 Sep 2024, 17:15");
        expect(departureTime).toBeVisible();
    });

    test("should render flight status", () => {
        renderFlightRow();

        const status = screen.getByText("On Time");
        expect(status).toBeVisible();
    });

    test("should navigate to flight page when click on flight row", async () => {
        const navigate = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigate);
        renderFlightRow();

        const flightNumber = screen.getByText("SW110");

        userEvent.click(flightNumber);

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith("/flights/1");
        });
    });
});