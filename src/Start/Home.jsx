import { useNavigate } from "react-router-dom"

import GeoChart from "../GeoCharts/GeoChart";

export default function Home() {
  const navigate = useNavigate();

  return(
    <div className="home">
      <div className="geo-chart-menu">
        <GeoChart width={'900px'} height={'100%'} />
      </div>
      <div className="home-menu">
        <h2>Global Conquest ahh game</h2>
        <button onClick={() => navigate('/selection')}>Start</button>
        <button>Stats</button>
        <button>World</button>
      </div>
    </div>
  )
}