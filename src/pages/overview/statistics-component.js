import React from 'react';


function Statistics ({villages}) {
    const stats = {
        villageCount: villages.length,
        urbanCount: villages.filter(village => village.categories.includes("urban")).length,
        populationSize: 660000,
        landArea: 11.88};    
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

export default Statistics;