import React from "react";
import "./overview.css"

function Overview({ stats }) {
    const { villageCount, urbanCount, populationSize, landArea } = stats;

    return (
            <div className="overview-container">
                <div className="header-container">
                    <h1 className="title">Overview</h1>
                    <div className="map-container">
                        <div id="map-con"></div>
                    </div>
                </div>
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

                <div className="charts-container">
                    <div className="chart">
                        <h3>Age Distribution</h3>
                        <div className="piechart" id="agechart"></div>
                    </div>
                    <div className="chart">
                        <h3>Gender Ratios</h3>
                        <div className="piechart" id="genderchart"></div>
                    </div>
                </div>

                <div className="barchart-container">
                    <div id="barchart" className="barchart"></div>
                </div>
            </div>
    );
}

export default Overview;
