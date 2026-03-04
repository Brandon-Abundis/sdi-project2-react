import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Start/Home";
import Selection from "./Start/Selection";

import useFetchAll from "./customHooks/useFetchAll";
import "./App.css";

export const GameContext = createContext();

function App() {

  const [countryStats, setCountryStats] = useState(null);
  const [captured, setCaptured] = useState([]);
  const [allied, setAllied] = useState([]);

  const { countries } = useFetchAll();
  if(!countries) return <div>Loading Countries</div>

  return (
    <GameContext.Provider
      value={{countryStats, setCountryStats,
              captured, setCaptured,
              allied, setAllied,
              countries}}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='selection' element={<Selection/>} />
      </Routes>
    </GameContext.Provider>
  );
}

export default App;
