import { useContext } from 'react'

import score from '../HelperFunctions/score'
import computeFinalProbability from '../HelperFunctions/prob'
import computeNegotiationProbability from '../HelperFunctions/probNegotiate'

import { GameContext } from '../App'

export default function CountryCard({country, setResult, nextRound, setCountryStats}) {
  const { countryStats } = useContext(GameContext);

  const userScore = score(countryStats);
  const botScore = score(country);
  // const total = userScore + botScore;

  // const userProbability = Math.round((userScore/total) * 100);
  // const successProb  = userScore / total;            // success chance (0–1)
  // const failureProbability = 1 - successProb;       // failure chance (0–1)
  // const failurePercent = Math.round(failureProbability * 100); // 0–100

  // const finalProb = computeFinalProbability(userScore, botScore, giniNorm);
  // const failurePercent = Math.round((1 - finalProb) * 100);
  const successProbability = computeFinalProbability(
    userScore,
    botScore,
    countryStats.energy,
    countryStats.volatility
  );
  const userGini = countryStats.gini[Object.keys(countryStats.gini)[0]];
  const botGini = country.gini[Object.keys(country.gini)[0]];

  const negotiateProbability = computeNegotiationProbability(
    userScore,
    botScore,
    userGini,
    botGini,
    countryStats.energy,
    countryStats.gdp,
    country.gdp
  );


  function getRiskColor(percentage) {
    if (percentage <= 25) return "#4CAF50";
    if (percentage <= 50) return "#FFC107";
    if (percentage <= 75) return "#FF5722";
    return "#D32F2F";
  }

  const attackFailPercent = Math.round((1 - successProbability.probability) * 100);
  const negotiateFailPercent = Math.round((1 - negotiateProbability.probability) * 100);

  const riskColorAttack = getRiskColor(attackFailPercent);
  const riskColorNegotiate = getRiskColor(negotiateFailPercent)

  function handleAttack(actualResult) {
    const normalEnergyLose = Math.random() < 0.7;
    const Win = normalEnergyLose ? -0.2 : -0.3;
    const Lose = normalEnergyLose ? -0.35 : -0.45;

    const delta = actualResult == 'win' ? Win : Lose;
    const newEnergy = Math.max(0, Math.min(1, countryStats.energy + delta));
    const newVolatility = 1 - newEnergy;

    setCountryStats({
      ...countryStats,
      energy: newEnergy,
      volatility: newVolatility,
    });
    setResult("")
    setResult(successProbability.result)
    nextRound() // triggers useEffect dependency array to referesh
  }
  function handleNegotiate(actualResult) {
    const normalEnergyLose = Math.random() < 0.7;
    const Win = normalEnergyLose ? -0.1 : -0.15;
    const Lose = normalEnergyLose ? -0.2 : -0.3;

    const delta = actualResult == 'win' ? Win : Lose;
    const newEnergy = Math.max(0, Math.min(1, countryStats.energy + delta));
    const newVolatility = 1 - newEnergy;

    setCountryStats({
      ...countryStats,
      energy: newEnergy,
      volatility: newVolatility,
    });
    setResult(successProbability.result)
    nextRound() // triggers useEffect dependency array to referesh
  }
  // returning the actual result of the roll of attacking
  // function handleClick() {
  //   setResult("")
  //   handleAttack(successProbability.result)
  //   setResult(successProbability.result)
  //   nextRound() // triggers useEffect dependency array to referesh
  // }


  return(
    <div className="country-card" style={{
      backgroundImage: `url(${country.flags.svg})`,
      backgroundSize: 'cover',
    }}>
      <div className="country-data">
        <span >{country.name.common}{"/ score: "}{score(country)}</span>
        <img src={country.coatOfArms.svg}
          alt={country.flags.png}
          onError={(e) => {
            e.target.onerror = null; // prevents infinite loop
            e.target.src = country.flags.svg;
          }}
          style={{ width: "100%",
            height: "auto",
            maxHeight: "200px",
            objectFit: "contain",
          }}></img>

      </div>
      <div className="country-buttons">
        <button
        onClick={() => handleAttack()}
          className='attack-btn'
          style={{backgroundColor: riskColorAttack}}
        >⚔️ {attackFailPercent}% fail</button>
        <button
        onClick={() => handleNegotiate()}
        className='negotiate-btn'
        style={{backgroundColor: riskColorNegotiate}}
        >🏛️ {negotiateFailPercent}% fail</button>
      </div>
    </div>
  )
}