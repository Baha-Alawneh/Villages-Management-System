import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

function Charts({demographics}) {
  const ageData = calculateAgeData(demographics);


  const genderData =calculateGenderData(demographics);


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
    chartArea: { width: "95%", height: "80%" },
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

function calculateAgeData(demographics) {
  const ageGroups = ["0-18", "19-35", "36-50", "51-65", "65+"];
  const ageData = [["Age Group", "Number of People"]];
  const populationNumbers = [0,0,0,0,0];

  demographics.forEach(demo => {
    const percents = JSON.parse(demo.age_distribution);
    const population = Number(demo.population_size);
    for(let i=0;i<5;i++){
      populationNumbers[i] += (parseFloat(percents[ageGroups[i]])/100) * population;
    }
  });

  for (let i=0; i<5;i++) {
      ageData.push([ageGroups[i], populationNumbers[i]]);
  }

  return ageData;
}

function calculateGenderData(demographics) {
  const genderData = [["Gender", "Number of People"]];
  const populationNumbers = [ 0, 0];

  demographics.forEach(demo => {
    const percents = JSON.parse(demo.gender_ratios);
    const population = Number(demo.population_size);
    populationNumbers[0]+= (parseFloat(percents["male"])/100) * population;
    populationNumbers[1]+= (parseFloat(percents["female"])/100)* population;
  });

  genderData.push(["male", populationNumbers[0]]);
  genderData.push(["female", populationNumbers[1]]);

  console.log(genderData);
  return genderData;
}

export default Charts;
