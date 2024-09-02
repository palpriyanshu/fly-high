import React, {FC, useState} from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import {Card, TablePagination} from "@mui/material";
import "./FlightsTable.css";
import FlightRow from "../flight-row/FlightRow";
import FlightTableHead from "../flights-table-head/FlightTableHead";
import useFetchFlightList from "../../hooks/useFetchFlightList";
import Loader from "../loader/Loader";
import {FlightDetail} from "../../types/flight-details";

const FlightsTable: FC = () => {

    const [currentPage, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState<keyof FlightDetail>("departureTime");
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const {data: flightList, loading, error} = useFetchFlightList();

    if (loading) {
        return <Loader />;
    }

    if(error) {
        throw new Error(error.errorMessage);
    }

    const rowsPerPage = 10;
    const handleSorting = (property: keyof FlightDetail) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const getComparator = (
        order: "asc" | "desc",
        orderBy: keyof FlightDetail
    ) => {
        return order === "asc"
            ? (a: FlightDetail, b: FlightDetail) => (a[orderBy] > b[orderBy] ? 1 : -1)
            : (a: FlightDetail, b: FlightDetail) =>
                b[orderBy] > a[orderBy] ? 1 : -1;
    };

    const sortedFlightList = flightList
        .slice()
        .sort(getComparator(order, orderBy));

    return <Card className='flight-board' sx={{width: "80%", margin: "2rem auto"}}>
        <TableContainer>
            <Table>
                <FlightTableHead order={order} orderBy={orderBy} onSortOrderChange={handleSorting}/>
                <TableBody className='flight-board-body'>
                    {
                        sortedFlightList
                            .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                            .map((flightDetail) => <FlightRow key={flightDetail.flightNumber} flightDetail={flightDetail} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            className='flight-board-pagination'
            component="div"
            count={flightList.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            rowsPerPageOptions={[rowsPerPage]}
            onPageChange={(_: any, newPageIndex: number) => setPage(newPageIndex)}
        />
    </Card>;
};

export default FlightsTable;