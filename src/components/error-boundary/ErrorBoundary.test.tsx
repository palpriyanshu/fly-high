import React from "react";
import {render, screen} from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ErrorChildComponent = (): React.JSX.Element => {
    throw new Error("Oops! Something went wrong.");
};

const FallbackComponent = (): React.JSX.Element => {
    return <div>Something went wrong!</div>;
};

describe("ErrorBoundary", () => {
    test("should render the fallback UI when an error occurs", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => jest.fn() );

        render(
            <ErrorBoundary fallback={<FallbackComponent/>}>
                <ErrorChildComponent />
            </ErrorBoundary>
        );

        const fallbackText = screen.getByText("Something went wrong!");
        expect(fallbackText).toBeVisible();

        spy.mockRestore();
    });

    test("should render the children when no error occurs", () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => jest.fn() );

        render(
            <ErrorBoundary fallback={<FallbackComponent />}>
                <div>Normal Child Component</div>
            </ErrorBoundary>
        );
        const normalChildComponent = screen.getByText("Normal Child Component");
        expect(normalChildComponent).toBeVisible();

        spy.mockRestore();
    });
});