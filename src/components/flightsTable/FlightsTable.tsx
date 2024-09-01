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

const FlightsTable: FC = () => {

    const [currentPage, setPage] = useState(0);
    const {data: flightList, loading, error} = useFetchFlightList(5);

    if (loading) {
        return <Loader />;
    }

    if(error) {
        throw new Error(error.errorMessage);
    }

    const rowsPerPage = 10;

    return <Card className='flight-board' sx={{width: "80%", margin: "auto"}}>
        <TableContainer>
            <Table>
                <FlightTableHead />
                <TableBody className='flight-board-body'>
                    {
                        flightList
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