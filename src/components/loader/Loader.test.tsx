import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
    test("Should renders loader", () => {
        render(<Loader />);
        expect(screen.getAllByRole("progressbar")).toHaveLength(3);
    });
});