

export default function Overlay({roundStats, onClose}) {
  return(
    <div className="overlay">
      <div className="overlay-menu">
        <button className="close-btn" onClick={onClose}>Close</button>

        <span>Result: {roundStats.result}</span>
        <span>GDP Delta: {roundStats.gdpDelta}</span>
        <span>Population Delta: {roundStats.populationDelta}</span>
        <span></span>
        <span>Original GDP: {roundStats.prevGDP}</span>
        <span>New GDP: {roundStats.newGDP}</span>
        <span>Original Population: {roundStats.prevPopulation}</span>
        <span>New Population: {roundStats.newPopulation}</span>

      </div>
    </div>
  )
}