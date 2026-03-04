import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGoogleCharts from "./useGoogleCharts";


/* requires
  [
  ['Country', 'Value', {role: 'tooltip'}]
  ['US', 100, country.area]
  ]
*/
const GeoChart = ({ conqueredChartData }) => {
  // 1. Reference to the DOM node where Google will draw the map.
  // Google Charts draws directly into a real DOM element, so useRef is ideal.
  const chartRef = useRef(null);
  const navigate = useNavigate();

  // 2. Shared loader hook — ensures Google Charts is loaded ONCE globally.
  //Both GeoChart and GeoRegion wait for this before drawing.
  const ready = useGoogleCharts();

  useEffect(() => {
    // 3. If Google Charts isn't ready yet, do nothing.
    //This prevents the "Missing height argument" race condition.
    if (!ready) return;

    // 4. Convert your array-of-arrays into a Google DataTable.
    const data = window.google.visualization.arrayToDataTable(conqueredChartData);

    // 5. Chart styling + behavior configuration.
    const options = {
      resolution: "countries",          // prevents province-level zoom issues
      backgroundColor: "#242424",       // map background
      datalessRegionColor: "#9f9e9e",   // color for countries not in your dataset
      legend: "none",                   // hide legend
      colorAxis: {
        values: [100, 200],             // numeric scale
        colors: ["#297ede", "#449733"], // gradient colors
      },
    };

    // 6. Create the chart instance and draw it into the <div>.
    const chart = new window.google.visualization.GeoChart(chartRef.current);
    chart.draw(data, options);

  }, [ready, conqueredChartData]);
  // Re-draw whenever:
  // - Google Charts becomes ready
  // - Your data changes

  // 7. The container MUST have a height or Google throws "Missing height argument".
  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <div
        id="my-geo-chart"
        ref={chartRef}
        style={{ width: "500px", height: "420px" }}
      />
    </div>
  );
};

export default GeoChart;
