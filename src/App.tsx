import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import FlightDetail from "./pages/flight-detail/FlightDetail";

function App() {
    return (
        <div className="app">
            <Header/>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/flights" element={<Dashboard />}/>
                    <Route path="/flights/:id" element={<FlightDetail />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
