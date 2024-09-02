import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import FlightDetail from "./pages/flight-detail/FlightDetail";
import PageNotFound from "./pages/page-not-found/PageNotFound";

function App() {
    return (
        <div className="app">
            <Header/>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/flight-details/:id" element={<FlightDetail />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
