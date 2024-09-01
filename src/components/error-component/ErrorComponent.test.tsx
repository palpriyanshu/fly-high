import React from "react";
import {render, screen} from "@testing-library/react";
import ErrorComponent from "./ErrorComponent";

describe("ErrorComponent", () => {
    const title = "Error Title";
    const description = "Error Description";

    it("Should renders title and description", () => {
        render(<ErrorComponent title={title} description={description} />);

        const titleElement = screen.getByText(title);
        const descriptionElement = screen.getByText(description);

        expect(titleElement).toBeVisible();
        expect(descriptionElement).toBeVisible();
    });

    it("renders action component if provided", () => {
        const ActionComponent = () => <button>Retry</button>;

        render(
            <ErrorComponent
                title={title}
                description={description}
                ActionComponent={ActionComponent}
            />
        );

        const actionComponent = screen.getByRole("button", {name: "Retry"});

        expect(actionComponent).toBeVisible();
    });
});