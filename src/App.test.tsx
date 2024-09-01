import {render, screen} from "@testing-library/react";
import React from "react";
import App from "./App";

describe("App", () => {
    test("renders app header", () => {
        render(<App />);
        const header = screen.getByTestId("app-header");
        expect(header).toBeVisible();
    });
});
