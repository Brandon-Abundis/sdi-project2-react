import Score from "../HelperFunctions/score"
import getGiniStyle from "../HelperFunctions/getGiniStyle"
import GeoRegion from "../GeoCharts/GeoRegion"

import { GameContext } from "../App"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"

export default function Selected({country}){
  const {setCountryStats, setRounds, rounds} = useContext(GameContext);
  const navigate = useNavigate();

  function handleConfirmation() {
    const gini = country.gini[Object.keys(country.gini)[0]];

    // Normalize Gini to 0–1
    let giniNorm = 1 - (gini - 20) / 40;
    giniNorm = Math.max(0, Math.min(1, giniNorm));

    const energy = giniNorm;          // stable = high energy
    const volatility = 1 - giniNorm;  // unstable = high volatility

    const startingScore = Score(country);

    setCountryStats({
      ...country,
      giniNorm,
      energy,
      volatility,
      startingScore,
    });

    setRounds(1);
    navigate(`/game/round-${rounds}`);
  }


  return(
    <div className="selected">

      <h2>Selected: {country.name.official}</h2>

      <div className="selected-inner">
        <div className="selected-left">
          <GeoRegion currentCountry={country} />
        </div>

        <div className="selected-right">

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

      </div>


    </div>
  )
}