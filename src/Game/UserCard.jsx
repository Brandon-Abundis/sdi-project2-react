import { useContext } from "react"

import { GameContext } from "../App"

import formatNumber from "../HelperFunctions/formatNumber"
import Score from "../HelperFunctions/score"
import getGiniStyle from "../HelperFunctions/getGiniStyle"

export default function UserCard({countryStats}) {
  const { captured, allied} = useContext(GameContext)
  return(
    <div className="user-card">

      <div className="user-main">
        <span>{countryStats.name.common}{" score: "}{Score(countryStats)}</span>

        <img src={countryStats.coatOfArms.svg} alt={countryStats.flags.alt} style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}></img>
        <span>GPD: ${formatNumber(countryStats.gdp)}</span>
        <span>Population: {formatNumber(countryStats.population)}</span>
        <span>
          Gini {Object.keys(countryStats.gini)[0]}:{" "}
          <span style={getGiniStyle(countryStats.gini[Object.keys(countryStats.gini)[0]])}>
            {countryStats.gini[Object.keys(countryStats.gini)[0]].toFixed(2)}</span>
        </span>
        {""}
        <span>Captured: {captured.length}</span>
        <span>Allied: {allied.length}</span>
      </div>

    </div>
  )
}