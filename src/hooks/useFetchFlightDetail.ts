import { useEffect, useState } from "react";
import fetchApis, {ErrorResponse} from "../resources/fetch-api";
import {FlightDetail} from "../types/flight-details";

export default function useFetchFlightDetail(id: string): {
    data: FlightDetail | null;
    loading: boolean;
    error: ErrorResponse | null;
} {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [flightDetail, setFlightDetail] = useState<FlightDetail | null>(null)

    useEffect(() => {
        setLoading(true);
        fetchApis.fetchFlightDetail(id).then(
            (response: FlightDetail) => {
                setFlightDetail(response);
                setLoading(false)
            }).catch((error: ErrorResponse) => {
                setError(error);
                setLoading(false);
        });
    }, [id]);

    return { data: flightDetail, loading, error };
}