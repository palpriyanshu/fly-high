import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import FlightsBoard from "./components/flightsBoard/FlightsBoard";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import FlightDetailPage from "./components/flight-detail-page/FlightDetailPage";

function App() {
  return (
    <div className="app">
      <Header/>
      <p>Fly The Friendly Skies</p>
      <Router>
        <Routes>
          <Route path="/" element={<FlightsBoard/>}/>
          <Route path="/flight/:id" element={<FlightDetailPage />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
