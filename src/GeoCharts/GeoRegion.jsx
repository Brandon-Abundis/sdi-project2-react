import { useEffect, useRef } from "react";
import useGoogleCharts from "./useGoogleCharts";

const GeoRegion = ({ currentCountry }) => {
  // 1. Shared Google Charts loader — ensures script + package load only once.
  const ready = useGoogleCharts();

  // 2. Reference to the DOM node where this region map will be drawn.
  const currentRef = useRef(null);

  // 3. Build the data table for this specific country.
  //    Google Charts requires a header row.
  const thisCountry = [
    ["Country", "Value", { type: "string", role: "tooltip" }],
    [currentCountry.cca2, 100, `Area: ${currentCountry.area.toLocaleString()} km²`],
  ];

  useEffect(() => {
    // 4. Wait until Google Charts is fully ready.
    if (!ready) return;
    if (!currentRef.current) return;

    // 5. Convert your array-of-arrays into a DataTable.
    const data = window.google.visualization.arrayToDataTable(thisCountry);

    // 6. Options for zooming into a single country.
    const options = {
      region: currentCountry.cca2,   // zoom into this country
      resolution: "countries",
      backgroundColor: "#1f1f1f",
      datalessRegionColor: "#3a3a3a",
      legend: "none",
      colorAxis: {
        values: [100],
        colors: ["#8fae3b"],            // deep red highlight
      },
    };

    // 7. Create and draw the chart.
    const chart = new window.google.visualization.GeoChart(currentRef.current);
    chart.draw(data, options);

  }, [ready, currentCountry]);
  // Re-draw when:
  // - Google Charts becomes ready
  // - The selected country changes

  // 8. Container MUST have a height or Google throws "Missing height argument".
  return (
    <div
      ref={currentRef}
      style={{
        width: "100%",
        height: "30vh",   // responsive height
        minHeight: "320px"
      }}
    />

  );
};

export default GeoRegion;
