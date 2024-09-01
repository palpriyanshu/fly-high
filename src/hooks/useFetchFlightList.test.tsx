import {renderHook, waitFor} from "@testing-library/react";
import useFetchFlightList from "./useFetchFlightList";

const flightList = [{
    id : 1,
    flightNumber: "SW110",
    airline: "Southwest",
    origin: "Las Vegas",
    destination: "Houston",
    departureTime: "2024-08-31T19:13:01.685Z",
    status: "On Time"
}];
jest.mock("../resources/fetch-api", () => {
    return {
        fetchFlightList: () => Promise.resolve(flightList),
        fetchFlightDetail: jest.fn()
    };
});
describe("useFetchFlightList", () => {
    test("should return data when fetch api passes", async () => {
        const refreshIntervalInSec = 10;
        const {result} = renderHook(() => useFetchFlightList(refreshIntervalInSec)) ;

        expect(result.current.data).toEqual([]);
        await waitFor(() => {
            expect(result.current.data).toEqual(flightList);
        });
    });

    test("should return loading till api is not responding", async () => {
        const refreshIntervalInSec = 10;
        const {result} = renderHook(() => useFetchFlightList(refreshIntervalInSec)) ;

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });
});