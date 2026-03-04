import formatNumber from "../HelperFunctions/formatNumber"
import Score from "../HelperFunctions/score"
import getGiniStyle from "../HelperFunctions/getGiniStyle"

export default function UserCard({countryStats}) {

  return(
    <div className="user-card">
      <span>{countryStats.name.common}</span>
      <img src={countryStats.coatOfArms.svg} alt={countryStats.flags.alt} style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}></img>
      <span>GPD: ${formatNumber(countryStats.gdp)}</span>
      <span>Population: {formatNumber(countryStats.population)}</span>
      <span>
        Gini {Object.keys(countryStats.gini)[0]}:{" "}
        <span style={getGiniStyle(countryStats.gini[Object.keys(countryStats.gini)[0]])}>
          {countryStats.gini[Object.keys(countryStats.gini)[0]]}</span>
      </span>
    </div>
  )
}