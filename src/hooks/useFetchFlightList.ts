import {useEffect, useState} from "react";
import fetchApis, {ErrorResponse} from "../resources/fetch-api";
import {FlightDetail} from "../types/flight-details";

export default function useFetchFlightList(refreshIntervalInSec: number): {
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
        }, refreshIntervalInSec * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [refreshIntervalInSec]);

    return {data: flightList, loading, error};
}