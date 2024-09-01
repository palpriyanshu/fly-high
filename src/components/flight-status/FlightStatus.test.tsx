import React from "react";
import {render, screen} from "@testing-library/react";
import FlightStatus from "./FlightStatus";

describe("FlightStatus", () => {
    test("should render status of flight", () => {
        render(<FlightStatus status="Departed" />);
        const status = screen.getByText("Departed");
        expect(status).toBeVisible();
    });
});
