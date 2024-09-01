import {renderHook, waitFor} from "@testing-library/react";
import useFetchFlightDetail from "./useFetchFlightDetail";

const flightDetail = {
    id : 1,
    flightNumber: "SW110",
    airline: "Southwest",
    origin: "Las Vegas",
    destination: "Houston",
    departureTime: "2024-08-31T19:13:01.685Z",
    status: "On Time"
};

jest.mock("../resources/fetch-api", () => {
    return {
        fetchFlightList: jest.fn(),
        fetchFlightDetail: (id: string) => {
            if(id === "1") {
                return Promise.resolve(flightDetail);
            } else {
                return Promise.reject({errorMessage : "error message"});
            }
        }
    };
});

describe("useFetchFlightDetail", () => {
    test("should return data when API is successfull", async () => {
        const id = "1";
        const {result} = renderHook(() => useFetchFlightDetail(id)) ;

        await waitFor(() => {
            expect(result.current.data).toBe(flightDetail);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();

    });

    test("should return error when api fails", async () => {
        const id = "2";
        const {result} = renderHook(() => useFetchFlightDetail(id));

        await waitFor(() => {
            expect(result.current.error?.errorMessage).toBe("error message");
        });

        expect(result.current.data).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    test("should return loading when till api is not responding", async () => {
        const id = "2";
        const {result} = renderHook(() => useFetchFlightDetail(id));

        expect(result.current.loading).toBe(true);
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });
});