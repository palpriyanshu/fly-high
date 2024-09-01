import {useNavigate} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NavigationButton from "./NavigationButton";

jest.mock("react-router-dom");

(useNavigate as jest.Mock).mockReturnValue(jest.fn());
describe("NavigationButton", () => {
    test("should navigate given path", () => {
        const navigate = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigate);
        render(<NavigationButton path="/test-path" label="test-lable" />);

        const button = screen.getByRole("button");

        userEvent.click(button);

        expect(navigate).toHaveBeenCalledWith("/test-path");
    });

    test("should render given label", () => {
        render(<NavigationButton path="/test-path" label="test-lable" />);

        const button = screen.getByRole("button", {name: "test-lable"});

        expect(button).toBeVisible();
    });
});