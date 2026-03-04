import Score from "../HelperFunctions/score"
import getGiniStyle from "../HelperFunctions/getGiniStyle"

import { GameContext } from "../App"

import { useContext } from "react"

export default function Selected({country}){
  const {setCountryStats} = useContext(GameContext);

  function handleConfirmation(){
    setCountryStats(country)
  }

  return(
    <div className="selected">
      <h2>Selected: {country.name.official}</h2>
      <h3>Starting Score: {Score(country)}</h3>
      <span>GPD: ${Number(country.gdp).toLocaleString("en-US")}</span>
      <span>Population: {Number(country.population).toLocaleString("en-US")}</span>
      <span>
        Gini: {Object.keys(country.gini)[0]}:{" "}
        <span style={getGiniStyle(country.gini[Object.keys(country.gini)[0]])}>
          {country.gini[Object.keys(country.gini)[0]]}</span>
      </span>
      <button onClick={() => handleConfirmation()}>Confirm</button>
    </div>
  )
}