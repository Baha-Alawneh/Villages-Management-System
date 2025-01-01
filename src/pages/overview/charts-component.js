import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

function Charts() {
  // Data for the charts
  const ageData = [
    ["Age Group", "Number of People"],
    ["0-18", 500],
    ["19-35", 700],
    ["36-50", 300],
    ["51-65", 200],
    ["65+", 100],
  ];

  const genderData = [
    ["Gender", "Number of People"],
    ["Female", 800],
    ["Male", 1000],
  ];

  // Chart options
  const chartOptions = {
    titleTextStyle: { color: "#fff", fontSize: 18, bold: true },
    backgroundColor: "transparent",
    colors: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"],
    legend: {
      position: "top",
      alignment: "center",
      textStyle: { color: "#fff", fontSize: 12 },
    },
    pieSliceText: "none",
    chartArea: { width: "100%", height: "80%" },
  };

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Age Distribution</h3>
        <Chart
          chartType="PieChart"
          data={ageData}
          options={chartOptions}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div className="chart">
        <h3>Gender Ratios</h3>
        <Chart
          chartType="PieChart"
          data={genderData}
          options={chartOptions}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
}

export default Charts;
