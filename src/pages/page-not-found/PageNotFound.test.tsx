import React from "react";
import {BrowserRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import PageNotFound from "./PageNotFound";

describe("PageNotFound", () => {
    test("should render page title", () => {
        render(<BrowserRouter><PageNotFound/></BrowserRouter>);

        expect(screen.getByText("404")).toBeVisible();
    });

    test("should render page description", () => {
        render(<BrowserRouter><PageNotFound/></BrowserRouter>);

        expect(screen.getByText("This page is not available. Please check the url again or visit to home page.")).toBeVisible();
    });

    test("should render button to home page", () => {
        render(<BrowserRouter><PageNotFound/></BrowserRouter>);

        expect(screen.getByRole("button", {name: "Home Page"})).toBeVisible();
    });
});