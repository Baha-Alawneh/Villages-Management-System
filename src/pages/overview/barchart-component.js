import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function Barchart({demographics, villages}) {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const calculateCityPopulation = () => {
      const result = [["City", "Population", { role: "style" }]];
      demographics.forEach((demo) => {
        const village = villages.find((v) => v.village_id === demo.village_id);
        const VillageName = village? village.village_name : "Unknown Village";
        result.push([VillageName, Number(demo.population_size), "#3c5b66"]);
      });
      return result;
    };

    setBarData(calculateCityPopulation());
  }, []);

  const barOptions = {
    colors: ["#1f77b4"],
    titleTextStyle: { color: "#fff", fontSize: 18, bold: true },
    backgroundColor: "transparent",
    hAxis: {
      textStyle: { color: "#676766" },
    },
    vAxis: {
      textStyle: { color: "#676766" },
      gridlines: { color: "#2b343f" },
    },
    legend: {
      position: "top",
      alignment: "center",
      textStyle: { color: "#676766", fontSize: 14 },
    },
    chartArea: { width: "85%", height: "80%" },
  };

  return (
    <div className="barchart-container">
      {barData.length > 1 ? (
        <Chart
          chartType="ColumnChart"
          data={barData}
          options={barOptions}
          width="100%"
          height="400px"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default Barchart;
