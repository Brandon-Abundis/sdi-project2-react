import { useEffect, useRef, useContext } from "react";
import useGoogleCharts from "./useGoogleCharts";

import { GameContext } from "../App";
/* requires
  [
  ['Country', 'Value', {role: 'tooltip'}]
  ['US', 100, country.area]
  ]
*/
const GeoChart = ({refreshKey, width, height}) => {
  const {countryStats, allied, captured, countries} = useContext(GameContext);

  const geoData = [
    ["Country", "Value", { type: "string", role: "tooltip" }],
  ];

  if (countryStats) {
    // user country
    geoData.push([
      countryStats.cca2,
      100,
      `Population: ${countryStats.population.toLocaleString()}
      GDP: $${countryStats.gdp.toLocaleString()}
      Area: ${countryStats.area.toLocaleString()} km²`
    ]);

    // allied countries
    allied.forEach(alliedCountry => {
      geoData.push([
        alliedCountry.cca2,
        150,
        `Allied - Population: ${alliedCountry.population.toLocaleString()}
        GDP: $${alliedCountry.gdp.toLocaleString()}
        Area: ${alliedCountry.area.toLocaleString()} km²`
      ]);
    });

    // captured countries
    captured.forEach(capturedCountry => {
      geoData.push([
        capturedCountry.cca2,
        200,
        `Captured - Population: ${capturedCountry.population.toLocaleString()}
        GDP: $${capturedCountry.gdp.toLocaleString()}
        Area: ${capturedCountry.area.toLocaleString()} km²`
      ]);
    });

  } else {
    // no selected country → show all
    countries.forEach(country => {
      geoData.push([
        country.cca2,
        50,
        `Population: ${country.population.toLocaleString()}
        GDP: $${country.gdp.toLocaleString()}
        Area: ${country.area.toLocaleString()} km²`
      ]);
    });
  }


  // Reference to the DOM node where Google will draw the map.
  // Google Charts draws directly into a real DOM element, so useRef is ideal.
  const chartRef = useRef(null);

  //Shared loader hook — ensures Google Charts is loaded ONCE globally.
  //Both GeoChart and GeoRegion wait for this before drawing.
  const ready = useGoogleCharts();

  useEffect(() => {
    //If Google Charts isn't ready yet, do nothing.
    //This prevents the "Missing height argument" race condition.
    if (!ready) return;
    if (!chartRef.current) return;

    // Convert your array-of-arrays into a Google DataTable.
    const data = window.google.visualization.arrayToDataTable(geoData);

    // Chart styling + behavior configuration.
    const options = {
      resolution: "countries",          // prevents province-level zoom issues
      backgroundColor: "#242424",       // map background
      datalessRegionColor: "#9f9e9e",   // color for countries not in your dataset
      legend: "none",                   // hide legend
      colorAxis: {
        values: [50, 100, 150, 200],             // numeric scale
        colors: ["#447149", "#b70d0d", "#297ede", "#105702"], // gradient colors
      },
    };

    // Create the chart instance and draw it into the <div>.
    const chart = new window.google.visualization.GeoChart(chartRef.current);
    chart.draw(data, options);

  }, [ready, refreshKey, JSON.stringify(geoData)]); //forcing a referesh as much as possible
  // Re-draw whenever:
  // - Google Charts becomes ready
  // - Your data changes

  // The container MUST have a height or Google throws "Missing height argument".
  return (
    <div
      style={{
        width: width || "100%",
        height: height || "500px",
      }}
    >
      <div
        id="my-geo-chart"
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );

};

export default GeoChart;
