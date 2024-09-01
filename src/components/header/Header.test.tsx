import React from "react";
import {render, screen} from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
    test("should render header title", () => {
        render(<Header />);
        const title = screen.getByText("Fly High");
        expect(title).toBeVisible();
    });

    test("should render header logo", () => {
        render(<Header />);
        const logo = screen.getByTestId("flight-logo");
        expect(logo).toBeVisible();
    });
});