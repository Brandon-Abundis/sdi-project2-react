import { useContext } from 'react'

import score from '../HelperFunctions/score'
import computeFinalProbability from '../HelperFunctions/prob'
// import computeFinalProbability from '../HelperFunctions/computeFinalProb'
import { GameContext } from '../App'

export default function CountryCard({country}) {
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



  // const didUserWin = Math.random() < successProb ;


  function getRiskColor(percentage) {
    if (percentage <= 25) return "#4CAF50";
    if (percentage <= 50) return "#FFC107";
    if (percentage <= 75) return "#FF5722";
    return "#D32F2F";
  }

  const failurePercent = Math.round((1 - successProbability) * 100);

  const riskColor = getRiskColor(failurePercent);


  return(
    <div className="country-card" style={{
      backgroundImage: `url(${country.flags.svg})`,
      backgroundSize: 'cover',
    }}>
      <div className="country-data">
        <span >{country.name.common}{"/ score: "}{score(country)}</span>
        <img src={country.coatOfArms.svg} alt={country.flags.png}
          style={{ width: "100%",
            height: "auto",
            maxHeight: "200px",
            objectFit: "contain",
          }}></img>

      </div>
      <div className="country-buttons">
        <button
          className='attack-btn'
          style={{backgroundColor: riskColor}}
        >⚔️ {failurePercent}% fail</button>
        <button>🏛️Negotiate</button>
      </div>
    </div>
  )
}