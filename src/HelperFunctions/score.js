function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
// computeCountryScore
export default function Score( country ) {
  if (!country) return "Loading...";

  const gdp = country.gdp;
  const population = country.population;
  const gini = country.gini[Object.keys(country.gini)[0]]

  // if (!gdp || !population || !gini) return 0;

  // GDP per capita (richness)
  const gdpPerCap = gdp / population;
  const gdpPerCapNorm = clamp01((Math.log10(gdpPerCap) - 3) / 2);

  // Total GDP (economic weight)
  const gdpTotalNorm = clamp01((Math.log10(gdp) - 10) / 3);

  // Population (size)
  const popNorm = clamp01((Math.log10(population) - 6) / 3);

  // Gini (inequality penalty)
  let giniNorm = 1 - (gini - 20) / 40;
  giniNorm = clamp01(giniNorm);

  // Weighted score
  const raw =
    0.35 * gdpPerCapNorm +
    0.35 * gdpTotalNorm +
    0.2  * popNorm +
    0.1  * giniNorm;

  // Scale to 0–3000
  return Math.round(raw * 3000);
}