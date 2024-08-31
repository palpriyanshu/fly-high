import React from 'react';
import './App.css';
import Header from "./components/header/Header";

function App() {
  return (
    <div className="app">
      <Header/>
        <p>
          Fly The Friendly Skies
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flight board
        </a>
    </div>
  );
}

export default App;
