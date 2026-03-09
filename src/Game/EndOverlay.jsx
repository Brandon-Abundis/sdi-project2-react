
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import GeoChart from "../GeoCharts/GeoChart"
import { GameContext } from "../App"
import Back from "../Start/Back"

export default function EndOverlay() {
  const {countryStats, allied, captured} = useContext(GameContext)
  const navigate = useNavigate();

  return(
    <div className="end-overlay">
      <div className="end-menu">
        <div className="end-top">
          <Back/>
          <h2>Your Country Collapsed!</h2>
        </div>
        <GeoChart />
      </div>
    </div>
  )
}