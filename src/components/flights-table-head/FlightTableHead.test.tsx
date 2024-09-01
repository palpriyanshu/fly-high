import React from "react";
import {render, screen} from "@testing-library/react";
import FlightTableHead from "./FlightTableHead";

describe("FlightTableHead", () => {
    const renderFlightHeader = () => {
        return render(<table><FlightTableHead order="asc" orderBy="departureTime" onSortOrderChange={jest.fn()}/></table>);
    };

    test("should render all columns", () => {
        renderFlightHeader();
        const columnHeaders = screen.getAllByRole("columnheader");
        expect(columnHeaders.length).toBe(6);
    });

    test("should render flight number", () => {
        renderFlightHeader();

        const flightNumber = screen.getByRole("columnheader", {name: "Flight Number"});
        expect(flightNumber).toBeVisible();
    });

    test("should render airline", () => {
        renderFlightHeader();

        const airline = screen.getByRole("columnheader", {name: "Airline"});
        expect(airline).toBeVisible();
    });

    test("should render origin", () => {
        renderFlightHeader();

        const origin = screen.getByRole("columnheader", {name: "Origin"});
        expect(origin).toBeVisible();
    });

    test("should render destination", () => {
        renderFlightHeader();

        const destination = screen.getByRole("columnheader", {name: "Destination"});
        expect(destination).toBeVisible();
    });

    test("should render departure time", () => {
        renderFlightHeader();

        const departureTime = screen.getByRole("columnheader", {name: "Departure Time"});
        expect(departureTime).toBeVisible();
    });

    test("should render flight status", () => {
        renderFlightHeader();

        const status = screen.getByRole("columnheader", {name: "Status"});
        expect(status).toBeVisible();
    });
});