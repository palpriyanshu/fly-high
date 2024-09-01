import React from "react";
import {render, screen} from "@testing-library/react";
import FlightTableHead from "./FlightTableHead";

describe("FlightTableHead", () => {
    test("should render all columns", () => {
        render(<FlightTableHead />);
        const columnHeaders = screen.getAllByRole("columnheader");
        expect(columnHeaders.length).toBe(6);
    });

    test("should render flight number", () => {
        render(<FlightTableHead />);

        const flightNumber = screen.getByRole("columnheader", {name: "Flight Number"});
        expect(flightNumber).toBeVisible();
    });

    test("should render airline", () => {
        render(<FlightTableHead />);

        const airline = screen.getByRole("columnheader", {name: "Airline"});
        expect(airline).toBeVisible();
    });

    test("should render origin", () => {
        render(<FlightTableHead />);

        const origin = screen.getByRole("columnheader", {name: "Origin"});
        expect(origin).toBeVisible();
    });

    test("should render destination", () => {
        render(<FlightTableHead />);

        const destination = screen.getByRole("columnheader", {name: "Destination"});
        expect(destination).toBeVisible();
    });

    test("should render departure time", () => {
        render(<FlightTableHead />);

        const departureTime = screen.getByRole("columnheader", {name: "Departure Time"});
        expect(departureTime).toBeVisible();
    });

    test("should render flight status", () => {
        render(<FlightTableHead />);

        const status = screen.getByRole("columnheader", {name: "Status"});
        expect(status).toBeVisible();
    });
});