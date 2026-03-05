export default function computeFinalProbability(userScore, botScore, energy, volatility) {
  function getEnergyMultiplier(energy) {
    if (energy < 0.15) return 0.60;
    if (energy < 0.30) return 0.80;
    if (energy < 0.50) return 1.00;
    if (energy < 0.75) return 1.35;
    if (energy < 0.90) return 1.55;
    return 1.70;
  }

  const multiplier = getEnergyMultiplier(energy);
  const boostedUserScore = userScore * multiplier;

  // Balanced exponent
  const alpha = 2.0;
  const userPower = Math.pow(boostedUserScore, alpha);
  const botPower = Math.pow(botScore, alpha);

  let baseProb = userPower / (userPower + botPower);

  // Peer bonus (only helps against similar-strength countries)
  const ratio = userScore / botScore;
  let peerBonus = 0;
  if (ratio > 0.7 && ratio < 1.3) {
    peerBonus = 0.08; // +8% success
  }

  // Stability boost
  const stabilityBoost = 0.18 * energy;

  // Volatility swing
  const swing = (Math.random() * 2 - 1) * volatility * 0.15;

  let finalProb = baseProb + peerBonus + stabilityBoost + swing;

  return Math.max(0, Math.min(1, finalProb));
}



