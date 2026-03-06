import { useContext, useEffect, useState } from "react";

import { GameContext } from "../App";

import UserCard from "./UserCard";
import CountryCard from "./CountryCard";
import EnergyBar from "./EnergyBar";

import randCountries from "../HelperFunctions/randCountries";

export default function Game() {
  const {countryStats, setCountryStats,
    captured, setCaptured,
    allied, setAllied,
    rounds, setRounds,
    countries} = useContext(GameContext);

    const [entries, setEntries] = useState([]);
    const [result, setResult] = useState("none")

    useEffect(() => {
      if(countries.length > 0) {
      setEntries(randCountries(countries))
    }
  }, [rounds, countries])
  // const entries = randCountries(countries);

  function handleConsolidate() {
    const isGood = Math.random() < 0.7; // making the game random asf
    const delta = isGood ? 0.5 : 0.15; // 70% chance to get a good amount
    const newEnergy = Math.min(1, countryStats.energy + delta)
    const newVolatility = 1 - newEnergy;

    setCountryStats({
      ...countryStats,
      energy: newEnergy,
      volatility: newVolatility,
    });
    setRounds(rounds + 1); // rest counts as a round imo
  }

  return(
    <div className="game">
      <h2>Round: {rounds}</h2>
      <span>Result: {result} </span>

      <EnergyBar countryStats={countryStats} />
      <button style={{width:'fit-content'}} onClick={() => handleConsolidate()}> Consolidate </button>

      <div className="game-inner">
        <div className="game-inner-left">
          <UserCard countryStats={countryStats}/>
        </div>

        <div className="game-inner-right">
          {entries.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              setResult={setResult}
              nextRound={() => setRounds(r => r+1)} // will force referesh from dependency array
              />
          ))}
        </div>
      </div>
    </div>
  )
}