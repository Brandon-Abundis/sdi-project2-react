export default function computeNegotiationProbability(userScore, botScore, userGini, botGini, energy, userGDP, botGDP) {
  // 1. Score leverage
  const scoreRatio = userScore / botScore;
  let leverage = 0;

  // more score better leverage, weak is a penalty
  if (scoreRatio > 1) {
    leverage = Math.min(0.25, (scoreRatio - 1) * 0.20);
  } else {
    leverage = Math.max(-0.25, (scoreRatio - 1) * 0.20);
  }

  // 2. Gini stability
  const giniDiff = botGini - userGini; //positive - more stable
  const giniBonus = giniDiff * 0.003; //small buff bec math sucks at 0

  // 3. Energy factor
  let energyBonus = 0;
  if (energy < 0.05) {
    energyBonus = -0.50; // %50 penalty
  } else {
    energyBonus = (energy - 0.5) * 0.4; //small scaling
  }

  // GDP peer respect bonus, bec it is crazy
  const gdpRatio = Math.min(userGDP, botGDP) / Math.max(userGDP, botGDP);
  let gdpBonus = 0;

  if (gdpRatio > 0.9) gdpBonus = 0.20;
  else if (gdpRatio > 0.75) gdpBonus = 0.12;
  else if (gdpRatio > 0.6) gdpBonus = 0.06;

  // 4. Base chance 55% baseline chance
  let finalProb = 0.55 + leverage + giniBonus + energyBonus + gdpBonus;

  // 5. Clamp
  finalProb = Math.max(0.01, Math.min(0.95, finalProb));

  // 6. Roll
  const didSucceed = Math.random() < finalProb;

  return {
    probability: finalProb,
    result: didSucceed ? "win" : "fail",
  };
}
