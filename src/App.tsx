import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import flightData from './resources/flight-data.json';
import FlightsBoard from "./components/flightsBoard/FlightsBoard";

function App() {
  return (
    <div className="app">
      <Header/>
        <p>
          Fly The Friendly Skies
        </p>
        <FlightsBoard flightList={flightData}/>
    </div>
  );
}

export default App;
