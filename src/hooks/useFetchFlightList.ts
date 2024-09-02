import {useEffect, useState} from "react";
import fetchApis, {ErrorResponse} from "../resources/fetch-api";
import {FlightDetail} from "../types/flight-details";
import {FLIGHTS_LIST_REFRESH_TIME_IN_MS} from "../constant";

export default function useFetchFlightList(): {
    data: FlightDetail[];
    loading: boolean;
    error: ErrorResponse | null;
    } {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [flightList, setFlightList] = useState<FlightDetail[]>([]);

    useEffect(() => {
        setLoading(true);
        fetchApis.fetchFlightList().then(
            (response: FlightDetail[]) => {
                setFlightList(response);
                setLoading(false);
            }).catch((error: ErrorResponse) => {
            setLoading(false);
            setError(error);
        });

        const intervalId = setInterval(async () => {
            try {
                const response = await fetchApis.fetchFlightList();
                setFlightList(response);
            } catch (reason) {
                setFlightList((prev) => prev);
            }
        }, FLIGHTS_LIST_REFRESH_TIME_IN_MS);

        return () => {
            clearInterval(intervalId);
        };
    }, [FLIGHTS_LIST_REFRESH_TIME_IN_MS]);

    return {data: flightList, loading, error};
}