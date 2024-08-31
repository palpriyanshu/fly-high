import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FlightStatus from "./FlightStatus";

test("should render status", () => {
    render(
        <Router>
            <FlightStatus status="Departed" />
        </Router>
    );
    const appBarTitleText = screen.getByText(/Departed/i);
    expect(appBarTitleText).toBeInTheDocument();
});