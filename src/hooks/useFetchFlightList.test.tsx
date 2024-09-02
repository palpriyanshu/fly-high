import {renderHook, waitFor} from "@testing-library/react";
import useFetchFlightList from "./useFetchFlightList";
import fetchApi from "../resources/fetch-api";

jest.mock("../resources/fetch-api");

describe("useFetchFlightList", () => {
    test("should return data when fetch api passes", async () => {
        const flightList = [{
            id : 1,
            flightNumber: "SW110",
            airline: "Southwest",
            origin: "Las Vegas",
            destination: "Houston",
            departureTime: "2024-08-31T19:13:01.685Z",
            status: "On Time"
        }];

        (fetchApi.fetchFlightList as jest.Mock).mockReturnValue(Promise.resolve(flightList));

        const {result} = renderHook(() => useFetchFlightList()) ;

        expect(result.current.data).toEqual([]);
        await waitFor(() => {
            expect(result.current.data).toEqual(flightList);
        });
    });

    test("should return loading till api is not responding", async () => {
        (fetchApi.fetchFlightList as jest.Mock).mockReturnValue(Promise.resolve());
        const {result} = renderHook(() => useFetchFlightList()) ;

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });

    test("should return error when api fails", async () => {
        (fetchApi.fetchFlightList as jest.Mock).mockReturnValue(Promise.reject({errorMessage: "some error"}));
        const {result} = renderHook(() => useFetchFlightList()) ;

        expect(result.current.error).toBeNull();
        await waitFor(() => {
            expect(result.current.error?.errorMessage).toBe("some error");
        });
    });
});