import { useContext } from "react";

import { GameContext } from "../App";

import UserCard from "./UserCard";
import CountryCard from "./CountryCard";

import randCountries from "../HelperFunctions/randCountries";

export default function Game() {
  const {countryStats, setCountryStats,
              captured, setCaptured,
              allied, setAllied,
              rounds, setRounds,
              countries} = useContext(GameContext);

  const entries = randCountries(countries);

  return(
    <div className="game">
      <h2>Round: {rounds}</h2>
      <div className="game-inner">
        <div className="game-inner-left">
          <UserCard countryStats={countryStats}/>
        </div>

        <div className="game-inner-right">
          {entries.map((country, index) => (
            <CountryCard key={index} country={country}/>
          ))}
        </div>
      </div>
    </div>
  )
}