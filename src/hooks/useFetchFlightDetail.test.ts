import {renderHook, waitFor} from "@testing-library/react";
import useFetchFlightDetail from "./useFetchFlightDetail";
import fetchApi from "../resources/fetch-api";

jest.mock("../resources/fetch-api");

describe("useFetchFlightDetail", () => {
    test("should return data when API is successfull", async () => {
        const flightDetail = {
            id : 1,
            flightNumber: "SW110",
            airline: "Southwest",
            origin: "Las Vegas",
            destination: "Houston",
            departureTime: "2024-08-31T19:13:01.685Z",
            status: "On Time"
        };
        (fetchApi.fetchFlightDetail as jest.Mock).mockReturnValue(Promise.resolve(flightDetail));

        const id = "1";
        const {result} = renderHook(() => useFetchFlightDetail(id)) ;

        await waitFor(() => {
            expect(result.current.data).toBe(flightDetail);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();

    });

    test("should return error when api fails", async () => {
        (fetchApi.fetchFlightDetail as jest.Mock).mockReturnValue(Promise.reject({errorMessage: "error message"}));

        const id = "2";
        const {result} = renderHook(() => useFetchFlightDetail(id));

        await waitFor(() => {
            expect(result.current.error?.errorMessage).toBe("error message");
        });

        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    test("should return loading when till api is not responding", async () => {
        (fetchApi.fetchFlightDetail as jest.Mock).mockReturnValue(Promise.resolve());

        const id = "2";
        const {result} = renderHook(() => useFetchFlightDetail(id));

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });
});