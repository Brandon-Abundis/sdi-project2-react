
export default function handleResult(actualResult, type, setCountryStats, userStats){

  const attackRolls = {
      win:[-0.2,-0.3],
      lose:[-0.35,-0.45]
    };
  const negotiateRolls = {
    win:[-0.1,-0.15],
    lose:[-0.2,-0.3]
  };

  let Win;
  let Lose;

  const typeOfRoll = type == 'attack' ? attackRolls : negotiateRolls;
  const normalEnergyLose = Math.random() < 0.7;

  Win = normalEnergyLose ? typeOfRoll.win[0] : typeOfRoll.win[1];
  Lose = normalEnergyLose ? typeOfRoll.lose[0] : typeOfRoll.lose[1];

  const delta = actualResult == 'win' ? Win : Lose;
  // forces value to be between 0 - 100 visually '0-1'
  const newEnergy = Math.max(0, Math.min(1, userStats.energy + delta));
  const newVolatility = 1 - newEnergy;

  setCountryStats({
    ...userStats,
    energy: newEnergy,
    volatility: newVolatility,
  });
}