import React from 'react';


function Statistics ({villages, demographics}) {
    const stats = {
        villageCount: villages.length,
        urbanCount: villages.filter(village => village.categories.includes("urban")).length,
        populationSize: demographics.reduce((sum, demo)=>sum + (parseFloat(demo.population_size)|| 0), 0),
        landArea: calculateAverageLandArea(villages),
    }  
      const { villageCount, urbanCount, populationSize, landArea } = stats;

    return(
        <div className="statistics-container">
            <div className="statistics-item">
                <h3>Total Number of Villages</h3>
                <p id="village-number">{villageCount}</p>
            </div>
            <div className="statistics-item">
                <h3>Total Number of Urban Areas</h3>
                <p id="urban-number">{urbanCount}</p>
            </div>
            <div className="statistics-item">
                <h3>Total Population Size</h3>
                <p id="population-number">{populationSize}</p>
            </div>
            <div className="statistics-item">
                <h3>Average Land Area</h3>
                <p>
                    <span id="land-area">{landArea}</span> <span>sq km</span>
                </p>
            </div>
        </div>
    );
    
}

function calculateAverageLandArea(villages) {
    if (!villages || villages.length === 0) {
        return 0; // Handle empty or undefined array
    }

    const totalLandArea = villages.reduce((sum, village) => sum + (parseFloat(village.land_area) || 0), 0);
    const averageLandArea = totalLandArea / villages.length;

    return  Number(averageLandArea.toFixed(2));
}

export default Statistics;