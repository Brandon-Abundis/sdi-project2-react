import { useContext } from 'react'

import score from '../HelperFunctions/score'
import handleResult from '../HelperFunctions/handleResult'
import computeFinalProbability from '../HelperFunctions/prob'
import computeNegotiationProbability from '../HelperFunctions/probNegotiate'

import { GameContext } from '../App'

export default function CountryCard({country, setResult, nextRound}) { //setCountryStats
  const { countryStats, setCountryStats } = useContext(GameContext);

  // const userScore = score(countryStats);
  // const botScore = score(country);
  // const total = userScore + botScore;

  // const userProbability = Math.round((userScore/total) * 100);
  // const successProb  = userScore / total;            // success chance (0–1)
  // const failureProbability = 1 - successProb;       // failure chance (0–1)
  // const failurePercent = Math.round(failureProbability * 100); // 0–100

  // const finalProb = computeFinalProbability(userScore, botScore, giniNorm);
  // const failurePercent = Math.round((1 - finalProb) * 100);

  const successProbability = computeFinalProbability(countryStats, country);
  const negotiateProbability = computeNegotiationProbability(countryStats, country);


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

  function handleClick(actualResult, type){
    handleResult(actualResult, type, setCountryStats, countryStats);
    setResult('');
    setResult(actualResult);
    nextRound(); // triggers useEffect dependency array to referesh
  }

  const coat = country.coatOfArms?.svg;
  const flag = country.flag?.svg;
  const imageSrc = coat == '' ? flag : coat; //image src is getting annoying


  return(
    <div className="country-card" style={{
      backgroundImage: `url(${country.flags.svg})`,
      backgroundSize: 'cover',
    }}>
      <div className="country-data">
        <span >{country.name.common}{"/ score: "}{score(country)}</span>
        <img
          src={imageSrc}
          alt={country.name.common + " coat of arms"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = flag; // fallback to flag if coat fails
          }}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "200px",
            objectFit: "contain",
          }}
        />

      </div>
      <div className="country-buttons">
        <button
        onClick={() => handleClick(successProbability.result, 'attack')}
          className='attack-btn'
          style={{backgroundColor: riskColorAttack}}
        >⚔️ {attackFailPercent}% fail</button>
        <button
        onClick={() => handleClick(negotiateProbability.result, 'negotiate')}
        className='negotiate-btn'
        style={{backgroundColor: riskColorNegotiate}}
        >🏛️ {negotiateFailPercent}% fail</button>
      </div>
    </div>
  )
}