
export default function EnergyBar({countryStats}){
  return(
    <div className="energy-div">
      <div className="energy-bar">
        <div
          className="energy-fill"
          style={{
            width: `${countryStats.energy * 100}%`, // changing width lol
            backgroundColor:
              countryStats.energy > 0.75 ? "#4CAF50" :       // green
              countryStats.energy > 0.5  ? "#FFC107" :       // yellow
              countryStats.energy > 0.25 ? "#FF5722" :       // orange
                                          "#D32F2F",        // red
          }}
        />
      </div>
      <span className="energy-label"> Energy:{countryStats.energy * 100} </span>
    </div>
  )
}